'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createThought, THOUGHT_MOODS, type ThoughtMood } from '@/lib/cms/thoughts';

export default function NewThoughtPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  const [formData, setFormData] = useState({
    content: '',
    mood: '' as ThoughtMood | '',
    tags: [] as string[],
    linkUrl: '',
    linkTitle: '',
    isPublished: true,
    isPinned: false,
  });

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      alert('Please write something');
      return;
    }

    setSaving(true);
    try {
      await createThought({
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
      console.error('Error creating thought:', error);
      alert('Failed to create thought');
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-2xl font-bold text-white">New Thought</h1>
          <p className="text-zinc-400 mt-1">Share a quick update or musing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <label className="block">
            <span className="block text-sm font-medium text-zinc-300 mb-2">
              What&apos;s on your mind? <span className="text-red-400">*</span>
            </span>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 resize-none"
              placeholder="Share a thought, insight, or quick update..."
              rows={4}
              required
              autoFocus
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
                <span className="text-zinc-200 font-medium">Publish immediately</span>
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
                <span className="text-zinc-200 font-medium">Pin this thought</span>
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
            {saving ? 'Saving...' : 'Post Thought'}
          </button>
        </div>
      </form>
    </div>
  );
}
