'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllExperiences, deleteExperience, type Experience } from '@/lib/cms/experience';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  async function loadExperiences() {
    try {
      const data = await getAllExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, company: string) {
    if (!confirm(`Delete experience at "${company}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteExperience(id);
      setExperiences(experiences.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience');
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
          Loading experiences...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Work Experience</h1>
          <p className="text-zinc-400 mt-1">{experiences.length} experience{experiences.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Experience
        </Link>
      </div>

      {/* Experience List */}
      {experiences.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <svg className="w-16 h-16 mx-auto text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No work experience yet</h3>
          <p className="text-zinc-500 mb-6">Add your first work experience to showcase your career journey.</p>
          <Link
            href="/admin/experience/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white truncate">{exp.position}</h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 bg-lime-500/20 text-lime-400 text-xs font-medium rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{exp.description}</p>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 6 && (
                        <span className="px-2 py-0.5 text-zinc-500 text-xs">
                          +{exp.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/experience/${exp.id}/edit`}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(exp.id!, exp.company)}
                    disabled={deletingId === exp.id}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === exp.id ? (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
