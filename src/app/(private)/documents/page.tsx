"use client";

import React, { useState } from "react";
import { ChartBarBig, GridIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/features/documents/components/index/navbar";
import { NoDocuments } from "@/features/documents/components/index/no-documents";
import { CardDocument } from "@/features/documents/components/index/card-document";
import { CreateModal } from "@/features/documents/components/index/create-modal";
import { useDocuments } from "@/features/documents/hooks/use-documents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListDocument } from "@/features/documents/components/index/list-document";
import { Loading } from "@/components/loading";

const DocumentsPage: React.FC = () => {
  const { data: documents = [], isLoading } = useDocuments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documents.filter((doc) =>
    doc.document?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loading />;

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

        <Tabs defaultValue="grid">
          <div className="flex justify-end items-center w-full">
            <TabsList>
              <TabsTrigger value="grid">
                <GridIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="stack">
                <ChartBarBig className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid">
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
          </TabsContent>
          <TabsContent value="stack">
            <div className="flex w-full flex-col gap-6">
              {filteredDocs.map((doc) => (
                <ListDocument key={doc.id} {...doc.document} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {isModalOpen && <CreateModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default DocumentsPage;
