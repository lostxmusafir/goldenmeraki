import productsData from './products.json';

export const MASTER_TAXONOMY = [
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

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', color: 'from-violet-500 to-indigo-600' },
  { id: 'bracelets', name: 'Energy Bracelets', icon: 'CircleDot', color: 'from-amber-400 to-emerald-500' },
  { id: 'raw-stones', name: 'Raw Crystals & Clusters', icon: 'Gem', color: 'from-cyan-400 to-blue-600' },
  { id: 'trees-decor', name: 'Gemstone Trees & Decor', icon: 'TreeEvergreen', color: 'from-emerald-400 to-teal-600' },
  { id: 'malas-jewelry', name: 'Jaap Malas & Silver Jewelry', icon: 'Flame', color: 'from-purple-500 to-pink-500' },
  { id: 'face-wellness', name: 'Facial Gua Sha & Wellness', icon: 'HeartHandshake', color: 'from-pink-400 to-rose-500' },
  { id: 'zodiac-kits', name: 'Zodiac & Chakra Kits', icon: 'Compass', color: 'from-indigo-400 to-cyan-500' }
];

export const INTENTIONS = [
  { id: 'wealth', label: 'Wealth & Abundance', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'love', label: 'Love & Harmony', color: 'bg-pink-100 text-pink-900 border-pink-300' },
  { id: 'peace', label: 'Inner Peace & Stress Relief', color: 'bg-violet-100 text-violet-900 border-violet-300' },
  { id: 'protection', label: 'Protection & Anti-Negativity', color: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
  { id: 'health', label: 'Vitality & Healing', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
];

export const CHAKRAS = [
  { id: 'crown', name: 'Crown Chakra (Sahasrara)', stone: 'Amethyst / Clear Quartz', color: '#a855f7' },
  { id: 'third-eye', name: 'Third Eye (Ajna)', stone: 'Lapis Lazuli / Sodalite', color: '#6366f1' },
  { id: 'throat', name: 'Throat (Vishuddha)', stone: 'Aquamarine / Blue Lace Agate', color: '#06b6d4' },
  { id: 'heart', name: 'Heart (Anahata)', stone: 'Rose Quartz / Green Aventurine', color: '#10b981' },
  { id: 'solar', name: 'Solar Plexus (Manipura)', stone: 'Citrine / Pyrite', color: '#f59e0b' },
  { id: 'sacral', name: 'Sacral (Svadhishthana)', stone: 'Carnelian / Sunstone', color: '#f97316' },
  { id: 'root', name: 'Root (Muladhara)', stone: 'Black Tourmaline / Garnet', color: '#0d9488' }
];

export const CUSTOM_BEADS = [
  { 
    id: 'bead-pyrite', 
    name: 'Pyrite (Wealth)', 
    color: '#d97706', 
    pricePerBead: 40, 
    energy: 'Abundance & Wealth',
    image: '/images/pyrite_cluster.png'
  },
  { 
    id: 'bead-amethyst', 
    name: 'Amethyst (Calm)', 
    color: '#a855f7', 
    pricePerBead: 45, 
    energy: 'Intuition & Peace',
    image: '/images/amethyst_geode_slice.png'
  },
  { 
    id: 'bead-rosequartz', 
    name: 'Rose Quartz (Love)', 
    color: '#ec4899', 
    pricePerBead: 35, 
    energy: 'Love & Compassion',
    image: '/images/rose_quartz_chunk.png'
  },
  { 
    id: 'bead-aventurine', 
    name: 'Green Aventurine (Luck)', 
    color: '#10b981', 
    pricePerBead: 35, 
    energy: 'Opportunity & Health',
    image: '/images/seven_chakra_bracelet.png'
  },
  { 
    id: 'bead-lapis', 
    name: 'Lapis Lazuli (Wisdom)', 
    color: '#3b82f6', 
    pricePerBead: 50, 
    energy: 'Communication & Truth',
    image: '/images/shree_yantra_pendant.png'
  },
  { 
    id: 'bead-citrine', 
    name: 'Citrine (Joy)', 
    color: '#eab308', 
    pricePerBead: 45, 
    energy: 'Solar Energy & Success',
    image: '/images/citrine_ring.png'
  },
  { 
    id: 'bead-tigereye', 
    name: 'Tiger Eye (Courage)', 
    color: '#b45309', 
    pricePerBead: 40, 
    energy: 'Focus & Protection',
    image: '/images/black_tourmaline_bracelet.png'
  },
  { 
    id: 'bead-clearquartz', 
    name: 'Clear Quartz (Amplifier)', 
    color: '#06b6d4', 
    pricePerBead: 30, 
    energy: 'Clarity & Energy',
    image: '/images/quartz_pyramid.png'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    date: '2 days ago',
    comment: 'The Pyrite Cluster from Golden Meraki is stunning! The golden crystals sparkle immensely and come with an authentic lab certificate. Placed it in my office cash box.',
    productName: 'Pyrite Wealth Cluster'
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    city: 'Delhi NCR',
    rating: 5,
    date: '1 week ago',
    comment: '100% authentic 7 Chakra Bracelet! Fast delivery to Delhi within 48 hours. Packaging was pristine with sacred sound energy cleansing.',
    productName: '7 Chakra Lava Bracelet'
  },
  {
    id: 3,
    name: 'Priyanka Patel',
    city: 'Ahmedabad',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Bought the Amethyst Geode slice for my meditation room. High vibrational energy and beautiful deep purple color.',
    productName: 'Amethyst Geode Slice'
  }
];

export const BLOG_POSTS = [
  {
    id: 'post-1',
    title: '5 Crystals Every Home Needs for Vastu Wealth & Abundance',
    category: 'Vastu & Healing',
    readTime: '4 min read',
    snippet: 'Discover how Pyrite, Green Jade, and Citrine work together to remove financial blockages and amplify prosperity.',
    image: '/images/pyrite_cluster.png'
  },
  {
    id: 'post-2',
    title: 'How to Cleanse & Charge Your Energy Bracelets with Selenite',
    category: 'Crystal Care',
    readTime: '3 min read',
    snippet: 'Learn sacred sound bowl cleansing and full moon charging techniques to keep your gemstones at peak vibrational frequency.',
    image: '/images/selenite_tower.png'
  },
  {
    id: 'post-3',
    title: 'The Ultimate Guide to 7 Chakra Balancing Bracelets',
    category: 'Chakra Science',
    readTime: '5 min read',
    snippet: 'Understand the metaphysical properties of Root to Crown chakra stones and how to wear them for emotional stability.',
    image: '/images/seven_chakra_bracelet.png'
  }
];

export const PRODUCTS = productsData;