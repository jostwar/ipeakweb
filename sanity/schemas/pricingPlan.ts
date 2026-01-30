export default {
  name: "pricingPlan",
  title: "Plan",
  type: "document",
  fields: [
    { name: "id", title: "ID (starter/growth/scale)", type: "string" },
    { name: "name", title: "Nombre", type: "string" },
    { name: "subtitleEs", title: "Subtítulo (ES)", type: "string" },
    { name: "subtitleEn", title: "Subtítulo (EN)", type: "string" },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "note", title: "Nota", type: "string" },
    { name: "highlight", title: "Destacado", type: "boolean" },
    { name: "order", title: "Orden", type: "number" },
  ],
};
