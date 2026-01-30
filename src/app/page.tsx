export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import {
  getClients,
  getFaqItems,
  getPricingPlans,
  getServices,
  getTestimonials,
} from "@/lib/content";

export default async function Home() {
  const [services, clients, testimonials, pricingPlans, faqItems] =
    await Promise.all([
      getServices(),
      getClients(),
      getTestimonials(),
      getPricingPlans(),
      getFaqItems(),
    ]);

  return (
    <div className="bg-black text-white">
      <section id="inicio" className="relative overflow-hidden px-6 pb-24 pt-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Premium marketing studio
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Estrategia, contenido y automatización para crecer ventas con
              claridad.
            </h1>
            <p className="text-lg text-white/70">
              Marketing digital, branding y asistentes virtuales.
            </p>
            <p className="text-sm text-white/50">
              Strategy, content & automation to grow sales with clarity.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Agenda una llamada
              </a>
              <Link
                href="/servicios"
                className="rounded-full border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/60"
              >
                Ver servicios
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-white/60">
              <span>Sin contratos largos (según plan)</span>
              <span>Reportes mensuales</span>
              <span>Respuesta en 24h</span>
            </div>
          </div>
          <div className="glass-card rounded-[32px] p-8">
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                The all-in-one AI conversational CRM to boost efficiency.
              </p>
              <p className="text-2xl font-semibold">
                Inteligencia que conecta. Automatización que impulsa resultados.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Automatiza conversaciones y gestiona leads.</li>
                <li>• Responde en tiempo real en WhatsApp, web y redes.</li>
                <li>• Experiencia profesional y escalable.</li>
              </ul>
              <p className="text-xs text-white/50">
                Your AI turns conversations into deals with smart follow-ups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Servicios
            </p>
            <h2 className="text-3xl font-semibold">
              Soluciones integrales para acelerar crecimiento.
            </h2>
            <p className="text-sm text-white/60">
              Build, scale and automate with a premium experience.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="glass-card group flex flex-col gap-4 rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/30"
              >
                <div>
                  <p className="text-lg font-semibold">{service.titleEs}</p>
                  <p className="text-xs text-white/40">{service.titleEn}</p>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {service.bulletsEs.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
                <ul className="space-y-2 text-xs text-white/40">
                  {service.bulletsEn.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link
                  href="/checkout"
                  className="mt-auto inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/50"
                >
                  Cotizar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-[32px] border border-white/10 bg-white/5 p-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              AI Assistants
            </p>
            <h3 className="text-2xl font-semibold">
              iPeak ofrece la plataforma que transforma la atención al cliente,
              las ventas y el soporte técnico.
            </h3>
            <p className="text-sm text-white/70">
              Integramos inteligencia artificial con tus canales digitales para
              automatizar conversaciones, gestionar leads y responder en tiempo
              real con una experiencia consistente y profesional.
            </p>
            <p className="text-xs text-white/50">
              AI CRM that boosts efficiency and closes deals faster.
            </p>
          </div>
          <div className="space-y-4 text-sm text-white/70">
            <p>
              Con iPeak, tu negocio atiende 24/7, reduce costos operativos y
              aumenta la eficiencia del equipo.
            </p>
            <ul className="space-y-2">
              <li>• WhatsApp, web y redes en un solo ecosistema.</li>
              <li>• AI convierte conversaciones en oportunidades.</li>
              <li>• Voice notes transcritas en tiempo real.</li>
              <li>• Asignación automática a tu equipo cuando se necesita.</li>
              <li>• Insights en tiempo real para decisiones rápidas.</li>
            </ul>
            <p className="text-xs text-white/50">
              Follow-up sequences garantizan outreach oportuno.
            </p>
          </div>
        </div>
      </section>

      <section id="clientes" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Clientes
            </p>
            <h2 className="text-3xl font-semibold">
              Marcas que han confiado en iPeak.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-sm text-white/40"
              >
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={140}
                    height={60}
                    className="h-8 w-auto opacity-70 grayscale"
                  />
                ) : (
                  client.name
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Testimonios
            </p>
            <h2 className="text-3xl font-semibold">
              Resultados reales con equipos reales.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="glass-card space-y-4 rounded-3xl p-6"
              >
                <p className="text-sm text-white/70">{testimonial.quote}</p>
                <div className="text-xs text-white/50">
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p>
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Planes
            </p>
            <h2 className="text-3xl font-semibold">
              Planes flexibles para cada etapa.
            </h2>
            <p className="text-sm text-white/60">
              Pagos seguros con Stripe. Facturación disponible.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl border px-6 py-8 transition hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-white/40 bg-white/10"
                    : "border-white/10 bg-black/40"
                }`}
              >
                <div className="space-y-2">
                  <p className="text-lg font-semibold">{plan.name}</p>
                  <p className="text-sm text-white/70">{plan.subtitleEs}</p>
                  <p className="text-xs text-white/40">{plan.subtitleEn}</p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-white/70">
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                {plan.note && (
                  <p className="mt-4 text-xs text-white/40">{plan.note}</p>
                )}
                <Link
                  href={`/checkout?plan=${plan.id}`}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                    plan.highlight
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Pagar
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/40">
            Pagos seguros con Stripe. Facturación disponible.
          </p>
        </div>
      </section>

      <section id="faq" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold">
              Respuestas rápidas para tomar decisiones.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <details
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70"
              >
                <summary className="cursor-pointer text-sm font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-white/60">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-6 py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Contacto
            </p>
            <h2 className="text-3xl font-semibold">
              Construyamos tu próximo sistema de crecimiento.
            </h2>
            <p className="text-sm text-white/70">
              Cuéntanos sobre tus objetivos y te enviaremos una propuesta en 48h
              hábiles.
            </p>
            <p className="text-xs text-white/50">
              Tell us about your goals and we will send a clear plan.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p>hola@ipeakagency.com</p>
              <p>WhatsApp: +00 000 000 000</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
