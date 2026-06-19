export type MenuItem = {
  name: string
  description?: string
  price: number
  image?: string
}

export type MenuSection = {
  id: string
  title: string
  items: MenuItem[]
}

export const menuHits: MenuItem[] = [
  { name: 'Борщ', price: 220, image: 'images/dishes/borshch.png' },
  { name: 'Банош', price: 230, image: 'images/dishes/banosh.png' },
  { name: 'Стейк зі свинини', price: 450 },
  { name: 'Паста з креветками', price: 300, image: 'images/dishes/pasta-z-krevetkamy.png' },
  { name: 'Цезарь', price: 280, image: 'images/dishes/cezar.png' },
]

export const menuSections: MenuSection[] = [
  {
    id: 'breakfasts',
    title: 'Сніданки',
    items: [
      {
        name: 'Омлет',
        description: '2 сосиски, 2 грінки, огірок, помідор',
        price: 200,
        image: 'images/dishes/omlet.png',
      },
      {
        name: 'Англійський сніданок',
        description: 'яйця, ковбаски, бекон, квасоля, 2 грінки, помідор',
        price: 240,
        image: 'images/dishes/anglijskyj-snidanok.png',
      },
      {
        name: 'Вівсяна каша',
        description: 'зі свіжими фруктами',
        price: 160,
        image: 'images/dishes/vivsjana-kasha-zi-svizhymy-fruktamy.png',
      },
      {
        name: 'Сирники',
        description: 'згущене молоко, сметана на вибір',
        price: 180,
        image: 'images/dishes/syrnyky.png',
      },
      {
        name: 'Налисники',
        description: 'з сиром, згущене молоко, сметана на вибір',
        price: 180,
        image: 'images/dishes/nalysnyky.png',
      },
      {
        name: 'Млинці',
        description: 'картопля з грибами / курка з моцарелою; зі сметаною',
        price: 220,
        image: 'images/dishes/mlyntsi.png',
      },
      { name: 'Брускети з тунцем', price: 250 },
      {
        name: 'Боул з гречкою',
        description: 'гречка, помідор, зелень, яйце пашот, заправка',
        price: 220,
        image: 'images/dishes/boul-z-grechkoju.png',
      },
    ],
  },
  {
    id: 'first-courses',
    title: 'Перші страви',
    items: [
      {
        name: 'Борщ',
        description: 'сало, сметана, цибуля, грінки',
        price: 220,
        image: 'images/dishes/borshch.png',
      },
      { name: 'Солянка', price: 200 },
      { name: 'Бограч', price: 240 },
      {
        name: 'Курячий бульйон',
        price: 160,
        image: 'images/dishes/kurjachyj-buljon.png',
      },
      { name: 'Суп з фрикадельками', price: 160 },
    ],
  },
  {
    id: 'salads',
    title: 'Салати',
    items: [
      {
        name: 'Салат з капусти',
        description: 'капуста, огірок, лимон, олія, оцет',
        price: 120,
        image: 'images/dishes/salat-z-kapusty.png',
      },
      {
        name: 'Салат літній',
        description: 'огірок, помідор, цибуля',
        price: 150,
        image: 'images/dishes/salat-litnij.png',
      },
      {
        name: 'Грецький',
        description: 'помідор, огірок, перець, цибуля, фета, оливки',
        price: 220,
        image: 'images/dishes/greckyj.png',
      },
      {
        name: 'Цезарь',
        description: 'куряче філе, салат, помідори, грінки, пармезан',
        price: 280,
        image: 'images/dishes/cezar.png',
      },
      {
        name: 'Капрізе',
        description:
          'помідори, моцарела, базилік, оливкова олія, бальзамічний соус',
        price: 220,
        image: 'images/dishes/kaprize.png',
      },
    ],
  },
  {
    id: 'appetizers',
    title: 'Закуски',
    items: [
      {
        name: "М'ясне асорті",
        description: 'сало копчене, асорті ковбасне, шинка',
        price: 450,
      },
      {
        name: 'Овочева нарізка',
        description: 'помідори, огірок, перець, зелень',
        price: 250,
      },
      {
        name: 'Помідори',
        description: 'з часником і зеленню',
        price: 180,
        image: 'images/dishes/pomidory.png',
      },
      {
        name: 'Малосольні огірки',
        price: 150,
        image: 'images/dishes/malosolni-ogirky.png',
      },
      {
        name: 'Українська закуска',
        description:
          'сало зі спеціями, часник, цибуля, грінки, сальцеві кульки',
        price: 350,
        image: 'images/dishes/ukrainska-zakuska.png',
      },
      {
        name: 'Пивна дошка',
        description: 'сухарики, реберця, сирні кульки, арахіс',
        price: 450,
      },
      {
        name: 'Стейк зі свинини',
        description: '100 г + соус',
        price: 250,
      },
      {
        name: "М'ясна дошка",
        description:
          'ребра, ковбаски гриль, шашлик курки, картопля по-селянськи, 2 соуси',
        price: 650,
      },
    ],
  },
  {
    id: 'hot-dishes',
    title: 'Гарячі страви',
    items: [
      { name: 'Картопля по-селянськи', price: 190 },
      {
        name: 'Картопляне пюре',
        description: 'котлета, відбивна на вибір',
        price: 230,
      },
      {
        name: 'Гаряча пательня',
        description: 'картопля, свинина, цибуля, сир',
        price: 300,
        image: 'images/dishes/garjacha-patelnja.png',
      },
      { name: 'Паста карбонара', price: 260, image: 'images/dishes/pasta-karbonara.png' },
      { name: 'Паста з креветками', price: 300, image: 'images/dishes/pasta-z-krevetkamy.png' },
      { name: 'Вареники з картоплею', price: 160 },
      { name: 'Вареники з сиром та кропом', price: 160 },
      { name: 'Вареники з вишнею', price: 160, image: 'images/dishes/varenyky-z-vyshneju.png' },
      { name: 'Пельмені', price: 200 },
      {
        name: 'Банош',
        description: 'шкварки, сир кисломолочний домашній, сметана',
        price: 230,
        image: 'images/dishes/banosh.png',
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Напої',
    items: [
      { name: 'Узвар', description: '1 л', price: 150 },
      { name: 'Лимонад', description: '1 л', price: 180 },
      { name: 'Сік на вибір', description: '1 л', price: 180 },
    ],
  },
  {
    id: 'fast-food',
    title: 'Fast Food',
    items: [
      { name: 'Чізбургер', price: 220 },
      { name: 'Дабл біг чізбургер', price: 270 },
      { name: 'Картопля фрі', description: '150 г + соус', price: 150 },
      { name: 'Хот дог XL', price: 130 },
      { name: 'Нагетси', description: 'соус', price: 210 },
      { name: 'Соус кисло-солодкий', price: 20 },
      { name: 'Соус сирний', price: 20 },
      { name: 'Соус барбекю', price: 20 },
      { name: 'Соус кетчуп', price: 20 },
      { name: 'Соус часниковий', price: 20 },
    ],
  },
]
