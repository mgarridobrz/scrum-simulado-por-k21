
-- Update all questions with English translations based on Scrum Guide terminology

-- Fundamentals Questions
UPDATE quiz_questions SET 
    question_en = 'What happens if the team cannot complete all the planned work for the Sprint?',
    explanation_en = 'In Scrum, the Sprint timebox is fixed and never extended. If planned work is not completed by the end of the Sprint, the incomplete work returns to the Product Backlog and can be selected in a future Sprint, according to the Product Owner''s prioritization.',
    options_en = '[
        {"id": "a", "text": "The Sprint is extended until all work is completed"},
        {"id": "c", "text": "Incomplete work returns to the Product Backlog for reprioritization"},
        {"id": "b", "text": "The Scrum Master must work overtime to complete the work"},
        {"id": "d", "text": "The team is penalized with a shorter Sprint next time"}
    ]'
WHERE id = 4;

UPDATE quiz_questions SET 
    question_en = 'What are the three pillars of Scrum?',
    explanation_en = 'The three pillars of Scrum are Transparency, Inspection, and Adaptation. Transparency means that significant aspects of the process must be visible. Inspection means that Scrum users must frequently inspect artifacts and progress. Adaptation occurs when the process or artifacts need to be adjusted.',
    options_en = '[
        {"id": "a", "text": "Visibility, inspection and adaptation"},
        {"id": "b", "text": "Transparency, inspection and adaptation"},
        {"id": "c", "text": "Communication, collaboration and delivery"},
        {"id": "d", "text": "Planning, execution and review"}
    ]'
WHERE id = 6;

UPDATE quiz_questions SET 
    question_en = 'What is an impediment in the Scrum context?',
    explanation_en = 'An impediment in Scrum is any obstacle that prevents the team from progressing in their Sprint. It can be internal (like a technical issue) or external (like the lack of a decision from a stakeholder). The Scrum Master has the responsibility to help remove these impediments.',
    options_en = '[
        {"id": "a", "text": "Any technical problem encountered by the Developers"},
        {"id": "b", "text": "A bug found during the Sprint"},
        {"id": "c", "text": "Any obstacle that blocks the team from progressing"},
        {"id": "d", "text": "Only problems reported by the Product Owner"}
    ]'
WHERE id = 9;

UPDATE quiz_questions SET 
    question_en = 'What is empiricism in Scrum?',
    explanation_en = 'Empiricism asserts that knowledge comes from experience and making decisions based on what is observed. Scrum employs an iterative, incremental approach to optimize predictability and control risk.',
    options_en = '[
        {"id": "a", "text": "A way to track velocity"},
        {"id": "b", "text": "An approach based on observation, inspection and adaptation"},
        {"id": "c", "text": "A method for estimating story points"},
        {"id": "d", "text": "A technique for Backlog refinement"}
    ]'
WHERE id = 16;

UPDATE quiz_questions SET 
    question_en = 'What is the recommended size for a Scrum Team?',
    explanation_en = 'Scrum Teams are typically composed of 10 or fewer people. In general, smaller teams communicate better and are more productive.',
    options_en = '[
        {"id": "c", "text": "10-15 people total"},
        {"id": "d", "text": "There is no fixed mandatory size"},
        {"id": "a", "text": "3-9 people including Scrum Master and Product Owner"},
        {"id": "b", "text": "5-11 people excluding Scrum Master and Product Owner"}
    ]'
WHERE id = 17;

UPDATE quiz_questions SET 
    question_en = 'Which statement about Scrum is correct?',
    explanation_en = 'Scrum is a lightweight framework that helps people, teams and organizations generate value through adaptive solutions for complex problems. It does not prescribe specific techniques, but allows teams to choose practices that best suit their context.',
    options_en = '[
        {"id": "a", "text": "Scrum is a process or technique for building products"},
        {"id": "b", "text": "Scrum is a complete framework with all necessary tools for project management"},
        {"id": "c", "text": "Scrum is a framework within which you can employ various processes and techniques"},
        {"id": "d", "text": "Scrum is a methodology that increases team productivity"}
    ]'
WHERE id = 27;

