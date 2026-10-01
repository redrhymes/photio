"use client";

import { useCallback, useState } from "react";

export function useFAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((currentId) => currentId === id ? null : id);
  }, []);

  return { openId, toggle };
}
