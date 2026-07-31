import type { ChakraOption, IntentionOption, ProductCategoryOption, TaxonomyCategory } from '../types/category';

export const MASTER_TAXONOMY: TaxonomyCategory[] = [
  {
    id: 'raw-stones',
    name: 'Healing Crystals & Raw Stones',
    icon: 'Gem',
    subcategories: [
      { id: 'rough-raw-stone', name: 'Rough & Raw Stones' },
      { id: 'clusters', name: 'Crystal Clusters' },
      { id: 'geodes', name: 'Amethyst & Agate Geodes' },
      { id: 'tumble-stones', name: 'Tumble Stones' },
      { id: 'palm-stone', name: 'Palm Stones & Oval Stones' },
      { id: 'free-form', name: 'Free Form Crystals' },
      { id: 'finance-stone', name: 'Finance & Wealth Stones' }
    ]
  },
  {
    id: 'bracelets',
    name: 'Energy Bracelets & Jewelry',
    icon: 'CircleDot',
    subcategories: [
      { id: 'bracelets-sub', name: '7 Chakra & Intention Bracelets' },
      { id: 'kada', name: 'Gemstone Kadas & Anklets' },
      { id: 'pendant', name: 'Crystal Pendants' },
      { id: 'jewellery', name: 'Rings & Silver Jewelry' },
      { id: 'keychain', name: 'Crystal Keychains' }
    ]
  },
  {
    id: 'trees-decor',
    name: 'Feng Shui Trees & Home Decor',
    icon: 'TreeEvergreen',
    subcategories: [
      { id: 'tree', name: 'Gemstone Energy Trees' },
      { id: 'salt-lamps', name: 'Himalayan Salt Lamps' },
      { id: 'windchime', name: 'Crystal Windchimes' },
      { id: 'candles', name: 'Candle Holders & Diyas' },
      { id: 'bottle', name: 'Crystal Water Bottles' },
      { id: 'home-office-decor', name: 'Home & Office Showpieces' }
    ]
  },
  {
    id: 'sacred-spiritual',
    name: 'Sacred Geometry & Spiritual Articles',
    icon: 'Flame',
    subcategories: [
      { id: 'shree-yantra', name: 'Shree Yantra' },
      { id: 'gomati-chakra', name: 'Gomati Chakra' },
      { id: 'jaap-mala', name: '108 Jaap Malas' },
      { id: 'shivling', name: 'Crystal Shivling' },
      { id: 'pooja-articles', name: 'Pooja Articles & Camphor Dani' }
    ]
  },
  {
    id: 'carvings-shapes',
    name: 'Crystal Carvings & Shapes',
    icon: 'Compass',
    subcategories: [
      { id: 'angels', name: 'Crystal Angels' },
      { id: 'animal', name: 'Animal & Bird Carvings' },
      { id: 'heart', name: 'Crystal Hearts & Moons' },
      { id: 'tortoise', name: 'Crystal Tortoise' },
      { id: 'flower', name: 'Lotus & Flower Carvings' },
      { id: 'dream-catcher', name: 'Dream Catchers & Evil Eye' }
    ]
  },
  {
    id: 'face-wellness',
    name: 'Wellness & Facial Reflexology',
    icon: 'HeartHandshake',
    subcategories: [
      { id: 'face-tools', name: 'Gua Sha Facial Tools' },
      { id: 'massage-roller', name: 'Jade & Quartz Massage Rollers' },
      { id: 'pencil-wand', name: 'Healing Pencil Wands' },
      { id: 'pendulum', name: 'Dowsing Pendulums' },
      { id: 'anti-radiation-chip', name: 'Anti-Radiation Chips' }
    ]
  }
];

export const CATEGORIES: ProductCategoryOption[] = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', color: 'from-violet-500 to-indigo-600' },
  { id: 'bracelets', name: 'Energy Bracelets', icon: 'CircleDot', color: 'from-amber-400 to-emerald-500' },
  { id: 'raw-stones', name: 'Raw Crystals & Clusters', icon: 'Gem', color: 'from-cyan-400 to-blue-600' },
  { id: 'trees-decor', name: 'Gemstone Trees & Decor', icon: 'TreeEvergreen', color: 'from-emerald-400 to-teal-600' },
  { id: 'malas-jewelry', name: 'Jaap Malas & Silver Jewelry', icon: 'Flame', color: 'from-purple-500 to-pink-500' },
  { id: 'face-wellness', name: 'Facial Gua Sha & Wellness', icon: 'HeartHandshake', color: 'from-pink-400 to-rose-500' }
];

export const INTENTIONS: IntentionOption[] = [
  { id: 'wealth', label: 'Wealth & Abundance', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'love', label: 'Love & Harmony', color: 'bg-pink-100 text-pink-900 border-pink-300' },
  { id: 'peace', label: 'Inner Peace & Stress Relief', color: 'bg-violet-100 text-violet-900 border-violet-300' },
  { id: 'protection', label: 'Protection & Anti-Negativity', color: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
  { id: 'health', label: 'Vitality & Healing', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
];

export const CHAKRAS: ChakraOption[] = [
  { id: 'crown', name: 'Crown Chakra (Sahasrara)', stone: 'Amethyst / Clear Quartz', color: '#a855f7' },
  { id: 'third-eye', name: 'Third Eye (Ajna)', stone: 'Lapis Lazuli / Sodalite', color: '#6366f1' },
  { id: 'throat', name: 'Throat (Vishuddha)', stone: 'Aquamarine / Blue Lace Agate', color: '#06b6d4' },
  { id: 'heart', name: 'Heart (Anahata)', stone: 'Rose Quartz / Green Aventurine', color: '#10b981' },
  { id: 'solar', name: 'Solar Plexus (Manipura)', stone: 'Citrine / Pyrite', color: '#f59e0b' },
  { id: 'sacral', name: 'Sacral (Svadhishthana)', stone: 'Carnelian / Sunstone', color: '#f97316' },
  { id: 'root', name: 'Root (Muladhara)', stone: 'Black Tourmaline / Garnet', color: '#0d9488' }
];

