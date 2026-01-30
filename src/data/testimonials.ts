import testimonialsData from "../../data/testimonials.json";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

export const testimonials = testimonialsData as Testimonial[];
