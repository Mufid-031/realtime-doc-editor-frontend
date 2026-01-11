"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, FileText, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DocumentCard {
  id: string;
  title: string;
  updatedAt: string;
}

export const DocumentCard: FC<DocumentCard> = ({ id, title, updatedAt }) => {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => router.push(`/documents/${id}/edit`)}
    >
      <CardHeader className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-primary rounded-xl group-hover:bg-primary-foreground transition-colors">
          <FileText className="w-6 h-6 text-primary-foreground group-hover:text-foreground" />
        </div>
        <button className="p-1 hover:bg-primary-foreground rounded-lg text-primary">
          <MoreVertical className="w-4 h-4" />
        </button>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-primary mb-2 truncate group-hover:text-accent-foreground transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-foreground font-medium">
          <Clock className="w-3 h-3" />
          Edited {updatedAt}
        </div>
      </CardContent>
    </Card>
  );
};
