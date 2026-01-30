export const EXPERIMENTS = {
  combinationDiscount: process.env.NEXT_PUBLIC_COMBINATION_DISCOUNT_EXPERIMENT_NAME,
}
export const EXPERIMENT_VARIANTS = {
  combinationDiscount: {
    withDiscount: 'withDiscount',
    withoutDiscount: 'withoutDiscount',
  },
}
