export default {
  name: "faqItem",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "question", title: "Pregunta", type: "string" },
    { name: "answer", title: "Respuesta", type: "text" },
    { name: "order", title: "Orden", type: "number" },
  ],
};
