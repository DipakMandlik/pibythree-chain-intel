import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-surface px-6 py-12 text-center">
      <CheckCircle2 className="size-5 text-positive" />
      <p className="text-sm font-semibold text-navy">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-critical/25 bg-critical-soft px-6 py-10 text-center">
      <ShieldAlert className="size-5 text-critical" />
      <p className="text-sm font-semibold text-navy">{message}</p>
      <p className="text-sm text-muted-foreground">The current demonstration dataset is temporarily unavailable.</p>
      <Button size="sm" variant="outline" className="mt-2" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

/** Contextual AI processing sequence — cycles through domain-specific steps. */
export function AiProcessing({ steps }: { steps: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % steps.length), 900);
    return () => clearInterval(t);
  }, [steps.length]);
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin text-primary" />
      <span className="transition-opacity">{steps[i]}</span>
    </div>
  );
}

export function useAiRun(duration = 1800) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const run = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, duration);
  };
  return { running, done, run, reset: () => setDone(false) };
}
