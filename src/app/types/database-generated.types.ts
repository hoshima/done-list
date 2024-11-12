export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          created_at: string;
          date: string;
          description: string;
          id: string;
          name: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          description?: string;
          id?: string;
          name: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string;
          id?: string;
          name?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
