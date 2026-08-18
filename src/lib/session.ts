import { useSyncExternalStore } from "react";
import { personas, type Persona } from "@/data/demo";

const KEY = "pi3.session.persona";
let current: Persona | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const id = window.localStorage.getItem(KEY);
  const found = personas.find((p) => p.id === id);
  if (found) {
    current = found;
    emit();
  }
}

export const sessionStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    hydrate();
    return () => listeners.delete(l);
  },
  get: () => current,
  getServer: () => null,
  signIn(personaId: string) {
    current = personas.find((p) => p.id === personaId) ?? personas[0];
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, current.id);
    emit();
  },
  signOut() {
    current = null;
    if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
    emit();
  },
};

export function useSession() {
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.get, sessionStore.getServer);
}

export function useHydrated() {
  return useSyncExternalStore(
    (l) => {
      l();
      return () => {};
    },
    () => true,
    () => false,
  );
}
