import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'

export default function Loading() {
  return (
    <SpinnerWrapper>
      <Spinner scale={2} color="green" />
    </SpinnerWrapper>
  )
}
