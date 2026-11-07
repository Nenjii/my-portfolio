'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, updateProject, type Project } from '@/lib/cms/projects';

const CATEGORIES = [
  'Web App',
  'Mobile App',
  'Desktop App',
  'API / Backend',
  'Network / Infrastructure',
  'Automation',
  'Data / Analytics',
  'AI / Machine Learning',
  'DevOps / CI/CD',
  'Other',
];

const STATUSES = [
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'planned', label: 'Planned' },
];

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    coverImage: '',
    images: [],
    technologies: [],
    category: 'Web App',
    status: 'completed',
    featured: false,
    liveUrl: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
    isPublished: false,
  });

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadProject() {
    try {
      const data = await getProjectById(id);
      const category = data.category || 'Web App';
      const isCustom = !CATEGORIES.includes(category);
      
      if (isCustom) {
        setCustomCategory(category);
        setIsCustomCategory(true);
      }
      
      setFormData({
        title: data.title,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription || '',
        coverImage: data.coverImage || '',
        images: data.images || [],
        technologies: data.technologies || [],
        category: isCustom ? 'Other' : category,
        status: data.status || 'completed',
        featured: data.featured || false,
        liveUrl: data.liveUrl || '',
        githubUrl: data.githubUrl || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        isPublished: data.isPublished || false,
      });
    } catch (error) {
      console.error('Error loading project:', error);
      alert('Failed to load project');
      router.push('/admin/projects');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      // Handle category changes
      if (name === 'category') {
        if (value === 'Other') {
          setIsCustomCategory(true);
        } else {
          setIsCustomCategory(false);
          setCustomCategory('');
        }
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function addTechnology() {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  }

  function removeTechnology(tech: string) {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.category === 'Other' && !customCategory.trim()) {
      alert('Please enter a custom category');
      return;
    }

    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        category: formData.category === 'Other' ? customCategory.trim() : formData.category,
      };
      await updateProject(id, dataToSave);
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project');
    } finally {
      setSaving(false);
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
          Loading project...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/projects"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Project</h1>
          <p className="text-zinc-400 mt-1">{formData.title}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
          
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Project Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                placeholder="e.g., E-Commerce Platform"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                URL Slug <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">/projects/</span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                  placeholder="e-commerce-platform"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Short Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 resize-none"
                placeholder="A brief summary of the project..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Full Description</label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 resize-none"
                placeholder="Detailed description of the project, features, challenges, and solutions..."
              />
            </div>
          </div>
        </div>

        {/* Category & Status */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Category & Status</h2>
          
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {(formData.category === 'Other' || isCustomCategory) && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full mt-3 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                    placeholder="Enter custom category..."
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-500"
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Start Date</label>
                <input
                  type="month"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">End Date</label>
                <input
                  type="month"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-lime-500 focus:ring-lime-500 focus:ring-offset-zinc-900"
                />
                <span className="text-zinc-300">Featured project</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-lime-500 focus:ring-lime-500 focus:ring-offset-zinc-900"
                />
                <span className="text-zinc-300">Published</span>
              </label>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Media</h2>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
              placeholder="https://example.com/cover.png"
            />
            {formData.coverImage && (
              <div className="mt-4 aspect-video bg-zinc-800 rounded-lg overflow-hidden max-w-sm">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Links</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Live Demo URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                placeholder="https://demo.example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">GitHub Repository</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Technologies Used</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
              placeholder="e.g., React, Node.js, PostgreSQL..."
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            >
              Add
            </button>
          </div>
          
          {formData.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/projects"
            className="px-6 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Update Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
