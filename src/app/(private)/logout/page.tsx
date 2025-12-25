"use client";

import { useAuthStore } from "@/auth/auth.store";
import { useEffect } from "react";

export default function LogoutPage() {
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
