import servicesData from "../../data/services.json";

export type Service = {
  id: string;
  titleEs: string;
  titleEn: string;
  bulletsEs: string[];
  bulletsEn: string[];
};

export const services = servicesData as Service[];
