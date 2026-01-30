# Moving Coordinator Pages - Design Document

**Date:** 2025-11-25
**Feature:** SEO-Optimized Moving Coordinator Profile Pages
**Goal:** Rank coordinator phone numbers at top of Google search results for missed call lookups

## Overview

Create individual profile pages for all 5 Flyttsmart moving coordinators, accessible via phone number URLs. Primary objective is SEO dominance for phone number searches, helping potential customers identify missed calls from Flyttsmart and providing direct contact options.

## Business Requirements

- Help people who receive missed calls identify Flyttsmart coordinators
- Rank #1 in Google for coordinator phone number searches
- Provide easy contact methods (call, email, SMS)
- Build trust through testimonials and professional presentation
- Support both Swedish and English languages
- Fast page loads for optimal SEO and user experience

## Technical Architecture

### Route Structure

```
app/
└── (withoutHeader)/
    └── [locale]/
        └── coordinator/
            └── [phone]/
                ├── page.tsx          # Main coordinator page
                ├── layout.tsx        # SEO metadata generation
                └── not-found.tsx     # 404 for invalid phone numbers
```

**Rationale:**
- `(withoutHeader)` route group: No header/footer for distraction-free experience
- `[locale]` param: Support Swedish and English via existing i18n system
- `[phone]` param: Phone number as URL slug for direct SEO targeting

### URL Strategy

**Canonical URL Format:**
```
/sv/coordinator/46-76-692-00-97
/en/coordinator/46-76-692-00-97
```

**Alternative URLs (301 redirect to canonical):**
- `/coordinator/46766920097` (continuous digits with country code)
- `/coordinator/0766920097` (Swedish format without country code)
- `/coordinator/076-692-00-97` (Swedish format with dashes)

**Benefits:**
- Captures all phone number search variations
- Consolidates SEO signals to one canonical URL
- Professional, readable URLs
- International format shows credibility

### Data Structure

**File:** `common/data/coordinators.ts`

```typescript
export interface Coordinator {
  id: string;                    // Internal ID for images
  name: string;                  // Full name
  title: string;                 // "Flyttkoordinator"
  phone: {
    display: string;             // "076-692 00 97" (user-friendly)
    href: string;                // "+46766920097" (tel: link format)
    canonical: string;           // "46-76-692-00-97" (URL slug)
    alternatives: string[];      // All other valid formats
  };
  email: string;
  imageKitPath: string;          // Full ImageKit URL
}

export const coordinators: Coordinator[] = [
  // 5 coordinator objects
];
```

**Helper Functions:**
- `getCoordinatorByPhone(phone: string): Coordinator | null` - Lookup by any format
- `normalizePhoneForUrl(phone: string): string` - Convert to canonical format
- `getAllCoordinatorUrls(): string[]` - Generate all URLs for sitemap

**Rationale:**
- Static data (no API) for faster loads and simpler deployment
- Multiple phone formats enable flexible URL matching
- ID field maintains consistency with existing image references
- Type safety via TypeScript interfaces

## SEO Implementation

### Metadata Strategy

**Title Tag Format:**
```
{coordinator.name} | {phone.display} | Flyttsmart Flyttkoordinator
```

Example: `Nina Fredriksson | 076-692 00 97 | Flyttsmart Flyttkoordinator`

**Meta Description:**
```
{coordinator.name} ringde dig från Flyttsmart. Ring tillbaka på {phone.display} eller skicka ett mejl.
```

**Key Optimizations:**
- Phone number in title (highest priority)
- Coordinator name for branded searches
- Action-oriented description
- Localized per language (sv/en)

### Schema.org Structured Data

**Implemented Schemas:**

1. **Person Schema:**
```json
{
  "@type": "Person",
  "name": "Nina Fredriksson",
  "jobTitle": "Flyttkoordinator",
  "telephone": "+46766920097",
  "email": "nina@flyttsmart.se",
  "image": "https://ik.imagekit.io/...",
  "worksFor": {
    "@type": "Organization",
    "name": "Flyttsmart",
    "url": "https://flyttsmart.se"
  }
}
```

2. **ContactPoint Schema:**
```json
{
  "@type": "ContactPoint",
  "telephone": "+46766920097",
  "contactType": "Moving Coordinator",
  "areaServed": "SE",
  "availableLanguage": ["Swedish", "English"]
}
```

