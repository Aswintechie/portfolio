import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the main portfolio content', async () => {
    render(<App />);

    // Wait for the loading to complete and check if the main content loads
    await waitFor(() => {
      expect(screen.getAllByText('Aswin').length).toBeGreaterThan(0);
    });
  });

  it('renders navigation links', async () => {
    render(<App />);

    // Wait for navigation links to be present
    await waitFor(() => {
      const navLinks = screen.getAllByRole('link');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    // Check for specific navigation items
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders contact section', async () => {
    render(<App />);

    // Wait for contact form inputs to be present
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
    });
  });
});
