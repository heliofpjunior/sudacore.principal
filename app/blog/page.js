import { getSortedPostsData, getAllCategories } from '../../lib/markdown';
import Header from '../../components/landing/Header';
import Footer from '../../components/landing/Footer';
import BlogListing from '../../components/landing/BlogListing';

export const metadata = {
  title: 'Blog | Sudacore',
  description: 'Insights e novidades sobre tecnologia, gestão e saúde.',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <BlogListing initialPosts={allPostsData} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
