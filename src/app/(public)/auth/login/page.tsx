"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Mail, Lock, LogIn, ChevronRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/auth/auth.store";
import { useSocketStore } from "@/socket/socket.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginApi } from "@/features/auth/api/auth.api";

const LoginPage: React.FC = () => {
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
    } catch (err: any) {
      setError(err.message || "The credentials you entered are incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-slate-500 mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 py-2.5">
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
        <Button variant="outline" className="flex-1 py-2.5">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google"
            className="w-4 h-4 mr-2"
          />
          Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 px-2 text-slate-400 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium animate-in zoom-in-95">
            {error}
          </div>
        )}

        <Input
          placeholder="name@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          required
        />

        <div className="space-y-1">
          <Input
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
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
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

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/auth/register"
          className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors inline-flex items-center group"
        >
          Register now
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
