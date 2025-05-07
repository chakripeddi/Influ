export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          address: string | null
          ai_preferences: Json | null
          brand_assets: Json | null
          business_name: string
          campaign_preferences: Json | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          industry: string
          logo_url: string | null
          setup_completed: boolean | null
          social_media: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          ai_preferences?: Json | null
          brand_assets?: Json | null
          business_name: string
          campaign_preferences?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          industry: string
          logo_url?: string | null
          setup_completed?: boolean | null
          social_media?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          ai_preferences?: Json | null
          brand_assets?: Json | null
          business_name?: string
          campaign_preferences?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string
          logo_url?: string | null
          setup_completed?: boolean | null
          social_media?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      campaign_applications: {
        Row: {
          additional_info: string | null
          available_dates: Json
          campaign_id: string
          created_at: string | null
          id: string
          influencer_id: string
          pitch: string
          proposed_content: string
          proposed_rate: number
          status: string
          updated_at: string | null
        }
        Insert: {
          additional_info?: string | null
          available_dates: Json
          campaign_id: string
          created_at?: string | null
          id?: string
          influencer_id: string
          pitch: string
          proposed_content: string
          proposed_rate: number
          status?: string
          updated_at?: string | null
        }
        Update: {
          additional_info?: string | null
          available_dates?: Json
          campaign_id?: string
          created_at?: string | null
          id?: string
          influencer_id?: string
          pitch?: string
          proposed_content?: string
          proposed_rate?: number
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_applications_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_details: {
        Row: {
          age_range: number[]
          brand_id: string
          budget: number
          content_types: string[]
          created_at: string | null
          date_range: Json
          description: string
          enable_ai_matching: boolean
          enable_referral: boolean
          engagement_rate: number
          id: string
          interests: string[]
          media: Json | null
          min_followers: number
          num_deliverables: number
          optimization_focus: string
          payment_terms: string
          payout_model: string
          platforms: string[]
          prefer_past_collaborators: boolean
          published_at: string | null
          referral_reward: number | null
          regions: string[]
          require_nda: boolean
          require_preapproval: boolean
          status: string
          terms_file: Json | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          age_range: number[]
          brand_id: string
          budget: number
          content_types: string[]
          created_at?: string | null
          date_range: Json
          description: string
          enable_ai_matching?: boolean
          enable_referral?: boolean
          engagement_rate?: number
          id?: string
          interests: string[]
          media?: Json | null
          min_followers?: number
          num_deliverables?: number
          optimization_focus?: string
          payment_terms: string
          payout_model: string
          platforms: string[]
          prefer_past_collaborators?: boolean
          published_at?: string | null
          referral_reward?: number | null
          regions: string[]
          require_nda?: boolean
          require_preapproval?: boolean
          status?: string
          terms_file?: Json | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          age_range?: number[]
          brand_id?: string
          budget?: number
          content_types?: string[]
          created_at?: string | null
          date_range?: Json
          description?: string
          enable_ai_matching?: boolean
          enable_referral?: boolean
          engagement_rate?: number
          id?: string
          interests?: string[]
          media?: Json | null
          min_followers?: number
          num_deliverables?: number
          optimization_focus?: string
          payment_terms?: string
          payout_model?: string
          platforms?: string[]
          prefer_past_collaborators?: boolean
          published_at?: string | null
          referral_reward?: number | null
          regions?: string[]
          require_nda?: boolean
          require_preapproval?: boolean
          status?: string
          terms_file?: Json | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_details_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand: string
          brand_logo: string | null
          budget: string
          category: string
          created_at: string | null
          deadline: string
          deliverables: string[]
          description: string
          detailed_description: string | null
          id: string
          platforms: string[]
          requirements: string[]
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          brand: string
          brand_logo?: string | null
          budget: string
          category: string
          created_at?: string | null
          deadline: string
          deliverables: string[]
          description: string
          detailed_description?: string | null
          id?: string
          platforms: string[]
          requirements: string[]
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          brand?: string
          brand_logo?: string | null
          budget?: string
          category?: string
          created_at?: string | null
          deadline?: string
          deliverables?: string[]
          description?: string
          detailed_description?: string | null
          id?: string
          platforms?: string[]
          requirements?: string[]
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      email_notifications: {
        Row: {
          delivery_status: string | null
          email_to: string
          html_content: string
          id: string
          notification_id: string | null
          sent_at: string | null
          subject: string
        }
        Insert: {
          delivery_status?: string | null
          email_to: string
          html_content: string
          id?: string
          notification_id?: string | null
          sent_at?: string | null
          subject: string
        }
        Update: {
          delivery_status?: string | null
          email_to?: string
          html_content?: string
          id?: string
          notification_id?: string | null
          sent_at?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_profiles: {
        Row: {
          bio: string | null
          categories: string[] | null
          content_samples: Json | null
          created_at: string | null
          display_name: string
          engagement_rate: number | null
          follower_counts: Json | null
          id: string
          payment_details: Json | null
          profile_image: string | null
          setup_completed: boolean | null
          social_platforms: Json | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          categories?: string[] | null
          content_samples?: Json | null
          created_at?: string | null
          display_name: string
          engagement_rate?: number | null
          follower_counts?: Json | null
          id: string
          payment_details?: Json | null
          profile_image?: string | null
          setup_completed?: boolean | null
          social_platforms?: Json | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          categories?: string[] | null
          content_samples?: Json | null
          created_at?: string | null
          display_name?: string
          engagement_rate?: number | null
          follower_counts?: Json | null
          id?: string
          payment_details?: Json | null
          profile_image?: string | null
          setup_completed?: boolean | null
          social_platforms?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_enabled: boolean
          id: string
          in_app_enabled: boolean
          sound_enabled: boolean
          updated_at: string | null
          user_id: string
          vibration_enabled: boolean
          whatsapp_enabled: boolean
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean
          id?: string
          in_app_enabled?: boolean
          sound_enabled?: boolean
          updated_at?: string | null
          user_id: string
          vibration_enabled?: boolean
          whatsapp_enabled?: boolean
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean
          id?: string
          in_app_enabled?: boolean
          sound_enabled?: boolean
          updated_at?: string | null
          user_id?: string
          vibration_enabled?: boolean
          whatsapp_enabled?: boolean
        }
        Relationships: []
      }
      notification_types: {
        Row: {
          applicable_roles: string[]
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          applicable_roles: string[]
          created_at?: string
          description?: string | null
          id: string
          name: string
        }
        Update: {
          applicable_roles?: string[]
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          message: string
          read_at: string | null
          title: string
          type_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message: string
          read_at?: string | null
          title: string
          type_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string
          read_at?: string | null
          title?: string
          type_id?: string
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          campaign_completed: boolean | null
          created_at: string | null
          id: string
          points_awarded: number | null
          referral_code: string
          referral_type: string | null
          referred_id: string
          referrer_id: string
          role: string
          status: string
          verified_at: string | null
        }
        Insert: {
          campaign_completed?: boolean | null
          created_at?: string | null
          id?: string
          points_awarded?: number | null
          referral_code: string
          referral_type?: string | null
          referred_id: string
          referrer_id: string
          role: string
          status: string
          verified_at?: string | null
        }
        Update: {
          campaign_completed?: boolean | null
          created_at?: string | null
          id?: string
          points_awarded?: number | null
          referral_code?: string
          referral_type?: string | null
          referred_id?: string
          referrer_id?: string
          role?: string
          status?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      test_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string
          referral_code: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password: string
          referral_code: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string
          referral_code?: string
          role?: string
        }
        Relationships: []
      }
      user_referrals: {
        Row: {
          brand_referral_code: string | null
          brand_referrals_count: number | null
          created_at: string | null
          id: string
          influencer_referral_code: string | null
          influencer_referrals_count: number | null
          points_earned: number | null
          referral_code: string
          referrals_count: number | null
          role: string
          user_id: string
        }
        Insert: {
          brand_referral_code?: string | null
          brand_referrals_count?: number | null
          created_at?: string | null
          id?: string
          influencer_referral_code?: string | null
          influencer_referrals_count?: number | null
          points_earned?: number | null
          referral_code: string
          referrals_count?: number | null
          role: string
          user_id: string
        }
        Update: {
          brand_referral_code?: string | null
          brand_referrals_count?: number | null
          created_at?: string | null
          id?: string
          influencer_referral_code?: string | null
          influencer_referrals_count?: number | null
          points_earned?: number | null
          referral_code?: string
          referrals_count?: number | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          points: number | null
          reference_id: string | null
          status: string
          transaction_type: string
          updated_at: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          points?: number | null
          reference_id?: string | null
          status?: string
          transaction_type: string
          updated_at?: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          points?: number | null
          reference_id?: string | null
          status?: string
          transaction_type?: string
          updated_at?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency: string
          id: string
          is_kyc_verified: boolean
          points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_kyc_verified?: boolean
          points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_kyc_verified?: boolean
          points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          admin_notes: string | null
          amount: number
          created_at: string
          id: string
          payment_details: Json
          payment_method: string
          status: string
          updated_at: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_at?: string
          id?: string
          payment_details: Json
          payment_method: string
          status?: string
          updated_at?: string
          user_id: string
          wallet_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_at?: string
          id?: string
          payment_details?: Json
          payment_method?: string
          status?: string
          updated_at?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawal_requests_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_notification: {
        Args: {
          p_user_id: string
          p_type_id: string
          p_title: string
          p_message: string
          p_data?: Json
        }
        Returns: string
      }
      add_wallet_transaction: {
        Args: {
          p_user_id: string
          p_amount: number
          p_transaction_type: string
          p_description?: string
          p_reference_id?: string
          p_points?: number
          p_status?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
