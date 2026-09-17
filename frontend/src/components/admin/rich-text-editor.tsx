"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Heading2, Code } from "lucide-react";

export function RichTextEditor({
    content,
    onChange,
}: {
    content: string;
    onChange: (html: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        immediatelyRender: false, // avoids a hydration mismatch in Next.js
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none min-h-[240px] px-4 py-3 focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) return null;

    const ToolbarButton = ({
        active,
        onClick,
        children,
    }: {
        active: boolean;
        onClick: () => void;
        children: React.ReactNode;
    }) => (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-md p-1.5 transition ${active ? "bg-primary text-white" : "text-slate hover:bg-ink/5 hover:text-ink"
                }`}
        >
            {children}
        </button>
    );

    return (
        <div className="rounded-lg border border-line">
            <div className="flex items-center gap-1 border-b border-line px-2 py-1.5">
                <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    <Code className="h-4 w-4" />
                </ToolbarButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}