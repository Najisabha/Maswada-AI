import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { useIntl } from "react-intl"

type LanguageToggleProps = {
  variant?: "outline" | "ghost"
  size?: "default" | "sm"
}

export function LanguageToggle({ variant = "outline", size = "sm" }: LanguageToggleProps) {
  const { isRTL, toggleLanguage } = useLanguage()
  const intl = useIntl()

  return (
    <Button onClick={toggleLanguage} variant={variant} size={size}>
      {isRTL ? intl.formatMessage({ id: "language.english" }) : intl.formatMessage({ id: "language.arabic" })}
    </Button>
  )
}
