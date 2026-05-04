"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function BlogListing({ initialPosts, categories }) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredPosts = activeCategory === 'Todos' 
    ? initialPosts 
    : initialPosts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-container">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 className="blog-title">Explorar Inteligência</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Conteúdo especializado para fortalecer a gestão e conformidade da sua organização.
        </p>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {filteredPosts.map(({ slug, date, title, excerpt, coverImage, readingTime, category }) => (
          <article key={slug} className="blog-card">
            <Link href={`/blog/${slug}`}>
              {coverImage && (
                <img 
                  src={coverImage} 
                  alt={title} 
                  className="blog-card-image"
                />
              )}
              <div className="blog-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="category-tag">{category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{readingTime}</span>
                </div>
                <h2 className="blog-card-title">{title}</h2>
                <p className="blog-card-excerpt">{excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span className="blog-date" style={{ margin: 0 }}>{date}</span>
                  <div className="blog-link">
                    Ler mais
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Nenhum artigo encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}
