
-- Question 1
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

-- Question 2
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

-- Question 3
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

-- Question 4
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

-- Question 5
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

-- Question 6
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

-- Question 7
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

-- Question 8
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

-- Question 9
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

-- Question 10
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

-- Question 11
UPDATE quiz_questions SET 
    question_en = 'What is the ideal size of a Scrum Team?',
    explanation_en = 'According to the Scrum Guide, a typical Scrum Team has 10 or fewer people. As a general rule, small teams communicate better and are more productive. If Scrum Teams become too large, they should consider reorganizing into multiple Scrum Teams.',
    options_en = '[
        {"id":"d","text":"10-15 people"},
        {"id":"a","text":"3-9 people"},
        {"id":"b","text":"5-7 people"},
        {"id":"c","text":"7-11 people"}
    ]'
WHERE id = 11;

-- Question 12
UPDATE quiz_questions SET 
    question_en = 'Who facilitates Scrum events?',
    explanation_en = 'The Scrum Master facilitates Scrum events as needed or as requested. However, they are responsible for ensuring that all events occur and are productive.',
    options_en = '[
        {"id":"a","text":"Product Owner"},
        {"id":"b","text":"Scrum Master"},
        {"id":"c","text":"Developers"},
        {"id":"d","text":"Stakeholders"}
    ]'
WHERE id = 12;

-- Question 13
UPDATE quiz_questions SET 
    question_en = 'What is the maximum length of a Sprint?',
    explanation_en = 'A Sprint is timeboxed to a maximum of one month. Shorter Sprints are encouraged in order to generate more learning cycles and reduce risk of changes.',
    options_en = '[
        {"id":"a","text":"One week"},
        {"id":"b","text":"Two weeks"},
        {"id":"c","text":"One month"},
        {"id":"d","text":"Three months"}
    ]'
WHERE id = 13;

-- Question 14
UPDATE quiz_questions SET 
    question_en = 'What is the primary responsibility of the Scrum Master?',
    explanation_en = 'The Scrum Master is responsible for establishing Scrum as defined in the Scrum Guide. They do this by helping everyone understand Scrum theory and practice, both within the Scrum Team and the larger organization. The Scrum Master is a true servant-leader who serves the Scrum Team and the larger organization.',
    options_en = '[
        {"id":"a","text":"Manage the Product Backlog"},
        {"id":"b","text":"Ensure the Scrum process is followed and understood"},
        {"id":"c","text":"Assign tasks to Developers"},
        {"id":"d","text":"Report progress to stakeholders"}
    ]'
WHERE id = 14;

-- Question 15
UPDATE quiz_questions SET 
    question_en = 'What is the main output of Sprint Planning?',
    explanation_en = 'Sprint Planning results in a Sprint Goal, an initial Sprint Backlog, and a plan for delivering the Increment and realizing the Sprint Goal.',
    options_en = '[
        {"id":"a","text":"Sprint Goal and Sprint Backlog"},
        {"id":"b","text":"Burn Down Chart"},
        {"id":"c","text":"Retrospective Insights"},
        {"id":"d","text":"Release Plan"}
    ]'
WHERE id = 15;

-- Question 16
UPDATE quiz_questions SET 
    question_en = 'What is empiricism in Scrum?',
    explanation_en = 'Empiricism asserts that knowledge comes from experience and making decisions based on what is observed. Scrum employs an iterative, incremental approach to optimize predictability and control risk.',
    options_en = '[
        {"id":"a","text":"A way to track velocity"},
        {"id":"b","text":"An approach based on observation, inspection and adaptation"},
        {"id":"c","text":"A method for estimating story points"},
        {"id":"d","text":"A technique for Backlog refinement"}
    ]'
WHERE id = 16;

-- Question 17
UPDATE quiz_questions SET 
    question_en = 'What is the recommended size for a Scrum Team?',
    explanation_en = 'Scrum Teams are typically composed of 10 or fewer people. In general, smaller teams communicate better and are more productive.',
    options_en = '[
        {"id":"c","text":"10-15 people total"},
        {"id":"d","text":"There is no fixed mandatory size"},
        {"id":"a","text":"3-9 people including Scrum Master and Product Owner"},
        {"id":"b","text":"5-11 people excluding Scrum Master and Product Owner"}
    ]'
