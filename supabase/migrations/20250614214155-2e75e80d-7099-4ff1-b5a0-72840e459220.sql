
-- Update English translations for questions 41-80 (Fixed JSON escaping)

UPDATE quiz_questions SET 
    question_en = 'What does it mean to say that the Product Owner is ''one person, not a committee''?',
    explanation_en = 'Saying the Product Owner is one person means a single individual is accountable for product value and Product Backlog decisions.',
    options_en = '[
        {"id":"d","text":"The Product Owner cannot represent stakeholder wishes"},
        {"id":"a","text":"The Product Owner must never consult anyone else"},
        {"id":"b","text":"A single person must have final authority over the Product Backlog"},
        {"id":"c","text":"The Product Owner should not be part of a product committee"}
    ]'
WHERE id = 41;

UPDATE quiz_questions SET 
    question_en = 'What is the Scrum Master''s role regarding impediment removal?',
    explanation_en = 'The Scrum Master helps remove impediments that Developers cannot resolve and coaches the team to handle impediments themselves whenever possible.',
    options_en = '[
        {"id":"a","text":"Personally resolve all team impediments"},
        {"id":"d","text":"Coach the team to remove their own impediments"},
        {"id":"b","text":"Only document impediments for future resolution"},
        {"id":"c","text":"Ignore impediments"}
    ]'
WHERE id = 42;

UPDATE quiz_questions SET 
    question_en = 'What is the recommended length for Sprint Planning for a two‑week Sprint?',
    explanation_en = 'According to the Scrum Guide, Sprint Planning is time‑boxed to a maximum of eight hours for a one‑month Sprint; therefore, up to four hours is recommended for a two‑week Sprint.',
    options_en = '[
        {"id":"a","text":"1 hour"},
        {"id":"b","text":"2 hours"},
        {"id":"c","text":"8 hours"},
        {"id":"d","text":"4 hours"}
    ]'
WHERE id = 43;

UPDATE quiz_questions SET 
    question_en = 'What is the main purpose of the Daily Scrum?',
    explanation_en = 'The Daily Scrum is a 15‑minute event for Developers to inspect progress toward the Sprint Goal and adjust their plan for the next 24 hours, promoting collaboration.',
    options_en = '[
        {"id":"a","text":"Report progress to managers"},
        {"id":"b","text":"Increase collaboration among team members"},
        {"id":"c","text":"Update the Product Backlog"},
        {"id":"d","text":"Review code quality"}
    ]'
WHERE id = 44;

UPDATE quiz_questions SET 
    question_en = 'When does planning for a Sprint begin?',
    explanation_en = 'Sprint planning happens during the Sprint Planning event at the start of the Sprint, where the Scrum Team answers what can be delivered and how the work will be achieved.',
    options_en = '[
        {"id":"a","text":"During the last day of the previous Sprint"},
        {"id":"c","text":"During Sprint Planning on the first day of the Sprint"},
        {"id":"b","text":"At any time during the current Sprint"},
        {"id":"d","text":"One week before the Sprint starts"}
    ]'
WHERE id = 45;

UPDATE quiz_questions SET 
    question_en = 'What is the primary purpose of the Sprint Review?',
    explanation_en = 'The Sprint Review is held to inspect the outcome of the Sprint and determine future adaptations. Based on feedback, the Product Backlog may be adjusted to maximize value.',
    options_en = '[
        {"id":"a","text":"Evaluate team performance"},
        {"id":"b","text":"Inspect the Increment and adapt the Product Backlog"},
        {"id":"c","text":"Plan the next Sprint"},
        {"id":"d","text":"Identify and resolve impediments"}
    ]'
WHERE id = 46;

