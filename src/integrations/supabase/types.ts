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
      action_suggestions: {
        Row: {
          context_id: string
          context_type: string
          created_at: string
          description: string
          id: string
          is_used: boolean
          title: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          context_id: string
          context_type: string
          created_at?: string
          description: string
          id?: string
          is_used?: boolean
          title: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          context_id?: string
          context_type?: string
          created_at?: string
          description?: string
          id?: string
          is_used?: boolean
          title?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: []
      }
      action_test_cards: {
        Row: {
          action_id: string
          created_at: string
          id: string
          test_card_id: string
        }
        Insert: {
          action_id: string
          created_at?: string
          id?: string
          test_card_id: string
        }
        Update: {
          action_id?: string
          created_at?: string
          id?: string
          test_card_id?: string
        }
        Relationships: []
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
          due_date: string | null
          id: string
          status: Database["public"]["Enums"]["action_status"] | null
          title: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: Database["public"]["Enums"]["action_status"] | null
          title: string
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: Database["public"]["Enums"]["action_status"] | null
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
            foreignKeyName: "actions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_function_usage: {
        Row: {
          created_at: string
          error_message: string | null
          execution_time_ms: number | null
          function_name: string
          id: string
          request_data: Json | null
          response_data: Json | null
          status: string
          tokens_used: number | null
          updated_at: string
          user_id: string | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          function_name: string
          id?: string
          request_data?: Json | null
          response_data?: Json | null
          status: string
          tokens_used?: number | null
          updated_at?: string
          user_id?: string | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          function_name?: string
          id?: string
          request_data?: Json | null
          response_data?: Json | null
          status?: string
          tokens_used?: number | null
          updated_at?: string
          user_id?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_function_usage_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_areas: {
        Row: {
          color: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          map_id: string
          name: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          map_id: string
          name: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          map_id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      battle_maps: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      battle_relationships: {
        Row: {
          created_at: string
          created_by: string | null
          hierarchy_type: Database["public"]["Enums"]["hierarchy_type"] | null
          id: string
          influence_type: Database["public"]["Enums"]["influence_type"] | null
          map_id: string | null
          notes: string | null
          relationship_type: Database["public"]["Enums"]["relationship_type"]
          source_id: string
          strength: number | null
          target_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          hierarchy_type?: Database["public"]["Enums"]["hierarchy_type"] | null
          id?: string
          influence_type?: Database["public"]["Enums"]["influence_type"] | null
          map_id?: string | null
          notes?: string | null
          relationship_type?: Database["public"]["Enums"]["relationship_type"]
          source_id: string
          strength?: number | null
          target_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          hierarchy_type?: Database["public"]["Enums"]["hierarchy_type"] | null
          id?: string
          influence_type?: Database["public"]["Enums"]["influence_type"] | null
          map_id?: string | null
          notes?: string | null
          relationship_type?: Database["public"]["Enums"]["relationship_type"]
          source_id?: string
          strength?: number | null
          target_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_relationships_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "battle_stakeholders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battle_relationships_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "battle_stakeholders"
            referencedColumns: ["id"]
          },
        ]
      }
      battle_stakeholders: {
        Row: {
          area_id: string | null
          color: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          influence_level: Database["public"]["Enums"]["stakeholder_influence_level"]
          map_id: string | null
          name: string
          title: string | null
          updated_at: string
          workspace_id: string | null
          x_position: number | null
          y_position: number | null
        }
        Insert: {
          area_id?: string | null
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          influence_level?: Database["public"]["Enums"]["stakeholder_influence_level"]
          map_id?: string | null
          name: string
          title?: string | null
          updated_at?: string
          workspace_id?: string | null
          x_position?: number | null
          y_position?: number | null
        }
        Update: {
          area_id?: string | null
          color?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          influence_level?: Database["public"]["Enums"]["stakeholder_influence_level"]
          map_id?: string | null
          name?: string
          title?: string | null
          updated_at?: string
          workspace_id?: string | null
          x_position?: number | null
          y_position?: number | null
        }
        Relationships: []
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
      game_attempts: {
        Row: {
          category: string
          correct_answers: number
          created_at: string
          email: string | null
          final_score_ms: number
          id: string
          language: string
          name: string
          penalty_time_ms: number
          question_count: number
          questions_data: Json
          total_time_ms: number
          updated_at: string
        }
        Insert: {
          category: string
          correct_answers?: number
          created_at?: string
          email?: string | null
          final_score_ms: number
          id?: string
          language?: string
          name: string
          penalty_time_ms?: number
          question_count: number
          questions_data: Json
          total_time_ms: number
          updated_at?: string
        }
        Update: {
          category?: string
          correct_answers?: number
          created_at?: string
          email?: string | null
          final_score_ms?: number
          id?: string
          language?: string
          name?: string
          penalty_time_ms?: number
          question_count?: number
          questions_data?: Json
          total_time_ms?: number
          updated_at?: string
        }
        Relationships: []
      }
      game_attempts_backup: {
        Row: {
          backed_up_at: string
          backed_up_by: string | null
          category: string
          correct_answers: number
          created_at: string
          email: string | null
          final_score_ms: number
          id: string
          language: string
          name: string
          original_id: string
          penalty_time_ms: number
          question_count: number
          questions_data: Json
          total_time_ms: number
          updated_at: string
        }
        Insert: {
          backed_up_at?: string
          backed_up_by?: string | null
          category: string
          correct_answers?: number
          created_at?: string
          email?: string | null
          final_score_ms: number
          id?: string
          language?: string
          name: string
          original_id: string
          penalty_time_ms?: number
          question_count: number
          questions_data: Json
          total_time_ms: number
          updated_at?: string
        }
        Update: {
          backed_up_at?: string
          backed_up_by?: string | null
          category?: string
          correct_answers?: number
          created_at?: string
          email?: string | null
          final_score_ms?: number
          id?: string
          language?: string
          name?: string
          original_id?: string
          penalty_time_ms?: number
          question_count?: number
          questions_data?: Json
          total_time_ms?: number
          updated_at?: string
        }
        Relationships: []
      }
      garridinho_resolve: {
        Row: {
          created_at: string
          id: string
          persona_name: string | null
          persona_plan: Json | null
          problem_description: string | null
          questions_and_answers: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          persona_name?: string | null
          persona_plan?: Json | null
          problem_description?: string | null
          questions_and_answers?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          persona_name?: string | null
          persona_plan?: Json | null
          problem_description?: string | null
          questions_and_answers?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      global_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      hawk_user_status: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          organization_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hawk_user_status_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hawk_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hawk_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
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
          star_rating: number
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
          star_rating?: number
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
          star_rating?: number
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
      kudos: {
        Row: {
          created_at: string
          from_user_id: string
          gif_url: string | null
          id: string
          important_delivery: boolean
          message: string
          organization_id: string
          points: number
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          gif_url?: string | null
          id?: string
          important_delivery?: boolean
          message: string
          organization_id: string
          points?: number
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          gif_url?: string | null
          id?: string
          important_delivery?: boolean
          message?: string
          organization_id?: string
          points?: number
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kudos_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kudos_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "kudos_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      kudos_organization_settings: {
        Row: {
          created_at: string
          engagement_enabled: boolean
          id: string
          min_days_for_max_bonus: number
          min_recognitions_for_bonus: number
          monthly_points_per_user: number
          organization_id: string
          point_value_brl: number | null
          recognized_values: string[] | null
          telegram_bot_name: string | null
          telegram_bot_token: string | null
          telegram_channel_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          engagement_enabled?: boolean
          id?: string
          min_days_for_max_bonus?: number
          min_recognitions_for_bonus?: number
          monthly_points_per_user?: number
          organization_id: string
          point_value_brl?: number | null
          recognized_values?: string[] | null
          telegram_bot_name?: string | null
          telegram_bot_token?: string | null
          telegram_channel_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          engagement_enabled?: boolean
          id?: string
          min_days_for_max_bonus?: number
          min_recognitions_for_bonus?: number
          monthly_points_per_user?: number
          organization_id?: string
          point_value_brl?: number | null
          recognized_values?: string[] | null
          telegram_bot_name?: string | null
          telegram_bot_token?: string | null
          telegram_channel_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kudos_organization_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      kudos_reactions: {
        Row: {
          created_at: string
          id: string
          kudos_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kudos_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kudos_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kudos_reactions_kudos_id_fkey"
            columns: ["kudos_id"]
            isOneToOne: false
            referencedRelation: "kudos"
            referencedColumns: ["id"]
          },
        ]
      }
      kudos_recipients: {
        Row: {
          created_at: string
          id: string
          kudos_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kudos_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kudos_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kudos_recipients_kudos_id_fkey"
            columns: ["kudos_id"]
            isOneToOne: false
            referencedRelation: "kudos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kudos_recipients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kudos_recipients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
        ]
      }
      kudos_user_balances: {
        Row: {
          available_points: number
          created_at: string
          id: string
          last_reset_at: string | null
          organization_id: string
          total_points_given: number
          total_points_received: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_points?: number
          created_at?: string
          id?: string
          last_reset_at?: string | null
          organization_id: string
          total_points_given?: number
          total_points_received?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_points?: number
          created_at?: string
          id?: string
          last_reset_at?: string | null
          organization_id?: string
          total_points_given?: number
          total_points_received?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kudos_user_balances_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      kudos_user_status: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          organization_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kudos_user_status_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kudos_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kudos_user_status_user_id_fkey"
            columns: ["user_id"]
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
          tags: string[] | null
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
          tags?: string[] | null
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
          tags?: string[] | null
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
      message_mentions: {
        Row: {
          created_at: string
          id: string
          mentioned_user_id: string
          message_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mentioned_user_id: string
          message_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mentioned_user_id?: string
          message_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_mentions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_mentions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reads: {
        Row: {
          created_at: string
          id: string
          message_id: string
          read_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          read_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          read_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reads_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_reads_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          initiative_id: string | null
          message_type: string | null
          test_card_id: string | null
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          initiative_id?: string | null
          message_type?: string | null
          test_card_id?: string | null
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          initiative_id?: string | null
          message_type?: string | null
          test_card_id?: string | null
          updated_at?: string
          user_id?: string
          workspace_id?: string
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
          is_archived: boolean
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
          is_archived?: boolean
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
          is_archived?: boolean
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
          account_type: Database["public"]["Enums"]["account_type"]
          created_at: string
          created_by: string
          description: string | null
          id: string
          joinkey_creation_enabled: boolean
          name: string
          updated_at: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          joinkey_creation_enabled?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          joinkey_creation_enabled?: boolean
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
          last_accessed_workspace_id: string | null
          name: string
          organization_id: string | null
          preferred_language: string
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
          last_accessed_workspace_id?: string | null
          name: string
          organization_id?: string | null
          preferred_language?: string
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
          last_accessed_workspace_id?: string | null
          name?: string
          organization_id?: string | null
          preferred_language?: string
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
            foreignKeyName: "profiles_last_accessed_workspace_id_fkey"
            columns: ["last_accessed_workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pulse_user_status: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          organization_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pulse_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulse_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
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
      quiz_questions_backup: {
        Row: {
          category_id: string | null
          correct_answer: string | null
          created_at: string | null
          explanation: string | null
          explanation_en: string | null
          id: number | null
          options: Json | null
          options_en: Json | null
          question: string | null
          question_en: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          explanation?: string | null
          explanation_en?: string | null
          id?: number | null
          options?: Json | null
          options_en?: Json | null
          question?: string | null
          question_en?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          explanation?: string | null
          explanation_en?: string | null
          id?: number | null
          options?: Json | null
          options_en?: Json | null
          question?: string | null
          question_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      restricted_access_tokens: {
        Row: {
          created_at: string
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean
          token_hash: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          token_hash: string
        }
        Update: {
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean
          token_hash?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string | null
          created_at: string | null
          details: Json | null
          id: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          updated_at: string | null
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          updated_at?: string | null
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          updated_at?: string | null
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_engagement_scores"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "subscriptions_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
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
          star_rating: number
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
          star_rating?: number
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
          star_rating?: number
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
          join_key: string
          name: string
          okr_enabled: boolean | null
          organization_id: string | null
          test_cards_enabled: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          initiatives_enabled?: boolean | null
          is_active?: boolean
          join_key: string
          name: string
          okr_enabled?: boolean | null
          organization_id?: string | null
          test_cards_enabled?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          initiatives_enabled?: boolean | null
          is_active?: boolean
          join_key?: string
          name?: string
          okr_enabled?: boolean | null
          organization_id?: string | null
          test_cards_enabled?: boolean
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
      analyze_quiz_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          correct_a: number
          correct_b: number
          correct_c: number
          correct_d: number
          total_questions: number
        }[]
      }
      audit_rls_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          policy_count: number
          rls_enabled: boolean
          table_name: string
        }[]
      }
      audit_user_privileges: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          is_admin: boolean
          organization_id: string
          user_id: string
          workspace_admin_count: number
        }[]
      }
      backup_all_game_attempts: {
        Args: { backup_user_id?: string }
        Returns: {
          error_message: string
          moved_count: number
        }[]
      }
      backup_quiz_questions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_user_engagement_bonus: {
        Args: {
          p_month_end?: string
          p_month_start?: string
          p_organization_id: string
          p_user_id: string
        }
        Returns: {
          bonus_percentage: number
          distinct_days: number
          total_recognitions: number
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
        Args: { p_user_id?: string; p_workspace_id: string }
        Returns: boolean
      }
      can_reset_monthly_points: {
        Args: { p_organization_id: string; p_user_id?: string }
        Returns: boolean
      }
      check_admin_status: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      check_user_addition_limit: {
        Args: { org_id: string }
        Returns: boolean
      }
      check_workspace_creation_limit: {
        Args: { org_id: string }
        Returns: boolean
      }
      cleanup_kudos_before_date: {
        Args: { cutoff_date: string }
        Returns: {
          points_restored_summary: Json
          total_kudos_removed: number
          total_users_affected: number
        }[]
      }
      create_kudos_with_recipients: {
        Args: {
          p_from_user_id: string
          p_gif_url?: string
          p_important_delivery?: boolean
          p_message: string
          p_organization_id: string
          p_points: number
          p_recipient_ids: string[]
          p_tags: string[]
        }
        Returns: Json
      }
      create_organization_user_transaction: {
        Args: {
          org_description: string
          org_name: string
          user_email: string
          user_id: string
          workspace_description: string
          workspace_name: string
        }
        Returns: Json
      }
      distribute_monthly_points: {
        Args: { p_organization_id: string }
        Returns: number
      }
      ensure_user_balance: {
        Args: { p_organization_id: string; p_user_id: string }
        Returns: undefined
      }
      generate_join_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_action_workspace: {
        Args: { action_id: string }
        Returns: string
      }
      get_active_broadcasts_for_user: {
        Args: { p_user_id: string; p_workspace_id: string }
        Returns: {
          broadcast_type: string
          created_at: string
          id: string
          message: string
          priority: number
          title: string
        }[]
      }
      get_active_users_count: {
        Args: { org_id: string }
        Returns: number
      }
      get_all_user_activity: {
        Args: Record<PropertyKey, never>
        Returns: {
          activity_context: string
          last_visit: string
          page_path: string
          user_email: string
          user_id: string
          user_name: string
          workspace_id: string
          workspace_name: string
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
        Args: { p_hours_back?: number; p_workspace_id?: string }
        Returns: {
          critical_errors: number
          error_trend_percentage: number
          high_severity_errors: number
          most_common_category: string
          most_common_feature: string
          total_errors: number
          unresolved_errors: number
        }[]
      }
      get_last_reset_info: {
        Args: { p_organization_id: string }
        Returns: {
          last_reset_date: string
          monthly_points: number
          total_users_reset: number
        }[]
      }
      get_organization_limits: {
        Args: { org_id: string }
        Returns: {
          max_users: number
          max_workspaces: number
        }[]
      }
      get_organization_settings: {
        Args: { p_organization_id: string }
        Returns: {
          monthly_points_per_user: number
          recognized_values: string[]
        }[]
      }
      get_organization_usage_stats: {
        Args: { org_id: string }
        Returns: {
          account_type: string
          can_add_user: boolean
          can_create_workspace: boolean
          current_users: number
          current_workspaces: number
          max_users: number
          max_workspaces: number
        }[]
      }
      get_recognitions_for_analysis: {
        Args: {
          p_end_date: string
          p_organization_id: string
          p_start_date: string
        }
        Returns: {
          created_at: string
          gif_url: string
          message: string
          points: number
          recipients: string[]
          sender_name: string
          tags: string[]
        }[]
      }
      get_system_activity_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          newest_activity: string
          oldest_activity: string
          recent_activity_1h: number
          total_users: number
          total_workspaces: number
          users_with_activity: number
          workspaces_with_activity: number
        }[]
      }
      get_test_card_workspace: {
        Args: { test_card_id: string }
        Returns: string
      }
      get_top_performers_for_quarter: {
        Args: { quarter: string; quiz_size: number }
        Returns: {
          completion_time_seconds: number
          name: string
          score: number
        }[]
      }
      get_unread_mentions_count: {
        Args: { p_user_id?: string; p_workspace_id: string }
        Returns: number
      }
      get_unread_message_count: {
        Args: { p_user_id?: string; p_workspace_id: string }
        Returns: number
      }
      get_user_engagement_ranking: {
        Args: { p_limit?: number; p_workspace_id: string }
        Returns: {
          completed_actions: number
          email: string
          engagement_level: string
          last_activity: string
          name: string
          rank_position: number
          total_actions: number
          total_impediments: number
          total_learnings: number
          total_score: number
          total_test_cards: number
          user_id: string
        }[]
      }
      get_user_last_activity: {
        Args: { p_workspace_id: string }
        Returns: {
          activity_context: string
          last_visit: string
          page_path: string
          user_email: string
          user_id: string
          user_name: string
        }[]
      }
      get_user_organization: {
        Args: { user_id?: string }
        Returns: string
      }
      get_user_workspace_role: {
        Args: { user_id: string; workspace_id: string }
        Returns: Database["public"]["Enums"]["workspace_role"]
      }
      get_user_workspaces: {
        Args: { user_id?: string }
        Returns: {
          workspace_id: string
        }[]
      }
      improved_rebalance_quiz_answers: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          changes_made: number
          distribution_summary: Json
          questions_processed: number
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_hawk_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_kudos_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_organization_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_pulse_admin_simple: {
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
        Args: { user_id?: string; workspace_id: string }
        Returns: boolean
      }
      is_workspace_member_simple: {
        Args: { user_id?: string; workspace_id: string }
        Returns: boolean
      }
      log_workspace_event: {
        Args: {
          p_entity_id: string
          p_entity_title: string
          p_entity_type: string
          p_event_type: string
          p_metadata?: Json
          p_test_card_id?: string
          p_user_id?: string
          p_workspace_id: string
        }
        Returns: undefined
      }
      mark_all_messages_read: {
        Args: { p_user_id?: string; p_workspace_id: string }
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
      notify_subscribers: {
        Args: {
          p_action_title: string
          p_actor_user_id: string
          p_entity_id: string
          p_entity_type: string
          p_event_type: string
          p_workspace_id: string
        }
        Returns: undefined
      }
      notify_subscribers_for_action_deletion: {
        Args: {
          p_action_id: string
          p_action_title: string
          p_actor_user_id: string
          p_workspace_id: string
        }
        Returns: undefined
      }
      rebalance_quiz_answers: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          changes_made: number
          questions_processed: number
        }[]
      }
      reconcile_user_monthly_balance: {
        Args: { p_organization_id: string; p_user_id?: string }
        Returns: {
          after_available: number
          after_given: number
          before_available: number
          before_given: number
          calculated_given: number
          delta_available: number
          user_id: string
        }[]
      }
      restore_all_game_attempts: {
        Args: Record<PropertyKey, never>
        Returns: {
          error_message: string
          restored_count: number
        }[]
      }
      restore_quiz_questions_from_backup: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      safe_track_activity: {
        Args: {
          p_activity_context?: string
          p_page_path?: string
          p_user_id: string
          p_workspace_id: string
        }
        Returns: {
          error_message: string
          success: boolean
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
      update_user_points_on_kudos: {
        Args: {
          p_from_user_id: string
          p_organization_id: string
          p_points: number
          p_to_user_id: string
        }
        Returns: undefined
      }
      user_in_workspace: {
        Args: { user_id: string; workspace_id: string }
        Returns: boolean
      }
      user_in_workspace_rls: {
        Args: { workspace_id: string }
        Returns: boolean
      }
      user_in_workspace_safe: {
        Args: { user_id?: string; workspace_id: string }
        Returns: boolean
      }
      user_is_system_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      user_is_workspace_admin: {
        Args: { user_id?: string; workspace_id: string }
        Returns: boolean
      }
      validate_activity_tracking_permissions: {
        Args: { p_user_id: string; p_workspace_id: string }
        Returns: {
          can_track: boolean
          error_message: string
          is_member: boolean
          user_exists: boolean
          user_status: string
          workspace_exists: boolean
        }[]
      }
      validate_permission_hierarchy: {
        Args: { test_workspace_id: string }
        Returns: {
          details: string
          result: boolean
          test_name: string
        }[]
      }
      validate_restricted_access: {
        Args: { input_password: string }
        Returns: boolean
      }
    }
    Enums: {
      account_type: "free" | "pro"
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
      hierarchy_type: "above" | "equal" | "below"
      influence_type: "promoter" | "neutral" | "detractor"
      key_result_type:
        | "increase"
        | "reduce"
        | "maintain_above"
        | "maintain_below"
      okr_frequency: "quarterly" | "annual" | "semestral"
      okr_status: "not_started" | "in_progress" | "completed" | "paused"
      relationship_type: "promoter" | "neutral" | "detractor"
      stakeholder_influence_level: "high" | "medium" | "low"
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
      account_type: ["free", "pro"],
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
      hierarchy_type: ["above", "equal", "below"],
      influence_type: ["promoter", "neutral", "detractor"],
      key_result_type: [
        "increase",
        "reduce",
        "maintain_above",
        "maintain_below",
      ],
      okr_frequency: ["quarterly", "annual", "semestral"],
      okr_status: ["not_started", "in_progress", "completed", "paused"],
      relationship_type: ["promoter", "neutral", "detractor"],
      stakeholder_influence_level: ["high", "medium", "low"],
      workspace_role: ["admin", "member"],
    },
  },
} as const
