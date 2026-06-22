import { useEffect, useMemo, useRef, useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'
import {
  getEasyMsAvailabilityByNights,
  hasEasyMsConfig,
} from '../api/easyms'
import { FixedPageBackground } from '../components/FixedPageBackground'
import { Logo } from '../components/Logo'
import {
  AvailabilityFilters,
  type AvailabilityFiltersValue,
} from '../components/hotel/AvailabilityFilters'
import { AvailabilitySlotCard } from '../components/hotel/AvailabilitySlotCard'
import { site } from '../data/content'
import {
  hotelCategoryOptions,
  roomCategories,
  type HotelAvailabilityItem,
} from '../data/hotel'
import { getAvailableCategoryItemsForRange } from '../utils/hotelAdapters'

const emptyFilters: AvailabilityFiltersValue = {
  startDate: '',
  endDate: '',
  categoryIds: [],
}

export function HotelPage() {
  const requestIdRef = useRef(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [defaultFilters] = useState<AvailabilityFiltersValue>(() =>
    hasEasyMsConfig() ? getDefaultAvailabilityFilters() : emptyFilters,
  )
  const [draftFilters, setDraftFilters] =
    useState<AvailabilityFiltersValue>(defaultFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<AvailabilityFiltersValue>(defaultFilters)
  const [availabilityItems, setAvailabilityItems] = useState<
    HotelAvailabilityItem[]
  >(() => (hasEasyMsConfig() ? [] : getMockAvailabilityItems()))
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(() =>
    hasEasyMsConfig(),
  )
  const [availabilityError, setAvailabilityError] = useState('')

  const categoryOptions = useMemo(() => hotelCategoryOptions, [])

  const filteredItems = availabilityItems.filter((slot) => {
    const matchesCategory =
      appliedFilters.categoryIds.length === 0 ||
      appliedFilters.categoryIds.includes(slot.categoryId)

    return matchesCategory
  })
  const activeFilterCount =
    appliedFilters.categoryIds.length +
    (appliedFilters.startDate && appliedFilters.endDate ? 1 : 0)

  useEffect(() => {
    document.title = `Номери та доступність — ${site.name}`
    return () => {
      document.title = `${site.name} — База відпочинку, с. Куражин`
    }
  }, [])

  useEffect(() => {
    if (!filtersOpen) {
      return
    }

    const scrollY = window.scrollY
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = previousBodyStyles.overflow
      document.body.style.position = previousBodyStyles.position
      document.body.style.top = previousBodyStyles.top
      document.body.style.width = previousBodyStyles.width
      window.scrollTo(0, scrollY)
    }
  }, [filtersOpen])

  async function handleConfirmFilters() {
    setAppliedFilters(draftFilters)
    setFiltersOpen(false)

    if (
      !hasEasyMsConfig() ||
      !draftFilters.startDate ||
      !draftFilters.endDate
    ) {
      setAvailabilityError('')
      setAvailabilityItems(getMockAvailabilityItems(draftFilters))
      return
    }

    await loadAndApplyEasyMsAvailability(
      draftFilters,
      'Не вдалося оновити доступність з EasyMS. Перевірте підключення або ключ модуля.',
    )
  }

  async function handleResetFilters() {
    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
    setFiltersOpen(false)
    setAvailabilityError('')

    if (hasEasyMsConfig()) {
      await loadAndApplyEasyMsAvailability(
        defaultFilters,
        'Не вдалося завантажити доступність з EasyMS. Перевірте підключення або ключ модуля.',
      )
    } else {
      setAvailabilityItems(getMockAvailabilityItems(defaultFilters))
    }
  }

  async function loadAndApplyEasyMsAvailability(
    filters: AvailabilityFiltersValue,
    errorMessage: string,
  ) {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId

    setIsLoadingAvailability(true)
    setAvailabilityError('')

    try {
      const items = await loadEasyMsAvailability(filters)

      if (requestIdRef.current === requestId) {
        setAvailabilityItems(items)
      }
    } catch {
      if (requestIdRef.current === requestId) {
        setAvailabilityError(errorMessage)
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoadingAvailability(false)
      }
    }
  }

  useEffect(() => {
    if (!hasEasyMsConfig()) {
      return
    }

    void loadAndApplyEasyMsAvailability(
      defaultFilters,
      'Не вдалося завантажити доступність з EasyMS. Перевірте підключення або ключ модуля.',
    )

    return () => {
      requestIdRef.current += 1
    }
  }, [defaultFilters])

  function handleOpenFilters() {
    setDraftFilters(appliedFilters)
    setFiltersOpen(true)
  }

  function handleCancelFilters() {
    setDraftFilters(appliedFilters)
    setFiltersOpen(false)
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <FixedPageBackground />

      <header className="border-b border-white/50 bg-white/75 px-4 py-4 shadow-sm shadow-brand-200/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-4xl flex-1 px-4 py-8 pb-12 md:py-12">
        <div className="text-center">
          <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-brand-500">
            Hotel
          </p>
          <h1 className="font-serif text-4xl font-bold text-brand-700 md:text-5xl">
            Номери
          </h1>
        </div>

        <section>
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={handleOpenFilters}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-lg ring-1 ring-white/70 backdrop-blur-md transition hover:bg-brand-50"
              aria-label="Фільтри"
            >
              <FiFilter className="h-5 w-5" aria-hidden />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-brand-800 ring-2 ring-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {filtersOpen && (
            <div
              className="fixed inset-0 z-50 flex items-end bg-brand-900/45 px-4 py-4 backdrop-blur-sm md:items-center md:justify-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="availability-filters-title"
            >
              <button
                type="button"
                className="absolute inset-0 cursor-default"
                aria-label="Закрити фільтри"
                onClick={handleCancelFilters}
              />
              <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-white/80 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-4 md:mb-5">
                  <h2
                    id="availability-filters-title"
                    className="font-serif text-2xl font-bold text-brand-700"
                  >
                    Фільтри
                  </h2>
                  <button
                    type="button"
                    onClick={handleCancelFilters}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-600 transition hover:bg-brand-50 hover:text-brand-700"
                    aria-label="Скасувати"
                  >
                    <FiX className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                <AvailabilityFilters
                  categories={categoryOptions}
                  value={draftFilters}
                  onChange={setDraftFilters}
                  onConfirm={handleConfirmFilters}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {isLoadingAvailability ? (
            <div className="rounded-2xl bg-white/85 px-5 py-8 text-center text-brand-600/70 shadow-lg ring-1 ring-white/70 backdrop-blur-md">
              Завантажуємо доступність...
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredItems.map((slot) => (
                <AvailabilitySlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          )}

          {availabilityError && (
            <div className="mt-5 rounded-2xl bg-white/90 px-5 py-5 text-center text-sm text-brand-700 shadow-lg ring-1 ring-brand-200/70 backdrop-blur-md">
              {availabilityError}
            </div>
          )}

          {!isLoadingAvailability && filteredItems.length === 0 && (
            <div className="rounded-2xl bg-white/85 px-5 py-8 text-center text-brand-600/70 shadow-lg ring-1 ring-white/70 backdrop-blur-md">
              {hasEasyMsConfig()
                ? 'У вибраному періоді поки немає вільних варіантів від 2 діб.'
                : 'За вибраними фільтрами поки немає вільних слотів.'}
            </div>
          )}
        </section>
      </main>

      <footer className="relative border-t border-white/40 bg-white/50 px-4 py-8 text-center text-sm text-brand-600/60 backdrop-blur-sm">
        © {new Date().getFullYear()}, {site.fullName}
      </footer>
    </div>
  )
}

async function loadEasyMsAvailability(filters: AvailabilityFiltersValue) {
  if (!filters.startDate || !filters.endDate) {
    return []
  }

  const availabilityByNight = await getEasyMsAvailabilityByNights(
    filters.startDate,
    filters.endDate,
  )

  return getAvailableCategoryItemsForRange(roomCategories, availabilityByNight)
}

function getDefaultAvailabilityFilters(): AvailabilityFiltersValue {
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  return {
    startDate: toIsoDate(today),
    endDate: toIsoDate(nextWeek),
    categoryIds: [],
  }
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getMockAvailabilityItems(
  filters: AvailabilityFiltersValue = emptyFilters,
) {
  const startIso = filters.startDate || toIsoDate(new Date())
  const endIso = filters.endDate || addDaysIso(startIso, 2)

  return getAvailableCategoryItemsForRange(roomCategories, [
    {
      startIso,
      endIso,
      items: roomCategories.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.title,
        availability: 1,
      })),
    },
  ])
}

function addDaysIso(value: string, days: number) {
  const date = parseIsoDate(value)
  date.setDate(date.getDate() + days)

  return toIsoDate(date)
}

function parseIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}
