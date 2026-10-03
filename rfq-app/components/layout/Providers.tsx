"use client";

import { SessionProvider } from "next-auth/react";
import { ComposeProvider } from "@/components/shared/ComposeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ComposeProvider>{children}</ComposeProvider>
    </SessionProvider>
  );
}
