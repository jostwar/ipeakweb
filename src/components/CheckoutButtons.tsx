"use client";

import { useMemo, useState } from "react";
import { pricingPlans } from "@/data/pricing";

type PlanId = "starter" | "growth" | "scale";

type Props = {
  initialPlan?: PlanId;
  isDemo: boolean;
};

export default function CheckoutButtons({ initialPlan, isDemo }: Props) {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const plans = useMemo(() => pricingPlans, []);

  const handleCheckout = async (plan: PlanId) => {
    if (isDemo) return;
    setLoadingPlan(plan);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "No se pudo iniciar el pago.");
      }
      window.location.href = data.url;
    } catch (err) {
      setLoadingPlan(null);
      alert(
        err instanceof Error
          ? err.message
          : "No se pudo iniciar el pago.",
      );
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`rounded-3xl border px-6 py-8 transition ${
            plan.id === "growth"
              ? "border-white/30 bg-white/10"
              : "border-white/10 bg-black/40"
          }`}
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">{plan.name}</p>
            <p className="text-sm text-white/60">{plan.subtitleEs}</p>
            <p className="text-xs text-white/40">{plan.subtitleEn}</p>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-white/70">
            {plan.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout(plan.id)}
            className={`mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
              plan.id === "growth"
                ? "bg-white text-black hover:bg-white/90"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            disabled={isDemo || loadingPlan === plan.id}
          >
            {loadingPlan === plan.id
              ? "Redirigiendo..."
              : initialPlan === plan.id
                ? "Pagar ahora"
                : "Pagar"}
          </button>
        </div>
      ))}
    </div>
  );
}
