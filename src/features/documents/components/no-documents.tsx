import { Button } from "@/components/ui/button";
import { FolderOpen, PlusCircle } from "lucide-react";
import { FC } from "react";

interface NoDocumentsProps {
  setIsModalOpen: (isOpen: boolean) => void;
  searchQuery: string;
}

export const NoDocuments: FC<NoDocumentsProps> = ({
  setIsModalOpen,
  searchQuery,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <FolderOpen className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        No documents found
      </h3>
      <p className="text-slate-500 max-w-xs mb-8">
        {searchQuery
          ? `No results for "${searchQuery}"`
          : "You haven't created any documents yet. Start your first project now."}
      </p>
      {!searchQuery && (
        <Button onClick={() => setIsModalOpen(true)} className="w-auto px-8">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create your first doc
        </Button>
      )}
    </div>
  );
};
