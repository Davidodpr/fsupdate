import { render, screen } from '@testing-library/react';
import CoordinatorHero from './CoordinatorHero';

const mockCoordinator = {
  id: 'test',
  name: 'Test Coordinator',
  title: 'Flyttkoordinator',
  phone: {
    display: '070-123 45 67',
    href: '+46701234567',
    canonical: '46-70-123-45-67',
    alternatives: [],
  },
  email: 'test@flyttsmart.se',
  imageKitPath: 'https://example.com/image.jpg',
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: { name?: string }) => {
      if (key === 'heroImageAlt' && params?.name) {
        return `${params.name}, your moving coordinator at Flyttsmart`;
      }
      return key;
    },
  }),
}));

describe('CoordinatorHero', () => {
  it('renders coordinator name', () => {
    render(<CoordinatorHero coordinator={mockCoordinator} />);
    expect(screen.getByText('Test Coordinator')).toBeInTheDocument();
  });

  it('renders coordinator title', () => {
    render(<CoordinatorHero coordinator={mockCoordinator} />);
    expect(screen.getByText('Flyttkoordinator')).toBeInTheDocument();
  });

  it('renders coordinator phone', () => {
    render(<CoordinatorHero coordinator={mockCoordinator} />);
    expect(screen.getByText('070-123 45 67')).toBeInTheDocument();
  });

  it('renders coordinator image with alt text', () => {
    render(<CoordinatorHero coordinator={mockCoordinator} />);
    const img = screen.getByAltText('Test Coordinator, your moving coordinator at Flyttsmart');
    expect(img).toBeInTheDocument();
  });
});
