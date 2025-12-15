import { supabase } from "@/integrations/supabase/client";
import { QuizTheme } from "@/types/theme";

/**
 * Fetches all active themes
 */
export async function fetchActiveThemes(): Promise<QuizTheme[]> {
  try {
    const { data, error } = await supabase
      .from('quiz_themes')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error("Error fetching themes:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchActiveThemes:", error);
    return [];
  }
}

/**
 * Fetches a theme by its slug
 */
export async function fetchThemeBySlug(slug: string): Promise<QuizTheme | null> {
  try {
    const { data, error } = await supabase
      .from('quiz_themes')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error("Error fetching theme by slug:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchThemeBySlug:", error);
    return null;
  }
}

/**
 * Fetches a theme by its ID
 */
export async function fetchThemeById(id: string): Promise<QuizTheme | null> {
  try {
    const { data, error } = await supabase
      .from('quiz_themes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching theme by id:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchThemeById:", error);
    return null;
  }
}
