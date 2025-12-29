-- Create new soccer category
INSERT INTO quiz_categories (id, name) VALUES ('soccer', 'Futebol');

-- Insert 10 soccer questions for oscrias theme
INSERT INTO quiz_questions (id, question, question_en, category_id, options, correct_answer, explanation, explanation_en, theme_id) VALUES

-- Question 122: World Cup Champions - Most titles
(122, 
 'Qual país tem mais títulos de Copa do Mundo?',
 'Which country has the most World Cup titles?',
 'soccer',
 '[{"id": "a", "text": "Alemanha", "text_en": "Germany"}, {"id": "b", "text": "Brasil", "text_en": "Brazil"}, {"id": "c", "text": "Argentina", "text_en": "Argentina"}, {"id": "d", "text": "Itália", "text_en": "Italy"}]'::jsonb,
 'b',
 'O Brasil é o maior campeão mundial com 5 títulos (1958, 1962, 1970, 1994 e 2002).',
 'Brazil is the most successful nation with 5 titles (1958, 1962, 1970, 1994 and 2002).',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 123: World Cup Champions - 2022 winner
(123,
 'Quem venceu a Copa do Mundo de 2022?',
 'Who won the 2022 World Cup?',
 'soccer',
 '[{"id": "a", "text": "França", "text_en": "France"}, {"id": "b", "text": "Brasil", "text_en": "Brazil"}, {"id": "c", "text": "Argentina", "text_en": "Argentina"}, {"id": "d", "text": "Croácia", "text_en": "Croatia"}]'::jsonb,
 'c',
 'A Argentina venceu a Copa do Mundo de 2022 no Qatar, derrotando a França nos pênaltis na final.',
 'Argentina won the 2022 World Cup in Qatar, defeating France on penalties in the final.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 124: World Cup Champions - Consecutive wins
(124,
 'Qual foi o último país a vencer duas Copas do Mundo consecutivas?',
 'Which was the last country to win two consecutive World Cups?',
 'soccer',
 '[{"id": "a", "text": "Alemanha", "text_en": "Germany"}, {"id": "b", "text": "Argentina", "text_en": "Argentina"}, {"id": "c", "text": "Brasil", "text_en": "Brazil"}, {"id": "d", "text": "Itália", "text_en": "Italy"}]'::jsonb,
 'c',
 'O Brasil foi o último país a conquistar duas Copas consecutivas, em 1958 e 1962.',
 'Brazil was the last country to win two consecutive World Cups, in 1958 and 1962.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 125: World Cup Champions - 2014 winner
(125,
 'Qual país ganhou a Copa do Mundo de 2014?',
 'Which country won the 2014 World Cup?',
 'soccer',
 '[{"id": "a", "text": "Brasil", "text_en": "Brazil"}, {"id": "b", "text": "Argentina", "text_en": "Argentina"}, {"id": "c", "text": "Alemanha", "text_en": "Germany"}, {"id": "d", "text": "Holanda", "text_en": "Netherlands"}]'::jsonb,
 'c',
 'A Alemanha venceu a Copa do Mundo de 2014 no Brasil, derrotando a Argentina por 1x0 na final.',
 'Germany won the 2014 World Cup in Brazil, defeating Argentina 1-0 in the final.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 126: Rules - Match duration
(126,
 'Quanto tempo dura uma partida de futebol regulamentar?',
 'How long is a regulation football match?',
 'soccer',
 '[{"id": "a", "text": "60 minutos", "text_en": "60 minutes"}, {"id": "b", "text": "80 minutos", "text_en": "80 minutes"}, {"id": "c", "text": "90 minutos", "text_en": "90 minutes"}, {"id": "d", "text": "120 minutos", "text_en": "120 minutes"}]'::jsonb,
 'c',
 'Uma partida de futebol regulamentar dura 90 minutos, divididos em dois tempos de 45 minutos.',
 'A regulation football match lasts 90 minutes, divided into two 45-minute halves.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 127: Rules - Offside
(127,
 'O que caracteriza impedimento no futebol?',
 'What defines offside in football?',
 'soccer',
 '[{"id": "a", "text": "Estar atrás da linha do meio-campo", "text_en": "Being behind the halfway line"}, {"id": "b", "text": "Estar mais perto do gol que a bola e o penúltimo defensor", "text_en": "Being closer to the goal than the ball and second-to-last defender"}, {"id": "c", "text": "Tocar a bola com a mão", "text_en": "Touching the ball with the hand"}, {"id": "d", "text": "Sair da área de jogo", "text_en": "Leaving the field of play"}]'::jsonb,
 'b',
 'O jogador está impedido quando está mais perto da linha de gol adversária do que a bola e o penúltimo adversário no momento do passe.',
 'A player is offside when they are closer to the opponent goal line than both the ball and the second-to-last opponent at the moment the ball is played.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 128: History - First World Cup host (replaced basic question)
(128,
 'Qual país sediou a primeira Copa do Mundo em 1930?',
 'Which country hosted the first World Cup in 1930?',
 'soccer',
 '[{"id": "a", "text": "Brasil", "text_en": "Brazil"}, {"id": "b", "text": "Inglaterra", "text_en": "England"}, {"id": "c", "text": "Uruguai", "text_en": "Uruguay"}, {"id": "d", "text": "França", "text_en": "France"}]'::jsonb,
 'c',
 'O Uruguai sediou e venceu a primeira Copa do Mundo da história em 1930, derrotando a Argentina na final.',
 'Uruguay hosted and won the first World Cup in history in 1930, defeating Argentina in the final.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 129: Players - Top scorer in World Cup history
(129,
 'Quem é o maior artilheiro da história das Copas do Mundo?',
 'Who is the all-time top scorer in World Cup history?',
 'soccer',
 '[{"id": "a", "text": "Pelé", "text_en": "Pelé"}, {"id": "b", "text": "Ronaldo Fenômeno", "text_en": "Ronaldo"}, {"id": "c", "text": "Miroslav Klose", "text_en": "Miroslav Klose"}, {"id": "d", "text": "Lionel Messi", "text_en": "Lionel Messi"}]'::jsonb,
 'c',
 'Miroslav Klose é o maior artilheiro da história das Copas com 16 gols, superando Ronaldo (15 gols).',
 'Miroslav Klose is the all-time top scorer in World Cup history with 16 goals, surpassing Ronaldo (15 goals).',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 130: Players - Most Ballon d'Or
(130,
 'Qual jogador ganhou mais Bolas de Ouro na história?',
 'Which player has won the most Ballon d''Or awards?',
 'soccer',
 '[{"id": "a", "text": "Cristiano Ronaldo", "text_en": "Cristiano Ronaldo"}, {"id": "b", "text": "Lionel Messi", "text_en": "Lionel Messi"}, {"id": "c", "text": "Michel Platini", "text_en": "Michel Platini"}, {"id": "d", "text": "Johan Cruyff", "text_en": "Johan Cruyff"}]'::jsonb,
 'b',
 'Lionel Messi é o maior vencedor da Bola de Ouro com 8 títulos, à frente de Cristiano Ronaldo com 5.',
 'Lionel Messi is the all-time Ballon d''Or winner with 8 titles, ahead of Cristiano Ronaldo with 5.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59'),

-- Question 131: Players - Best player of 2022 World Cup
(131,
 'Quem foi eleito o melhor jogador da Copa do Mundo de 2022?',
 'Who was named best player of the 2022 World Cup?',
 'soccer',
 '[{"id": "a", "text": "Kylian Mbappé", "text_en": "Kylian Mbappé"}, {"id": "b", "text": "Lionel Messi", "text_en": "Lionel Messi"}, {"id": "c", "text": "Emiliano Martínez", "text_en": "Emiliano Martínez"}, {"id": "d", "text": "Antoine Griezmann", "text_en": "Antoine Griezmann"}]'::jsonb,
 'b',
 'Lionel Messi foi eleito o melhor jogador da Copa do Mundo de 2022, conquistando o prêmio Bola de Ouro do torneio.',
 'Lionel Messi was named the best player of the 2022 World Cup, winning the tournament Golden Ball award.',
 '03f32fe5-9350-4fb1-b1d9-351242c33f59');