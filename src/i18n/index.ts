import 'server-only'
import { Locale, locales, defaultLocale } from './config'
import type { Dictionary } from './dictionaries/fr'

const dictionaries = {
  fr: () => import('./dictionaries/fr').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
}

export { type Locale, type Dictionary, locales, defaultLocale }

export function hasLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale)
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

/**
 * Lit la locale depuis le cookie `NEXT_LOCALE`.
 * Utilisé dans les Server Components via les headers.
 */
export function getLocaleFromCookie(cookieLocale: string | undefined): Locale {
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale
  return defaultLocale
}