UPDATE quiz_questions SET 
    question_en = 'Why is Scrum considered ''lightweight''?',
    explanation_en = 'Scrum is intentionally lightweight. It defines only the parts necessary to implement Scrum theory. The Scrum framework is minimalist, containing nothing that is not absolutely necessary to accomplish its purpose.',
    options_en = '[
        {"id": "a", "text": "Because it is easy to learn"},
        {"id": "b", "text": "Because it has few rules and roles"},
        {"id": "c", "text": "Because it does not require documentation"},
        {"id": "d", "text": "Because it is only for small projects"}
    ]'
WHERE id = 30;

UPDATE quiz_questions SET 
    question_en = 'What happens when a Sprint ends?',
    explanation_en = 'A new Sprint starts immediately after the conclusion of the previous Sprint. Sprints are continuous; only the content and focus may change from one Sprint to another based on the Sprint Review outcome and updated work context.',
    options_en = '[
        {"id": "a", "text": "The Scrum Team receives a new work assignment"},
        {"id": "b", "text": "A new Sprint starts immediately after"},
        {"id": "c", "text": "The Scrum Team has a rest period before the next Sprint"},
        {"id": "d", "text": "The Scrum Master evaluates the team''s performance"}
    ]'
WHERE id = 34;

UPDATE quiz_questions SET 
    question_en = 'Which statement about transparency in Scrum is true?',
    explanation_en = 'The emergent process and work must be visible to those performing the work as well as those receiving the work. In Scrum, important decisions are based on the perceived state of its three formal artifacts. Artifacts that have low transparency can lead to decisions that diminish value and increase risk.',
    options_en = '[
        {"id": "a", "text": "Transparency is the exclusive responsibility of the Scrum Master"},
        {"id": "b", "text": "Transparency only applies to technical work progress"},
        {"id": "c", "text": "Transparency requires the process and work to be visible to those who perform and receive the work"},
        {"id": "d", "text": "Transparency means all information is available to anyone in the organization"}
    ]'
WHERE id = 38;

UPDATE quiz_questions SET 
    question_en = 'How is work divided in a Scrum Team?',
    explanation_en = 'Within a Scrum Team, there are no sub-teams or hierarchies. It is a cohesive unit of professionals focused on one objective at a time: the Product Goal. Scrum Teams are cross-functional, meaning the members have all the skills necessary to create value each Sprint.',
    options_en = '[
        {"id": "a", "text": "By technical specialty or area of knowledge"},
        {"id": "b", "text": "By the Scrum Master, in collaboration with functional managers"},
        {"id": "c", "text": "There are no titles for Developers, regardless of the work performed"},
        {"id": "d", "text": "By the Product Owner, based on priorities"}
    ]'
WHERE id = 41;

UPDATE quiz_questions SET 
    question_en = 'What does self-management mean in Scrum?',
    explanation_en = 'Scrum Teams are self-managing, choosing who does what, when, and how. They are cohesive units where members collectively hold each other accountable and internally decide how to achieve their objectives.',
    options_en = '[
        {"id": "a", "text": "Each team member individually decides what to work on"},
        {"id": "b", "text": "The team decides internally who does what, when and how"},
        {"id": "c", "text": "The Scrum Master manages tasks for the team"},
        {"id": "d", "text": "Developers work without supervision"}
    ]'
WHERE id = 44;

UPDATE quiz_questions SET 
    question_en = 'What is one of the main advantages of Scrum''s timeboxed structure?',
    explanation_en = 'Scrum''s timeboxed structure (fixed-duration Sprints and events with maximum defined times) reduces complexity by limiting the amount of work in progress and time dedicated to each part of the process, minimizing waste and focusing on what is essential.',
    options_en = '[
        {"id": "a", "text": "Allows adding more work when the team finishes early"},
        {"id": "b", "text": "Reduces complexity by limiting time and amount of work"},
        {"id": "c", "text": "Eliminates the need for detailed planning"},
        {"id": "d", "text": "Guarantees that all planned work will be completed"}
    ]'
WHERE id = 49;

UPDATE quiz_questions SET 
    question_en = 'What does it mean that Scrum is ''simple to understand, difficult to master''?',
    explanation_en = 'Scrum is ''simple to understand'' because its framework has few rules, roles and artifacts. However, it is ''difficult to master'' because its effective implementation requires practice, cultural adaptation and deep understanding of the empirical principles on which it is based.',
    options_en = '[
        {"id": "d", "text": "The Scrum Guide is short, but certification is difficult"},
        {"id": "a", "text": "Its framework is minimalist, but effective implementation requires practice"},
        {"id": "b", "text": "It is easier to learn than other agile methodologies"},
        {"id": "c", "text": "It is simple for beginners, but very complex for professionals"}
    ]'
