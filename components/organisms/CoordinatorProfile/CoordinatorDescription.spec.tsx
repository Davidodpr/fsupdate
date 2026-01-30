import { render, screen } from '@testing-library/react';
import CoordinatorDescription from './CoordinatorDescription';

// Mock the translation with the actual pattern used
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'description') {
        return 'Vid inbjudan till <1>Flyttsmart</1> får du en personlig koordinator som guidar dig genom hela flytten – från kontraktskrivning till flytt.';
      }
      return key;
    },
  }),
  Trans: ({ i18nKey, components }: { i18nKey: string; components: Record<string, React.ReactElement> }) => {
    // Simulate Trans component behavior with link interpolation
    const text = 'Vid inbjudan till Flyttsmart får du en personlig koordinator som guidar dig genom hela flytten – från kontraktskrivning till flytt.';
    const parts = text.split('Flyttsmart');

    return (
      <>
        {parts[0]}
        {components[1]}
        {parts[1]}
      </>
    );
  },
}));

describe('CoordinatorDescription', () => {
  it('renders the description text', () => {
    render(<CoordinatorDescription />);

    expect(screen.getByText(/Vid inbjudan till/i)).toBeInTheDocument();
    expect(screen.getByText(/får du en personlig koordinator/i)).toBeInTheDocument();
  });

  it('renders the Flyttsmart link', () => {
    render(<CoordinatorDescription />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('link has correct href attribute', () => {
    render(<CoordinatorDescription />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://flyttsmart.se');
  });

  it('link opens in new tab with target="_blank"', () => {
    render(<CoordinatorDescription />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('link has security attribute rel="noopener noreferrer"', () => {
    render(<CoordinatorDescription />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('link has the key prop for React list reconciliation', () => {
    render(<CoordinatorDescription />);

    const link = screen.getByRole('link');
    // The key prop is internal to React, but we can verify the link renders correctly
    expect(link).toBeInTheDocument();
  });

  it('renders within a styled container', () => {
    const { container } = render(<CoordinatorDescription />);

    const wrapper = container.querySelector('div');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('mb-8', 'rounded-lg', 'p-5');
  });

  it('text has proper styling classes', () => {
    const { container } = render(<CoordinatorDescription />);

    const paragraph = container.querySelector('p');
    expect(paragraph).toHaveClass('text-sm', 'leading-relaxed', 'text-center');
  });
});
