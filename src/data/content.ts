import { asset } from '../utils/asset'

export const site = {
  name: 'FAMILY HOTEL',
  url: 'https://family-hotel.com.ua',
  restaurantMenuPath: '/restaurant',
  fullName: '«FAMILY HOTEL»',
  tagline: 'База відпочинку для всієї родини',
  phone: '+380980615228',
  phoneDisplay: '+38 (098) 061 52 28',
  instagram: 'https://www.instagram.com/family_hotels',
  bookingNote: 'Бронювання за телефоном або в Direct Instagram',
  address: {
    village: 'с. Куражин',
    region: 'Хмельницька обл., Україна',
    full: 'Хмельницька обл., с. Куражин, Україна',
  },
  mapsUrl: 'https://maps.app.goo.gl/ZSV2nwAMqc2z62QA8',
  location: {
    lat: 48.6088221,
    lng: 27.314088,
    label: 'FAMILY HOTEL',
  },
  navigation: {
    google: 'https://maps.app.goo.gl/ZSV2nwAMqc2z62QA8',
    waze: 'https://waze.com/ul?ll=48.6088221,27.314088&navigate=yes',
    apple: 'https://maps.apple.com/?daddr=48.6088221,27.314088',
  },
} as const

export const navLinks = [
  { label: 'Головна', href: '#home' },
  { label: 'Послуги', href: '#services' },
  { label: 'Ціни', href: '#pricing' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Контакти', href: '#contacts' },
] as const

export const hero = {
  welcome: 'Ласкаво запрошуємо до',
  subtitle:
    'Затишна база відпочинку на березі водойми в Хмельницькій області — ідеальне місце для сімейного відпочинку з дітьми',
} as const

export const intro = {
  paragraphs: [
    '«FAMILY HOTEL» — це затишна база відпочинку, де кожна родина знайде комфорт, спокій та приємні спогади. Дерев\'яні котеджі, мальовничі краєвиди та атмосфера домашнього затишку.',
    'Ми створили простір для відпочинку всією родиною: зручні номери, ресторан з панорамним видом, басейн, дитячий майданчик та можливість відпочивати разом із домашніми улюбленцями.',
  ],
} as const

export const services = [
  {
    id: 'rooms',
    title: 'Номери',
    description:
      'Затишні двомісні та покращені номери з дерев\'яним оздобленням, кондиціонером та сучасним інтер\'єром. Кожен номер має окрему терасу з меблями — ідеально для ранкової кави на свіжому повітрі.',
    cta: 'Забронювати номер',
    image: asset('images/room-interior.png'),
    imageAlt: 'Двомісний покращений номер',
    secondaryImage: asset('images/room-exterior.png'),
    secondaryImageAlt: 'Тераса номера',
  },
  {
    id: 'restaurant',
    title: 'Ресторан',
    description:
      'Стильний ресторан з панорамними вікнами та видом на зелені пагорби. Смачна домашня кухня, затишна атмосфера та комфортна тераса для сніданків, обідів і вечерь.',
    cta: 'Дізнатися більше',
    image: asset('images/restaurant.png'),
    imageAlt: 'Ресторан з панорамним видом',
  },
  {
    id: 'pool',
    title: 'Басейн',
    description:
      'Великий відкритий басейн з чистою водою, шезлонгами та зонтиками. Ідеальне місце для освіження влітку та відпочинку біля води для всієї родини.',
    cta: 'Забронювати відпочинок',
    image: asset('images/pool.png'),
    imageAlt: 'Басейн на території бази',
  },
] as const

export const pricing = {
  title: 'Прайс-лист',
  subtitle: 'FAMILY база відпочинку',
  seasons: [
    { period: '01.05 – 12.06' },
    { period: '30.08 – 31.10' },
    { period: '12.06 – 30.08' },
  ],
  rooms: [
    { name: 'Двомісні', prices: [1400, 1400, 1600] },
    { name: 'Двомісні покращені', prices: [1600, 1600, 1900] },
    { name: 'Тримісні з балконом', prices: [1800, 1800, 2200] },
    { name: 'Тримісні без балкону', prices: [1600, 1600, 1900] },
    { name: 'Апартаменти до 6 осіб', prices: [2400, 2400, 3200] },
    { name: 'Апартаменти до 8 осіб', prices: [3200, 3200, 4800] },
  ],
  note: 'Ціни вказані за добу. Актуальні тарифи уточнюйте за телефоном або в Instagram.',
} as const

export const galleryImages = [
  {
    src: asset('images/room-interior.png'),
    alt: 'Двомісний покращений номер',
  },
  {
    src: asset('images/room-exterior.png'),
    alt: 'Тераса номера',
  },
  {
    src: asset('images/restaurant.png'),
    alt: 'Ресторан',
  },
  {
    src: asset('images/pool.png'),
    alt: 'Басейн',
  },
]
