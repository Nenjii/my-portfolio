'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getAllThoughts,
  deleteThought,
  toggleThoughtPin,
  getRepliesForThought,
  addReplyToThought,
  deleteReply,
  updateReply,
  THOUGHT_MOODS,
  type Thought,
  type ThoughtReply,
} from '@/lib/cms/thoughts';

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);
  const [thoughtReplies, setThoughtReplies] = useState<{ [key: string]: ThoughtReply[] }>({});
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});
  const [loadingReplies, setLoadingReplies] = useState<string | null>(null);
  const [deletingReplyId, setDeletingReplyId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyContent, setEditingReplyContent] = useState<string>('');

  useEffect(() => {
    loadThoughts();
  }, []);

  async function loadThoughts() {
    try {
      const data = await getAllThoughts();
      setThoughts(data);
    } catch (error) {
      console.error('Error loading thoughts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this thought and all its replies?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteThought(id);
      setThoughts(thoughts.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting thought:', error);
      alert('Failed to delete thought');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleTogglePin(id: string, currentPinned: boolean) {
    try {
      await toggleThoughtPin(id, !currentPinned);
      setThoughts(thoughts.map((t) =>
        t.id === id ? { ...t, isPinned: !currentPinned } : t
      ));
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  }

  async function toggleExpandedReplies(thoughtId: string) {
    if (expandedThoughtId === thoughtId) {
      setExpandedThoughtId(null);
    } else {
      setExpandedThoughtId(thoughtId);
      // Load replies if not already cached
      if (!thoughtReplies[thoughtId]) {
        setLoadingReplies(thoughtId);
        try {
          const replies = await getRepliesForThought(thoughtId);
          setThoughtReplies((prev) => ({
            ...prev,
            [thoughtId]: replies,
          }));
        } catch (error) {
          console.error('Error loading replies:', error);
        } finally {
          setLoadingReplies(null);
        }
      }
    }
  }

  async function handleAddReply(thoughtId: string) {
    const content = replyInput[thoughtId]?.trim();
    if (!content) return;

    try {
      const newReply = await addReplyToThought(thoughtId, content);
      setThoughtReplies((prev) => ({
        ...prev,
        [thoughtId]: [...(prev[thoughtId] || []), newReply],
      }));
      // Update thought's replyCount
      setThoughts(thoughts.map((t) =>
        t.id === thoughtId ? { ...t, replyCount: t.replyCount + 1 } : t
      ));
      setReplyInput((prev) => ({
        ...prev,
        [thoughtId]: '',
      }));
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Failed to add reply');
    }
  }

  async function handleDeleteReply(replyId: string, thoughtId: string) {
    if (!confirm('Delete this reply?')) return;

    setDeletingReplyId(replyId);
    try {
      await deleteReply(replyId, thoughtId);
      setThoughtReplies((prev) => ({
        ...prev,
        [thoughtId]: (prev[thoughtId] || []).filter((r) => r.id !== replyId),
      }));
      // Update thought's replyCount
      setThoughts(thoughts.map((t) =>
        t.id === thoughtId ? { ...t, replyCount: Math.max(0, t.replyCount - 1) } : t
      ));
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('Failed to delete reply');
    } finally {
      setDeletingReplyId(null);
    }
  }

  async function handleUpdateReply(replyId: string, thoughtId: string, newContent: string) {
    if (!newContent.trim()) return;

    try {
      await updateReply(replyId, newContent.trim());
      setThoughtReplies((prev) => ({
        ...prev,
        [thoughtId]: (prev[thoughtId] || []).map((r) =>
          r.id === replyId ? { ...r, content: newContent.trim() } : r
        ),
      }));
      setEditingReplyId(null);
      setEditingReplyContent('');
    } catch (error) {
      console.error('Error updating reply:', error);
      alert('Failed to update reply');
    }
  }

  function buildReplyTree(replies: ThoughtReply[]) {
    const topLevel = replies.filter((r) => !r.parentReplyId);
    
    return topLevel.map((reply) => ({
      ...reply,
      children: replies.filter((r) => r.parentReplyId === reply.id),
    }));
  }

  function getMoodInfo(mood?: string) {
    return THOUGHT_MOODS.find((m) => m.value === mood);
  }

  function formatDate(dateString?: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-zinc-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading thoughts...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Thoughts</h1>
          <p className="text-zinc-400 mt-1">Quick updates, musings, and micro-posts</p>
        </div>
        <Link
          href="/admin/thoughts/new"
          className="flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Thought
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-white">{thoughts.length}</p>
          <p className="text-sm text-zinc-500">Total Thoughts</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-lime-400">{thoughts.filter(t => t.isPublished).length}</p>
          <p className="text-sm text-zinc-500">Published</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-400">{thoughts.filter(t => t.isPinned).length}</p>
          <p className="text-sm text-zinc-500">Pinned</p>
        </div>
      </div>

      {/* Thoughts List */}
      {thoughts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-xl">
          <svg className="w-12 h-12 mx-auto text-zinc-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-zinc-400 mb-4">No thoughts yet</p>
          <Link
            href="/admin/thoughts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
          >
            Share your first thought
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {thoughts.map((thought) => {
            const moodInfo = getMoodInfo(thought.mood);
            return (
              <div
                key={thought.id}
                className={`bg-zinc-900/50 border rounded-xl p-5 transition-colors ${
                  thought.isPinned ? 'border-amber-500/50' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    {thought.isPinned && (
                      <span className="flex items-center gap-1 text-xs text-amber-400">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.018 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.583l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.018 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" />
                        </svg>
                        Pinned
                      </span>
                    )}
                    {moodInfo && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${moodInfo.color}`}>
                        {moodInfo.label}
                      </span>
                    )}
                    {!thought.isPublished && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
                        Draft
                      </span>
                    )}
                    <span className="text-xs text-zinc-500">{formatDate(thought.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePin(thought.id!, thought.isPinned)}
                      className={`p-2 rounded-lg transition-colors ${
                        thought.isPinned
                          ? 'text-amber-400 hover:bg-amber-500/10'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                      }`}
                      title={thought.isPinned ? 'Unpin' : 'Pin'}
                    >
                      <svg className="w-4 h-4" fill={thought.isPinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                    <Link
                      href={`/admin/thoughts/${thought.id}/edit`}
                      className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(thought.id!)}
                      disabled={deletingId === thought.id}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <p className="text-zinc-200 whitespace-pre-wrap mb-3">{thought.content}</p>

                {/* Link Preview */}
                {thought.linkUrl && (
                  <a
                    href={thought.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors mb-3"
                  >
                    <svg className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-sm text-zinc-300 truncate">{thought.linkTitle || thought.linkUrl}</span>
                  </a>
                )}

                {/* Tags & Reply Count */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {thought.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {thought.replyCount > 0 && (
                    <button
                      onClick={() => toggleExpandedReplies(thought.id!)}
                      className={`flex items-center gap-1 text-xs font-medium rounded-lg px-2 py-1 transition-colors ${
                        expandedThoughtId === thought.id
                          ? 'text-lime-400 bg-lime-500/10'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {thought.replyCount} {thought.replyCount === 1 ? 'reply' : 'replies'}
                      <svg 
                        className={`w-3 h-3 transition-transform ${expandedThoughtId === thought.id ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Replies Dropdown */}
                {expandedThoughtId === thought.id && (
                  <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
                    {loadingReplies === thought.id ? (
                      <div className="flex items-center justify-center py-4">
                        <svg className="animate-spin h-4 w-4 text-zinc-500" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </div>
                    ) : (
                      <>
                        {/* Add Reply Input */}
                        <div className="flex gap-2 bg-zinc-800/30 p-2 rounded-lg">
                          <input
                            type="text"
                            value={replyInput[thought.id!] || ''}
                            onChange={(e) => setReplyInput((prev) => ({
                              ...prev,
                              [thought.id!]: e.target.value,
                            }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddReply(thought.id!);
                              }
                            }}
                            placeholder="Add a reply..."
                            className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                          />
                          <button
                            onClick={() => handleAddReply(thought.id!)}
                            disabled={!replyInput[thought.id!]?.trim()}
                            className="px-3 py-2 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-600 text-black text-sm font-medium rounded transition-colors"
                          >
                            Reply
                          </button>
                        </div>

                        {/* Replies List */}
                        {(!thoughtReplies[thought.id!] || thoughtReplies[thought.id!].length === 0) ? (
                          <p className="text-zinc-500 text-sm py-2">No replies yet</p>
                        ) : (
                          <div className="space-y-2">
                            {buildReplyTree(thoughtReplies[thought.id!] || []).map((reply) => (
                              <div key={reply.id} className="space-y-2">
                                {/* Top-level reply */}
                                {editingReplyId === reply.id ? (
                                  <div className="flex gap-2 p-2 bg-zinc-800/30 rounded border border-zinc-700/30">
                                    <input
                                      type="text"
                                      value={editingReplyContent}
                                      onChange={(e) => setEditingReplyContent(e.target.value)}
                                      className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => handleUpdateReply(reply.id!, thought.id!, editingReplyContent)}
                                      disabled={!editingReplyContent.trim()}
                                      className="px-2 py-1 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-600 text-black text-xs font-medium rounded transition-colors"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingReplyId(null);
                                        setEditingReplyContent('');
                                      }}
                                      className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-medium rounded transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-start gap-2 p-2 bg-zinc-800/30 rounded border border-zinc-700/30">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-zinc-300 text-sm break-words">{reply.content}</p>
                                      <p className="text-xs text-zinc-500 mt-1">{formatDate(reply.createdAt)}</p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <button
                                        onClick={() => {
                                          setEditingReplyId(reply.id!);
                                          setEditingReplyContent(reply.content);
                                        }}
                                        className="p-1 text-zinc-600 hover:text-lime-400 transition-colors"
                                        title="Edit"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() => handleDeleteReply(reply.id!, thought.id!)}
                                        disabled={deletingReplyId === reply.id}
                                        className="p-1 text-zinc-600 hover:text-red-400 transition-colors disabled:opacity-50"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Nested replies */}
                                {reply.children && reply.children.length > 0 && (
                                  <div className="ml-4 space-y-2">
                                    {reply.children.map((nestedReply) => (
                                      <div key={nestedReply.id} className="space-y-2">
                                        {editingReplyId === nestedReply.id ? (
                                          <div className="flex gap-2 p-2 bg-zinc-800/20 rounded border border-zinc-700/20">
                                            <input
                                              type="text"
                                              value={editingReplyContent}
                                              onChange={(e) => setEditingReplyContent(e.target.value)}
                                              className="flex-1 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                                              autoFocus
                                            />
                                            <button
                                              onClick={() => handleUpdateReply(nestedReply.id!, thought.id!, editingReplyContent)}
                                              disabled={!editingReplyContent.trim()}
                                              className="px-2 py-1 bg-lime-500 hover:bg-lime-400 disabled:bg-zinc-700 disabled:text-zinc-600 text-black text-xs font-medium rounded transition-colors"
                                            >
                                              Save
                                            </button>
                                            <button
                                              onClick={() => {
                                                setEditingReplyId(null);
                                                setEditingReplyContent('');
                                              }}
                                              className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-medium rounded transition-colors"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        ) : (
                                          <div
                                            className="flex items-start gap-2 p-2 bg-zinc-800/20 rounded border border-zinc-700/20"
                                          >
                                            <div className="flex-1 min-w-0">
                                              <p className="text-zinc-400 text-sm break-words">{nestedReply.content}</p>
                                              <p className="text-xs text-zinc-600 mt-1">{formatDate(nestedReply.createdAt)}</p>
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
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                              </button>
                                              <button
                                                onClick={() => handleDeleteReply(nestedReply.id!, thought.id!)}
                                                disabled={deletingReplyId === nestedReply.id}
                                                className="p-1 text-zinc-600 hover:text-red-400 transition-colors disabled:opacity-50"
                                              >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                        {/* View Full Thread Link */}
                        <Link
                          href={`/admin/thoughts/${thought.id}/edit`}
                          className="block text-center text-xs text-zinc-500 hover:text-lime-400 py-1 transition-colors"
                        >
                          Edit thought & manage replies →
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
