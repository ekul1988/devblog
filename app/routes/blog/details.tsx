import ReactMarkDown from "react-markdown";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";

export async function loader({ request, params }: Route.LoaderArgs) {


  const { slug } = params as { slug: string }; //<--- I had to ad type to not get type error. Brad didn't have that in his video. 


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
type BlogPostDetailsPageProps = {
    loaderData: {
        postMeta: PostMeta;
        markdown: string
    }
}

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData; //<---Also getting a type error here when brad did not have one in his video. 
  console.log(postMeta, markdown)
  return <>blog</>;
};

export default BlogPostDetailsPage;
