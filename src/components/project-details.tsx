import type React from 'react';
import { Navigate } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectDetailsProps {
  project?: Project;
  loading: boolean;
}
export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  loading,
}) => {
  if (loading) return <p>Loading project details...</p>;
  if (!project) return <Navigate to="/project-not-found" replace />;
  return (
    <>
      <h2 className="mb-4 text-4xl font-bold sm:text-5xl">{project.name}</h2>
      <p className="mb-4 leading-relaxed text-zinc-700">
        {project.description}
      </p>
      <p className="leading-relaxed text-zinc-700">{project.content}</p>
    </>
  );
};