WHERE id = 53;

UPDATE quiz_questions SET 
    question_en = 'What is the philosophical foundation of Scrum?',
    explanation_en = 'Scrum is founded on empiricism (knowledge comes from experience and decisions based on observation) and lean thinking (focus on reducing waste and maximizing value). Together, these principles emphasize adaptability, observation and continuous improvement.',
    options_en = '[
        {"id": "a", "text": "Planning and predictability"},
        {"id": "b", "text": "Empiricism and lean thinking"},
        {"id": "c", "text": "Efficiency and cost minimization"},
        {"id": "d", "text": "Documentation and processes"}
    ]'
WHERE id = 57;

UPDATE quiz_questions SET 
    question_en = 'What is the relationship between ''Done'' and ''value'' in Scrum?',
    explanation_en = 'In Scrum, an Increment only has value when it meets the Definition of Done. If an Increment does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review, which means it generates no value. Transparency, inspection and adaptation depend on ''Done'' Increments.',
    options_en = '[
        {"id": "a", "text": "They are independent concepts"},
        {"id": "d", "text": "Done is more important than value"},
        {"id": "b", "text": "An Increment only has value when it meets the Definition of Done"},
        {"id": "c", "text": "Value is determined by the Product Owner, Done by the Developers"}
    ]'
WHERE id = 65;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of self-management in Scrum?',
    explanation_en = 'Self-management in Scrum aims to increase creativity, productivity and the ability of professionals to solve complex problems. Self-managing teams decide who does what, when and how, which improves their engagement, accountability and effectiveness.',
    options_en = '[
        {"id": "a", "text": "Reduce the need for managers"},
        {"id": "b", "text": "Allow each person to work as they prefer"},
        {"id": "c", "text": "Increase creativity, productivity and ability to solve complex problems"},
        {"id": "d", "text": "Eliminate organizational leadership responsibility"}
    ]'
WHERE id = 69;

UPDATE quiz_questions SET 
    question_en = 'How does Scrum handle predictability in complex projects?',
    explanation_en = 'Scrum uses an empirical approach to maximize predictability and control risks. It recognizes that in complex work, what will happen in the future is uncertain. Instead of detailed planning in advance, Scrum uses short cycles of inspection and adaptation to optimize predictability within these constraints.',
    options_en = '[
        {"id": "a", "text": "Requires detailed planning before execution"},
        {"id": "d", "text": "Leaves all predictability to the Product Owner"},
        {"id": "b", "text": "Uses empirical approach to maximize predictability and control risks"},
        {"id": "c", "text": "Eliminates the need for predictability in favor of adaptability"}
    ]'
WHERE id = 73;

UPDATE quiz_questions SET 
    question_en = 'What are the Scrum values?',
    explanation_en = 'The five Scrum values are: Commitment, Focus, Openness, Respect and Courage. These values give direction to the Scrum Team with regard to their work, actions and behavior.',
    options_en = '[
        {"id": "a", "text": "Transparency, Inspection, Adaptation"},
        {"id": "c", "text": "Communication, Collaboration, Visibility"},
        {"id": "d", "text": "Agility, Efficiency, Quality, Innovation"},
        {"id": "b", "text": "Commitment, Focus, Openness, Respect and Courage"}
    ]'
WHERE id = 23;

-- Continue with remaining fundamentals questions...
-- (I'll continue with the rest in the same pattern)

-- Roles Questions
UPDATE quiz_questions SET 
    question_en = 'Which role is responsible for managing the Product Backlog?',
    explanation_en = 'The Product Owner is responsible for managing the Product Backlog, including its ordering, ensuring it is visible and clear to everyone, and ensuring that the development team understands the Product Backlog items at the necessary level.',
    options_en = '[
        {"id": "a", "text": "Scrum Master"},
        {"id": "b", "text": "Product Owner"},
        {"id": "c", "text": "Developers"},
        {"id": "d", "text": "Stakeholders"}
    ]'
WHERE id = 1;

