import path from "path";
import { promises as fs } from "fs";
import { createClient } from "@sanity/client";
import type { Client } from "@/data/clients";
import type { FaqItem } from "@/data/faq";
import type { PricingPlan } from "@/data/pricing";
import type { Service } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";

type ContentProvider = "local" | "sanity";

const getProvider = (): ContentProvider => {
  const hasSanity =
    process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET;
  return hasSanity ? "sanity" : "local";
};

const dataPath = (filename: string) =>
  path.join(process.cwd(), "data", filename);

async function readJsonFile<T>(filename: string): Promise<T> {
  const file = await fs.readFile(dataPath(filename), "utf8");
  return JSON.parse(file) as T;
}

const getSanityClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION || "2024-04-10",
    useCdn: true,
    token: process.env.SANITY_READ_TOKEN,
  });

export async function getServices(): Promise<Service[]> {
  if (getProvider() === "sanity") {
    const client = getSanityClient();
    return client.fetch(
      `*[_type == "service"]|order(order asc){
        id,
        titleEs,
        titleEn,
        bulletsEs,
        bulletsEn
      }`,
    );
  }
  return readJsonFile<Service[]>("services.json");
}

export async function getClients(): Promise<Client[]> {
  if (getProvider() === "sanity") {
    const client = getSanityClient();
    return client.fetch(
      `*[_type == "client"]|order(order asc){
        id,
        name,
        "logo": logo.asset->url
      }`,
    );
  }
  return readJsonFile<Client[]>("clients.json");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (getProvider() === "sanity") {
    const client = getSanityClient();
    return client.fetch(
      `*[_type == "testimonial"]|order(order asc){
        id,
        name,
        role,
        company,
        quote
      }`,
    );
  }
  return readJsonFile<Testimonial[]>("testimonials.json");
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  if (getProvider() === "sanity") {
    const client = getSanityClient();
    return client.fetch(
      `*[_type == "pricingPlan"]|order(order asc){
        id,
        name,
        subtitleEs,
        subtitleEn,
        features,
        note,
        highlight
      }`,
    );
  }
  return readJsonFile<PricingPlan[]>("pricing.json");
}

export async function getFaqItems(): Promise<FaqItem[]> {
  if (getProvider() === "sanity") {
    const client = getSanityClient();
    return client.fetch(
      `*[_type == "faqItem"]|order(order asc){
        id,
        question,
        answer
      }`,
    );
  }
  return readJsonFile<FaqItem[]>("faq.json");
}
