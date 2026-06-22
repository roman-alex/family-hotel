import type { EasyMsDailyAvailability } from '../api/easyms'
import type {
  HotelAvailabilityItem,
  RoomCategory,
  SeasonalPrice,
} from '../data/hotel'

type AvailabilityByNight = {
  startIso: string
  endIso: string
  items: EasyMsDailyAvailability[]
}

type CategoryAvailabilityRange = {
  startIso: string
  endIso: string
}

const displayDateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
})

const weekdayLabels = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const currencyFormatter = new Intl.NumberFormat('uk-UA', {
  maximumFractionDigits: 0,
})

export function getAvailableCategoryItemsForRange(
  categories: RoomCategory[],
  availabilityByNight: AvailabilityByNight[],
) {
  if (availabilityByNight.length === 0) {
    return []
  }

  const localCategories = new Map(
    categories.map((category) => [category.categoryId, category]),
  )
  const categoryOrder = new Map(
    categories.map((category, index) => [String(category.categoryId), index]),
  )
  const categoryIds = getAvailableCategoryIds(availabilityByNight)

  return categoryIds
    .flatMap((categoryId) => {
      const ranges = getAvailableRangesForCategory(categoryId, availabilityByNight)
      const localCategory = localCategories.get(categoryId)
      const fallbackName = getCategoryNameFromAvailability(
        categoryId,
        availabilityByNight,
      )

      return ranges
        .filter((range) => getNights(range.startIso, range.endIso) >= 2)
        .map((range) =>
          toAvailabilityItem({
            categoryId,
            title: localCategory?.title || fallbackName || `Категорія ${categoryId}`,
            description:
              localCategory?.description ||
              'Категорія доступна для вибраного періоду.',
            fallbackPricePerNight: localCategory?.priceFrom,
            prices: localCategory?.prices || [],
            image: localCategory?.image,
            capacityLabel: localCategory
              ? `${localCategory.capacity.max} гостей`
              : undefined,
            amenities: localCategory?.amenities || [],
            range,
          }),
        )
    })
    .sort((a, b) => {
      const startCompare = a.startIso.localeCompare(b.startIso)

      if (startCompare !== 0) {
        return startCompare
      }

      const endCompare = a.endIso.localeCompare(b.endIso)

      if (endCompare !== 0) {
        return endCompare
      }

      const categoryCompare =
        (categoryOrder.get(a.categoryId) ?? Number.MAX_SAFE_INTEGER) -
        (categoryOrder.get(b.categoryId) ?? Number.MAX_SAFE_INTEGER)

      if (categoryCompare !== 0) {
        return categoryCompare
      }

      return a.title.localeCompare(b.title, 'uk')
    })
}

function getAvailableCategoryIds(availabilityByNight: AvailabilityByNight[]) {
  return Array.from(
    new Set(
      availabilityByNight.flatMap((night) =>
        night.items.map((item) => item.categoryId),
      ),
    ),
  )
}

function getAvailableRangesForCategory(
  categoryId: number,
  availabilityByNight: AvailabilityByNight[],
) {
  const ranges: CategoryAvailabilityRange[] = []
  let rangeStartIso: string | null = null
  let rangeEndIso: string | null = null

  availabilityByNight.forEach((night) => {
    const item = night.items.find((entry) => entry.categoryId === categoryId)

    if (item) {
      rangeStartIso ??= night.startIso
      rangeEndIso = night.endIso
      return
    }

    if (rangeStartIso && rangeEndIso) {
      ranges.push({
        startIso: rangeStartIso,
        endIso: rangeEndIso,
      })
    }

    rangeStartIso = null
    rangeEndIso = null
  })

  if (rangeStartIso && rangeEndIso) {
    ranges.push({
      startIso: rangeStartIso,
      endIso: rangeEndIso,
    })
  }

  return ranges
}

