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
  title: 'Novo artigo Sudacore',
  seoTitle: 'Blog Sudacore | Gestao, Regularidade e Conformidade',
  date: new Date().toISOString().slice(0, 10),
  category: 'Tecnologia',
  excerpt: 'Resumo curto do artigo para listagens, SEO e redes sociais.',
  keywords: 'gestao tributaria, conformidade, saude, sudacore',
  coverImage: '/images/hero-health-tech.png',
  ogImage: '/images/hero-health-tech.png',
  author: 'Equipe Sudacore',
};

const initialBody = `# Titulo do artigo

Introducao do conteudo com **destaques importantes** e contexto para o leitor.

## Secao principal

- Primeiro ponto
- Segundo ponto
- Terceiro ponto

> Use citacoes para destacar ideias, alertas ou trechos relevantes.

## Exemplo de tabela

| Item | Status | Observacao |
| :--- | :----: | :--------- |
| Diagnostico | Pronto | Base revisada |
| Plano de acao | Em andamento | Validar prioridades |

## Exemplo de imagem

![Exemplo de imagem](/images/hero-health-tech.png)

## Exemplo de video

[youtube](https://youtu.be/jNQXAC9IVRw)
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
