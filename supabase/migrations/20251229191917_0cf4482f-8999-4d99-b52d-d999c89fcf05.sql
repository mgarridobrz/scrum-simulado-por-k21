-- Step 1: Convert options_en from object to array format (for questions where options_en is an object)
UPDATE quiz_questions
SET options_en = jsonb_build_array(
  jsonb_build_object('id', 'a', 'text', options_en->>'a'),
  jsonb_build_object('id', 'b', 'text', options_en->>'b'),
  jsonb_build_object('id', 'c', 'text', options_en->>'c'),
  jsonb_build_object('id', 'd', 'text', options_en->>'d')
)
WHERE theme_id = '03f32fe5-9350-4fb1-b1d9-351242c33f59'
AND jsonb_typeof(options_en) = 'object';

-- Step 2: Populate options_en from options[].text_en (for questions where options_en is NULL)
UPDATE quiz_questions
SET options_en = jsonb_build_array(
  jsonb_build_object('id', 'a', 'text', (options->0->>'text_en')),
  jsonb_build_object('id', 'b', 'text', (options->1->>'text_en')),
  jsonb_build_object('id', 'c', 'text', (options->2->>'text_en')),
  jsonb_build_object('id', 'd', 'text', (options->3->>'text_en'))
)
WHERE theme_id = '03f32fe5-9350-4fb1-b1d9-351242c33f59'
AND options_en IS NULL
AND jsonb_typeof(options) = 'array';