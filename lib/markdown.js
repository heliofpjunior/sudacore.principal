import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getSortedPostsData(category = null) {
  // Get file names under /content/posts
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Calculate reading time
      const wordsPerMinute = 200;
      const noOfWords = content.split(/\s+/g).length;
      const minutes = Math.ceil(noOfWords / wordsPerMinute);
      const readingTime = `${minutes} min de leitura`;

      // Combine the data with the slug
      return {
        slug,
        readingTime,
        category: data.category || 'Geral', // Default category
        ...data,
      };
    });

  // Filter by category if provided
  let filteredPosts = allPostsData;
  if (category && category !== 'Todos') {
    filteredPosts = allPostsData.filter(post => post.category === category);
  }

  // Sort posts by date
  return filteredPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllCategories() {
  const posts = getSortedPostsData();
  const categories = ['Todos', ...new Set(posts.map(post => post.category || 'Geral'))];
  return categories;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Calculate reading time
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s+/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  const readingTime = `${minutes} min de leitura`;

  return {
    slug,
    content,
    readingTime,
    ...data,
  };
}
