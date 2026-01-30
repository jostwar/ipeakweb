"use client";

import { useState, type FormEvent } from "react";

const initialState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const isValid =
    form.name.trim().length > 1 &&
    form.email.includes("@") &&
    form.message.trim().length > 10;

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "No se pudo enviar el mensaje.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card w-full space-y-4 rounded-3xl p-8"
    >
      <div>
        <label className="text-sm text-white/70">Nombre</label>
        <input
          required
          value={form.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="text-sm text-white/70">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          placeholder="nombre@empresa.com"
        />
      </div>
      <div>
        <label className="text-sm text-white/70">Empresa</label>
        <input
          value={form.company}
          onChange={(event) => handleChange("company", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          placeholder="Nombre de tu empresa"
        />
      </div>
      <div>
        <label className="text-sm text-white/70">Mensaje</label>
        <textarea
          required
          value={form.message}
          onChange={(event) => handleChange("message", event.target.value)}
          className="mt-2 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          placeholder="Cuéntanos tus objetivos y plazos."
        />
      </div>
      <button
        type="submit"
        disabled={!isValid || status === "loading"}
        className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
      {status === "success" && (
        <p className="text-sm text-emerald-300">
          Mensaje enviado. Te contactamos pronto.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-rose-300">{error}</p>
      )}
      <p className="text-xs text-white/50">
        También respondemos en menos de 24h hábiles.
      </p>
    </form>
  );
}
