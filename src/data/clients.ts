import clientsData from "../../data/clients.json";

export type Client = {
  id: string;
  name: string;
  logo?: string;
};

export const clients = clientsData as Client[];
