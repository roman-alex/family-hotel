import type { IconType } from 'react-icons'
import { SiApple, SiGooglemaps, SiWaze } from 'react-icons/si'

type NavAppId = 'google' | 'waze' | 'apple'

const apps: Record<
  NavAppId,
  { Icon: IconType; label: string; bg: string; color: string }
> = {
  google: {
    Icon: SiGooglemaps,
    label: 'Google Maps',
    bg: 'bg-white',
    color: '#4285F4',
  },
  waze: {
    Icon: SiWaze,
    label: 'Waze',
    bg: 'bg-[#33CCFF]',
    color: '#ffffff',
  },
  apple: {
    Icon: SiApple,
    label: 'Apple Maps',
    bg: 'bg-black',
    color: '#ffffff',
  },
}

export function NavAppIcon({ id }: { id: NavAppId }) {
  const { Icon, label, bg, color } = apps[id]

  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ring-brand-200/40 ${bg}`}
      title={label}
    >
      <Icon className="h-5 w-5" style={{ color }} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}
