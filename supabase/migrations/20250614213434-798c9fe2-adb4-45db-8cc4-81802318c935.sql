
-- Update English translations for questions 1-40 based on provided JSON

UPDATE quiz_questions SET 
    question_en = 'What is one of the main dysfunctions that can occur in a Scrum Team when Transparency is compromised?',
    explanation_en = 'When Transparency is compromised, Scrum Team members make decisions based on incomplete or incorrect information, leading to inadequate results and a loss of trust.',
    options_en = '[
        {"id":"a","text":"Increase in team productivity"},
        {"id":"b","text":"Decision-making based on incomplete or incorrect information"},
        {"id":"c","text":"Greater collaboration among team members"},
        {"id":"d","text":"Reduction in product development time"}
    ]'
WHERE id = 1;

UPDATE quiz_questions SET 
    question_en = 'Which dysfunction can occur when the Product Owner does not keep the Product Backlog properly refined?',
    explanation_en = 'When the Product Backlog is not properly refined, Sprint Planning becomes inefficient and backlog items are poorly understood by the team, resulting in delays and lower‑value deliveries.',
    options_en = '[
        {"id":"a","text":"Team more focused on the product objectives"},
        {"id":"b","text":"Sprints with higher delivery value"},
        {"id":"c","text":"Inefficient Sprint Planning and items poorly understood by the team"},
        {"id":"d","text":"Increase in development speed"}
    ]'
WHERE id = 2;

UPDATE quiz_questions SET 
    question_en = 'What is a common dysfunction when the Scrum Master does not remove impediments effectively?',
    explanation_en = 'When the Scrum Master fails to remove impediments effectively, the team faces constant obstacles that lower delivery quality and cause frustration, decreasing productivity and morale.',
    options_en = '[
        {"id":"a","text":"The team becomes more autonomous and efficient"},
        {"id":"b","text":"Reduced delivery quality and team frustration"},
        {"id":"c","text":"Higher delivery speed"},
        {"id":"d","text":"Faster continuous improvement"}
    ]'
WHERE id = 3;

UPDATE quiz_questions SET 
    question_en = 'Which dysfunction can occur when Daily Scrums turn into status meetings for managers?',
    explanation_en = 'When Daily Scrums turn into status meetings, the focus on daily inspection and adaptation is lost. Instead of synchronizing and surfacing impediments, the event becomes merely an accountability session.',
    options_en = '[
        {"id":"a","text":"Increased collaboration among team members"},
        {"id":"b","text":"Better communication of impediments"},
        {"id":"c","text":"Reduced focus on daily inspection and adaptation"},
        {"id":"d","text":"Greater developer engagement in the meeting"}
    ]'
WHERE id = 4;

UPDATE quiz_questions SET 
    question_en = 'Which dysfunction is associated with teams that do not properly conduct Sprint Retrospectives?',
    explanation_en = 'Teams that neglect Sprint Retrospectives lose the opportunity to learn from their experience, leading to repeated mistakes and a lack of continuous improvement in both work processes and interpersonal relationships.',
    options_en = '[
        {"id":"a","text":"Greater ability to adapt to change"},
        {"id":"b","text":"Constant repetition of the same mistakes and lack of continuous improvement"},
        {"id":"c","text":"Reduced development time"},
        {"id":"d","text":"Higher product quality"}
    ]'
WHERE id = 5;

UPDATE quiz_questions SET 
    question_en = 'What is a common dysfunction when there is excessive work‑in‑progress (WIP) in a Sprint?',
    explanation_en = 'Excessive WIP spreads the team across too many tasks at once, reducing quality and increasing the risk that items are not completed, jeopardizing value delivery at the Sprint''s end.',
    options_en = '[
        {"id":"a","text":"Faster delivery of every Sprint Backlog item"},
        {"id":"b","text":"Better organization of the team''s work"},
        {"id":"c","text":"More items finished at the end of the Sprint"},
        {"id":"d","text":"Reduced quality and higher risk of not completing items"}
    ]'
