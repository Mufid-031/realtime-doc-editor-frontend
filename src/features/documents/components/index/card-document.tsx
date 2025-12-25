"use client";

import { Clock, FileText, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface CardDocumentProps {
  id: string;
  title: string;
  updatedAt: string;
}

export const CardDocument: FC<CardDocumentProps> = ({
  id,
  title,
  updatedAt,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/documents/${id}/edit`)}
      className="group border border-slate-200 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer bg-white"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-indigo-50 transition-colors">
          <FileText className="w-6 h-6 text-slate-500 group-hover:text-indigo-600" />
        </div>
        <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <h3 className="font-semibold text-slate-800 mb-2 truncate group-hover:text-indigo-700 transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Clock className="w-3 h-3" />
        Edited {updatedAt}
      </div>
    </div>
  );
};
