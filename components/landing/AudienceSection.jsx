import { sectors } from "@/components/landing/content";

export default function AudienceSection() {
  return (
    <section className="section audience" id="setores">
      <div className="section-heading">
        <p className="eyebrow">Setores atendidos</p>
        <h2>Atuação especializada para organizações que lidam com confiança pública, fiscal e regulatória.</h2>
      </div>

      <div className="audience-grid">
        {sectors.map((sector) => (
          <article key={sector.title}>
            <h3>{sector.title}</h3>
            <p>{sector.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
