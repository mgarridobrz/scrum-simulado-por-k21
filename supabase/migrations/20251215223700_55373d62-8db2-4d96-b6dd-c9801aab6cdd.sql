-- Delete the 4 specific game_attempts entries from K212025 theme
DELETE FROM game_attempts 
WHERE id IN (
  '2fc1472f-6bdb-4c1c-b106-e94380dde20d',
  'c1b4b2d0-1cde-4498-8980-67e28f9a32f4',
  '5f417c32-1e39-4c40-9b04-e24ebd29b595',
  'b25e2a8a-6045-4822-b7dc-0af75f4d02fe'
);