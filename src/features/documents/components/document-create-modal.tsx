"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { FC, useState } from "react";
import { useCreateDocument } from "../hooks/use-create-document";
import { useRouter } from "next/navigation";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DocumentCreateModal: FC = () => {
  const createDocument = useCreateDocument();
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const newDoc = await createDocument.mutateAsync(newTitle);
      setNewTitle("");

      router.push(`/documents/${newDoc.id}/edit`);
    } catch (error) {
      console.log("Failed to create document", error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle asChild>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-foreground rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-primary">New Document</h2>
          </div>
        </DialogTitle>
        <DialogDescription>Give your new workspace a name.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleCreateDocument} className="space-y-6">
        <div className="space-y-2">
          <Label>Document Title</Label>
          <Input
            autoFocus
            type="text"
            placeholder="e.g. Weekly Sync Notes"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-slate-200"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="flex-1">
            Create Document
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
