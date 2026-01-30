import faqData from "../../data/faq.json";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems = faqData as FaqItem[];
