"use client";

import { useMemo, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const fieldConfig = [
  ['title', 'Titulo'],
  ['seoTitle', 'Titulo SEO'],
  ['date', 'Data'],
  ['category', 'Categoria'],
  ['excerpt', 'Resumo'],
  ['keywords', 'Palavras-chave'],
  ['coverImage', 'Imagem de capa'],
  ['ogImage', 'Imagem social'],
  ['author', 'Autor'],
];

const initialMeta = {
  title: 'modelo de markdown',
  seoTitle: 'Blog Sudacore | Gestão, Regularidade e Conformidade',
  date: '2026-05-04',
  category: 'Tecnologia',
  excerpt: 'Este é o nosso primeiro post utilizando Markdown direto do GitHub. Saiba como nossa estrutura sem backend garante performance e segurança.',
  keywords: 'gestão tributária, conformidade, blog sudacore, tecnologia em saúde',
  coverImage: '/images/hero-health-tech.png',
  ogImage: '/images/hero-health-tech.png',
  author: 'Equipe Sudacore',
};

const initialBody = `# 🏆 Modelo Mestre de Markdown para CMS (v2)

Este ficheiro foi desenhado para testar a renderização completa de um sistema de gestão de conteúdos (CMS). Inclui todos os elementos padrão e alguns avançados para garantir que o CSS do seu site suporta todas as variações.

---

## 1. Tipografia e Cabeçalhos

Aqui testamos a escala visual dos títulos:

# Título de Nível 1 (H1)

## Título de Nível 2 (H2)

### Título de Nível 3 (H3)

#### Título de Nível 4 (H4)

##### Título de Nível 5 (H5)

###### Título de Nível 6 (H6)

---

## 2. Formatação de Texto e Ênfase

É fundamental que o corpo do texto seja legível e suporte várias marcações:

- **Negrito:** Para dar destaque forte.
- *Itálico:* Para termos em destaque ou estrangeirismos.
- **_Negrito e Itálico:_** Quando a ênfase precisa de ser máxima.
- ~~Tachado:~~ Para indicar informações removidas ou corrigidas.
- \`Código Inline\`: Usado para variáveis como \`process.env.DATABASE_URL\` ou comandos rápidos.

---

## 3. Listas e Organização de Dados

### 3.1 Lista de Tarefas (Checklist)

Perfeito para tutoriais e roadmaps:

- [x] Configuração inicial do repositório.
- [x] Integração com API de Autenticação.
- [/] Desenvolvimento do Dashboard (Em progresso).
- [ ] Testes de carga e stress.

### 3.2 Listas Clássicas

- **Tecnologias Frontend:**
  - React.js com Next.js
  - Tailwind CSS (Estilização Utilitária)
  - TypeScript (Tipagem Estática)
- **Tecnologias Backend:**
  1.  Node.js (Runtime)
  2.  PostgreSQL (Base de Dados)
  3.  Supabase (BaaS)

---

## 4. Tabelas Comparativas

As tabelas devem ser responsivas e bem alinhadas.

| Funcionalidade    | Plano Base | Plano Pro | Plano Enterprise |
| :---------------- | :--------: | :-------: | :--------------- |
| **Utilizadores**  |   Até 5    | Ilimitado | Customizado      |
| **Armazenamento** |    2GB     |   50GB    | 1TB+             |
| **Suporte**       |   E-mail   | 24/7 Chat | Gestor Dedicado  |
| **API Access**    |  Limitado  |   Total   | Total + SLA      |

---

## 5. Blocos de Código (Syntax Highlighting)

O realce de sintaxe é essencial para blogs técnicos.

---

### Exemplo de Lógica em TypeScript

\`\`\`typescript
interface UserProfile {
  id: string;
  username: string;
  experiencePoints: number;
}

/**
 * Calcula o nível do utilizador baseado no XP
 */
const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100));
};

console.log(\`Nível atual: \${calculateLevel(2500)}\`);
\`\`\`

### Exemplo de citações

> "A simplicidade é o último grau de sofisticação." — Leonardo da Vinci

### Exemplo de Link

Clique [aqui para visitar o Google](https://google.com).

### Exemplo de chamada para acao

Use o titulo \`cta\` no link para transformar o link em botao:

[Fale com um especialista](/#contato "cta")

---

### Exemplo de Imagem

![Exemplo de imagem](https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

### Exemplo de Vídeo

[youtube](https://youtu.be/jNQXAC9IVRw?si=1mCFiGg42V1U6zE2)
`;

const examples = [
  {
    label: 'Titulo',
    value: '\n## Novo subtitulo\n\nTexto da secao.\n',
  },
  {
    label: 'Lista',
    value: '\n- Item importante\n- Item complementar\n- Proximo passo\n',
  },
  {
    label: 'Checklist',
    value: '\n- [x] Etapa concluida\n- [ ] Etapa pendente\n',
  },
  {
    label: 'Tabela',
    value: '\n| Coluna A | Coluna B |\n| :------- | :------: |\n| Valor | Status |\n',
  },
  {
    label: 'Imagem',
    value: '\n![Descricao da imagem](/images/hero-health-tech.png)\n',
  },
  {
    label: 'YouTube',
    value: '\n[youtube](https://youtu.be/jNQXAC9IVRw)\n',
  },
  {
    label: 'Codigo',
    value: '\n```javascript\nconst status = "publicado";\nconsole.log(status);\n```\n',
  },
];

function quoteYaml(value) {
  return `"${String(value || '').replace(/"/g, '\\"')}"`;
}

function slugify(value) {
  return String(value || 'post')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildMarkdown(meta, body) {
  const frontMatter = fieldConfig
    .map(([key]) => `${key}: ${quoteYaml(meta[key])}`)
    .join('\n');

  return `---\n${frontMatter}\n---\n\n${body.trim()}\n`;
}

export default function BlogPostEditor() {
  const [meta, setMeta] = useState(initialMeta);
  const [body, setBody] = useState(initialBody);

  const markdown = useMemo(() => buildMarkdown(meta, body), [meta, body]);
  const fileName = `${slugify(meta.title)}.md`;

  function updateField(key, value) {
    setMeta((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function insertExample(value) {
    setBody((current) => `${current.trimEnd()}\n${value}`);
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown);
  }

  return (
    <main className="editor-shell">
      <section className="editor-hero">
        <p className="eyebrow">Sudacore CMS</p>
        <h1>Editor de posts Markdown</h1>
        <p>
          Crie arquivos para <code>content/posts</code> com os metadados do blog,
          exemplos prontos e preview usando a mesma renderizacao do site.
        </p>
      </section>

      <section className="editor-grid" aria-label="Editor de conteudo">
        <div className="editor-panel">
          <div className="editor-panel-header">
            <h2>Metadados</h2>
            <span>{fileName}</span>
          </div>

          <div className="editor-fields">
            {fieldConfig.map(([key, label]) => (
              <label className="editor-field" key={key}>
                <span>{label}</span>
                {key === 'excerpt' ? (
                  <textarea
                    value={meta[key]}
                    rows={3}
                    onChange={(event) => updateField(key, event.target.value)}
                  />
                ) : (
                  <input
                    type={key === 'date' ? 'date' : 'text'}
                    value={meta[key]}
                    onChange={(event) => updateField(key, event.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="editor-panel editor-compose">
          <div className="editor-panel-header">
            <h2>Conteudo</h2>
            <div className="editor-actions">
              <button type="button" onClick={copyMarkdown}>
                Copiar
              </button>
              <button type="button" className="primary" onClick={downloadMarkdown}>
                Baixar .md
              </button>
            </div>
          </div>

          <div className="editor-examples" aria-label="Exemplos Markdown">
            {examples.map((example) => (
              <button type="button" key={example.label} onClick={() => insertExample(example.value)}>
                {example.label}
              </button>
            ))}
          </div>

          <textarea
            className="editor-markdown-input"
            value={body}
            spellCheck="false"
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
      </section>

      <section className="editor-preview" aria-label="Preview do post">
        <div className="editor-preview-meta">
          <span className="category-tag">{meta.category || 'Geral'}</span>
          <span>{meta.date}</span>
          <span>{meta.author}</span>
        </div>
        <h1>{meta.title}</h1>
        <p>{meta.excerpt}</p>
        {meta.coverImage ? <img src={meta.coverImage} alt={meta.title} /> : null}
        <div className="blog-content">
          <MarkdownRenderer content={body} />
        </div>
      </section>
    </main>
  );
}
