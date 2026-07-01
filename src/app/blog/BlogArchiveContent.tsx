import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
}

interface BlogArchiveContentProps {
  posts: Post[];
  allTags: string[];
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

export default function BlogArchiveContent({ posts }: BlogArchiveContentProps) {
  return (
    <section className="blog-section">
      <header className="main-section-header">
        <h2 className="main-section-h2">RC&apos;s Blog</h2>
      </header>

      <ul className="blog-archive">
        {posts.map((post) => (
          <li key={post.slug} className="blog-archive-item">
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="blog-meta">
              {formatDate(post.date)}
              {post.category ? ` · ${post.category}` : ""}
            </p>
            <p className="blog-excerpt">{post.excerpt}</p>
            {post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="blog-tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
