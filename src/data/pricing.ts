import pricingData from "../../data/pricing.json";

export type PricingPlan = {
  id: "starter" | "growth" | "scale";
  name: string;
  subtitleEs: string;
  subtitleEn: string;
  features: string[];
  note?: string;
  highlight?: boolean;
};

export const pricingPlans = pricingData as PricingPlan[];
