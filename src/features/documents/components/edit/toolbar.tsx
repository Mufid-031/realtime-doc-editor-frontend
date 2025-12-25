import { FC } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Type,
  UnderlineIcon,
  Undo,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
  setLink: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({ editor, setLink }) => {
  return (
    <div className="h-12 border-b border-slate-100 bg-white flex items-center gap-0.5 px-4 sticky top-14 z-30 overflow-x-auto scrollbar-hide">
      <ToolbarGroup>
        <ToolbarButton
          active={editor?.isActive("heading", { level: 1 })}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          icon={<Heading1 size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("heading", { level: 2 })}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          icon={<Heading2 size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("paragraph")}
          onClick={() => editor?.chain().focus().setParagraph().run()}
          icon={<Type size={18} />}
        />
      </ToolbarGroup>

      <ToolbarDivider />

      <ToolbarGroup>
        <ToolbarButton
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          icon={<Bold size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          icon={<Italic size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("underline")}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          icon={<UnderlineIcon size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("strike")}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          icon={<Strikethrough size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("code")}
          onClick={() => editor?.chain().focus().toggleCode().run()}
          icon={<Code size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("link")}
          onClick={setLink}
          icon={<LinkIcon size={18} />}
        />
      </ToolbarGroup>

      <ToolbarDivider />

      <ToolbarGroup>
        <ToolbarButton
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          icon={<List size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          icon={<ListOrdered size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("taskList")}
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
          icon={<CheckSquare size={18} />}
        />
        <ToolbarButton
          active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          icon={<Quote size={18} />}
        />
      </ToolbarGroup>

      <ToolbarDivider />

      <ToolbarGroup>
        <ToolbarButton
          onClick={() => editor?.chain().focus().undo().run()}
          icon={<Undo size={18} />}
        />
        <ToolbarButton
          onClick={() => editor?.chain().focus().redo().run()}
          icon={<Redo size={18} />}
        />
      </ToolbarGroup>
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
