"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function BlogCarousel({ posts = [] }) {
  const featuredPosts = useMemo(
    () => posts.filter((post) => post?.title).slice(0, 6),
    [posts]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayKey, setAutoPlayKey] = useState(0);

  if (featuredPosts.length === 0) {
    return (
      <div className="blog-carousel-empty">
        <p>Nossos especialistas est&atilde;o preparando novos conte&uacute;dos para voc&ecirc;.</p>
      </div>
    );
  }

  const activePost = featuredPosts[activeIndex] || featuredPosts[0];

  useEffect(() => {
    if (featuredPosts.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === featuredPosts.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => window.clearInterval(timer);
  }, [featuredPosts.length, autoPlayKey]);

  function restartAutoPlay() {
    setAutoPlayKey((current) => current + 1);
  }

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? featuredPosts.length - 1 : current - 1
    );
    restartAutoPlay();
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === featuredPosts.length - 1 ? 0 : current + 1
    );
    restartAutoPlay();
  }

  return (
    <div className="blog-carousel">
      <div className="blog-carousel-feature">
        <Link
          href={`/blog/${activePost.slug}`}
          className="blog-carousel-main"
          aria-label={`Ler artigo: ${activePost.title}`}
        >
          {activePost.coverImage && (
            <img src={activePost.coverImage} alt={activePost.title} />
          )}
          <div className="blog-carousel-overlay">
            <div className="blog-carousel-meta">
              <span>{activePost.category || "Geral"}</span>
              <span>{activePost.readingTime}</span>
            </div>
            <h3>{activePost.title}</h3>
            {activePost.excerpt && <p>{activePost.excerpt}</p>}
            
            <div className="blog-carousel-cta">
              <span className="button secondary ghost">Ler artigo completo</span>
            </div>

            <div className="blog-carousel-indicators">
              {featuredPosts.map((_, index) => (
                <div 
                  key={index} 
                  className={`indicator-bar ${index === activeIndex ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </Link>

        {featuredPosts.length > 1 && (
          <div className="blog-carousel-controls" aria-label="Controles do carrossel">
            <button type="button" onClick={goToPrevious} aria-label="Post anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button type="button" onClick={goToNext} aria-label="Proximo post">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {featuredPosts.length > 1 && (
        <div className="blog-carousel-thumbs" aria-label="Posts em destaque">
          {featuredPosts.map((post, index) => (
            <button
              type="button"
              key={post.slug}
              className={index === activeIndex ? "active" : ""}
              onClick={() => {
                setActiveIndex(index);
                restartAutoPlay();
              }}
              aria-label={`Mostrar post: ${post.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              {post.coverImage && <img src={post.coverImage} alt="" />}
              <span>{post.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
