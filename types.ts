export type Option = {
  id: string;
  text: string;
  score: number;
};

export type Question = {
  id: number;
  text: string;
  category: string;
  options: Option[];
};

export type AppState = 'LANDING' | 'QUIZ' | 'CAPTURE' | 'RESULTS';

export type UserData = {
  answers: Record<number, number>; // Question ID -> Score
  email: string;
  revenueRange: string;
};

// Structure for Supabase DB Insert
export type LeadRecord = {
  email: string;
  score: number;
  revenue_range: string;
  answers: Record<number, number>;
};