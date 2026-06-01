import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { site } from '../data/content'
import { asset } from '../utils/asset'

export function HotelMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const { lat, lng, label } = site.location

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 14,
      scrollWheelZoom: false,
      zoomControl: true,
    })

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      },
    ).addTo(map)

    const logoUrl = asset('logo.svg')
    const markerIcon = L.divIcon({
      className: 'hotel-map-marker-wrapper',
      html: `
        <div class="hotel-map-marker">
          <div class="hotel-map-marker-bubble">
            <img src="${logoUrl}" alt="${label}" width="44" height="44" />
          </div>
          <div class="hotel-map-marker-tail"></div>
        </div>
      `,
      iconSize: [56, 68],
      iconAnchor: [28, 68],
      popupAnchor: [0, -68],
    })

    L.marker([lat, lng], { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<strong>${label}</strong><br>${site.address.full}`)

    mapRef.current = map

    const fixSize = () => map.invalidateSize({ animate: false })

    map.whenReady(fixSize)
    requestAnimationFrame(fixSize)
    const t1 = window.setTimeout(fixSize, 100)
    const t2 = window.setTimeout(fixSize, 350)

    const resizeObserver = new ResizeObserver(fixSize)
    resizeObserver.observe(containerRef.current)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      resizeObserver.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="hotel-map-shell h-[320px] overflow-hidden rounded-2xl shadow-md ring-1 ring-brand-200/60 sm:h-[360px] lg:h-[380px]">
      <div ref={containerRef} className="hotel-map h-full w-full" />
    </div>
  )
}
