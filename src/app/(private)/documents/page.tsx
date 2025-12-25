"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDocuments } from "@/features/documents/api/documents.api";
import { Navbar } from "@/features/documents/components/index/navbar";
import { DocumentUser } from "@/types";
import { NoDocuments } from "@/features/documents/components/index/no-documents";
import { CardDocument } from "@/features/documents/components/index/card-document";
import { CreateModal } from "@/features/documents/components/index/create-modal";

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentUser[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (error) {
        console.log("Failed to load documents", error);
      }
    })();
  }, []);

  const filteredDocs = documents.filter((doc) =>
    doc.document?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(documents);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Workspace</h1>
            <p className="text-slate-500 mt-1">
              Manage and organize your collaborative documents.
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-auto px-6 py-2.5 rounded-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>
        </header>

        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocs.map((doc) => (
              <CardDocument key={doc.id} {...doc.document} />
            ))}
          </div>
        ) : (
          <NoDocuments
            setIsModalOpen={setIsModalOpen}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {isModalOpen && (
        <CreateModal
          setDocuments={setDocuments}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
