'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getThoughtById,
  updateThought,
  getRepliesForThought,
  addReplyToThought,
  deleteReply,
  updateReply,
  THOUGHT_MOODS,
  type Thought,
  type ThoughtMood,
  type ThoughtReply,
} from '@/lib/cms/thoughts';

export default function EditThoughtPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [addingReply, setAddingReply] = useState(false);
  const [replies, setReplies] = useState<ThoughtReply[]>([]);
  const [deletingReplyId, setDeletingReplyId] = useState<string | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [nestedReplyInput, setNestedReplyInput] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyContent, setEditingReplyContent] = useState<string>('');
  
  const [formData, setFormData] = useState({
    content: '',
    mood: '' as ThoughtMood | '',
    tags: [] as string[],
    linkUrl: '',
    linkTitle: '',
    isPublished: true,
    isPinned: false,
  });

  useEffect(() => {
    loadThought();
    loadReplies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadThought() {
    try {
      setLoading(true);
      const thought = await getThoughtById(id);
      setFormData({
        content: thought.content,
        mood: thought.mood || '',
        tags: thought.tags || [],
        linkUrl: thought.linkUrl || '',
        linkTitle: thought.linkTitle || '',
        isPublished: thought.isPublished,
        isPinned: thought.isPinned,
      });
    } catch (error) {
      console.error('Error loading thought:', error);
      alert('Failed to load thought');
    } finally {
      setLoading(false);
    }
  }

  async function loadReplies() {
    try {
      const data = await getRepliesForThought(id);
      setReplies(data);
    } catch (error) {
      console.error('Error loading replies:', error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function addTag() {
    const tag = tagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }

  async function handleAddReply() {
    if (!replyInput.trim()) return;

    setAddingReply(true);
    try {
      const newReply = await addReplyToThought(id, replyInput.trim());
      setReplies([...replies, newReply]);
      setReplyInput('');
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Failed to add reply');
    } finally {
      setAddingReply(false);
    }
  }

  async function handleAddNestedReply(parentReplyId: string) {
    if (!nestedReplyInput.trim()) return;

    setAddingReply(true);
    try {
      const newReply = await addReplyToThought(id, nestedReplyInput.trim(), parentReplyId);
      setReplies([...replies, newReply]);
      setNestedReplyInput('');
      setReplyingToId(null);
    } catch (error) {
      console.error('Error adding nested reply:', error);
      alert('Failed to add reply');
    } finally {
      setAddingReply(false);
    }
  }

  async function handleDeleteReply(replyId: string) {
    if (!confirm('Delete this reply?')) return;

    setDeletingReplyId(replyId);
    try {
      await deleteReply(replyId, id);
      setReplies(replies.filter((r) => r.id !== replyId));
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('Failed to delete reply');
    } finally {
      setDeletingReplyId(null);
    }
  }

  async function handleUpdateReply(replyId: string, newContent: string) {
    if (!newContent.trim()) return;

    try {
      await updateReply(replyId, newContent.trim());
      setReplies(replies.map((r) =>
        r.id === replyId ? { ...r, content: newContent.trim() } : r
      ));
      setEditingReplyId(null);
      setEditingReplyContent('');
    } catch (error) {
      console.error('Error updating reply:', error);
      alert('Failed to update reply');
    }
  }

  // Build threaded reply structure
  function buildReplyTree() {
    const topLevel = replies.filter((r) => !r.parentReplyId);
    
    return topLevel.map((reply) => ({
      ...reply,
      children: replies.filter((r) => r.parentReplyId === reply.id),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert('Please write something');
      return;
    }

    setSaving(true);
    try {
      await updateThought(id, {
        content: formData.content.trim(),
        mood: formData.mood || undefined,
        tags: formData.tags,
        linkUrl: formData.linkUrl.trim() || undefined,
        linkTitle: formData.linkTitle.trim() || undefined,
        isPublished: formData.isPublished,
        isPinned: formData.isPinned,
      });
      router.push('/admin/thoughts');
    } catch (error) {
      console.error('Error updating thought:', error);
      alert('Failed to update thought');
    } finally {
      setSaving(false);
    }
  }

  function formatDate(dateString?: string) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-zinc-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading thought...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/thoughts"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Thought</h1>
          <p className="text-zinc-400 mt-1">Update your thought or add replies</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <label className="block">
            <span className="block text-sm font-medium text-zinc-300 mb-2">
              Content <span className="text-red-400">*</span>
            </span>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 resize-none"
              placeholder="Share a thought, insight, or quick update..."
              rows={4}
              required
            />
          </label>

          {/* Mood Selector */}
          <div className="mt-4">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Mood</span>
            <div className="flex flex-wrap gap-2">
              {THOUGHT_MOODS.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({
                    ...prev,
                    mood: prev.mood === mood.value ? '' : mood.value,
                  }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    formData.mood === mood.value
                      ? mood.color + ' ring-2 ring-white/20'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Link */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Link (Optional)</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">URL</label>
              <input
                type="url"
                name="linkUrl"
                value={formData.linkUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                placeholder="https://example.com/article"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Link Title</label>
              <input
                type="text"
                name="linkTitle"
                value={formData.linkTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                placeholder="Article title or description"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 text-zinc-300 text-sm rounded"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Publishing Options */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Publishing</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 rounded border-zinc-700 text-lime-500 focus:ring-lime-500"
              />
              <div>
                <span className="text-zinc-200 font-medium">Published</span>
                <p className="text-sm text-zinc-500">Make this thought visible on your site</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPinned"
                checked={formData.isPinned}
                onChange={handleChange}
                className="w-5 h-5 rounded border-zinc-700 text-amber-500 focus:ring-amber-500"
              />
              <div>
                <span className="text-zinc-200 font-medium">Pinned</span>
                <p className="text-sm text-zinc-500">Pinned thoughts appear at the top</p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/thoughts"
            className="px-6 py-2.5 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || !formData.content.trim()}
            className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-medium rounded-lg transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Replies Section */}
      <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Replies ({replies.length})
        </h2>

        {/* Add Reply */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddReply();
              }
            }}
            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
            placeholder="Add a reply or follow-up..."
          />
          <button
            type="button"
            onClick={handleAddReply}
            disabled={addingReply || !replyInput.trim()}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-colors"
          >
            {addingReply ? '...' : 'Reply'}
          </button>
        </div>

        {/* Replies List */}
        {replies.length === 0 ? (
          <p className="text-zinc-500 text-sm">No replies yet. Add a follow-up thought above.</p>
        ) : (
          <div className="space-y-4">
            {buildReplyTree().map((reply) => (
              <div key={reply.id} className="space-y-3">
                {/* Top-level reply */}
                {editingReplyId === reply.id ? (
                  <div className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <div className="w-1 h-full bg-lime-500/30 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={editingReplyContent}
                        onChange={(e) => setEditingReplyContent(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateReply(reply.id!, editingReplyContent)}
                          disabled={!editingReplyContent.trim()}
                          className="px-3 py-1 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-600 text-black text-sm font-medium rounded transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingReplyId(null);
                            setEditingReplyContent('');
                          }}
                          className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <div className="w-1 h-full bg-lime-500/30 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-200 text-sm break-words">{reply.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-xs text-zinc-500">{formatDate(reply.createdAt)}</p>
                        <button
                          onClick={() => setReplyingToId(replyingToId === reply.id ? null : reply.id!)}
                          className="text-xs text-zinc-400 hover:text-lime-400 transition-colors"
                        >
                          Reply
                        </button>
                      </div>

                      {/* Reply input for this thread */}
                      {replyingToId === reply.id && (
                        <div className="flex gap-2 mt-3">
                          <input
                            type="text"
                            value={nestedReplyInput}
                            onChange={(e) => setNestedReplyInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddNestedReply(reply.id!);
                              }
                            }}
                            className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                            placeholder="Reply to this comment..."
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleAddNestedReply(reply.id!)}
                            disabled={addingReply || !nestedReplyInput.trim()}
                            className="px-3 py-2 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-600 text-black text-sm font-medium rounded-lg transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingReplyId(reply.id!);
                          setEditingReplyContent(reply.content);
                        }}
                        className="p-1 text-zinc-500 hover:text-lime-400 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteReply(reply.id!)}
                        disabled={deletingReplyId === reply.id}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested replies */}
                {reply.children && reply.children.length > 0 && (
                  <div className="ml-8 space-y-2">
                    {reply.children.map((nestedReply) => (
                      <div key={nestedReply.id} className="space-y-2">
                        {editingReplyId === nestedReply.id ? (
                          <div className="flex gap-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                            <div className="w-1 h-full bg-zinc-600 rounded-full flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={editingReplyContent}
                                onChange={(e) => setEditingReplyContent(e.target.value)}
                                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                                autoFocus
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleUpdateReply(nestedReply.id!, editingReplyContent)}
                                  disabled={!editingReplyContent.trim()}
                                  className="px-3 py-1 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-600 text-black text-sm font-medium rounded transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingReplyId(null);
                                    setEditingReplyContent('');
                                  }}
                                  className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/30"
                          >
                            <div className="w-1 h-full bg-zinc-600 rounded-full flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-zinc-300 text-sm break-words">{nestedReply.content}</p>
                              <p className="text-xs text-zinc-500 mt-1">{formatDate(nestedReply.createdAt)}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button
                                onClick={() => {
                                  setEditingReplyId(nestedReply.id!);
                                  setEditingReplyContent(nestedReply.content);
                                }}
                                className="p-1 text-zinc-600 hover:text-lime-400 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteReply(nestedReply.id!)}
                                disabled={deletingReplyId === nestedReply.id}
                                className="p-1 text-zinc-600 hover:text-red-400 transition-colors disabled:opacity-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
