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

import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Collection reference constant
 * WHY: Single source of truth for collection name, prevents typos
 */
const POSTS_COLLECTION = 'posts';

/**
 * Post interface for type safety
 */
export interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

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
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    // Re-throw with context for better debugging
    throw new Error(`Failed to fetch latest posts: ${error instanceof Error ? error.message : String(error)}`);
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
export async function createPost(postData: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  isPublished?: boolean;
  tags?: string[];
}) {
  try {
    // Validate required fields before sending to Firestore
    if (!postData.title || !postData.slug || !postData.content) {
      throw new Error('Missing required fields: title, slug, or content');
    }

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
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error(`Failed to create post: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * COPY-PASTE VERSION FOR PORTFOLIO SITE
 * =====================================
 * If your portfolio is a separate project, copy the function below.
 * You'll also need to copy firebase.js and install firebase package.
 * 
 * npm install firebase
 * 
 * Then in your portfolio:
 * 
 * // app/page.js (Server Component)
 * import { getLatestPosts } from '@/lib/posts';
 * 
 * export default async function Home() {
 *   const latestPosts = await getLatestPosts(6);
 *   
 *   return (
 *     <section>
 *       <h2>Latest Posts</h2>
 *       {latestPosts.map(post => (
 *         <article key={post.id}>
 *           <img src={post.coverImage} alt={post.title} />
 *           <h3>{post.title}</h3>
 *           <p>{post.excerpt}</p>
 *           <a href={`https://your-blog.com/posts/${post.slug}`}>
 *             Read More
 *           </a>
 *         </article>
 *       ))}
 *     </section>
 *   );
 * }
 */

/**
 * Fetches all posts (published and drafts) for admin dashboard
 * 
 * USE CASE: Admin dashboard to manage all posts
 */
export async function getAllPosts() {
  try {
    const postsQuery = query(
      collection(db, POSTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(postsQuery);

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        isPublished: data.isPublished,
        content: data.content,
        createdAt: data.createdAt?.toDate().toISOString() || null,
        updatedAt: data.updatedAt?.toDate().toISOString() || null,
        publishedAt: data.publishedAt?.toDate().toISOString() || null,
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw new Error(`Failed to fetch all posts: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Fetches a single post by ID
 */
export async function getPostById(postId: string) {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Post not found');
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      isPublished: data.isPublished,
      createdAt: data.createdAt?.toDate().toISOString() || null,
      updatedAt: data.updatedAt?.toDate().toISOString() || null,
      publishedAt: data.publishedAt?.toDate().toISOString() || null,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error(`Failed to fetch post: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Updates an existing post
 */
export async function updatePost(postId: string, postData: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>>) {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postId);
    
    const updateData: Record<string, unknown> = {
      ...postData,
      updatedAt: serverTimestamp(),
    };

    // If publishing for the first time, set publishedAt
    if (postData.isPublished) {
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.data();
      if (currentData && !currentData.publishedAt) {
        updateData.publishedAt = serverTimestamp();
      }
    } else {
      // If unpublishing, clear publishedAt
      updateData.publishedAt = null;
    }

    await updateDoc(docRef, updateData);

    return { id: postId, ...updateData };
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error(`Failed to update post: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Deletes a post by ID
 */
export async function deletePost(postId: string) {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postId);
    await deleteDoc(docRef);
    return { success: true, id: postId };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error(`Failed to delete post: ${error instanceof Error ? error.message : String(error)}`);
  }
}
