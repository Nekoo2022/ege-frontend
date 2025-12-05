import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthStore } from "./auth.types";

export const authStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthentificated: false,
      authLoaded: false,

      setIsAuthentificated: (value: boolean) => set({ isAuthentificated: value }),
      setAuthLoaded: (value: boolean) => set({ authLoaded: value }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
