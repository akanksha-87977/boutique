require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const categories = [
  {
    name: 'Dresses',
    slug: 'dresses',
    description: 'Elegant dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop',
    featured: true,
    order: 1
  },
  {
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Cozy and stylish knit pieces',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=600&fit=crop',
    featured: true,
    order: 2
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with our accessories',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&h=600&fit=crop',
    featured: true,
    order: 3
  },
  {
    name: 'Tops & Blouses',
    slug: 'tops-blouses',
    description: 'Sophisticated tops for any setting',
    image: 'https://images.unsplash.com/photo-1564257577-04d4b8fadd08?w=800&h=600&fit=crop',
    featured: false,
    order: 4
  },
  {
    name: 'Pants & Trousers',
    slug: 'pants-trousers',
    description: 'Tailored and comfortable bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop',
    featured: false,
    order: 5
  },
  {
    name: 'Skirts',
    slug: 'skirts',
    description: 'Flowing and flattering skirts',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=600&fit=crop',
    featured: false,
    order: 6
  },
  {
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Stylish coats and jackets',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop',
    featured: false,
    order: 7
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    description: 'Step out in style',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=600&fit=crop',
    featured: false,
    order: 8
  },
  {
    name: 'Bags',
    slug: 'bags',
    description: 'Elegant handbags and clutches',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop',
    featured: false,
    order: 9
  },
  {
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Delicate and timeless pieces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
    featured: false,
    order: 10
  }
];

