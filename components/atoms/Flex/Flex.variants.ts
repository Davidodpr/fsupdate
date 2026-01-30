import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Flex component variants using class-variance-authority
 * Supports all flexbox properties with responsive variants
 * Based on original Stitches implementation from Flex.tsx
 */
export const flexVariants = cva(
  [
    // Base flex display - always flex by default
    'flex',
  ],
  {
    variants: {
      // Display variants (flex vs inline-flex)
      display: {
        flex: 'flex',
        inline: 'inline-flex',
      },

      // Flex direction variants
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'column-reverse': 'flex-col-reverse',
      },

      // Justify content variants
      justifyContent: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        stretch: 'justify-stretch',
        'space-between': 'justify-between',
      },

      // Justify items variants (for grid-like behavior)
      justifyItems: {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch',
        baseline: 'justify-items-baseline',
      },

      // Justify self variants
      justifySelf: {
        start: 'justify-self-start',
        center: 'justify-self-center',
        end: 'justify-self-end',
        stretch: 'justify-self-stretch',
        baseline: 'justify-self-baseline',
      },

      // Align content variants
      alignContent: {
        start: 'content-start',
        center: 'content-center',
        end: 'content-end',
        stretch: 'content-stretch',
        'space-between': 'content-between',
      },

      // Align items variants
      alignItems: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },

      // Align self variants
      alignSelf: {
        start: 'self-start',
        center: 'self-center',
        end: 'self-end',
        stretch: 'self-stretch',
        baseline: 'self-baseline',
      },

      // Flex wrap variants
      wrap: {
        wrap: 'flex-wrap',
        noWrap: 'flex-nowrap',
        reverse: 'flex-wrap-reverse',
      },

      // Gap variants for spacing between flex items
      // Using theme-aware spacing with CSS custom properties
      gap: {
        0: 'gap-0',
        1: 'gap-1', // 4px
        2: 'gap-2', // 8px
        3: 'gap-3', // 12px
        4: 'gap-4', // 16px
        5: 'gap-5', // 20px
        6: 'gap-6', // 24px
        8: 'gap-8', // 32px
        10: 'gap-10', // 40px
        12: 'gap-12', // 48px
        16: 'gap-16', // 64px
        // Custom pixel-based gaps for exact matches
        'px-5': '[&>*:not(:first-child)]:ml-[5px] [&.flex-col>*:not(:first-child)]:!ml-0 [&.flex-col>*:not(:first-child)]:mt-[5px]',
        'px-8': '[&>*:not(:first-child)]:ml-[8px] [&.flex-col>*:not(:first-child)]:!ml-0 [&.flex-col>*:not(:first-child)]:mt-[8px]',
        'px-10': '[&>*:not(:first-child)]:ml-[10px] [&.flex-col>*:not(:first-child)]:!ml-0 [&.flex-col>*:not(:first-child)]:mt-[10px]',
        'px-16': '[&>*:not(:first-child)]:ml-[16px] [&.flex-col>*:not(:first-child)]:!ml-0 [&.flex-col>*:not(:first-child)]:mt-[16px]',
      },

      // Flex grow variants
      flex: {
        1: 'flex-1',
        auto: 'flex-auto',
        initial: 'flex-initial',
        none: 'flex-none',
      },

      // Width and height utilities
      fullWidth: {
        true: 'w-full',
      },

      fullHeight: {
        true: 'h-full',
      },

      // Responsive direction variants for common patterns
      // This handles the @initial/@sm pattern seen in usage
      responsiveDirection: {
        'col-to-row': 'flex-col sm:flex-row',
        'row-to-col': 'flex-row sm:flex-col',
        'col-to-row-reverse': 'flex-col sm:flex-row-reverse',
        'row-to-col-reverse': 'flex-row sm:flex-col-reverse',
      },

      // Responsive align items for common patterns
      responsiveAlignItems: {
        'start-to-center': 'items-start sm:items-center',
        'center-to-start': 'items-center sm:items-start',
        'start-to-end': 'items-start sm:items-end',
        'end-to-start': 'items-end sm:items-start',
      },

      // Responsive justify content patterns
      responsiveJustifyContent: {
        'start-to-center': 'justify-start sm:justify-center',
        'center-to-start': 'justify-center sm:justify-start',
        'start-to-between': 'justify-start sm:justify-between',
        'between-to-start': 'justify-between sm:justify-start',
      },
    },

    defaultVariants: {
      display: 'flex',
      direction: 'row',
    },
  },
)

export type FlexVariants = VariantProps<typeof flexVariants>

// Export individual variant types for more granular typing
export type FlexDisplay = NonNullable<FlexVariants['display']>
export type FlexDirection = NonNullable<FlexVariants['direction']>
export type FlexJustifyContent = NonNullable<FlexVariants['justifyContent']>
export type FlexAlignItems = NonNullable<FlexVariants['alignItems']>
export type FlexWrap = NonNullable<FlexVariants['wrap']>
export type FlexGap = NonNullable<FlexVariants['gap']>
