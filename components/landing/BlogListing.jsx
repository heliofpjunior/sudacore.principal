"use client";

import { useState } from "react";
import Link from "next/link";

export default function BlogListing({ initialPosts, categories }) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPosts =
    activeCategory === "Todos"
      ? initialPosts
      : initialPosts.filter((post) => post.category === activeCategory);
  const [featuredPost, ...otherPosts] = filteredPosts;
  const leftTextPost = otherPosts.slice(0, 1);
  const secondaryPosts = otherPosts.slice(1, 3);
  const centerBottomPosts = otherPosts.slice(3, 5);
  const catalogPosts = otherPosts.slice(5);

  return (
    <div className="blog-portal">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {featuredPost && (
        <>
          <div className="nyt-edition-line">
            <span>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>Sudacore Insights • Edição Digital</span>
          </div>
          <section className="nyt-grid">
          {/* Coluna Esquerda: Texto do Post Principal + 1 Post de Texto */}
          <div className="nyt-left">
            <article className={`nyt-lead-content ${leftTextPost.length > 0 ? 'has-footer' : ''}`}>
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="news-meta compact">
                  <span>{featuredPost.category || "Geral"}</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
              </Link>
            </article>

            {leftTextPost.length > 0 && (
              <div className="nyt-sidebar-text">
                {leftTextPost.map((post) => (
                  <article key={post.slug} className="nyt-text-only">
                    <Link href={`/blog/${post.slug}`}>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Central: Imagem do Post Principal + Newsletter + 2 Posts de Texto */}
          <div className="nyt-center">
            <Link href={`/blog/${featuredPost.slug}`} className="nyt-main-image">
              {featuredPost.coverImage && (
                <img src={featuredPost.coverImage} alt={featuredPost.title} />
              )}
            </Link>

            <div className="nyt-newsletter-banner">
              <div className="nyt-newsletter-content">
                <h3>Acompanhe as novidades</h3>
                <p>Receba nossos insights e análises diretamente no seu e-mail.</p>
                <Link href="/#contato" className="nyt-newsletter-btn">
                  Assinar Newsletter
                </Link>
              </div>
            </div>
            
            {centerBottomPosts.length > 0 && (
              <div className="nyt-center-text">
                {centerBottomPosts.map((post) => (
                  <article key={post.slug} className="nyt-text-only">
                    <Link href={`/blog/${post.slug}`}>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Direita: 2 Posts Secundários com Imagem e Texto */}
          <div className="nyt-right">
            {secondaryPosts.map((post) => (
              <article key={post.slug} className="nyt-side-card">
                <Link href={`/blog/${post.slug}`}>
                  {post.coverImage && (
                    <div className="nyt-image-wrap">
                      <img src={post.coverImage} alt={post.title} />
                    </div>
                  )}
                  <div className="nyt-side-content">
                    <span className="category-tag">{post.category || "Geral"}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </>
    )}

      {catalogPosts.length > 0 && (
        <section className="news-catalog">
          <div className="news-section-title">
            <h2>Mais recentes</h2>
            <Link href="/#contato">Fale com um especialista</Link>
          </div>

          <div className="news-grid">
            {catalogPosts.map(({ slug, date, title, excerpt, coverImage, readingTime, category }) => (
              <article key={slug} className="news-card">
                <Link href={`/blog/${slug}`}>
                  {coverImage && <img src={coverImage} alt={title} />}
                  <div className="news-card-content">
                    <div className="news-meta compact">
                      <span>{category || "Geral"}</span>
                      <span>{readingTime}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                    <span className="news-date">{date}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {filteredPosts.length === 0 && (
        <div className="blog-empty-state">
          <p>Nenhum artigo encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}
