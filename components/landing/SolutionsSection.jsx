import { SolutionCard } from "@/components/landing/cards";
import { solutions } from "@/components/landing/content";

export default function SolutionsSection() {
  return (
    <section className="section intro" id="solucoes">
      <div className="section-heading">
        <p className="eyebrow">Soluções</p>
        <h2>Uma assessoria completa para organizações que precisam operar com segurança.</h2>
        <p className="section-lead">
          A regularidade de uma organização não depende apenas de boa vontade.
          Ela exige documentos coerentes, obrigações em dia, processos claros,
          decisões registradas e controles que sustentem a confiança de
          dirigentes, membros, pacientes, trabalhadores, cooperados, parceiros,
          clientes e órgãos públicos.
        </p>
      </div>

      <div className="solutions-grid">
        {solutions.map((solution) => (
          <SolutionCard key={solution.number} {...solution} />
        ))}
      </div>
    </section>
  );
}
