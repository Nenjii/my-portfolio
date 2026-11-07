"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllPosts, deletePost } from "@/lib/cms/posts";
import { getAllExperiences } from "@/lib/cms/experience";
import { getAllProjects } from "@/lib/cms/projects";
import { getAllThoughts } from "@/lib/cms/thoughts";

interface Stats {
  posts: { total: number; published: number; drafts: number };
  thoughts: { total: number; published: number; pinned: number };
  experiences: { total: number; current: number };
  projects: { total: number; published: number; featured: number };
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminHome() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [allPosts, allThoughts, allExperiences, allProjects] = await Promise.all([
        getAllPosts(),
        getAllThoughts().catch(() => []),
        getAllExperiences().catch(() => []),
        getAllProjects().catch(() => []),
      ]);
      
      setPosts(allPosts);
      setStats({
        posts: {
          total: allPosts.length,
          published: allPosts.filter((p) => p.isPublished).length,
          drafts: allPosts.filter((p) => !p.isPublished).length,
        },
        thoughts: {
          total: allThoughts.length,
          published: allThoughts.filter((t) => t.isPublished).length,
          pinned: allThoughts.filter((t) => t.isPinned).length,
        },
        experiences: {
          total: allExperiences.length,
          current: allExperiences.filter((e) => e.isCurrent).length,
        },
        projects: {
          total: allProjects.length,
          published: allProjects.filter((p) => p.isPublished).length,
          featured: allProjects.filter((p) => p.featured).length,
        },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    try {
      setDeleting(postId);
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      if (stats) {
        const deletedPost = posts.find((p) => p.id === postId);
        setStats({
          ...stats,
          posts: {
            total: stats.posts.total - 1,
            published: deletedPost?.isPublished ? stats.posts.published - 1 : stats.posts.published,
            drafts: !deletedPost?.isPublished ? stats.posts.drafts - 1 : stats.posts.drafts,
          },
        });
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-zinc-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Welcome back! Here&apos;s an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Posts Stats */}
          <Link
            href="/admin/posts"
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.posts.total}</h3>
            <p className="text-zinc-400 text-sm mb-3">Blog Posts</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">{stats.posts.published} published</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-zinc-400">{stats.posts.drafts} drafts</span>
              </span>
            </div>
          </Link>

          {/* Thoughts Stats */}
          <Link
            href="/admin/thoughts"
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.thoughts.total}</h3>
            <p className="text-zinc-400 text-sm mb-3">Thoughts</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">{stats.thoughts.published} published</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-zinc-400">{stats.thoughts.pinned} pinned</span>
              </span>
            </div>
          </Link>

          {/* Experience Stats */}
          <Link
            href="/admin/experience"
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.experiences.total}</h3>
            <p className="text-zinc-400 text-sm mb-3">Work Experience</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                <span className="text-zinc-400">{stats.experiences.current} current</span>
              </span>
            </div>
          </Link>

          {/* Projects Stats */}
          <Link
            href="/admin/projects"
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.projects.total}</h3>
            <p className="text-zinc-400 text-sm mb-3">Projects</p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">{stats.projects.published} published</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-zinc-400">{stats.projects.featured} featured</span>
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-colors"
        >
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">New Blog Post</p>
            <p className="text-sm text-zinc-500">Write and publish content</p>
          </div>
        </Link>
        <Link
          href="/admin/experience/new"
          className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-colors"
        >
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">Add Experience</p>
            <p className="text-sm text-zinc-500">Update your work history</p>
          </div>
        </Link>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-colors"
        >
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">Add Project</p>
            <p className="text-sm text-zinc-500">Showcase your work</p>
          </div>
        </Link>
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
          <Link href="/admin/posts" className="text-sm text-zinc-400 hover:text-lime-400 transition-colors">
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-zinc-800">
            <svg className="w-12 h-12 mx-auto text-zinc-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-zinc-400 mb-4">No posts yet</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white truncate">{post.title}</h3>
                    {post.isPublished ? (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 truncate">{post.excerpt || "No excerpt"}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === post.id ? (
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
    </div>
  );
}
