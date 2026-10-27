import type { PropsWithChildren } from "react";

/** Central place for app-wide providers (router, query cache, auth, etc.). */
export function AppProviders({ children }: PropsWithChildren) {
  return <>{children}</>;
}
