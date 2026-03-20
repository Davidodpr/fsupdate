const CHECKLIST_ITEMS = [
  { emoji: '⚡', label: 'Bästa elavtalet' },
  { emoji: '🌐', label: 'Snabbaste bredbandet' },
  { emoji: '📦', label: 'Flytthjälp bokad' },
  { emoji: '🧹', label: 'Flyttstäd klart' },
  { emoji: '📋', label: 'Adress ändrad' },
  { emoji: '🛡️', label: 'Försäkring tecknad' },
  { emoji: '📄', label: 'Deklaration skickad' },
]

const AnimatedDashboard = () => {
  return (
    <div className="animated-dashboard absolute inset-0 flex flex-col bg-[#f8faf9] pt-12 px-3 pb-3">
      {/* Header with addresses */}
      <div className="bg-white rounded-xl px-4 py-3 mb-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <p className="text-[12px] font-bold text-[#214766] mb-2">
          Din flytt
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-[#214766]/50 font-semibold uppercase">Från</p>
            <p className="text-[11px] text-[#214766] font-medium leading-tight">Storgatan 12,</p>
            <p className="text-[11px] text-[#214766] font-medium leading-tight">Stockholm</p>
          </div>
          <div className="text-[#51c8b4] flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-[9px] text-[#214766]/50 font-semibold uppercase">Till</p>
            <p className="text-[11px] text-[#214766] font-medium leading-tight">Ekvägen 8,</p>
            <p className="text-[11px] text-[#214766] font-medium leading-tight">Göteborg</p>
          </div>
        </div>
        <div className="h-[6px] rounded-full bg-[#e8eeef] overflow-hidden">
          <div className="h-full rounded-full bg-[#51c8b4] animate-dashboard-progress" />
        </div>
      </div>

      {/* Checklist */}
      <div className="flex-1 flex flex-col gap-[5px] overflow-hidden">
        {CHECKLIST_ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            {/* Checkbox */}
            <div
              className={`dashboard-check-${i} w-[22px] h-[22px] rounded-md border-2 border-[#d4dbe0] flex items-center justify-center flex-shrink-0`}
            >
              <svg
                className={`dashboard-checkmark-${i} w-3 h-3 text-white`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Label */}
            <span className="text-[13px] font-medium text-[#214766]">
              {item.emoji} {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Personal contact banner */}
      <div className="bg-white rounded-xl px-4 py-4 mt-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-3">
        <img
          src="/images/team-nina.webp"
          alt="Din flyttkoordinator"
          className="w-11 h-11 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-[#214766]">Personlig kontakt</p>
          <p className="text-[10px] text-[#214766]/50">Din flyttkoordinator hjälper dig</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#51c8b4]/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-[#51c8b4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>

      {/* Celebration overlay */}
      <div className="animate-dashboard-celebration absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-[#51c8b4] to-[#37ae9a] px-6">
        {/* Coordinator photos */}
        <div className="flex items-center justify-center mb-4">
          <img src="/images/team-nina.webp" alt="Nina" className="w-14 h-14 rounded-full object-cover border-2 border-white/40 relative z-30" />
          <img src="/images/team-andreas.webp" alt="Andreas" className="w-14 h-14 rounded-full object-cover border-2 border-white/40 -ml-3 relative z-20" />
          <img src="/images/team-joel.webp" alt="Joel" className="w-14 h-14 rounded-full object-cover border-2 border-white/40 -ml-3 relative z-10" />
        </div>
        <p className="text-xl font-bold text-white mb-1">Välkommen hem!</p>
        <p className="text-[13px] text-white/80 text-center leading-relaxed">
          Allt är klart — njut av ditt nya hem
        </p>
      </div>
    </div>
  )
}

export default AnimatedDashboard
