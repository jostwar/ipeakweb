import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  name: "default",
  title: "iPeak Agency CMS",
  projectId: projectId || "",
  dataset: dataset || "production",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
