"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/components/landing/content";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
      <Link href="/" className="brand" aria-label="Suda Core" onClick={closeMenu}>
        <img src="/logo/horizontal.svg" alt="Suda Core" />
      </Link>

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
          <Link href={href} key={href} onClick={closeMenu}>
            {label}
          </Link>
        ))}
      </nav>

      <Link href="/#contato" className="header-cta" onClick={closeMenu}>
        Fale conosco
      </Link>
    </header>
  );
}
