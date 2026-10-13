export const LOCALES = ['en', 'zh'] as const

export type LocaleCode = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: LocaleCode = 'en'

/** Shown in the language switch. Endonyms, not translated. */
export const LOCALE_LABELS: Record<LocaleCode, string> = {
  en: 'EN',
  zh: '中文',
}

/** BCP 47 tags for Intl formatting. */
export const LOCALE_TAGS: Record<LocaleCode, string> = {
  en: 'en-US',
  zh: 'zh-CN',
}

export function isLocale(value: string | undefined): value is LocaleCode {
  return value !== undefined && (LOCALES as readonly string[]).includes(value)
}
