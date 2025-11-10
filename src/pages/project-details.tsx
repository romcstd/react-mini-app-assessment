import type React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectDetails } from '../components/project-details';
import { useProjects } from '../hooks/useProjects';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projectData, loading } = useProjects('');
  const project = projectData.find((project) => project.slug === slug);

  return (
    <>
      <section id="project-details" className="relative">
        <ProjectDetails project={project} loading={loading} />
      </section>
    </>
  );
};
