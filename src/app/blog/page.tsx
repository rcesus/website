import Link from "next/link";
import ProfileShell from "../ProfileShell";
import { getAllPosts } from "@/lib/posts";
import BlogArchiveContent from "./BlogArchiveContent";

export default function BlogArchive() {
  const posts = getAllPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <ProfileShell>
      <BlogArchiveContent posts={posts} allTags={allTags} />
    </ProfileShell>
  );
}
