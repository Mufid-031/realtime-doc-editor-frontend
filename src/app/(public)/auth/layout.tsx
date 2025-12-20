import React from "react";
import { Layout, Users, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex bg-slate-50 overflow-hidden">
      {/* Visual Section - Collaborative Workspace Theme */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-700 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 -right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 p-16 text-white max-w-xl">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3.5 bg-white/15 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
              <Layout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Nexus</h1>
          </div>

          <h2 className="text-6xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            Your ideas, <br />
            <span className="text-blue-300">organized</span> & together.
          </h2>

          <p className="text-md text-indigo-100/90 mb-12 leading-relaxed font-light">
            The unified workspace for your documents, tasks, and team
            collaboration. Move faster with Nexus.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-transform hover:scale-[1.02]">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Zap className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Real-time Sync</h4>
                <p className="text-sm text-indigo-100/70">
                  Changes reflect instantly across all devices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-transform hover:scale-[1.02]">
              <div className="p-2 bg-purple-400/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  Multiplayer Editing
                </h4>
                <p className="text-sm text-indigo-100/70">
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
            <div className="p-2 bg-indigo-600 rounded-lg">
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
