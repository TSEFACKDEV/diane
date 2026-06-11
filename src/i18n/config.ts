export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

/** Noms affichés dans le sélecteur de langue */
export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
}
