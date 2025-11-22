export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

export function formatEventTime(event: any) {
  if (!event) return ''
  const start = event.start
  const end = event.end
  if (!start || !end) return ''
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return `${start.toLocaleString(undefined, options)} - ${end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
}




