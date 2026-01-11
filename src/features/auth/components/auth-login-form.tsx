"use client";

import { useAuthStore } from "@/store/auth.store";
import { useSocketStore } from "@/store/socket.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginApi } from "../api/auth.api";
import { Input } from "@/components/ui/input";
import { Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLoginForm() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const connectSocket = useSocketStore((s) => s.connect);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { access_token } = await loginApi(email, password);
      setToken(access_token);
      connectSocket(access_token);
      router.push("/documents");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "The credentials you entered are incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-destructive rounded-lg text-sm text-destructive font-medium animate-in zoom-in-95">
          {error}
        </div>
      )}

      <Input
        className="border-primary"
        placeholder="name@company.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail size={18} />}
        required
      />

      <div className="space-y-1">
        <Input
          className="border-primary"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={18} />}
          required
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs font-semibold text-primary hover:text-accent-foreground transition-colors"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        Sign In
        {!loading && <LogIn size={18} className="ml-1" />}
      </Button>
    </form>
  );
}
