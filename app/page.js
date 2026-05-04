import LandingPage from "@/components/LandingPage";
import { getSortedPostsData } from "@/lib/markdown";

export default function Home() {
  const posts = getSortedPostsData();
  return <LandingPage posts={posts} />;
}
