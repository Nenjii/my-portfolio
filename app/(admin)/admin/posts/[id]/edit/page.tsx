"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPostById, updatePost } from "@/lib/cms/posts";
import { uploadCover } from "@/lib/cms/storage";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Add format labels to HTML for preview
function addFormatLabels(html: string): string {
  if (!html || html === "<p></p>") {
    return "<p class='text-zinc-500 italic'>Start writing to see preview...</p>";
  }
  
  let labeled = html;
  
  // Block elements - label at start
  labeled = labeled.replace(/<h2([^>]*)>/g, '<h2$1><span class="format-label">H2</span>');
  labeled = labeled.replace(/<h3([^>]*)>/g, '<h3$1><span class="format-label">H3</span>');
  labeled = labeled.replace(/<h4([^>]*)>/g, '<h4$1><span class="format-label">H4</span>');
  labeled = labeled.replace(/<blockquote([^>]*)>/g, '<blockquote$1><span class="format-label">QUOTE</span>');
  labeled = labeled.replace(/<ul([^>]*)>/g, '<ul$1><span class="format-label format-label-block">BULLET LIST</span>');
  labeled = labeled.replace(/<ol([^>]*)>/g, '<ol$1><span class="format-label format-label-block">NUMBER LIST</span>');
  labeled = labeled.replace(/<pre([^>]*)>/g, '<pre$1><span class="format-label">CODE BLOCK</span>');
  labeled = labeled.replace(/<hr([^>]*)>/g, '<div class="hr-wrapper"><span class="format-label">HR</span><hr$1></div>');
  
  // Inline elements - superscript label
  labeled = labeled.replace(/<strong>/g, '<strong><sup class="format-label-inline">B</sup>');
  labeled = labeled.replace(/<em>/g, '<em><sup class="format-label-inline">I</sup>');
  labeled = labeled.replace(/<code>(?!<span)/g, '<code><sup class="format-label-inline">CODE</sup>');
  
  return labeled;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slugOverride, setSlugOverride] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slug = useMemo(() => (slugOverride ? toSlug(slugOverride) : toSlug(title)), [slugOverride, title]);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  useEffect(() => {
    if (editor && content && !loading) {
      editor.commands.setContent(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, loading]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const post = await getPostById(postId);
      setTitle(post.title);
      setSlugOverride(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setIsPublished(post.isPublished);
      setExistingCoverImage(post.coverImage);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      if (!title.trim()) throw new Error("Title is required");
      if (!slug) throw new Error("Slug is required");
      if (!content.trim()) throw new Error("Content is required");

      let coverImage = existingCoverImage;
      if (coverFile) {
        coverImage = await uploadCover(coverFile);
      }

      await updatePost(postId, {
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        content,
        coverImage,
        isPublished,
      });

      router.replace("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <p className="text-sm text-zinc-600">Loading post...</p>
      </section>
    );
  }

  if (error && !title) {
    return (
      <section className="space-y-6">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Posts</p>
        <h1 className="text-2xl font-semibold text-white">Edit post</h1>
        <p className="text-sm text-zinc-400">Update and save your changes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Meta Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-300">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-500"
              placeholder="My next article"
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-300">Slug</span>
            <input
              value={slugOverride}
              onChange={(e) => setSlugOverride(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-500"
              placeholder="auto-generated from title"
            />
            <p className="text-xs text-zinc-400">Preview: /posts/{slug || "your-slug"}</p>
          </label>
        </div>

        <label className="space-y-2 block">
          <span className="text-sm font-medium text-zinc-300">Excerpt</span>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-lime-500"
            placeholder="Short summary for cards and SEO"
            rows={2}
          />
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-2 block">
            <span className="text-sm font-medium text-zinc-300">Cover Image</span>
            {existingCoverImage && !coverFile && (
              <div className="mb-2">
                <img src={existingCoverImage} alt="Current cover" className="h-20 w-auto rounded object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              className="text-sm text-zinc-300"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-700 text-lime-500 focus:ring-lime-500"
            />
            Publish immediately
          </label>
        </div>

        {/* Side-by-Side Editor and Preview */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left: Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">✏️ Editor</span>
              <span className="text-xs text-zinc-500">Rich text via TipTap</span>
            </div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-3 h-[500px] flex flex-col">
              {editor && <Toolbar editor={editor} />}
              <div className="flex-1 overflow-y-auto">
                <EditorContent editor={editor} className="prose prose-invert prose-sm max-w-none text-zinc-100" />
              </div>
            </div>
          </div>

          {/* Right: Live Blog Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">👁️ Blog Preview</span>
              <span className="text-xs text-zinc-500">Labels show formatting used</span>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-6 h-[500px] overflow-y-auto">
              {/* Title Preview */}
              {title && (
                <div className="relative mb-3">
                  <span className="format-label">TITLE</span>
                  <h1 className="font-sans text-2xl font-bold text-zinc-100 leading-tight tracking-tight">
                    {title}
                  </h1>
                </div>
              )}
              {/* Excerpt Preview */}
              {excerpt && (
                <div className="relative mb-6">
                  <span className="format-label">EXCERPT</span>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {excerpt}
                  </p>
                </div>
              )}
              {/* Content Preview */}
              <div
                className="prose-preview"
                dangerouslySetInnerHTML={{ 
                  __html: addFormatLabels(content) 
                }}
              />
            </div>
          </div>
        </div>

        {/* Format Reference */}
        <div className="flex flex-wrap gap-4 text-xs text-zinc-500 bg-zinc-50 rounded-lg px-4 py-3">
          <span className="font-medium text-zinc-600">Preview shows:</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-lime-500"></span>
            Drop Cap
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-0.5 bg-lime-500"></span>
            H2 accent
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
            Bullets
          </span>
          <span className="flex items-center gap-1">
            <span className="text-lime-500 font-mono">1.</span>
            Numbers
          </span>
          <span className="flex items-center gap-1">
            <span className="w-0.5 h-3 bg-lime-500"></span>
            Quote
          </span>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

import type { Editor } from "@tiptap/react";

function Toolbar({ editor }: { editor: Editor }) {
  const btnClass = (isActive: boolean) =>
    `rounded border px-2 py-1 transition ${
      isActive
        ? "border-lime-500 bg-lime-50 text-lime-700 font-semibold"
        : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
    }`;

  return (
    <div className="mb-3 flex flex-wrap gap-1.5 border-b border-zinc-200 pb-3 text-sm">
      {/* Text Formatting */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={btnClass(editor.isActive("code"))}
          title="Inline Code"
        >
          {"</>"}
        </button>
      </div>

      <div className="w-px bg-zinc-200" />

      {/* Block Types */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={btnClass(editor.isActive("paragraph"))}
          title="Paragraph"
        >
          P
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive("heading", { level: 3 }))}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={btnClass(editor.isActive("heading", { level: 4 }))}
          title="Heading 4"
        >
          H4
        </button>
      </div>

      <div className="w-px bg-zinc-200" />

      {/* Lists */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title="Numbered List"
        >
          1. List
        </button>
      </div>

      <div className="w-px bg-zinc-200" />

      {/* Blocks */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title="Blockquote"
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btnClass(editor.isActive("codeBlock"))}
          title="Code Block"
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-900 hover:bg-zinc-50"
          title="Horizontal Rule"
        >
          —
        </button>
      </div>

      <div className="w-px bg-zinc-200" />

      {/* Actions */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-900 hover:bg-zinc-50 disabled:opacity-40"
          title="Undo"
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-900 hover:bg-zinc-50 disabled:opacity-40"
          title="Redo"
        >
          ↪
        </button>
      </div>
    </div>
  );
}
