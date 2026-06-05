import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { MenuItem } from '../data/restaurantMenu'
import { asset } from '../utils/asset'

type DishModalProps = MenuItem & {
  onClose: () => void
}

export function DishModal({ name, description, price, image, onClose }: DishModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  if (!image) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm"
        aria-label="Закрити"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-brand-200/60"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-md ring-1 ring-brand-200/60 transition hover:bg-brand-50"
          aria-label="Закрити"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-white px-1 pt-1">
          <img
            src={asset(image)}
            alt={name}
            className="mx-auto max-h-[min(70vh,24rem)] w-full object-contain"
          />
        </div>

        <div className="border-t border-brand-100 px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <h3 id="dish-modal-title" className="font-serif text-xl font-semibold text-brand-700">
              {name}
            </h3>
            <p className="shrink-0 font-semibold tabular-nums text-brand-600">
              {price}&nbsp;грн
            </p>
          </div>
          {description && (
            <p className="mt-2 text-sm text-brand-600/75">{description}</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
