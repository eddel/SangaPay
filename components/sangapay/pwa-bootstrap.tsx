"use client";

import { useEffect } from "react";
import { NetworkStatusBanner } from "@/components/sangapay/network-status-banner";
import { ThemeBootstrap } from "@/components/sangapay/theme-bootstrap";
import { registerServiceWorker } from "@/lib/pwa/register-sw";

export function PwaBootstrap() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <>
      <ThemeBootstrap />
      <NetworkStatusBanner />
    </>
  );
}
