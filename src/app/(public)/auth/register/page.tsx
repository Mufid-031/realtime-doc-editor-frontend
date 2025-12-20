/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { registerApi } from "@/features/auth/api/auth.api";

const RegisterPage: React.FC = () => {
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
    } catch (err: any) {
      setError(
        err.message || "Could not complete registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
        <p className="text-slate-500 mt-2">Start your journey with us today.</p>
      </div>

      <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
            1
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Profile
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
            2
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Verify
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
            3
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Done
          </span>
        </div>
      </div>

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
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
            required
          />
          <label
            htmlFor="terms"
            className="text-xs text-slate-500 leading-relaxed"
          >
            I agree to the{" "}
            <button type="button" className="text-indigo-600 underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-indigo-600 underline">
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

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors inline-flex items-center group"
        >
          Login instead
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
