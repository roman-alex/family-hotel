import type { MenuItem } from '../data/restaurantMenu'

export function MenuItemRow({ name, description, price }: MenuItem) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-brand-100/80 py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-brand-700">{name}</p>
        {description && (
          <p className="mt-0.5 text-sm text-brand-600/65">{description}</p>
        )}
      </div>
      <p className="shrink-0 font-semibold tabular-nums text-brand-600">
        {price}&nbsp;грн
      </p>
    </div>
  )
}
