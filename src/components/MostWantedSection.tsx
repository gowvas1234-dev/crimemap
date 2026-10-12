import { useState } from 'react'
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Eye,
  FileText,
  MapPin,
  PhoneCall,
  Send,
  ShieldAlert,
  UserX,
  X,
} from 'lucide-react'
import { MOST_WANTED_LIST, type WantedPerson } from '../data/mostWanted'

type CategoryFilter = 'All' | WantedPerson['primaryCategory']

export function MostWantedSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [activeDossier, setActiveDossier] = useState<WantedPerson | null>(null)
  const [tipTarget, setTipTarget] = useState<WantedPerson | null>(null)
  const [tipSubmitted, setTipSubmitted] = useState(false)
  const [tipLocation, setTipLocation] = useState('')
  const [tipMessage, setTipMessage] = useState('')
  const [tipContact, setTipContact] = useState('')

  const filteredPersons = selectedCategory === 'All'
    ? MOST_WANTED_LIST
    : MOST_WANTED_LIST.filter((person) => person.primaryCategory === selectedCategory)

  const handleOpenTip = (person: WantedPerson) => {
    setTipTarget(person)
    setTipSubmitted(false)
    setTipLocation('')
    setTipMessage('')
    setTipContact('')
  }

  const handleSubmitTip = (e: React.FormEvent) => {
    e.preventDefault()
    setTipSubmitted(true)
    setTimeout(() => {
      // Auto close after 2.5 seconds
      setTimeout(() => {
        setTipTarget(null)
        setTipSubmitted(false)
      }, 2000)
    }, 500)
  }

  return (
    <section
      className="rounded-xl border transition-all duration-200 mt-2"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        color: 'var(--card-text-body)',
      }}
      aria-label="Puducherry Police Most Wanted Registry"
    >
      {/* 1. Header Bar */}
      <header
        className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        style={{ borderColor: 'var(--card-header-border)' }}
      >
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue-600/20 text-sky-400 border border-blue-500/30">
            <UserX className="size-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className="text-[17px] sm:text-[19px] font-extrabold tracking-tight font-sans transition-colors"
                style={{ color: 'var(--card-text-title)' }}
              >
                Puducherry Police &middot; Most Wanted Registry
              </h2>
              <span className="inline-flex items-center gap-1 rounded bg-[#0f2444] border border-blue-500/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-300 shadow-xs">
                <AlertTriangle className="size-3 text-amber-400" />
                Active Warrants
              </span>
            </div>
            <p
              className="mt-0.5 text-[12px] font-semibold transition-colors"
              style={{ color: 'var(--card-text-muted)' }}
            >
              Non-Bailable Warrants (NBW) &middot; Criminal Investigation Department &middot; Special Operations Group
            </p>
          </div>
        </div>

        {/* Tip line quick-action */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 rounded-lg border border-blue-500/40 bg-navy-950/80 px-3 py-1.5 text-steel-200 shadow-xs">
            <PhoneCall className="size-4 text-sky-400 animate-pulse" />
            <div className="text-left font-sans">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-sky-300">Confidential Hotline</span>
              <span className="font-mono text-[12px] font-black text-white">Dial 112 / 100</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-navy-800/80 px-4 py-3 sm:px-6 bg-navy-950/40">
        <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-steel-400 font-sans">
          Filter By:
        </span>
        {(['All', 'Violent Crimes', 'Armed Robbery', 'Extortion & Gangs', 'Financial & Cyber', 'Narcotics'] as CategoryFilter[]).map((cat) => {
          const count = cat === 'All'
            ? MOST_WANTED_LIST.length
            : MOST_WANTED_LIST.filter((p) => p.primaryCategory === cat).length
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] font-bold font-sans transition-all cursor-pointer ${
                isActive
                  ? 'border-blue-500 bg-blue-600 text-white shadow-xs'
                  : 'border-navy-700 bg-navy-900/90 text-steel-200 hover:border-navy-600 hover:text-white'
              }`}
            >
              <span>{cat}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${isActive ? 'bg-black/30 text-white' : 'bg-navy-800 text-steel-400'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* 3. Cards Grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPersons.map((person) => {
            const isCritical = person.threatLevel === 'Critical'
            const isHigh = person.threatLevel === 'High'

            return (
              <div
                key={person.id}
                className="group relative flex flex-col rounded-xl border border-navy-700 bg-navy-900/95 overflow-hidden transition-all duration-200 hover:border-blue-500/70 hover:shadow-xl"
              >
                {/* Navy Blue Wanted Banner Bar */}
                <div className="flex items-center justify-between bg-[#0f2444] border-b border-blue-900/60 px-3 py-1.5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-400">
                    WANTED BY POLICE
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-tight text-steel-200">
                    {person.warrantNumber}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  {/* Top Profile Header: Photo & Identity */}
                  <div className="flex gap-3.5">
                    {/* Mugshot Image with Reward Stamp */}
                    <div className="relative size-24 shrink-0 rounded-lg overflow-hidden border-2 border-navy-700 bg-navy-950 shadow-inner">
                      <img
                        src={person.photo}
                        alt={`Photograph of wanted fugitive ${person.name}`}
                        className="h-full w-full object-cover object-center grayscale contrast-125 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback avatar if external image fails
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=0b1a30&color=fff&size=150`
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-navy-950/95 border-t border-navy-700 py-0.5 text-center text-[9px] font-black text-sky-300 tracking-widest uppercase">
                        FUGITIVE
                      </div>
                    </div>

                    {/* Identity Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-steel-400 font-semibold">{person.id}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            isCritical
                              ? 'bg-blue-600/20 text-sky-300 border border-blue-500/40'
                              : isHigh
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-slate-700/30 text-steel-200 border border-slate-600/40'
                          }`}
                        >
                          {person.threatLevel} Alert
                        </span>
                      </div>

                      <h3 className="mt-1 truncate text-[15px] font-black text-white font-sans group-hover:text-sky-300 transition-colors">
                        {person.name}
                      </h3>

                      <p className="text-[12px] font-bold text-amber-400 font-sans">
                        Alias: &ldquo;{person.alias}&rdquo;
                      </p>

                      <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 text-amber-300">
                        <Award className="size-3" />
                        <span className="text-[11px] font-black font-mono tracking-tight">
                          Reward: {person.rewardAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="mt-3.5 rounded-lg border border-navy-800 bg-navy-950/70 p-2.5 text-[11px] space-y-1.5 font-sans">
                    <div className="flex items-center justify-between text-steel-300">
                      <span className="text-steel-400 font-medium">Age &middot; Height:</span>
                      <span className="font-bold text-white">{person.age} yrs &middot; {person.height}</span>
                    </div>

                    <div className="flex items-center justify-between text-steel-300">
                      <span className="text-steel-400 font-medium">Last Locality:</span>
                      <span className="inline-flex items-center gap-1 font-bold text-sky-400 truncate max-w-[150px]">
                        <MapPin className="size-3 shrink-0" />
                        {person.lastKnownArea}
                      </span>
                    </div>

                    <div className="pt-1 border-t border-navy-800/80">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-steel-400 mb-1">
                        Primary Charges:
                      </span>
                      <ul className="space-y-0.5">
                        {person.charges.slice(0, 2).map((charge, idx) => (
                          <li key={idx} className="truncate text-[11px] text-steel-200 font-medium flex items-center gap-1.5">
                            <span className="size-1 rounded-full bg-sky-400 shrink-0" />
                            {charge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Caution Warning Box */}
                  <div className="mt-2.5 flex items-start gap-1.5 rounded border border-navy-700 bg-navy-950/80 px-2 py-1.5 text-[10px] text-steel-300 font-sans leading-tight">
                    <ShieldAlert className="size-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{person.cautionNotice}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 pt-2.5 border-t border-navy-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDossier(person)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-navy-600 bg-navy-800 px-3 py-1.5 text-[11px] font-bold text-steel-100 hover:border-steel-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="size-3.5" />
                      <span>Full Dossier</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenTip(person)}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-blue-600 bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-500 transition-colors shadow-xs cursor-pointer"
                    >
                      <Send className="size-3.5" />
                      <span>Submit Tip</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 4. Bottom Disclaimer & Instructions */}
        <div className="mt-6 rounded-xl border border-navy-700 bg-navy-950/80 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-400 border border-amber-400/30">
              <ShieldAlert className="size-4.5" />
            </span>
            <div className="text-left">
              <h4 className="text-[13px] font-bold text-white">
                Public Safety Advisory &middot; Do Not Attempt Apprehension
              </h4>
              <p className="mt-0.5 text-[11px] text-steel-400 leading-snug">
                These individuals are considered dangerous and may be armed. If sighted, do not take personal action.
                Call the Police Control Room immediately at <strong>112</strong> or <strong>0413-2231300</strong>, or submit an anonymous confidential tip.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-[10px] text-steel-400 font-mono text-center sm:text-right block">
              Puducherry Police CDE<br />Registry Ref: CRB-2026-WNT
            </span>
            <button
              type="button"
              onClick={() => handleOpenTip(MOST_WANTED_LIST[0])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-[12px] font-bold text-white transition-colors cursor-pointer shadow-sm"
            >
              <Send className="size-3.5" />
              General Anonymous Tip
            </button>
          </div>
        </div>
      </div>

      {/* 5. Full Dossier Modal */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-navy-600 bg-navy-900 text-white shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header - Police Navy Blue */}
            <div className="flex items-center justify-between border-b border-navy-700 bg-[#0f2444] px-6 py-3.5 text-white">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-5 text-sky-400" />
                <span className="text-[12px] font-black uppercase tracking-widest font-sans text-white">
                  Official Fugitive Dossier &middot; {activeDossier.warrantNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveDossier(null)}
                className="rounded p-1 text-steel-400 hover:bg-navy-800 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 font-sans">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Large Mugshot */}
                <div className="relative size-36 shrink-0 rounded-xl overflow-hidden border-2 border-blue-500/70 bg-navy-950 shadow-md">
                  <img
                    src={activeDossier.photo}
                    alt={activeDossier.name}
                    className="h-full w-full object-cover object-center grayscale contrast-125"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-navy-950/95 border-t border-navy-700 py-1 text-center text-[10px] font-black uppercase text-sky-300 tracking-wider">
                    {activeDossier.threatLevel} ALERT
                  </div>
                </div>

                {/* Identity & Bounty */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl font-black text-white">{activeDossier.name}</h3>
                    <span className="rounded-md bg-blue-600/20 border border-blue-500/40 px-2.5 py-1 text-[11px] font-black text-sky-300">
                      {activeDossier.status}
                    </span>
                  </div>

                  <p className="text-[14px] font-bold text-amber-400">
                    Moniker / Known As: &ldquo;{activeDossier.alias}&rdquo;
                  </p>

                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-amber-300">
                    <Award className="size-4" />
                    <span className="text-[13px] font-black font-mono">
                      Bounty Reward: {activeDossier.rewardAmount}
                    </span>
                  </div>

                  <p className="text-[11px] text-steel-400">
                    Registry ID: <span className="font-mono text-white font-bold">{activeDossier.id}</span> &middot; Issued by: <span className="text-white font-medium">{activeDossier.issuingAuthority}</span>
                  </p>
                </div>
              </div>

              {/* Physical Specifications Grid */}
              <div className="rounded-xl border border-navy-700 bg-navy-950 p-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-steel-400 mb-2">
                  Physical Profile &amp; Identifying Characteristics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px]">
                  <div>
                    <span className="block text-[10px] text-steel-400">Gender</span>
                    <span className="font-bold text-white">{activeDossier.gender}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-steel-400">Approx. Age</span>
                    <span className="font-bold text-white">{activeDossier.age} years</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-steel-400">Height</span>
                    <span className="font-bold text-white">{activeDossier.height}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-3 pt-2 border-t border-navy-800">
                    <span className="block text-[10px] text-steel-400">Identifying Marks &amp; Features</span>
                    <span className="font-semibold text-amber-300">{activeDossier.identifyingMarks}</span>
                  </div>
                </div>
              </div>

              {/* Legal Charges Section */}
              <div className="rounded-xl border border-navy-700 bg-navy-950 p-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-steel-400 mb-2">
                  Charges Filed / Court Case Invocations
                </h4>
                <ul className="space-y-1.5 text-[12px]">
                  {activeDossier.charges.map((charge, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-steel-100 font-medium">
                      <FileText className="size-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{charge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caution Banner */}
              <div className="rounded-xl border border-navy-700 bg-navy-950/80 p-3.5 text-[12px] text-steel-200 flex items-start gap-3">
                <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 uppercase tracking-wide text-[11px]">
                    Caution / Security Notice:
                  </strong>
                  <span>{activeDossier.cautionNotice}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveDossier(null)}
                  className="rounded-lg border border-navy-700 px-4 py-2 text-[12px] font-bold text-steel-200 hover:bg-navy-800 cursor-pointer"
                >
                  Close Dossier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const person = activeDossier
                    setActiveDossier(null)
                    handleOpenTip(person)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-5 py-2 text-[12px] font-bold text-white hover:bg-blue-500 cursor-pointer shadow-md"
                >
                  <Send className="size-4" />
                  Submit Confidential Tip on this Person
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Confidential Tip Submission Modal */}
      {tipTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg rounded-2xl border border-navy-600 bg-navy-900 text-white shadow-2xl font-sans"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-navy-700 bg-navy-950 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Send className="size-4 text-sky-400" />
                <h3 className="text-[14px] font-bold text-white">
                  Submit Confidential Tip &middot; {tipTarget.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTipTarget(null)}
                className="rounded p-1 text-steel-400 hover:text-white cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {tipSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="size-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Tip Received Securely</h4>
                <p className="text-[12px] text-steel-300 max-w-sm mx-auto">
                  Your confidential intelligence report has been dispatched to the Puducherry Police Special Operations Cell.
                  Reference ID: <strong className="text-emerald-400 font-mono">TIP-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTip} className="p-5 space-y-4">
                <div className="rounded-lg border border-navy-700 bg-navy-950/80 p-2.5 text-[11px] text-steel-300 flex items-center gap-2">
                  <ShieldAlert className="size-4 text-sky-400 shrink-0" />
                  <span>
                    Your identity is fully protected. Information submitted here is strictly confidential and encrypted.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1">
                    Where or When Did You Spot this Person? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Near Bus Stand, Muthialpet on 11 Oct around 8 PM"
                    value={tipLocation}
                    onChange={(e) => setTipLocation(e.target.value)}
                    className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-[13px] text-white outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1">
                    Additional Details / Vehicle / Associates
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any vehicle registration number, clothing, companions, or current whereabouts..."
                    value={tipMessage}
                    onChange={(e) => setTipMessage(e.target.value)}
                    className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-[13px] text-white outline-none focus:border-blue-500 font-sans resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1">
                    Your Contact Number or Email (Optional &middot; For Reward Eligibility)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank to remain 100% anonymous"
                    value={tipContact}
                    onChange={(e) => setTipContact(e.target.value)}
                    className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-[13px] text-white outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-navy-800">
                  <button
                    type="button"
                    onClick={() => setTipTarget(null)}
                    className="rounded-lg border border-navy-700 px-4 py-2 text-[12px] font-bold text-steel-300 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-5 py-2 text-[12px] font-bold text-white hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="size-3.5" />
                    Transmit Confidential Tip
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
