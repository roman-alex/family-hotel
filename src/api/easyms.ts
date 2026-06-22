export type EasyMsDailyAvailability = {
  categoryId: number
  categoryName: string
  availability: number
}

const reservationModuleKey = import.meta.env.VITE_EASYMS_RESERVATION_MODULE_KEY
const baseUrl = reservationModuleKey
  ? `https://my.easyms.co/api/reservation/pub/${reservationModuleKey}`
  : ''

export async function getEasyMsDailyAvailability(
  startIso: string,
  endIso: string,
) {
  const params = new URLSearchParams({
    startTime: String(dateToUnixMidnight(startIso)),
    endTime: String(dateToUnixMidnight(endIso)),
  })

  return requestEasyMs<EasyMsDailyAvailability[]>(
    `/availableCategories?${params}`,
  )
}

export async function getEasyMsAvailabilityByNights(
  startIso: string,
  endIso: string,
) {
  const nights = getNightRanges(startIso, endIso)
  const availabilityByNight = await Promise.all(
    nights.map((night) =>
      getEasyMsDailyAvailability(night.startIso, night.endIso),
    ),
  )

  return availabilityByNight.map((items, index) => ({
    ...nights[index],
    items,
  }))
}

export function getNightRanges(startIso: string, endIso: string) {
  const start = parseIsoDate(startIso)
  const end = parseIsoDate(endIso)
  const ranges: { startIso: string; endIso: string }[] = []
  const current = new Date(start)

  while (current < end) {
    const next = new Date(current)
    next.setDate(current.getDate() + 1)

    ranges.push({
      startIso: toIsoDate(current),
      endIso: toIsoDate(next),
    })

    current.setDate(current.getDate() + 1)
  }

  return ranges
}

export function dateToUnixMidnight(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

function parseIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

async function requestEasyMs<T>(path: string): Promise<T> {
  if (!baseUrl) {
    throw new Error('EasyMS reservation module key is not configured.')
  }

  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`EasyMS request failed with status ${response.status}.`)
  }

  return response.json() as Promise<T>
}