3. **BreadcrumbList Schema:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Flyttsmart",
      "item": "https://flyttsmart.se"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Nina Fredriksson"
    }
  ]
}
```

**Benefits:**
- Rich snippets in search results (phone, email, profile picture)
- Enhanced click-through rates
- Better understanding by search engines
- Potential for "Call" button in mobile search results

### Additional SEO Features

- **Canonical Tags:** Point to primary language version
- **hreflang Tags:** Link Swedish and English versions
- **Open Graph:** Social sharing optimization with profile image
- **robots.txt:** Ensure crawlability
- **Sitemap:** Include all coordinator URLs with priority 0.8
- **Mobile Optimization:** Responsive design, fast loading
- **Accessibility:** Semantic HTML, ARIA labels

## Component Architecture

Following atomic design pattern:

### Page Components

**`app/(withoutHeader)/[locale]/coordinator/[phone]/page.tsx`:**
- Fetches coordinator data by phone parameter
- Handles redirects for non-canonical URLs
- Returns 404 for invalid phone numbers
- Orchestrates child components

**`app/(withoutHeader)/[locale]/coordinator/[phone]/layout.tsx`:**
- Generates dynamic metadata per coordinator
- Implements Schema.org JSON-LD
- Sets canonical and alternate URLs

### Organism Components

**`components/organisms/CoordinatorProfile/`:**

1. **CoordinatorHero.tsx**
   - Profile photo with glow effect
   - Name, title, phone number
   - "Called you from Flyttsmart" message

2. **CoordinatorContact.tsx**
   - Primary CTA: "Ring tillbaka nu" (call button)
   - Secondary actions: Email and SMS buttons
   - Uses existing Button component

3. **CoordinatorDescription.tsx**
   - Explanation of Flyttsmart coordinator service
   - Link back to main Flyttsmart site

4. **CoordinatorTestimonials.tsx**
   - "+180,000 helped customers" stat
   - 2 customer testimonials with 5-star ratings
   - Builds trust and credibility

### Styling Approach

- **Tailwind CSS exclusively** (no Stitches)
- Reuse design tokens via CSS custom properties:
  - `var(--color-primary-main)` - Primary brand color
  - `var(--shadow-card)` - Card shadows
  - `var(--fs-fontSizes-*)` - Typography scale
- Use existing `Button` component (already Tailwind-converted)
- Use `clsx` for conditional classes
- Mobile-first responsive design

## Internationalization

### Translation Files

**`public/locales/sv/coordinator.json`:**
```json
{
  "metaTitle": "Flyttsmart Flyttkoordinator",
  "metaDescription": "{{name}} ringde dig från Flyttsmart. Ring tillbaka på {{phone}} eller skicka ett mejl.",
  "pageTitle": "Missat samtal?",
  "pageSubtitle": "Här är din flyttkoordinator",
  "coordinator": "Flyttkoordinator",
  "calledYouFrom": "ringde dig från",
  "cta": {
    "callBack": "Ring tillbaka nu",
    "email": "Mejla",
    "sms": "SMS"
  },
  "description": "Vid inbjudan till Flyttsmart får du en personlig koordinator som guidar dig genom hela flytten – från kontraktskrivning till flytt.",
  "testimonials": {
    "title": "+180 000 hjälpta kunder",
    "subtitle": "Vad säger andra kunder?",
    "reviews": [
      {
        "text": "Fantastiskt bemötande – kändes tryggt hela vägen!",
        "author": "Anna, Stockholm"
      },
      {
        "text": "Att ha en personlig kontakt gjorde allt enklare.",
        "author": "Johan, Göteborg"
      }
    ]
  }
}
```

**`public/locales/en/coordinator.json`:**
- Full English translations of all strings
- Maintains same structure for consistency

**Usage:**
```typescript
const { t } = useTranslation('coordinator');
```

## Sitemap Integration

**Update:** `app/sitemap.ts` (or create if not exists)

```typescript
import { coordinators } from '@/common/data/coordinators';

