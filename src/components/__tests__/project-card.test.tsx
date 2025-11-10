import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '../project-card';

vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Project Card Component', () => {
  const projectData = {
    id: 1,
    name: 'Test Project',
    slug: 'test-project',
    description: 'This is a test project description',
    content: 'This is a test project content',
  };

  it('render and check the project name', () => {
    render(<ProjectCard project={projectData} />);
    const ProjectName = screen.getByText('Test Project');
    expect(ProjectName).toBeInTheDocument();
  });

  it('render and check the project description', () => {
    render(<ProjectCard project={projectData} />);
    const ProjectDescription = screen.getByText(
      'This is a test project description',
    );
    expect(ProjectDescription).toBeInTheDocument();
  });

  it('render and check the link with the name of "More Info"', () => {
    render(<ProjectCard project={projectData} />);

    const link = screen.getByRole('link', { name: /more info/i });

    expect(link).toBeInTheDocument();
  });

  it('links to the correct project detail page', () => {
    render(<ProjectCard project={projectData} />);

    const link = screen.getByRole('link', { name: /more info/i });

    expect(link).toHaveAttribute('href', '/project/test-project');
  });
});
