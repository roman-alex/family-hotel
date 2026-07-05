import type { Metadata } from 'next'
import { RoomsRoute } from '../_routes/RoomsRoute'

export const metadata: Metadata = {
  title: 'Номери FAMILY HOTEL',
  description: 'Категорії номерів FAMILY HOTEL, фото та актуальні сезонні ціни.',
}

export default function RoomsPage() {
  return <RoomsRoute />
}
