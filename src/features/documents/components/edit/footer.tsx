import { CheckSquare, Code, LinkIcon, Plus, Trash2 } from "lucide-react";
import { FC } from "react";
import { Editor } from "@tiptap/react";

interface FooterProps {
  editor: Editor | null;
  setLink: () => void;
  handleDelete: () => void;
}

export const Footer: FC<FooterProps> = ({ editor, setLink, handleDelete }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 text-white rounded-full p-2 px-4 shadow-2xl shadow-indigo-500/20 z-50 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 px-2 border-r border-white/10 mr-2">
        <Plus size={16} className="text-indigo-400" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
          Quick Actions
        </span>
      </div>
      <button
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
      >
        <CheckSquare size={16} />
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
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
  );
};
