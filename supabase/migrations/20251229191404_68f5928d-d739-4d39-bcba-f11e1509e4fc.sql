-- Fix options format for all oscrias theme questions (IDs 97-131)
-- Convert from {a: "text", b: "text"} to [{id: "a", text: "text"}, ...]

UPDATE quiz_questions SET options = '[{"id": "a", "text": "1774", "text_en": "1774"}, {"id": "b", "text": "1776", "text_en": "1776"}, {"id": "c", "text": "1778", "text_en": "1778"}, {"id": "d", "text": "1780", "text_en": "1780"}]'::jsonb WHERE id = 97;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Thomas Jefferson", "text_en": "Thomas Jefferson"}, {"id": "b", "text": "John Adams", "text_en": "John Adams"}, {"id": "c", "text": "George Washington", "text_en": "George Washington"}, {"id": "d", "text": "Benjamin Franklin", "text_en": "Benjamin Franklin"}]'::jsonb WHERE id = 98;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Guerra da Independência", "text_en": "War of Independence"}, {"id": "b", "text": "Guerra Civil Americana", "text_en": "American Civil War"}, {"id": "c", "text": "Guerra Mexicano-Americana", "text_en": "Mexican-American War"}, {"id": "d", "text": "Guerra de 1812", "text_en": "War of 1812"}]'::jsonb WHERE id = 99;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Andrew Jackson", "text_en": "Andrew Jackson"}, {"id": "b", "text": "Abraham Lincoln", "text_en": "Abraham Lincoln"}, {"id": "c", "text": "Ulysses S. Grant", "text_en": "Ulysses S. Grant"}, {"id": "d", "text": "Theodore Roosevelt", "text_en": "Theodore Roosevelt"}]'::jsonb WHERE id = 100;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "1939", "text_en": "1939"}, {"id": "b", "text": "1940", "text_en": "1940"}, {"id": "c", "text": "1941", "text_en": "1941"}, {"id": "d", "text": "1942", "text_en": "1942"}]'::jsonb WHERE id = 101;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Lua", "text_en": "Moon"}, {"id": "b", "text": "Marte", "text_en": "Mars"}, {"id": "c", "text": "Órbita", "text_en": "Orbit"}, {"id": "d", "text": "Estação Espacial", "text_en": "Space Station"}]'::jsonb WHERE id = 102;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Albert Einstein", "text_en": "Albert Einstein"}, {"id": "b", "text": "Isaac Newton", "text_en": "Isaac Newton"}, {"id": "c", "text": "Robert Oppenheimer", "text_en": "Robert Oppenheimer"}, {"id": "d", "text": "Enrico Fermi", "text_en": "Enrico Fermi"}]'::jsonb WHERE id = 103;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Década de 1940", "text_en": "1940s"}, {"id": "b", "text": "Década de 1950", "text_en": "1950s"}, {"id": "c", "text": "Década de 1960", "text_en": "1960s"}, {"id": "d", "text": "Década de 1970", "text_en": "1970s"}]'::jsonb WHERE id = 104;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Android", "text_en": "Android"}, {"id": "b", "text": "iPhone", "text_en": "iPhone"}, {"id": "c", "text": "BlackBerry", "text_en": "BlackBerry"}, {"id": "d", "text": "Nokia", "text_en": "Nokia"}]'::jsonb WHERE id = 105;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Facebook", "text_en": "Facebook"}, {"id": "b", "text": "Twitter", "text_en": "Twitter"}, {"id": "c", "text": "Instagram", "text_en": "Instagram"}, {"id": "d", "text": "LinkedIn", "text_en": "LinkedIn"}]'::jsonb WHERE id = 106;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "NBA (basquete)", "text_en": "NBA (basketball)"}, {"id": "b", "text": "NFL (futebol americano)", "text_en": "NFL (American football)"}, {"id": "c", "text": "MLB (beisebol)", "text_en": "MLB (baseball)"}, {"id": "d", "text": "NHL (hóquei)", "text_en": "NHL (hockey)"}]'::jsonb WHERE id = 107;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Nova York", "text_en": "New York"}, {"id": "b", "text": "Los Angeles", "text_en": "Los Angeles"}, {"id": "c", "text": "Chicago", "text_en": "Chicago"}, {"id": "d", "text": "Houston", "text_en": "Houston"}]'::jsonb WHERE id = 108;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "McDonald''s", "text_en": "McDonald''s"}, {"id": "b", "text": "Burger King", "text_en": "Burger King"}, {"id": "c", "text": "Wendy''s", "text_en": "Wendy''s"}, {"id": "d", "text": "KFC", "text_en": "KFC"}]'::jsonb WHERE id = 109;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Ouro", "text_en": "Gold"}, {"id": "b", "text": "Prata", "text_en": "Silver"}, {"id": "c", "text": "Cobre", "text_en": "Copper"}, {"id": "d", "text": "Dólar", "text_en": "Dollar"}]'::jsonb WHERE id = 110;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Bill Gates", "text_en": "Bill Gates"}, {"id": "b", "text": "Steve Jobs", "text_en": "Steve Jobs"}, {"id": "c", "text": "Jeff Bezos", "text_en": "Jeff Bezos"}, {"id": "d", "text": "Elon Musk", "text_en": "Elon Musk"}]'::jsonb WHERE id = 111;

