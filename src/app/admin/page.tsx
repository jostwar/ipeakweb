"use client";

import { useEffect, useState } from "react";

const datasets = [
  { id: "services", label: "Servicios" },
  { id: "clients", label: "Clientes" },
  { id: "testimonials", label: "Testimonios" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [key, setKey] = useState(datasets[0].id);
  const [jsonValue, setJsonValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "saving">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const fetchData = async () => {
    if (!token) return;
    setStatus("loading");
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/data?key=${key}`, {
        headers: { "x-admin-token": token },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Error al cargar.");
      setJsonValue(JSON.stringify(data.data, null, 2));
      setStatus("idle");
    } catch (error) {
      setStatus("idle");
      setMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  const saveData = async () => {
    if (!token) return;
    setStatus("saving");
    setMessage(null);
    try {
      const response = await fetch("/api/admin/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ key, payload: jsonValue }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Error al guardar.");
      setStatus("idle");
      setMessage("Cambios guardados.");
    } catch (error) {
      setStatus("idle");
      setMessage(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, token]);

  return (
    <div className="bg-black px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Admin
          </p>
          <h1 className="text-3xl font-semibold">Panel simple de contenido</h1>
          <p className="text-sm text-white/60">
            Edita los JSON en vivo. Requiere el token configurado en
            `ADMIN_TOKEN`.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div className="space-y-2">
            <label className="text-sm text-white/70">Admin token</label>
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
              placeholder="Pegue su token"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70">Dataset</label>
            <select
              value={key}
              onChange={(event) => setKey(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
            >
              {datasets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Contenido JSON</label>
          <textarea
            value={jsonValue}
            onChange={(event) => setJsonValue(event.target.value)}
            className="min-h-[320px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-white outline-none transition focus:border-white/40"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={fetchData}
            disabled={!token || status === "loading"}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 disabled:opacity-50"
          >
            {status === "loading" ? "Cargando..." : "Recargar"}
          </button>
          <button
            onClick={saveData}
            disabled={!token || status === "saving"}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {status === "saving" ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

        {message && (
          <p className="text-sm text-white/70">{message}</p>
        )}
      </div>
    </div>
  );
}
