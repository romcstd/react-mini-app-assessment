import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectDetails } from '../project-details';

describe('Project Details Component', () => {
  const projectData = {
    id: 1,
    name: 'Test Project',
    slug: 'test-project',
    description: 'This is a test project description',
    content: 'This is a test project content',
  };

  const loading = false;

  it('render and check the project name', () => {
    render(<ProjectDetails project={projectData} loading={loading} />);
    const ProjectName = screen.getByText('Test Project');
    expect(ProjectName).toBeInTheDocument();
  });

  it('render and check the project description', () => {
    render(<ProjectDetails project={projectData} loading={loading} />);
    const ProjectDescription = screen.getByText(
      'This is a test project description',
    );
    expect(ProjectDescription).toBeInTheDocument();
  });

  it('render and check the project content', () => {
    render(<ProjectDetails project={projectData} loading={loading} />);
    const ProjectContent = screen.getByText('This is a test project content');
    expect(ProjectContent).toBeInTheDocument();
  });
});
