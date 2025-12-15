
import { supabase } from "@/integrations/supabase/client";
import { fundamentalsQuestions } from "@/data/fundamentalsQuestions";
import { rolesQuestions } from "@/data/rolesQuestions";
import { eventsQuestions } from "@/data/eventsQuestions";  
import { artifactsQuestions } from "@/data/artifactsQuestions";
import { QuestionWithCategory } from "@/data/types";

/**
 * Utility function to migrate existing questions from local files to the database.
 * This is a one-time operation that can be called from the browser console if needed.
 */
export const migrateQuestionsToDatabase = async (themeSlug: string = 'csm'): Promise<void> => {
  // First, get the theme ID
  const { data: theme, error: themeError } = await supabase
    .from('quiz_themes')
    .select('id')
    .eq('slug', themeSlug)
    .single();
    
  if (themeError || !theme) {
    console.error(`Theme '${themeSlug}' not found. Please create the theme first.`);
    return;
  }
  
  const themeId = theme.id;
  console.log(`Using theme ID: ${themeId} for slug: ${themeSlug}`);
  
  // Combine all questions
  const allQuestions = [
    ...fundamentalsQuestions,
    ...rolesQuestions,
    ...eventsQuestions,
    ...artifactsQuestions
  ];
  
  console.log(`Preparing to migrate ${allQuestions.length} questions to the database...`);
  
  // Process in batches to avoid timeouts
  const batchSize = 20;
  const batches = [];
  
  for (let i = 0; i < allQuestions.length; i += batchSize) {
    batches.push(allQuestions.slice(i, i + batchSize));
  }
  
  console.log(`Created ${batches.length} batches of questions`);
  
  // Process each batch
  let migrated = 0;
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const result = await insertQuestionBatch(batch, themeId);
    migrated += result;
    console.log(`Batch ${i + 1}/${batches.length}: Migrated ${result} questions`);
  }
  
  console.log(`Migration complete. Total questions migrated: ${migrated}`);
};

/**
 * Helper function to insert a batch of questions
 */
const insertQuestionBatch = async (questions: QuestionWithCategory[], themeId: string): Promise<number> => {
  // Prepare the data for insertion
  const data = questions.map(q => ({
    question: q.question,
    category_id: q.category,
    options: q.options,
    correct_answer: q.correctAnswer,
    explanation: q.explanation || null,
    theme_id: themeId
  }));
  
  // Insert into database
  const { data: result, error } = await supabase
    .from('quiz_questions')
    .insert(data)
    .select('id');
  
  if (error) {
    console.error("Error inserting questions:", error);
    return 0;
  }
  
  return result.length;
};

// Make available globally for console access
(window as any).migrateQuestionsToDatabase = migrateQuestionsToDatabase;
