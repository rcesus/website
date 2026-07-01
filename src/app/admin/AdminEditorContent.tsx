'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BlogEditor from './BlogEditor';
import PostsList from './PostsList';
import { savePost, checkAdminSession, clearAdminSessionAction } from './actions';

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
}

type ViewMode = 'list' | 'create' | 'edit';

interface EditingPost {
  slug: string;
  data: PostData;
}

export default function AdminEditorContent() {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingPost, setEditingPost] = useState<EditingPost | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      const isValid = await checkAdminSession();
      if (!isValid) {
        router.push('/admin');
      } else {
        setIsAuth(true);
        setIsChecking(false);
      }
    };
    verifySession();
  }, [router]);

  const handleSave = async (data: PostData, slug: string) => {
    try {
      await savePost(data, slug);
      setViewMode('list');
      setEditingPost(null);
    } catch (error) {
      throw new Error(`Failed to save post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleEditPost = (slug: string, data: PostData) => {
    setEditingPost({ slug, data });
    setViewMode('edit');
  };

  const handleCancelEdit = () => {
    setViewMode('list');
    setEditingPost(null);
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setViewMode('create');
  };

  const handleLogout = async () => {
    await clearAdminSessionAction();
    router.push('/admin');
  };

  if (isChecking) {
    return <div className="admin-loading">Loading...</div>;
  }

  if (!isAuth) {
    return null;
  }

  return (
    <section className="admin-section">
      <header className="main-section-header">
        <div className="editor-header">
          <h2 className="main-section-h2">Blog Editor</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {viewMode === 'list' && (
        <>
          <div className="editor-actions">
            <button onClick={handleCreateNew} className="create-btn">
              + New Post
            </button>
          </div>
          <PostsList onEdit={handleEditPost} />
        </>
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <>
          <div className="editor-header-with-back">
            <button onClick={handleCancelEdit} className="back-btn" title="Back to posts list">
              ← Back
            </button>
            <h3>{editingPost ? `Edit: ${editingPost.data.title}` : 'Create New Post'}</h3>
          </div>
          <BlogEditor
            initialData={editingPost?.data}
            initialSlug={editingPost?.slug}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        </>
      )}

      <nav className="admin-nav">
        <span>[<Link href="/blog">View Blog</Link>]</span>
        <span>[<Link href="/">Home</Link>]</span>
      </nav>
    </section>
  );
}
