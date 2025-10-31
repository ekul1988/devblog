import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Blog | Welcome" },
    { name: "Luke Marut's Blog", content: "Welcome to my blog!" },
  ];
}

export default function Home() {
    console.log('home')
  return <section>My App</section>;
}
