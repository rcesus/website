import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileShell from "../../ProfileShell";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  const mostRecent = allPosts[0];
  const previous = allPosts[index + 1];

  return (
    <ProfileShell>
      <section className="blog-section">
        <header className="main-section-header">
          <h2 className="main-section-h2">{post.title}</h2>
        </header>

        <p className="blog-meta">
          {formatDate(post.date)}
          {post.category ? ` · ${post.category}` : ""}
        </p>

        <article
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <nav className="blog-nav">
          {mostRecent.slug !== slug ? (
            <span>[<Link href={`/blog/${mostRecent.slug}`}>{mostRecent.title}</Link>]</span>
          ) : (
            <span />
          )}
          <span>[<Link href="/blog">Back to Blog Entries</Link>]</span>
          {previous ? (
            <span>[<Link href={`/blog/${previous.slug}`}>{previous.title}</Link>]</span>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </ProfileShell>
  );
}
