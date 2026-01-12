"use client";

import { Button } from "@/components/ui/button";
import { Document } from "@/types";
import { ChevronLeft, Cloud, Settings, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface HeaderProps {
  doc: Document;
  isSaving: boolean;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: FC<HeaderProps> = ({
  doc,
  isSaving,
  handleTitleChange,
}) => {
  const router = useRouter();

  const slicedUsersDoc = doc.users.slice(0, 1).map((user) => user.user.name);

  return (
    <header className="h-14 border-b flex items-center justify-between px-4 sticky top-0 backdrop-blur-lg z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/documents")}
          className="p-1.5 hover:bg-accent rounded-lg text-primary transition-colors"
          title="Back to Dashboard"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-primary-foreground" />
          <div className="flex flex-col">
            <input
              value={doc.title}
              onChange={handleTitleChange}
              className="text-sm font-bold text-primary bg-transparent border-none outline-none focus:ring-0 p-0 hover:bg-primary-foreground rounded px-2 py-0.5 transition-colors w-40 md:w-64 truncate"
            />
            <div className="flex items-center gap-2 pl-2">
              {isSaving ? (
                <span className="text-[9px] uppercase font-black text-accent-foreground animate-pulse tracking-tighter">
                  Saving Changes...
                </span>
              ) : (
                <div className="flex items-center gap-1 text-emerald-500">
                  <Cloud size={10} />
                  <span className="text-[9px] uppercase font-black tracking-tighter">
                    All changes saved
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex -space-x-2 mr-4 hidden sm:flex">
          {slicedUsersDoc.map((name) => (
            <div
              key={name}
              className="w-10 h-10 rounded-full border-2 bg-foreground flex items-center justify-center text-[10px] font-bold text-primary-foreground"
            >
              {name.slice(0, 2)}
            </div>
          ))}
          {doc.users.length > 2 && (
            <div className="w-10 h-10 rounded-full border-2 bg-foreground flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              +{doc.users.length - 2}
            </div>
          )}
        </div>
        <Button
          variant="outline"
          className="w-auto h-9 px-4 text-xs rounded-xl border-slate-200"
        >
          <Share2 size={14} className="mr-2" />
          Share
        </Button>
        <div className="w-px h-6 bg-primary-foreground mx-1" />
        <button className="p-2 hover:bg-accent rounded-xl text-primary">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
