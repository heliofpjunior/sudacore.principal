import "./globals.css";

export const metadata = {
  title: "Suda Core | Gestão, regularidade e conformidade",
  description:
    "Assessoria tributária, fiscal, administrativa e de conformidade para terceiro setor, saúde, farmácias, benefícios ao trabalhador e sindicatos.",
  icons: {
    icon: "/logo/app.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
