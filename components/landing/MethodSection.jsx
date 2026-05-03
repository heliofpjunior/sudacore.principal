import { methodSteps } from "@/components/landing/content";

export default function MethodSection() {
  return (
    <section className="section about" id="metodo">
      <div className="about-copy">
        <p className="eyebrow">Método Suda Core</p>
        <h2>Diagnóstico claro, execução acompanhada e gestão que permanece.</h2>
        <p>
          Entramos na rotina da instituição para entender o que existe, o que
          está pendente, o que representa risco e o que precisa virar processo.
          A partir disso, construímos um plano de ação aplicável, com ordem de
          prioridade, responsáveis, documentos necessários e acompanhamento.
        </p>
      </div>

      <div className="about-list">
        {methodSteps.map((step) => (
          <div key={step.title}>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
