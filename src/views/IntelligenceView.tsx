import { Brain, Sparkles, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { WhatChangedPanel } from '../components/WhatChangedPanel'
import { DemoChip } from '../components/ui/Badge'
import { Panel } from '../components/ui/Panel'
import { answerQuestion, SUGGESTED_PROMPTS, type AssistantContext } from '../analytics/assistant'
import type {
  AnalysisWindow,
  ChangeReport,
  CrimeIncident,
  PoliceStation,
  Recommendation,
  RiskZone,
} from '../types'

interface IntelligenceViewProps {
  incidents: CrimeIncident[]
  zones: RiskZone[]
  changes: ChangeReport
  recommendations: Recommendation[]
  stations: PoliceStation[]
  window: AnalysisWindow
  onFocusArea: (area: string) => void
}

/** Rule-based AI assistant for quick operational questions. */
export function IntelligenceView({
  incidents,
  zones,
  changes,
  recommendations,
  stations,
  window: analysisWindow,
  onFocusArea,
}: IntelligenceViewProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string>('')
  const [sources, setSources] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const context = useMemo<AssistantContext>(
    () => ({
      incidents,
      zones,
      changes,
      recommendations,
      stations,
      window: analysisWindow,
    }),
    [incidents, zones, changes, recommendations, stations, analysisWindow],
  )

  const handleAsk = (text: string) => {
    const q = text.trim()
    if (!q || loading) return
    setLoading(true)
    const res = answerQuestion(q, context)
    setQuestion(q)
    setAnswer(res.text)
    setSources(res.sources)
    setSuggestions(res.suggestions)
    setLoading(false)
  }

  return (
    <div className="scroll-thin flex h-full flex-col gap-3 overflow-y-auto bg-transparent p-3 pb-6 xl:p-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[18px] font-bold leading-tight text-white xl:text-[22px]">
            Intelligence Assistant
          </h1>
          <p className="mt-1 max-w-3xl text-[12px] leading-relaxed text-steel-400">
            Rule-based, explainable assistant. Answers cite concrete values from the current demo
            dataset - never guesses beyond computed risk zones, incidents and changes.
          </p>
        </div>
        <DemoChip />
      </header>

      <div className="grid gap-3 xl:grid-cols-[1.4fr_1fr] font-serif">
        <section className="flex flex-col rounded-xl border border-slate-200/90 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] text-slate-900 font-serif">
          <header className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
            <span className="grid size-6 place-items-center rounded bg-blue-600/10 text-blue-700">
              <Brain className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-blue-950 font-serif">Ask Assistant</p>
              <p className="text-[10px] text-slate-500 font-serif">e.g. "Which area needs patrols now?"</p>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-2.5 p-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              placeholder="Ask about risk zones, trends, hotspots, recommendations..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none font-serif"
            />
            <div className="flex flex-wrap gap-1.5 font-serif">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleAsk(prompt)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 hover:border-blue-500 hover:text-blue-700 font-serif"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAsk(question)}
              disabled={loading}
              className="mt-auto inline-flex items-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2 text-[12px] font-bold text-white hover:bg-blue-700 disabled:opacity-60 shadow-xs"
            >
              {loading ? 'Thinking...' : 'Ask'}
              <Sparkles className="size-4" />
            </button>
          </div>
          {answer ? (
            <div className="border-t border-slate-100 px-4 py-3 font-serif">
              <p className="text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap font-serif">
                {answer}
              </p>
              {sources.length > 0 ? (
                <div className="mt-2 border-t border-slate-100 pt-2 font-serif">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Sources
                  </p>
                  <ul className="mt-1 space-y-0.5 text-[11px] text-slate-600">
                    {sources.map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {suggestions.length > 0 ? (
                <div className="mt-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-steel-500">
                    Follow-ups
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleAsk(s)}
                        className="rounded-full border border-navy-600 px-2 py-0.5 text-[10px] text-steel-300 hover:border-blue-500/60 hover:text-blue-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <WhatChangedPanel report={changes} onFocusArea={onFocusArea} />
      </div>

      <Panel title="Assistant guidelines" subtitle="Explainable & rule-based">
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-steel-400">
          <li className="flex items-start gap-1.5">
            <Zap className="mt-0.5 size-3.5 text-blue-400" /> Answers only from computed analytics:
            risk zones, incidents, changes, forecast summary and dispatch.
          </li>
          <li className="flex items-start gap-1.5">
            <Zap className="mt-0.5 size-3.5 text-blue-400" /> Cites numbers (counts, % change, risk
            scores) when relevant.
          </li>
          <li className="flex items-start gap-1.5">
            <Zap className="mt-0.5 size-3.5 text-blue-400" /> Never claims live feeds or exact
            prediction - uses "Risk Forecast" terminology.
          </li>
          <li className="flex items-start gap-1.5">
            <Zap className="mt-0.5 size-3.5 text-blue-400" /> Designed to be swappable for an LLM API
            later without changing UI contracts.
          </li>
        </ul>
      </Panel>
    </div>
  )
}
