// src/lib/seed-data.ts
import { 
  addProduct, 
  addBlogPost, 
  addSpotlight,
  Product,
  BlogPost,
  Spotlight 
} from './firestore-schema';

// 🛍️ Sample Products
export const sampleProducts: Omit<Product, 'id'>[] = [
  {
    title: "Lone Wolf Patch",
    price: 15.99,
    description: "Embroidered lone wolf patch - Show your solo spirit on your jacket or vest",
    sizes: ["3 inch", "4 inch"],
    imageUrl: "/images/products/lone-wolf-patch.jpg",
    category: "patches",
    active: true,
    inventory: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Solo Riders MC Tee",
    price: 29.99,
    description: "Premium black cotton tee with vintage-style Solo Riders MC logo",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl: "/images/products/solo-tee.jpg",
    category: "tees",
    active: true,
    inventory: 75,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Road Warrior Bundle",
    price: 34.99,
    description: "Patch + Tee combo deal - Save $10 when you buy together",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl: "/images/products/warrior-bundle.jpg",
    category: "bundles",
    active: true,
    inventory: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Solo Mile Challenge Badge",
    price: 12.99,
    description: "Exclusive embroidered badge for 1000-mile challenge participants",
    sizes: ["Standard"],
    imageUrl: "/images/products/challenge-badge.jpg",
    category: "patches",
    active: true,
    inventory: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// 📝 Sample Blog Posts
export const sampleBlogPosts: Omit<BlogPost, 'id'>[] = [
  {
    title: "Top 10 Solo Riding Routes in the American West",
    slug: "top-10-solo-routes-american-west",
    author: "Peter Bernaiche",
    content: `# The Ultimate Solo Riding Experience\n\nDiscovering the perfect solo motorcycle route is about more than just the destination...\n\n## 1. Pacific Coast Highway (California)\nStarting from San Francisco and winding down to Los Angeles...\n\n## 2. Blue Ridge Parkway (Virginia to North Carolina)\nThis 469-mile scenic highway offers...\n\n[Continue with detailed route descriptions...]`,
    excerpt: "Discover the most breathtaking solo motorcycle routes from California to Colorado, handpicked by our community of independent riders.",
    coverImage: "/images/blog/american-west-routes.jpg",
    tags: ["routes", "west-coast", "solo-riding", "scenic"],
    category: "routes",
    published: true,
    publishedAt: new Date('2025-07-15'),
    createdAt: new Date('2025-07-15'),
    updatedAt: new Date('2025-07-15')
  },
  {
    title: "Building Your First Custom FXR: A Solo Journey",
    slug: "building-custom-fxr-solo-journey",
    author: "Mike Rodriguez",
    content: `# From Stock to Solo Touring Machine\n\nWhen I first laid eyes on that '91 FXR sitting in the back of Joe's garage...\n\n## Planning Your Build\nBefore you touch a wrench, you need a vision...\n\n## Essential Tools and Workspace\nWorking solo means being prepared...\n\n[Continue with build guide...]`,
    excerpt: "From garage builds to road warriors - follow Mike's journey transforming a stock Harley into the ultimate solo touring machine.",
    coverImage: "/images/blog/custom-fxr-build.jpg",
    tags: ["builds", "fxr", "harley", "custom", "garage"],
    category: "builds",
    published: true,
    publishedAt: new Date('2025-07-12'),
    createdAt: new Date('2025-07-12'),
    updatedAt: new Date('2025-07-12')
  },
  {
    title: "The Solo 1000-Mile Challenge: Week 1 Results",
    slug: "solo-1000-mile-challenge-week-1",
    author: "Solo Team",
    content: `# Challenge Week 1 Wrap-up\n\nThe response to our first-ever Solo 1000-Mile Challenge has been incredible...\n\n## Current Leaderboard\n1. RoadWarrior_TX - 287 miles\n2. LoneWolf_CA - 245 miles\n3. DesertRider_AZ - 198 miles\n\n## Tips for Success\nAfter watching our top performers...\n\n[Continue with challenge updates...]`,
    excerpt: "See who's leading the pack in our first-ever community challenge. Plus tips for tracking your miles and staying motivated.",
    coverImage: "/images/blog/mile-challenge-week1.jpg",
    tags: ["challenge", "community", "leaderboard", "miles"],
    category: "community",
    published: true,
    publishedAt: new Date('2025-07-10'),
    createdAt: new Date('2025-07-10'),
    updatedAt: new Date('2025-07-10')
  }
];

// 🏍️ Sample Spotlights
export const sampleSpotlights: Omit<Spotlight, 'id'>[] = [
  {
    riderName: "Fred M.",
    location: "Lakeland, FL",
    bikeModel: "Harley FXDB Street Bob",
    bikeYear: 2018,
    imageUrl: "/images/spotlights/fred-fxdb.jpg",
    story: "Built this beauty in my garage during 2024. Started with a stock Street Bob and transformed it into my perfect solo touring machine. The ape hangers and custom paint job make it uniquely mine. Just completed a 2,000-mile solo trip through the Smoky Mountains!",
    approved: true,
    featured: true,
    submittedAt: new Date('2025-07-01'),
    approvedAt: new Date('2025-07-02')
  },
  {
    riderName: "Sarah K.",
    location: "Phoenix, AZ",
    bikeModel: "Indian Scout Bobber",
    bikeYear: 2023,
    imageUrl: "/images/spotlights/sarah-scout.jpg",
    story: "Never thought I'd be a solo rider until I discovered the freedom of the open road. My Scout Bobber and I have covered over 15,000 miles together across the Southwest. There's nothing like watching the sunrise from your bike in the middle of nowhere.",
    approved: true,
    featured: false,
    submittedAt: new Date('2025-06-25'),
    approvedAt: new Date('2025-06-26')
  },
  {
    riderName: "Jake T.",
    location: "Austin, TX",
    bikeModel: "Triumph Bonneville T120",
    bikeYear: 2022,
    imageUrl: "/images/spotlights/jake-bonneville.jpg",
    story: "This Bonneville represents my journey back to riding after a 10-year break. Solo riding helped me rediscover my love for motorcycles and the meditative quality of long rides. Planning my first cross-country solo trip for next spring!",
    approved: true,
    featured: false,
    submittedAt: new Date('2025-06-20'),
    approvedAt: new Date('2025-06-21')
  }
];

// 🔥 Seed Functions
export const seedProducts = async () => {
  console.log('🛍️ Seeding products...');
  for (const product of sampleProducts) {
    await addProduct(product);
    console.log(`✅ Added product: ${product.title}`);
  }
};

export const seedBlogPosts = async () => {
  console.log('📝 Seeding blog posts...');
  for (const post of sampleBlogPosts) {
    await addBlogPost(post);
    console.log(`✅ Added blog post: ${post.title}`);
  }
};

export const seedSpotlights = async () => {
  console.log('🏍️ Seeding spotlights...');
  for (const spotlight of sampleSpotlights) {
    await addSpotlight(spotlight);
    console.log(`✅ Added spotlight: ${spotlight.riderName} - ${spotlight.bikeModel}`);
  }
};

export const seedAllData = async () => {
  try {
    await seedProducts();
    await seedBlogPosts();
    await seedSpotlights();
    console.log('🎉 All sample data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};
