import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import AuthHeader from "@/features/auth/components/auth-header";
import AuthRegisterForm from "@/features/auth/components/auth-register-form";

const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AuthHeader
        title="Create account"
        subtitle="Start your journey with us today."
      />

      <div className="grid grid-cols-3 gap-2 py-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-foreground text-primary-foreground flex items-center justify-center text-xs font-bold">
            1
          </div>
          <span className="text-[10px] uppercase font-bold text-foreground">
            Profile
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-xs font-bold">
            2
          </div>
          <span className="text-[10px] uppercase font-bold text-primary">
            Verify
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-xs font-bold">
            3
          </div>
          <span className="text-[10px] uppercase font-bold text-primary">
            Done
          </span>
        </div>
      </div>

      <AuthRegisterForm />

      <p className="text-center text-sm text-primary">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-primary hover:text-accent-foreground transition-colors inline-flex items-center group"
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