WHERE id = 6;

UPDATE quiz_questions SET 
    question_en = 'What happens if the team cannot complete all the work planned for the Sprint?',
    explanation_en = 'In Scrum the Sprint''s timebox is fixed. If planned work is not completed, the unfinished items return to the Product Backlog and may be selected in a future Sprint as prioritized by the Product Owner.',
    options_en = '[
        {"id":"a","text":"The Sprint is extended until all work is finished"},
        {"id":"c","text":"Unfinished work goes back to the Product Backlog for reprioritization"},
        {"id":"b","text":"The Scrum Master works overtime to finish the work"},
        {"id":"d","text":"The team is penalized with a shorter next Sprint"}
    ]'
WHERE id = 7;

UPDATE quiz_questions SET 
    question_en = 'What are the three pillars of Scrum?',
    explanation_en = 'The three pillars are Transparency, Inspection and Adaptation. Transparency makes the significant aspects of the process visible; Inspection means Scrum users frequently examine artifacts and progress; Adaptation occurs when adjustments are required.',
    options_en = '[
        {"id":"a","text":"Visibility, inspection and adaptation"},
        {"id":"b","text":"Transparency, inspection and adaptation"},
        {"id":"c","text":"Communication, collaboration and delivery"},
        {"id":"d","text":"Planning, execution and review"}
    ]'
WHERE id = 8;

UPDATE quiz_questions SET 
    question_en = 'What is an impediment in the context of Scrum?',
    explanation_en = 'An impediment is anything that prevents the team from advancing in the Sprint. It can be internal (such as a technical problem) or external (such as a stakeholder decision). The Scrum Master helps remove impediments.',
    options_en = '[
        {"id":"a","text":"Only technical issues found by Developers"},
        {"id":"b","text":"A bug found during the Sprint"},
        {"id":"c","text":"Any obstacle blocking the team from making progress"},
        {"id":"d","text":"Only issues reported by the Product Owner"}
    ]'
WHERE id = 9;

UPDATE quiz_questions SET 
    question_en = 'What is empiricism in Scrum?',
    explanation_en = 'Empiricism states that knowledge comes from experience and making decisions based on observation. Scrum uses an iterative and incremental approach to optimize predictability and control risk.',
    options_en = '[
        {"id":"a","text":"A way to track velocity"},
        {"id":"b","text":"An approach based on observation, inspection and adaptation"},
        {"id":"c","text":"A method for estimating story points"},
        {"id":"d","text":"A technique for Backlog refinement"}
    ]'
WHERE id = 10;

UPDATE quiz_questions SET 
    question_en = 'What is the recommended size for a Scrum Team?',
    explanation_en = 'Scrum Teams are typically composed of 10 or fewer people. In general, smaller teams communicate better and are more productive.',
    options_en = '[
        {"id":"c","text":"10–15 people in total"},
        {"id":"d","text":"There is no fixed mandatory size"},
        {"id":"a","text":"10 people or fewer"},
        {"id":"b","text":"5–11 people excluding Scrum Master and Product Owner"}
    ]'
WHERE id = 11;

UPDATE quiz_questions SET 
    question_en = 'Which statement about Scrum is correct?',
    explanation_en = 'Scrum is a lightweight framework that helps people, teams, and organizations generate value. It leaves room for teams to choose the practices that best suit their context.',
    options_en = '[
        {"id":"a","text":"Scrum is a process or technique for building products"},
        {"id":"b","text":"Scrum is a comprehensive framework with all tools needed for project management"},
        {"id":"c","text":"Scrum is a framework within which you can employ various processes and techniques"},
        {"id":"d","text":"Scrum is a methodology that increases team productivity"}
    ]'
WHERE id = 12;

UPDATE quiz_questions SET 
    question_en = 'Why is Scrum considered ''lightweight''?',
    explanation_en = 'Scrum is deliberately lightweight. It defines only what is absolutely necessary to fulfill its purpose, leaving out everything else.',
    options_en = '[
        {"id":"a","text":"Because it is easy to learn"},
        {"id":"b","text":"Because it has few rules and roles, being minimally prescriptive"},
        {"id":"c","text":"Because it requires no documentation"},
        {"id":"d","text":"Because it is only for small projects"}
    ]'
