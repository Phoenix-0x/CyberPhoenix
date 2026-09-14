import { getBlogBySlug, getSortedBlogs } from '@/lib/data/blogs';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './blog.module.css';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = getSortedBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Await params here as per Next.js 15 requirements
  const { slug } = await params;
  
  let blog;
  try {
    blog = getBlogBySlug(slug);
  } catch (e) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <article className={styles.article}>
        <Link href="/blogs" className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Hacklogs
        </Link>
        
        <header className={styles.header}>
          <h1 className={styles.title}>{blog.meta.title}</h1>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <User size={16} />
              <span className={styles.author}>{blog.meta.author}</span>
            </span>
            <span className={styles.metaItem}>
              <Calendar size={16} />
              {new Date(blog.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className={styles.metaItem}>
              <Clock size={16} />
              {blog.meta.readingTime}
            </span>
          </div>
          <div className={styles.tags}>
            {blog.meta.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className={styles.content}>
          <MarkdownRenderer content={blog.content} />
        </div>
      </article>
    </main>
  );
}
