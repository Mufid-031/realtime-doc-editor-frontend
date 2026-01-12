"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfile } from "@/hooks/use-profile";
import { useAuthStore } from "@/store/auth.store";
import { Layout, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DocumentNavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DocuemntNavbar: FC<DocumentNavbarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { data: user } = useProfile();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <nav className="h-16 border-b flex items-center justify-between px-10 sticky top-0 backdrop-blur-md z-30">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-primary rounded-lg">
          <Layout className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">Nexus</span>
      </div>

      <div className="flex-1 max-w-2xl px-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary group-focus-within:text-accent-foreground transition-colors" />
          <input
            type="text"
            placeholder="Search your workspace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary-foreground border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent-foreground transition-all outline-none"
          />
        </div>
      </div>

      <Tooltip>
        <TooltipTrigger asChild className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary border flex items-center justify-center text-primary-foreground font-bold text-md cursor-pointer hover:bg-foreground transition-colors">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="px-3 py-2 grid space-y-3">
            <span className="flex items-center gap-3">
              {" "}
              <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center">
                <User className="w-4 h-4 text-foreground" />
              </div>
              {user?.email}
            </span>
            <Separator />
            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                logout();
                router.replace("/auth/login");
              }}
            >
              Logout
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </nav>
  );
};
