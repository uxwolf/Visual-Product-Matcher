// Sample product database for visual similarity matching
export interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price?: string;
  embedding?: number[];
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Classic White Sneakers",
    category: "Footwear",
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Leather Messenger Bag",
    category: "Accessories",
    price: "$149.99",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$199.99",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Denim Jacket",
    category: "Clothing",
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "Minimalist Watch",
    category: "Accessories",
    price: "$259.99",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 6,
    name: "Running Shoes",
    category: "Footwear",
    price: "$129.99",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 7,
    name: "Smartphone",
    category: "Electronics",
    price: "$799.99",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 8,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: "$29.99",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 9,
    name: "Sunglasses",
    category: "Accessories",
    price: "$119.99",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 10,
    name: "Laptop",
    category: "Electronics",
    price: "$1299.99",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 11,
    name: "Canvas Backpack",
    category: "Accessories",
    price: "$69.99",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 12,
    name: "High-Top Sneakers",
    category: "Footwear",
    price: "$109.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 13,
    name: "Wool Sweater",
    category: "Clothing",
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 14,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 15,
    name: "Leather Boots",
    category: "Footwear",
    price: "$189.99",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 16,
    name: "Dress Shirt",
    category: "Clothing",
    price: "$59.99",
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 17,
    name: "Camera",
    category: "Electronics",
    price: "$899.99",
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 18,
    name: "Wallet",
    category: "Accessories",
    price: "$49.99",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 19,
    name: "Baseball Cap",
    category: "Accessories",
    price: "$24.99",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 20,
    name: "Tablet",
    category: "Electronics",
    price: "$449.99",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 21,
    name: "Formal Dress",
    category: "Clothing",
    price: "$199.99",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 22,
    name: "Gaming Console",
    category: "Electronics",
    price: "$399.99",
    imageUrl: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 23,
    name: "Leather Belt",
    category: "Accessories",
    price: "$39.99",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 24,
    name: "Winter Coat",
    category: "Clothing",
    price: "$159.99",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 25,
    name: "Smart Watch",
    category: "Electronics",
    price: "$299.99",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 26,
    name: "Hiking Boots",
    category: "Footwear",
    price: "$149.99",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 27,
    name: "Jeans",
    category: "Clothing",
    price: "$69.99",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 28,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "$159.99",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 29,
    name: "Scarf",
    category: "Accessories",
    price: "$29.99",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 30,
    name: "Sandals",
    category: "Footwear",
    price: "$49.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 31,
    name: "Hoodie",
    category: "Clothing",
    price: "$59.99",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 32,
    name: "Portable Charger",
    category: "Electronics",
    price: "$39.99",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 33,
    name: "Necklace",
    category: "Accessories",
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 34,
    name: "Formal Shoes",
    category: "Footwear",
    price: "$129.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 35,
    name: "Skirt",
    category: "Clothing",
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 36,
    name: "Keyboard",
    category: "Electronics",
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 37,
    name: "Bracelet",
    category: "Accessories",
    price: "$69.99",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 38,
    name: "Flip Flops",
    category: "Footwear",
    price: "$19.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 39,
    name: "Polo Shirt",
    category: "Clothing",
    price: "$44.99",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 40,
    name: "Mouse",
    category: "Electronics",
    price: "$59.99",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 41,
    name: "Ring",
    category: "Accessories",
    price: "$199.99",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 42,
    name: "Athletic Shoes",
    category: "Footwear",
    price: "$119.99",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 43,
    name: "Blazer",
    category: "Clothing",
    price: "$189.99",
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 44,
    name: "Monitor",
    category: "Electronics",
    price: "$299.99",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 45,
    name: "Earrings",
    category: "Accessories",
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 46,
    name: "Loafers",
    category: "Footwear",
    price: "$99.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 47,
    name: "Cardigan",
    category: "Clothing",
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 48,
    name: "Webcam",
    category: "Electronics",
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 49,
    name: "Tie",
    category: "Accessories",
    price: "$34.99",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 50,
    name: "Slides",
    category: "Footwear",
    price: "$29.99",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 51,
    name: "Tank Top",
    category: "Clothing",
    price: "$24.99",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: 52,
    name: "Microphone",
    category: "Electronics",
    price: "$129.99",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
  }
];