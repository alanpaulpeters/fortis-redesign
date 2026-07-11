import type { Post } from "./types";
import { posts01 } from "./posts-01";
import { posts02 } from "./posts-02";
import { posts03 } from "./posts-03";
import { posts04 } from "./posts-04";
import { posts05 } from "./posts-05";
import { posts06 } from "./posts-06";
import { posts07 } from "./posts-07";
import { posts08 } from "./posts-08";
import { posts09 } from "./posts-09";
import { posts10 } from "./posts-10";

export type { Post, PostSection } from "./types";

export const allPosts: Post[] = [
  ...posts01,
  ...posts02,
  ...posts03,
  ...posts04,
  ...posts05,
  ...posts06,
  ...posts07,
  ...posts08,
  ...posts09,
  ...posts10,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export const categories = Array.from(
  new Set(allPosts.map((p) => p.category))
);

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function relatedPosts(post: Post, count = 3): Post[] {
  return allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, count);
}
