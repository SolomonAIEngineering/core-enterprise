import { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import { compareDesc } from "date-fns";
import { constructMetadata } from "@/lib/utils";
import { posts } from "@/lib/blog/postData";

// Define the BlogPost interface
interface BlogPost {
  url: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  author?: string;
  readingTime?: string;
  tags?: string[];
}

export const metadata: Metadata = constructMetadata({
  title: "Blog",
  description:
    "Discover insightful articles and the latest updates on Solomon AI. Stay informed, inspired, and ahead with expert tips, trends, and guides.",
  canonical: "/blog",
});

export default function Blog() {
  const sortedPosts = (posts as BlogPost[]).sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="py-[5%]">
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-32 sm:px-6">
        <h1 className="mb-10 text-center text-4xl font-semibold">Blog</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, idx) => (
            <PostCard
              key={post.url}
              {...post}
              thumbnail={post.thumbnail || ""} // Provide a default empty string if thumbnail is undefined
            />
          ))}
        </div>
      </div>
    </div>
  );
}
