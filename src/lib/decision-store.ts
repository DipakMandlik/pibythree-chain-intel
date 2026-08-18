import { useSyncExternalStore } from "react";
import type { ActionStatus } from "@/data/demo";

type State = Record<string, ActionStatus>;
let state: State = {};
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const decisionStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,
  set(id: string, status: ActionStatus) {
    state = { ...state, [id]: status };
    emit();
  },
  reset() {
    state = {};
    emit();
  },
};

export function useDecisions() {
  return useSyncExternalStore(decisionStore.subscribe, decisionStore.get, () => state);
}

export function useDecision(id: string): ActionStatus {
  return useDecisions()[id] ?? "pending";
}
