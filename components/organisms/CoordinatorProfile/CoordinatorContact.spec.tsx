import { render, screen } from '@testing-library/react';
import CoordinatorContact from './CoordinatorContact';

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

jest.mock('lucide-react', () => ({
  Phone: () => <span>Phone Icon</span>,
  Mail: () => <span>Mail Icon</span>,
  MessageCircle: () => <span>MessageCircle Icon</span>,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: { name?: string; phone?: string; email?: string }) => {
      if (key === 'cta.callAriaLabel' && params) {
        return `Call ${params.name} at ${params.phone}`;
      }
      if (key === 'cta.emailAriaLabel' && params) {
        return `Email ${params.name} at ${params.email}`;
      }
      if (key === 'cta.smsAriaLabel') {
        return 'Send SMS to Flyttsmart';
      }
      return key;
    },
  }),
}));

describe('CoordinatorContact', () => {
  it('renders call button with tel link', () => {
    render(<CoordinatorContact coordinator={mockCoordinator} />);
    const link = screen.getByRole('link', { name: /Call Test Coordinator at 070-123 45 67/i });
    expect(link).toHaveAttribute('href', 'tel:+46701234567');
  });

  it('renders email button with mailto link', () => {
    render(<CoordinatorContact coordinator={mockCoordinator} />);
    const link = screen.getByRole('link', { name: /Email Test Coordinator at test@flyttsmart.se/i });
    expect(link).toHaveAttribute('href', 'mailto:test@flyttsmart.se');
  });

  it('renders SMS button with hardcoded sms link', () => {
    render(<CoordinatorContact coordinator={mockCoordinator} />);
    const link = screen.getByRole('link', { name: /Send SMS to Flyttsmart/i });
    expect(link).toHaveAttribute('href', 'sms:+46790965888');
  });

  it('has accessible aria-label on call button with coordinator name and phone', () => {
    render(<CoordinatorContact coordinator={mockCoordinator} />);
    const callButton = screen.getByRole('link', { name: /Call Test Coordinator at 070-123 45 67/i });
    expect(callButton).toHaveAttribute('aria-label', 'Call Test Coordinator at 070-123 45 67');
  });

  it('has accessible aria-label on email button with coordinator name and email', () => {
    render(<CoordinatorContact coordinator={mockCoordinator} />);
    const emailButton = screen.getByRole('link', { name: /Email Test Coordinator at test@flyttsmart.se/i });
    expect(emailButton).toHaveAttribute('aria-label', 'Email Test Coordinator at test@flyttsmart.se');
  });

  it('has accessible aria-label on SMS button', () => {
    render(<CoordinatorContact coordinator={mockCoordinator} />);
    const smsButton = screen.getByRole('link', { name: /Send SMS to Flyttsmart/i });
    expect(smsButton).toHaveAttribute('aria-label', 'Send SMS to Flyttsmart');
  });
});