UPDATE quiz_questions SET 
    question_en = 'Which event(s) occur on the last day of the Sprint?',
    explanation_en = 'On the last day of the Sprint, three events occur: the final Daily Scrum, the Sprint Review, and the Sprint Retrospective, all before the next Sprint Planning.',
    options_en = '[
        {"id":"a","text":"Sprint Planning"},
        {"id":"d","text":"Product Backlog Refinement"},
        {"id":"b","text":"Daily Scrum"},
        {"id":"c","text":"The Daily Scrum, Sprint Review, followed by the Sprint Retrospective"}
    ]'
WHERE id = 47;

UPDATE quiz_questions SET 
    question_en = 'What happens if a Sprint Goal becomes obsolete?',
    explanation_en = 'A Sprint can be cancelled if the Sprint Goal becomes obsolete. Only the Product Owner has authority to cancel the Sprint.',
    options_en = '[
        {"id":"c","text":"The team must complete the Sprint as planned"},
        {"id":"a","text":"The Sprint continues but with modified goals"},
        {"id":"b","text":"The Sprint may be cancelled by the Product Owner"},
        {"id":"d","text":"The Scrum Master extends the Sprint"}
    ]'
WHERE id = 48;

UPDATE quiz_questions SET 
    question_en = 'How should the Daily Scrum be conducted?',
    explanation_en = 'Developers may choose any structure or techniques they prefer, as long as the Daily Scrum focuses on progress toward the Sprint Goal and creates a plan for the next work day.',
    options_en = '[
        {"id":"a","text":"By following the strict three‑question format"},
        {"id":"b","text":"In whatever way works best for the Development Team"},
        {"id":"c","text":"With all stakeholders present"},
        {"id":"d","text":"Only when the Scrum Master is available"}
    ]'
WHERE id = 49;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Sprint Retrospective?',
    explanation_en = 'The Sprint Retrospective plans ways to increase quality and effectiveness by inspecting how the last Sprint went regarding people, relationships, process, and tools.',
    options_en = '[
        {"id":"a","text":"Plan the work for the next Sprint"},
        {"id":"c","text":"Inspect the Scrum Team and create improvements for the next Sprint"},
        {"id":"b","text":"Evaluate the Increment produced in the Sprint"},
        {"id":"d","text":"Review and adjust the Product Backlog"}
    ]'
WHERE id = 50;

UPDATE quiz_questions SET 
    question_en = 'What is the main objective of Sprint Planning?',
    explanation_en = 'Sprint Planning starts the Sprint by defining the work to be performed and creating the Sprint Backlog around a coherent Sprint Goal.',
    options_en = '[
        {"id":"c","text":"Establish what can be delivered in the Sprint and how the work will be done"},
        {"id":"a","text":"Assign tasks to team members"},
        {"id":"b","text":"Kick off the Sprint work"},
        {"id":"d","text":"Prioritize the Product Backlog"}
    ]'
WHERE id = 51;

UPDATE quiz_questions SET 
    question_en = 'Which statement about Sprint length is correct?',
    explanation_en = 'Shorter Sprints can be used to generate more learning cycles and reduce risk. All Sprints are limited to one calendar month or less.',
    options_en = '[
        {"id":"a","text":"Sprint length can vary depending on the complexity of the work"},
        {"id":"d","text":"Sprint length should increase as the project progresses"},
        {"id":"b","text":"Sprints must last two weeks"},
        {"id":"c","text":"Shorter Sprints can be used to generate more feedback and limit risk"}
    ]'
WHERE id = 52;

UPDATE quiz_questions SET 
    question_en = 'Who should attend the Daily Scrum?',
    explanation_en = 'The Daily Scrum is a 15‑minute event for Developers. If the Scrum Master or Product Owner are actively working on Sprint Backlog items, they participate as Developers.',
    options_en = '[
        {"id":"a","text":"Developers, Scrum Master, and Product Owner"},
        {"id":"b","text":"Only the Developers"},
        {"id":"c","text":"The entire Scrum Team and relevant stakeholders"},
        {"id":"d","text":"Anyone interested in the project"}
    ]'
WHERE id = 53;

