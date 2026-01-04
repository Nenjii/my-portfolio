import { redirect } from "next/navigation";

export default function BlogRedirect() {
  // Send the blog index to the external posts listing.
  redirect("https://thewalkingparadox.vercel.app/posts");
}
