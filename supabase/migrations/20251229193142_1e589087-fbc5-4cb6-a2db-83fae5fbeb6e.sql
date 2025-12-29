
-- Step 1: Create futebol category
INSERT INTO quiz_categories (id, name) VALUES ('futebol', 'Futebol') ON CONFLICT (id) DO NOTHING;

-- Step 2: Delete all existing Os Crias questions
DELETE FROM quiz_questions 
WHERE theme_id = '03f32fe5-9350-4fb1-b1d9-351242c33f59';

-- Step 3: Insert 25 new advanced soccer questions
INSERT INTO quiz_questions (theme_id, question, question_en, options, options_en, correct_answer, explanation, explanation_en, category_id)
VALUES
-- Question 1
('03f32fe5-9350-4fb1-b1d9-351242c33f59', 
'Qual país ganhou a Copa do Mundo FIFA mais vezes?', 
'Which country has won the FIFA World Cup the most times?',
'[{"id": "a", "text": "Alemanha"}, {"id": "b", "text": "Argentina"}, {"id": "c", "text": "Brasil"}, {"id": "d", "text": "Itália"}]'::jsonb,
'[{"id": "a", "text": "Germany"}, {"id": "b", "text": "Argentina"}, {"id": "c", "text": "Brazil"}, {"id": "d", "text": "Italy"}]'::jsonb,
'c', 'O Brasil é o maior vencedor com 5 títulos (1958, 1962, 1970, 1994, 2002).', 'Brazil is the most successful with 5 titles (1958, 1962, 1970, 1994, 2002).', 'futebol'),

-- Question 2
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Quem é o maior artilheiro de todas as Copas do Mundo?',
'Who is the all-time top scorer in World Cup history?',
'[{"id": "a", "text": "Pelé"}, {"id": "b", "text": "Ronaldo Fenômeno"}, {"id": "c", "text": "Miroslav Klose"}, {"id": "d", "text": "Gerd Müller"}]'::jsonb,
'[{"id": "a", "text": "Pelé"}, {"id": "b", "text": "Ronaldo"}, {"id": "c", "text": "Miroslav Klose"}, {"id": "d", "text": "Gerd Müller"}]'::jsonb,
'c', 'Miroslav Klose marcou 16 gols em Copas do Mundo pela Alemanha.', 'Miroslav Klose scored 16 goals in World Cups for Germany.', 'futebol'),

-- Question 3
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Em qual Copa do Mundo foi introduzido o VAR pela primeira vez?',
'In which World Cup was VAR first introduced?',
'[{"id": "a", "text": "Brasil 2014"}, {"id": "b", "text": "Rússia 2018"}, {"id": "c", "text": "Catar 2022"}, {"id": "d", "text": "África do Sul 2010"}]'::jsonb,
'[{"id": "a", "text": "Brazil 2014"}, {"id": "b", "text": "Russia 2018"}, {"id": "c", "text": "Qatar 2022"}, {"id": "d", "text": "South Africa 2010"}]'::jsonb,
'b', 'O VAR foi usado oficialmente pela primeira vez na Copa do Mundo da Rússia em 2018.', 'VAR was officially used for the first time at the 2018 Russia World Cup.', 'futebol'),

-- Question 4
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual jogador tem mais Bolas de Ouro na história?',
'Which player has the most Ballon d''Or awards in history?',
'[{"id": "a", "text": "Cristiano Ronaldo"}, {"id": "b", "text": "Lionel Messi"}, {"id": "c", "text": "Johan Cruyff"}, {"id": "d", "text": "Michel Platini"}]'::jsonb,
'[{"id": "a", "text": "Cristiano Ronaldo"}, {"id": "b", "text": "Lionel Messi"}, {"id": "c", "text": "Johan Cruyff"}, {"id": "d", "text": "Michel Platini"}]'::jsonb,
'b', 'Lionel Messi tem 8 Bolas de Ouro, mais que qualquer outro jogador.', 'Lionel Messi has 8 Ballon d''Or awards, more than any other player.', 'futebol'),