WHERE id = 13;

UPDATE quiz_questions SET 
    question_en = 'What happens when a Sprint ends?',
    explanation_en = 'A new Sprint starts immediately after the conclusion of the previous one, based on the outcome of the Sprint Review and the updated context.',
    options_en = '[
        {"id":"a","text":"The Scrum Team is given a new assignment"},
        {"id":"b","text":"A new Sprint starts immediately afterward"},
        {"id":"c","text":"The Scrum Team has a rest period before the next Sprint"},
        {"id":"d","text":"The Scrum Master evaluates the team''s performance"}
    ]'
WHERE id = 14;

UPDATE quiz_questions SET 
    question_en = 'Which statement about transparency in Scrum is true?',
    explanation_en = 'The process and the emerging work must be visible to those doing the work and those receiving the work. Lack of transparency may lead to decisions that reduce value and increase risk.',
    options_en = '[
        {"id":"a","text":"Transparency is exclusively the Scrum Master''s responsibility"},
        {"id":"b","text":"Transparency only applies to the technical progress of the work"},
        {"id":"c","text":"Transparency requires the process and the work to be visible to those performing the work and those receiving the work"},
        {"id":"d","text":"Transparency means all information is available to anyone in the organization"}
    ]'
WHERE id = 15;

UPDATE quiz_questions SET 
    question_en = 'How is work divided within a Scrum Team?',
    explanation_en = 'Within a Scrum Team there are no sub‑teams or hierarchies; Developers share accountability and possess all the skills needed to create value each Sprint.',
    options_en = '[
        {"id":"a","text":"By technical specialty or domain"},
        {"id":"b","text":"By the Scrum Master in collaboration with functional managers"},
        {"id":"c","text":"There are no titles for Developers regardless of the work performed"},
        {"id":"d","text":"By the Product Owner based on priorities"}
    ]'
WHERE id = 16;

UPDATE quiz_questions SET 
    question_en = 'What does self‑management mean in Scrum?',
    explanation_en = 'Scrum Teams are self‑managing, collectively choosing who does what, when, and how in order to achieve their goals.',
    options_en = '[
        {"id":"a","text":"Each team member individually decides what to work on"},
        {"id":"b","text":"The team internally decides who does what, when, and how"},
        {"id":"c","text":"The Scrum Master manages tasks for the team"},
        {"id":"d","text":"Developers work with no supervision"}
    ]'
WHERE id = 17;

UPDATE quiz_questions SET 
    question_en = 'What is one of the main advantages of Scrum''s time‑boxed structure?',
    explanation_en = 'Scrum''s time‑boxed events provide regular moments for inspection and adaptation, reducing process complexity, minimizing waste, and focusing on what is essential.',
    options_en = '[
        {"id":"a","text":"It allows adding more work when the team finishes early"},
        {"id":"b","text":"It reduces complexity by limiting time and amount of work"},
        {"id":"c","text":"It eliminates the need for detailed planning"},
        {"id":"d","text":"It guarantees that all planned work will be completed"}
    ]'
WHERE id = 18;

UPDATE quiz_questions SET 
    question_en = 'What does it mean to say that Scrum is ''simple to understand, difficult to master''?',
    explanation_en = 'Scrum is simple to understand because its framework has few elements, but mastering it is hard because it demands deep understanding and disciplined application of empirical principles.',
    options_en = '[
        {"id":"d","text":"The Scrum Guide is short but the certification is hard"},
        {"id":"a","text":"Its framework is minimalist, but effective implementation requires practice"},
        {"id":"b","text":"It is easier to learn than other agile methodologies"},
        {"id":"c","text":"It is simple for beginners but very complex for professionals"}
    ]'
WHERE id = 19;

