import { useState, useEffect, useMemo } from 'react';
import { projects } from '../data/projects';

export function useProjects(debounceQuery: string) {
  const [projectData, setProjectData] = useState<typeof projects>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjectData(projects);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    return projectData.filter((project) =>
      project.name.toLowerCase().includes(debounceQuery.toLowerCase()),
    );
  }, [projectData, debounceQuery]);

  return { projectData, filteredData, loading };
}
