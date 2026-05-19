import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"
import { LanguageToggle } from "@/components/common/LanguageToggle"

export function Header() {
  const { getLocalePath } = useLocaleNavigate()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to={getLocalePath("/notes")}
              className="text-sm font-semibold tracking-wide no-underline hover:text-foreground"
            >
              <FormattedMessage id="title" />
            </Link>
            <span className="text-xs text-muted-foreground">
              <FormattedMessage id="tagline" />
            </span>
          </div>

          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
