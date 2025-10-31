import type { Route } from "./+types/index";
import Hero from "~/components/Hero";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Blog | Welcome" },
    { name: "Luke Marut's Blog", content: "Welcome to my blog!" },
  ];
}

export default function Home() {
   
  return <section><Hero /></section>;
}
