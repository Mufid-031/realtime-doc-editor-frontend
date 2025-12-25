"use client";

import { getProfile } from "@/features/auth/api/auth.api";
import { User } from "@/types";
import { Layout, Search } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        setUser(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <nav className="h-16 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 bg-white/80 backdrop-blur-md z-30">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-indigo-600 rounded-lg">
          <Layout className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">Nexus</span>
      </div>

      <div className="flex-1 max-w-2xl px-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            placeholder="Search your workspace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs cursor-pointer hover:bg-indigo-200 transition-colors">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
};
