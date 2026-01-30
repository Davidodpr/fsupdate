import { cva, type VariantProps } from 'class-variance-authority'

// Create a comprehensive mapping of all text variants from the Stitches implementation
export const textVariants = cva(
  [
    // Base text styles - only include styles that should be present in all variants
    'font-[var(--font-family-main)] leading-[18px] pointer-events-auto',
  ],
  {
    variants: {
      variant: {
        // Extra small variants
        extraSmall: ['text-[length:var(--font-size-small)] sm:text-[length:var(--font-size-3)]', 'font-normal not-italic'],
        extraSmallSemiBold: ['text-[length:var(--font-size-small)] sm:text-[length:var(--font-size-2)]', 'font-normal not-italic'],

        // Body variants (small)
        bodySmall: ['text-[length:var(--font-size-2)]', 'font-normal not-italic'],
        bodyBoldSmall: ['text-[length:var(--font-size-2)]', 'font-bold not-italic'],

        // Standard body variants
        body: ['text-[length:var(--font-size-3)] sm:text-[length:var(--font-size-4)]', 'font-normal not-italic'],
        bodyBold: ['text-[length:var(--font-size-3)] sm:text-[length:var(--font-size-4)]', '!font-bold not-italic'],

        // Medium variants
        medium: ['text-[length:var(--font-size-1)] sm:text-[length:var(--font-size-3)]', 'font-normal not-italic'],
        mediumBold: ['text-[length:var(--font-size-1)] sm:text-[length:var(--font-size-3)]', '!font-bold not-italic'],
        mediumSemibold: ['text-[length:var(--font-size-2)] sm:text-[length:var(--font-size-3)]', 'font-semibold not-italic'],

        // Details variants
        details: ['text-[length:var(--font-size-1)]', 'font-normal'],
        detailsItalic: ['text-[length:var(--font-size-1)]', 'font-normal italic'],

        // Label variant
        label: ['text-[length:var(--font-size-1)]', 'font-semibold'],

        // Italic variants
        smallItalic: ['text-[length:var(--font-size-2)] sm:text-[length:var(--font-size-3)]', 'font-normal italic'],
        bodyItalic: ['text-[length:var(--font-size-3)] sm:text-[length:var(--font-size-4)]', 'font-normal italic'],
        italicExtraSmall: ['text-[10px]', 'italic'],
        italicSmall: ['text-[length:var(--font-size-1)]', 'italic'],

        // Button variant
        button: ['text-[length:var(--font-size-4)]', '!font-bold'],

        // Modal and UI variants
        checklistModalTitle: ['text-[length:var(--font-size-4)] sm:text-[length:var(--font-size-5)]', 'font-semibold text-[var(--color-text-main)]'],

        // Link variants
        linkBig: ['text-[length:var(--font-size-3)] sm:text-[length:var(--font-size-4)]', 'font-semibold'],
        linkBigUnderline: ['text-[length:var(--font-size-3)] sm:text-[length:var(--font-size-4)]', 'font-semibold underline'],
        linkSmall: ['text-[length:var(--font-size-1)] sm:text-[length:var(--font-size-3)]', 'font-bold', 'hover:underline', 'cursor-pointer'],

        // Large text variants
        large: ['text-[length:var(--font-size-4)] sm:text-[length:var(--font-size-6)]', 'font-normal'],
        bodyLarge: ['text-[length:var(--font-size-4)] sm:text-[length:var(--font-size-5)]', 'font-normal'],

        // Small bold variants
        smallBoldUnderline: ['text-[length:var(--font-size-1)]', 'font-bold underline'],
        smallBold: ['text-[length:var(--font-size-1)]', 'font-bold'],

        // Large bold variants
        largeBold: ['sm:!text-[length:var(--font-size-6)]', '!font-bold'],

        // Provider details variant
        providerDetails: ['text-[length:var(--font-size-6)]', 'font-bold'],

        // Extra large variants with black weight
        largeBlack: ['text-[length:var(--font-size-3)] sm:text-[length:var(--font-size-7)]', 'font-black'],
        largerBlack: ['text-[length:var(--font-size-7)]', 'font-black'],

        // Larger variants
        larger: ['text-![length:var(--font-size-7)]', '!font-bold'],

        // Extra large variants
        extraLargeBold: ['text-[length:var(--font-size-6)] sm:text-[length:var(--font-size-8)]', 'font-bold'],
        extraLargeBlack: ['text-[length:var(--font-size-8)]', 'font-black'],
      },

      // Text alignment variants
      textAlign: {
        center: 'text-center',
      },

      // Spacing variants to match Stitches spacing system
      spacing: {
        vertical: 'm-0',
        top: 'mb-0',
        bottom: 'mt-0',
        none: 'm-0',
        less: 'my-1', // 4px equivalent to margin: '4px 0'
      },
    },

    // Default variants
    defaultVariants: {
      variant: 'body',
    },
  },
)

export type TextVariants = VariantProps<typeof textVariants>
