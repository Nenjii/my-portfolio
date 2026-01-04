import { redirect } from "next/navigation";

export default function BlogSlugRedirect({ params }: { params: { slug?: string } }) {
  // Safeguard: if slug is missing, bounce to the posts index.
  const slug = params?.slug;

  if (!slug) {
    redirect("https://thewalkingparadox.vercel.app/posts");
  }

  // Encode to handle any stray characters safely.
  const encodedSlug = encodeURIComponent(slug);
  redirect(`https://thewalkingparadox.vercel.app/posts/${encodedSlug}`);
}
