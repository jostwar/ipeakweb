import Link from "next/link";

export default function GraciasPage() {
  return (
    <div className="bg-black px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Gracias
        </p>
        <h1 className="text-4xl font-semibold">
          Recibimos tu solicitud con éxito.
        </h1>
        <p className="text-base text-white/70">
          Nuestro equipo validará la información y te contactará en las próximas
          24-48 horas hábiles.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 text-base font-semibold text-black transition hover:bg-white/90"
          >
            Volver al inicio
          </Link>
          <Link
            href="/servicios"
            className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white/60"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </div>
  );
}
