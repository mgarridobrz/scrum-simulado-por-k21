export interface QuizTheme {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  subtitle: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ThemeConfig {
  themeId: string;
  themeSlug: string;
  themeName: string;
  subtitle: string | null;
}
