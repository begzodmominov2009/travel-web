export interface TourType {
  id: string;
  title: string;
  title_ru: string;
  title_uz: string;
  slug: string;

  description: string;

  category_id: string;
  destination_id: string;

  base_price: number;
  currency: string;
  discount_pct: number;

  duration_days: number;
  duration_nights: number;

  difficulty: string;

  min_people: number;
  max_people: number;

  cover_image: string;

  meeting_point: string;
  meeting_lat: number;
  meeting_lng: number;

  itinerary: string;

  highlights: string[];
  includes: string[];
  excludes: string[];

  is_active: boolean;
  is_featured: boolean;

  created_at: number;
  updated_at: number;
}
