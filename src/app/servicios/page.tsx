export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/content";

export default async function ServiciosPage() {
  const services = await getServices();
  return (
    <div className="bg-black px-6 py-20 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Servicios
          </p>
          <h1 className="text-4xl font-semibold">
            Soluciones a medida para ventas, branding y automatización.
          </h1>
          <p className="text-base text-white/60">
            Explore en detalle cada servicio y agenda una llamada para definir
            el alcance.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {services.map((service) => (
            <details
              key={service.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <summary className="cursor-pointer text-lg font-semibold text-white">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  {service.image && (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                      <Image
                        src={service.image}
                        alt={service.titleEs}
                        width={220}
                        height={140}
                        className="h-24 w-40 object-cover"
                      />
                    </div>
                  )}
                  <div>
                    {service.titleEs} ·{" "}
                    <span className="text-sm text-white/50">
                      {service.titleEn}
                    </span>
                  </div>
                </div>
              </summary>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-base font-semibold text-white/70">
                    Beneficios
                  </p>
                  <ul className="mt-2 space-y-2 text-base text-white/60">
                    {service.bulletsEs.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-base font-semibold text-white/70">
                    Benefits
                  </p>
                  <ul className="mt-2 space-y-2 text-base text-white/50">
                    {service.bulletsEn.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/#contacto"
                  className="rounded-full bg-white px-6 py-3 text-center text-base font-semibold text-black transition hover:bg-white/90"
                >
                  Agenda una llamada
                </a>
                <Link
                  href="/checkout"
                  className="rounded-full border border-white/20 px-6 py-3 text-center text-base font-semibold text-white transition hover:border-white/50"
                >
                  Pagar paquete
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