UPDATE quiz_questions SET 
    question_en = 'What is the maximum recommended length for the Sprint Retrospective?',
    explanation_en = 'The Sprint Retrospective is time‑boxed to a maximum of three hours for a one‑month Sprint. For shorter Sprints, the event is usually shorter.',
    options_en = '[
        {"id":"a","text":"1 hour for a one‑week Sprint"},
        {"id":"b","text":"2 hours for a two‑week Sprint"},
        {"id":"c","text":"3 hours for a three‑week Sprint"},
        {"id":"d","text":"3 hours for a one‑month Sprint"}
    ]'
WHERE id = 54;

UPDATE quiz_questions SET 
    question_en = 'How long should Sprint Planning last for a one‑week Sprint?',
    explanation_en = 'Sprint Planning is limited to a maximum of eight hours for a one‑month Sprint. For a one‑week Sprint it is generally no more than two hours.',
    options_en = '[
        {"id":"a","text":"No more than 2 hours"},
        {"id":"c","text":"No more than 8 hours"},
        {"id":"b","text":"Exactly 4 hours"},
        {"id":"d","text":"As long as necessary"}
    ]'
WHERE id = 55;

UPDATE quiz_questions SET 
    question_en = 'What happens during the Sprint Review?',
    explanation_en = 'During the Sprint Review, the Scrum Team presents the Increment and engages with stakeholders to inspect it and adapt the Product Backlog as needed.',
    options_en = '[
        {"id":"d","text":"The Product Owner updates the Product Backlog alone"},
        {"id":"a","text":"The team plans the next Sprint"},
        {"id":"b","text":"The Scrum Team provides visibility to stakeholders about what is Done and gathers feedback"},
        {"id":"c","text":"The team discusses how to improve their processes"}
    ]'
WHERE id = 56;

UPDATE quiz_questions SET 
    question_en = 'How long should the Daily Scrum last?',
    explanation_en = 'The Daily Scrum is time‑boxed to 15 minutes, keeping the event focused on creating a plan for the next 24 hours.',
    options_en = '[
        {"id":"a","text":"15 minutes or less"},
        {"id":"b","text":"30 minutes"},
        {"id":"c","text":"As long as necessary for everyone to speak"},
        {"id":"d","text":"1 hour"}
    ]'
WHERE id = 57;

UPDATE quiz_questions SET 
    question_en = 'What should happen if a team consistently cannot complete the work planned for the Sprint?',
    explanation_en = 'If the team consistently does not complete planned work, they should adjust their forecast in Sprint Planning based on their actual capacity and velocity.',
    options_en = '[
        {"id":"a","text":"Increase the Sprint length"},
        {"id":"c","text":"Re‑evaluate team capacity during planning"},
        {"id":"b","text":"Add more people to the team"},
        {"id":"d","text":"Allow the work to continue in the next Sprint"}
    ]'
WHERE id = 58;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of Sprint Planning with respect to the Sprint Backlog?',
    explanation_en = 'The Sprint Backlog consists of the Sprint Goal, the selected Product Backlog items, and a plan for delivering them; Sprint Planning creates this backlog.',
    options_en = '[
        {"id":"a","text":"Create a complete and detailed list of all tasks"},
        {"id":"b","text":"Select Product Backlog items and create a plan to deliver them"},
        {"id":"c","text":"Assign specific items to specific developers"},
        {"id":"d","text":"Precisely estimate how long each task will take"}
    ]'
WHERE id = 59;

UPDATE quiz_questions SET 
    question_en = 'Which statement about cancelling a Sprint is correct?',
    explanation_en = 'Only the Product Owner has authority to cancel a Sprint, often due to changes in business conditions, technology, or market.',
    options_en = '[
        {"id":"a","text":"A Sprint should never be cancelled"},
        {"id":"c","text":"Only the Product Owner can cancel a Sprint"},
        {"id":"b","text":"Any stakeholder can cancel a Sprint"},
        {"id":"d","text":"The Scrum Team must vote to cancel a Sprint"}
    ]'
