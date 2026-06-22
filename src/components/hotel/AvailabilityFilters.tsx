import type { HotelCategoryOption } from '../../data/hotel'
import { DateRangePicker } from './DateRangePicker'

export type AvailabilityFiltersValue = {
  startDate: string
  endDate: string
  categoryIds: string[]
}

type AvailabilityFiltersProps = {
  categories: HotelCategoryOption[]
  value: AvailabilityFiltersValue
  onChange: (value: AvailabilityFiltersValue) => void
  onConfirm: () => void
  onReset: () => void
}

export function AvailabilityFilters({
  categories,
  value,
  onChange,
  onConfirm,
  onReset,
}: AvailabilityFiltersProps) {
  function toggleCategory(categoryId: string) {
    const categoryIds = value.categoryIds.includes(categoryId)
      ? value.categoryIds.filter((id) => id !== categoryId)
      : [...value.categoryIds, categoryId]

    onChange({ ...value, categoryIds })
  }

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_1fr] md:gap-4">
        <div>
          <p className="mb-1.5 hidden text-xs font-semibold uppercase tracking-[0.18em] text-brand-500 md:mb-2 md:block">
            Дати
          </p>
          <DateRangePicker
            startDate={value.startDate}
            endDate={value.endDate}
            onChange={(range) => onChange({ ...value, ...range })}
          />
        </div>

        <div>
          <p className="mb-1.5 hidden text-xs font-semibold uppercase tracking-[0.18em] text-brand-500 md:mb-2 md:block">
            Тип номера
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex min-h-9 items-center gap-2.5 rounded-xl border border-brand-100 bg-white/75 px-3 py-1.5 text-sm font-medium text-brand-700 md:min-h-11 md:gap-3 md:py-2"
              >
                <input
                  type="checkbox"
                  checked={value.categoryIds.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="h-3.5 w-3.5 rounded border-brand-300 accent-brand-600 md:h-4 md:w-4"
                />
                <span>{category.title}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-brand-100 pt-3 sm:flex-row sm:justify-end md:mt-5 md:pt-4">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-brand-200 bg-white px-5 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50 md:py-2.5"
        >
          Скинути
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-400 md:py-2.5"
        >
          Підтвердити
        </button>
      </div>
    </div>
  )
}
