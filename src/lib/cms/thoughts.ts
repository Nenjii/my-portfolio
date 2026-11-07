/**
 * Thoughts Service - Firestore Operations
 * ========================================
 * Micro-blogging/status updates with moods, tags, and replies
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
  limit as firestoreLimit,
  increment,
} from 'firebase/firestore';

const THOUGHTS_COLLECTION = 'thoughts';
const REPLIES_COLLECTION = 'thoughtReplies';

// Available moods for thoughts
export const THOUGHT_MOODS = [
  { value: 'focused', label: '🎯 Focused', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'creative', label: '🎨 Creative', color: 'bg-purple-500/20 text-purple-400' },
  { value: 'learning', label: '📚 Learning', color: 'bg-emerald-500/20 text-emerald-400' },
  { value: 'debugging', label: '🐛 Debugging', color: 'bg-red-500/20 text-red-400' },
  { value: 'shipping', label: '🚀 Shipping', color: 'bg-lime-500/20 text-lime-400' },
  { value: 'thinking', label: '💭 Thinking', color: 'bg-zinc-500/20 text-zinc-400' },
  { value: 'caffeinated', label: '☕ Caffeinated', color: 'bg-amber-500/20 text-amber-400' },
  { value: 'chill', label: '😌 Chill', color: 'bg-cyan-500/20 text-cyan-400' },
  { value: 'grinding', label: '💪 Grinding', color: 'bg-orange-500/20 text-orange-400' },
  { value: 'celebrating', label: '🎉 Celebrating', color: 'bg-pink-500/20 text-pink-400' },
] as const;

export type ThoughtMood = typeof THOUGHT_MOODS[number]['value'];

export interface Thought {
  id?: string;
  content: string;
  mood?: ThoughtMood;
  tags: string[];
  linkUrl?: string;        // Optional link to share
  linkTitle?: string;      // Title for the link
  isPublished: boolean;
  isPinned: boolean;       // Pin important thoughts
  replyCount: number;      // Denormalized for performance
  createdAt?: string;
  updatedAt?: string;
}

export interface ThoughtReply {
  id?: string;
  thoughtId: string;
  content: string;
  parentReplyId?: string;  // For nested replies (reply to a reply)
  createdAt?: string;
}

// ============ THOUGHTS CRUD ============

/**
 * Get all thoughts ordered by pinned first, then by creation date
 */
export async function getAllThoughts(): Promise<Thought[]> {
  const thoughtsQuery = query(
    collection(db, THOUGHTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(thoughtsQuery);
  
  const thoughts = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content,
      mood: data.mood || undefined,
      tags: data.tags || [],
      linkUrl: data.linkUrl || '',
      linkTitle: data.linkTitle || '',
      isPublished: data.isPublished ?? true,
      isPinned: data.isPinned ?? false,
      replyCount: data.replyCount || 0,
      createdAt: data.createdAt?.toDate().toISOString() || null,
      updatedAt: data.updatedAt?.toDate().toISOString() || null,
    };
  });

  // Sort pinned thoughts to the top
  return thoughts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
}

/**
 * Get published thoughts only (for public display)
 */
export async function getPublishedThoughts(limitCount = 20): Promise<Thought[]> {
  const thoughtsQuery = query(
    collection(db, THOUGHTS_COLLECTION),
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc'),
    firestoreLimit(limitCount)
  );

  const snapshot = await getDocs(thoughtsQuery);
  
  const thoughts = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content,
      mood: data.mood || undefined,
      tags: data.tags || [],
      linkUrl: data.linkUrl || '',
      linkTitle: data.linkTitle || '',
      isPublished: true,
      isPinned: data.isPinned ?? false,
      replyCount: data.replyCount || 0,
      createdAt: data.createdAt?.toDate().toISOString() || null,
      updatedAt: data.updatedAt?.toDate().toISOString() || null,
    };
  });

  // Sort pinned thoughts to the top
  return thoughts.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
}

/**
 * Get a single thought by ID
 */
