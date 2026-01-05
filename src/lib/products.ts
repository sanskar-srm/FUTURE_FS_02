import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Aura Wireless Headphones',
    description: 'Experience immersive sound with these noise-cancelling wireless headphones. Features a 20-hour battery life and a comfortable, lightweight design.',
    price: 199.99,
    category: 'Electronics',
    image: imageMap.get('prod_001')!,
  },
  {
    id: 'prod_002',
    name: 'The Last Voyager',
    description: 'A gripping science fiction novel about the last human exploring a distant galaxy. A tale of discovery, loss, and hope.',
    price: 24.99,
    category: 'Books',
    image: imageMap.get('prod_002')!,
  },
  {
    id: 'prod_003',
    name: 'Minimalist Ceramic Mug',
    description: 'Enjoy your favorite beverage in this beautifully crafted ceramic mug. Its minimalist design fits perfectly in any modern kitchen.',
    price: 15.00,
    category: 'Home Goods',
    image: imageMap.get('prod_003')!,
  },
  {
    id: 'prod_004',
    name: 'NebulaBook Pro 14"',
    description: 'Unleash your creativity with the new NebulaBook Pro. Featuring the powerful M3 chip, a stunning Liquid Retina XDR display, and all-day battery life.',
    price: 1599.00,
    category: 'Electronics',
    image: imageMap.get('prod_004')!,
  },
  {
    id: 'prod_005',
    name: 'Chronicles of Eldoria Trilogy',
    description: 'A box set of the epic fantasy series "Chronicles of Eldoria". Follow the journey of heroes and villains in a land of magic and myth.',
    price: 65.50,
    category: 'Books',
    image: imageMap.get('prod_005')!,
  },
  {
    id: 'prod_006',
    name: 'ErgoFlow Office Chair',
    description: 'Stay comfortable and productive with the ErgoFlow chair. Features adjustable lumbar support, breathable mesh back, and a sleek design.',
    price: 350.00,
    category: 'Home Goods',
    image: imageMap.get('prod_006')!,
  },
  {
    id: 'prod_007',
    name: 'ChronoSmart Watch V2',
    description: 'Track your fitness, stay connected, and tell time in style. The ChronoSmart Watch V2 is your perfect everyday companion.',
    price: 249.99,
    category: 'Electronics',
    image: imageMap.get('prod_007')!,
  },
  {
    id: 'prod_008',
    name: 'The Quantum Paradox',
    description: 'A fascinating journey into the weird and wonderful world of quantum physics. This book makes complex science accessible to everyone.',
    price: 19.95,
    category: 'Books',
    image: imageMap.get('prod_008')!,
  },
  {
    id: 'prod_009',
    name: 'Arc Modern Floor Lamp',
    description: 'Illuminate your space with this elegant and modern floor lamp. Its arcing design provides light exactly where you need it.',
    price: 120.00,
    category: 'Home Goods',
    image: imageMap.get('prod_009')!,
  },
  {
    id: 'prod_010',
    name: 'Odyssey Gaming Console',
    description: 'Experience next-generation gaming with the Odyssey console. Breathtaking graphics, lightning-fast load times, and a library of exclusive games.',
    price: 499.99,
    category: 'Electronics',
    image: imageMap.get('prod_010')!,
  },
  {
    id: 'prod_011',
    name: 'Collected Works of Jane Austen',
    description: 'A beautiful hardcover collection of Jane Austen\'s most beloved novels, including "Pride and Prejudice" and "Sense and Sensibility".',
    price: 45.00,
    category: 'Books',
    image: imageMap.get('prod_011')!,
  },
  {
    id: 'prod_012',
    name: 'Artisan Chef\'s Knife Set',
    description: 'A professional-grade knife set for the home cook. Forged from high-carbon steel for exceptional sharpness and durability.',
    price: 220.00,
    category: 'Home Goods',
    image: imageMap.get('prod_012')!,
  },
];

export const categories = [
  ...new Set(products.map(product => product.category)),
];
