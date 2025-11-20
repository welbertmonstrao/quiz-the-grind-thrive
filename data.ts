import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "TEMPO (Cálculo de Sangramento)",
    text: "How many hours per week do you spend on repetitive tasks (answering the same questions, sending follow-ups, etc.)?",
    options: [
      { id: 'A', text: "0-5 hours", score: 1 },
      { id: 'B', text: "5-15 hours", score: 3 },
      { id: 'C', text: "+15 hours", score: 5 },
    ],
  },
  {
    id: 2,
    category: "TEMPO / AUTOSSUFICIÊNCIA",
    text: "How do you manage your customer data (phone numbers, purchase history, etc.)?",
    options: [
      { id: 'A', text: "Dedicated CRM/System", score: 1 },
      { id: 'B', text: "Spreadsheets/Notes", score: 3 },
      { id: 'C', text: "My phone/memory", score: 5 },
    ],
  },
  {
    id: 3,
    category: "PRIORIDADE / CUSTO DE OPORTUNIDADE",
    text: "How often do you ask happy customers for a review or referral?",
    options: [
      { id: 'A', text: "Automatically", score: 1 },
      { id: 'B', text: "Sometimes, when I remember", score: 3 },
      { id: 'C', text: "Almost never", score: 5 },
    ],
  },
  {
    id: 4,
    category: "TEMPO (Consequência Exponencial)",
    text: "How many times this month have you missed a family event or personal time due to a work emergency?",
    options: [
      { id: 'A', text: "0", score: 1 },
      { id: 'B', text: "1-2 times", score: 3 },
      { id: 'C', text: "3+ times", score: 5 },
    ],
  },
  {
    id: 5,
    category: "CONFIANÇA / MEDO DA MUDANÇA",
    text: "When you think about implementing new technology, your first thought is:",
    options: [
      { id: 'A', text: "\"How fast can I set this up?\"", score: 1 },
      { id: 'B', text: "\"This is going to be complicated.\"", score: 3 },
      { id: 'C', text: "\"I'll probably fail like last time.\"", score: 5 },
    ],
  },
  {
    id: 6,
    category: "DOR (Raiz Emocional)",
    text: "What is your biggest fear about your business right now?",
    options: [
      { id: 'A', text: "Not growing fast enough", score: 1 },
      { id: 'B', text: "Losing my best customers", score: 3 },
      { id: 'C', text: "Total burnout/losing my life", score: 5 },
    ],
  },
  {
    id: 7,
    category: "QUALIFICAÇÃO",
    text: "What is your average monthly revenue?",
    options: [
      { id: 'A', text: "$0k-$10k", score: 1 },
      { id: 'B', text: "$10k-$50k", score: 3 },
      { id: 'C', text: "$50k+", score: 5 },
    ],
  },
];