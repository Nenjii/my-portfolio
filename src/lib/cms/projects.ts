/**
 * Projects Service - Firestore Operations
 * ========================================
 * Manages portfolio projects for the headless CMS
 */

import { db } from '@/lib/firebase';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const PROJECTS_COLLECTION = 'projects';

export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  coverImage?: string;
  images?: string[];
  technologies: string[];
  category: string; // e.g., "Web App", "Mobile", "Network", "Automation"
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all projects ordered by creation date
 */
export async function getAllProjects(): Promise<Project[]> {
  const projectsQuery = query(
    collection(db, PROJECTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(projectsQuery);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      longDescription: data.longDescription || '',
      coverImage: data.coverImage || '',
      images: data.images || [],
      technologies: data.technologies || [],
      category: data.category || 'General',
      status: data.status || 'completed',
      featured: data.featured || false,
      liveUrl: data.liveUrl || '',
      githubUrl: data.githubUrl || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      isPublished: data.isPublished || false,
      createdAt: data.createdAt?.toDate().toISOString() || null,
      updatedAt: data.updatedAt?.toDate().toISOString() || null,
    };
  });
}

/**
 * Get published projects only
 */
export async function getPublishedProjects(): Promise<Project[]> {
  const projectsQuery = query(
    collection(db, PROJECTS_COLLECTION),
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(projectsQuery);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      longDescription: data.longDescription || '',
      coverImage: data.coverImage || '',
      images: data.images || [],
      technologies: data.technologies || [],
      category: data.category || 'General',
      status: data.status || 'completed',
      featured: data.featured || false,
      liveUrl: data.liveUrl || '',
      githubUrl: data.githubUrl || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      isPublished: data.isPublished,
      createdAt: data.createdAt?.toDate().toISOString() || null,
      updatedAt: data.updatedAt?.toDate().toISOString() || null,
    };
  });
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projectsQuery = query(
    collection(db, PROJECTS_COLLECTION),
    where('isPublished', '==', true),
    where('featured', '==', true),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(projectsQuery);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      coverImage: data.coverImage || '',
      technologies: data.technologies || [],
      category: data.category || 'General',
      status: data.status || 'completed',
      featured: true,
      liveUrl: data.liveUrl || '',
      githubUrl: data.githubUrl || '',
      isPublished: true,
      createdAt: data.createdAt?.toDate().toISOString() || null,
    };
  });
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Project not found');
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    longDescription: data.longDescription || '',
    coverImage: data.coverImage || '',
    images: data.images || [],
    technologies: data.technologies || [],
    category: data.category || 'General',
    status: data.status || 'completed',
    featured: data.featured || false,
    liveUrl: data.liveUrl || '',
    githubUrl: data.githubUrl || '',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    isPublished: data.isPublished || false,
    createdAt: data.createdAt?.toDate().toISOString() || null,
    updatedAt: data.updatedAt?.toDate().toISOString() || null,
  };
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projectsQuery = query(
    collection(db, PROJECTS_COLLECTION),
    where('slug', '==', slug),
    where('isPublished', '==', true)
  );

  const snapshot = await getDocs(projectsQuery);
  
  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();
  
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    longDescription: data.longDescription || '',
    coverImage: data.coverImage || '',
    images: data.images || [],
    technologies: data.technologies || [],
    category: data.category || 'General',
    status: data.status || 'completed',
    featured: data.featured || false,
    liveUrl: data.liveUrl || '',
    githubUrl: data.githubUrl || '',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    isPublished: data.isPublished,
    createdAt: data.createdAt?.toDate().toISOString() || null,
    updatedAt: data.updatedAt?.toDate().toISOString() || null,
  };
}

/**
 * Create a new project
 */
export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}
