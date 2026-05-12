export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Category = {
  id: string;
  name: string;
  slug: string;
  thumbnail_url: string | null;
  created_at: string;
};

export type StudioImage = {
  id: string;
  title: string;
  description: string | null;
  category_id: string;
  image_url: string;
  show_on_home: boolean;
  show_on_hall_of_fame: boolean;
  created_at: string;
  categories?: Category | null;
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          thumbnail_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          thumbnail_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      images: {
        Row: StudioImage;
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category_id: string;
          image_url: string;
          show_on_home?: boolean;
          show_on_hall_of_fame?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category_id?: string;
          image_url?: string;
          show_on_home?: boolean;
          show_on_hall_of_fame?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "images_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
