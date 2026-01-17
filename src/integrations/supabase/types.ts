export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      assignments: {
        Row: {
          created_at: string
          deadline: string | null
          ghost_session_id: string | null
          id: string
          no_ghostwriting_accepted: boolean | null
          rubric_id: string | null
          status: Database["public"]["Enums"]["assignment_status"]
          subject: Database["public"]["Enums"]["subject_type"]
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          ghost_session_id?: string | null
          id?: string
          no_ghostwriting_accepted?: boolean | null
          rubric_id?: string | null
          status?: Database["public"]["Enums"]["assignment_status"]
          subject: Database["public"]["Enums"]["subject_type"]
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          deadline?: string | null
          ghost_session_id?: string | null
          id?: string
          no_ghostwriting_accepted?: boolean | null
          rubric_id?: string | null
          status?: Database["public"]["Enums"]["assignment_status"]
          subject?: Database["public"]["Enums"]["subject_type"]
          task_type?: Database["public"]["Enums"]["task_type"]
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "rubrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string
          description: string
          id: string
          keywords: string[] | null
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          author?: string | null
          category?: string
          content: string
          created_at?: string
          description: string
          id?: string
          keywords?: string[] | null
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string
          description?: string
          id?: string
          keywords?: string[] | null
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          isbn: string | null
          publisher: string | null
          subject: Database["public"]["Enums"]["subject_type"]
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          author: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isbn?: string | null
          publisher?: string | null
          subject: Database["public"]["Enums"]["subject_type"]
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          author?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isbn?: string | null
          publisher?: string | null
          subject?: Database["public"]["Enums"]["subject_type"]
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      coaching_sessions: {
        Row: {
          assignment_id: string
          created_at: string
          id: string
          input_text: string | null
          output_text: string | null
          session_type: string
        }
        Insert: {
          assignment_id: string
          created_at?: string
          id?: string
          input_text?: string | null
          output_text?: string | null
          session_type: string
        }
        Update: {
          assignment_id?: string
          created_at?: string
          id?: string
          input_text?: string | null
          output_text?: string | null
          session_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "coaching_sessions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      document_collaborators: {
        Row: {
          created_at: string
          document_id: string
          document_type: string
          id: string
          invited_by: string | null
          invited_email: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_id: string
          document_type: string
          id?: string
          invited_by?: string | null
          invited_email?: string | null
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string
          document_type?: string
          id?: string
          invited_by?: string | null
          invited_email?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      draft_comments: {
        Row: {
          block_id: string
          content: string
          created_at: string
          draft_id: string
          id: string
          parent_id: string | null
          quoted_text: string | null
          resolved: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          block_id: string
          content: string
          created_at?: string
          draft_id: string
          id?: string
          parent_id?: string | null
          quoted_text?: string | null
          resolved?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          block_id?: string
          content?: string
          created_at?: string
          draft_id?: string
          id?: string
          parent_id?: string | null
          quoted_text?: string | null
          resolved?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "draft_comments_draft_id_fkey"
            columns: ["draft_id"]
            isOneToOne: false
            referencedRelation: "drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "draft_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      drafts: {
        Row: {
          assignment_id: string
          bibliography: string | null
          citations: Json | null
          content: string | null
          contents_page: string | null
          created_at: string
          deleted_at: string | null
          id: string
          title_page: string | null
          updated_at: string
          word_count: number | null
        }
        Insert: {
          assignment_id: string
          bibliography?: string | null
          citations?: Json | null
          content?: string | null
          contents_page?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          title_page?: string | null
          updated_at?: string
          word_count?: number | null
        }
        Update: {
          assignment_id?: string
          bibliography?: string | null
          citations?: Json | null
          content?: string | null
          contents_page?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          title_page?: string | null
          updated_at?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "drafts_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_decks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          note_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          note_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          note_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_decks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_reviews: {
        Row: {
          flashcard_id: string
          id: string
          quality: number
          reviewed_at: string
          user_id: string
        }
        Insert: {
          flashcard_id: string
          id?: string
          quality: number
          reviewed_at?: string
          user_id: string
        }
        Update: {
          flashcard_id?: string
          id?: string
          quality?: number
          reviewed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_reviews_flashcard_id_fkey"
            columns: ["flashcard_id"]
            isOneToOne: false
            referencedRelation: "flashcards"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back: string
          created_at: string
          deck_id: string
          ease_factor: number
          front: string
          id: string
          interval: number
          next_review_date: string | null
          repetitions: number
          source_block_id: string | null
          source_heading: string | null
          updated_at: string
        }
        Insert: {
          back: string
          created_at?: string
          deck_id: string
          ease_factor?: number
          front: string
          id?: string
          interval?: number
          next_review_date?: string | null
          repetitions?: number
          source_block_id?: string | null
          source_heading?: string | null
          updated_at?: string
        }
        Update: {
          back?: string
          created_at?: string
          deck_id?: string
          ease_factor?: number
          front?: string
          id?: string
          interval?: number
          next_review_date?: string | null
          repetitions?: number
          source_block_id?: string | null
          source_heading?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_questions: {
        Row: {
          calculation: string | null
          created_at: string
          generated_question: string
          generation_type: string
          id: string
          markscheme: string
          question_hash: string
          source_filters: Json | null
          source_question_id: number | null
          source_question_text: string
          subject: string
          topic: string
        }
        Insert: {
          calculation?: string | null
          created_at?: string
          generated_question: string
          generation_type: string
          id?: string
          markscheme: string
          question_hash: string
          source_filters?: Json | null
          source_question_id?: number | null
          source_question_text: string
          subject: string
          topic: string
        }
        Update: {
          calculation?: string | null
          created_at?: string
          generated_question?: string
          generation_type?: string
          id?: string
          markscheme?: string
          question_hash?: string
          source_filters?: Json | null
          source_question_id?: number | null
          source_question_text?: string
          subject?: string
          topic?: string
        }
        Relationships: []
      }
      improvement_votes: {
        Row: {
          created_at: string
          id: string
          improvement_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          improvement_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          improvement_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "improvement_votes_improvement_id_fkey"
            columns: ["improvement_id"]
            isOneToOne: false
            referencedRelation: "improvements"
            referencedColumns: ["id"]
          },
        ]
      }
      improvements: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          id: string
          subject: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          subject?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          subject?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      outlines: {
        Row: {
          assignment_id: string
          created_at: string
          id: string
          sections: Json
          updated_at: string
        }
        Insert: {
          assignment_id: string
          created_at?: string
          id?: string
          sections: Json
          updated_at?: string
        }
        Update: {
          assignment_id?: string
          created_at?: string
          id?: string
          sections?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "outlines_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      past_papers: {
        Row: {
          code: string
          created_at: string
          doc_type: number | null
          file_url: string | null
          id: string
          is_markscheme: boolean | null
          is_resource: boolean | null
          level: string | null
          name: string
          paper_number: string | null
          session: string | null
          subject: string
          timezone: string | null
          year: number
        }
        Insert: {
          code: string
          created_at?: string
          doc_type?: number | null
          file_url?: string | null
          id?: string
          is_markscheme?: boolean | null
          is_resource?: boolean | null
          level?: string | null
          name: string
          paper_number?: string | null
          session?: string | null
          subject: string
          timezone?: string | null
          year: number
        }
        Update: {
          code?: string
          created_at?: string
          doc_type?: number | null
          file_url?: string | null
          id?: string
          is_markscheme?: boolean | null
          is_resource?: boolean | null
          level?: string | null
          name?: string
          paper_number?: string | null
          session?: string | null
          subject?: string
          timezone?: string | null
          year?: number
        }
        Relationships: []
      }
      plans: {
        Row: {
          assignment_id: string
          audience: string | null
          coaching_response: Json | null
          constraints: string | null
          created_at: string
          id: string
          questions: Json | null
          sections: Json | null
          thesis: string | null
          updated_at: string
        }
        Insert: {
          assignment_id: string
          audience?: string | null
          coaching_response?: Json | null
          constraints?: string | null
          created_at?: string
          id?: string
          questions?: Json | null
          sections?: Json | null
          thesis?: string | null
          updated_at?: string
        }
        Update: {
          assignment_id?: string
          audience?: string | null
          coaching_response?: Json | null
          constraints?: string | null
          created_at?: string
          id?: string
          questions?: Json | null
          sections?: Json | null
          thesis?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plans_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          consent_given: boolean | null
          created_at: string
          education_type: string | null
          full_name: string | null
          id: string
          school_name: string | null
          school_program: string | null
          updated_at: string
        }
        Insert: {
          consent_given?: boolean | null
          created_at?: string
          education_type?: string | null
          full_name?: string | null
          id: string
          school_name?: string | null
          school_program?: string | null
          updated_at?: string
        }
        Update: {
          consent_given?: boolean | null
          created_at?: string
          education_type?: string | null
          full_name?: string | null
          id?: string
          school_name?: string | null
          school_program?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          actions: Json | null
          assignment_id: string
          created_at: string
          feedback: Json | null
          id: string
          overall_summary: string | null
          rubric_id: string | null
          scores: Json | null
        }
        Insert: {
          actions?: Json | null
          assignment_id: string
          created_at?: string
          feedback?: Json | null
          id?: string
          overall_summary?: string | null
          rubric_id?: string | null
          scores?: Json | null
        }
        Update: {
          actions?: Json | null
          assignment_id?: string
          created_at?: string
          feedback?: Json | null
          id?: string
          overall_summary?: string | null
          rubric_id?: string | null
          scores?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "rubrics"
            referencedColumns: ["id"]
          },
        ]
      }
      rubrics: {
        Row: {
          created_at: string
          created_by: string | null
          criteria: Json
          id: string
          is_default: boolean | null
          name: string
          subject: Database["public"]["Enums"]["subject_type"]
          task_type: Database["public"]["Enums"]["task_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          criteria: Json
          id?: string
          is_default?: boolean | null
          name: string
          subject: Database["public"]["Enums"]["subject_type"]
          task_type: Database["public"]["Enums"]["task_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          criteria?: Json
          id?: string
          is_default?: boolean | null
          name?: string
          subject?: Database["public"]["Enums"]["subject_type"]
          task_type?: Database["public"]["Enums"]["task_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rubrics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_guides: {
        Row: {
          created_at: string
          file_url: string | null
          guide_name: string
          guide_text_content: string | null
          id: string
          subject: string
          updated_at: string
          year: number | null
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          guide_name: string
          guide_text_content?: string | null
          id?: string
          subject: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          created_at?: string
          file_url?: string | null
          guide_name?: string
          guide_text_content?: string | null
          id?: string
          subject?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      yjs_documents: {
        Row: {
          document_id: string
          document_type: string
          id: string
          state: string | null
          updated_at: string
        }
        Insert: {
          document_id: string
          document_type: string
          id?: string
          state?: string | null
          updated_at?: string
        }
        Update: {
          document_id?: string
          document_type?: string
          id?: string
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      yjs_updates: {
        Row: {
          created_at: string
          document_id: string
          document_type: string
          id: string
          update_data: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_id: string
          document_type: string
          id?: string
          update_data: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string
          document_type?: string
          id?: string
          update_data?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_document_collaborator: {
        Args: { _document_id: string; _document_type: string; _user_id: string }
        Returns: boolean
      }
      is_document_owner: {
        Args: { _document_id: string; _document_type: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "teacher" | "admin"
      assignment_status:
        | "draft"
        | "planning"
        | "outlining"
        | "writing"
        | "reviewing"
        | "complete"
      subject_type:
        | "tok"
        | "ee"
        | "english_a"
        | "french_b"
        | "spanish_b"
        | "swedish_b"
        | "business_management"
        | "economics"
        | "geography"
        | "history"
        | "sehs"
        | "physics"
        | "biology"
        | "chemistry"
        | "math_aa"
        | "math_ai"
        | "visual_arts"
        | "drama"
        | "other"
        | "lang_a_literature"
        | "lang_a_lang_lit"
        | "literature_performance"
        | "latin"
        | "classical_greek"
        | "arabic_ab"
        | "chinese_ab"
        | "french_ab"
        | "german_ab"
        | "hindi_ab"
        | "japanese_ab"
        | "korean_ab"
        | "portuguese_ab"
        | "russian_ab"
        | "spanish_ab"
        | "other_ab"
        | "english_b"
        | "german_b"
        | "italian_b"
        | "japanese_b"
        | "mandarin_b"
        | "other_b"
        | "digital_society"
        | "global_politics"
        | "philosophy"
        | "psychology"
        | "social_cultural_anthropology"
        | "world_religions"
        | "computer_science"
        | "design_technology"
        | "ess"
        | "music"
        | "theatre"
        | "dance"
        | "film"
        | "tok_essay"
        | "tok_exhibition"
      task_type: "essay" | "commentary" | "tok" | "ia" | "ee" | "other"
      user_role: "student" | "teacher" | "admin" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "teacher", "admin"],
      assignment_status: [
        "draft",
        "planning",
        "outlining",
        "writing",
        "reviewing",
        "complete",
      ],
      subject_type: [
        "tok",
        "ee",
        "english_a",
        "french_b",
        "spanish_b",
        "swedish_b",
        "business_management",
        "economics",
        "geography",
        "history",
        "sehs",
        "physics",
        "biology",
        "chemistry",
        "math_aa",
        "math_ai",
        "visual_arts",
        "drama",
        "other",
        "lang_a_literature",
        "lang_a_lang_lit",
        "literature_performance",
        "latin",
        "classical_greek",
        "arabic_ab",
        "chinese_ab",
        "french_ab",
        "german_ab",
        "hindi_ab",
        "japanese_ab",
        "korean_ab",
        "portuguese_ab",
        "russian_ab",
        "spanish_ab",
        "other_ab",
        "english_b",
        "german_b",
        "italian_b",
        "japanese_b",
        "mandarin_b",
        "other_b",
        "digital_society",
        "global_politics",
        "philosophy",
        "psychology",
        "social_cultural_anthropology",
        "world_religions",
        "computer_science",
        "design_technology",
        "ess",
        "music",
        "theatre",
        "dance",
        "film",
        "tok_essay",
        "tok_exhibition",
      ],
      task_type: ["essay", "commentary", "tok", "ia", "ee", "other"],
      user_role: ["student", "teacher", "admin", "parent"],
    },
  },
} as const
