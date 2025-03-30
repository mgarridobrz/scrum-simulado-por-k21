
import { QuestionType } from "@/components/QuizQuestion";

export const quizQuestions: QuestionType[] = [
  {
    id: 1,
    question: "Qual é o papel responsável por gerenciar o Product Backlog?",
    options: [
      { id: "a", text: "Scrum Master" },
      { id: "b", text: "Product Owner" },
      { id: "c", text: "Desenvolvedores" },
      { id: "d", text: "Stakeholders" }
    ],
    correctAnswer: "b"
  },
  {
    id: 2,
    question: "Qual é a duração recomendada para a Sprint Planning em uma Sprint de duas semanas?",
    options: [
      { id: "a", text: "1 hora" },
      { id: "b", text: "2 horas" },
      { id: "c", text: "4 horas" },
      { id: "d", text: "8 horas" }
    ],
    correctAnswer: "d"
  },
  {
    id: 3,
    question: "Quem é responsável por estimar os itens do Product Backlog?",
    options: [
      { id: "a", text: "Product Owner" },
      { id: "b", text: "Scrum Master" },
      { id: "c", text: "Desenvolvedores" },
      { id: "d", text: "O cliente" }
    ],
    correctAnswer: "c"
  },
  {
    id: 4,
    question: "O que acontece se a equipe não conseguir completar todo o trabalho planejado para a Sprint?",
    options: [
      { id: "a", text: "A Sprint é estendida até que todo o trabalho seja concluído" },
      { id: "b", text: "O Scrum Master deve trabalhar horas extras para concluir o trabalho" },
      { id: "c", text: "O trabalho não concluído volta para o Product Backlog para repriorização" },
      { id: "d", text: "A equipe é penalizada com uma Sprint mais curta na próxima vez" }
    ],
    correctAnswer: "c"
  },
  {
    id: 5,
    question: "Qual é o objetivo principal do Daily Scrum?",
    options: [
      { id: "a", text: "Reportar o progresso aos gestores" },
      { id: "b", text: "Planejar o trabalho para o dia e identificar impedimentos" },
      { id: "c", text: "Atualizar o Product Backlog" },
      { id: "d", text: "Revisar a qualidade do código" }
    ],
    correctAnswer: "b"
  }
];