WHERE id = 17;

-- Question 18
UPDATE quiz_questions SET 
    question_en = 'When should the Definition of Done be reviewed and updated?',
    explanation_en = 'The Definition of Done may evolve as the Scrum Team learns more about the product and technology, and as their practices improve. It should be reviewed and updated as needed during Sprint Retrospectives.',
    options_en = '[
        {"id":"a","text":"Only at the start of the project"},
        {"id":"b","text":"At each Retrospective or when necessary"},
        {"id":"c","text":"Before every Sprint Review"},
        {"id":"d","text":"Never"}
    ]'
WHERE id = 18;

-- Question 19
UPDATE quiz_questions SET 
    question_en = 'Who can attend the Sprint Retrospective?',
    explanation_en = 'The Sprint Retrospective is attended by the Scrum Team, which includes the Scrum Master, Product Owner, and Developers.',
    options_en = '[
        {"id":"a","text":"Only the Scrum Master and Developers"},
        {"id":"b","text":"The entire Scrum Team"},
        {"id":"c","text":"Stakeholders"},
        {"id":"d","text":"Product Owner and Scrum Master only"}
    ]'
WHERE id = 19;

-- Question 20
UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Sprint Review?',
    explanation_en = 'The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents the results of their work to stakeholders and discusses progress toward the Product Goal.',
    options_en = '[
        {"id":"a","text":"To inspect the outcome of the Sprint and plan future work"},
        {"id":"b","text":"To evaluate team performance"},
        {"id":"c","text":"To prioritize the Product Backlog"},
        {"id":"d","text":"To resolve team conflicts"}
    ]'
WHERE id = 20;

-- Question 21
UPDATE quiz_questions SET 
    question_en = 'What is the goal of the Sprint Retrospective?',
    explanation_en = 'The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements to be enacted during the next Sprint.',
    options_en = '[
        {"id":"a","text":"Create a Release Plan"},
        {"id":"b","text":"Create a plan for improvements"},
        {"id":"c","text":"Deliver the Increment"},
        {"id":"d","text":"Calculate Velocity"}
    ]'
WHERE id = 21;

-- Question 22
UPDATE quiz_questions SET 
    question_en = 'Who decides how work is divided among Developers?',
    explanation_en = 'The Developers decide internally how to accomplish their work and divide it amongst themselves.',
    options_en = '[
        {"id":"a","text":"Product Owner"},
        {"id":"b","text":"Scrum Master"},
        {"id":"c","text":"Developers themselves"},
        {"id":"d","text":"Project Manager"}
    ]'
WHERE id = 22;

-- Question 23
UPDATE quiz_questions SET 
    question_en = 'What are the Scrum values?',
    explanation_en = 'The five Scrum values are: Commitment, Focus, Openness, Respect and Courage. These values give direction to the Scrum Team with regard to their work, actions and behavior.',
    options_en = '[
        {"id":"a","text":"Transparency, Inspection, Adaptation"},
        {"id":"c","text":"Communication, Collaboration, Visibility"},
        {"id":"d","text":"Agility, Efficiency, Quality, Innovation"},
        {"id":"b","text":"Commitment, Focus, Openness, Respect and Courage"}
    ]'
WHERE id = 23;

-- Question 24
UPDATE quiz_questions SET 
    question_en = 'What is the main artifact that provides transparency about the work to be done?',
    explanation_en = 'The Product Backlog is an artifact that provides transparency about all the work needed for the product.',
    options_en = '[
        {"id":"a","text":"Release Burn Down"},
        {"id":"b","text":"Product Backlog"},
        {"id":"c","text":"Scrum Board"},
        {"id":"d","text":"Increment"}
    ]'
WHERE id = 24;

-- Question 25
UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Product Backlog Refinement?',
    explanation_en = 'Product Backlog Refinement is the act of adding detail, estimates, and order to items in the Product Backlog. It''s an ongoing activity, not an event.',
    options_en = '[
        {"id":"a","text":"To re-prioritize the Backlog only"},
        {"id":"b","text":"To add detail, estimates, and order to items in the Backlog"},
        {"id":"c","text":"To write documentation"},
        {"id":"d","text":"To plan Sprints"}
    ]'
WHERE id = 25;

