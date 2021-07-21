export const formatTime = (d: Date, locale = 'en-US'): string =>
  d.toLocaleString(locale, { hour: '2-digit', minute: '2-digit', hour12: true })

export const formatToLocaleDateString = (
  date: Date,
  locale = 'en_US',
  options: Intl.DateTimeFormatOptions | undefined = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  },
): string => date.toLocaleDateString(locale?.replace('_', '-'), options)
