import { render, screen } from '@testing-library/react';
import CoordinatorTestimonials from './CoordinatorTestimonials';
import { GoogleReview, GoogleReviewCountAndRating } from 'app/_actions/googleReviews';

const mockReviewStats: GoogleReviewCountAndRating = {
  rating: 4.8,
  reviewCount: 180000,
};

const mockReviews: GoogleReview[] = [
  {
    author_name: 'Test User 1',
    rating: 5,
    text: 'Great service!',
    time: 1234567890,
    profile_photo_url: 'https://example.com/photo1.jpg',
    relative_time_description: '2 weeks ago',
  },
  {
    author_name: 'Test User 2',
    rating: 4,
    text: 'Very good experience.',
    time: 1234567891,
    profile_photo_url: 'https://example.com/photo2.jpg',
    relative_time_description: '1 month ago',
  },
  {
    author_name: 'Test User 3',
    rating: 3,
    text: 'Good service overall.',
    time: 1234567892,
    relative_time_description: '3 months ago',
  },
  {
    author_name: 'Test User 4',
    rating: 2,
    text: 'Could be better.',
    time: 1234567893,
    relative_time_description: '4 months ago',
  },
  {
    author_name: 'Test User 5',
    rating: 5,
    text: 'Excellent!',
    time: 1234567894,
    profile_photo_url: 'https://example.com/photo5.jpg',
    relative_time_description: '5 months ago',
  },
];

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: { rating?: number }) => {
      if (key === 'testimonials.starsRating' && params?.rating) {
        return `${params.rating} stars`;
      }
      return key;
    },
  }),
}));

jest.mock('lucide-react', () => ({
  User: () => <span>User Icon</span>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('CoordinatorTestimonials', () => {
  it('returns null when reviewStats rating is missing', () => {
    const { container } = render(
      <CoordinatorTestimonials
        reviews={mockReviews}
        reviewStats={{ rating: null, reviewCount: 100 }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null when reviewStats reviewCount is missing', () => {
    const { container } = render(
      <CoordinatorTestimonials
        reviews={mockReviews}
        reviewStats={{ rating: 4.5, reviewCount: null }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('filters reviews to only show rating >= 3', () => {
    render(<CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />);

    // Should show reviews with rating 3, 4, and 5
    expect(screen.getByText('Test User 1')).toBeInTheDocument();
    expect(screen.getByText('Test User 2')).toBeInTheDocument();
    expect(screen.getByText('Test User 3')).toBeInTheDocument();

    // Should NOT show review with rating 2
    expect(screen.queryByText('Test User 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Could be better.')).not.toBeInTheDocument();
  });

  it('displays maximum of 3 reviews', () => {
    render(<CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />);

    // Should show first 3 qualifying reviews (rating >= 3)
    expect(screen.getByText('Test User 1')).toBeInTheDocument();
    expect(screen.getByText('Test User 2')).toBeInTheDocument();
    expect(screen.getByText('Test User 3')).toBeInTheDocument();

    // Should NOT show 4th qualifying review (Test User 5, rating 5)
    expect(screen.queryByText('Test User 5')).not.toBeInTheDocument();
    expect(screen.queryByText('Excellent!')).not.toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(<CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />);

    expect(screen.getByText('testimonials.title')).toBeInTheDocument();
    expect(screen.getByText('testimonials.subtitle')).toBeInTheDocument();
  });

  it('renders review text and author names', () => {
    render(<CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />);

    expect(screen.getByText('Great service!')).toBeInTheDocument();
    expect(screen.getByText('Very good experience.')).toBeInTheDocument();
    expect(screen.getByText('Good service overall.')).toBeInTheDocument();
  });

  it('renders relative time descriptions', () => {
    render(<CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />);

    expect(screen.getByText('2 weeks ago')).toBeInTheDocument();
    expect(screen.getByText('1 month ago')).toBeInTheDocument();
    expect(screen.getByText('3 months ago')).toBeInTheDocument();
  });

  it('handles reviews without text by filtering them out', () => {
    const reviewsWithoutText: GoogleReview[] = [
      {
        author_name: 'No Text User',
        rating: 5,
        time: 1234567890,
        profile_photo_url: 'https://example.com/photo.jpg',
      },
      ...mockReviews,
    ];

    render(<CoordinatorTestimonials reviews={reviewsWithoutText} reviewStats={mockReviewStats} />);

    // Should not show the review without text
    expect(screen.queryByText('No Text User')).not.toBeInTheDocument();

    // Should show reviews with text
    expect(screen.getByText('Test User 1')).toBeInTheDocument();
  });

  it('handles null reviews gracefully', () => {
    render(<CoordinatorTestimonials reviews={null} reviewStats={mockReviewStats} />);

    // Should still render the title/subtitle but no reviews
    expect(screen.getByText('testimonials.title')).toBeInTheDocument();
    expect(screen.getByText('testimonials.subtitle')).toBeInTheDocument();
  });

  it('renders User icon fallback when profile photo is missing', () => {
    const reviewsWithoutPhotos: GoogleReview[] = [
      {
        author_name: 'No Photo User',
        rating: 5,
        text: 'Great!',
        time: 1234567890,
        relative_time_description: '1 week ago',
      },
    ];

    render(<CoordinatorTestimonials reviews={reviewsWithoutPhotos} reviewStats={mockReviewStats} />);

    expect(screen.getByText('No Photo User')).toBeInTheDocument();
    expect(screen.getByText('User Icon')).toBeInTheDocument();
  });

  it('renders star images with empty alt attribute for accessibility', () => {
    const { container } = render(
      <CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />
    );

    const starImages = container.querySelectorAll('img[src="/images/GoogleStar.svg"]');
    expect(starImages.length).toBeGreaterThan(0);

    starImages.forEach((img) => {
      expect(img).toHaveAttribute('alt', '');
    });
  });

  it('renders star container with aria-label for screen readers', () => {
    render(<CoordinatorTestimonials reviews={mockReviews} reviewStats={mockReviewStats} />);

    // First review has 5 stars
    expect(screen.getByLabelText('5 stars')).toBeInTheDocument();

    // Second review has 4 stars
    expect(screen.getByLabelText('4 stars')).toBeInTheDocument();

    // Third review has 3 stars
    expect(screen.getByLabelText('3 stars')).toBeInTheDocument();
  });
});
