import type {
  Category,
  CategoryId,
  ColorFamily,
  Colorway,
  FigureSpec,
  LocalizedText,
  Money,
  Product,
  SizeOption,
  Variant,
} from './types'

/* ------------------------------------------------------------------ *
 * Fixture expansion
 *
 * Writing 15 products × 3 colourways × 5 sizes out by hand is ~225 SKUs
 * of noise, so the seeds below stay compact and variants are derived.
 * Everything is deterministic — no Math.random — so the catalogue is byte
 * identical on every reload, which keeps screenshots and tests stable.
 * ------------------------------------------------------------------ */

type SizeSetKey = 'apparel' | 'footwear' | 'onesize'

const SIZE_SETS: Record<SizeSetKey, string[]> = {
  apparel: ['xs', 's', 'm', 'l', 'xl'],
  footwear: ['40', '41', '42', '43', '44', '45'],
  onesize: ['os'],
}

const SIZE_LABELS: Record<string, string> = {
  xs: 'XS',
  s: 'S',
  m: 'M',
  l: 'L',
  xl: 'XL',
  '40': 'EU 40',
  '41': 'EU 41',
  '42': 'EU 42',
  '43': 'EU 43',
  '44': 'EU 44',
  '45': 'EU 45',
  os: 'OS',
}

/** FNV-1a: deterministic stock levels without pulling in a seeded RNG. */
function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function money(dollars: number): Money {
  return { amount: Math.round(dollars * 100), currency: 'USD' }
}

interface ColorwaySeed {
  id: string
  nameKey: string
  hex: string
  family: ColorFamily
}

interface ProductSeed {
  slug: string
  name: LocalizedText
  categoryId: CategoryId
  figure: FigureSpec
  fitKey: string
  materialKey: string
  originKey: string
  description: LocalizedText
  details: LocalizedText[]
  weight?: string
  price: number
  compareAtPrice?: number
  sizes: SizeSetKey
  colorways: ColorwaySeed[]
  arrivedAt: string
  /** "colourwayId:sizeId" entries forced to zero stock. */
  soldOut?: string[]
}

