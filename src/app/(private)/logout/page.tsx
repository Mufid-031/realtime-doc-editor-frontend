"use client";

import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export default function LogoutPage() {
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    logout();
    window.location.href = "/auth/login";
  }, [logout]);

  return null;
}
