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
  { name: 'Борщ', price: 220, image: 'images/dishes/borshch.webp' },
  { name: 'Банош', price: 230, image: 'images/dishes/banosh.webp' },
  { name: 'Паста з креветками', price: 300, image: 'images/dishes/pasta-z-krevetkamy.webp' },
  { name: 'Цезарь', price: 280, image: 'images/dishes/cezar.webp' },
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
        image: 'images/dishes/omlet.webp',
      },
      {
        name: 'Англійський сніданок',
        description: 'яйця, ковбаски, бекон, квасоля, 2 грінки, помідор',
        price: 240,
        image: 'images/dishes/anglijskyj-snidanok.webp',
      },
      {
        name: 'Вівсяна каша',
        description: 'зі свіжими фруктами',
        price: 160,
        image: 'images/dishes/vivsjana-kasha-zi-svizhymy-fruktamy.webp',
      },
      {
        name: 'Сирники',
        description: 'згущене молоко, сметана на вибір',
        price: 180,
        image: 'images/dishes/syrnyky.webp',
      },
      {
        name: 'Налисники',
        description: 'з сиром, згущене молоко, сметана на вибір',
        price: 180,
        image: 'images/dishes/nalysnyky.webp',
      },
      {
        name: 'Млинці',
        description: 'картопля з грибами / курка з моцарелою; зі сметаною',
        price: 220,
        image: 'images/dishes/mlyntsi.webp',
      },
      {
        name: 'Брускети з тунцем',
        price: 250,
        image: 'images/dishes/bruskety-z-tuncem.webp',
      },
      {
        name: 'Боул з гречкою',
        description: 'гречка, помідор, зелень, яйце пашот, заправка',
        price: 220,
        image: 'images/dishes/boul-z-grechkoju.webp',
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
        image: 'images/dishes/borshch.webp',
      },
      { name: 'Солянка', price: 200, image: 'images/dishes/soljanka.webp' },
      { name: 'Бограч', price: 240, image: 'images/dishes/bograch.webp' },
      {
        name: 'Курячий бульйон',
        price: 160,
        image: 'images/dishes/kurjachyj-buljon.webp',
      },
      { name: 'Суп з фрикадельками', price: 160, image: 'images/dishes/sup-z-frykadelkamy.webp' },
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
        image: 'images/dishes/salat-z-kapusty.webp',
      },
      {
        name: 'Салат літній',
        description: 'огірок, помідор, цибуля',
        price: 150,
        image: 'images/dishes/salat-litnij.webp',
      },
      {
        name: 'Грецький',
        description: 'помідор, огірок, перець, цибуля, фета, оливки',
        price: 220,
        image: 'images/dishes/greckyj.webp',
      },
      {
        name: 'Цезарь',
        description: 'куряче філе, салат, помідори, грінки, пармезан',
        price: 280,
        image: 'images/dishes/cezar.webp',
      },
      {
        name: 'Капрізе',
        description:
          'помідори, моцарела, базилік, оливкова олія, бальзамічний соус',
        price: 220,
        image: 'images/dishes/kaprize.webp',
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
        image: 'images/dishes/pomidory.webp',
      },
      {
        name: 'Малосольні огірки',
        price: 150,
        image: 'images/dishes/malosolni-ogirky.webp',
      },
      {
        name: 'Українська закуска',
        description:
          'сало зі спеціями, часник, цибуля, грінки, сальцеві кульки',
        price: 350,
        image: 'images/dishes/ukrainska-zakuska.webp',
      },
      {
        name: 'Пивна дошка',
        description: 'сухарики, реберця, сирні кульки, арахіс',
        price: 450,
        image: 'images/dishes/pyvna-doshka.webp',
      },
      {
        name: 'Стейк зі свинини',
        description: '100 г + соус',
        price: 250,
        image: 'images/dishes/stejk-zi-svynyny.webp',
      },
      {
        name: "М'ясна дошка",
        description:
          'ребра, ковбаски гриль, шашлик курки, картопля по-селянськи, 2 соуси',
        price: 650,
        image: 'images/dishes/mjasna-doshka.webp',
      },
    ],
  },
  {
    id: 'hot-dishes',
    title: 'Гарячі страви',
    items: [
      { name: 'Картопля по-селянськи', price: 190, image: 'images/dishes/kartoplja-po-seljansky.webp' },
      {
        name: 'Картопляне пюре',
        description: 'котлета, відбивна на вибір',
        price: 230,
      },
      {
        name: 'Гаряча пательня',
        description: 'картопля, свинина, цибуля, сир',
        price: 300,
        image: 'images/dishes/garjacha-patelnja.webp',
      },
      { name: 'Паста карбонара', price: 260, image: 'images/dishes/pasta-karbonara.webp' },
      { name: 'Паста з креветками', price: 300, image: 'images/dishes/pasta-z-krevetkamy.webp' },
      { name: 'Вареники з картоплею', price: 160, image: 'images/dishes/varenyky-z-kartopleju.webp' },
      { name: 'Вареники з сиром та кропом', price: 160 },
      { name: 'Вареники з вишнею', price: 160, image: 'images/dishes/varenyky-z-vyshneju.webp' },
      { name: 'Домашні пельмені', price: 200, image: 'images/dishes/domashni-pelmeni.webp' },
      { name: 'Бендерики з мʼясом', price: 250, image: 'images/dishes/benderyky-z-mjasom.webp' },
      {
        name: 'Банош',
        description: 'шкварки, сир кисломолочний домашній, сметана',
        price: 230,
        image: 'images/dishes/banosh.webp',
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
    id: 'coffee-and-tea',
    title: 'Coffee and Tea',
    items: [
      { name: 'Еспресо', price: 40 },
      { name: 'Американо', price: 40 },
      { name: 'Капучино', price: 80 },
      { name: 'Лате', price: 90 },
      { name: 'Флет вайт', price: 100 },
      { name: 'Подвійне еспресо', price: 60 },
      { name: 'Айс лате', price: 120 },
      { name: 'Оранж', price: 150 },
      { name: 'Фрапе', price: 200 },
      { name: 'Еспресо тонік', price: 130 },
      { name: 'Чай', price: 50 },
      { name: 'Какао', price: 60 },
      { name: 'Великий чай', price: 150 },
    ],
  },
  {
    id: 'coctails',
    title: 'Coctails',
    items: [
      {
        name: 'Classic Mojito',
        description: 'спрайт, сироп, мята, ром',
        price: 200,
      },
      {
        name: 'Aperol',
        description: 'сухе шампанське, лікер апероль, содова, апельсин',
        price: 300,
      },
      {
        name: 'Blue Lagoon',
        description: 'горілка, спрайт, лікер, мята',
        price: 200,
      },
      {
        name: 'Margarita',
        description: 'текіла, лікер, сироп, сік лайма, лайм, сіль',
        price: 250,
      },
      {
        name: 'Tequila Sunrise',
        description: 'текіла, лікер апельсиновий, сік, апельсин',
        price: 250,
      },
      {
        name: 'Gin Tonic',
        description: 'джин, тонік, лайм',
        price: 200,
      },
      {
        name: 'Long Island Iced Tea',
        description: 'горілка, ром, текіла, лікер, сироп, сік лимонний, кола, лимон',
        price: 350,
      },
      {
        name: 'Porn Star',
        description: 'горілка, лікер, просеко, апельсин',
        price: 250,
      },
      {
        name: 'Pina Colada',
        description: '2 види рому, сироп, ананасовий сік, лайм',
        price: 250,
      },
      {
        name: 'Jungle Juice',
        description: 'джин, ананасовий сік, сироп, лікер',
        price: 200,
      },
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
