type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  variant?: 'light' | 'dark'
}

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-28 w-28 md:h-36 md:w-36',
}

export function Logo({ size = 'md', showText = false, variant = 'dark' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-brand-700'

  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.svg"
        alt="FAMILY HOTEL"
        className={`${sizes[size]} shrink-0`}
      />
      {showText && (
        <span className={`font-serif text-lg font-bold md:text-xl ${textColor}`}>
          FAMILY HOTEL
        </span>
      )}
    </div>
  )
}
