'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts, deletePost } from '@/lib/cms/posts';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  isPublished: boolean;
  createdAt?: string;
  tags?: string[];
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-zinc-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading posts...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-zinc-400 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <svg className="w-16 h-16 mx-auto text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
          <p className="text-zinc-500 mb-6">Create your first blog post to get started.</p>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">{post.title}</h3>
                  {post.isPublished ? (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-2">{post.excerpt || 'No excerpt'}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}</span>
                  {post.tags && post.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-zinc-800 rounded">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && <span>+{post.tags.length - 3}</span>}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  disabled={deletingId === post.id}
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === post.id ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
