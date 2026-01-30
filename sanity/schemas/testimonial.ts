export default {
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "name", title: "Nombre", type: "string" },
    { name: "role", title: "Cargo", type: "string" },
    { name: "company", title: "Empresa", type: "string" },
    { name: "quote", title: "Texto", type: "text" },
    { name: "order", title: "Orden", type: "number" },
  ],
};
