import React from "react";
import { Layout, Users, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      {/* Visual Section - Collaborative Workspace Theme */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-foreground items-center justify-center overflow-hidden">
        <div className="relative z-10 p-16 text-primary-foreground max-w-xl">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3.5 bg-primary rounded-2xl backdrop-blur-xl border border-primary/20 shadow-2xl">
              <Layout className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Nexus</h1>
          </div>

          <h2 className="text-6xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            Your ideas, <br />
            <span className="text-sebg-secondary">organized</span> & together.
          </h2>

          <p className="text-md text-primary-foreground/90 mb-12 leading-relaxed font-light">
            The unified workspace for your documents, tasks, and team
            collaboration. Move faster with Nexus.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-background backdrop-blur-md border transition-transform hover:scale-[1.02]">
              <div className="p-2 bg-foreground rounded-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">Real-time Sync</h4>
                <p className="text-sm text-foreground">
                  Changes reflect instantly across all devices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 rounded-2xl bg-background backdrop-blur-md border transition-transform hover:scale-[1.02]">
              <div className="p-2 bg-foreground rounded-lg">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  Multiplayer Editing
                </h4>
                <p className="text-sm text-foreground">
                  Collaborate with your team on a single page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo Visibility */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="p-2 bg-primary rounded-lg">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Nexus</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
