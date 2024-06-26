import { Project } from "@/types";
import { Button, Trans } from "../common";
import { useCallback, useState, type FC } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import useLang from "@/hooks/useLang";

interface ProjectProps {
  projects: Project[];
  className?: string;
}

const Projects : FC<ProjectProps> = ({ projects, className = "" }) => {
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const { currentLanguage } = useLang();
  const handleChangeProject = useCallback((direction: "next" | "prev") => {
    const currentIndex = projects.findIndex(
      (project) => project.id === currentProject.id
    );
    if (direction === "next") {
      if (currentIndex === projects.length - 1) {
        setCurrentProject(projects[0]);
      } else {
        setCurrentProject(projects[currentIndex + 1]);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentProject(projects[projects.length - 1]);
      } else {
        setCurrentProject(projects[currentIndex - 1]);
      }
    }
  }, [projects, currentProject]);

  useEffect(() => {
    if (projects.length > 0)
      setCurrentProject(projects[0]);
  }, [projects]);

  if (!currentProject) {
    return <div>Loading...</div>;
  }

  return (
    <section className={twMerge(`my-10 ${className}`)}>
      <div className="grid grid-cols-12 md:h-[700px]">
        <article className="col-span-12 md:col-span-6 lg:col-span-4 bg-secondary-dark flex items-start justify-center py-10 md:py-20 px-4 md:px-20 relative">
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-4xl font-semibold capitalize mb-8 md:mb-10 text-primary">
              <Trans text="home.project.title" />
            </h2>
            <h3 className="text-2xl font-medium capitalize mb-6 md:mb-8">
              {currentProject[`name${currentLanguage}` as keyof Project] as string}
            </h3>
            <p className="mb-8 md:mb-10 line-clamp-4 max-lg:min-h-[150px]">
              {currentProject[`description${currentLanguage}` as keyof Project] as string}
            </p>
            <Button
              variant="outline"
              href={`/projects/${currentProject.id}`}
              className="w-fit"
            >
              <Trans text="common.viewMore" />
            </Button>
          </div>
          <div className="absolute bottom-0 right-0 flex md:translate-x-1/2">
            <Button
              type="square"
              className="w-12 h-12 p-2"
              onClick={() => handleChangeProject("prev")}
            >
              <MdArrowBack className="text-2xl" />
            </Button>
            <Button
              type="square"
              variant="secondary"
              className=" w-12 h-12 p-2"
              onClick={() => handleChangeProject("next")}
            >
              <MdArrowForward className="text-2xl" />
            </Button>
          </div>
        </article>
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <a href={`/projects/${currentProject.id}`}>
            <img
              src={currentProject.featuredImage}
              alt={currentProject.name}
              className="md:h-[700px] object-cover object-center w-full"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