const generateProducts = (categoryId, categoryName) => {
  const productsData = {
    'Dresses': [
      { name: 'Silk Midi Wrap Dress', price: 189, desc: 'Luxurious silk wrap dress with a flattering silhouette', sizes: ['XS', 'S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Velvet Evening Gown', price: 345, desc: 'Stunning floor-length velvet gown perfect for special occasions', sizes: ['S', 'M', 'L', 'XL'], featured: true },
      { name: 'Linen Summer Dress', price: 125, desc: 'Breezy linen dress ideal for warm weather', sizes: ['XS', 'S', 'M', 'L'], trending: true },
      { name: 'Floral Maxi Dress', price: 165, desc: 'Flowing maxi dress with delicate floral print', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Little Black Dress', price: 210, desc: 'Timeless LBD for every wardrobe', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'Satin Slip Dress', price: 155, desc: 'Elegant satin slip dress with adjustable straps', sizes: ['XS', 'S', 'M', 'L'], newArrival: true },
      { name: 'Embroidered Cocktail Dress', price: 285, desc: 'Exquisite embroidered dress for cocktail events', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Cotton Shirt Dress', price: 135, desc: 'Versatile cotton shirt dress for everyday elegance', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Pleated Midi Dress', price: 195, desc: 'Sophisticated pleated dress in premium fabric', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Off-Shoulder Summer Dress', price: 145, desc: 'Romantic off-shoulder dress for summer occasions', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Knit Sweater Dress', price: 175, desc: 'Cozy knit dress perfect for fall and winter', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Blazer Dress', price: 225, desc: 'Tailored blazer dress for a power look', sizes: ['XS', 'S', 'M', 'L', 'XL'] }
    ],
    'Knitwear': [
      { name: 'Cashmere Turtleneck', price: 245, desc: 'Luxuriously soft cashmere turtleneck sweater', sizes: ['S', 'M', 'L', 'XL'], featured: true },
      { name: 'Cable Knit Cardigan', price: 185, desc: 'Classic cable knit cardigan in premium wool', sizes: ['XS', 'S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Oversized Wool Sweater', price: 165, desc: 'Cozy oversized sweater for effortless style', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Merino Wool Pullover', price: 195, desc: 'Fine merino wool pullover with ribbed details', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Cropped Knit Top', price: 125, desc: 'Modern cropped knit perfect for layering', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'V-Neck Cashmere Blend', price: 215, desc: 'Elegant V-neck in cashmere blend', sizes: ['S', 'M', 'L', 'XL'], featured: true },
      { name: 'Ribbed Knit Vest', price: 135, desc: 'Stylish sleeveless knit vest', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Turtleneck Poncho', price: 205, desc: 'Sophisticated knit poncho with turtleneck', sizes: ['One Size'], newArrival: true },
      { name: 'Fair Isle Sweater', price: 175, desc: 'Traditional Fair Isle pattern sweater', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Mohair Blend Cardigan', price: 255, desc: 'Soft and fluffy mohair blend cardigan', sizes: ['S', 'M', 'L', 'XL'], trending: true }
    ],
    'Accessories': [
      { name: 'Silk Scarf', price: 85, desc: 'Hand-rolled silk scarf with elegant print', sizes: ['One Size'], featured: true },
      { name: 'Leather Belt', price: 95, desc: 'Italian leather belt with gold buckle', sizes: ['S', 'M', 'L'] },
      { name: 'Cashmere Gloves', price: 125, desc: 'Soft cashmere gloves for cold weather', sizes: ['S', 'M', 'L'], newArrival: true },
      { name: 'Wool Beret', price: 65, desc: 'Classic wool beret in various colors', sizes: ['One Size'], trending: true },
      { name: 'Sunglasses', price: 155, desc: 'Designer sunglasses with UV protection', sizes: ['One Size'] },
      { name: 'Hair Clips Set', price: 45, desc: 'Set of elegant pearl hair clips', sizes: ['One Size'] },
      { name: 'Knit Beanie', price: 55, desc: 'Cozy knit beanie with fold-up cuff', sizes: ['One Size'] },
      { name: 'Satin Headband', price: 35, desc: 'Luxe satin headband with knot detail', sizes: ['One Size'], newArrival: true },
      { name: 'Leather Watch', price: 245, desc: 'Minimalist leather strap watch', sizes: ['One Size'], featured: true },
      { name: 'Chain Necklace', price: 115, desc: 'Delicate gold-plated chain necklace', sizes: ['One Size'] }
    ],
    'Tops & Blouses': [
      { name: 'Silk Blouse', price: 165, desc: 'Elegant silk blouse with pearl buttons', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'Linen Button-Up', price: 95, desc: 'Relaxed linen shirt for effortless style', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Ruffled Peasant Top', price: 125, desc: 'Romantic peasant top with ruffle details', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Satin Camisole', price: 85, desc: 'Delicate satin camisole with lace trim', sizes: ['XS', 'S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Puff Sleeve Blouse', price: 135, desc: 'Modern blouse with statement puff sleeves', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Wrap Top', price: 115, desc: 'Flattering wrap-style top in jersey fabric', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Tie-Front Shirt', price: 105, desc: 'Casual shirt with tie-front detail', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Embroidered Tunic', price: 155, desc: 'Bohemian tunic with delicate embroidery', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Cropped Blazer Top', price: 185, desc: 'Tailored cropped blazer for polished looks', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'Ribbed Tank Top', price: 65, desc: 'Essential ribbed tank in premium cotton', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Bow-Neck Blouse', price: 145, desc: 'Sophisticated blouse with bow neck tie', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Sleeveless Turtleneck', price: 85, desc: 'Versatile sleeveless turtleneck', sizes: ['XS', 'S', 'M', 'L', 'XL'] }
    ],
    'Pants & Trousers': [
      { name: 'Wide-Leg Trousers', price: 175, desc: 'Flowing wide-leg trousers in premium fabric', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'Tailored Cigarette Pants', price: 155, desc: 'Sleek cigarette pants with ankle length', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Linen Palazzo Pants', price: 135, desc: 'Breezy palazzo pants for summer', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'High-Waist Culottes', price: 145, desc: 'Modern culottes with high waist', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Pleated Trousers', price: 165, desc: 'Classic pleated trousers in wool blend', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Cropped Flare Pants', price: 125, desc: 'Retro-inspired cropped flare pants', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Slim-Fit Trousers', price: 145, desc: 'Streamlined slim-fit trousers', sizes: ['XS', 'S', 'M', 'L', 'XL'], trending: true },
      { name: 'Jogger Pants', price: 115, desc: 'Luxe jogger pants in soft fabric', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Paper Bag Waist Pants', price: 155, desc: 'Trendy paper bag waist design', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Straight-Leg Jeans', price: 135, desc: 'Premium denim in timeless straight leg', sizes: ['S', 'M', 'L', 'XL'], featured: true }
    ],
    'Skirts': [
      { name: 'Pleated Midi Skirt', price: 145, desc: 'Elegant pleated midi skirt in flowing fabric', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'A-Line Mini Skirt', price: 95, desc: 'Classic A-line mini in premium cotton', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Satin Slip Skirt', price: 125, desc: 'Luxurious satin slip skirt', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Tulle Maxi Skirt', price: 185, desc: 'Romantic tulle maxi skirt', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Leather Pencil Skirt', price: 215, desc: 'Sophisticated leather pencil skirt', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'Wrap Skirt', price: 115, desc: 'Versatile wrap skirt in linen blend', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Asymmetric Hem Skirt', price: 135, desc: 'Modern skirt with asymmetric hemline', sizes: ['XS', 'S', 'M', 'L'] },
      { name: 'Denim Skirt', price: 105, desc: 'Classic denim midi skirt', sizes: ['S', 'M', 'L', 'XL'], trending: true },
      { name: 'Tiered Ruffle Skirt', price: 155, desc: 'Playful tiered skirt with ruffles', sizes: ['XS', 'S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Knit Midi Skirt', price: 125, desc: 'Cozy knit midi skirt', sizes: ['S', 'M', 'L', 'XL'] }
    ],
    'Outerwear': [
      { name: 'Wool Coat', price: 425, desc: 'Classic wool coat with tailored fit', sizes: ['S', 'M', 'L', 'XL'], featured: true },
      { name: 'Trench Coat', price: 385, desc: 'Timeless trench coat in water-resistant fabric', sizes: ['XS', 'S', 'M', 'L', 'XL'], trending: true },
      { name: 'Puffer Jacket', price: 295, desc: 'Sleek puffer jacket with down filling', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Blazer', price: 245, desc: 'Tailored blazer for polished looks', sizes: ['XS', 'S', 'M', 'L', 'XL'], featured: true },
      { name: 'Leather Jacket', price: 495, desc: 'Premium leather moto jacket', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Teddy Coat', price: 325, desc: 'Cozy teddy bear coat', sizes: ['XS', 'S', 'M', 'L', 'XL'], trending: true },
      { name: 'Cape Coat', price: 365, desc: 'Dramatic cape-style coat', sizes: ['S', 'M', 'L', 'XL'], newArrival: true },
      { name: 'Denim Jacket', price: 185, desc: 'Classic denim jacket with vintage wash', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Quilted Jacket', price: 255, desc: 'Lightweight quilted jacket', sizes: ['S', 'M', 'L', 'XL'] },
      { name: 'Peacoat', price: 375, desc: 'Naval-inspired double-breasted peacoat', sizes: ['S', 'M', 'L', 'XL'], featured: true }
    ],
    'Shoes': [
      { name: 'Leather Pumps', price: 225, desc: 'Classic pointed-toe leather pumps', sizes: ['6', '7', '8', '9', '10'], featured: true },
      { name: 'Ankle Boots', price: 285, desc: 'Versatile leather ankle boots', sizes: ['6', '7', '8', '9', '10'], trending: true },
      { name: 'Strappy Sandals', price: 195, desc: 'Elegant strappy sandals with heel', sizes: ['6', '7', '8', '9', '10'], newArrival: true },
      { name: 'Ballet Flats', price: 165, desc: 'Comfortable leather ballet flats', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Knee-High Boots', price: 395, desc: 'Sophisticated knee-high leather boots', sizes: ['6', '7', '8', '9', '10'], featured: true },
      { name: 'Mules', price: 185, desc: 'Chic backless mules', sizes: ['6', '7', '8', '9', '10'], trending: true },
      { name: 'Loafers', price: 215, desc: 'Polished leather loafers', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Platform Heels', price: 245, desc: 'Statement platform heels', sizes: ['6', '7', '8', '9', '10'], newArrival: true },
      { name: 'Sneakers', price: 175, desc: 'Minimalist leather sneakers', sizes: ['6', '7', '8', '9', '10'], trending: true },
      { name: 'Slingback Heels', price: 205, desc: 'Classic slingback heels', sizes: ['6', '7', '8', '9', '10'] }
    ],
    'Bags': [
      { name: 'Leather Tote', price: 345, desc: 'Spacious leather tote bag', sizes: ['One Size'], featured: true },
      { name: 'Crossbody Bag', price: 225, desc: 'Compact crossbody bag with adjustable strap', sizes: ['One Size'], trending: true },
      { name: 'Clutch', price: 165, desc: 'Elegant evening clutch', sizes: ['One Size'], newArrival: true },
      { name: 'Shoulder Bag', price: 285, desc: 'Structured shoulder bag in premium leather', sizes: ['One Size'], featured: true },
      { name: 'Bucket Bag', price: 255, desc: 'Trendy bucket bag with drawstring', sizes: ['One Size'] },
      { name: 'Satchel', price: 315, desc: 'Classic satchel with top handle', sizes: ['One Size'], trending: true },
      { name: 'Backpack', price: 275, desc: 'Sleek leather backpack', sizes: ['One Size'], newArrival: true },
      { name: 'Hobo Bag', price: 265, desc: 'Relaxed hobo bag in soft leather', sizes: ['One Size'] },
      { name: 'Mini Bag', price: 195, desc: 'Adorable mini bag with chain strap', sizes: ['One Size'], trending: true },
      { name: 'Weekender Bag', price: 395, desc: 'Large weekender travel bag', sizes: ['One Size'] }
    ],
    'Jewelry': [
      { name: 'Gold Chain Necklace', price: 145, desc: 'Delicate 14k gold-plated chain', sizes: ['One Size'], featured: true },
      { name: 'Pearl Earrings', price: 95, desc: 'Classic freshwater pearl studs', sizes: ['One Size'], trending: true },
      { name: 'Layered Bracelet Set', price: 85, desc: 'Set of three stackable bracelets', sizes: ['One Size'], newArrival: true },
      { name: 'Statement Ring', price: 115, desc: 'Bold cocktail ring with gemstone', sizes: ['6', '7', '8', '9'] },
      { name: 'Hoop Earrings', price: 105, desc: 'Medium-sized gold hoop earrings', sizes: ['One Size'], featured: true },
      { name: 'Pendant Necklace', price: 125, desc: 'Elegant pendant on delicate chain', sizes: ['One Size'] },
      { name: 'Cuff Bracelet', price: 135, desc: 'Modern minimalist cuff', sizes: ['One Size'], trending: true },
      { name: 'Stud Earring Set', price: 75, desc: 'Set of three pairs of studs', sizes: ['One Size'], newArrival: true },
      { name: 'Choker Necklace', price: 95, desc: 'Sleek choker with clasp closure', sizes: ['One Size'] },
      { name: 'Anklet', price: 65, desc: 'Dainty gold anklet', sizes: ['One Size'], trending: true }
    ]
  };

  const products = productsData[categoryName] || [];
  
  return products.map((product, index) => ({
    name: product.name,
    slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: product.desc,
    price: product.price,
    originalPrice: product.featured ? Math.round(product.price * 1.3) : null,
    category: categoryId,
    categoryName: categoryName,
    images: [
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=1000&fit=crop`,
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=1000&fit=crop`,
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=1000&fit=crop`
    ],
    sizes: product.sizes,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#F5F5DC' }
    ],
    material: 'Premium quality fabric',
    care: 'Dry clean only',
    inStock: true,
    featured: product.featured || false,
    newArrival: product.newArrival || false,
    trending: product.trending || false,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 10
  }));
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Insert categories
    console.log('📦 Seeding categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categories created`);

    // Insert products for each category
    console.log('📦 Seeding products...');
    let totalProducts = 0;

    for (const category of insertedCategories) {
      const products = generateProducts(category._id, category.name);
      if (products.length > 0) {
        await Product.insertMany(products);
        totalProducts += products.length;
        console.log(`✅ ${products.length} products created for ${category.name}`);
      }
    }

    console.log(`\n🎉 Database seeded successfully!`);
    console.log(`📊 Total: ${insertedCategories.length} categories, ${totalProducts} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();