import { diagnosticItems } from "@/components/landing/content";

export default function DiagnosticSection() {
  return (
    <section className="section diagnostic">
      <div className="section-heading">
        <p className="eyebrow">Diagnóstico institucional</p>
        <h2>O que avaliamos antes de propor qualquer solução.</h2>
      </div>

      <div className="diagnostic-grid">
        {diagnosticItems.map((item) => (
          <div key={item}>
            <span aria-hidden="true">✓</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
