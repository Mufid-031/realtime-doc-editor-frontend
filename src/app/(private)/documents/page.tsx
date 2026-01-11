"use client";

import React, { useState } from "react";
import { ChartBarBig, GridIcon } from "lucide-react";
import { NoDocuments } from "@/features/documents/components/no-documents";
import { DocumentCard } from "@/features/documents/components/document-card";
import { DocumentCreateModal } from "@/features/documents/components/document-create-modal";
import { useDocuments } from "@/features/documents/hooks/use-documents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentList } from "@/features/documents/components/document-list";
import { Loading } from "@/components/loading";
import { DocuemntNavbar } from "@/features/documents/components/document-navbar";
import DocumentHeader from "@/features/documents/components/document-header";
import { Dialog } from "@/components/ui/dialog";

const DocumentsPage: React.FC = () => {
  const { data: documents = [], isLoading } = useDocuments();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documents.filter((doc) =>
    doc.document?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen text-slate-900 flex flex-col">
      <DocuemntNavbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <Dialog>
          <DocumentHeader />

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
                    <DocumentCard key={doc.id} {...doc.document} />
                  ))}
                </div>
              ) : (
                <NoDocuments
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
            <TabsContent value="stack">
              <div className="flex w-full flex-col gap-6">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <DocumentList key={doc.id} {...doc.document} />
                  ))
                ) : (
                  <NoDocuments
                    searchQuery={searchQuery}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DocumentCreateModal />
        </Dialog>
      </main>

    </div>
  );
};

export default DocumentsPage;