-- Question 5
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual seleção ganhou a Copa do Mundo de 2022 no Catar?',
'Which national team won the 2022 World Cup in Qatar?',
'[{"id": "a", "text": "França"}, {"id": "b", "text": "Argentina"}, {"id": "c", "text": "Croácia"}, {"id": "d", "text": "Marrocos"}]'::jsonb,
'[{"id": "a", "text": "France"}, {"id": "b", "text": "Argentina"}, {"id": "c", "text": "Croatia"}, {"id": "d", "text": "Morocco"}]'::jsonb,
'b', 'A Argentina venceu a França nos pênaltis na final.', 'Argentina defeated France on penalties in the final.', 'futebol'),

-- Question 6
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Quantos jogadores cada time tem em campo no futebol?',
'How many players does each team have on the field in soccer?',
'[{"id": "a", "text": "10"}, {"id": "b", "text": "11"}, {"id": "c", "text": "12"}, {"id": "d", "text": "9"}]'::jsonb,
'[{"id": "a", "text": "10"}, {"id": "b", "text": "11"}, {"id": "c", "text": "12"}, {"id": "d", "text": "9"}]'::jsonb,
'b', 'Cada time joga com 11 jogadores, incluindo o goleiro.', 'Each team plays with 11 players, including the goalkeeper.', 'futebol'),

-- Question 7
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual clube tem mais títulos da UEFA Champions League?',
'Which club has the most UEFA Champions League titles?',
'[{"id": "a", "text": "AC Milan"}, {"id": "b", "text": "Barcelona"}, {"id": "c", "text": "Real Madrid"}, {"id": "d", "text": "Bayern de Munique"}]'::jsonb,
'[{"id": "a", "text": "AC Milan"}, {"id": "b", "text": "Barcelona"}, {"id": "c", "text": "Real Madrid"}, {"id": "d", "text": "Bayern Munich"}]'::jsonb,
'c', 'O Real Madrid tem 15 títulos da Champions League, mais que qualquer outro clube.', 'Real Madrid has 15 Champions League titles, more than any other club.', 'futebol'),

-- Question 8
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual jogador brasileiro marcou dois gols na final da Copa de 2002?',
'Which Brazilian player scored two goals in the 2002 World Cup final?',
'[{"id": "a", "text": "Rivaldo"}, {"id": "b", "text": "Ronaldinho"}, {"id": "c", "text": "Ronaldo"}, {"id": "d", "text": "Kaká"}]'::jsonb,
'[{"id": "a", "text": "Rivaldo"}, {"id": "b", "text": "Ronaldinho"}, {"id": "c", "text": "Ronaldo"}, {"id": "d", "text": "Kaká"}]'::jsonb,
'c', 'Ronaldo marcou os dois gols na vitória do Brasil por 2-0 sobre a Alemanha.', 'Ronaldo scored both goals in Brazil''s 2-0 victory over Germany.', 'futebol'),

-- Question 9
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'O que acontece quando um jogador recebe dois cartões amarelos?',
'What happens when a player receives two yellow cards?',
'[{"id": "a", "text": "Nada"}, {"id": "b", "text": "Expulsão"}, {"id": "c", "text": "Penalti"}, {"id": "d", "text": "Falta livre"}]'::jsonb,
'[{"id": "a", "text": "Nothing"}, {"id": "b", "text": "Red card and ejection"}, {"id": "c", "text": "Penalty"}, {"id": "d", "text": "Free kick"}]'::jsonb,
'b', 'Dois cartões amarelos resultam em um cartão vermelho e expulsão.', 'Two yellow cards result in a red card and the player is sent off.', 'futebol'),

-- Question 10
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual país sediou a primeira Copa do Mundo em 1930?',
'Which country hosted the first World Cup in 1930?',
'[{"id": "a", "text": "Brasil"}, {"id": "b", "text": "Itália"}, {"id": "c", "text": "Uruguai"}, {"id": "d", "text": "Argentina"}]'::jsonb,
'[{"id": "a", "text": "Brazil"}, {"id": "b", "text": "Italy"}, {"id": "c", "text": "Uruguay"}, {"id": "d", "text": "Argentina"}]'::jsonb,
'c', 'O Uruguai sediou e venceu a primeira Copa do Mundo em 1930.', 'Uruguay hosted and won the first World Cup in 1930.', 'futebol'),