export default function sitemap() {
  const coordinatorUrls = coordinators.flatMap(coordinator => [
    {
      url: `https://flyttsmart.se/sv/coordinator/${coordinator.phone.canonical}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          sv: `https://flyttsmart.se/sv/coordinator/${coordinator.phone.canonical}`,
          en: `https://flyttsmart.se/en/coordinator/${coordinator.phone.canonical}`,
        }
      }
    }
  ]);

  return [
    // ... existing URLs
    ...coordinatorUrls
  ];
}
```

## Performance Optimization

### Loading Strategy

- **Image Optimization:**
  - Use ImageKit transformation parameters for optimal sizing
  - Preload coordinator profile image (above the fold)
  - Lazy load testimonial decorative elements

- **JavaScript:**
  - Minimal client-side JS (mostly static HTML)
  - Server-side rendering for fast initial paint
  - No hydration blockers

- **Critical Rendering Path:**
  - Inline critical CSS for above-the-fold content
  - Defer non-critical stylesheets
  - Optimize font loading

### Target Metrics

- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to First Byte (TTFB):** < 600ms

## Beyond-Code SEO Tasks

These manual actions are required for maximum ranking:

### 1. Google Search Console
- Submit updated sitemap with coordinator URLs
- Request indexing for each coordinator page individually
- Monitor "Coverage" report for indexing status
- Track search queries and click-through rates
- Set up alerts for indexing issues

### 2. Google Business Profile
- Add all coordinator phone numbers to Flyttsmart business listing
- Link to coordinator pages from business description
- Ensure NAP consistency (Name, Address, Phone)

### 3. Internal Linking
- Link to assigned coordinator page from user dashboard
- Add coordinator directory to main site navigation
- Include coordinator links in footer (if appropriate)
- Link from "Contact Us" page

### 4. External Signals
- Add coordinator page links to company LinkedIn profiles
- Include in email signatures when coordinators contact customers
- Link from social media profiles (Facebook, Instagram)
- Consider press release announcing new coordinator pages

### 5. Monitoring & Iteration
- **Week 1-2:** Monitor Google Search Console for indexing
- **Week 3-4:** Track rankings for phone number queries
- **Month 2:** A/B test page content if rankings are low
- **Ongoing:** Monitor page load speed in PageSpeed Insights
- **Quarterly:** Review and update testimonials, content

### 6. Advanced SEO (Optional)
- Create blog content mentioning coordinators
- Build backlinks from partner sites
- Local business directory submissions
- Video content featuring coordinators (YouTube optimization)

## Implementation Checklist

### Phase 1: Core Implementation
- [ ] Create coordinator data file with all 5 coordinators
- [ ] Implement phone normalization helper functions
- [ ] Build route structure in `(withoutHeader)/[locale]/coordinator/[phone]/`
- [ ] Create main `page.tsx` with redirect logic
- [ ] Implement SEO-rich `layout.tsx` with metadata generation
- [ ] Add `not-found.tsx` for invalid phone numbers

### Phase 2: UI Components
- [ ] Build `CoordinatorHero` component
- [ ] Build `CoordinatorContact` component with call/email/SMS buttons
- [ ] Build `CoordinatorDescription` component
- [ ] Build `CoordinatorTestimonials` component
- [ ] Style with Tailwind CSS matching existing design system
- [ ] Add responsive breakpoints for mobile/tablet/desktop

### Phase 3: SEO & i18n
- [ ] Implement JSON-LD Schema.org structured data
- [ ] Create Swedish translation file (`coordinator.json`)
- [ ] Create English translation file (`coordinator.json`)
- [ ] Update or create `sitemap.ts` with coordinator URLs
- [ ] Verify `robots.txt` allows coordinator pages
- [ ] Add canonical and hreflang tags

### Phase 4: Testing
- [ ] Test all phone number format redirects
- [ ] Verify 404 handling for invalid phones
- [ ] Test Swedish and English language switching
- [ ] Validate Schema.org markup with Google Rich Results Test
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit for performance/SEO scores
- [ ] Test contact buttons (tel:, mailto:, sms: links)

### Phase 5: Deployment & Monitoring
- [ ] Deploy to production
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for all coordinator pages
- [ ] Monitor indexing status daily for first week
- [ ] Track phone number search rankings
- [ ] Set up PageSpeed Insights monitoring
- [ ] Review Analytics for coordinator page traffic

## Success Metrics

### Primary KPIs
- **Search Rankings:** Top 3 positions for all 5 coordinator phone numbers within 2-4 weeks
- **Click-Through Rate:** >10% from search results
- **Page Load Time:** <2 seconds on mobile
- **Lighthouse SEO Score:** 95+

### Secondary KPIs
- **Bounce Rate:** <40% (users finding relevant info)
- **Time on Page:** >30 seconds (reading content)
- **Contact Actions:** Track tel:/mailto:/sms: link clicks
- **Indexing Speed:** All pages indexed within 48 hours

### Long-Term Goals
- Maintain #1 ranking for all phone numbers
- Increase organic traffic from phone number searches
- Reduce support inquiries about "who called me"
- Strengthen Flyttsmart brand presence in search

## Risk Mitigation

### Technical Risks
- **Risk:** Phone number format variations not captured
  - **Mitigation:** Comprehensive testing of all common formats

- **Risk:** Slow page loads hurt SEO
  - **Mitigation:** Lighthouse monitoring, image optimization, minimal JS

### SEO Risks
- **Risk:** Low ranking due to new domain/pages
  - **Mitigation:** Strong internal linking, schema markup, external promotion

- **Risk:** Duplicate content penalty
  - **Mitigation:** Canonical tags, unique content per coordinator

### Business Risks
- **Risk:** Coordinator information becomes outdated
  - **Mitigation:** Quarterly review process, easy-to-update data file

## Future Enhancements

- Add coordinator availability calendar
- Implement live chat integration
- Create video introductions for each coordinator
- Add service area maps
- Track conversion rates from coordinator pages to service bookings
- A/B test different page layouts for higher conversions
- Add FAQ section per coordinator
- Implement coordinator blog/articles

---

**Document Status:** Approved for Implementation
**Next Step:** Create detailed implementation plan with bite-sized tasks
