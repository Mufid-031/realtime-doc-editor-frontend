"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { FileText, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DocumentListProps {
  id: string;
  title: string;
  updatedAt: string;
}

export const DocumentList: FC<DocumentListProps> = ({
  id,
  title,
  updatedAt,
}) => {
  const router = useRouter();

  return (
    <Item onClick={() => router.push(`/documents/${id}/edit`)}>
      <ItemMedia>
        <FileText className="w-10 h-10" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{updatedAt}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <MoreHorizontal className="w-4 h-4" />
      </ItemActions>
    </Item>
  );
};
