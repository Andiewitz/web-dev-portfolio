import { useRoute } from "wouter";
import { WritingArticlePage } from "../components/WritingPages";
import { posts } from "../data/writing";
import NotFound from "./NotFound";

export default function BlogPost() {
  const [, params] = useRoute("/writing/:slug");
  const post = posts.find(item => item.slug === params?.slug);
  return post ? <WritingArticlePage post={post} /> : <NotFound />;
}
