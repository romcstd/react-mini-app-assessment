import type React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="rounded-xl border border-zinc-400 p-6 sm:p-8">
      <h3 className="mb-4 text-xl leading-relaxed font-semibold">
        {project.name}
      </h3>
      <p className="mb-4 line-clamp-2 leading-relaxed text-zinc-700">
        {project.description}
      </p>
      <Link
        to={`/project/${project.slug}`}
        className="inline-block rounded-md border border-zinc-900 bg-zinc-900 px-4 py-2 text-zinc-100 transition-all duration-300 ease-in-out hover:bg-zinc-100 hover:text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:outline-none"
      >
        More Info
      </Link>
    </div>
  );
};
