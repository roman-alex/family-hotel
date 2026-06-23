import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import {
  FiCamera,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiMaximize2,
  FiPhone,
  FiSmile,
  FiTv,
  FiUsers,
  FiWifi,
  FiX,
} from 'react-icons/fi'
import {
  LuCircleParking,
  LuCookingPot,
  LuRefrigerator,
  LuShowerHead,
  LuSnowflake,
} from 'react-icons/lu'
import { TbPool } from 'react-icons/tb'
import { site } from '../../data/content'
import type { HotelAvailabilityItem, RoomImage } from '../../data/hotel'

type AvailabilitySlotCardProps = {
  slot: Pick<
    HotelAvailabilityItem,
    'id' | 'title' | 'description' | 'image' | 'images' | 'badges'
  > &
    Partial<
      Pick<HotelAvailabilityItem, 'dateLabel' | 'weekdayLabel' | 'priceLabel'>
    >
  showStayDetails?: boolean
  showBookingButton?: boolean
}

export function AvailabilitySlotCard({
  slot,
  showStayDetails = true,
  showBookingButton = true,
}: AvailabilitySlotCardProps) {
  const hasStayLabels =
    showStayDetails && Boolean(slot.dateLabel && slot.weekdayLabel)
  const hasPriceLabel = Boolean(slot.priceLabel)
  const mediaItems = getGalleryImages(slot.images, slot.image, slot.title)

  return (
    <article className="overflow-hidden rounded-2xl bg-white/90 shadow-lg ring-1 ring-white/70 backdrop-blur-md">
      <div
        className={
          mediaItems.length > 0
            ? 'grid gap-0 md:grid-cols-[280px_1fr] md:items-center'
            : 'grid gap-0'
        }
      >
        {mediaItems.length > 0 && (
          <RoomGallery images={mediaItems} title={slot.title} />
        )}

        <div className="flex flex-col gap-3 p-5 md:p-5">
          <div>
            {hasStayLabels && (
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-300/70">
                  {slot.dateLabel}
                </p>
                <p className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-300/70">
                  {slot.weekdayLabel}
                </p>
              </div>
            )}
            <h2 className="font-serif text-2xl font-bold text-brand-700">
              {slot.title}
            </h2>
            <p className="mt-1 text-sm text-brand-600/70">
              {slot.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {slot.badges.map((badge) => (
              <AmenityItem key={badge} badge={badge} />
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-brand-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            {hasPriceLabel && (
              <p className="text-sm font-semibold text-brand-700 md:text-base">
                {slot.priceLabel}
              </p>
            )}
            {showBookingButton && (
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-400 sm:ml-auto"
              >
                <FiPhone className="h-4 w-4" aria-hidden />
                Забронювати
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function getGalleryImages(
  images: RoomImage[] | undefined,
  fallbackImage: string | undefined,
  title: string,
) {
  if (images && images.length > 0) {
    return images
  }

  return fallbackImage ? [{ src: fallbackImage, alt: title }] : []
}

function RoomGallery({
  images,
  title,
}: {
  images: RoomImage[]
  title: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const activeImage = images[activeIndex]
  const hasMultipleImages = images.length > 1
  const swipeHandlers = useGallerySwipe({
    enabled: hasMultipleImages,
    onPrevious: showPreviousImage,
    onNext: showNextImage,
  })

  useEffect(() => {
    if (!modalOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setModalOpen(false)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1))
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1))
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, modalOpen])

  function showPreviousImage() {
    setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1))
  }

  function showNextImage() {
    setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1))
  }

  return (
    <div className="min-w-0 bg-brand-50 md:m-5 md:mr-0 md:rounded-xl md:ring-1 md:ring-brand-100">
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (swipeHandlers.consumeSwipe()) {
              return
            }

            setModalOpen(true)
          }}
          onTouchStart={swipeHandlers.onTouchStart}
          onTouchEnd={swipeHandlers.onTouchEnd}
          className="block w-full cursor-zoom-in touch-pan-y text-left"
          aria-label={`Відкрити галерею: ${title}`}
        >
          <AnimatedGalleryImage
            src={activeImage.src}
            alt={activeImage.alt}
            loading="lazy"
            className="aspect-[4/3] w-full bg-brand-100 object-cover md:h-52 md:rounded-t-xl"
          />
        </button>

        {hasMultipleImages && (
          <>
            <p className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-md ring-1 ring-white/80 backdrop-blur-md">
              <FiCamera className="h-4 w-4" aria-hidden />
              {activeIndex + 1}/{images.length}
            </p>

            <button
              type="button"
              onClick={showPreviousImage}
              className="absolute top-1/2 left-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-700 opacity-65 shadow-sm ring-1 ring-white/50 backdrop-blur-md transition hover:bg-white/90 hover:opacity-100 lg:flex"
              aria-label={`Попереднє фото: ${title}`}
            >
              <FiChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              className="absolute top-1/2 right-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-700 opacity-65 shadow-sm ring-1 ring-white/50 backdrop-blur-md transition hover:bg-white/90 hover:opacity-100 lg:flex"
              aria-label={`Наступне фото: ${title}`}
            >
              <FiChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="flex min-w-0 gap-2 overflow-x-auto bg-brand-50 p-3 md:rounded-b-xl">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-14 w-16 shrink-0 overflow-hidden rounded-md bg-white shadow-sm ring-2 transition ${
                activeIndex === index
                  ? 'ring-brand-500'
                  : 'ring-white hover:ring-brand-300'
              }`}
              aria-label={`Показати фото ${index + 1}: ${title}`}
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <GalleryModal
          images={images}
          title={title}
          activeIndex={activeIndex}
          onClose={() => setModalOpen(false)}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          onSelect={setActiveIndex}
        />
      )}
    </div>
  )
}

function GalleryModal({
  images,
  title,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
  onSelect,
}: {
  images: RoomImage[]
  title: string
  activeIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onSelect: (index: number) => void
}) {
  const activeImage = images[activeIndex]
  const hasMultipleImages = images.length > 1
  const swipeHandlers = useGallerySwipe({
    enabled: hasMultipleImages,
    onPrevious,
    onNext,
  })

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-brand-50/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`Галерея: ${title}`}
      onClick={onClose}
    >
      <div
        className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-brand-100 bg-white/95 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100 transition hover:bg-brand-100"
            aria-label="Закрити галерею"
          >
            <FiX className="h-5 w-5" aria-hidden />
          </button>

          <p className="min-w-0 truncate text-sm font-semibold text-brand-700">
            {title}
          </p>

          <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
            <FiCamera className="h-4 w-4" aria-hidden />
            {activeIndex + 1}/{images.length}
          </p>
        </div>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center bg-brand-50"
          onTouchStart={swipeHandlers.onTouchStart}
          onTouchEnd={swipeHandlers.onTouchEnd}
        >
          <AnimatedGalleryImage
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-h-full max-w-full object-contain"
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={onPrevious}
                className="absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-700 opacity-65 shadow-sm ring-1 ring-white/50 backdrop-blur-md transition hover:bg-white/90 hover:opacity-100 lg:flex"
                aria-label={`Попереднє фото: ${title}`}
              >
                <FiChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-700 opacity-65 shadow-sm ring-1 ring-white/50 backdrop-blur-md transition hover:bg-white/90 hover:opacity-100 lg:flex"
                aria-label={`Наступне фото: ${title}`}
              >
                <FiChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="flex min-w-0 gap-2 overflow-x-auto border-t border-brand-100 bg-white p-3">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => onSelect(index)}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-50 shadow-sm ring-2 transition md:h-20 md:w-28 ${
                  activeIndex === index
                    ? 'ring-brand-500'
                    : 'ring-brand-100 hover:ring-brand-300'
                }`}
                aria-label={`Показати фото ${index + 1}: ${title}`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

function AnimatedGalleryImage({
  src,
  alt,
  className,
  loading,
}: {
  src: string
  alt: string
  className: string
  loading?: 'eager' | 'lazy'
}) {
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      loading={loading}
      className={`${className} gallery-image-enter`}
    />
  )
}

function useGallerySwipe({
  enabled,
  onPrevious,
  onNext,
}: {
  enabled: boolean
  onPrevious: () => void
  onNext: () => void
}) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const didSwipeRef = useRef(false)

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    if (!enabled) {
      return
    }

    const touch = event.changedTouches[0]
    didSwipeRef.current = false
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (!enabled || !touchStartRef.current) {
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    touchStartRef.current = null

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return
    }

    if (deltaX > 0) {
      didSwipeRef.current = true
      onPrevious()
      return
    }

    didSwipeRef.current = true
    onNext()
  }

  function consumeSwipe() {
    if (!didSwipeRef.current) {
      return false
    }

    didSwipeRef.current = false
    return true
  }

  return {
    consumeSwipe,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  }
}

function isGuestsBadge(badge: string) {
  return badge.toLowerCase().includes('гост')
}

function getGuestsValue(badge: string) {
  return badge.replace(/\s*гост(ей|і|я)?\s*/i, '').trim()
}

function AmenityItem({ badge }: { badge: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-200/70"
      title={badge}
    >
      <BadgeIcon badge={badge} />
      <span>{getBadgeLabel(badge)}</span>
    </span>
  )
}

function getBadgeLabel(badge: string) {
  if (isGuestsBadge(badge)) {
    return `до ${getGuestsValue(badge)} гостей`
  }

  return badge
}

function BadgeIcon({ badge }: { badge: string }) {
  const normalizedBadge = badge.toLowerCase()

  if (normalizedBadge.includes('ноч')) {
    return <FiCheck className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('гост')) {
    return <FiUsers className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('кондиціонер')) {
    return <LuSnowflake className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('wi-fi')) {
    return <FiWifi className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('tv')) {
    return <FiTv className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('парков')) {
    return <LuCircleParking className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('басейн')) {
    return <TbPool className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('кух')) {
    return <LuCookingPot className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('холод')) {
    return <LuRefrigerator className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (normalizedBadge.includes('душ')) {
    return <LuShowerHead className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (
    normalizedBadge.includes('балкон') ||
    normalizedBadge.includes('санвузол')
  ) {
    return <FiHome className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (
    normalizedBadge.includes('просторо') ||
    normalizedBadge.includes('кілька зон')
  ) {
    return <FiMaximize2 className="h-4 w-4 shrink-0" aria-hidden />
  }

  if (
    normalizedBadge.includes('сімейний') ||
    normalizedBadge.includes('родини') ||
    normalizedBadge.includes('компанії')
  ) {
    return <FiSmile className="h-4 w-4 shrink-0" aria-hidden />
  }

  return <FiCheck className="h-4 w-4 shrink-0" aria-hidden />
}
