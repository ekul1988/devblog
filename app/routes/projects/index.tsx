import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const { projects } = loaderData as { projects: Project[] };
  // get unique cats
  // You add in alll then create a new set where you use map to get all project catefories and add them to the array
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  //fitler projects based on cat
  //If all is selected them you show projects else you filter the projects based on selected catergory
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  //Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  //Get current pages projects.
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  //You display the filtered categories. 
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8">Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {/* Added button for all the categories. The onclick action sets the selected category. Also set page to 1. */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 cursor-pointer rounded text-sm ${selectedCategory == category ? 'bg-blue-600 text-white': 'bg-gray-700 text-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