function toAvailabilityItem({
  categoryId,
  title,
  description,
  fallbackPricePerNight,
  prices,
  image,
  capacityLabel,
  amenities,
  range,
}: {
  categoryId: number
  title: string
  description: string
  fallbackPricePerNight?: number
  prices: SeasonalPrice[]
  image?: string
  capacityLabel?: string
  amenities: string[]
  range: CategoryAvailabilityRange
}): HotelAvailabilityItem {
  const nights = getNights(range.startIso, range.endIso)
  const priceSummary = getPriceSummary(
    prices,
    fallbackPricePerNight,
    range.startIso,
    range.endIso,
  )

  return {
    id: `${categoryId}-${range.startIso}-${range.endIso}`,
    categoryId: String(categoryId),
    title,
    description,
    dateLabel: `${formatDisplayDate(range.startIso)} - ${formatDisplayDate(range.endIso)}`,
    startIso: range.startIso,
    endIso: range.endIso,
    startDate: formatDisplayDate(range.startIso),
    endDate: formatDisplayDate(range.endIso),
    nights,
    priceLabel: priceSummary
      ? formatPriceLabel(priceSummary, nights)
      : 'Ціну уточнюйте',
    weekdayLabel: formatWeekdayRange(range.startIso, range.endIso),
    image,
    badges: [
      `${nights} ${pluralizeNights(nights)}`,
      ...(capacityLabel ? [capacityLabel] : []),
      ...getUniqueAmenities(amenities, capacityLabel),
    ],
  }
}

function getUniqueAmenities(amenities: string[], capacityLabel?: string) {
  if (!capacityLabel) {
    return amenities
  }

  return amenities.filter((amenity) => !isGuestCapacityAmenity(amenity))
}

function isGuestCapacityAmenity(amenity: string) {
  return amenity.toLowerCase().includes('гост')
}

function getPriceSummary(
  prices: SeasonalPrice[],
  fallbackPricePerNight: number | undefined,
  startIso: string,
  endIso: string,
) {
  const nightlyPrices = getNightIsoValues(startIso, endIso)
    .map(
      (nightIso) =>
        getSeasonalPriceForDate(prices, nightIso) ?? fallbackPricePerNight,
    )
    .filter((price): price is number => typeof price === 'number')

  if (nightlyPrices.length === 0) {
    return null
  }

  return {
    total: nightlyPrices.reduce((sum, price) => sum + price, 0),
    min: Math.min(...nightlyPrices),
    max: Math.max(...nightlyPrices),
  }
}

function formatPriceLabel(
  priceSummary: { total: number; min: number; max: number },
  nights: number,
) {
  if (nights <= 1) {
    return `${currencyFormatter.format(priceSummary.min)} ₴ / доба`
  }

  const nightlyLabel =
    priceSummary.min === priceSummary.max
      ? `${currencyFormatter.format(priceSummary.min)} ₴ / доба`
      : `від ${currencyFormatter.format(priceSummary.min)} ₴ / доба`

  return `${currencyFormatter.format(priceSummary.total)} ₴ за період · ${nightlyLabel}`
}

function getSeasonalPriceForDate(prices: SeasonalPrice[], isoDate: string) {
  const monthDay = isoDate.slice(5)

  return prices.find((season) => monthDay >= season.from && monthDay < season.to)
    ?.price
}

function getNightIsoValues(startIso: string, endIso: string) {
  const dates: string[] = []
  const current = parseIsoDate(startIso)
  const end = parseIsoDate(endIso)

  while (current < end) {
    dates.push(formatIsoDate(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getCategoryNameFromAvailability(
  categoryId: number,
  availabilityByNight: AvailabilityByNight[],
) {
  return availabilityByNight
    .flatMap((night) => night.items)
    .find((item) => item.categoryId === categoryId)?.categoryName
}

export function getNights(startIso: string, endIso: string) {
  const start = parseIsoDate(startIso).getTime()
  const end = parseIsoDate(endIso).getTime()

  return Math.max(0, Math.round((end - start) / 86400000))
}

function parseIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDisplayDate(value: string) {
  return displayDateFormatter.format(parseIsoDate(value))
}

function formatWeekdayRange(startIso: string, endIso: string) {
  const startWeekday = weekdayLabels[parseIsoDate(startIso).getDay()]
  const endWeekday = weekdayLabels[parseIsoDate(endIso).getDay()]

  return startWeekday === endWeekday
    ? startWeekday
    : `${startWeekday}-${endWeekday}`
}

function pluralizeNights(count: number) {
  if (count === 1) {
    return 'ніч'
  }

  if (count >= 2 && count <= 4) {
    return 'ночі'
  }

  return 'ночей'
}
