import Spinner from '@/components/atoms/Spinner'

export default function Loading() {
  return (
    <div className="flex flex-col flex-grow bg-[rgb(232,237,240)] min-h-screen">
      <div className="flex items-center justify-center flex-grow">
        <div className="flex flex-col items-center">
          <Spinner scale={3} color="green" />
        </div>
      </div>
    </div>
  )
}
