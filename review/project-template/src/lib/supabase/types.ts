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
      // Add your database tables here
      // example:
      // users: {
      //   Row: {
      //     id: string
      //     name: string
      //     email: string
      //   }
      //   Insert: {
      //     id?: string
      //     name: string
      //     email: string
      //   }
      //   Update: {
      //     id?: string
      //     name?: string
      //     email?: string
      //   }
      // }
    }
    Views: {
      // Add your views here
    }
    Functions: {
      // Add your functions here
    }
    Enums: {
      // Add your enums here
    }
  }
}