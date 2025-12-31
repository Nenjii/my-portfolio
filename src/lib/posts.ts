/**
 * Posts Service - Firestore Operations
 * =====================================
 * 
 * WHY SEPARATE FILE:
 * - Separation of concerns: Firebase config vs business logic
 * - These functions can be imported by any frontend (Admin, Blog, Portfolio)
 * - Easy to test, mock, and maintain
 * - Server Components can call these directly (no "use client" needed)
 */

import { db } from './firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Collection reference constant
 * WHY: Single source of truth for collection name, prevents typos
 */
const POSTS_COLLECTION = 'posts';

/**
 * Fetches the latest published posts from Firestore
 * 
 * USE CASE: Portfolio site's "Latest Posts" section, Blog homepage
 * 
 * @param {number} postLimit - Number of posts to fetch (default: 6 for portfolio)
 * @returns {Promise<Array>} - Array of post objects with id included
 * 
 * WHY THIS QUERY STRUCTURE:
 * - where('isPublished', '==', true) → Only show public posts
 * - orderBy('publishedAt', 'desc') → Newest posts first
 * - limit(postLimit) → Efficient pagination, only fetch what's needed
 * 
 * IMPORTANT: This query requires a composite index in Firestore.
 * Firebase will provide an auto-generate link in the console error
 * the first time you run this query.
 */
export async function getLatestPosts(postLimit = 6) {
  try {
    // Build the query with filters, ordering, and limit
    const postsQuery = query(
      collection(db, POSTS_COLLECTION),
      where('isPublished', '==', true),
      orderBy('publishedAt', 'desc'),
      firestoreLimit(postLimit)
    );

    // Execute the query
    const querySnapshot = await getDocs(postsQuery);

    // Transform Firestore documents into plain objects
    // WHY: Firestore docs have special methods we don't need in components
    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      
      return {
        id: doc.id, // Include document ID for linking/routing
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        // Convert Firestore Timestamp to ISO string for serialization
        // WHY: Next.js Server Components need serializable data
        publishedAt: data.publishedAt?.toDate().toISOString() || null,
      };
    });

    return posts;
  } catch (error: unknown) {
    console.error('Error fetching latest posts:', error);
    // Re-throw with context for better debugging
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch latest posts: ${message}`);
  }
}

/**
 * Creates a new post in Firestore
 * 
 * USE CASE: Admin panel's post editor
 * 
 * @param {Object} postData - The post data to save
 * @param {string} postData.title - Post title
 * @param {string} postData.slug - URL-friendly slug
 * @param {string} postData.excerpt - Short description for previews
 * @param {string} postData.content - HTML content from rich text editor
 * @param {string} postData.coverImage - Firebase Storage URL
 * @param {boolean} postData.isPublished - Whether to publish immediately
 * @returns {Promise<Object>} - Created post with generated ID
 * 
 * WHY serverTimestamp():
 * - Uses Firestore server time, not client time
 * - Prevents issues with incorrect client clocks
 * - Ensures consistent ordering across all clients
 */
interface PostData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  isPublished?: boolean;
  category?: string;
}

export async function createPost(postData: PostData) {
  try {
    // Validate required fields before sending to Firestore
    if (!postData.title) throw new Error('Missing required field: title');
    if (!postData.slug) throw new Error('Missing required field: slug');
    if (!postData.content) throw new Error('Missing required field: content');

    // Construct the document with defaults and server timestamp
    const newPost = {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt || '',
      content: postData.content,
      coverImage: postData.coverImage || '',
      isPublished: postData.isPublished ?? false, // Default to draft
      // WHY separate timestamps:
      // - createdAt: Never changes, useful for "oldest first" sorting
      // - publishedAt: Only set when published, null for drafts
      // - updatedAt: Changes on every edit, useful for "recently updated"
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: postData.isPublished ? serverTimestamp() : null,
    };

    // Add document to Firestore (auto-generates ID)
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), newPost);

    // Return the created post with its new ID
    return {
      id: docRef.id,
      ...newPost,
      // Replace serverTimestamp placeholder with current time for immediate use
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: postData.isPublished ? new Date().toISOString() : null,
    };
  } catch (error: unknown) {
    console.error('Error creating post:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to create post: ${message}`);
  }
}

/**
 * Fetches a single post by its slug
 * 
 * USE CASE: Blog post detail page (/posts/[slug])
 * 
 * @param {string} slug - The URL-friendly slug of the post
 * @returns {Promise<Object|null>} - Post object or null if not found
 */
export async function getPostBySlug(slug: string) {
  try {
    const postsQuery = query(
      collection(db, POSTS_COLLECTION),
      where('slug', '==', slug),
      where('isPublished', '==', true),
      firestoreLimit(1)
    );

    const querySnapshot = await getDocs(postsQuery);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      category: data.category || 'General',
      tags: data.tags || [],
      publishedAt: data.publishedAt?.toDate().toISOString() || null,
    };
  } catch (error: unknown) {
    console.error('Error fetching post by slug:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch post: ${message}`);
  }
}

/**
 * Fetches all published posts for the blog homepage
 * 
 * @param {number} postLimit - Max posts to fetch
 * @returns {Promise<Array>} - Array of posts with category included
 */
export async function getAllPublishedPosts(postLimit = 20) {
  try {
    const postsQuery = query(
      collection(db, POSTS_COLLECTION),
      where('isPublished', '==', true),
      orderBy('publishedAt', 'desc'),
      firestoreLimit(postLimit)
    );

    const querySnapshot = await getDocs(postsQuery);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        category: data.category || 'General',
        publishedAt: data.publishedAt?.toDate().toISOString() || null,
      };
    });
  } catch (error: unknown) {
    console.error('Error fetching all posts:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch posts: ${message}`);
  }
}
