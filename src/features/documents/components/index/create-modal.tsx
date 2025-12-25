import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { FC, useState } from "react";
import { useCreateDocument } from "../../hooks/use-create-document";
import { useRouter } from "next/navigation";

interface CreateModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateModal: FC<CreateModalProps> = ({ setIsModalOpen }) => {
  const createDocument = useCreateDocument();
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const newDoc = await createDocument.mutateAsync(newTitle);
      setIsModalOpen(false);
      setNewTitle("");

      router.push(`/documents/${newDoc.id}/edit`);
    } catch (error) {
      console.log("Failed to create document", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsModalOpen(false)}
      />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">New Document</h2>
          <p className="text-slate-500 mt-1">Give your new workspace a name.</p>
        </div>

        <form onSubmit={handleCreateDocument} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Document Title
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Weekly Sync Notes"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
              required
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 border-slate-200"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
