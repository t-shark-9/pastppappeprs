import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Offline storage methods
  offline: {
    save: (key: string, data: unknown) => 
      ipcRenderer.invoke('offline:save', key, JSON.stringify(data)),
    
    load: async (key: string) => {
      const result = await ipcRenderer.invoke('offline:load', key);
      if (result.success && result.data) {
        try {
          return { success: true, data: JSON.parse(result.data) };
        } catch {
          return { success: true, data: result.data };
        }
      }
      return result;
    },
    
    delete: (key: string) => 
      ipcRenderer.invoke('offline:delete', key),
    
    list: () => 
      ipcRenderer.invoke('offline:list'),
  },
  
  // Network status
  network: {
    isOnline: () => ipcRenderer.invoke('network:isOnline'),
  },
  
  // Platform info
  platform: {
    isElectron: true,
    os: process.platform,
  },
});

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      offline: {
        save: (key: string, data: unknown) => Promise<{ success: boolean; error?: string }>;
        load: (key: string) => Promise<{ success: boolean; data?: unknown; error?: string }>;
        delete: (key: string) => Promise<{ success: boolean; error?: string }>;
        list: () => Promise<{ success: boolean; keys?: string[]; error?: string }>;
      };
      network: {
        isOnline: () => Promise<boolean>;
      };
      platform: {
        isElectron: boolean;
        os: string;
      };
    };
  }
}
