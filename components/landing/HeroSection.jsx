import { SignalCard } from "@/components/landing/cards";

export default function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <p className="eyebrow">Gestão, conformidade e proteção institucional</p>
        <h1>Assessoria que organiza, protege e fortalece sua instituição.</h1>
        <p className="hero-copy">
          A Suda Core atua na gestão tributária, fiscal, administrativa e de
          conformidade para cooperativas, associações, ONGs, igrejas, clínicas,
          farmácias, empresas de benefícios ao trabalhador e sindicatos.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#solucoes">
            Conheça nossas soluções
          </a>
          <a className="button secondary" href="#contato">
            Solicitar diagnóstico
          </a>
        </div>
      </div>

      <div className="hero-panel" aria-label="Visão de gestão, controle e conformidade">
        <div className="panel-top">
          <img src="/logo/app.svg" alt="" />
          <div>
            <span>Gestão institucional e regulada</span>
            <strong>Rotina sob controle</strong>
          </div>
        </div>

        <div className="risk-card">
          <div>
            <span>Prioridade do diagnóstico</span>
            <strong>Regularidade fiscal e administrativa</strong>
          </div>
          <div className="meter" aria-hidden="true">
            <span />
          </div>
        </div>

        <div className="signal-grid">
          <SignalCard label="Fiscal" icon="document" />
          <SignalCard label="Gestão" icon="shield" />
          <SignalCard label="Conformidade" icon="check" />
        </div>
      </div>
    </section>
  );
}
