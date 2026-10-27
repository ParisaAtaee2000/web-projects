import type { PropsWithChildren } from "react";
/** Shared page shell. Header/footer will be mounted here as they are extracted from the initial homepage. */
export function SiteLayout({ children }: PropsWithChildren) {
  return <div className="site-layout" dir="rtl">{children}</div>;
}