WHERE id = 60;

UPDATE quiz_questions SET 
    question_en = 'What is the primary objective of the Sprint Retrospective?',
    explanation_en = 'The Sprint Retrospective aims to plan ways to increase quality and effectiveness by reviewing the last Sprint and identifying improvements for the next Sprint.',
    options_en = '[
        {"id":"d","text":"Assess individual member performance"},
        {"id":"a","text":"Review the product Increment"},
        {"id":"b","text":"Plan improvements in quality and effectiveness"},
        {"id":"c","text":"Update the Product Backlog"}
    ]'
WHERE id = 61;

UPDATE quiz_questions SET 
    question_en = 'What should NOT happen during the Daily Scrum?',
    explanation_en = 'Long technical discussions should be taken offline. The Daily Scrum is limited to inspecting progress and creating a plan for the next 24 hours.',
    options_en = '[
        {"id":"a","text":"Detailed planning for the day"},
        {"id":"b","text":"Lengthy technical discussions about implementations"},
        {"id":"c","text":"Identification of impediments"},
        {"id":"d","text":"Adapting the Sprint Backlog"}
    ]'
WHERE id = 62;

UPDATE quiz_questions SET 
    question_en = 'What sets the Sprint Retrospective apart from other Scrum events?',
    explanation_en = 'The Sprint Retrospective focuses on how the Scrum Team worked together—their processes, interactions, and tools—rather than on the product itself.',
    options_en = '[
        {"id":"d","text":"It is the only optional event in Scrum"},
        {"id":"a","text":"It is the only event where stakeholders are present"},
        {"id":"b","text":"It focuses on process and people, not the product"},
        {"id":"c","text":"It is the only event led by the Scrum Master"}
    ]'
WHERE id = 63;

UPDATE quiz_questions SET 
    question_en = 'Who is allowed to change the Sprint Backlog during the Sprint?',
    explanation_en = 'The Sprint Backlog belongs solely to Developers; they update it as they learn more about the work needed to achieve the Sprint Goal.',
    options_en = '[
        {"id":"a","text":"Only the Product Owner"},
        {"id":"b","text":"Only the Scrum Master"},
        {"id":"c","text":"The Developers"},
        {"id":"d","text":"Any stakeholder"}
    ]'
WHERE id = 64;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Increment in Scrum?',
    explanation_en = 'The Increment is a concrete step toward the product vision and must be in usable condition at the end of the Sprint.',
    options_en = '[
        {"id":"a","text":"Show progress to stakeholders"},
        {"id":"b","text":"Provide a concrete step toward the product vision"},
        {"id":"c","text":"Satisfy the documented requirements"},
        {"id":"d","text":"Complete all planned tasks"}
    ]'
WHERE id = 65;

UPDATE quiz_questions SET 
    question_en = 'What is the Definition of Done (DoD) in Scrum?',
    explanation_en = 'The Definition of Done is a formal description of the state of the Increment when it meets the required quality measures for the product, helping everyone understand what ''complete'' means.',
    options_en = '[
        {"id":"d","text":"The definition of what constitutes the Sprint Goal"},
        {"id":"a","text":"A list of tasks to be completed during the Sprint"},
        {"id":"b","text":"The acceptance criteria of a single user story"},
        {"id":"c","text":"A shared understanding of when an Increment is complete"}
    ]'
WHERE id = 66;

UPDATE quiz_questions SET 
    question_en = 'Who is responsible for ensuring that Product Backlog items are transparent?',
    explanation_en = 'The Product Owner is accountable for the Product Backlog, including its content, availability, and transparency.',
    options_en = '[
        {"id":"a","text":"The Scrum Master"},
        {"id":"c","text":"The Product Owner"},
        {"id":"b","text":"The Development Team"},
        {"id":"d","text":"The entire Scrum Team"}
    ]'
