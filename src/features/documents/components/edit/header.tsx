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

  return (
    <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 bg-white/80 backdrop-blur-lg z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/documents")}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          title="Back to Dashboard"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex flex-col">
            <input
              value={doc.title}
              onChange={handleTitleChange}
              className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-0 p-0 hover:bg-slate-100 rounded px-2 py-0.5 transition-colors w-40 md:w-64 truncate"
            />
            <div className="flex items-center gap-2 pl-2">
              {isSaving ? (
                <span className="text-[9px] uppercase font-black text-indigo-500 animate-pulse tracking-tighter">
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
          {[1, 2].map((i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400"
            >
              {i === 1 ? "JD" : "AS"}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
            +1
          </div>
        </div>
        <Button
          variant="outline"
          className="w-auto h-9 px-4 text-xs rounded-xl border-slate-200"
        >
          <Share2 size={14} className="mr-2" />
          Share
        </Button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