-- Question 11
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual é a distância oficial de um pênalti até o gol?',
'What is the official distance from the penalty spot to the goal?',
'[{"id": "a", "text": "9 metros"}, {"id": "b", "text": "11 metros"}, {"id": "c", "text": "12 metros"}, {"id": "d", "text": "10 metros"}]'::jsonb,
'[{"id": "a", "text": "9 meters"}, {"id": "b", "text": "11 meters"}, {"id": "c", "text": "12 meters"}, {"id": "d", "text": "10 meters"}]'::jsonb,
'b', 'A marca do pênalti fica a 11 metros (12 jardas) do gol.', 'The penalty spot is 11 meters (12 yards) from the goal.', 'futebol'),

-- Question 12
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual jogador é conhecido como "O Rei do Futebol"?',
'Which player is known as "The King of Football"?',
'[{"id": "a", "text": "Diego Maradona"}, {"id": "b", "text": "Pelé"}, {"id": "c", "text": "Zidane"}, {"id": "d", "text": "Beckenbauer"}]'::jsonb,
'[{"id": "a", "text": "Diego Maradona"}, {"id": "b", "text": "Pelé"}, {"id": "c", "text": "Zidane"}, {"id": "d", "text": "Beckenbauer"}]'::jsonb,
'b', 'Pelé é universalmente conhecido como O Rei do Futebol.', 'Pelé is universally known as The King of Football.', 'futebol'),

-- Question 13
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Quantas substituições são permitidas em uma partida oficial?',
'How many substitutions are allowed in an official match?',
'[{"id": "a", "text": "3"}, {"id": "b", "text": "4"}, {"id": "c", "text": "5"}, {"id": "d", "text": "6"}]'::jsonb,
'[{"id": "a", "text": "3"}, {"id": "b", "text": "4"}, {"id": "c", "text": "5"}, {"id": "d", "text": "6"}]'::jsonb,
'c', 'Desde 2020, a FIFA permite 5 substituições em partidas oficiais.', 'Since 2020, FIFA allows 5 substitutions in official matches.', 'futebol'),

-- Question 14
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual seleção europeia nunca venceu uma Copa do Mundo?',
'Which European national team has never won a World Cup?',
'[{"id": "a", "text": "Holanda"}, {"id": "b", "text": "Espanha"}, {"id": "c", "text": "França"}, {"id": "d", "text": "Alemanha"}]'::jsonb,
'[{"id": "a", "text": "Netherlands"}, {"id": "b", "text": "Spain"}, {"id": "c", "text": "France"}, {"id": "d", "text": "Germany"}]'::jsonb,
'a', 'A Holanda chegou a 3 finais, mas nunca venceu uma Copa do Mundo.', 'The Netherlands reached 3 finals but has never won a World Cup.', 'futebol'),

-- Question 15
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Em que ano Pelé ganhou sua primeira Copa do Mundo?',
'In what year did Pelé win his first World Cup?',
'[{"id": "a", "text": "1954"}, {"id": "b", "text": "1958"}, {"id": "c", "text": "1962"}, {"id": "d", "text": "1966"}]'::jsonb,
'[{"id": "a", "text": "1954"}, {"id": "b", "text": "1958"}, {"id": "c", "text": "1962"}, {"id": "d", "text": "1966"}]'::jsonb,
'b', 'Pelé tinha apenas 17 anos quando o Brasil venceu a Copa de 1958 na Suécia.', 'Pelé was only 17 when Brazil won the 1958 World Cup in Sweden.', 'futebol'),

