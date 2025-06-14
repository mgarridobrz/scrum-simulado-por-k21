
-- Batch 1: Add English translations for quiz questions IDs 1-10

UPDATE quiz_questions SET 
    question_en = 'Which role is responsible for managing the Product Backlog?',
    explanation_en = 'The Product Owner owns the Product Backlog and is responsible for its ordering, clarity, visibility, and that the team understands the items to the needed level.',
    options_en = '[
        {"id":"a","text":"Scrum Master"},
        {"id":"b","text":"Product Owner"},
        {"id":"c","text":"Developers"},
        {"id":"d","text":"Stakeholders"}
    ]'
WHERE id = 1;

UPDATE quiz_questions SET 
    question_en = 'What is the recommended duration for Sprint Planning in a two-week Sprint?',
    explanation_en = 'Sprint Planning is timeboxed to a maximum of eight hours for a one-month Sprint. For shorter Sprints, the event is usually shorter, commonly about four hours for a two-week Sprint.',
    options_en = '[
        {"id":"a","text":"1 hour"},
        {"id":"b","text":"2 hours"},
        {"id":"c","text":"4 hours"},
        {"id":"d","text":"8 hours"}
    ]'
WHERE id = 2;

UPDATE quiz_questions SET 
    question_en = 'Who is responsible for estimating Product Backlog items?',
    explanation_en = 'Developers are responsible for all estimates in Scrum. The Product Owner can help clarify priorities and facilitate trade-offs, but the work is estimated by those who will do it.',
    options_en = '[
        {"id":"a","text":"Product Owner"},
        {"id":"b","text":"Scrum Master"},
        {"id":"c","text":"Developers"},
        {"id":"d","text":"The customer"}
    ]'
WHERE id = 3;

UPDATE quiz_questions SET 
    question_en = 'What happens if the team cannot complete all the planned work for the Sprint?',
    explanation_en = 'In Scrum, the Sprint timebox is fixed and never extended. If planned work is not completed by the end of the Sprint, the incomplete work returns to the Product Backlog and can be selected in a future Sprint, according to the Product Owner''s prioritization.',
    options_en = '[
        {"id":"a","text":"The Sprint is extended until all work is completed"},
        {"id":"b","text":"The Scrum Master must work overtime to complete the work"},
        {"id":"c","text":"Incomplete work returns to the Product Backlog for reprioritization"},
        {"id":"d","text":"The team is penalized with a shorter Sprint next time"}
    ]'
WHERE id = 4;

UPDATE quiz_questions SET 
    question_en = 'What is the main purpose of the Daily Scrum?',
    explanation_en = 'The Daily Scrum is a 15-minute event for the Developers of the Scrum Team. Its purpose is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary, adjusting the upcoming planned work.',
    options_en = '[
        {"id":"a","text":"Report progress to managers"},
        {"id":"b","text":"Plan work for the day and identify impediments"},
        {"id":"c","text":"Update the Product Backlog"},
        {"id":"d","text":"Review code quality"}
    ]'
WHERE id = 5;

UPDATE quiz_questions SET 
    question_en = 'What are the three pillars of Scrum?',
    explanation_en = 'The three pillars of Scrum are Transparency, Inspection, and Adaptation. These support the Scrum framework and the effectiveness of empirical process control.',
    options_en = '[
        {"id":"a","text":"Visibility, inspection and adaptation"},
        {"id":"b","text":"Transparency, inspection and adaptation"},
        {"id":"c","text":"Communication, collaboration and delivery"},
        {"id":"d","text":"Planning, execution and review"}
    ]'
WHERE id = 6;

UPDATE quiz_questions SET 
    question_en = 'How is the Product Backlog ordered?',
    explanation_en = 'The Product Owner orders the Product Backlog based on value, risk, priority, and necessity. Higher priority items appear at the top so they are more likely to be selected in the next Sprint.',
    options_en = '[
        {"id":"a","text":"By creation date"},
        {"id":"b","text":"By business value and priority"},
        {"id":"c","text":"Alphabetically"},
        {"id":"d","text":"By developer preference"}
    ]'
WHERE id = 7;

UPDATE quiz_questions SET 
    question_en = 'Who has permission to modify the Sprint Backlog during the Sprint?',
    explanation_en = 'Only the Developers working on the Sprint can modify the Sprint Backlog during the Sprint. The Product Owner may negotiate scope, but only Developers update the Sprint Backlog.',
    options_en = '[
        {"id":"a","text":"Only the Product Owner"},
        {"id":"b","text":"Only the Scrum Master"},
        {"id":"c","text":"The Developers"},
        {"id":"d","text":"Any stakeholder"}
    ]'
WHERE id = 8;

UPDATE quiz_questions SET 
    question_en = 'What is an impediment in the Scrum context?',
    explanation_en = 'An impediment in Scrum is anything that blocks the Developers from making progress. It can be technical, organizational, or external. The Scrum Master is responsible for helping remove impediments.',
    options_en = '[
        {"id":"a","text":"Any technical problem encountered by the Developers"},
        {"id":"b","text":"A bug found during the Sprint"},
        {"id":"c","text":"Any obstacle that blocks the team from progressing"},
        {"id":"d","text":"Only problems reported by the Product Owner"}
    ]'
WHERE id = 9;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Increment in Scrum?',
    explanation_en = 'The Increment is a concrete stepping stone toward the Product Goal. Each Increment is additive and must be valuable and usable. It must be in usable condition regardless of whether the Product Owner decides to actually release it.',
    options_en = '[
        {"id":"a","text":"Show progress to stakeholders"},
        {"id":"b","text":"A concrete step toward the product vision"},
        {"id":"c","text":"Satisfy documented requirements"},
        {"id":"d","text":"Complete all planned tasks"}
    ]'
WHERE id = 10;

