import { render } from '@testing-library/react';
import CoordinatorSchema from './CoordinatorSchema';
import { Coordinator } from '@/common/data/coordinators.types';

const mockCoordinator: Coordinator = {
  id: 'test-coordinator',
  name: 'Test Coordinator',
  title: 'Test Title',
  phone: {
    display: '070-123 45 67',
    href: '+46701234567',
    canonical: '46-70-123-45-67',
    alternatives: [],
  },
  email: 'test@flyttsmart.se',
  imageKitPath: 'https://example.com/image.jpg',
};

describe('CoordinatorSchema', () => {
  it('renders a script tag with type application/ld+json', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute('type', 'application/ld+json');
  });

  it('generates valid JSON-LD schema', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const jsonContent = script?.innerHTML;

    expect(() => JSON.parse(jsonContent || '')).not.toThrow();
  });

  it('includes @context with schema.org URL', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');

    expect(schema['@context']).toBe('https://schema.org');
  });

  it('includes @graph array with three items', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');

    expect(schema['@graph']).toBeInstanceOf(Array);
    expect(schema['@graph']).toHaveLength(3);
  });

  it('generates Person schema with all required fields', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];

    expect(personSchema['@type']).toBe('Person');
    expect(personSchema.name).toBe('Test Coordinator');
    expect(personSchema.jobTitle).toBe('Flyttkoordinator');
    expect(personSchema.telephone).toBe('+46701234567');
    expect(personSchema.email).toBe('test@flyttsmart.se');
    expect(personSchema.image).toBe('https://example.com/image.jpg');
  });

  it('includes worksFor organization in Person schema', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];

    expect(personSchema.worksFor).toBeDefined();
    expect(personSchema.worksFor['@type']).toBe('Organization');
    expect(personSchema.worksFor.name).toBe('Flyttsmart');
    expect(personSchema.worksFor.url).toBe('https://flyttsmart.se');
  });

  it('generates ContactPoint schema with all required fields', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const contactPointSchema = schema['@graph'][1];

    expect(contactPointSchema['@type']).toBe('ContactPoint');
    expect(contactPointSchema.telephone).toBe('+46701234567');
    expect(contactPointSchema.contactType).toBe('Flyttkoordinator');
    expect(contactPointSchema.areaServed).toBe('SE');
    expect(contactPointSchema.availableLanguage).toEqual(['Swedish', 'English']);
  });

  it('generates BreadcrumbList schema with correct structure', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const breadcrumbSchema = schema['@graph'][2];

    expect(breadcrumbSchema['@type']).toBe('BreadcrumbList');
    expect(breadcrumbSchema.itemListElement).toHaveLength(2);

    const firstItem = breadcrumbSchema.itemListElement[0];
    expect(firstItem['@type']).toBe('ListItem');
    expect(firstItem.position).toBe(1);
    expect(firstItem.name).toBe('Flyttsmart');
    expect(firstItem.item).toBe('https://flyttsmart.se');

    const secondItem = breadcrumbSchema.itemListElement[1];
    expect(secondItem['@type']).toBe('ListItem');
    expect(secondItem.position).toBe(2);
    expect(secondItem.name).toBe('Test Coordinator');
    expect(secondItem.item).toBe('https://flyttsmart.se/sv/coordinator/46-70-123-45-67');
  });

  it('uses jobTitle prop in Person schema', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="en"
        jobTitle="Moving Coordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];

    expect(personSchema.jobTitle).toBe('Moving Coordinator');
  });

  it('uses jobTitle prop in ContactPoint schema', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="en"
        jobTitle="Moving Coordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const contactPointSchema = schema['@graph'][1];

    expect(contactPointSchema.contactType).toBe('Moving Coordinator');
  });

  it('correctly maps all coordinator phone data', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];
    const contactPointSchema = schema['@graph'][1];

    expect(personSchema.telephone).toBe(mockCoordinator.phone.href);
    expect(contactPointSchema.telephone).toBe(mockCoordinator.phone.href);
  });

  it('correctly maps coordinator email', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];

    expect(personSchema.email).toBe(mockCoordinator.email);
  });

  it('correctly maps coordinator image path', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];

    expect(personSchema.image).toBe(mockCoordinator.imageKitPath);
  });

  it('correctly maps coordinator name in Person and BreadcrumbList', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];
    const breadcrumbSchema = schema['@graph'][2];

    expect(personSchema.name).toBe(mockCoordinator.name);
    expect(breadcrumbSchema.itemListElement[1].name).toBe(mockCoordinator.name);
  });

  it('sets inLanguage property in Person schema using BCP 47 format for Swedish', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];

    expect(personSchema.inLanguage).toBe('sv-SE');
  });

  it('sets inLanguage property in ContactPoint schema using BCP 47 format for English', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="en"
        jobTitle="Moving Coordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const contactPointSchema = schema['@graph'][1];

    expect(contactPointSchema.inLanguage).toBe('en-GB');
  });

  it('converts English locale to BCP 47 format (en-GB)', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="en"
        jobTitle="Moving Coordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const personSchema = schema['@graph'][0];
    const contactPointSchema = schema['@graph'][1];

    expect(personSchema.inLanguage).toBe('en-GB');
    expect(contactPointSchema.inLanguage).toBe('en-GB');
  });

  it('includes item URL in second breadcrumb ListItem for schema completeness', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="en"
        jobTitle="Moving Coordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');
    const breadcrumbSchema = schema['@graph'][2];
    const secondItem = breadcrumbSchema.itemListElement[1];

    expect(secondItem.item).toBe('https://flyttsmart.se/en/coordinator/46-70-123-45-67');
    expect(secondItem.item).toContain(mockCoordinator.phone.canonical);
  });

  it('creates multiple ContactPoints when coordinator has alternative phone numbers', () => {
    const coordinatorWithAlternatives: Coordinator = {
      ...mockCoordinator,
      phone: {
        display: '070-123 45 67',
        href: '+46701234567',
        canonical: '46-70-123-45-67',
        alternatives: ['46701234567', '0701234567', '070-123-45-67'],
      },
    };

    const { container } = render(
      <CoordinatorSchema
        coordinator={coordinatorWithAlternatives}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');

    // Should have: Person + 4 ContactPoints (main + 3 alternatives) + BreadcrumbList = 6 total
    expect(schema['@graph']).toHaveLength(6);

    // Filter ContactPoints
    const contactPoints = schema['@graph'].filter((item: { '@type': string }) => item['@type'] === 'ContactPoint');
    expect(contactPoints).toHaveLength(4);

    // Verify all phone numbers are included
    const phoneNumbers = contactPoints.map((cp: { telephone: string }) => cp.telephone);
    expect(phoneNumbers).toContain('+46701234567'); // href and alternatives convert to same format
    expect(phoneNumbers).toContain('+4670-123-45-67'); // alternatives[2] '070-123-45-67' -> '+4670-123-45-67'

    // All these alternatives normalize to the same number: +46701234567
    // - href: '+46701234567'
    // - alternatives[0]: '46701234567' -> '+46701234567'
    // - alternatives[1]: '0701234567' -> '+46' + '701234567' = '+46701234567'
    const normalizedCount = phoneNumbers.filter((p: string) => p === '+46701234567').length;
    expect(normalizedCount).toBe(3);
  });

  it('creates only one ContactPoint when coordinator has no alternative phone numbers', () => {
    const { container } = render(
      <CoordinatorSchema
        coordinator={mockCoordinator}
        locale="sv"
        jobTitle="Flyttkoordinator"
      />
    );

    const script = container.querySelector('script');
    const schema = JSON.parse(script?.innerHTML || '');

    // Filter ContactPoints
    const contactPoints = schema['@graph'].filter((item: { '@type': string }) => item['@type'] === 'ContactPoint');
    expect(contactPoints).toHaveLength(1);
    expect(contactPoints[0].telephone).toBe('+46701234567');
  });
});
