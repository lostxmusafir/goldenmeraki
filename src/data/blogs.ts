import type { BlogPost, Review } from '../types/review';

export const REVIEWS: Review[] = [
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
  },
  {
    id: 4,
    name: 'Meera Iyer',
    city: 'Bengaluru',
    rating: 5,
    date: '3 days ago',
    comment: 'The Rose Quartz Gua Sha roller completely upgraded my daily skincare routine! So soothing and 100% authentic.',
    productName: 'Rose Quartz Gua Sha'
  },
  {
    id: 5,
    name: 'Vikram Malhotra',
    city: 'Chandigarh',
    rating: 5,
    date: '5 days ago',
    comment: 'Purchased the 108 Bead Sandalwood Jaap Mala. The natural aroma and premium finish are absolutely top class.',
    productName: 'Sandalwood Jaap Mala'
  },
  {
    id: 6,
    name: 'Sneha Kulkarni',
    city: 'Pune',
    rating: 5,
    date: '1 week ago',
    comment: 'The Golden Pyrite Gemstone Tree brought so much positive vibe into our living space. Highly recommended!',
    productName: 'Pyrite Gemstone Tree'
  }
];

export const BLOG_POSTS: BlogPost[] = [
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