WHERE id = 67;

UPDATE quiz_questions SET 
    question_en = 'What is the main purpose of the Sprint Goal?',
    explanation_en = 'The Sprint Goal brings coherence and focus, encouraging the Scrum Team to work together toward a common outcome rather than on separate initiatives.',
    options_en = '[
        {"id":"a","text":"Measure team velocity"},
        {"id":"b","text":"Provide flexibility in how the work is implemented"},
        {"id":"c","text":"Track individual performance"},
        {"id":"d","text":"Satisfy stakeholder requirements"}
    ]'
WHERE id = 68;

UPDATE quiz_questions SET 
    question_en = 'What is the Sprint Backlog?',
    explanation_en = 'The Sprint Backlog consists of the Sprint Goal (why), the selected Product Backlog items (what), and a plan for delivering the Increment (how).',
    options_en = '[
        {"id":"c","text":"A list of impediments identified by the Scrum Master"},
        {"id":"a","text":"A list of all tasks the team needs to do throughout the project"},
        {"id":"b","text":"The Sprint Goal, the selected Product Backlog items, and a plan to deliver the Increment"},
        {"id":"d","text":"The list of defects found during the Sprint"}
    ]'
WHERE id = 69;

UPDATE quiz_questions SET 
    question_en = 'What is the ''Increment'' in Scrum?',
    explanation_en = 'An Increment is a concrete step toward the Product Goal, built upon all previous Increments. To deliver value, the Increment must be usable.',
    options_en = '[
        {"id":"c","text":"The increase in team velocity from one Sprint to another"},
        {"id":"a","text":"The sum of all Product Backlog items completed during the Sprint"},
        {"id":"b","text":"A concrete step toward the Product Goal"},
        {"id":"d","text":"A new software version with more functionality"}
    ]'
WHERE id = 70;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Product Backlog?',
    explanation_en = 'The Product Backlog is an ordered, emergent list that is the single source of work to be done. Product Backlog items that will soon be worked on are refined to be ready for Sprint Planning.',
    options_en = '[
        {"id":"a","text":"List all tasks the development team must perform"},
        {"id":"b","text":"Document the product''s technical requirements"},
        {"id":"c","text":"Serve as the single source of requirements for any changes to be made to the product"},
        {"id":"d","text":"Track the current Sprint''s progress"}
    ]'
WHERE id = 71;

UPDATE quiz_questions SET 
    question_en = 'What is the Definition of Done?',
    explanation_en = 'The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product. When a Product Backlog item meets the Definition of Done, an Increment is born.',
    options_en = '[
        {"id":"a","text":"A specific checklist for each Product Backlog item"},
        {"id":"b","text":"A formal description of the state of the Increment when it meets the required quality measures for the product"},
        {"id":"c","text":"The acceptance criteria list defined by the Product Owner"},
        {"id":"d","text":"The set of tasks that make up a Sprint Backlog item"}
    ]'
WHERE id = 72;

UPDATE quiz_questions SET 
    question_en = 'Who should participate in Product Backlog Refinement?',
    explanation_en = 'Product Backlog Refinement is a collaborative activity involving the Scrum Team to add detail, order, and estimate items.',
    options_en = '[
        {"id":"d","text":"The Product Owner and stakeholders"},
        {"id":"a","text":"Only the Product Owner"},
        {"id":"b","text":"Only the Developers"},
        {"id":"c","text":"The Scrum Team"}
    ]'
WHERE id = 73;

UPDATE quiz_questions SET 
    question_en = 'Who is responsible for monitoring progress toward the Sprint Goal?',
    explanation_en = 'The entire Scrum Team monitors progress toward the Sprint Goal. The Product Owner tracks total work remaining, and the Scrum Master ensures everyone understands progress.',
    options_en = '[
        {"id":"a","text":"The Product Owner only"},
        {"id":"b","text":"The Scrum Master only"},
        {"id":"c","text":"The Developers only"},
        {"id":"d","text":"The entire Scrum Team"}
    ]'
