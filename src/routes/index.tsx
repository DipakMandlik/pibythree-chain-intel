import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/app/brand";
import { personas } from "@/data/demo";
import { sessionStore } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Pibythree Supply & Demand Intelligence" },
      {
        name: "description",
        content:
          "Secure sign-in to the Pibythree Supply & Demand Intelligence demonstration environment for retail supply-chain decision intelligence.",
      },
      { property: "og:title", content: "Sign in — Pibythree Supply & Demand Intelligence" },
      {
        property: "og:description",
        content: "Intelligent planning for the modern retail supply chain.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [personaId, setPersonaId] = useState(personas[0].id);
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const persona = personas.find((p) => p.id === personaId)!;

  const enter = () => {
    setPending(true);
    setError(null);
    setTimeout(() => {
      sessionStore.signIn(personaId);
      navigate({ to: "/overview" });
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <section className="hidden flex-col justify-between bg-navy px-12 py-12 lg:flex">
        <div className="rounded-md bg-card px-4 py-3 w-fit">
          <Logo className="h-9" />
        </div>
        <div className="max-w-lg text-primary-foreground">
          <p className="label-eyebrow text-primary-foreground/70">Pibythree Enterprise AI Platform</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-primary-foreground">
            Supply &amp; Demand Intelligence
          </h1>
          <p className="mt-3 text-base text-primary-foreground/80">
            Predict demand. Optimize inventory. Strengthen procurement.
          </p>
          <div className="mt-8 space-y-3 text-sm text-primary-foreground/75">
            {[
              "Granular demand forecasting across regions, stores and SKUs",
              "Autonomous stock-risk detection with transfer and replenishment guidance",
              "AI-augmented supplier, pricing and RFQ decisions",
            ].map((t) => (
              <p key={t} className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent-blue" />
                {t}
              </p>
            ))}
          </div>
        </div>
        <p className="text-xs text-primary-foreground/60">
          Retail Intelligence — Demo Environment. Illustrative data only; not connected to production retail systems.
        </p>
      </section>

      <section className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo className="h-9" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight lg:mt-0">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Intelligent planning for the modern retail supply chain.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!password) {
                setError("Enter your password, or use the demonstration environment below.");
                return;
              }
              enter();
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Corporate email</Label>
              <Input id="email" type="email" readOnly value={persona.email} className="bg-surface" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                  onClick={() => setError("Password recovery is disabled in the demonstration environment.")}
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-critical">{error}</p>}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />} Sign in
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setError("Enterprise SSO is not enabled in the demonstration environment.")}
            >
              <Building2 className="size-4" /> Continue with Enterprise SSO
            </Button>
          </form>

          <div className="mt-8 rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center gap-2">
              <KeyRound className="size-4 text-primary" />
              <p className="text-sm font-semibold text-navy">DMART Demonstration Environment</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a persona to explore role-based access. Demonstration data only.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {personas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPersonaId(p.id)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-left transition-colors",
                    personaId === p.id
                      ? "border-primary bg-card ring-1 ring-primary/25"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <p className="text-sm font-medium text-navy">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.roleLabel}</p>
                </button>
              ))}
            </div>
            <Button className="mt-3 w-full" variant="secondary" disabled={pending} onClick={enter}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : null}
              Enter demo environment as {persona.name}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Pibythree Supply &amp; Demand Intelligence · Demonstration build for a DMART client showcase
          </p>
        </div>
      </section>
    </div>
  );
}