UPDATE quiz_questions SET 
    question_en = 'What is the philosophical foundation of Scrum?',
    explanation_en = 'Scrum is founded on empiricism—knowledge comes from experience—and Lean thinking, which emphasizes adaptability, observation, and continuous improvement.',
    options_en = '[
        {"id":"a","text":"Planning and predictability"},
        {"id":"b","text":"Empiricism and Lean thinking"},
        {"id":"c","text":"Efficiency and cost minimization"},
        {"id":"d","text":"Documentation and processes"}
    ]'
WHERE id = 20;

UPDATE quiz_questions SET 
    question_en = 'What is the relationship between ''Done'' and ''value'' in Scrum?',
    explanation_en = 'In Scrum an Increment only provides value when it meets the Definition of Done. Transparency, inspection, and adaptation depend on having ''Done'' increments.',
    options_en = '[
        {"id":"a","text":"They are independent concepts"},
        {"id":"d","text":"''Done'' is more important than value"},
        {"id":"b","text":"An Increment has value only when it meets the Definition of Done"},
        {"id":"c","text":"Value is determined by the Product Owner, ''Done'' by the Scrum Master"}
    ]'
WHERE id = 21;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of self‑management in Scrum?',
    explanation_en = 'Self‑management in Scrum empowers the team to decide who, what, when, and how, which enhances engagement, accountability, and effectiveness in tackling complex work.',
    options_en = '[
        {"id":"a","text":"To reduce the need for managers"},
        {"id":"b","text":"To allow each person to work however they prefer"},
        {"id":"c","text":"To increase creativity, productivity, and the ability to solve complex problems"},
        {"id":"d","text":"To remove responsibility from organizational leadership"}
    ]'
WHERE id = 22;

UPDATE quiz_questions SET 
    question_en = 'How does Scrum address predictability in complex projects?',
    explanation_en = 'Scrum uses the empirical approach—transparency, inspection, and adaptation—to optimize predictability and control risk within the limits of complexity.',
    options_en = '[
        {"id":"a","text":"It requires detailed planning before execution"},
        {"id":"d","text":"It leaves all predictability to the Product Owner"},
        {"id":"b","text":"It uses an empirical approach to maximize predictability and control risk"},
        {"id":"c","text":"There is no such need in Scrum"}
    ]'
WHERE id = 23;

UPDATE quiz_questions SET 
    question_en = 'What are the Scrum values?',
    explanation_en = 'The five Scrum values—Commitment, Focus, Openness, Respect, and Courage—guide the Scrum Team''s work, actions, and behavior.',
    options_en = '[
        {"id":"a","text":"Transparency, Inspection, Adaptation"},
        {"id":"c","text":"Communication, Collaboration, Visibility"},
        {"id":"d","text":"Agility, Efficiency, Quality, Innovation"},
        {"id":"b","text":"Commitment, Focus, Openness, Respect, and Courage"}
    ]'
WHERE id = 24;

UPDATE quiz_questions SET 
    question_en = 'Which role is responsible for managing the Product Backlog?',
    explanation_en = 'The Product Owner is accountable for managing the Product Backlog, ensuring it is visible, transparent, and understood.',
    options_en = '[
        {"id":"a","text":"Scrum Master"},
        {"id":"b","text":"Product Owner"},
        {"id":"c","text":"Developers"},
        {"id":"d","text":"Stakeholders"}
    ]'
WHERE id = 25;

UPDATE quiz_questions SET 
    question_en = 'Who is responsible for estimating Product Backlog items?',
    explanation_en = 'Developers are responsible for all estimates. The people who will perform the work do the estimating.',
    options_en = '[
        {"id":"a","text":"Product Owner"},
        {"id":"b","text":"Scrum Master"},
        {"id":"c","text":"Developers"},
        {"id":"d","text":"The customer"}
    ]'
WHERE id = 26;

