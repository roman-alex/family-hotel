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

export type RoomImage = {
  src: string
  alt: string
}

export type RoomCategory = {
  id: string
  categoryId: number
  title: string
  subtitle: string
  description: string
  image?: string
  images?: RoomImage[]
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
  weekdayLabel: string
  image?: string
  images?: RoomImage[]
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
    title: 'Двомісний стандарт',
    subtitle: 'Просторий номер у загальному корпусі',
    description:
      'Просторий номер у загальному корпусі готелю з видом на внутрішній двір та всіма необхідними зручностями для комфортного відпочинку.',
    image: asset('images/room-interior.png'),
    priceFrom: 1400,
    prices: [
      { ...priceSeasons.early, price: 1400 },
      { ...priceSeasons.summer, price: 1600 },
      { ...priceSeasons.autumn, price: 1400 },
    ],
    capacity: { min: 1, max: 2 },
    amenities: ['2 гості', 'Душ', 'Кондиціонер', 'Wi-Fi', 'TV', 'Парковка', 'Басейн', 'Холодильник'],
  },
  {
    id: 'double-improved',
    categoryId: 18827,
    title: 'Двомісний покращений з терасою',
    subtitle: 'Окремий вхід і приватна тераса',
    description:
      'Комфортний номер з окремим входом і затишною приватною терасою для відпочинку та приємного проведення часу на свіжому повітрі.',
    image: asset('images/room-exterior.png'),
    images: [
      {
        src: asset('images/rooms/double-improved/01.webp'),
        alt: 'Спальня двомісного покращеного номера',
      },
      {
        src: asset('images/rooms/double-improved/02.webp'),
        alt: 'Ліжко у двомісному покращеному номері',
      },
      {
        src: asset('images/rooms/double-improved/03.webp'),
        alt: 'Інтерʼєр двомісного покращеного номера',
      },
      {
        src: asset('images/rooms/double-improved/04.webp'),
        alt: 'Вхідна зона двомісного покращеного номера',
      },
      {
        src: asset('images/rooms/double-improved/05.webp'),
        alt: 'Коридор двомісного покращеного номера',
      },
      {
        src: asset('images/rooms/double-improved/06.webp'),
        alt: 'Вікно у двомісному покращеному номері',
      },
    ],
    priceFrom: 1600,
    prices: [
      { ...priceSeasons.early, price: 1600 },
      { ...priceSeasons.summer, price: 1800 },
      { ...priceSeasons.autumn, price: 1600 },
    ],
    capacity: { min: 1, max: 2 },
    amenities: ['2 гості', 'Душ', 'Кондиціонер', 'Wi-Fi', 'TV', 'Парковка', 'Басейн'],
  },
  {
    id: 'triple-balcony',
    categoryId: 15270,
    title: 'Тримісний з балконом',
    subtitle: 'Балкон з виглядом на річку',
    description:
      'Панорамні вікна та неймовірний вигляд на річку з власного балкона створюють ідеальні умови для ранкової кави чи вечірнього відпочинку. Ідеальний варіант для сім’ї: номер обладнаний двоспальним ліжком та розкладною софою.',
    image: asset('images/room-exterior.png'),
    priceFrom: 1900,
    prices: [
      { ...priceSeasons.early, price: 1900 },
      { ...priceSeasons.summer, price: 2400 },
      { ...priceSeasons.autumn, price: 1900 },
    ],
    capacity: { min: 2, max: 3 },
    amenities: ['3 гості', 'Душ', 'Кондиціонер', 'Wi-Fi', 'TV', 'Парковка', 'Басейн', 'Балкон'],
  },
  {
    id: 'triple',
    categoryId: 15271,
    title: 'Тримісний без балкону',
    subtitle: 'Сімейний номер з розкладною софою',
    description:
      'Затишний номер для сімейного відпочинку. Оснащений двоспальним ліжком для батьків та розкладною софою для дітей, забезпечуючи комфортне розміщення всієї родини.',
    image: asset('images/room-interior.png'),
    priceFrom: 1600,
    prices: [
      { ...priceSeasons.early, price: 1600 },
      { ...priceSeasons.summer, price: 2000 },
      { ...priceSeasons.autumn, price: 2000 },
    ],
    capacity: { min: 2, max: 3 },
    amenities: ['3 гості', 'Душ', 'Кондиціонер', 'Wi-Fi', 'TV', 'Парковка', 'Басейн'],
  },
  {
    id: 'apartment-8',
    categoryId: 15273,
    title: 'Апартаменти до 8 осіб',
    subtitle: 'Для великої компанії або кількох родин',
    description:
      'Просторі апартаменти для великої родини або компанії друзів. Складаються з трьох окремих спалень з двоспальними ліжками, просторого холу з диваном та обідньою зоною, облаштованої кухні й двох санвузлів.',
    image: asset('images/room-interior.png'),
    priceFrom: 3800,
    prices: [
      { ...priceSeasons.early, price: 3800 },
      { ...priceSeasons.summer, price: 4800 },
      { ...priceSeasons.autumn, price: 3800 },
    ],
    capacity: { min: 6, max: 8 },
    amenities: ['До 8 гостей', 'Душ', 'Кондиціонер', 'Wi-Fi', 'TV', 'Парковка', 'Басейн', 'Кухня', 'Холодильник'],
  },
  {
    id: 'apartment-6',
    categoryId: 16793,
    title: 'Апартаменти до 6 осіб',
    subtitle: 'Дві окремі спальні та просторий хол',
    description:
      'Затишні сімейні апартаменти з двома окремими кімнатами, кожна з двоспальним ліжком та власним санвузлом. Просторий хол з великим диваном створює комфортні умови для відпочинку всієї родини.',
    image: asset('images/room-exterior.png'),
    priceFrom: 3200,
    prices: [
      { ...priceSeasons.early, price: 3200 },
      { ...priceSeasons.summer, price: 3800 },
      { ...priceSeasons.autumn, price: 3200 },
    ],
    capacity: { min: 4, max: 6 },
    amenities: ['До 6 гостей', 'Душ', 'Кондиціонер', 'Wi-Fi', 'TV', 'Парковка', 'Басейн', 'Холодильник'],
  },
]

export const hotelCategoryOptions: HotelCategoryOption[] = roomCategories.map(
  (category) => ({
    id: String(category.categoryId),
    title: category.title,
  }),
)
