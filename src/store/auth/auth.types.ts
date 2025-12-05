export interface AuthStore {
  isAuthentificated: boolean;
  authLoaded: boolean;
  setIsAuthentificated: (value: boolean) => void;
  setAuthLoaded: (value: boolean) => void;
}
