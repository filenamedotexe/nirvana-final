import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../../src/components/islands/Modal';

describe('Modal Component', () => {
  it('should render the trigger button', () => {
    render(<Modal />);
    
    const button = screen.getByText('Open Modal');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-brand-600', 'text-white');
  });

  it('should open modal when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal />);
    
    // Modal should not be visible initially
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
    
    // Click the trigger button
    const button = screen.getByText('Open Modal');
    await user.click(button);
    
    // Modal should now be visible
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('This is a Radix UI modal component hydrated as a React island in Astro.')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal />);
    
    // Open the modal
    const button = screen.getByText('Open Modal');
    await user.click(button);
    
    // Modal should be visible
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    
    // Click close button
    const closeButton = screen.getByText('Close');
    await user.click(closeButton);
    
    // Modal should be closed
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
  });
});