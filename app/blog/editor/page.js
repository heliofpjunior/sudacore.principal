import BlogPostEditor from '../../../components/blog/BlogPostEditor';
import Footer from '../../../components/landing/Footer';
import Header from '../../../components/landing/Header';

export const metadata = {
  title: 'Editor Markdown | Sudacore',
  description: 'Ferramenta interna para criar posts Markdown do blog Sudacore.',
};

export default function BlogEditorPage() {
  return (
    <>
      <Header />
      <BlogPostEditor />
      <Footer />
    </>
  );
}