-- Question 26
UPDATE quiz_questions SET 
    question_en = 'Who is accountable for maximizing product value?',
    explanation_en = 'The Product Owner is accountable for maximizing the value of the product resulting from Scrum Team work.',
    options_en = '[
        {"id":"a","text":"Developers"},
        {"id":"b","text":"Scrum Master"},
        {"id":"c","text":"Product Owner"},
        {"id":"d","text":"Stakeholders"}
    ]'
WHERE id = 26;

-- Question 27
UPDATE quiz_questions SET 
    question_en = 'Which statement about Scrum is correct?',
    explanation_en = 'Scrum is a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems. It does not prescribe specific techniques, but allows teams to choose practices that best suit their context.',
    options_en = '[
        {"id":"a","text":"Scrum is a process or technique for building products"},
        {"id":"b","text":"Scrum is a complete framework with all necessary tools for project management"},
        {"id":"c","text":"Scrum is a framework within which you can employ various processes and techniques"},
        {"id":"d","text":"Scrum is a methodology that increases team productivity"}
    ]'
WHERE id = 27;

-- Question 28
UPDATE quiz_questions SET 
    question_en = 'What is the focus of each Sprint?',
    explanation_en = 'Each Sprint has a Sprint Goal that provides a single, overarching objective for the team. The goal gives the team focus and flexibility regarding the work undertaken within the Sprint.',
    options_en = '[
        {"id":"a","text":"Deliver a complete product"},
        {"id":"b","text":"Achieve the Sprint Goal"},
        {"id":"c","text":"Increase velocity"},
        {"id":"d","text":"Finish all Backlog items"}
    ]'
WHERE id = 28;

-- Question 29
UPDATE quiz_questions SET 
    question_en = 'How often should the Product Backlog be refined?',
    explanation_en = 'Product Backlog Refinement is an ongoing process throughout each Sprint as needed. It is not an event or ceremony.',
    options_en = '[
        {"id":"a","text":"Once per Sprint"},
        {"id":"b","text":"Daily"},
        {"id":"c","text":"Ongoing through each Sprint"},
        {"id":"d","text":"Only before Sprint Planning"}
    ]'
WHERE id = 29;

-- Question 30
UPDATE quiz_questions SET 
    question_en = 'Why is Scrum considered ''lightweight''?',
    explanation_en = 'Scrum is intentionally lightweight. It defines only the parts necessary to implement Scrum theory. The Scrum framework is minimalist, containing nothing that is not absolutely necessary to accomplish its purpose.',
    options_en = '[
        {"id":"a","text":"Because it is easy to learn"},
        {"id":"b","text":"Because it has few rules and roles"},
        {"id":"c","text":"Because it does not require documentation"},
        {"id":"d","text":"Because it is only for small projects"}
    ]'
WHERE id = 30;

-- Question 31
UPDATE quiz_questions SET 
    question_en = 'Who owns the Product Backlog?',
    explanation_en = 'The Product Owner is responsible for the Product Backlog, including its content, availability, and ordering.',
    options_en = '[
        {"id":"a","text":"Scrum Master"},
        {"id":"b","text":"Developers"},
        {"id":"c","text":"Product Owner"},
        {"id":"d","text":"Stakeholders"}
    ]'
WHERE id = 31;

-- Question 32
UPDATE quiz_questions SET 
    question_en = 'What should happen if a team member is sick during the Sprint?',
    explanation_en = 'The Scrum Team as a whole is responsible for the Sprint Goal. If someone is absent, the remaining team members do their best to meet the Sprint Goal.',
    options_en = '[
        {"id":"a","text":"The Scrum Master replaces the team member"},
        {"id":"b","text":"The Sprint is paused"},
        {"id":"c","text":"Other Developers cover for the team member to help reach the Sprint Goal"},
        {"id":"d","text":"The Sprint is canceled"}
    ]'
WHERE id = 32;

-- Question 33
UPDATE quiz_questions SET 
    question_en = 'What is the best time to make changes to the Sprint Backlog?',
    explanation_en = 'The Developers can update the Sprint Backlog as more is learned about the work needed to achieve the Sprint Goal, but only during the current Sprint.',
    options_en = '[
        {"id":"a","text":"Any time"},
        {"id":"b","text":"Only during Sprint Planning"},
        {"id":"c","text":"During the Sprint, as needed, by the Developers"},
        {"id":"d","text":"After the Sprint ends"}
    ]'
