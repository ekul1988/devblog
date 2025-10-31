import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Blog | Welcome" },
    { name: "Luke Marut's Blog", content: "Welcome to my blog!" },
  ];
}

export default function ContactPage() {
   
  return <section> <h2 className="text-3xl text-white font-bold mb-8">Contact</h2></section>;
}
