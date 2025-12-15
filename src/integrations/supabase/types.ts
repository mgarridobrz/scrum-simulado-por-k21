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
            foreignKeyName: "ai_function_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_function_usage_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_cleanup_logs: {
        Row: {
          created_at: string
          deleted_data_summary: Json | null
          deleted_user_emails: string[] | null
          dry_run: boolean
          executed_by: string | null
          execution_time_ms: number | null
          id: string
          orphaned_users_found: number
          users_deleted: number
        }
        Insert: {
          created_at?: string
          deleted_data_summary?: Json | null
          deleted_user_emails?: string[] | null
          dry_run?: boolean
          executed_by?: string | null
          execution_time_ms?: number | null
          id?: string
          orphaned_users_found?: number
          users_deleted?: number
        }
        Update: {
          created_at?: string
          deleted_data_summary?: Json | null
          deleted_user_emails?: string[] | null
          dry_run?: boolean
          executed_by?: string | null
          execution_time_ms?: number | null
          id?: string
          orphaned_users_found?: number
          users_deleted?: number
        }
        Relationships: [
          {
            foreignKeyName: "auth_cleanup_logs_executed_by_fkey"
            columns: ["executed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_tag_semantic_relationships: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          organization_id: string | null
          relationship_type: Database["public"]["Enums"]["tag_relationship_type"]
          similarity_score: number
          tag1: string
          tag2: string
          updated_at: string
          validated: boolean
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          organization_id?: string | null
          relationship_type?: Database["public"]["Enums"]["tag_relationship_type"]
          similarity_score: number
          tag1: string
          tag2: string
          updated_at?: string
          validated?: boolean
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          organization_id?: string | null
          relationship_type?: Database["public"]["Enums"]["tag_relationship_type"]
          similarity_score?: number
          tag1?: string
          tag2?: string
          updated_at?: string
          validated?: boolean
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beacon_tag_semantic_relationships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beacon_tag_semantic_relationships_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_user_status: {
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
            foreignKeyName: "beacon_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_wiki_article_comments: {
        Row: {
          article_id: string
          content: string
          created_at: string
          id: string
          organization_id: string
          parent_comment_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          article_id: string
          content: string
          created_at?: string
          id?: string
          organization_id: string
          parent_comment_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          article_id?: string
          content?: string
          created_at?: string
          id?: string
          organization_id?: string
          parent_comment_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beacon_wiki_article_comments_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beacon_wiki_article_comments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beacon_wiki_article_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_article_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_wiki_article_favorites: {
        Row: {
          article_id: string
          created_at: string
          id: string
          organization_id: string
          user_id: string
        }
        Insert: {
          article_id: string
          created_at?: string
          id?: string
          organization_id: string
          user_id: string
        }
        Update: {
          article_id?: string
          created_at?: string
          id?: string
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beacon_wiki_article_favorites_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beacon_wiki_article_favorites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_wiki_article_versions: {
        Row: {
          article_id: string
          change_summary: string | null
          changed_by: string
          content: string
          created_at: string
          id: string
          title: string
          version: number
        }
        Insert: {
          article_id: string
          change_summary?: string | null
          changed_by: string
          content: string
          created_at?: string
          id?: string
          title: string
          version: number
        }
        Update: {
          article_id?: string
          change_summary?: string | null
          changed_by?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "beacon_wiki_article_versions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_wiki_articles: {
        Row: {
          author_id: string
          category_id: string | null
          content: string
          created_at: string
          id: string
          organization_id: string
          parent_article_id: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          version: number
          view_count: number
        }
        Insert: {
          author_id: string
          category_id?: string | null
          content: string
          created_at?: string
          id?: string
          organization_id: string
          parent_article_id?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: number
          view_count?: number
        }
        Update: {
          author_id?: string
          category_id?: string | null
          content?: string
          created_at?: string
          id?: string
          organization_id?: string
          parent_article_id?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: number
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "beacon_wiki_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beacon_wiki_articles_parent_article_id_fkey"
            columns: ["parent_article_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      beacon_wiki_categories: {
        Row: {
          color: string | null
          created_at: string
          created_by: string
          description: string | null
          icon: string | null
          id: string
          name: string
          organization_id: string
          parent_category_id: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          organization_id: string
          parent_category_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          organization_id?: string
          parent_category_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "beacon_wiki_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "beacon_wiki_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      book_audio_mappings: {
        Row: {
          audio_urls: Json
          book_id: string
          created_at: string
          id: string
          page_spread_index: number
          updated_at: string
        }
        Insert: {
          audio_urls?: Json
          book_id: string
          created_at?: string
          id?: string
          page_spread_index: number
          updated_at?: string
        }
        Update: {
          audio_urls?: Json
          book_id?: string
          created_at?: string
          id?: string
          page_spread_index?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_audio_mappings_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          cover_image_url: string | null
          created_at: string
          id: string
          is_active: boolean
          pdf_url: string
          title: string
          total_pages: number
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          pdf_url: string
          title: string
          total_pages: number
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          pdf_url?: string
          title?: string
          total_pages?: number
          updated_at?: string
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
      gecko_proposal_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          organization_id: string
          pricing_type: Database["public"]["Enums"]["gecko_pricing_type"]
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          organization_id: string
          pricing_type: Database["public"]["Enums"]["gecko_pricing_type"]
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          organization_id?: string
          pricing_type?: Database["public"]["Enums"]["gecko_pricing_type"]
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gecko_proposal_item_slides: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          slide_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          slide_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          slide_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "gecko_proposal_item_slides_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "gecko_proposal_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gecko_proposal_item_slides_slide_id_fkey"
            columns: ["slide_id"]
            isOneToOne: false
            referencedRelation: "gecko_proposal_slides"
            referencedColumns: ["id"]
          },
        ]
      }
      gecko_proposal_items: {
        Row: {
          base_price: number
          category_id: string
          created_at: string
          hours: number | null
          id: string
          is_active: boolean
          name: string
          organization_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          base_price?: number
          category_id: string
          created_at?: string
          hours?: number | null
          id?: string
          is_active?: boolean
          name: string
          organization_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          base_price?: number
          category_id?: string
          created_at?: string
          hours?: number | null
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gecko_proposal_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "gecko_proposal_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      gecko_proposal_selected_items: {
        Row: {
          created_at: string
          hours: number
          id: string
          item_id: string
          proposal_id: string
          quantity: number
          subtotal: number
          unit_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          hours?: number
          id?: string
          item_id: string
          proposal_id: string
          quantity?: number
          subtotal: number
          unit_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          hours?: number
          id?: string
          item_id?: string
          proposal_id?: string
          quantity?: number
          subtotal?: number
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gecko_proposal_selected_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "gecko_proposal_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gecko_proposal_selected_items_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "gecko_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      gecko_proposal_slides: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          section_position: string | null
          slide_type: Database["public"]["Enums"]["gecko_slide_type"]
          slide_url: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          section_position?: string | null
          slide_type: Database["public"]["Enums"]["gecko_slide_type"]
          slide_url: string
          sort_order?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          section_position?: string | null
          slide_type?: Database["public"]["Enums"]["gecko_slide_type"]
          slide_url?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      gecko_proposals: {
        Row: {
          company: string
          created_at: string
          created_by: string | null
          description: string | null
          hours: number
          id: string
          investment: number
          organization_id: string | null
          public_code: string | null
          public_link: string | null
          security_pin: string | null
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          hours: number
          id?: string
          investment: number
          organization_id?: string | null
          public_code?: string | null
          public_link?: string | null
          security_pin?: string | null
          start_date: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          hours?: number
          id?: string
          investment?: number
          organization_id?: string | null
          public_code?: string | null
          public_link?: string | null
          security_pin?: string | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gecko_proposals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gecko_proposals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      gecko_user_status: {
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
            foreignKeyName: "gecko_user_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      global_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: boolean
          setting_value_int: number | null
          setting_value_text: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value?: boolean
          setting_value_int?: number | null
          setting_value_text?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: boolean
          setting_value_int?: number | null
          setting_value_text?: string | null
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
          new_value: number
          notes: string | null
          old_value: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          id?: string
          key_result_id: string
          new_value: number
          notes?: string | null
          old_value?: number | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          id?: string
          key_result_id?: string
          new_value?: number
          notes?: string | null
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
          auto_reset_enabled: boolean | null
          created_at: string
          engagement_enabled: boolean
          id: string
          last_auto_reset_date: string | null
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
          auto_reset_enabled?: boolean | null
          created_at?: string
          engagement_enabled?: boolean
          id?: string
          last_auto_reset_date?: string | null
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
          auto_reset_enabled?: boolean | null
          created_at?: string
          engagement_enabled?: boolean
          id?: string
          last_auto_reset_date?: string | null
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
      organization_apps: {
        Row: {
          app_name: string
          created_at: string | null
          enabled_at: string | null
          id: string
          is_enabled: boolean
          organization_id: string
          updated_at: string | null
        }
        Insert: {
          app_name: string
          created_at?: string | null
          enabled_at?: string | null
          id?: string
          is_enabled?: boolean
          organization_id: string
          updated_at?: string | null
        }
        Update: {
          app_name?: string
          created_at?: string | null
          enabled_at?: string | null
          id?: string
          is_enabled?: boolean
          organization_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_apps_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          created_at: string
          created_by: string
          description: string | null
          id: string
          joinkey_creation_enabled: boolean
          manual_trial_days: number | null
          name: string
          trial_started_at: string | null
          updated_at: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          joinkey_creation_enabled?: boolean
          manual_trial_days?: number | null
          name: string
          trial_started_at?: string | null
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          joinkey_creation_enabled?: boolean
          manual_trial_days?: number | null
          name?: string
          trial_started_at?: string | null
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
      pulse_dimensions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_index: number
          organization_id: string
          questionnaire_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          organization_id: string
          questionnaire_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          organization_id?: string
          questionnaire_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pulse_dimensions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulse_dimensions_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "pulse_questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
      pulse_questionnaires: {
        Row: {
          activated_at: string | null
          created_at: string
          created_by: string
          deactivated_at: string | null
          description: string | null
          id: string
          organization_id: string
          status: Database["public"]["Enums"]["pulse_questionnaire_status"]
          title: string
          type: Database["public"]["Enums"]["pulse_questionnaire_type"]
          updated_at: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          created_by: string
          deactivated_at?: string | null
          description?: string | null
          id?: string
          organization_id: string
          status?: Database["public"]["Enums"]["pulse_questionnaire_status"]
          title: string
          type?: Database["public"]["Enums"]["pulse_questionnaire_type"]
          updated_at?: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          created_by?: string
          deactivated_at?: string | null
          description?: string | null
          id?: string
          organization_id?: string
          status?: Database["public"]["Enums"]["pulse_questionnaire_status"]
          title?: string
          type?: Database["public"]["Enums"]["pulse_questionnaire_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pulse_questionnaires_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulse_questionnaires_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pulse_questions: {
        Row: {
          created_at: string
          dimension_id: string
          id: string
          is_required: boolean
          options: Json | null
          order_index: number
          organization_id: string
          question_text: string
          question_type: Database["public"]["Enums"]["pulse_question_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          dimension_id: string
          id?: string
          is_required?: boolean
          options?: Json | null
          order_index?: number
          organization_id: string
          question_text: string
          question_type?: Database["public"]["Enums"]["pulse_question_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          dimension_id?: string
          id?: string
          is_required?: boolean
          options?: Json | null
          order_index?: number
          organization_id?: string
          question_text?: string
          question_type?: Database["public"]["Enums"]["pulse_question_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pulse_questions_dimension_id_fkey"
            columns: ["dimension_id"]
            isOneToOne: false
            referencedRelation: "pulse_dimensions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulse_questions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pulse_responses: {
        Row: {
          answers: Json
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          organization_id: string
          questionnaire_id: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          organization_id: string
          questionnaire_id: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          organization_id?: string
          questionnaire_id?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pulse_survey_assignments: {
        Row: {
          access_token: string
          accessed_at: string | null
          completed_at: string | null
          created_at: string
          expires_at: string
          id: string
          organization_id: string
          questionnaire_id: string
          status: Database["public"]["Enums"]["pulse_assignment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          accessed_at?: string | null
          completed_at?: string | null
          created_at?: string
          expires_at: string
          id?: string
          organization_id: string
          questionnaire_id: string
          status?: Database["public"]["Enums"]["pulse_assignment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          accessed_at?: string | null
          completed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          organization_id?: string
          questionnaire_id?: string
          status?: Database["public"]["Enums"]["pulse_assignment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pulse_survey_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulse_survey_assignments_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "pulse_questionnaires"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulse_survey_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      auth_cleanup_stats: {
        Row: {
          created_at: string | null
          deleted_data_summary: Json | null
          deleted_user_emails: string[] | null
          dry_run: boolean | null
          executed_by: string | null
          execution_time_ms: number | null
          id: string | null
          orphaned_users_found: number | null
          total_dependencies_cleaned: number | null
          users_deleted: number | null
          users_with_dependencies: number | null
        }
        Insert: {
          created_at?: string | null
          deleted_data_summary?: Json | null
          deleted_user_emails?: string[] | null
          dry_run?: boolean | null
          executed_by?: string | null
          execution_time_ms?: number | null
          id?: string | null
          orphaned_users_found?: number | null
          total_dependencies_cleaned?: never
          users_deleted?: number | null
          users_with_dependencies?: never
        }
        Update: {
          created_at?: string | null
          deleted_data_summary?: Json | null
          deleted_user_emails?: string[] | null
          dry_run?: boolean | null
          executed_by?: string | null
          execution_time_ms?: number | null
          id?: string | null
          orphaned_users_found?: number | null
          total_dependencies_cleaned?: never
          users_deleted?: number | null
          users_with_dependencies?: never
        }
        Relationships: [
          {
            foreignKeyName: "auth_cleanup_logs_executed_by_fkey"
            columns: ["executed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      analyze_quiz_distribution: {
        Args: never
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
        Args: never
        Returns: {
          policy_count: number
          rls_enabled: boolean
          table_name: string
        }[]
      }
      audit_user_privileges: {
        Args: never
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
      backup_quiz_questions: { Args: never; Returns: undefined }
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
      can_deactivate_user: { Args: { user_id: string }; Returns: boolean }
      can_delete_user: { Args: { user_id: string }; Returns: boolean }
      can_manage_broadcasts_in_workspace: {
        Args: { p_user_id?: string; p_workspace_id: string }
        Returns: boolean
      }
      can_reset_monthly_points: {
        Args: { p_organization_id: string; p_user_id?: string }
        Returns: boolean
      }
      check_admin_status: { Args: { check_user_id: string }; Returns: boolean }
      check_app_user_limit: {
        Args: { p_app_name: string; p_org_id: string }
        Returns: boolean
      }
      check_user_addition_limit: { Args: { org_id: string }; Returns: boolean }
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
      fix_existing_organization_owners: {
        Args: never
        Returns: {
          apps_fixed: number
          org_id: string
          org_name: string
          owner_email: string
          owner_id: string
          owner_name: string
          was_global_admin: boolean
        }[]
      }
      generate_join_key: { Args: never; Returns: string }
      generate_survey_token: { Args: never; Returns: string }
      get_action_workspace: { Args: { action_id: string }; Returns: string }
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
      get_active_users_count: { Args: { org_id: string }; Returns: number }
      get_all_user_activity: {
        Args: never
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
      get_app_limits: {
        Args: { p_app_name: string; p_org_id: string }
        Returns: {
          max_users: number
          max_workspaces: number
        }[]
      }
      get_broadcast_view_stats: {
        Args: { p_broadcast_id: string; p_workspace_id: string }
        Returns: {
          total_users: number
          viewed_users: number
        }[]
      }
      get_current_user_status: { Args: never; Returns: string }
      get_daily_kudos: {
        Args: { days_back?: number; org_id: string }
        Returns: {
          count: number
          date: string
        }[]
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
      get_monthly_kudos: {
        Args: { months_back?: number; org_id: string }
        Returns: {
          count: number
          month: string
          points: number
        }[]
      }
      get_org_last_activity: {
        Args: never
        Returns: {
          last_activity: string
          organization_id: string
        }[]
      }
      get_org_users_with_last_login: {
        Args: { p_organization_id: string }
        Returns: {
          last_sign_in_at: string
          user_id: string
        }[]
      }
      get_organization_last_activity: {
        Args: { org_id: string }
        Returns: {
          activity_type: string
          last_activity_date: string
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
          is_trial_expired: boolean
          max_users: number
          max_workspaces: number
          trial_days_remaining: number
          trial_duration_days: number
          trial_started_at: string
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
      get_survey_by_token: {
        Args: { p_token: string }
        Returns: {
          assignment_id: string
          assignment_status: Database["public"]["Enums"]["pulse_assignment_status"]
          expires_at: string
          is_expired: boolean
          questionnaire_description: string
          questionnaire_id: string
          questionnaire_title: string
        }[]
      }
      get_system_activity_stats: {
        Args: never
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
      get_top_kudos_givers: {
        Args: { p_limit?: number; p_organization_id: string }
        Returns: {
          total_kudos: number
          user_email: string
          user_id: string
          user_name: string
        }[]
      }
      get_top_kudos_receivers: {
        Args: { p_limit?: number; p_organization_id: string }
        Returns: {
          total_kudos: number
          user_email: string
          user_id: string
          user_name: string
        }[]
      }
      get_top_performers_for_quarter: {
        Args: { quarter: string; quiz_size: number }
        Returns: {
          completion_time_seconds: number
          name: string
          score: number
        }[]
      }
      get_trial_days_remaining: { Args: { org_id: string }; Returns: number }
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
      get_user_organization: { Args: { user_id?: string }; Returns: string }
      get_user_organization_id: { Args: { user_id: string }; Returns: string }
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
      get_weekly_cfd_data: {
        Args: { org_id: string }
        Returns: {
          tag: string
          tag_count: number
          week_start: string
        }[]
      }
      improved_rebalance_quiz_answers: {
        Args: never
        Returns: {
          category: string
          changes_made: number
          distribution_summary: Json
          questions_processed: number
        }[]
      }
      initialize_organization_trial: {
        Args: { org_id: string }
        Returns: undefined
      }
      is_active_beacon_user: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_active_gecko_user: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_active_pulse_user: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_admin: { Args: { user_id: string }; Returns: boolean }
      is_beacon_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_gecko_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_gecko_user_active: { Args: { user_id?: string }; Returns: boolean }
      is_hawk_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_kudos_admin_for_org: {
        Args: { p_organization_id: string; p_user_id?: string }
        Returns: boolean
      }
      is_kudos_admin_simple: {
        Args: { org_id: string; user_id?: string }
        Returns: boolean
      }
      is_org_owner: {
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
      is_system_admin_simple: { Args: { user_id?: string }; Returns: boolean }
      is_test_card_member: {
        Args: { p_test_card_id: string; p_user_id?: string }
        Returns: boolean
      }
      is_trial_expired: { Args: { org_id: string }; Returns: boolean }
      is_user_approved: { Args: { user_id: string }; Returns: boolean }
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
      populate_existing_gecko_users: { Args: never; Returns: number }
      rebalance_quiz_answers: {
        Args: never
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
        Args: never
        Returns: {
          error_message: string
          restored_count: number
        }[]
      }
      restore_quiz_questions_from_backup: { Args: never; Returns: undefined }
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
      select_random_respondents: {
        Args: {
          p_count: number
          p_days_to_expire?: number
          p_questionnaire_id: string
        }
        Returns: {
          access_token: string
          assignment_id: string
          expires_at: string
          user_email: string
          user_id: string
          user_name: string
        }[]
      }
      test_rls_recursion: { Args: never; Returns: string }
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
      user_is_system_admin: { Args: { user_id?: string }; Returns: boolean }
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
      validate_questionnaire_activation: {
        Args: { p_organization_id: string; p_questionnaire_id: string }
        Returns: boolean
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
      gecko_pricing_type: "per_individual" | "per_month" | "total_value"
      gecko_slide_type: "global" | "contextual"
      hierarchy_type: "above" | "equal" | "below"
      influence_type: "promoter" | "neutral" | "detractor"
      key_result_type:
        | "increase"
        | "reduce"
        | "maintain_above"
        | "maintain_below"
      okr_frequency: "quarterly" | "annual" | "semestral"
      okr_status: "not_started" | "in_progress" | "completed" | "paused"
      pulse_assignment_status: "pending" | "completed" | "expired"
      pulse_question_type: "multiple_choice" | "open_text"
      pulse_questionnaire_status: "draft" | "active" | "inactive" | "archived"
      pulse_questionnaire_type: "complete" | "pulse"
      relationship_type: "promoter" | "neutral" | "detractor"
      stakeholder_influence_level: "high" | "medium" | "low"
      tag_relationship_type: "semantic" | "contextual" | "conceptual"
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
      gecko_pricing_type: ["per_individual", "per_month", "total_value"],
      gecko_slide_type: ["global", "contextual"],
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
      pulse_assignment_status: ["pending", "completed", "expired"],
      pulse_question_type: ["multiple_choice", "open_text"],
      pulse_questionnaire_status: ["draft", "active", "inactive", "archived"],
      pulse_questionnaire_type: ["complete", "pulse"],
      relationship_type: ["promoter", "neutral", "detractor"],
      stakeholder_influence_level: ["high", "medium", "low"],
      tag_relationship_type: ["semantic", "contextual", "conceptual"],
      workspace_role: ["admin", "member"],
    },
  },
} as const
