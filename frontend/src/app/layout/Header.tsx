import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { useAuth } from "@clerk/clerk-react"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"
import { LanguageToggle } from "@/components/common/LanguageToggle"
import { Button } from "@/components/ui/button"

export function Header() {
  const { getLocalePath } = useLocaleNavigate()
  const { isSignedIn } = useAuth()

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

          <div className="flex items-center gap-2">
            <LanguageToggle />
            {!isSignedIn && (
              <Button asChild variant="outline" size="sm">
                <Link to={getLocalePath("/sign-in")} className="no-underline">
                  <FormattedMessage id="guest.signIn" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
