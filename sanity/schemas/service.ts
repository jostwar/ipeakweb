export default {
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "titleEs", title: "Título (ES)", type: "string" },
    { name: "titleEn", title: "Título (EN)", type: "string" },
    { name: "image", title: "Imagen", type: "image" },
    {
      name: "bulletsEs",
      title: "Beneficios (ES)",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "bulletsEn",
      title: "Benefits (EN)",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "order", title: "Orden", type: "number" },
  ],
};