export async function getThoughtById(id: string): Promise<Thought> {
  const docRef = doc(db, THOUGHTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Thought not found');
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    content: data.content,
    mood: data.mood || undefined,
    tags: data.tags || [],
    linkUrl: data.linkUrl || '',
    linkTitle: data.linkTitle || '',
    isPublished: data.isPublished ?? true,
    isPinned: data.isPinned ?? false,
    replyCount: data.replyCount || 0,
    createdAt: data.createdAt?.toDate().toISOString() || null,
    updatedAt: data.updatedAt?.toDate().toISOString() || null,
  };
}

/**
 * Create a new thought
 */
export async function createThought(
  thoughtData: Omit<Thought, 'id' | 'createdAt' | 'updatedAt' | 'replyCount'>
): Promise<Thought> {
  const newThought = {
    content: thoughtData.content,
    mood: thoughtData.mood || null,
    tags: thoughtData.tags || [],
    linkUrl: thoughtData.linkUrl || '',
    linkTitle: thoughtData.linkTitle || '',
    isPublished: thoughtData.isPublished ?? true,
    isPinned: thoughtData.isPinned ?? false,
    replyCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, THOUGHTS_COLLECTION), newThought);

  return {
    id: docRef.id,
    ...thoughtData,
    replyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update a thought
 */
export async function updateThought(
  id: string,
  thoughtData: Partial<Omit<Thought, 'id' | 'createdAt' | 'updatedAt' | 'replyCount'>>
): Promise<void> {
  const docRef = doc(db, THOUGHTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...thoughtData,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a thought and its replies
 */
export async function deleteThought(id: string): Promise<void> {
  // First delete all replies
  const repliesQuery = query(
    collection(db, REPLIES_COLLECTION),
    where('thoughtId', '==', id)
  );
  const repliesSnapshot = await getDocs(repliesQuery);
  
  const deletePromises = repliesSnapshot.docs.map((replyDoc) =>
    deleteDoc(doc(db, REPLIES_COLLECTION, replyDoc.id))
  );
  await Promise.all(deletePromises);

  // Then delete the thought
  await deleteDoc(doc(db, THOUGHTS_COLLECTION, id));
}

/**
 * Toggle pin status
 */
export async function toggleThoughtPin(id: string, isPinned: boolean): Promise<void> {
  const docRef = doc(db, THOUGHTS_COLLECTION, id);
  await updateDoc(docRef, {
    isPinned,
    updatedAt: serverTimestamp(),
  });
}

// ============ REPLIES CRUD ============

/**
 * Get all replies for a thought (including nested replies)
 */
export async function getRepliesForThought(thoughtId: string): Promise<ThoughtReply[]> {
  const repliesQuery = query(
    collection(db, REPLIES_COLLECTION),
    where('thoughtId', '==', thoughtId)
  );

  const snapshot = await getDocs(repliesQuery);
  
  const replies = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      thoughtId: data.thoughtId,
      content: data.content,
      parentReplyId: data.parentReplyId || undefined,
      createdAt: data.createdAt?.toDate().toISOString() || null,
    };
  });

  // Sort by creation date
  return replies.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateA - dateB;
  });
}

/**
 * Add a reply to a thought (or to another reply)
 */
export async function addReplyToThought(
  thoughtId: string,
  content: string,
  parentReplyId?: string
): Promise<ThoughtReply> {
  const newReply = {
    thoughtId,
    content,
    parentReplyId: parentReplyId || null,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, REPLIES_COLLECTION), newReply);

  // Increment reply count on the thought
  const thoughtRef = doc(db, THOUGHTS_COLLECTION, thoughtId);
  await updateDoc(thoughtRef, {
    replyCount: increment(1),
  });

  return {
    id: docRef.id,
    thoughtId,
    content,
    parentReplyId,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Delete a reply
 */
export async function deleteReply(replyId: string, thoughtId: string): Promise<void> {
  await deleteDoc(doc(db, REPLIES_COLLECTION, replyId));

  // Decrement reply count on the thought
  const thoughtRef = doc(db, THOUGHTS_COLLECTION, thoughtId);
  await updateDoc(thoughtRef, {
    replyCount: increment(-1),
  });
}

/**
 * Update a reply
 */
export async function updateReply(replyId: string, content: string): Promise<void> {
  const docRef = doc(db, REPLIES_COLLECTION, replyId);
  await updateDoc(docRef, {
    content,
    updatedAt: serverTimestamp(),
  });
}
