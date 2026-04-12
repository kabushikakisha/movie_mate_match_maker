export type AppRoute = {
  label: string;
  to: string;
  /** Shown on the Home page card. Omit to make this route nav-bar only. */
  description?: string;
};

export const appRoutes: AppRoute[] = [
  { label: "Enter Movie", to: "/movie", description: "Add a movie to the list" },
  { label: "Rate Movies", to: "/rate", description: "Rate movies you've seen" },
  { label: "Choose Movies", to: "/choose", description: "Pick what to watch together" },
  // About is intentionally nav-only — no home card needed.
  { label: "About", to: "/about" },
];
