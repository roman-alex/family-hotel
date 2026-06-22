import { asset } from '../utils/asset'

export type HotelCategoryOption = {
  id: string
  title: string
}

export type SeasonalPrice = {
  from: string
  to: string
  price: number
}

export type RoomCategory = {
  id: string
  categoryId: number
  title: string
  subtitle: string
  description: string
  image?: string
  priceFrom: number
  prices: SeasonalPrice[]
  capacity: {
    min: number
    max: number
  }
  amenities: string[]
}

export type HotelAvailabilityItem = {
  id: string
  categoryId: string
  title: string
  description: string
  dateLabel: string
  startIso: string
  endIso: string
  startDate: string
  endDate: string
  nights: number
  priceLabel: string
  image?: string
  badges: string[]
}

const priceSeasons = {
  early: { from: '05-01', to: '06-12' },
  summer: { from: '06-12', to: '08-30' },
  autumn: { from: '08-30', to: '11-01' },
} as const

export const roomCategories: RoomCategory[] = [
  {
    id: 'double',
    categoryId: 15269,
    title: 'Двомісні',
    subtitle: 'Для пари або короткого сімейного відпочинку',
    description:
      'Затишні двомісні номери з деревʼяним оздобленням, кондиціонером та базовими зручностями для спокійного відпочинку.',
    image: asset('images/room-interior.png'),
    priceFrom: 1400,
    prices: [
      { ...priceSeasons.early, price: 1400 },
      { ...priceSeasons.summer, price: 1600 },
      { ...priceSeasons.autumn, price: 1400 },
    ],
    capacity: { min: 1, max: 2 },
    amenities: ['2 гості', 'Кондиціонер', 'Wi-Fi'],
  },
  {
    id: 'double-improved',
    categoryId: 18827,
    title: 'Двомісні (покращені)',
    subtitle: 'Покращений двомісний номер',
    description:
      'Покращені двомісні номери з додатковим комфортом для спокійного проживання.',
    image: asset('images/room-exterior.png'),
    priceFrom: 1600,
    prices: [
      { ...priceSeasons.early, price: 1600 },
      { ...priceSeasons.summer, price: 1800 },
      { ...priceSeasons.autumn, price: 1600 },
    ],
    capacity: { min: 1, max: 2 },
    amenities: ['2 гості', 'Покращені', 'Wi-Fi'],
  },
  {
    id: 'triple-balcony',
    categoryId: 15270,
    title: 'Тримісні (з балконом)',
    subtitle: 'Для родини з дитиною або невеликої компанії',
    description:
      'Тримісні номери з балконом, де зручно відпочивати після дня біля басейну чи прогулянок територією.',
    image: asset('images/room-exterior.png'),
    priceFrom: 1900,
    prices: [
      { ...priceSeasons.early, price: 1900 },
      { ...priceSeasons.summer, price: 2400 },
      { ...priceSeasons.autumn, price: 1900 },
    ],
    capacity: { min: 2, max: 3 },
    amenities: ['3 гості', 'Балкон', 'Сімейний'],
  },
  {
    id: 'triple',
    categoryId: 15271,
    title: 'Тримісні (без балкону)',
    subtitle: 'Практичний варіант для трьох гостей',
    description:
      'Комфортні тримісні номери без балкону з усім необхідним для сімейного відпочинку.',
    image: asset('images/room-interior.png'),
    priceFrom: 1600,
    prices: [
      { ...priceSeasons.early, price: 1600 },
      { ...priceSeasons.summer, price: 2000 },
      { ...priceSeasons.autumn, price: 2000 },
    ],
    capacity: { min: 2, max: 3 },
    amenities: ['3 гості', 'Без балкону', 'Санвузол'],
  },
  {
    id: 'apartment-8',
    categoryId: 15273,
    title: 'Апартаменти (до 8 осіб)',
    subtitle: 'Для великої компанії або кількох родин',
    description:
      'Просторі апартаменти для гостей, які хочуть жити разом і мати достатньо місця для всіх.',
    image: asset('images/room-interior.png'),
    priceFrom: 3800,
    prices: [
      { ...priceSeasons.early, price: 3800 },
      { ...priceSeasons.summer, price: 4800 },
      { ...priceSeasons.autumn, price: 3800 },
    ],
    capacity: { min: 6, max: 8 },
    amenities: ['До 8 гостей', 'Просторо', 'Для компанії'],
  },
  {
    id: 'apartment-6',
    categoryId: 16793,
    title: 'Апартаменти (до 6 осіб)',
    subtitle: 'Для великої родини або довшого проживання',
    description:
      'Сімейні апартаменти з кількома спальними зонами та комфортом для довшого відпочинку.',
    image: asset('images/room-exterior.png'),
    priceFrom: 3200,
    prices: [
      { ...priceSeasons.early, price: 3200 },
      { ...priceSeasons.summer, price: 3800 },
      { ...priceSeasons.autumn, price: 3200 },
    ],
    capacity: { min: 4, max: 6 },
    amenities: ['До 6 гостей', 'Кілька зон', 'Для родини'],
  },
]

export const hotelCategoryOptions: HotelCategoryOption[] = roomCategories.map(
  (category) => ({
    id: String(category.categoryId),
    title: category.title,
  }),
)