WHERE id = 74;

UPDATE quiz_questions SET 
    question_en = 'How does the concept of ''transparency'' apply to Scrum artifacts?',
    explanation_en = 'Transparency means that artifacts must represent what is actually happening; for example, using a shared Definition of Done so everyone understands what is being seen.',
    options_en = '[
        {"id":"a","text":"All artifacts should be visible only to the Scrum Team"},
        {"id":"b","text":"Artifacts must be understandable and based on shared standards"},
        {"id":"c","text":"Only the Product Backlog needs to be transparent"},
        {"id":"d","text":"Transparency means documenting all artifacts in detail"}
    ]'
WHERE id = 75;

UPDATE quiz_questions SET 
    question_en = 'What is the role of ''commitments'' with respect to Scrum artifacts?',
    explanation_en = 'Each Scrum artifact contains a commitment to ensure it provides information that enhances transparency and focus: the Product Backlog has the Product Goal, the Sprint Backlog has the Sprint Goal, and the Increment has the Definition of Done.',
    options_en = '[
        {"id":"c","text":"They are contractual requirements for product delivery"},
        {"id":"a","text":"They are promises the Scrum Team makes to stakeholders"},
        {"id":"b","text":"They increase transparency and provide focus for measuring progress"},
        {"id":"d","text":"They define penalties for unmet goals"}
    ]'
WHERE id = 76;

UPDATE quiz_questions SET 
    question_en = 'Why should Product Backlog items be ordered?',
    explanation_en = 'Product Backlog items are ordered to optimize value, risk, and scope, ensuring that the most valuable work is done first.',
    options_en = '[
        {"id":"a","text":"To simplify product documentation"},
        {"id":"b","text":"To optimize value and maximize the efficiency of work"},
        {"id":"c","text":"Because Scrum requires everything to be prioritized"},
        {"id":"d","text":"To please stakeholders"}
    ]'
WHERE id = 77;

UPDATE quiz_questions SET 
    question_en = 'What is the purpose of the Product Goal?',
    explanation_en = 'The Product Goal describes the future state of the product which can serve as a target for the Scrum Team. Progress toward it can be measured through the Product Backlog.',
    options_en = '[
        {"id":"a","text":"Define exactly what the final product will be"},
        {"id":"c","text":"Communicate the objective the product seeks to achieve"},
        {"id":"b","text":"Specify all product requirements"},
        {"id":"d","text":"Serve as a contract between the Scrum Team and stakeholders"}
    ]'
WHERE id = 78;

UPDATE quiz_questions SET 
    question_en = 'What happens to the Sprint Backlog during the Sprint?',
    explanation_en = 'The Sprint Backlog is updated throughout the Sprint as more is learned. Work may be added, changed, or removed as the team executes the plan toward the Sprint Goal.',
    options_en = '[
        {"id":"a","text":"It remains fixed from start to finish"},
        {"id":"d","text":"It can only be changed by the Product Owner"},
        {"id":"b","text":"It can be expanded but never reduced"},
        {"id":"c","text":"It is updated as Developers learn more"}
    ]'
WHERE id = 79;

UPDATE quiz_questions SET 
    question_en = 'What characteristic must a Product Backlog item have to be selected for Sprint Planning?',
    explanation_en = 'To be selected in Sprint Planning, a Product Backlog item must be deemed Ready, meaning it is sufficiently refined for the Developers to complete within a Sprint. Higher‑ordered items in the Product Backlog are usually clearer and more detailed.',
    options_en = '[
        {"id":"d","text":"Have detailed technical specifications"},
        {"id":"a","text":"Be approved by all stakeholders"},
        {"id":"b","text":"Have a story‑point estimate"},
        {"id":"c","text":"Be considered Ready for Selection"}
    ]'
WHERE id = 80;
