import { useState } from 'react'

const monthFormatter = new Intl.DateTimeFormat('uk-UA', {
  month: 'long',
  year: 'numeric',
})

const dayFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
})

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

type DateRangePickerProps = {
  startDate: string
  endDate: string
  onChange: (range: { startDate: string; endDate: string }) => void
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  const todayIso = toIsoDate(new Date())
  const maxDateIso = getSeasonEndIso(todayIso)
  const minMonth = startOfMonth(parseIsoDate(todayIso))
  const maxMonth = startOfMonth(parseIsoDate(maxDateIso))
  const initialMonth = startDate ? parseIsoDate(startDate) : new Date()
  const [currentMonth, setCurrentMonth] = useDateMonth(initialMonth)
  const days = getCalendarDays(currentMonth)
  const canGoToPreviousMonth = currentMonth > minMonth
  const canGoToNextMonth = currentMonth < maxMonth

  function selectDate(isoDate: string) {
    if (isoDate < todayIso || isoDate > maxDateIso) {
      return
    }

    if (!startDate || endDate) {
      onChange({ startDate: isoDate, endDate: '' })
      return
    }

    if (isoDate <= startDate) {
      onChange({ startDate: isoDate, endDate: '' })
      return
    }

    onChange({ startDate, endDate: isoDate })
  }

  return (
    <div className="rounded-2xl border border-brand-100 bg-white/75 p-2.5 md:p-3">
      <div className="mb-2 grid grid-cols-2 gap-2 text-xs md:mb-3 md:text-sm">
        <div className="rounded-xl bg-brand-50 px-2.5 py-1.5 md:px-3 md:py-2">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-500 md:text-xs">
            Заїзд
          </span>
          <span className="font-medium text-brand-700">
            {startDate ? formatDisplayDate(startDate) : 'Оберіть дату'}
          </span>
        </div>
        <div className="rounded-xl bg-brand-50 px-2.5 py-1.5 md:px-3 md:py-2">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-500 md:text-xs">
            Виїзд
          </span>
          <span className="font-medium text-brand-700">
            {endDate ? formatDisplayDate(endDate) : 'Оберіть дату'}
          </span>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between md:mb-3">
        <button
          type="button"
          onClick={() => {
            if (canGoToPreviousMonth) {
              setCurrentMonth(addMonths(currentMonth, -1))
            }
          }}
          disabled={!canGoToPreviousMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:text-brand-600/25 disabled:hover:bg-transparent md:h-9 md:w-9"
          aria-label="Попередній місяць"
        >
          ‹
        </button>
        <p className="font-serif text-base font-bold capitalize text-brand-700 md:text-lg">
          {monthFormatter.format(currentMonth)}
        </p>
        <button
          type="button"
          onClick={() => {
            if (canGoToNextMonth) {
              setCurrentMonth(addMonths(currentMonth, 1))
            }
          }}
          disabled={!canGoToNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:text-brand-600/25 disabled:hover:bg-transparent md:h-9 md:w-9"
          aria-label="Наступний місяць"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] font-semibold text-brand-600/60 md:gap-1 md:text-xs">
        {weekdays.map((weekday) => (
          <div key={weekday} className="py-0.5 md:py-1">
            {weekday}
          </div>
        ))}
      </div>

      <div className="mt-0.5 grid grid-cols-7 gap-0.5 md:mt-1 md:gap-1">
        {days.map((day) => {
          const isSelected = day.iso === startDate || day.iso === endDate
          const isInRange =
            startDate && endDate && day.iso > startDate && day.iso < endDate
          const isMuted = day.month !== currentMonth.getMonth()
          const isDisabled = day.iso < todayIso || day.iso > maxDateIso

          return (
            <button
              key={day.iso}
              type="button"
              onClick={() => selectDate(day.iso)}
              disabled={isDisabled}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition md:h-9 md:w-9 ${
                isDisabled
                  ? 'cursor-not-allowed text-brand-600/20'
                  : isSelected
                  ? 'bg-brand-500 text-brand-800 shadow-sm'
                  : isInRange
                    ? 'bg-brand-100 text-brand-700'
                    : isMuted
                      ? 'text-brand-600/30 hover:bg-brand-50'
                      : 'text-brand-700 hover:bg-brand-50'
              }`}
            >
              {day.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function useDateMonth(date: Date): [Date, (date: Date) => void] {
  return useState(startOfMonth(date))
}

function getCalendarDays(month: Date) {
  const firstDay = startOfMonth(month)
  const gridStart = new Date(firstDay)
  const mondayBasedDay = (firstDay.getDay() + 6) % 7
  gridStart.setDate(firstDay.getDate() - mondayBasedDay)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)

    return {
      date,
      iso: toIsoDate(date),
      month: date.getMonth(),
    }
  })
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function getSeasonEndIso(todayIso: string) {
  return `${todayIso.slice(0, 4)}-10-31`
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

function formatDisplayDate(value: string) {
  return dayFormatter.format(parseIsoDate(value))
}
