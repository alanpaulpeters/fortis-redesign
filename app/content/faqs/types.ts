export type FaqItem = { question: string; answer: string };

export type FaqContent = {
  general: FaqItem[];
  schuldner: FaqItem[];
};
