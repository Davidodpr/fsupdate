export type MoveInfoCardProps = {
  children: React.ReactNode
}

export const MoveInfoCard = ({ children }: MoveInfoCardProps) => {
  return (
    <div className="flex flex-col items-start p-0 gap-4 flex-none pb-4 pt-4 md:w-[821px] md:h-auto md:px-40 md:py-8">
      <div className="flex flex-col items-start px-4 py-0 gap-4 w-full h-full rounded-[10px] md:p-0 md:w-[501px] md:h-auto">
        <div className="flex flex-col items-center p-0 gap-2 h-auto bg-white rounded-lg flex-none self-stretch flex-grow-0">{children}</div>
      </div>
    </div>
  )
}
