import { BenefitCard } from "@/components/landing/cards";
import { benefits } from "@/components/landing/content";

export default function BenefitsSection() {
  return (
    <section className="section benefits" id="beneficios">
      <div className="section-heading">
        <p className="eyebrow">Benefícios</p>
        <h2>Menos improviso na operação. Mais segurança para a missão.</h2>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}
      </div>
    </section>
  );
}
