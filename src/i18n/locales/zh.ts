import type en from './en'

/**
 * Typed against the English file, so key drift fails `tsc`.
 *
 * Note on plurals: Chinese has a single plural category, so i18next only ever
 * reads the `_other` form here. The `_one` forms are still present because the
 * type demands parity with English — they are never rendered, and keeping them
 * means a future locale can be added without restructuring keys.
 */
const zh: typeof en = {
  app: {
    name: 'WELT',
    title: 'WELT | 鞋履与服装',
    tagline: '鞋履与服装，小批量裁剪缝制。',
    season: '26 秋冬',
  },

  nav: {
    menu: '菜单',
    close: '关闭',
    search: '搜索',
    searchPlaceholder: '搜索全部商品',
    clearSearch: '清除搜索',
    bag: '购物袋',
    skipToContent: '跳到主要内容',
    language: '语言',
    backToCatalogue: '返回商品列表',
  },

  category: {
    all: '全部商品',
    allNote: '当前在架的全部款式',
    footwear: { name: '鞋履', note: '固特异缝制，可换底' },
    apparel: { name: '服装', note: '小批量裁剪缝制' },
    bags: { name: '包袋', note: '蜡帆布与植鞣皮革' },
  },

  sort: {
    label: '排序',
    featured: '推荐',
    'price-asc': '价格从低到高',
    'price-desc': '价格从高到低',
    newest: '最新上架',
  },

  filter: {
    colour: '颜色',
    clear: '清除筛选',
    all: '全部',
  },

  list: {
    count_one: '{{count}} 件',
    count_other: '{{count}} 件',
    matching: '匹配“{{term}}”',
    empty: {
      title: '没有符合条件的款式',
      body: '换个颜色试试，或者清除筛选看看全部商品。',
      action: '清除筛选',
    },
    error: {
      title: '商品目录加载失败',
      body: '获取商品时出错，通常重试一次就好。',
      action: '重试',
    },
  },

  product: {
    oneSize: '均码',
    colour: '颜色',
    size: '尺码',
    selectSize: '请选择尺码',
    addToBag: '加入购物袋',
    addedToBag: '已加入购物袋',
    soldOut: '已售罄',
    lowStock_one: '仅剩最后一件',
    lowStock_other: '仅剩 {{count}} 件',
    inStock: '有货',
    fit: '版型',
    material: '材质',
    origin: '产地',
    weight: '克重',
    details: '细节',
    sale: '特价',
    lastChance: '即将售罄',
    view: '查看{{name}}',
  },

  cart: {
    title: '购物袋',
    empty: {
      title: '购物袋是空的',
      body: '还没有加入任何商品，可以从商品列表开始看看。',
      action: '去看看商品',
    },
    subtotal: '小计',
    checkout: '去结算',
    checkoutNote: '结算不在本次 Demo 范围内。',
    remove: '移除',
    quantity: '数量',
    decrease: '减少数量',
    increase: '增加数量',
    lineCount_one: '{{count}} 件商品',
    lineCount_other: '{{count}} 件商品',
    priceChanged: '加入后价格有变动',
  },

  notFound: {
    title: '这个页面不存在',
    body: '链接可能已经失效，或者这件商品已经下架。',
    action: '返回商品列表',
  },

  error: {
    title: '出错了',
    body: '这个页面渲染失败，刷新通常可以解决。',
    action: '刷新页面',
  },

  common: {
    loading: '加载中',
    retry: '重试',
  },

  footer: {
    demo: 'Demo 版本。商品数据为 mock，不含结算功能。',
  },

  vocab: {
    fit: {
      trueToSize: '正常尺码',
      boxy: '方正',
      relaxed: '宽松',
      regular: '常规',
      wide: '阔腿',
      straight: '直筒',
      oneSize: '均码',
    },
    material: {
      oiledLeather: '油蜡牛皮',
      calfSuede: '小牛绒面',
      cottonCanvas: '纯棉帆布',
      cottonTwill: '纯棉斜纹',
      waxedCotton: '蜡棉',
      washedLinen: '水洗亚麻',
      heavyJersey: '重磅针织',
      merino: '超细美利奴',
      selvedgeDenim: '赤耳丹宁',
      waxedCanvas: '蜡帆布',
      vegTanLeather: '植鞣皮革',
    },
    origin: {
      portugal: '葡萄牙',
      england: '英国',
      italy: '意大利',
      japan: '日本',
    },
    colour: {
      charcoal: '炭灰',
      tan: '棕褐',
      black: '黑',
      cognac: '干邑棕',
      ecru: '本白',
      navy: '藏青',
      olive: '橄榄绿',
      indigo: '靛蓝',
      madder: '茜草红',
      stone: '石灰',
      moss: '苔绿',
      rawIndigo: '原色靛蓝',
      washedIndigo: '水洗靛蓝',
    },
  },
}

export default zh
