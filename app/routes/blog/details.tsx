import ReactMarkDown from "react-markdown";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params as { slug: string };
  const url = new URL("/post-meta.json", request.url);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error("Failed to fetch data");
  // this gets all the posts
  const index = await res.json();
  // this finds the matching post based on the slug
  const postMeta = index.find((post: PostMeta) => post.slug === slug);
  if (!postMeta) throw new Response("Not found", { status: 404 });

  // Dynamically import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta, markdown } = loaderData;
  return <>blog</>;
};

export default BlogDetailsPage;
