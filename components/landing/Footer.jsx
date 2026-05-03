import { navItems } from "@/components/landing/content";

const footerServices = [
  "Gestão tributária e fiscal",
  "Gestão administrativa",
  "Conformidade e governança",
  "Regularização institucional",
  "Prestação de contas",
];

const footerSectors = [
  "Cooperativas",
  "Associações e ONGs",
  "Igrejas e terceiro setor",
  "Clínicas e farmácias",
  "Benefícios ao trabalhador e sindicatos",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div>
          <p className="eyebrow">Suda Core</p>
          <h2>Gestão, regularidade e conformidade para decisões mais seguras.</h2>
        </div>
        <a className="button primary" href="#contato">
          Solicitar diagnóstico
        </a>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <img src="/logo/monocromatico_branco.svg" alt="Suda Core" />
          <p>
            Assessoria tributária, fiscal, administrativa e de conformidade para
            organizações que precisam proteger sua missão, sua operação e sua
            reputação.
          </p>
        </div>

        <FooterColumn title="Navegação">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
          <a href="#contato">Contato</a>
        </FooterColumn>

        <FooterColumn title="Soluções">
          {footerServices.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </FooterColumn>

        <FooterColumn title="Setores">
          {footerSectors.map((sector) => (
            <span key={sector}>{sector}</span>
          ))}
        </FooterColumn>

        <FooterColumn title="Contato">
          <span>Atendimento inicial pelo formulário da página.</span>
          <span>Diagnóstico para entender cenário, riscos e próximos passos.</span>
          <a href="#contato">Falar com a Suda Core</a>
        </FooterColumn>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Suda Core. Todos os direitos reservados.</span>
        <span>Gestão responsável, clareza documental e conformidade aplicada.</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div className="footer-column">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
