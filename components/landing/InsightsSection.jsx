import Link from "next/link";
import BlogCarousel from "@/components/landing/BlogCarousel";

export default function InsightsSection({ posts = [] }) {
  return (
    <section className="section insights" id="conteudos">
      <BlogCarousel posts={posts} />

      <div className="section-heading insights-heading">
        <p className="eyebrow">Conte&uacute;dos &amp; Intelig&ecirc;ncia</p>
        <h2>Ideias pr&aacute;ticas para lideran&ccedil;as que querem decidir com seguran&ccedil;a.</h2>
        <p className="section-lead">
          Artigos para atrair novas conversas, nutrir clientes e transformar temas complexos em decis&atilde;o de gest&atilde;o.
        </p>
      </div>

      <div className="insights-action">
        <Link href="/blog" className="button primary">
          Explorar todo o blog
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "10px" }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
