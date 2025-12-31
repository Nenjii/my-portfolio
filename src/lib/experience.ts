/**
 * Work Experience Service - Firestore Operations
 * ===============================================
 * Manages work experience entries for the headless CMS
 */

import { db } from './firebase';
import {
  collection,
  query,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const EXPERIENCE_COLLECTION = 'experiences';

export interface Experience {
  id?: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current position
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all work experiences ordered by start date (newest first)
 */
export async function getAllExperiences(): Promise<Experience[]> {
  try {
    const experiencesQuery = query(
      collection(db, EXPERIENCE_COLLECTION),
      orderBy('startDate', 'desc')
    );

    const snapshot = await getDocs(experiencesQuery);
    
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        company: data.company,
        position: data.position,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        isCurrent: data.isCurrent || false,
        description: data.description,
        responsibilities: data.responsibilities || [],
        technologies: data.technologies || [],
        companyLogo: data.companyLogo || '',
        companyUrl: data.companyUrl || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      };
    });
  } catch (error) {
    // Fallback: fetch without ordering if index not available
    console.warn('Index not available for experiences, using fallback:', error);
    const experiencesQuery = query(collection(db, EXPERIENCE_COLLECTION));
    const snapshot = await getDocs(experiencesQuery);
    
    const experiences = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        company: data.company,
        position: data.position,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        isCurrent: data.isCurrent || false,
        description: data.description,
        responsibilities: data.responsibilities || [],
        technologies: data.technologies || [],
        companyLogo: data.companyLogo || '',
        companyUrl: data.companyUrl || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      };
    });

    // Sort client-side by startDate descending
    return experiences.sort((a, b) => {
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }
}

/**
 * Get a single experience by ID
 */
export async function getExperienceById(id: string): Promise<Experience> {
  const docRef = doc(db, EXPERIENCE_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Experience not found');
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    company: data.company,
    position: data.position,
    location: data.location,
    startDate: data.startDate,
    endDate: data.endDate,
    isCurrent: data.isCurrent || false,
    description: data.description,
    responsibilities: data.responsibilities || [],
    technologies: data.technologies || [],
    companyLogo: data.companyLogo || '',
    companyUrl: data.companyUrl || '',
    createdAt: data.createdAt?.toDate().toISOString() || null,
    updatedAt: data.updatedAt?.toDate().toISOString() || null,
  };
}

/**
 * Create a new work experience
 */
export async function createExperience(data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, EXPERIENCE_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Update an existing work experience
 */
export async function updateExperience(id: string, data: Partial<Experience>): Promise<void> {
  const docRef = doc(db, EXPERIENCE_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a work experience
 */
export async function deleteExperience(id: string): Promise<void> {
  const docRef = doc(db, EXPERIENCE_COLLECTION, id);
  await deleteDoc(docRef);
}
