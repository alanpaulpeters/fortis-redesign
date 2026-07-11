import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: {
    default: "Portal",
    template: "%s | Fortis Portal",
  },
  robots: { index: false },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
