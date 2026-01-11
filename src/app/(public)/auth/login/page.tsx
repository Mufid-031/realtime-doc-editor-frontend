/* eslint-disable @next/next/no-img-element */

import React from "react";
import { ChevronRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthHeader from "@/features/auth/components/auth-header";
import AuthLoginForm from "@/features/auth/components/auth-login-form";

const LoginPage: React.FC = () => {
  return (
    <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader
        title="Welcome back"
        subtitle="Enter your credentials to access your account"
      />

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
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 px-2 text-primary font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <AuthLoginForm />

      <p className="text-center text-sm text-primary">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/auth/register"
          className="font-bold text-primary hover:text-accent-foreground transition-colors inline-flex items-center group"
        >
          Register now
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