UPDATE quiz_questions SET 
    question_en = 'Does a Scrum Master need technical knowledge?',
    explanation_en = 'Technical knowledge is not mandatory, but it can help the Scrum Master coach the team and remove impediments. Care must be taken not to become the technical leader.',
    options_en = '[
        {"id":"d","text":"Of course, because they act as an auditor"},
        {"id":"a","text":"No, because they are a neutral facilitator"},
        {"id":"b","text":"Yes, to act as the team''s technical leader"},
        {"id":"c","text":"Only if they think they know more than the team"}
    ]'
WHERE id = 27;

UPDATE quiz_questions SET 
    question_en = 'What is the primary responsibility of the Scrum Master?',
    explanation_en = 'The Scrum Master is accountable for establishing Scrum as defined in the Scrum Guide and acts as a servant‑leader to the Scrum Team and the wider organization.',
    options_en = '[
        {"id":"a","text":"Managing the Product Backlog"},
        {"id":"b","text":"Ensuring that the Scrum process is understood and followed"},
        {"id":"c","text":"Assigning tasks to Developers"},
        {"id":"d","text":"Reporting progress to stakeholders"}
    ]'
WHERE id = 28;

UPDATE quiz_questions SET 
    question_en = 'What is the primary responsibility of Developers in Scrum?',
    explanation_en = 'Developers are committed to creating a high‑quality, usable Increment each Sprint, adhering to their Definition of Done.',
    options_en = '[
        {"id":"a","text":"Follow the Scrum Master''s instructions"},
        {"id":"b","text":"Create a plan for the Sprint"},
        {"id":"d","text":"Create a valuable, usable Increment every Sprint"},
        {"id":"c","text":"Manage the Product Backlog"}
    ]'
WHERE id = 29;

UPDATE quiz_questions SET 
    question_en = 'Who is responsible for promoting and supporting Scrum within the organization?',
    explanation_en = 'The Scrum Master is responsible for the Scrum Team''s effectiveness and for ensuring that interactions with the Scrum Team are helpful.',
    options_en = '[
        {"id":"d","text":"The Scrum Master"},
        {"id":"a","text":"Senior managers"},
        {"id":"b","text":"The Product Owner"},
        {"id":"c","text":"Developers"}
    ]'
WHERE id = 30;

UPDATE quiz_questions SET 
    question_en = 'Who can remove items from the Sprint Backlog during a Sprint?',
    explanation_en = 'The Sprint Backlog is a plan created by and for Developers; they own it and update it throughout the Sprint as they learn more.',
    options_en = '[
        {"id":"a","text":"Only the Product Owner"},
        {"id":"b","text":"Only the Scrum Master"},
        {"id":"c","text":"Only the Developers"},
        {"id":"d","text":"Any member of the Scrum Team"}
    ]'
WHERE id = 31;

UPDATE quiz_questions SET 
    question_en = 'Which statement about the Product Owner is correct?',
    explanation_en = 'The Product Owner is a single person. Product Backlog responsibilities cannot be delegated to a committee, though others may influence the Product Owner.',
    options_en = '[
        {"id":"a","text":"The Product Owner may delegate responsibility for the Product Backlog to the client"},
        {"id":"c","text":"The Product Owner is a single person, not a committee"},
        {"id":"b","text":"The Product Owner can be a committee of people"},
        {"id":"d","text":"The Product Owner must have technical experience to evaluate implemented solutions"}
    ]'
WHERE id = 32;

UPDATE quiz_questions SET 
    question_en = 'How does the Scrum Master serve the organization?',
    explanation_en = 'The Scrum Master serves the organization by coaching, consulting, and leading it in adopting Scrum and removing barriers between stakeholders and Scrum Teams.',
    options_en = '[
        {"id":"a","text":"By acting as a traditional project manager"},
        {"id":"b","text":"By leading and coaching the organization in its Scrum adoption"},
        {"id":"c","text":"By reporting progress to executives"},
        {"id":"d","text":"By ensuring Scrum is implemented according to company guidelines"}
    ]'
WHERE id = 33;

