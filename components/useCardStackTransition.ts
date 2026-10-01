"use client";

import { useCallback, useState } from "react";
import type { ServiceStory } from "@/lib/services";

export function useCardStackTransition(services: ServiceStory[]) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");

  const activate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return { activeId, activate };
}
