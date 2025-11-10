import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../footer';

describe('Footer Component', () => {
  it('check the copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/React Mini-App Assessment/i);
    expect(copyrightText).toBeInTheDocument();
  });

  it('check the copyright year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    const yearText = screen.getByText(new RegExp(currentYear.toString()));
    expect(yearText).toBeInTheDocument();
  });

  it('check the All rights reserved', () => {
    render(<Footer />);
    const reserveText = screen.getByText(/All rights reserved/i);
    expect(reserveText).toBeInTheDocument();
  });
});
