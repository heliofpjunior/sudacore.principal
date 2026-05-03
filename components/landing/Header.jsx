"use client";

import { useState } from "react";
import { navItems } from "@/components/landing/content";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
      <a className="brand" href="#inicio" aria-label="Suda Core" onClick={closeMenu}>
        <img src="/logo/horizontal.svg" alt="Suda Core" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="site-nav" aria-label="Navegação principal">
        {navItems.map(([label, href]) => (
          <a href={href} key={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#contato" onClick={closeMenu}>
        Fale conosco
      </a>
    </header>
  );
}
