import { useState } from 'react'
import type { MenuItem } from '../data/restaurantMenu'
import { asset } from '../utils/asset'
import { DishModal } from './DishModal'

export function MenuItemRow({ name, description, price, image }: MenuItem) {
  const [open, setOpen] = useState(false)

  const content = (
    <>
      {image && (
        <img
          src={asset(image)}
          alt=""
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain ring-1 ring-brand-200/60"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-medium text-brand-700">{name}</p>
        {description && (
          <p className="mt-0.5 text-sm text-brand-600/65">{description}</p>
        )}
      </div>
      <p className="shrink-0 font-semibold tabular-nums text-brand-600">
        {price}&nbsp;грн
      </p>
    </>
  )

  return (
    <>
      {image ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-start gap-3 border-b border-brand-100/80 py-3 text-left transition last:border-0 hover:bg-brand-50/50"
        >
          {content}
        </button>
      ) : (
        <div className="flex items-start gap-3 border-b border-brand-100/80 py-3 last:border-0">
          {content}
        </div>
      )}

      {open && image && (
        <DishModal
          name={name}
          description={description}
          price={price}
          image={image}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