-- Question 16
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual é o maior placar já registrado em uma Copa do Mundo?',
'What is the biggest score ever recorded in a World Cup match?',
'[{"id": "a", "text": "Hungria 10-1 El Salvador"}, {"id": "b", "text": "Alemanha 7-1 Brasil"}, {"id": "c", "text": "Hungria 9-0 Coreia do Sul"}, {"id": "d", "text": "Iugoslávia 9-0 Zaire"}]'::jsonb,
'[{"id": "a", "text": "Hungary 10-1 El Salvador"}, {"id": "b", "text": "Germany 7-1 Brazil"}, {"id": "c", "text": "Hungary 9-0 South Korea"}, {"id": "d", "text": "Yugoslavia 9-0 Zaire"}]'::jsonb,
'a', 'Hungria 10-1 El Salvador em 1982 é o maior placar em Copas do Mundo.', 'Hungary 10-1 El Salvador in 1982 is the biggest score in World Cup history.', 'futebol'),

-- Question 17
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual jogador fez o gol mais rápido em uma Copa do Mundo?',
'Which player scored the fastest goal in World Cup history?',
'[{"id": "a", "text": "Hakan Şükür"}, {"id": "b", "text": "Clint Dempsey"}, {"id": "c", "text": "Robbie Keane"}, {"id": "d", "text": "Kylian Mbappé"}]'::jsonb,
'[{"id": "a", "text": "Hakan Şükür"}, {"id": "b", "text": "Clint Dempsey"}, {"id": "c", "text": "Robbie Keane"}, {"id": "d", "text": "Kylian Mbappé"}]'::jsonb,
'a', 'Hakan Şükür marcou aos 11 segundos na Copa de 2002.', 'Hakan Şükür scored after just 11 seconds in the 2002 World Cup.', 'futebol'),

-- Question 18
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'O que significa "Hat-trick" no futebol?',
'What does "Hat-trick" mean in soccer?',
'[{"id": "a", "text": "Três defesas seguidas"}, {"id": "b", "text": "Três gols do mesmo jogador"}, {"id": "c", "text": "Três vitórias consecutivas"}, {"id": "d", "text": "Três assistências"}]'::jsonb,
'[{"id": "a", "text": "Three saves in a row"}, {"id": "b", "text": "Three goals by the same player"}, {"id": "c", "text": "Three consecutive wins"}, {"id": "d", "text": "Three assists"}]'::jsonb,
'b', 'Hat-trick significa três gols marcados pelo mesmo jogador em uma partida.', 'A hat-trick means three goals scored by the same player in one match.', 'futebol'),

-- Question 19
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual é a duração oficial de uma partida de futebol?',
'What is the official duration of a soccer match?',
'[{"id": "a", "text": "80 minutos"}, {"id": "b", "text": "90 minutos"}, {"id": "c", "text": "100 minutos"}, {"id": "d", "text": "120 minutos"}]'::jsonb,
'[{"id": "a", "text": "80 minutes"}, {"id": "b", "text": "90 minutes"}, {"id": "c", "text": "100 minutes"}, {"id": "d", "text": "120 minutes"}]'::jsonb,
'b', 'Uma partida oficial tem 90 minutos (dois tempos de 45 minutos).', 'An official match is 90 minutes (two 45-minute halves).', 'futebol'),

-- Question 20
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual jogador tem mais gols marcados na história do futebol?',
'Which player has scored the most goals in football history?',
'[{"id": "a", "text": "Pelé"}, {"id": "b", "text": "Cristiano Ronaldo"}, {"id": "c", "text": "Lionel Messi"}, {"id": "d", "text": "Romário"}]'::jsonb,
'[{"id": "a", "text": "Pelé"}, {"id": "b", "text": "Cristiano Ronaldo"}, {"id": "c", "text": "Lionel Messi"}, {"id": "d", "text": "Romário"}]'::jsonb,
'b', 'Cristiano Ronaldo detém o recorde com mais de 900 gols oficiais.', 'Cristiano Ronaldo holds the record with over 900 official goals.', 'futebol'),

