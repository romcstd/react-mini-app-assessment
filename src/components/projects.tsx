import type React from 'react';
import { useState } from 'react';
import { ProjectHeader } from './project-header';
import { ProjectCard } from './project-card';
import { ProjectCardSkeleton } from './project-card-skeleton';
import { useProjects } from '../hooks/useProjects';
import { useDebounce } from '../hooks/useDebounce';

export const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { debounceQuery } = useDebounce(searchQuery, 500);
  const { projectData, filteredData, loading } = useProjects(debounceQuery);

  return (
    <>
      <section id="project" className="relative">
        <ProjectHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="mb-4" aria-live="polite">
          {loading ? (
            'Loading projects...'
          ) : filteredData.length ? (
            filteredData.length === projectData.length ? (
              `Showing all ${filteredData.length} projects`
            ) : (
              `Showing ${filteredData.length} of ${projectData.length} projects`
            )
          ) : (
            <div className="flex flex-col text-zinc-500">
              <p>No projects found</p>
            </div>
          )}
        </div>

        {!loading && <ProjectCardSkeleton />}

        {filteredData.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
