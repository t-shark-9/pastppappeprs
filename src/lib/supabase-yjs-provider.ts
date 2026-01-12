import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface SupabaseProviderOptions {
  documentType: 'draft' | 'note';
  documentId: string;
  doc: Y.Doc;
  awareness?: Awareness;
}

export interface UserPresence {
  id: string;
  name: string;
  email: string;
  color: string;
  cursor?: {
    anchor: number;
    head: number;
  };
}

// Generate a consistent color from user ID
function getUserColor(userId: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8B500', '#00CED1'
  ];
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export class SupabaseProvider {
  private channel: RealtimeChannel | null = null;
  private doc: Y.Doc;
  private documentType: 'draft' | 'note';
  private documentId: string;
  private awareness: Awareness;
  private isDestroyed = false;
  private pendingUpdates: Uint8Array[] = [];
  private syncTimeout: ReturnType<typeof setTimeout> | null = null;
  private isSyncing = false;
  
  public readonly synced: boolean = false;
  public onSynced: (() => void) | null = null;
  public onAwarenessUpdate: ((users: UserPresence[]) => void) | null = null;

  constructor(options: SupabaseProviderOptions) {
    this.doc = options.doc;
    this.documentType = options.documentType;
    this.documentId = options.documentId;
    this.awareness = options.awareness || new Awareness(this.doc);

    this.init();
  }

  private async init() {
    await this.loadInitialState();
    this.setupRealtimeChannel();
    this.setupDocumentObserver();
    this.setupAwarenessObserver();
  }

  private async loadInitialState() {
    try {
      // Load initial Yjs document state (use type assertion for new tables)
      const { data: yjsDoc } = await (supabase as any)
        .from('yjs_documents')
        .select('state')
        .eq('document_type', this.documentType)
        .eq('document_id', this.documentId)
        .maybeSingle();

      if (yjsDoc?.state) {
        const state = new Uint8Array(
          atob(yjsDoc.state as string).split('').map((c: string) => c.charCodeAt(0))
        );
        Y.applyUpdate(this.doc, state);
      }

      // Load any pending updates
      const { data: updates } = await (supabase as any)
        .from('yjs_updates')
        .select('update_data')
        .eq('document_type', this.documentType)
        .eq('document_id', this.documentId)
        .order('created_at', { ascending: true });

      if (updates) {
        for (const update of updates) {
          const data = new Uint8Array(
            atob(update.update_data as string).split('').map((c: string) => c.charCodeAt(0))
          );
          Y.applyUpdate(this.doc, data);
        }
      }

      (this as any).synced = true;
      this.onSynced?.();
    } catch (error) {
      console.error('Failed to load initial state:', error);
    }
  }

  private setupRealtimeChannel() {
    const channelName = `collab:${this.documentType}:${this.documentId}`;
    
    this.channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: false },
        presence: { key: '' },
      },
    });

    // Listen for document updates from other users
    this.channel.on('broadcast', { event: 'yjs-update' }, ({ payload }) => {
      if (this.isDestroyed) return;
      
      const update = new Uint8Array(
        atob(payload.update).split('').map((c: string) => c.charCodeAt(0))
      );
      Y.applyUpdate(this.doc, update, 'remote');
    });

    // Listen for presence changes
    this.channel.on('presence', { event: 'sync' }, () => {
      this.broadcastAwareness();
    });

    this.channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
      this.broadcastAwareness();
    });

    this.channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      this.broadcastAwareness();
    });

    // Subscribe and track presence
    this.channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        // Get current user and track presence
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await this.channel?.track({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
            color: getUserColor(user.id),
            online_at: new Date().toISOString(),
          });
        }
      }
    });
  }

  private setupDocumentObserver() {
    this.doc.on('update', (update: Uint8Array, origin: any) => {
      if (this.isDestroyed || origin === 'remote') return;

      // Broadcast to other users
      const base64Update = btoa(String.fromCharCode(...update));
      this.channel?.send({
        type: 'broadcast',
        event: 'yjs-update',
        payload: { update: base64Update },
      });

      // Queue for persistence
      this.pendingUpdates.push(update);
      this.schedulePersistence();
    });
  }

  private setupAwarenessObserver() {
    this.awareness.on('update', ({ added, updated, removed }: any) => {
      // Broadcast awareness state
      const localState = this.awareness.getLocalState();
      if (localState) {
        this.channel?.send({
          type: 'broadcast',
          event: 'awareness-update',
          payload: { state: localState },
        });
      }
    });
  }

  private broadcastAwareness() {
    if (!this.channel) return;
    
    const presenceState = this.channel.presenceState();
    const users: UserPresence[] = [];
    
    for (const key in presenceState) {
      const presences = presenceState[key] as any[];
      if (Array.isArray(presences)) {
        for (const presence of presences) {
          users.push({
            id: presence.id,
            name: presence.name,
            email: presence.email,
            color: presence.color,
            cursor: presence.cursor,
          });
        }
      }
    }

    this.onAwarenessUpdate?.(users);
  }

  private schedulePersistence() {
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }

    this.syncTimeout = setTimeout(() => {
      this.persistUpdates();
    }, 1000); // Debounce for 1 second
  }

  private async persistUpdates() {
    if (this.isSyncing || this.pendingUpdates.length === 0) return;
    
    this.isSyncing = true;
    const updates = [...this.pendingUpdates];
    this.pendingUpdates = [];

    try {
      // Merge all pending updates
      const mergedUpdate = Y.mergeUpdates(updates);
      const base64Update = btoa(String.fromCharCode(...mergedUpdate));

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Insert the update (use type assertion for new tables)
      await (supabase as any).from('yjs_updates').insert({
        document_type: this.documentType,
        document_id: this.documentId,
        update_data: base64Update,
        user_id: user?.id,
      });

      // Periodically save full state (every 10 updates or so)
      await this.saveFullState();
    } catch (error) {
      console.error('Failed to persist updates:', error);
      // Re-queue failed updates
      this.pendingUpdates = [...updates, ...this.pendingUpdates];
    } finally {
      this.isSyncing = false;
    }
  }

  private async saveFullState() {
    try {
      const state = Y.encodeStateAsUpdate(this.doc);
      const base64State = btoa(String.fromCharCode(...state));

      await (supabase as any).from('yjs_documents').upsert({
        document_type: this.documentType,
        document_id: this.documentId,
        state: base64State,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'document_type,document_id',
      });

      // Clean up old updates after saving full state
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      await (supabase as any)
        .from('yjs_updates')
        .delete()
        .eq('document_type', this.documentType)
        .eq('document_id', this.documentId)
        .lt('created_at', oneHourAgo);
    } catch (error) {
      console.error('Failed to save full state:', error);
    }
  }

  public updateCursor(anchor: number, head: number) {
    this.awareness.setLocalStateField('cursor', { anchor, head });
  }

  public getAwareness(): Awareness {
    return this.awareness;
  }

  public destroy() {
    this.isDestroyed = true;
    
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }

    // Persist any remaining updates
    if (this.pendingUpdates.length > 0) {
      this.persistUpdates();
    }

    this.channel?.unsubscribe();
    this.awareness.destroy();
  }
}
