'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getExperienceById, updateExperience, type Experience } from '@/lib/cms/experience';

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');
  
  const [formData, setFormData] = useState<Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    responsibilities: [],
    technologies: [],
    companyLogo: '',
    companyUrl: '',
  });

  useEffect(() => {
    loadExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadExperience() {
    try {
      const data = await getExperienceById(id);
      setFormData({
        company: data.company,
        position: data.position,
        location: data.location || '',
        startDate: data.startDate,
        endDate: data.endDate || '',
        isCurrent: data.isCurrent,
        description: data.description || '',
        responsibilities: data.responsibilities || [],
        technologies: data.technologies || [],
        companyLogo: data.companyLogo || '',
        companyUrl: data.companyUrl || '',
      });
    } catch (error) {
      console.error('Error loading experience:', error);
      alert('Failed to load experience');
      router.push('/admin/experience');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
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

  function addResponsibility() {
    if (responsibilityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibilityInput.trim()],
      }));
      setResponsibilityInput('');
    }
  }

  function removeResponsibility(index: number) {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.company || !formData.position || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      await updateExperience(id, formData);
      router.push('/admin/experience');
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('Failed to update experience');
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
          Loading experience...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/experience"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Experience</h1>
          <p className="text-zinc-400 mt-1">{formData.position} at {formData.company}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
          
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                  placeholder="e.g., Google"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Position / Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Company URL</label>
                <input
                  type="url"
                  name="companyUrl"
                  value={formData.companyUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Company Logo URL</label>
              <input
                type="url"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Duration</h2>
          
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Start Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="month"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">End Date</label>
                <input
                  type="month"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  disabled={formData.isCurrent}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-lime-500 focus:ring-lime-500 focus:ring-offset-zinc-900"
              />
              <span className="text-zinc-300">I currently work here</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Description</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Overview</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 resize-none"
                placeholder="Brief overview of your role and achievements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Key Responsibilities</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={responsibilityInput}
                  onChange={(e) => setResponsibilityInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                  className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
                  placeholder="Add a responsibility..."
                />
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                >
                  Add
                </button>
              </div>
              {formData.responsibilities.length > 0 && (
                <ul className="space-y-2">
                  {formData.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3 bg-zinc-800/50 p-3 rounded-lg group">
                      <span className="text-lime-500 mt-0.5">•</span>
                      <span className="flex-1 text-zinc-300 text-sm">{resp}</span>
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index)}
                        className="p-1 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Technologies & Skills</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500"
              placeholder="e.g., React, Python, AWS..."
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg group"
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
            href="/admin/experience"
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
                Update Experience
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