UPDATE quiz_questions SET 
    question_en = 'What happens if the Product Owner and Developers disagree on the priority of Product Backlog items?',
    explanation_en = 'In Scrum, the Product Owner is solely responsible for ordering the Product Backlog, though they may consider feedback from Developers and stakeholders.',
    options_en = '[
        {"id":"a","text":"The Scrum Master decides the final priority"},
        {"id":"b","text":"The decision is escalated to stakeholders for resolution"},
        {"id":"c","text":"The Product Owner''s decision prevails"},
        {"id":"d","text":"The Development team has the final say"}
    ]'
WHERE id = 34;

UPDATE quiz_questions SET 
    question_en = 'What is the maximum recommended number of members in a Scrum Team?',
    explanation_en = 'According to the Scrum Guide, Scrum Teams are typically 10 or fewer people; smaller teams tend to communicate better and be more productive.',
    options_en = '[
        {"id":"a","text":"7 members"},
        {"id":"b","text":"9 members"},
        {"id":"c","text":"10 members"},
        {"id":"d","text":"12 members"}
    ]'
WHERE id = 35;

UPDATE quiz_questions SET 
    question_en = 'What is the Product Owner''s role regarding stakeholders?',
    explanation_en = 'The Product Owner represents stakeholder interests, collaborating with them while retaining final authority over the Product Backlog.',
    options_en = '[
        {"id":"a","text":"Follow all instructions from stakeholders"},
        {"id":"c","text":"Represent the stakeholders'' interests in the Product Backlog"},
        {"id":"b","text":"Shield the team from stakeholder requests"},
        {"id":"d","text":"Delegate product decisions to stakeholders"}
    ]'
WHERE id = 36;

UPDATE quiz_questions SET 
    question_en = 'What should the Scrum Master NOT do?',
    explanation_en = 'The Scrum Master should not assign tasks to Developers; Sprint planning and task selection belong to the Developers themselves.',
    options_en = '[
        {"id":"a","text":"Facilitate Scrum events"},
        {"id":"b","text":"Remove impediments"},
        {"id":"c","text":"Assign tasks to Developers"},
        {"id":"d","text":"Provide coaching on Scrum practices"}
    ]'
WHERE id = 37;

UPDATE quiz_questions SET 
    question_en = 'How should Developers respond to a scope change request during the Sprint?',
    explanation_en = 'Developers should refer scope‑change requests to the Product Owner, who may negotiate the change by altering the Sprint Goal or placing the request back on the Product Backlog for future Sprints.',
    options_en = '[
        {"id":"d","text":"Implement changes if they have extra capacity"},
        {"id":"a","text":"Always reject any change during the Sprint"},
        {"id":"b","text":"Accept all requests to satisfy stakeholders"},
        {"id":"c","text":"Redirect the request to the Product Owner for negotiation"}
    ]'
WHERE id = 38;

UPDATE quiz_questions SET 
    question_en = 'How does the Scrum Master support Developers?',
    explanation_en = 'The Scrum Master supports Developers by coaching them in self‑management, facilitating removal of impediments when needed, and helping them stay focused on the Sprint Goal.',
    options_en = '[
        {"id":"a","text":"By ensuring they complete all assigned tasks"},
        {"id":"b","text":"By coaching them in self‑management and cross‑functionality"},
        {"id":"c","text":"By reporting performance to managers"},
        {"id":"d","text":"By providing technical solutions to problems"}
    ]'
WHERE id = 39;

UPDATE quiz_questions SET 
    question_en = 'What is the Scrum Team''s responsibility regarding the Definition of Done?',
    explanation_en = 'If the organization does not already have a Definition of Done, the Scrum Team must create one. Developers must follow and continuously improve it.',
    options_en = '[
        {"id":"d","text":"Let each Developer define their own ''Done'' criteria"},
        {"id":"a","text":"Follow the Definition of Done established by the organization"},
        {"id":"b","text":"Allow the Product Owner to define what is Done"},
        {"id":"c","text":"Create and honor their own Definition of Done and evolve it continuously"}
    ]'
WHERE id = 40;
