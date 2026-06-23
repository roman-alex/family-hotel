import { useEffect, useMemo, useRef, useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'
import { getEasyMsAvailabilityByNights } from '../api/easyms'
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

export function HotelPage() {
  const requestIdRef = useRef(0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [defaultFilters] = useState<AvailabilityFiltersValue>(() =>
    getDefaultAvailabilityFilters(),
  )
  const [draftFilters, setDraftFilters] =
    useState<AvailabilityFiltersValue>(defaultFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<AvailabilityFiltersValue>(defaultFilters)
  const [availabilityItems, setAvailabilityItems] = useState<
    HotelAvailabilityItem[]
  >([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true)
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

    if (!draftFilters.startDate || !draftFilters.endDate) {
      setAvailabilityItems([])
      setAvailabilityError('Оберіть дати заїзду та виїзду.')
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

    await loadAndApplyEasyMsAvailability(
      defaultFilters,
      'Не вдалося завантажити доступність з EasyMS. Перевірте підключення або ключ модуля.',
    )
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
        setAvailabilityItems([])
        setAvailabilityError(errorMessage)
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoadingAvailability(false)
      }
    }
  }

  useEffect(() => {
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

      <header className="border-b border-white/50 bg-white/75 px-4 py-3 shadow-sm shadow-brand-200/20 backdrop-blur-md sm:py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-center">
          <Logo size="sm" showText />
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-4xl flex-1 px-4 pt-3 pb-12 sm:pt-4 lg:py-8">
        <section>
          <div className="mb-3 flex justify-end sm:mb-5">
            <button
              type="button"
              onClick={handleOpenFilters}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-md ring-1 ring-white/70 backdrop-blur-md transition hover:bg-brand-50 sm:h-11 sm:w-11 sm:shadow-lg"
              aria-label="Фільтри"
            >
              <FiFilter className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-brand-800 ring-2 ring-white sm:h-5 sm:min-w-5 sm:text-xs">
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

          {!isLoadingAvailability &&
            !availabilityError &&
            filteredItems.length === 0 && (
              <div className="rounded-2xl bg-white/85 px-5 py-8 text-center text-brand-600/70 shadow-lg ring-1 ring-white/70 backdrop-blur-md">
                У вибраному періоді поки немає вільних варіантів.
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
