'use client';

import { useEffect, useState } from 'react';
import { deletePost, listPosts, getPost } from './actions';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
}

interface PostsListProps {
  onEdit: (slug: string, data: any) => void;
}

interface GroupedPosts {
  [key: string]: Post[];
}

function formatMonthYear(date: string): { monthYear: string; sortKey: string } {
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) {
      return { monthYear: date, sortKey: date };
    }
    const year = d.getFullYear();
    const month = d.toLocaleString('en-US', { month: 'long' });
    return {
      monthYear: `${year} - ${month}`,
      sortKey: `${year}-${String(d.getMonth() + 1).padStart(2, '0')}`
    };
  } catch {
    return { monthYear: date, sortKey: date };
  }
}

export default function PostsList({ onEdit }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await listPosts();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setMessage(`Error loading posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  const handleEdit = async (slug: string) => {
    try {
      const postData = await getPost(slug);
      onEdit(slug, postData);
    } catch (error) {
      setMessage(`Error loading post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Delete "${slug}"?`)) return;

    try {
      await deletePost(slug);
      setPosts(posts.filter(p => p.slug !== slug));
      setMessage(`✓ Post deleted!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading posts...</div>;
  }

  // Group posts by month/year
  const grouped: GroupedPosts = {};
  const groupOrder: string[] = [];

  posts.forEach((post) => {
    const { monthYear } = formatMonthYear(post.date);
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
      groupOrder.push(monthYear);
    }
    grouped[monthYear].push(post);
  });

  // Sort groups by date (most recent first)
  groupOrder.sort((a, b) => {
    const aDate = grouped[a][0].date;
    const bDate = grouped[b][0].date;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return (
    <div className="posts-list-section">
      {posts.length === 0 ? (
        <p className="empty-message">No posts yet. Create your first one!</p>
      ) : (
        <div className="posts-grouped">
          {groupOrder.map((monthYear) => (
            <div key={monthYear} className="posts-month-group">
              <h3 className="posts-month-header">{monthYear}</h3>
              <div className="posts-month-list">
                {grouped[monthYear].map((post) => (
                  <div key={post.slug} className="posts-row">
                    <div className="post-info">
                      <div className="post-title">{post.title}</div>
                      <div className="post-meta">
                        {post.date && <span>{post.date}</span>}
                        {post.category && <span>{post.category}</span>}
                      </div>
                    </div>
                    <div className="post-actions">
                      <button
                        onClick={() => handleEdit(post.slug)}
                        className="btn-edit"
                        title="Edit post"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="btn-delete"
                        title="Delete post"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {message && <p className="editor-message">{message}</p>}
    </div>
  );
}