const SEEDS: ProductSeed[] = [
  {
    slug: 'goodyear-derby',
    name: { en: 'Goodyear Derby', zh: '固特异德比靴' },
    categoryId: 'footwear',
    figure: { archetype: 'boot' },
    fitKey: 'vocab.fit.trueToSize',
    materialKey: 'vocab.material.oiledLeather',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'A resolable derby on a 360° welt, built on the same last we have used since the workshop opened.',
      zh: '360° 固特异缝制，可换底；鞋楦自工坊开张沿用至今，没有改过。',
    },
    details: [
      { en: '360° Goodyear welt, resolable at any cobbler', zh: '360° 固特异缝制，任意修鞋铺都可换底' },
      { en: 'Vegetable-tanned leather lining', zh: '植鞣皮革内里' },
      { en: 'Stacked leather heel with a rubber top piece', zh: '层叠皮跟，底部橡胶垫片' },
    ],
    price: 340,
    sizes: 'footwear',
    arrivedAt: '2026-08-14',
    colorways: [
      { id: 'charcoal', nameKey: 'vocab.colour.charcoal', hex: '#33363a', family: 'charcoal' },
      { id: 'tan', nameKey: 'vocab.colour.tan', hex: '#b08a5e', family: 'tan' },
    ],
    soldOut: ['tan:45'],
  },
  {
    slug: 'suede-chukka',
    name: { en: 'Suede Chukka', zh: '绒面查卡靴' },
    categoryId: 'footwear',
    figure: { archetype: 'boot' },
    fitKey: 'vocab.fit.trueToSize',
    materialKey: 'vocab.material.calfSuede',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'A two-eyelet chukka in a dense calf suede that takes a scuff and keeps going.',
      zh: '两孔查卡靴，厚实小牛绒面，蹭到了也不娇气。',
    },
    details: [
      { en: 'Calf suede from a family tannery in Le Marche', zh: '小牛绒面，出自马尔凯大区的家族制革厂' },
      { en: 'Unlined vamp, leather insole', zh: '前帮无内里，皮革内底' },
      { en: 'Natural crepe sole', zh: '天然生胶底' },
    ],
    price: 295,
    compareAtPrice: 380,
    sizes: 'footwear',
    arrivedAt: '2026-06-02',
    colorways: [
      { id: 'tan', nameKey: 'vocab.colour.tan', hex: '#b08a5e', family: 'tan' },
      { id: 'madder', nameKey: 'vocab.colour.madder', hex: '#a8322a', family: 'madder' },
    ],
    soldOut: ['madder:40', 'madder:45'],
  },
  {
    slug: 'chelsea-boot',
    name: { en: 'Chelsea Boot', zh: '切尔西靴' },
    categoryId: 'footwear',
    figure: { archetype: 'boot', tall: true, lace: false },
    fitKey: 'vocab.fit.trueToSize',
    materialKey: 'vocab.material.oiledLeather',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'Side-gored and ankle-high, cut from a single piece of oiled hide.',
      zh: '侧边松紧带，及踝高度，整片油蜡牛皮裁成。',
    },
    details: [
      { en: 'Single-piece upper, no centre seam', zh: '整片鞋面，无中缝' },
      { en: 'Woven elastic gore, replaceable', zh: '编织松紧带，可更换' },
      { en: 'Leather sole with a rubber half-sole', zh: '皮革鞋底配橡胶半垫' },
    ],
    price: 380,
    sizes: 'footwear',
    arrivedAt: '2026-09-20',
    colorways: [
      { id: 'black', nameKey: 'vocab.colour.black', hex: '#1a1a1a', family: 'charcoal' },
      { id: 'cognac', nameKey: 'vocab.colour.cognac', hex: '#8a4b2a', family: 'tan' },
    ],
  },
  {
    slug: 'court-sneaker',
    name: { en: 'Canvas Court Sneaker', zh: '帆布网球鞋' },
    categoryId: 'footwear',
    figure: { archetype: 'sneaker' },
    fitKey: 'vocab.fit.trueToSize',
    materialKey: 'vocab.material.cottonCanvas',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'A court shoe that has not changed since the day we stopped playing in them.',
      zh: '一双球场鞋，从我们不再穿它打球那天起就没变过。',
    },
    details: [
      { en: '12 oz cotton canvas upper', zh: '12 盎司纯棉帆布鞋面' },
      { en: 'Vulcanised rubber cupsole', zh: '硫化橡胶包边底' },
      { en: 'Cotton laces, two pairs included', zh: '棉质鞋带，附赠两副' },
    ],
    price: 150,
    sizes: 'footwear',
    arrivedAt: '2026-05-11',
    colorways: [
      { id: 'ecru', nameKey: 'vocab.colour.ecru', hex: '#e4dccb', family: 'ecru' },
      { id: 'navy', nameKey: 'vocab.colour.navy', hex: '#1b2540', family: 'navy' },
    ],
  },
  {
    slug: 'boxy-overshirt',
    name: { en: 'Boxy Overshirt', zh: '方正工装衬衫' },
    categoryId: 'apparel',
    figure: { archetype: 'shirt', sleeve: 'long', collar: true, pocket: true },
    fitKey: 'vocab.fit.boxy',
    materialKey: 'vocab.material.cottonTwill',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'Cut wide through the body and short in the sleeve, so it layers over a knit without fighting it.',
      zh: '身幅放阔、袖长收短，叠穿在针织衫外不会互相较劲。',
    },
    details: [
      { en: '280 gsm cotton twill, garment washed', zh: '280 克重纯棉斜纹，成衣水洗' },
      { en: 'Corozo buttons', zh: '象牙果纽扣' },
      { en: 'Two chest pockets, bar-tacked at the corners', zh: '双胸袋，袋角打枣加固' },
    ],
    weight: '280 gsm',
    price: 185,
    sizes: 'apparel',
    arrivedAt: '2026-09-28',
    colorways: [
      { id: 'olive', nameKey: 'vocab.colour.olive', hex: '#5e6247', family: 'olive' },
      { id: 'ecru', nameKey: 'vocab.colour.ecru', hex: '#e4dccb', family: 'ecru' },
      { id: 'indigo', nameKey: 'vocab.colour.indigo', hex: '#2c3a5e', family: 'indigo' },
    ],
    soldOut: ['ecru:s', 'ecru:xs'],
  },
  {
    slug: 'waxed-field-jacket',
    name: { en: 'Waxed Field Jacket', zh: '蜡布猎装外套' },
    categoryId: 'apparel',
    figure: { archetype: 'shirt', sleeve: 'long', collar: true, pocket: true, wide: true },
    fitKey: 'vocab.fit.relaxed',
    materialKey: 'vocab.material.waxedCotton',
    originKey: 'vocab.origin.england',
    description: {
      en: 'Waxed in England. Stiff on the first wear, shaped to your shoulders by the fifth.',
      zh: '在英国上蜡。初次上身偏硬，穿到第五次就贴合肩线。',
    },
    details: [
      { en: '8 oz waxed cotton, re-waxable', zh: '8 盎司蜡棉，可重新上蜡' },
      { en: 'Four bellows pockets', zh: '四个风琴袋' },
      { en: 'Corduroy-lined collar and cuffs', zh: '灯芯绒领口与袖口' },
    ],
    weight: '8 oz',
    price: 420,
    compareAtPrice: 495,
    sizes: 'apparel',
    arrivedAt: '2026-08-30',
    colorways: [
      { id: 'olive', nameKey: 'vocab.colour.olive', hex: '#5e6247', family: 'olive' },
      { id: 'charcoal', nameKey: 'vocab.colour.charcoal', hex: '#33363a', family: 'charcoal' },
    ],
  },
  {
    slug: 'linen-camp-shirt',
    name: { en: 'Linen Camp Shirt', zh: '亚麻露营衬衫' },
    categoryId: 'apparel',
    figure: { archetype: 'shirt', sleeve: 'short', collar: true },
    fitKey: 'vocab.fit.relaxed',
    materialKey: 'vocab.material.washedLinen',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'An open camp collar in a washed linen that creases the way linen is supposed to.',
      zh: '开襟露营领，水洗亚麻，该起皱的地方就让它起皱。',
    },
    details: [
      { en: '165 gsm European flax, washed twice', zh: '165 克重欧洲亚麻，水洗两道' },
      { en: 'Camp collar, no top button', zh: '露营领，不设顶扣' },
      { en: 'Side vents with a locker loop', zh: '侧开衩配挂环' },
    ],
    weight: '165 gsm',
    price: 155,
    sizes: 'apparel',
    arrivedAt: '2026-04-19',
    colorways: [
      { id: 'ecru', nameKey: 'vocab.colour.ecru', hex: '#e4dccb', family: 'ecru' },
      { id: 'madder', nameKey: 'vocab.colour.madder', hex: '#a8322a', family: 'madder' },
      { id: 'stone', nameKey: 'vocab.colour.stone', hex: '#b9b3a5', family: 'ecru' },
    ],
  },
  {
    slug: 'pocket-tee',
    name: { en: 'Heavyweight Pocket Tee', zh: '重磅口袋 T 恤' },
    categoryId: 'apparel',
    figure: { archetype: 'tee', sleeve: 'short', pocket: true },
    fitKey: 'vocab.fit.regular',
    materialKey: 'vocab.material.heavyJersey',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'Tubular knit, so it will not twist in the wash. The pocket is the only decoration.',
      zh: '圆筒织造，洗后不扭。口袋是唯一的装饰。',
    },
    details: [
      { en: '240 gsm tubular jersey, no side seams', zh: '240 克重圆筒针织，无侧缝' },
      { en: 'Ribbed collar, twin-needle hems', zh: '罗纹领，双针下摆' },
      { en: 'Pre-shrunk', zh: '预缩处理' },
    ],
    weight: '240 gsm',
    price: 65,
    sizes: 'apparel',
    arrivedAt: '2026-03-08',
    colorways: [
      { id: 'ecru', nameKey: 'vocab.colour.ecru', hex: '#e4dccb', family: 'ecru' },
      { id: 'indigo', nameKey: 'vocab.colour.indigo', hex: '#2c3a5e', family: 'indigo' },
      { id: 'charcoal', nameKey: 'vocab.colour.charcoal', hex: '#33363a', family: 'charcoal' },
    ],
  },
  {
    slug: 'merino-crew',
    name: { en: 'Merino Crewneck', zh: '美利奴圆领针织衫' },
    categoryId: 'apparel',
    figure: { archetype: 'tee', sleeve: 'long' },
    fitKey: 'vocab.fit.regular',
    materialKey: 'vocab.material.merino',
    originKey: 'vocab.origin.italy',
    description: {
      en: 'Fully fashioned in a 19.5 micron merino: knitted to shape rather than cut from a panel.',
      zh: '19.5 微米美利奴，全成形编织 —— 是织出形状，而不是从布片上裁出来。',
    },
    details: [
      { en: '19.5 micron extra-fine merino', zh: '19.5 微米超细美利奴' },
      { en: 'Fully fashioned, linked shoulders', zh: '全成形，肩部套口缝合' },
      { en: 'Machine washable, cold', zh: '可冷水机洗' },
    ],
    weight: '19.5 micron',
    price: 175,
    sizes: 'apparel',
    arrivedAt: '2026-09-05',
    colorways: [
      { id: 'navy', nameKey: 'vocab.colour.navy', hex: '#1b2540', family: 'navy' },
      { id: 'moss', nameKey: 'vocab.colour.moss', hex: '#4a5240', family: 'olive' },
      { id: 'stone', nameKey: 'vocab.colour.stone', hex: '#b9b3a5', family: 'ecru' },
    ],
  },
  {
    slug: 'relaxed-chino',
    name: { en: 'Relaxed Chino', zh: '宽松卡其长裤' },
    categoryId: 'apparel',
    figure: { archetype: 'trouser' },
    fitKey: 'vocab.fit.relaxed',
    materialKey: 'vocab.material.cottonTwill',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'A high-rise chino with room through the seat and a straight fall to the ankle.',
      zh: '高腰卡其裤，臀部留量充足，到脚踝一路直落。',
    },
    details: [
      { en: '310 gsm cotton twill, garment dyed', zh: '310 克重纯棉斜纹，成衣染色' },
      { en: 'High rise, straight leg', zh: '高腰直筒' },
      { en: 'Unfinished hem, ready to be shortened', zh: '裤脚未锁边，方便改短' },
    ],
    weight: '310 gsm',
    price: 145,
    sizes: 'apparel',
    arrivedAt: '2026-07-22',
    colorways: [
      { id: 'ecru', nameKey: 'vocab.colour.ecru', hex: '#e4dccb', family: 'ecru' },
      { id: 'olive', nameKey: 'vocab.colour.olive', hex: '#5e6247', family: 'olive' },
    ],
  },
  {
    slug: 'wide-leg-trouser',
    name: { en: 'Wide-Leg Trouser', zh: '阔腿长裤' },
    categoryId: 'apparel',
    figure: { archetype: 'trouser', wide: true },
    fitKey: 'vocab.fit.wide',
    materialKey: 'vocab.material.washedLinen',
    originKey: 'vocab.origin.portugal',
    description: {
      en: "Drawn from a 1930s sailor's trouser, with the leg widened until it breaks clean.",
      zh: '取自 1930 年代水手裤，裤管一路加宽，直到堆叠得干净利落。',
    },
    details: [
      { en: 'Washed linen, softened at the mill', zh: '水洗亚麻，出厂前已完成柔化' },
      { en: 'Single reverse pleat at the front', zh: '前身单反褶' },
      { en: 'Side adjusters, no belt loops', zh: '侧边调节扣，不设裤耳' },
    ],
    price: 165,
    sizes: 'apparel',
    arrivedAt: '2026-09-30',
    colorways: [
      { id: 'charcoal', nameKey: 'vocab.colour.charcoal', hex: '#33363a', family: 'charcoal' },
      { id: 'stone', nameKey: 'vocab.colour.stone', hex: '#b9b3a5', family: 'ecru' },
    ],
  },
  {
    slug: 'selvedge-denim',
    name: { en: 'Selvedge Denim, 14 oz', zh: '14 盎司赤耳丹宁裤' },
    categoryId: 'apparel',
    figure: { archetype: 'trouser' },
    fitKey: 'vocab.fit.straight',
    materialKey: 'vocab.material.selvedgeDenim',
    originKey: 'vocab.origin.japan',
    description: {
      en: 'Woven on shuttle looms in Okayama. Turn the hem up and you can see the selvedge edge.',
      zh: '冈山梭织机织造。翻起裤脚，就能看到那道家传的赤耳。',
    },
    details: [
      { en: '14 oz selvedge denim, shuttle loomed in Okayama', zh: '14 盎司赤耳丹宁，冈山梭织' },
      { en: 'Copper rivets, hidden at the back pockets', zh: '铜质铆钉，后袋隐藏处理' },
      { en: 'Raw: expect shrinkage on the first soak', zh: '原色：首次浸水会缩' },
    ],
    weight: '14 oz',
    price: 210,
    sizes: 'apparel',
    arrivedAt: '2026-02-16',
    colorways: [
      { id: 'raw', nameKey: 'vocab.colour.rawIndigo', hex: '#3d4f73', family: 'indigo' },
      { id: 'washed', nameKey: 'vocab.colour.washedIndigo', hex: '#6b7b9c', family: 'indigo' },
    ],
    soldOut: ['raw:xl', 'raw:l'],
  },
  {
    slug: 'waxed-tote',
    name: { en: 'Waxed Canvas Tote', zh: '蜡帆布托特包' },
    categoryId: 'bags',
    figure: { archetype: 'tote' },
    fitKey: 'vocab.fit.oneSize',
    materialKey: 'vocab.material.waxedCanvas',
    originKey: 'vocab.origin.england',
    description: {
      en: 'A flat tote that stands up on its own once it has been carried for a while.',
      zh: '扁身托特，背上一阵子之后，它就能自己立住。',
    },
    details: [
      { en: '18 oz waxed canvas, re-waxable', zh: '18 盎司蜡帆布，可重新上蜡' },
      { en: 'Bridle leather handles', zh: '马缰皮革提手' },
      { en: 'One interior slip pocket', zh: '内置一个插袋' },
    ],
    price: 120,
    sizes: 'onesize',
    arrivedAt: '2026-06-27',
    colorways: [
      { id: 'olive', nameKey: 'vocab.colour.olive', hex: '#5e6247', family: 'olive' },
      { id: 'charcoal', nameKey: 'vocab.colour.charcoal', hex: '#33363a', family: 'charcoal' },
    ],
  },
  {
    slug: 'canvas-musette',
    name: { en: 'Canvas Musette', zh: '帆布小挎包' },
    categoryId: 'bags',
    figure: { archetype: 'tote' },
    fitKey: 'vocab.fit.oneSize',
    materialKey: 'vocab.material.cottonCanvas',
    originKey: 'vocab.origin.portugal',
    description: {
      en: 'A small shoulder bag sized for a book, a phone, and not much else.',
      zh: '小号单肩包，装得下一本书、一部手机，再多就不必了。',
    },
    details: [
      { en: '12 oz cotton canvas, stone washed', zh: '12 盎司纯棉帆布，石洗' },
      { en: 'Adjustable webbing strap', zh: '可调织带肩带' },
      { en: 'Brass hardware', zh: '黄铜五金' },
    ],
    price: 95,
    sizes: 'onesize',
    arrivedAt: '2026-05-30',
    colorways: [
      { id: 'ecru', nameKey: 'vocab.colour.ecru', hex: '#e4dccb', family: 'ecru' },
      { id: 'madder', nameKey: 'vocab.colour.madder', hex: '#a8322a', family: 'madder' },
    ],
  },
  {
    slug: 'leather-weekender',
    name: { en: 'Leather Weekender', zh: '皮革周末旅行袋' },
    categoryId: 'bags',
    figure: { archetype: 'duffel' },
    fitKey: 'vocab.fit.oneSize',
    materialKey: 'vocab.material.vegTanLeather',
    originKey: 'vocab.origin.italy',
    description: {
      en: 'Vegetable-tanned and left unfinished, so it darkens where you handle it.',
      zh: '植鞣未涂饰，手常碰到的地方会自己变深。',
    },
    details: [
      { en: 'Vegetable-tanned leather from Tuscany', zh: '托斯卡纳植鞣皮革' },
      { en: 'Solid brass two-way zip', zh: '实心黄铜双向拉链' },
      { en: 'Fits a 40 cm cabin allowance', zh: '符合 40 厘米登机尺寸' },
    ],
    price: 480,
    sizes: 'onesize',
    arrivedAt: '2026-08-08',
    colorways: [
      { id: 'cognac', nameKey: 'vocab.colour.cognac', hex: '#8a4b2a', family: 'tan' },
      { id: 'black', nameKey: 'vocab.colour.black', hex: '#1a1a1a', family: 'charcoal' },
    ],
  },
]

