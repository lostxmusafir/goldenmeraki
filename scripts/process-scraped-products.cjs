const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/DREAM/Desktop/scrape/shop_scraper/output.json';
const outputPath = path.join(__dirname, '../src/data/products.json');

console.log('Reading input JSON from:', inputPath);
const rawData = fs.readFileSync(inputPath, 'utf-8');
const items = JSON.parse(rawData);

console.log(`Loaded ${items.length} items from scraped JSON.`);

const cleanTitle = (title) => {
  if (!title) return '';
  return title
    .replace(/\s*\d+[-–]\d+\s*(gms?|grams?|gm-2|gm-3|gm)?\b/gi, '')
    .replace(/\s*\d+\s*(gms?|grams?|gm)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const mapCategory = (categories = []) => {
  const catSet = new Set(categories.map(c => String(c).toLowerCase()));

  if (Array.from(catSet).some(c => c.includes('bracelet') || c.includes('anklet') || c.includes('kada'))) {
    return 'bracelets';
  }
  if (Array.from(catSet).some(c => c.includes('jewel') || c.includes('pendant') || c.includes('ring') || c.includes('earring') || c.includes('necklace'))) {
    return 'malas-jewelry';
  }
  if (Array.from(catSet).some(c => c.includes('tree') || c.includes('decor') || c.includes('angel') || c.includes('idol') || c.includes('animal') || c.includes('rakhi') || c.includes('heart'))) {
    return 'trees-decor';
  }
  if (Array.from(catSet).some(c => c.includes('mala') || c.includes('diwali') || c.includes('sacred') || c.includes('spiritual') || c.includes('shivling') || c.includes('yantra'))) {
    return 'sacred-spiritual';
  }
  if (Array.from(catSet).some(c => c.includes('gua sha') || c.includes('wellness') || c.includes('roller') || c.includes('reflexology'))) {
    return 'face-wellness';
  }
  return 'raw-stones'; // Default raw stones / crystals
};

const inferIntention = (tags = [], name = '') => {
  const text = (tags.join(' ') + ' ' + name).toLowerCase();
  if (text.includes('wealth') || text.includes('gold') || text.includes('money') || text.includes('pyrite') || text.includes('citrine')) return 'wealth';
  if (text.includes('love') || text.includes('rose quartz') || text.includes('heart') || text.includes('romance')) return 'love';
  if (text.includes('peace') || text.includes('calm') || text.includes('amethyst') || text.includes('meditation')) return 'peace';
  if (text.includes('protect') || text.includes('black tourmaline') || text.includes('evil eye')) return 'protection';
  return 'health';
};

const inferChakra = (stone = '', name = '') => {
  const text = (stone + ' ' + name).toLowerCase();
  if (text.includes('amethyst') || text.includes('clear quartz')) return 'crown';
  if (text.includes('lapis') || text.includes('sodalite')) return 'third-eye';
  if (text.includes('aquamarine') || text.includes('blue')) return 'throat';
  if (text.includes('rose quartz') || text.includes('aventurine') || text.includes('jade')) return 'heart';
  if (text.includes('citrine') || text.includes('pyrite')) return 'solar';
  if (text.includes('carnelian') || text.includes('sunstone')) return 'sacral';
  return 'root';
};

const cleanBenefits = (desc = '') => {
  if (!desc) return [
    'Promotes high vibrational energy and emotional balance.',
    'Supports daily meditation, mindfulness, and Vastu harmony.',
    '100% natural, ethically sourced crystal.'
  ];
  
  const matches = desc.match(/Benefits\s*:?\s*([^.]+?\.)/i);
  const sentences = desc.split('.').map(s => s.trim()).filter(s => s.length > 20 && s.length < 150);
  if (sentences.length >= 3) {
    return sentences.slice(0, 4);
  }
  return [
    'Promotes high vibrational energy, clarity, and harmony.',
    'Encourages emotional resilience and peaceful surroundings.',
    'Ideal for personal healing, home decoration, and gifting.'
  ];
};

const processed = items.map((item, idx) => {
  const rawTitle = item.name || 'Natural Gemstone Crystal';
  const name = cleanTitle(rawTitle);
  const cat = mapCategory(item.categories);
  const tagList = item.tags || [];
  const mainImage = item.image || (item.images && item.images[0]) || '/images/pyrite_cluster.png';
  const gallery = (item.images && item.images.length > 0) ? item.images : [mainImage];
  const priceVal = Math.round(item.price || item.price_max || 499);
  const origPriceVal = Math.round(item.regular_price || item.regular_price_max || (priceVal * 1.35));

  return {
    id: `prod-${idx + 1}`,
    name,
    category: cat,
    subCategory: (item.categories && item.categories[0]) ? item.categories[0].toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'general',
    intention: inferIntention(tagList, name),
    chakra: inferChakra(item.brand, name),
    price: priceVal,
    originalPrice: origPriceVal > priceVal ? origPriceVal : Math.round(priceVal * 1.3),
    rating: Number((4.5 + (idx % 5) * 0.1).toFixed(1)),
    reviewsCount: (idx % 35) + 8,
    badge: item.on_sale ? 'Sale' : (idx % 7 === 0 ? 'Best Seller' : ''),
    image: mainImage,
    images: gallery,
    certificate: 'ISO Certified 100% Natural Crystal',
    description: item.description || item.short_description || `${name} - Certified natural crystal product for energy healing and decoration.`,
    weights: [], // NO GRAM ELEMENT
    sku: item.sku || `GM-SKU-${idx + 1}`,
    stone: item.brand || name.split(' ')[0],
    tags: tagList,
    benefits: cleanBenefits(item.description),
    specifications: {
      origin: 'India & Worldwide Natural Mines',
      authenticity: 'Lab Certified 100% Natural Untreated'
    }
  };
});

fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2), 'utf-8');
console.log(`Successfully processed ${processed.length} products to ${outputPath}`);
