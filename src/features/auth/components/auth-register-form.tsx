"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerApi } from "../api/auth.api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthRegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerApi(name, email, password);
      router.push("/auth/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.message || "Could not complete registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium animate-in zoom-in-95">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          icon={<User size={18} />}
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          placeholder="john@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<Mail size={18} />}
        />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          placeholder="Min. 8 characters"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          icon={<Lock size={18} />}
        />
        <div className="flex gap-2 items-center">
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              password.length > 5 ? "bg-orange-400" : "bg-slate-100"
            }`}
          ></div>
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              password.length > 8 ? "bg-green-400" : "bg-slate-100"
            }`}
          ></div>
          <div
            className={`h-1 flex-1 rounded-full transition-colors ${
              password.length > 12 ? "bg-indigo-400" : "bg-slate-100"
            }`}
          ></div>
        </div>
      </div>

      <div className="flex items-start gap-2 py-2">
        <input type="checkbox" id="terms" className="mt-1 rounded" required />
        <label
          htmlFor="terms"
          className="text-xs text-slate-500 leading-relaxed"
        >
          I agree to the{" "}
          <button type="button" className="text-accent-foreground underline">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-accent-foreground underline">
            Privacy Policy
          </button>
          .
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        Create Account
        {!loading && <UserPlus size={18} className="ml-1" />}
      </Button>
    </form>
  );
}
