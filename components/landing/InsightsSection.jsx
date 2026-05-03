import { insightLinks } from "@/components/landing/content";

export default function InsightsSection() {
  return (
    <section className="section insights" id="conteudos">
      <div>
        <p className="eyebrow">Conteúdos</p>
        <h2>Materiais para lideranças que querem governar com segurança.</h2>
      </div>

      <div className="insight-list">
        {insightLinks.map((link) => (
          <a href="#contato" key={link}>
            {link}
          </a>
        ))}
      </div>
    </section>
  );
}
