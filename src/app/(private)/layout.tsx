"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/auth/auth.store";
import { getTokenFromCookie } from "@/lib/helpers/auth.helper";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getTokenFromCookie();

    if (!token) {
      router.replace("/auth/login");
    }

    setToken(token!);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
