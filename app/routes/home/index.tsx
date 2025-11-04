import type { Route } from "./+types/index";
import type { Project } from "~/types";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { PostMeta } from "~/types";
import LatestPost from "~/components/LatestPost";
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);

  // This gets the response
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL("/posts-meta.json", url)),
  ]);
  if (!projectRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch projects or posts.");
  }

  //This gets the actual data
  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json(),
  ]);

  console.log(projects, posts);
  return { projects, posts };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Blog | Welcome" },
    { name: "Luke Marut's Blog", content: "Welcome to my blog!" },
  ];
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData as { projects: Project[]; posts: PostMeta[]; };

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <LatestPost posts={posts} />
    </>
  );
};
export default HomePage;
