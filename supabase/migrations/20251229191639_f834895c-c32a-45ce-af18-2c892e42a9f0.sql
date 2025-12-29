UPDATE quiz_questions
SET options = jsonb_build_array(
  jsonb_build_object('id', 'a', 'text', options->>'a'),
  jsonb_build_object('id', 'b', 'text', options->>'b'),
  jsonb_build_object('id', 'c', 'text', options->>'c'),
  jsonb_build_object('id', 'd', 'text', options->>'d')
),
options_en = jsonb_build_array(
  jsonb_build_object('id', 'a', 'text', options_en->>'a'),
  jsonb_build_object('id', 'b', 'text', options_en->>'b'),
  jsonb_build_object('id', 'c', 'text', options_en->>'c'),
  jsonb_build_object('id', 'd', 'text', options_en->>'d')
)
WHERE theme_id = '03f32fe5-9350-4fb1-b1d9-351242c33f59'
AND jsonb_typeof(options) = 'object'
AND NOT jsonb_typeof(options) = 'array';