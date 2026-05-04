import Link from "next/link";

export default function InsightsSection({ posts = [] }) {
  return (
    <section className="section insights" id="conteudos">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p className="eyebrow">Conteúdos & Inteligência</p>
        <h2 style={{ maxWidth: '800px', margin: '0 auto' }}>Materiais para lideranças que querem governar com segurança.</h2>
      </div>

      <div className="insight-grid">
        {posts.length > 0 ? (
          posts.slice(0, 3).map((post) => (
            <article className="insight-card" key={post.slug}>
              <span className="category-tag">{post.category || 'Geral'}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="link">
                Ler artigo completo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </article>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'var(--ice)', borderRadius: '16px' }}>
            <p style={{ color: "var(--muted)", margin: 0 }}>Nossos especialistas estão preparando novos conteúdos para você.</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "64px", textAlign: "center" }}>
        <Link href="/blog" className="button primary">
          Explorar todo o blog
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