function buildProduct(seed: ProductSeed, rank: number): Product {
  const sizeIds = SIZE_SETS[seed.sizes]
  const sizes: SizeOption[] = sizeIds.map((id) => ({
    id,
    label: SIZE_LABELS[id] ?? id.toUpperCase(),
  }))
  const colorways: Colorway[] = seed.colorways.map((c) => ({
    id: c.id,
    nameKey: c.nameKey,
    hex: c.hex,
    family: c.family,
  }))

  const variants: Variant[] = []
  for (const colorway of seed.colorways) {
    for (const size of sizeIds) {
      const id = `${seed.slug}--${colorway.id}--${size}`
      const isSoldOut = seed.soldOut?.includes(`${colorway.id}:${size}`) ?? false
      variants.push({
        id,
        colorwayId: colorway.id,
        sizeId: size,
        stock: isSoldOut ? 0 : 1 + (hash(id) % 9),
      })
    }
  }

  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    categoryId: seed.categoryId,
    figure: seed.figure,
    fitKey: seed.fitKey,
    materialKey: seed.materialKey,
    originKey: seed.originKey,
    description: seed.description,
    details: seed.details,
    ...(seed.weight === undefined ? {} : { weight: seed.weight }),
    price: money(seed.price),
    ...(seed.compareAtPrice === undefined ? {} : { compareAtPrice: money(seed.compareAtPrice) }),
    colorways,
    sizes,
    variants,
    featuredRank: rank,
    arrivedAt: seed.arrivedAt,
  }
}

export const PRODUCTS: Product[] = SEEDS.map(buildProduct)

export const CATEGORIES: Category[] = [
  { id: 'footwear', nameKey: 'category.footwear.name', noteKey: 'category.footwear.note' },
  { id: 'apparel', nameKey: 'category.apparel.name', noteKey: 'category.apparel.note' },
  { id: 'bags', nameKey: 'category.bags.name', noteKey: 'category.bags.note' },
]

/** Curated order — the dye vocabulary of the house, not alphabetical. */
export const COLOR_FAMILIES: ColorFamily[] = [
  'ecru',
  'indigo',
  'madder',
  'olive',
  'tan',
  'navy',
  'charcoal',
]

/** One representative swatch per family, for the filter row only. */
export const COLOR_FAMILY_SWATCH: Record<ColorFamily, string> = {
  ecru: '#e4dccb',
  indigo: '#2c3a5e',
  madder: '#a8322a',
  olive: '#5e6247',
  tan: '#b08a5e',
  navy: '#1b2540',
  charcoal: '#33363a',
}
