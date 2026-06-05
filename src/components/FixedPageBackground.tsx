import { asset } from '../utils/asset'

export function FixedPageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-brand-50" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url('${asset('images/pool.png')}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100/80 via-brand-50/60 to-brand-100/90" />
    </div>
  )
}
