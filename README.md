# Landing page Suda Core em Next.js

Projeto em Next.js criado a partir dos ativos da pasta `logo`, pronto para deploy na Vercel.

## Análise da marca

- Uso principal: versão horizontal no cabeçalho (`logo/horizontal.svg`).
- Paleta observada nos SVGs: azul profundo `#00002b`, teal `#008080`, teal de apoio `#009a8c`, azul escuro `#0b1d2a` e gelo `#dbe3e2`.
- Tipografia dos arquivos vetoriais: Poppins. O CSS usa `Poppins` quando disponível no sistema e cai para fontes seguras.
- Tom visual: compliance B2B, proteção, controle, conformidade, com layout objetivo e executivo.

## Arquivos

- `app/layout.js`: metadados e layout raiz.
- `app/page.js`: página inicial.
- `components/LandingPage.jsx`: landing page e interações.
- `app/globals.css`: identidade visual, responsividade e estados.
- `public/logo/`: ativos servidos pela aplicação.
- `logo/`: ativos originais da marca.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Deploy na Vercel

Suba este diretório para um repositório Git e importe na Vercel. A Vercel detecta o Next.js automaticamente e usa `npm run build`.
