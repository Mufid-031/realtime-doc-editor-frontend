"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import {
  ChevronLeft,
  Cloud,
  Share2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  CheckSquare,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Code,
  Type,
  Trash2,
  Settings,
  Plus,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  deleteDocument,
  getDocument,
  updateDocument,
} from "@/features/documents/api/documents.api";
import { Button } from "@/components/ui/button";
import { debounce } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  content?: string;
  updatedAt: string;
}

const EditorPage: React.FC = () => {
  const { id: documentId } = useParams();
  const router = useRouter();
  const [doc, setDoc] = useState<Document | null>(null);
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
    if (!documentId) return;

    (async () => {
      try {
        const doc = await getDocument(documentId as string);
        setDoc(doc);
      } catch (error) {
        console.log("Failed to load document", error);
      }
    })();
  }, [documentId]);

  useEffect(() => {
    if (editor && doc?.content) {
      editor.commands.setContent(doc.content);
    }
  }, [editor, doc]);

  const saveContent = useCallback(
    async (html: string) => {
      if (!doc) return;
      setIsSaving(true);

      try {
        await updateDocument(doc.id, { content: html });
      } finally {
        setIsSaving(false);
      }
    },
    [doc]
  );

  const debouncedSave = useCallback(debounce(saveContent, 1000), [saveContent]);

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!doc) return;
    const newTitle = e.target.value;

    setDoc((prev) => prev && { ...prev, title: newTitle });

    await updateDocument(doc.id, { title: newTitle });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    await deleteDocument(doc?.id as string);
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

  if (!editor || !doc) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">
            Initializing Nexus workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Header */}
      <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 bg-white/80 backdrop-blur-lg z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/documents")}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            title="Back to Dashboard"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex flex-col">
              <input
                value={doc.title}
                onChange={handleTitleChange}
                className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-0 p-0 hover:bg-slate-100 rounded px-2 py-0.5 transition-colors w-40 md:w-64 truncate"
              />
              <div className="flex items-center gap-2 pl-2">
                {isSaving ? (
                  <span className="text-[9px] uppercase font-black text-indigo-500 animate-pulse tracking-tighter">
                    Saving Changes...
                  </span>
                ) : (
                  <div className="flex items-center gap-1 text-emerald-500">
                    <Cloud size={10} />
                    <span className="text-[9px] uppercase font-black tracking-tighter">
                      All changes saved
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-4 hidden sm:flex">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400"
              >
                {i === 1 ? "JD" : "AS"}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
              +1
            </div>
          </div>
          <Button
            variant="outline"
            className="w-auto h-9 px-4 text-xs rounded-xl border-slate-200"
          >
            <Share2 size={14} className="mr-2" />
            Share
          </Button>
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Extended Toolbar */}
      <div className="h-12 border-b border-slate-100 bg-white flex items-center gap-0.5 px-4 sticky top-14 z-30 overflow-x-auto scrollbar-hide">
        <ToolbarGroup>
          <ToolbarButton
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            icon={<Heading1 size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            icon={<Heading2 size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("paragraph")}
            onClick={() => editor.chain().focus().setParagraph().run()}
            icon={<Type size={18} />}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        <ToolbarGroup>
          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={<Bold size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={<Italic size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<UnderlineIcon size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon={<Strikethrough size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
            icon={<Code size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("link")}
            onClick={setLink}
            icon={<LinkIcon size={18} />}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        <ToolbarGroup>
          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={<List size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<ListOrdered size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("taskList")}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            icon={<CheckSquare size={18} />}
          />
          <ToolbarButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon={<Quote size={18} />}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={<Undo size={18} />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={<Redo size={18} />}
          />
        </ToolbarGroup>
      </div>

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
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 text-white rounded-full p-2 px-4 shadow-2xl shadow-indigo-500/20 z-50 animate-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center gap-3 px-2 border-r border-white/10 mr-2">
          <Plus size={16} className="text-indigo-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            Quick Actions
          </span>
        </div>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
        >
          <CheckSquare size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
        >
          <Code size={16} />
        </button>
        <button
          onClick={setLink}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
        >
          <LinkIcon size={16} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400 hover:text-red-300"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// Sub-components for cleaner structure
const ToolbarGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex items-center gap-0.5 p-1 bg-slate-50 rounded-lg mr-1">
    {children}
  </div>
);

const ToolbarDivider = () => (
  <div className="w-px h-6 bg-slate-200 mx-2 shrink-0" />
);

const ToolbarButton: React.FC<{
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}> = ({ icon, active, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className={`
      p-1.5 rounded-md transition-all duration-200 shrink-0
      ${
        active
          ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
          : "text-slate-500 hover:bg-white hover:text-slate-800"
      }
    `}
  >
    {icon}
  </button>
);

export default EditorPage;
