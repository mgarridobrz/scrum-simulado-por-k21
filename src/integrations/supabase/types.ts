export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      action_initiatives: {
        Row: {
          action_id: string
          created_at: string
          id: string
          initiative_id: string
        }
        Insert: {
          action_id: string
          created_at?: string
          id?: string
          initiative_id: string
        }
        Update: {
          action_id?: string
          created_at?: string
          id?: string
          initiative_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_initiatives_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_initiatives_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      action_users: {
        Row: {
          action_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          action_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          action_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_users_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "action_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      actions: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          initiative_id: string | null
          status: Database["public"]["Enums"]["action_status"] | null
          test_card_id: string | null
          title: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          initiative_id?: string | null
          status?: Database["public"]["Enums"]["action_status"] | null
          test_card_id?: string | null
          title: string
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          initiative_id?: string | null
          status?: Database["public"]["Enums"]["action_status"] | null
          test_card_id?: string | null
          title?: string
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "actions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "actions_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actions_test_card_id_fkey"
            columns: ["test_card_id"]
            isOneToOne: false
            referencedRelation: "test_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_user_views: {
        Row: {
          broadcast_id: string
          id: string
          user_id: string
          viewed_at: string
          workspace_id: string
        }
        Insert: {
          broadcast_id: string
          id?: string
          user_id: string
          viewed_at?: string
          workspace_id: string
        }
        Update: {
          broadcast_id?: string
          id?: string
          user_id?: string
          viewed_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_user_views_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "broadcasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_user_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_user_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "broadcast_user_views_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_workspaces: {
        Row: {
          broadcast_id: string
          created_at: string
          id: string
          workspace_id: string
        }
        Insert: {
          broadcast_id: string
          created_at?: string
          id?: string
          workspace_id: string
        }
        Update: {
          broadcast_id?: string
          created_at?: string
          id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcast_workspaces_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "broadcasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcast_workspaces_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcasts: {
        Row: {
          broadcast_type: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          is_active: boolean
          message: string
          priority: number
          title: string
          updated_at: string
        }
        Insert: {
          broadcast_type?: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message: string
          priority?: number
          title: string
          updated_at?: string
        }
        Update: {
          broadcast_type?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          message?: string
          priority?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "broadcasts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "broadcasts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      error_logs: {
        Row: {
          additional_data: Json | null
          category: Database["public"]["Enums"]["error_category"]
          created_at: string
          error_code: string | null
          error_message: string
          error_stack: string | null
          feature_context: string | null
          id: string
          page_url: string | null
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          severity: Database["public"]["Enums"]["error_severity"]
          updated_at: string
          user_agent: string | null
          user_id: string | null
          workspace_id: string | null
        }
        Insert: {
          additional_data?: Json | null
          category?: Database["public"]["Enums"]["error_category"]
          created_at?: string
          error_code?: string | null
          error_message: string
          error_stack?: string | null
          feature_context?: string | null
          id?: string
          page_url?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["error_severity"]
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
          workspace_id?: string | null
        }
        Update: {
          additional_data?: Json | null
          category?: Database["public"]["Enums"]["error_category"]
          created_at?: string
          error_code?: string | null
          error_message?: string
          error_stack?: string | null
          feature_context?: string | null
          id?: string
          page_url?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["error_severity"]
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_logs_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      impediments: {
        Row: {
          created_at: string
          description: string
          id: string
          initiative_id: string | null
          resolved: boolean
          resolved_at: string | null
          test_card_id: string | null
          title: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          initiative_id?: string | null
          resolved?: boolean
          resolved_at?: string | null
          test_card_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          initiative_id?: string | null
          resolved?: boolean
          resolved_at?: string | null
          test_card_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "impediments_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
        ]
      }
      initiative_users: {
        Row: {
          created_at: string
          id: string
          initiative_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          initiative_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          initiative_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_initiative_users_initiative"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "initiative_users_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "initiative_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "initiative_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      initiatives: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_archived: boolean
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_archived?: boolean
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_archived?: boolean
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "initiatives_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "initiatives_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "initiatives_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      key_result_progress_history: {
        Row: {
          id: string
          key_result_id: string
          new_progress: number
          new_value: number
          notes: string | null
          old_progress: number | null
          old_value: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          id?: string
          key_result_id: string
          new_progress: number
          new_value: number
          notes?: string | null
          old_progress?: number | null
          old_value?: number | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          id?: string
          key_result_id?: string
          new_progress?: number
          new_value?: number
          notes?: string | null
          old_progress?: number | null
          old_value?: number | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_result_progress_history_key_result_id_fkey"
            columns: ["key_result_id"]
            isOneToOne: false
            referencedRelation: "key_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_result_progress_history_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_result_progress_history_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      key_result_test_cards: {
        Row: {
          created_at: string
          id: string
          key_result_id: string
          test_card_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_result_id: string
          test_card_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key_result_id?: string
          test_card_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_result_test_cards_key_result_id_fkey1"
            columns: ["key_result_id"]
            isOneToOne: false
            referencedRelation: "key_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_result_test_cards_test_card_id_fkey1"
            columns: ["test_card_id"]
            isOneToOne: false
            referencedRelation: "test_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      key_result_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          type_key: Database["public"]["Enums"]["key_result_type"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type_key: Database["public"]["Enums"]["key_result_type"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type_key?: Database["public"]["Enums"]["key_result_type"]
        }
        Relationships: []
      }
      key_result_users: {
        Row: {
          created_at: string
          id: string
          key_result_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_result_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key_result_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_result_users_key_result_id_fkey"
            columns: ["key_result_id"]
            isOneToOne: false
            referencedRelation: "key_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_result_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_result_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      key_results: {
        Row: {
          created_at: string
          current_value: number | null
          description: string | null
          display_order: number | null
          id: string
          initial_value: number | null
          key_result_type_id: string
          okr_id: string
          progress: number | null
          responsible_user_id: string | null
          status: Database["public"]["Enums"]["okr_status"]
          target_value: number
          title: string
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_value?: number | null
          description?: string | null
          display_order?: number | null
          id?: string
          initial_value?: number | null
          key_result_type_id: string
          okr_id: string
          progress?: number | null
          responsible_user_id?: string | null
          status?: Database["public"]["Enums"]["okr_status"]
          target_value: number
          title: string
          unit: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_value?: number | null
          description?: string | null
          display_order?: number | null
          id?: string
          initial_value?: number | null
          key_result_type_id?: string
          okr_id?: string
          progress?: number | null
          responsible_user_id?: string | null
          status?: Database["public"]["Enums"]["okr_status"]
          target_value?: number
          title?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_results_key_result_type_id_fkey"
            columns: ["key_result_type_id"]
            isOneToOne: false
            referencedRelation: "key_result_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_results_okr_id_fkey"
            columns: ["okr_id"]
            isOneToOne: false
            referencedRelation: "okrs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_results_responsible_user_id_fkey"
            columns: ["responsible_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_results_responsible_user_id_fkey"
            columns: ["responsible_user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      learnings: {
        Row: {
          created_at: string
          description: string
          id: string
          initiative_id: string | null
          test_card_id: string | null
          title: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          initiative_id?: string | null
          test_card_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          initiative_id?: string | null
          test_card_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learnings_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learnings_test_card_id_fkey"
            columns: ["test_card_id"]
            isOneToOne: false
            referencedRelation: "test_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learnings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      magic_link_tokens: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          token: string
          used: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          token: string
          used?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          token?: string
          used?: boolean
          user_id?: string
        }
        Relationships: []
      }
      okr_initiatives: {
        Row: {
          created_at: string
          id: string
          initiative_id: string
          okr_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          initiative_id: string
          okr_id: string
        }
        Update: {
          created_at?: string
          id?: string
          initiative_id?: string
          okr_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "okr_initiatives_initiative_id_fkey"
            columns: ["initiative_id"]
            isOneToOne: false
            referencedRelation: "initiatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "okr_initiatives_okr_id_fkey"
            columns: ["okr_id"]
            isOneToOne: false
            referencedRelation: "okrs"
            referencedColumns: ["id"]
          },
        ]
      }
      okr_test_cards: {
        Row: {
          created_at: string
          id: string
          okr_id: string
          test_card_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          okr_id: string
          test_card_id: string
        }
        Update: {
          created_at?: string
          id?: string
          okr_id?: string
          test_card_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "okr_test_cards_okr_id_fkey"
            columns: ["okr_id"]
            isOneToOne: false
            referencedRelation: "okrs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "okr_test_cards_test_card_id_fkey"
            columns: ["test_card_id"]
            isOneToOne: false
            referencedRelation: "test_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      okrs: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          display_order: number | null
          end_date: string
          frequency: Database["public"]["Enums"]["okr_frequency"]
          id: string
          progress: number | null
          responsible_user_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["okr_status"]
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          display_order?: number | null
          end_date: string
          frequency?: Database["public"]["Enums"]["okr_frequency"]
          id?: string
          progress?: number | null
          responsible_user_id?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["okr_status"]
          title: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          display_order?: number | null
          end_date?: string
          frequency?: Database["public"]["Enums"]["okr_frequency"]
          id?: string
          progress?: number | null
          responsible_user_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["okr_status"]
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean
          is_admin: boolean | null
          name: string
          organization_id: string | null
          preferred_language: string
          primary_workspace_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          email: string
          id: string
          is_active?: boolean
          is_admin?: boolean | null
          name: string
          organization_id?: string | null
          preferred_language?: string
          primary_workspace_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean
          is_admin?: boolean | null
          name?: string
          organization_id?: string | null
          preferred_language?: string
          primary_workspace_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_primary_workspace_id_fkey"
            columns: ["primary_workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          completion_time_seconds: number | null
          created_at: string | null
          email: string | null
          id: string
          language: string | null
          name: string
          questions_data: Json | null
          quiz_size: number
          score: number | null
        }
        Insert: {
          completion_time_seconds?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          language?: string | null
          name: string
          questions_data?: Json | null
          quiz_size: number
          score?: number | null
        }
        Update: {
          completion_time_seconds?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          language?: string | null
          name?: string
          questions_data?: Json | null
          quiz_size?: number
          score?: number | null
        }
        Relationships: []
      }
      quiz_categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          category_id: string
          correct_answer: string
          created_at: string | null
          explanation: string | null
          explanation_en: string | null
          id: number
          options: Json
          options_en: Json | null
          question: string
          question_en: string | null
          updated_at: string | null
        }
        Insert: {
          category_id: string
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          explanation_en?: string | null
          id?: number
          options: Json
          options_en?: Json | null
          question: string
          question_en?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          explanation_en?: string | null
          id?: number
          options?: Json
          options_en?: Json | null
          question?: string
          question_en?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "quiz_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      test_card_users: {
        Row: {
          created_at: string | null
          id: string
          test_card_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          test_card_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          test_card_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      test_cards: {
        Row: {
          created_at: string | null
          created_by: string
          criteria: string
          hypothesis: string
          id: string
          is_archived: boolean
          is_completed: boolean
          metric: string
          test_description: string
          title: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          criteria: string
          hypothesis: string
          id?: string
          is_archived?: boolean
          is_completed?: boolean
          metric: string
          test_description: string
          title: string
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          criteria?: string
          hypothesis?: string
          id?: string
          is_archived?: boolean
          is_completed?: boolean
          metric?: string
          test_description?: string
          title?: string
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "test_cards_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          status: string
          token: string
          workspace_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at: string
          id?: string
          invited_by: string
          status?: string
          token: string
          workspace_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          status?: string
          token?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_invitations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_last_activity: {
        Row: {
          activity_context: string | null
          created_at: string
          id: string
          last_visit: string
          page_path: string | null
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          activity_context?: string | null
          created_at?: string
          id?: string
          last_visit?: string
          page_path?: string | null
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          activity_context?: string | null
          created_at?: string
          id?: string
          last_visit?: string
          page_path?: string | null
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: []
      }
      workspace_events: {
        Row: {
          created_at: string
          entity_id: string
          entity_title: string
          entity_type: string
          event_type: string
          id: string
          metadata: Json | null
          test_card_id: string | null
          user_id: string | null
          workspace_id: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_title: string
          entity_type: string
          event_type: string
          id?: string
          metadata?: Json | null
          test_card_id?: string | null
          user_id?: string | null
          workspace_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_title?: string
          entity_type?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          test_card_id?: string | null
          user_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "workspace_events_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_users: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "workspace_users_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          initiatives_enabled: boolean | null
          is_active: boolean
          name: string
          okr_enabled: boolean | null
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          initiatives_enabled?: boolean | null
          is_active?: boolean
          name: string
          okr_enabled?: boolean | null
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          initiatives_enabled?: boolean | null
          is_active?: boolean
          name?: string
          okr_enabled?: boolean | null
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspaces_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "workspaces_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_engagement_scores: {
        Row: {
          completed_actions: number | null
          email: string | null
          engagement_level: string | null
          last_activity: string | null
          name: string | null
          total_actions: number | null
          total_impediments: number | null
          total_learnings: number | null
          total_score: number | null
          total_test_cards: number | null
          user_id: string | null
          workspace_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_users_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_user_invitation: {
        Args: { p_token: string; p_user_id: string }
        Returns: {
          success: boolean
          workspace_id: string
          workspace_name: string
          error_message: string
        }[]
      }
      audit_rls_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          rls_enabled: boolean
          policy_count: number
        }[]
      }
      can_deactivate_user: {
        Args: { user_id: string }
        Returns: boolean
      }
      can_delete_user: {
        Args: { user_id: string }
        Returns: boolean
      }
      can_manage_broadcasts_in_workspace: {
        Args: { p_workspace_id: string; p_user_id?: string }
        Returns: boolean
      }
      check_admin_status: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      cleanup_expired_magic_tokens: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      generate_magic_link_token: {
        Args: { target_user_id: string; created_by_user_id?: string }
        Returns: string
      }
      get_action_workspace: {
        Args: { action_id: string }
        Returns: string
      }
      get_active_broadcasts_for_user: {
        Args: { p_user_id: string; p_workspace_id: string }
        Returns: {
          id: string
          title: string
          message: string
          broadcast_type: string
          priority: number
          created_at: string
        }[]
      }
      get_all_user_activity: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          user_name: string
          user_email: string
          workspace_id: string
          workspace_name: string
          last_visit: string
          activity_context: string
          page_path: string
        }[]
      }
      get_broadcast_view_stats: {
        Args: { p_broadcast_id: string; p_workspace_id: string }
        Returns: {
          total_users: number
          viewed_users: number
        }[]
      }
      get_current_user_status: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_error_statistics: {
        Args: { p_workspace_id?: string; p_hours_back?: number }
        Returns: {
          total_errors: number
          unresolved_errors: number
          critical_errors: number
          high_severity_errors: number
          most_common_category: string
          most_common_feature: string
          error_trend_percentage: number
        }[]
      }
      get_invitation_details: {
        Args: { p_token: string }
        Returns: {
          valid: boolean
          workspace_name: string
          workspace_id: string
          invited_email: string
          inviter_name: string
          expires_at: string
          error_message: string
        }[]
      }
      get_system_activity_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_workspaces: number
          total_users: number
          users_with_activity: number
          recent_activity_1h: number
          workspaces_with_activity: number
          oldest_activity: string
          newest_activity: string
        }[]
      }
      get_test_card_workspace: {
        Args: { test_card_id: string }
        Returns: string
      }
      get_top_performers_for_quarter: {
        Args: { quarter: string; quiz_size: number }
        Returns: {
          name: string
          score: number
          completion_time_seconds: number
        }[]
      }
      get_user_engagement_ranking: {
        Args: { p_workspace_id: string; p_limit?: number }
        Returns: {
          user_id: string
          name: string
          email: string
          total_score: number
          engagement_level: string
          total_actions: number
          completed_actions: number
          total_learnings: number
          total_impediments: number
          total_test_cards: number
          last_activity: string
          rank_position: number
        }[]
      }
      get_user_last_activity: {
        Args: { p_workspace_id: string }
        Returns: {
          user_id: string
          user_name: string
          user_email: string
          last_visit: string
          activity_context: string
          page_path: string
        }[]
      }
      get_user_organization: {
        Args: { user_id?: string }
        Returns: string
      }
      get_user_workspace_role: {
        Args: { workspace_id: string; user_id: string }
        Returns: Database["public"]["Enums"]["workspace_role"]
      }
      get_user_workspaces: {
        Args: { user_id?: string }
        Returns: {
          workspace_id: string
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_organization_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_system_admin_simple: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_user_approved: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_workspace_admin_simple: {
        Args: { workspace_id: string; user_id?: string }
        Returns: boolean
      }
      is_workspace_member_simple: {
        Args: { workspace_id: string; user_id?: string }
        Returns: boolean
      }
      log_workspace_event: {
        Args: {
          p_workspace_id: string
          p_event_type: string
          p_entity_id: string
          p_entity_type: string
          p_entity_title: string
          p_user_id?: string
          p_test_card_id?: string
          p_metadata?: Json
        }
        Returns: undefined
      }
      mark_broadcast_as_viewed: {
        Args: {
          p_broadcast_id: string
          p_user_id: string
          p_workspace_id: string
        }
        Returns: boolean
      }
      safe_track_activity: {
        Args: {
          p_user_id: string
          p_workspace_id: string
          p_activity_context?: string
          p_page_path?: string
        }
        Returns: {
          success: boolean
          error_message: string
          validation_details: Json
        }[]
      }
      test_rls_recursion: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      toggle_user_active_status: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      user_in_workspace: {
        Args: { workspace_id: string; user_id: string }
        Returns: boolean
      }
      user_in_workspace_rls: {
        Args: { workspace_id: string }
        Returns: boolean
      }
      user_in_workspace_safe: {
        Args: { workspace_id: string; user_id?: string }
        Returns: boolean
      }
      user_is_system_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      user_is_workspace_admin: {
        Args: { workspace_id: string; user_id?: string }
        Returns: boolean
      }
      validate_activity_tracking_permissions: {
        Args: { p_user_id: string; p_workspace_id: string }
        Returns: {
          can_track: boolean
          user_exists: boolean
          workspace_exists: boolean
          is_member: boolean
          user_status: string
          error_message: string
        }[]
      }
      validate_magic_link_token: {
        Args: { token_value: string }
        Returns: string
      }
      validate_permission_hierarchy: {
        Args: { test_workspace_id: string }
        Returns: {
          test_name: string
          result: boolean
          details: string
        }[]
      }
    }
    Enums: {
      action_status: "todo" | "doing" | "done"
      error_category:
        | "api"
        | "ui"
        | "auth"
        | "database"
        | "network"
        | "validation"
        | "system"
        | "unknown"
      error_severity: "low" | "medium" | "high" | "critical"
      key_result_type:
        | "increase"
        | "reduce"
        | "maintain_above"
        | "maintain_below"
      okr_frequency: "quarterly" | "annual" | "semestral"
      okr_status: "not_started" | "in_progress" | "completed" | "paused"
      workspace_role: "admin" | "member"
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
      action_status: ["todo", "doing", "done"],
      error_category: [
        "api",
        "ui",
        "auth",
        "database",
        "network",
        "validation",
        "system",
        "unknown",
      ],
      error_severity: ["low", "medium", "high", "critical"],
      key_result_type: [
        "increase",
        "reduce",
        "maintain_above",
        "maintain_below",
      ],
      okr_frequency: ["quarterly", "annual", "semestral"],
      okr_status: ["not_started", "in_progress", "completed", "paused"],
      workspace_role: ["admin", "member"],
    },
  },
} as const
