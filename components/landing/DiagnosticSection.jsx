import { diagnosticItems } from "@/components/landing/content";

export default function DiagnosticSection() {
  return (
    <section className="section diagnostic">
      <div className="diagnostic-layout">
        <div>
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
        </div>

        <aside className="data-feature" aria-label="Inteligência de dados e gestão">
          <img
            src="/images/beneficios.png"
            alt="Atendimento administrativo com orientação sobre documentos e benefícios"
          />
          <div>
            <p className="eyebrow">Orientação próxima</p>
            <h3>Diagnóstico com escuta, evidência e plano possível de executar.</h3>
          </div>
        </aside>
      </div>
    </section>
  );
}
