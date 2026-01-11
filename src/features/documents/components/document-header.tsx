import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function DocumentHeader() {
  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl font-bold text-primary font-sans">
          My Workspace
        </h1>
        <p className="text-slate-500 mt-1">
          Manage and organize your collaborative documents.
        </p>
      </div>
      <DialogTrigger asChild>
        <Button className="w-auto px-6 py-2.5 rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          New Document
        </Button>
      </DialogTrigger>
    </header>
  );
}
