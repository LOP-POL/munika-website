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
export function convertDateWord(date:Date){
    const day = date.getDate()
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    
    const ordinalSuffix = (n: number) => {
        const lastDigit = n % 10
        const lastTwoDigits = n % 100
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th'
        if (lastDigit === 1) return 'st'
        if (lastDigit === 2) return 'nd'
        if (lastDigit === 3) return 'rd'
        return 'th'
    }
    
    return `${day}${ordinalSuffix(day)} ${month} ${year}`
}




