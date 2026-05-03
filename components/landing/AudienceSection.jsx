import { sectors, sectorStories } from "@/components/landing/content";

export default function AudienceSection() {
  return (
    <section className="section audience" id="setores">
      <div className="section-heading">
        <p className="eyebrow">Setores atendidos</p>
        <h2>Atuação especializada para organizações que lidam com confiança pública, fiscal e regulatória.</h2>
      </div>

      <div className="sector-stories">
        {sectorStories.map((story) => (
          <article key={story.title}>
            <img src={story.image} alt={story.alt} />
            <div>
              <p className="eyebrow">{story.eyebrow}</p>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </div>
          </article>
        ))}
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
