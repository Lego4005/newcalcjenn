export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'user' | 'agent' | 'broker'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'user' | 'agent' | 'broker'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'user' | 'agent' | 'broker'
          created_at?: string
          updated_at?: string
        }
      }
      saved_calculations: {
        Row: {
          id: string
          user_id: string
          name: string
          property_details: Json
          mortgage_info: Json
          commission_structure: Json
          additional_fees: Json
          created_at: string
          updated_at: string
          share_id: string | null
          is_public: boolean
        }
        Insert: {
          id?: string
          user_id?: string
          name: string
          property_details: Json
          mortgage_info: Json
          commission_structure: Json
          additional_fees: Json
          created_at?: string
          updated_at?: string
          share_id?: string | null
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          property_details?: Json
          mortgage_info?: Json
          commission_structure?: Json
          additional_fees?: Json
          created_at?: string
          updated_at?: string
          share_id?: string | null
          is_public?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_shared_calculation: {
        Args: { p_share_id: string }
        Returns: Database['public']['Tables']['saved_calculations']['Row'][]
      }
      get_user_calculations: {
        Args: { p_user_id: string }
        Returns: Database['public']['Tables']['saved_calculations']['Row'][]
      }
      toggle_calculation_sharing: {
        Args: { p_calculation_id: string; p_is_public: boolean }
        Returns: Database['public']['Tables']['saved_calculations']['Row']
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}