-- Question 21
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual país ganhou a Eurocopa mais vezes?',
'Which country has won the European Championship the most times?',
'[{"id": "a", "text": "França"}, {"id": "b", "text": "Alemanha"}, {"id": "c", "text": "Espanha"}, {"id": "d", "text": "Itália"}]'::jsonb,
'[{"id": "a", "text": "France"}, {"id": "b", "text": "Germany"}, {"id": "c", "text": "Spain"}, {"id": "d", "text": "Italy"}]'::jsonb,
'b', 'Alemanha e Espanha têm 3 títulos cada, mas a Alemanha venceu primeiro.', 'Germany and Spain have 3 titles each, but Germany won first.', 'futebol'),

-- Question 22
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Kylian Mbappé quantos gols fez na final da Copa de 2022?',
'How many goals did Kylian Mbappé score in the 2022 World Cup final?',
'[{"id": "a", "text": "1"}, {"id": "b", "text": "2"}, {"id": "c", "text": "3"}, {"id": "d", "text": "4"}]'::jsonb,
'[{"id": "a", "text": "1"}, {"id": "b", "text": "2"}, {"id": "c", "text": "3"}, {"id": "d", "text": "4"}]'::jsonb,
'c', 'Mbappé fez um hat-trick na final, mas a França perdeu nos pênaltis.', 'Mbappé scored a hat-trick in the final, but France lost on penalties.', 'futebol'),

-- Question 23
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual é a regra do impedimento no futebol?',
'What is the offside rule in soccer?',
'[{"id": "a", "text": "Jogador atrás da bola"}, {"id": "b", "text": "Jogador à frente do penúltimo defensor"}, {"id": "c", "text": "Jogador fora do campo"}, {"id": "d", "text": "Jogador sem camisa"}]'::jsonb,
'[{"id": "a", "text": "Player behind the ball"}, {"id": "b", "text": "Player ahead of second-to-last defender"}, {"id": "c", "text": "Player off the field"}, {"id": "d", "text": "Player without jersey"}]'::jsonb,
'b', 'Impedimento ocorre quando o jogador está à frente do penúltimo defensor no momento do passe.', 'Offside occurs when a player is ahead of the second-to-last defender when the ball is passed.', 'futebol'),

-- Question 24
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual goleiro tem mais clean sheets em Copas do Mundo?',
'Which goalkeeper has the most clean sheets in World Cup history?',
'[{"id": "a", "text": "Gianluigi Buffon"}, {"id": "b", "text": "Manuel Neuer"}, {"id": "c", "text": "Peter Shilton"}, {"id": "d", "text": "Fabien Barthez"}]'::jsonb,
'[{"id": "a", "text": "Gianluigi Buffon"}, {"id": "b", "text": "Manuel Neuer"}, {"id": "c", "text": "Peter Shilton"}, {"id": "d", "text": "Fabien Barthez"}]'::jsonb,
'd', 'Fabien Barthez tem 10 clean sheets em Copas do Mundo pela França.', 'Fabien Barthez has 10 clean sheets in World Cups for France.', 'futebol'),

-- Question 25
('03f32fe5-9350-4fb1-b1d9-351242c33f59',
'Qual foi o placar do famoso "Maracanazo" em 1950?',
'What was the score of the famous "Maracanazo" in 1950?',
'[{"id": "a", "text": "Uruguai 2-1 Brasil"}, {"id": "b", "text": "Uruguai 3-2 Brasil"}, {"id": "c", "text": "Uruguai 1-0 Brasil"}, {"id": "d", "text": "Uruguai 2-0 Brasil"}]'::jsonb,
'[{"id": "a", "text": "Uruguay 2-1 Brazil"}, {"id": "b", "text": "Uruguay 3-2 Brazil"}, {"id": "c", "text": "Uruguay 1-0 Brazil"}, {"id": "d", "text": "Uruguay 2-0 Brazil"}]'::jsonb,
'a', 'O Uruguai venceu o Brasil por 2-1 na final da Copa de 1950 no Maracanã.', 'Uruguay defeated Brazil 2-1 in the 1950 World Cup final at Maracanã.', 'futebol');
