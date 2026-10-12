import type { ReactNode } from 'react'

interface PanelProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function Panel({ title, subtitle, actions, children, className = '', bodyClassName = 'p-4' }: PanelProps) {
  return (
    <section
      className={`rounded-xl border transition-all duration-200 ${className}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        color: 'var(--card-text-body)',
      }}
    >
      <header
        className="flex items-start justify-between gap-3 border-b px-4 py-3"
        style={{ borderColor: 'var(--card-header-border)' }}
      >
        <div className="min-w-0">
          <h2
            className="text-[16px] font-semibold tracking-tight font-sans transition-colors"
            style={{ color: 'var(--card-text-title)' }}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className="mt-0.5 text-[12px] font-semibold transition-colors"
              style={{ color: 'var(--card-text-muted)' }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
        {actions}
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}
