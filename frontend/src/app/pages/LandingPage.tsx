import { Link } from "react-router-dom"
import { ArrowUpRight, Search, Settings, Sparkles } from "lucide-react"
import { FormattedMessage, useIntl } from "react-intl"

import { GlassCard } from "@/components/common/GlassCard"
import { LanguageToggle } from "@/components/common/LanguageToggle"
import { Button } from "@/components/ui/button"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"

const featureCards = [
  "landing.card.glassPanels",
  "landing.card.softBorders",
  "landing.card.monoPalette",
] as const

export function LandingPage() {
  const { getLocalePath } = useLocaleNavigate()
  const intl = useIntl()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Link
                to={getLocalePath("/")}
                className="text-sm font-semibold tracking-wide no-underline hover:text-foreground"
              >
                <FormattedMessage id="title" />
              </Link>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                <FormattedMessage id="landing.tagline" />
              </span>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a href="#overview" className="no-underline transition-colors hover:text-foreground">
                <FormattedMessage id="landing.nav.overview" />
              </a>
              <a href="#workflows" className="no-underline transition-colors hover:text-foreground">
                <FormattedMessage id="landing.nav.workflows" />
              </a>
              <a href="#insights" className="no-underline transition-colors hover:text-foreground">
                <FormattedMessage id="landing.nav.insights" />
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <LanguageToggle variant="ghost" />
              <Button variant="ghost" size="icon" aria-label={intl.formatMessage({ id: "landing.search" })}>
                <Search className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label={intl.formatMessage({ id: "landing.settings" })}>
                <Settings className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section id="overview" className="space-y-8">
          <GlassCard className="flex flex-col gap-6 p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="size-3.5" />
              <FormattedMessage id="landing.badge" />
            </div>

            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <FormattedMessage id="landing.hero.title" />
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                <FormattedMessage id="landing.hero.description" />
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg" className="rounded-xl">
                <Link to={getLocalePath("/notes")} className="no-underline">
                  <FormattedMessage id="landing.hero.cta" />
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground sm:text-sm">
                <FormattedMessage id="landing.hero.meta" />
              </p>
            </div>
          </GlassCard>

          <div id="insights" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((id) => (
              <GlassCard key={id} className="flex flex-col gap-3 p-6">
                <h2 className="text-lg font-semibold">
                  <FormattedMessage id={id} />
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <FormattedMessage
                    id="landing.card.body"
                    values={{
                      glass: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">glass</code>,
                      glassCard: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">glass-card</code>,
                      glassBorder: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">glass-border</code>,
                    }}
                  />
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