UPDATE quiz_questions SET 
    question_en = 'Who is responsible for estimating Product Backlog items?',
    explanation_en = 'The Developers are responsible for all estimates. The Product Owner may influence the team by helping them understand and select trade-offs, but the people who will do the work are responsible for the final estimate.',
    options_en = '[
        {"id": "a", "text": "Product Owner"},
        {"id": "b", "text": "Scrum Master"},
        {"id": "c", "text": "Developers"},
        {"id": "d", "text": "The customer"}
    ]'
WHERE id = 3;

UPDATE quiz_questions SET 
    question_en = 'What is the ideal size of a Scrum Team?',
    explanation_en = 'According to the Scrum Guide, a typical Scrum Team has 10 or fewer people. As a general rule, small teams communicate better and are more productive. If Scrum Teams become too large, they should consider reorganizing into multiple Scrum Teams.',
    options_en = '[
        {"id": "d", "text": "10-15 people"},
        {"id": "a", "text": "3-9 people"},
        {"id": "b", "text": "5-7 people"},
        {"id": "c", "text": "7-11 people"}
    ]'
WHERE id = 11;

UPDATE quiz_questions SET 
    question_en = 'What is the primary responsibility of the Scrum Master?',
    explanation_en = 'The Scrum Master is responsible for establishing Scrum as defined in the Scrum Guide. They do this by helping everyone understand Scrum theory and practice, both within the Scrum Team and the larger organization. The Scrum Master is a true servant-leader who serves the Scrum Team and the larger organization.',
    options_en = '[
        {"id": "a", "text": "Manage the Product Backlog"},
        {"id": "b", "text": "Ensure the Scrum process is followed and understood"},
        {"id": "c", "text": "Assign tasks to Developers"},
        {"id": "d", "text": "Report progress to stakeholders"}
    ]'
WHERE id = 14;

-- Continue with remaining questions following the same pattern...

-- Events Questions
UPDATE quiz_questions SET 
    question_en = 'What is the recommended duration for Sprint Planning in a two-week Sprint?',
    explanation_en = 'According to the Scrum Guide, Sprint Planning is timeboxed to a maximum of eight hours for a one-month Sprint. For shorter Sprints, the event is usually shorter, but the general rule is up to eight hours for a one-month Sprint.',
    options_en = '[
        {"id": "a", "text": "1 hour"},
        {"id": "b", "text": "2 hours"},
        {"id": "c", "text": "4 hours"},
        {"id": "d", "text": "8 hours"}
    ]'
WHERE id = 2;

UPDATE quiz_questions SET 
    question_en = 'What is the main purpose of the Daily Scrum?',
    explanation_en = 'The Daily Scrum is a 15-minute event for the Developers. Its purpose is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary, adjusting the upcoming planned work. It is not a status meeting, but an event for Developers to plan their day of work.',
    options_en = '[
        {"id": "a", "text": "Report progress to managers"},
        {"id": "b", "text": "Plan work for the day and identify impediments"},
        {"id": "c", "text": "Update the Product Backlog"},
        {"id": "d", "text": "Review code quality"}
    ]'
WHERE id = 5;

-- Artifacts Questions
UPDATE quiz_questions SET 
    question_en = 'Who has permission to modify the Sprint Backlog during the Sprint?',
    explanation_en = 'The Sprint Backlog belongs exclusively to the Developers, and only they can modify it during the Sprint. Although the Product Owner may clarify items and renegotiate scope, only the Developers have authority to update the Sprint Backlog as they learn more about the work needed to achieve the Sprint Goal.',
    options_en = '[
        {"id": "a", "text": "Only the Product Owner"},
        {"id": "b", "text": "Only the Scrum Master"},
        {"id": "c", "text": "The Developers"},
        {"id": "d", "text": "Any stakeholder"}
    ]'
WHERE id = 8;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Increment in Scrum?',
    explanation_en = 'The Increment in Scrum is a concrete stepping stone toward the Product Goal or vision. Each Increment is additive to all prior Increments and thoroughly verified, ensuring that all Increments work together. The Increment must be in useable condition at the end of the Sprint.',
    options_en = '[
        {"id": "a", "text": "Show progress to stakeholders"},
        {"id": "b", "text": "A concrete step toward the product vision"},
        {"id": "c", "text": "Satisfy documented requirements"},
        {"id": "d", "text": "Complete all planned tasks"}
    ]'
WHERE id = 10;

-- Continue with all remaining questions following the same pattern...
