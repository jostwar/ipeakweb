import CheckoutButtons from "@/components/CheckoutButtons";

type CheckoutPageProps = {
  searchParams?: { plan?: string; canceled?: string };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const priceStarter = process.env.STRIPE_PRICE_STARTER;
  const priceGrowth = process.env.STRIPE_PRICE_GROWTH;
  const priceScale = process.env.STRIPE_PRICE_SCALE;
  const isDemo = !publishableKey || !priceStarter || !priceGrowth || !priceScale;
  const planParam = searchParams?.plan;
  const initialPlan =
    planParam === "starter" || planParam === "growth" || planParam === "scale"
      ? planParam
      : undefined;

  return (
    <div className="bg-black px-6 py-20 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Checkout
          </p>
          <h1 className="text-4xl font-semibold">Paga tu plan en minutos.</h1>
          <p className="text-base text-white/60">
            Pagos seguros con Stripe. Facturación disponible.
          </p>
        </div>

        {searchParams?.canceled === "1" && (
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-base text-amber-200">
            El pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.
          </div>
        )}

        {isDemo && (
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-base text-white/70">
            Modo demo activo: configura Stripe en tus variables de entorno para
            habilitar pagos reales.
          </div>
        )}

        <CheckoutButtons initialPlan={initialPlan} isDemo={isDemo} />
      </div>
    </div>
  );
}
