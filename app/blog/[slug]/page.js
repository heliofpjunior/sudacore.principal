import { getPostData, getSortedPostsData } from '../../../lib/markdown';
import Link from 'next/link';
import Header from '../../../components/landing/Header';
import Footer from '../../../components/landing/Footer';
import MarkdownRenderer from '../../../components/blog/MarkdownRenderer';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: postData.seoTitle || `${postData.title} | Sudacore`,
    description: postData.excerpt,
    keywords: postData.keywords,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      publishedTime: postData.date,
      authors: [postData.author],
      images: [
        {
          url: postData.ogImage || postData.coverImage || '/logo/app.svg',
          width: 1200,
          height: 630,
          alt: postData.title,
        },
      ],
    },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const allPosts = getSortedPostsData();
  
  // Get 3 related posts (excluding current)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    image: postData.coverImage,
    datePublished: postData.date,
    author: {
      '@type': 'Person',
      name: postData.author,
    },
    description: postData.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <article className="blog-container" style={{ backgroundColor: 'white' }}>
        <Link href="/blog" className="blog-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar para o Blog
        </Link>

        {postData.coverImage && (
          <img 
            src={postData.coverImage} 
            alt={postData.title} 
            className="blog-card-image"
            style={{ height: 'auto', maxHeight: '500px', borderRadius: '24px', marginBottom: '40px', boxShadow: 'var(--shadow)' }}
          />
        )}

        <header className="blog-post-header">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span className="category-tag" style={{ margin: 0 }}>{postData.category || 'Geral'}</span>
            <span style={{ color: 'var(--line)', fontSize: '0.8rem' }}>|</span>
            <span className="blog-date" style={{ margin: 0 }}>{postData.date}</span>
            <span style={{ color: 'var(--line)', fontSize: '0.8rem' }}>|</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{postData.readingTime}</span>
          </div>
          <h1 className="blog-title" style={{ marginBottom: '16px', marginTop: '0' }}>
            {postData.title}
          </h1>
          <div className="blog-post-meta">
            Escrito por {postData.author}
          </div>
        </header>

        <div className="blog-content">
          <MarkdownRenderer content={postData.content} />
        </div>

        {relatedPosts.length > 0 && (
          <section style={{ marginTop: '80px', borderTop: '1px solid var(--line)', paddingTop: '40px' }}>
            <h2 className="blog-card-title" style={{ marginBottom: '32px' }}>Leia também</h2>
            <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
              {relatedPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card" style={{ textDecoration: 'none' }}>
                  <div className="blog-card-content" style={{ padding: '24px' }}>
                    <span className="blog-date" style={{ fontSize: '0.8rem' }}>{post.date}</span>
                    <h3 className="blog-card-title" style={{ fontSize: '1.2rem', marginTop: '8px' }}>{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