-- Soccer questions (122-131)
UPDATE quiz_questions SET options = '[{"id": "a", "text": "Alemanha", "text_en": "Germany"}, {"id": "b", "text": "Brasil", "text_en": "Brazil"}, {"id": "c", "text": "Itália", "text_en": "Italy"}, {"id": "d", "text": "Argentina", "text_en": "Argentina"}]'::jsonb WHERE id = 122;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Pelé", "text_en": "Pelé"}, {"id": "b", "text": "Maradona", "text_en": "Maradona"}, {"id": "c", "text": "Messi", "text_en": "Messi"}, {"id": "d", "text": "Cristiano Ronaldo", "text_en": "Cristiano Ronaldo"}]'::jsonb WHERE id = 123;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "90 minutos", "text_en": "90 minutes"}, {"id": "b", "text": "80 minutos", "text_en": "80 minutes"}, {"id": "c", "text": "100 minutos", "text_en": "100 minutes"}, {"id": "d", "text": "120 minutos", "text_en": "120 minutes"}]'::jsonb WHERE id = 124;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "9 jogadores", "text_en": "9 players"}, {"id": "b", "text": "10 jogadores", "text_en": "10 players"}, {"id": "c", "text": "11 jogadores", "text_en": "11 players"}, {"id": "d", "text": "12 jogadores", "text_en": "12 players"}]'::jsonb WHERE id = 125;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Vermelho", "text_en": "Red"}, {"id": "b", "text": "Amarelo", "text_en": "Yellow"}, {"id": "c", "text": "Azul", "text_en": "Blue"}, {"id": "d", "text": "Verde", "text_en": "Green"}]'::jsonb WHERE id = 126;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "França", "text_en": "France"}, {"id": "b", "text": "Uruguai", "text_en": "Uruguay"}, {"id": "c", "text": "Brasil", "text_en": "Brazil"}, {"id": "d", "text": "Inglaterra", "text_en": "England"}]'::jsonb WHERE id = 127;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Gol contra", "text_en": "Own goal"}, {"id": "b", "text": "Pênalti", "text_en": "Penalty"}, {"id": "c", "text": "Escanteio", "text_en": "Corner kick"}, {"id": "d", "text": "Falta", "text_en": "Foul"}]'::jsonb WHERE id = 128;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Liga dos Campeões", "text_en": "Champions League"}, {"id": "b", "text": "Copa do Mundo", "text_en": "World Cup"}, {"id": "c", "text": "Copa América", "text_en": "Copa America"}, {"id": "d", "text": "Eurocopa", "text_en": "Euro Cup"}]'::jsonb WHERE id = 129;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Lionel Messi", "text_en": "Lionel Messi"}, {"id": "b", "text": "Cristiano Ronaldo", "text_en": "Cristiano Ronaldo"}, {"id": "c", "text": "Neymar", "text_en": "Neymar"}, {"id": "d", "text": "Mbappé", "text_en": "Mbappé"}]'::jsonb WHERE id = 130;

UPDATE quiz_questions SET options = '[{"id": "a", "text": "Espanha", "text_en": "Spain"}, {"id": "b", "text": "Brasil", "text_en": "Brazil"}, {"id": "c", "text": "Argentina", "text_en": "Argentina"}, {"id": "d", "text": "França", "text_en": "France"}]'::jsonb WHERE id = 131;