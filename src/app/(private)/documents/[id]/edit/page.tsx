"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import { useParams, useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";
import { Header } from "@/features/documents/components/edit/header";
import { Toolbar } from "@/features/documents/components/edit/toolbar";
import { Footer } from "@/features/documents/components/edit/footer";
import { useDocument } from "@/features/documents/hooks/use-document";
import { useUpdateDocument } from "@/features/documents/hooks/use-update-document";
import { useDeleteDocument } from "@/features/documents/hooks/use-delete-document";
import { Loading } from "@/components/loading";

const EditorPage: React.FC = () => {
  const { id: documentId } = useParams();

  const { data: doc, isLoading } = useDocument(documentId as string);
  const updateDoc = useUpdateDocument(documentId as string);
  const deleteDoc = useDeleteDocument();

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Initialize Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-indigo-600 underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Type '/' for commands or start writing...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      debouncedSave(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && doc?.content) {
      editor.commands.setContent(doc.content);
    }
  }, [editor, doc]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(async (html: string) => {
      setIsSaving(true);
      try {
        await updateDoc.mutateAsync({ content: html });
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    [updateDoc]
  );

  const handleTitleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDoc.mutate({ title: e.target.value });
    },
    [updateDoc]
  );

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    await deleteDoc.mutateAsync(doc!.id);
    router.push("/documents");
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor || isLoading || !doc) return <Loading />;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Header */}
      <Header
        doc={doc}
        isSaving={isSaving}
        handleTitleChange={handleTitleChange}
      />

      {/* Extended Toolbar */}
      <Toolbar editor={editor} setLink={setLink} />

      {/* Editor Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white/50 pb-32">
        <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-24 flex flex-col items-center">
          <div className="w-full">
            {/* Massive Title Input */}
            <input
              value={doc.title}
              onChange={handleTitleChange}
              placeholder="Untitled Document"
              className="w-full text-5xl md:text-6xl font-black text-slate-900 border-none outline-none mb-4 placeholder:text-slate-100 tracking-tight"
            />

            {/* Metadata / Author info */}
            <div className="flex items-center gap-4 mb-12 text-slate-400 text-xs font-medium border-b border-slate-50 pb-6">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">
                  JD
                </div>
                <span>Created by You</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <span>Last edited {doc.updatedAt}</span>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <span>
                {editor.storage.characterCount?.characters?.() || 0} characters
              </span>
            </div>

            {/* Actual TipTap Content */}
            <EditorContent editor={editor} className="cursor-text" />
          </div>
        </div>
      </main>

      {/* Quick Access Footer / FAB */}
      <Footer editor={editor} setLink={setLink} handleDelete={handleDelete} />
    </div>
  );
};

export default EditorPage;
