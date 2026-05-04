"use client";

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

function getNodeText(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (node?.props?.children) {
    return getNodeText(node.props.children);
  }

  return '';
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function getYouTubeId(value) {
  try {
    const url = new URL(value);

    if (url.hostname === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] || null;
    }

    if (url.hostname.endsWith('youtube.com')) {
      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/').filter(Boolean)[1] || null;
      }

      return url.searchParams.get('v');
    }
  } catch {
    return null;
  }

  return null;
}

function YouTubeEmbed({ id, title }) {
  return (
    <span className="markdown-video" role="figure" aria-label={title}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </span>
  );
}

function Heading({ as: Tag, children }) {
  const text = getNodeText(children);
  const id = slugify(text);

  return (
    <Tag id={id} className="markdown-heading">
      <a href={`#${id}`} className="markdown-heading-anchor" aria-label={`Link para ${text}`}>
        #
      </a>
      {children}
    </Tag>
  );
}

function MarkdownLink({ href = '', children, ...props }) {
  const label = getNodeText(children).trim().toLowerCase();
  const youTubeId = getYouTubeId(href);
  const shouldEmbedVideo = youTubeId && ['youtube', 'video', 'vídeo'].includes(label);

  if (shouldEmbedVideo) {
    return <YouTubeEmbed id={youTubeId} title={getNodeText(children) || 'Video do YouTube'} />;
  }

  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <Heading as="h1">{children}</Heading>,
        h2: ({ children }) => <Heading as="h2">{children}</Heading>,
        h3: ({ children }) => <Heading as="h3">{children}</Heading>,
        h4: ({ children }) => <Heading as="h4">{children}</Heading>,
        h5: ({ children }) => <Heading as="h5">{children}</Heading>,
        h6: ({ children }) => <Heading as="h6">{children}</Heading>,
        a: MarkdownLink,
        img: ({ alt = '', ...props }) => (
          <span className="markdown-image" role="figure" aria-label={alt || undefined}>
            <img alt={alt} loading="lazy" {...props} />
            {alt ? <span className="markdown-image-caption">{alt}</span> : null}
          </span>
        ),
        table: ({ children }) => (
          <div className="markdown-table-wrap">
            <table>{children}</table>
          </div>
        ),
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const code = String(children).replace(/\n$/, '');

          if (inline || !match) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '24px',
                background: 'transparent',
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                },
              }}
              {...props}
            >
              {code}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