WHERE id = 33;

-- Question 34
UPDATE quiz_questions SET 
    question_en = 'What happens when a Sprint ends?',
    explanation_en = 'A new Sprint starts immediately after the conclusion of the previous Sprint. Sprints are continuous; only the content and focus may change from one Sprint to another based on the Sprint Review outcome and updated work context.',
    options_en = '[
        {"id":"a","text":"The Scrum Team receives a new work assignment"},
        {"id":"b","text":"A new Sprint starts immediately after"},
        {"id":"c","text":"The Scrum Team has a rest period before the next Sprint"},
        {"id":"d","text":"The Scrum Master evaluates the team''s performance"}
    ]'
WHERE id = 34;

-- Question 35
UPDATE quiz_questions SET 
    question_en = 'Who can cancel a Sprint?',
    explanation_en = 'Only the Product Owner has the authority to cancel the Sprint. A Sprint would be canceled if the Sprint Goal becomes obsolete.',
    options_en = '[
        {"id":"a","text":"Scrum Master"},
        {"id":"b","text":"Product Owner"},
        {"id":"c","text":"Developers"},
        {"id":"d","text":"Stakeholders"}
    ]'
WHERE id = 35;

-- Question 36
UPDATE quiz_questions SET 
    question_en = 'What is delivered as part of a Scrum Increment?',
    explanation_en = 'The Increment is the sum of all the Product Backlog items completed during a Sprint and the value of the increments of all previous Sprints. At the end of a Sprint, the new Increment must be ''Done'' and in usable condition.',
    options_en = '[
        {"id":"a","text":"All completed Product Backlog items"},
        {"id":"b","text":"A feature requested by stakeholders"},
        {"id":"c","text":"A release package"},
        {"id":"d","text":"Sprint Burndown Chart"}
    ]'
WHERE id = 36;

-- Question 37
UPDATE quiz_questions SET 
    question_en = 'Which Scrum event is typically timeboxed to 15 minutes?',
    explanation_en = 'The Daily Scrum is timeboxed to 15 minutes.',
    options_en = '[
        {"id":"a","text":"Sprint Planning"},
        {"id":"b","text":"Sprint Review"},
        {"id":"c","text":"Daily Scrum"},
        {"id":"d","text":"Sprint Retrospective"}
    ]'
WHERE id = 37;

-- Question 38
UPDATE quiz_questions SET 
    question_en = 'Which statement about transparency in Scrum is true?',
    explanation_en = 'The emergent process and work must be visible to those performing the work as well as those receiving the work. In Scrum, important decisions are based on the perceived state of its three formal artifacts. Artifacts that have low transparency can lead to decisions that diminish value and increase risk.',
    options_en = '[
        {"id":"a","text":"Transparency is the exclusive responsibility of the Scrum Master"},
        {"id":"b","text":"Transparency only applies to technical work progress"},
        {"id":"c","text":"Transparency requires the process and work to be visible to those who perform and receive the work"},
        {"id":"d","text":"Transparency means all information is available to anyone in the organization"}
    ]'
WHERE id = 38;

-- Question 39
UPDATE quiz_questions SET 
    question_en = 'How often should the Definition of Done be met?',
    explanation_en = 'Every Increment must meet the Definition of Done. Work not meeting the Definition of Done is not considered part of the Increment.',
    options_en = '[
        {"id":"a","text":"Only for the first Sprint"},
        {"id":"b","text":"Only for critical features"},
        {"id":"c","text":"Every Increment"},
        {"id":"d","text":"Whenever Developers have time"}
    ]'
WHERE id = 39;

-- Question 40
UPDATE quiz_questions SET 
    question_en = 'What is the role of the Product Owner during Sprint Planning?',
    explanation_en = 'During Sprint Planning, the Product Owner ensures that attendees are prepared to discuss the most important Product Backlog items and how they map to the Product Goal.',
    options_en = '[
        {"id":"a","text":"To assign tasks to Developers"},
        {"id":"b","text":"To clarify Product Backlog items and Product Goal"},
        {"id":"c","text":"To facilitate the event as the main moderator"},
        {"id":"d","text":"To review previous Sprint analytics"}
    ]'
WHERE id = 40;

