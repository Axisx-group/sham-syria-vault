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
      account_applications: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          address_line1: string
          address_line2: string | null
          admin_notes: string | null
          application_token: string | null
          business_name: string | null
          business_registration_number: string | null
          business_tax_id: string | null
          business_type: string | null
          city: string
          country: string
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string
          id: string
          initial_deposit: number | null
          kyc_application_id: string | null
          last_name: string
          nationality: string | null
          phone: string
          postal_code: string | null
          preferred_currency: string | null
          request_credit_card: boolean | null
          request_debit_card: boolean | null
          reviewed_at: string | null
          reviewed_by: string | null
          state: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_type: Database["public"]["Enums"]["account_type"]
          address_line1: string
          address_line2?: string | null
          admin_notes?: string | null
          application_token?: string | null
          business_name?: string | null
          business_registration_number?: string | null
          business_tax_id?: string | null
          business_type?: string | null
          city: string
          country?: string
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name: string
          id?: string
          initial_deposit?: number | null
          kyc_application_id?: string | null
          last_name: string
          nationality?: string | null
          phone: string
          postal_code?: string | null
          preferred_currency?: string | null
          request_credit_card?: boolean | null
          request_debit_card?: boolean | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          address_line1?: string
          address_line2?: string | null
          admin_notes?: string | null
          application_token?: string | null
          business_name?: string | null
          business_registration_number?: string | null
          business_tax_id?: string | null
          business_type?: string | null
          city?: string
          country?: string
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string
          id?: string
          initial_deposit?: number | null
          kyc_application_id?: string | null
          last_name?: string
          nationality?: string | null
          phone?: string
          postal_code?: string | null
          preferred_currency?: string | null
          request_credit_card?: boolean | null
          request_debit_card?: boolean | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_applications_kyc_application_id_fkey"
            columns: ["kyc_application_id"]
            isOneToOne: false
            referencedRelation: "kyc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_access_logs: {
        Row: {
          access_type: string
          additional_data: Json | null
          created_at: string | null
          id: string
          ip_address: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          access_type: string
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          access_type?: string
          additional_data?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          application_id: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_at: string | null
        }
        Insert: {
          application_id?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Update: {
          application_id?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "account_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_applications: {
        Row: {
          account_application_id: string | null
          address_info: Json | null
          created_at: string
          employment_info: Json | null
          id: string
          income_info: Json | null
          level: Database["public"]["Enums"]["kyc_level"]
          personal_info: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_assessment: Json | null
          status: Database["public"]["Enums"]["kyc_status"]
          updated_at: string
          user_id: string
          verification_notes: string | null
        }
        Insert: {
          account_application_id?: string | null
          address_info?: Json | null
          created_at?: string
          employment_info?: Json | null
          id?: string
          income_info?: Json | null
          level?: Database["public"]["Enums"]["kyc_level"]
          personal_info?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_assessment?: Json | null
          status?: Database["public"]["Enums"]["kyc_status"]
          updated_at?: string
          user_id: string
          verification_notes?: string | null
        }
        Update: {
          account_application_id?: string | null
          address_info?: Json | null
          created_at?: string
          employment_info?: Json | null
          id?: string
          income_info?: Json | null
          level?: Database["public"]["Enums"]["kyc_level"]
          personal_info?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_assessment?: Json | null
          status?: Database["public"]["Enums"]["kyc_status"]
          updated_at?: string
          user_id?: string
          verification_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_applications_account_application_id_fkey"
            columns: ["account_application_id"]
            isOneToOne: false
            referencedRelation: "account_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_documents: {
        Row: {
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          kyc_application_id: string
          mime_type: string | null
          uploaded_at: string
          verification_notes: string | null
          verification_status: Database["public"]["Enums"]["kyc_status"] | null
        }
        Insert: {
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          kyc_application_id: string
          mime_type?: string | null
          uploaded_at?: string
          verification_notes?: string | null
          verification_status?: Database["public"]["Enums"]["kyc_status"] | null
        }
        Update: {
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          kyc_application_id?: string
          mime_type?: string | null
          uploaded_at?: string
          verification_notes?: string | null
          verification_status?: Database["public"]["Enums"]["kyc_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_kyc_application_id_fkey"
            columns: ["kyc_application_id"]
            isOneToOne: false
            referencedRelation: "kyc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_verification_steps: {
        Row: {
          completed_at: string | null
          created_at: string
          data: Json | null
          id: string
          kyc_application_id: string
          status: Database["public"]["Enums"]["kyc_status"]
          step_name: string
          step_type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          kyc_application_id: string
          status?: Database["public"]["Enums"]["kyc_status"]
          step_name: string
          step_type: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          kyc_application_id?: string
          status?: Database["public"]["Enums"]["kyc_status"]
          step_name?: string
          step_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "kyc_verification_steps_kyc_application_id_fkey"
            columns: ["kyc_application_id"]
            isOneToOne: false
            referencedRelation: "kyc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_customers: {
        Row: {
          application_token: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
        }
        Insert: {
          application_token: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
        }
        Update: {
          application_token?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "personal" | "business"
      application_status: "pending" | "under_review" | "approved" | "rejected"
      document_type:
        | "national_id"
        | "passport"
        | "business_license"
        | "commercial_registration"
      kyc_level: "basic" | "intermediate" | "advanced"
      kyc_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "incomplete"
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
    Enums: {
      account_type: ["personal", "business"],
      application_status: ["pending", "under_review", "approved", "rejected"],
      document_type: [
        "national_id",
        "passport",
        "business_license",
        "commercial_registration",
      ],
      kyc_level: ["basic", "intermediate", "advanced"],
      kyc_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "incomplete",
      ],
    },
  },
} as const
