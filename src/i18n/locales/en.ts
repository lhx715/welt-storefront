/**
 * English copy is the source of truth for the key shape.
 * `zh.ts` is typed against this object, so a missing or stray key fails the
 * type check instead of silently shipping English to a Chinese shopper.
 */
const en = {
  app: {
    name: 'WELT',
    title: 'WELT | Footwear and Apparel',
    tagline: 'Footwear and apparel, cut and sewn in small runs.',
    season: 'Autumn / Winter 26',
  },

  nav: {
    menu: 'Menu',
    close: 'Close',
    search: 'Search',
    searchPlaceholder: 'Search the catalogue',
    clearSearch: 'Clear search',
    bag: 'Bag',
    skipToContent: 'Skip to content',
    language: 'Language',
    backToCatalogue: 'Back to the catalogue',
  },

  category: {
    all: 'All pieces',
    allNote: 'Everything currently on the rail',
    footwear: { name: 'Footwear', note: 'Goodyear welted, resolable' },
    apparel: { name: 'Apparel', note: 'Cut and sewn in small runs' },
    bags: { name: 'Bags', note: 'Waxed canvas and vegetable-tanned leather' },
  },

  sort: {
    label: 'Sort',
    featured: 'Featured',
    'price-asc': 'Price, low to high',
    'price-desc': 'Price, high to low',
    newest: 'Newest',
  },

  filter: {
    colour: 'Colour',
    clear: 'Clear filters',
    all: 'All',
  },

  list: {
    count_one: '{{count}} piece',
    count_other: '{{count}} pieces',
    matching: 'Matching “{{term}}”',
    empty: {
      title: 'Nothing on the rail matches that',
      body: 'Try a different colour, or clear the filters to see the full range.',
      action: 'Clear filters',
    },
    error: {
      title: 'The catalogue did not load',
      body: 'Something went wrong fetching the pieces. Trying again usually fixes it.',
      action: 'Try again',
    },
  },

  product: {
    oneSize: 'One size',
    colour: 'Colour',
    size: 'Size',
    selectSize: 'Select a size',
    addToBag: 'Add to bag',
    addedToBag: 'Added to your bag',
    soldOut: 'Sold out',
    lowStock_one: 'Last one',
    lowStock_other: '{{count}} left',
    inStock: 'In stock',
    fit: 'Fit',
    material: 'Material',
    origin: 'Made in',
    weight: 'Weight',
    details: 'Details',
    sale: 'Sale',
    lastChance: 'Last chance',
    view: 'View {{name}}',
  },

  cart: {
    title: 'Your bag',
    empty: {
      title: 'Your bag is empty',
      body: 'Nothing in it yet. The rail is a good place to start.',
      action: 'Browse the catalogue',
    },
    subtotal: 'Subtotal',
    checkout: 'Checkout',
    checkoutNote: 'Checkout is not part of this demo.',
    remove: 'Remove',
    quantity: 'Quantity',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    lineCount_one: '{{count}} item',
    lineCount_other: '{{count}} items',
    priceChanged: 'Price changed since you added this',
  },

  notFound: {
    title: 'That page is not here',
    body: 'The link may be old, or the piece may have left the rail.',
    action: 'Back to the catalogue',
  },

  error: {
    title: 'Something broke',
    body: 'This page failed to render. Reloading usually clears it.',
    action: 'Reload',
  },

  common: {
    loading: 'Loading',
    retry: 'Retry',
  },

  footer: {
    demo: 'Demo build. Catalogue data is mocked and checkout is out of scope.',
  },

  vocab: {
    fit: {
      trueToSize: 'True to size',
      boxy: 'Boxy',
      relaxed: 'Relaxed',
      regular: 'Regular',
      wide: 'Wide',
      straight: 'Straight',
      oneSize: 'One size',
    },
    material: {
      oiledLeather: 'Oiled leather',
      calfSuede: 'Calf suede',
      cottonCanvas: 'Cotton canvas',
      cottonTwill: 'Cotton twill',
      waxedCotton: 'Waxed cotton',
      washedLinen: 'Washed linen',
      heavyJersey: 'Heavy jersey',
      merino: 'Extra-fine merino',
      selvedgeDenim: 'Selvedge denim',
      waxedCanvas: 'Waxed canvas',
      vegTanLeather: 'Vegetable-tanned leather',
    },
    origin: {
      portugal: 'Portugal',
      england: 'England',
      italy: 'Italy',
      japan: 'Japan',
    },
    colour: {
      charcoal: 'Charcoal',
      tan: 'Tan',
      black: 'Black',
      cognac: 'Cognac',
      ecru: 'Ecru',
      navy: 'Navy',
      olive: 'Olive',
      indigo: 'Indigo',
      madder: 'Madder',
      stone: 'Stone',
      moss: 'Moss',
      rawIndigo: 'Raw indigo',
      washedIndigo: 'Washed indigo',
    },
  },
}

export default en
