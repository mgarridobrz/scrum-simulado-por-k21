-- Create the oscrias theme
INSERT INTO quiz_themes (slug, name, subtitle, description, is_active)
VALUES (
  'oscrias',
  'The Crias Challenge',
  'Test your general knowledge - History, Geography, Science and more!',
  'General knowledge quiz for middle school to high school students',
  true
);

-- Create categories for the oscrias theme (if not exist)
INSERT INTO quiz_categories (id, name)
VALUES 
  ('american_history', 'American History'),
  ('world_history', 'World History'),
  ('geography', 'Geography'),
  ('science', 'Science'),
  ('important_events', 'Important Events')
ON CONFLICT (id) DO NOTHING;