const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productSchema");

dotenv.config();

const sampleProducts = [
  {
    name: "Oversized Hoodie",
    description: `
Crafted from premium 100% combed cotton with a luxuriously soft fleece lining, this oversized hoodie is designed for maximum comfort during chilly days. 
The relaxed fit offers a modern streetwear silhouette, while the adjustable drawstring hood and spacious kangaroo pocket add both style and functionality. 
Perfect for layering over your favorite T-shirt or under a jacket in colder weather, this hoodie is garment-washed for a broken-in feel right out of the box.

Key Features:
- Fabric: 100% combed cotton exterior with polyester fleece interior
- Oversized, relaxed fit with dropped shoulders
- Adjustable drawstring hood for a custom fit
- Large kangaroo pocket for convenience
- Durable ribbed cuffs and hem to retain shape
- Pre-shrunk to minimize shrinkage
- Easy care: machine washable

Ideal For:
Casual wear, lounging, traveling, and layering for streetwear-inspired outfits.
`,
    price: 1499,
    thumbnail: "https://images.unsplash.com/photo-1602810318383-e386cc2a3d3a",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3d3a",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1b1"
    ],
    category: "Mens Wear",
    subCategory: "Tops",
    size: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Classic Denim Jacket",
    description: `
This timeless denim jacket is made from heavyweight cotton for a structured yet comfortable fit. The faded blue wash gives it a vintage charm, while metal buttons and dual chest pockets offer practical style. 
Whether you’re layering over a hoodie in winter or pairing with a T-shirt in summer evenings, this jacket is a year-round essential.

Key Features:
- Material: 100% heavyweight cotton denim
- Classic blue wash with distressed detailing
- Metal button front closure and adjustable cuffs
- Dual flap chest pockets + side welt pockets
- Durable double-stitched seams for longevity
- Pre-washed to prevent shrinkage

Ideal For:
Layering over casual outfits, travel wear, and classic street style looks.
`,
    price: 1999,
    thumbnail: "https://images.unsplash.com/photo-1601333148403-1f1af9f443db",
    gallery: [
      "https://images.unsplash.com/photo-1601333148403-1f1af9f443db",
      "https://images.unsplash.com/photo-1580317329753-d6d85bbf8e6f"
    ],
    category: "Womens Wear",
    subCategory: "Jackets",
    size: ["XS", "S", "M", "L"],
    stock: 30
  },
  {
    name: "Running Shoes",
    description: `
Engineered for performance and comfort, these running shoes feature a breathable mesh upper for ventilation and lightweight foam cushioning for shock absorption. The rubber outsole provides superior grip, whether you’re on the track or city streets.

Key Features:
- Breathable mesh upper with synthetic overlays
- Lightweight EVA foam midsole for comfort
- Flexible rubber outsole for traction
- Lace-up design for a secure fit
- Padded collar and tongue for ankle support

Ideal For:
Running, jogging, gym workouts, and all-day comfort.
`,
    price: 2599,
    thumbnail: "https://images.unsplash.com/photo-1600181952094-5e4d5c2e17a0",
    gallery: [
      "https://images.unsplash.com/photo-1600181952094-5e4d5c2e17a0",
      "https://images.unsplash.com/photo-1600181951300-98c2f2f7dcf0"
    ],
    category: "Mens Wear",
    subCategory: "Footwear",
    size: ["XS", "S", "M", "L"],
    stock: 70
  },
  {
    name: "Floral Summer Skirt",
    description: `
Lightweight and flowy, this floral skirt is crafted from breathable rayon fabric to keep you cool during warm days. The elastic waistband ensures a comfortable fit, while the vibrant floral print adds a cheerful vibe to your outfit.

Key Features:
- Material: 100% rayon
- Elastic waistband for flexible sizing
- Mid-length A-line cut
- Vibrant all-over floral print
- Soft and breathable fabric

Ideal For:
Casual summer outings, beach vacations, and everyday wear.
`,
    price: 1299,
    thumbnail: "https://images.unsplash.com/photo-1621189491978-df97e19f2d7b",
    gallery: [
      "https://images.unsplash.com/photo-1621189491978-df97e19f2d7b",
      "https://images.unsplash.com/photo-1576754141266-706b3eab1839"
    ],
    category: "Womens Wear",
    subCategory: "Skirts",
    size: ["S", "M", "L"],
    stock: 40
  },
  {
    name: "Slim Fit Cotton Shirt",
    description: `
A wardrobe essential, this slim fit shirt is made from fine cotton for breathability and durability. The tailored cut flatters your physique without restricting movement, making it perfect for both office and casual occasions.

Key Features:
- Fabric: 100% cotton
- Slim fit with a clean silhouette
- Button-down front and cuffs
- Available in multiple solid colors
- Breathable and lightweight

Ideal For:
Office wear, casual outings, and semi-formal events.
`,
    price: 1799,
    thumbnail: "https://images.unsplash.com/photo-1580910051074-3fce28a3d01c",
    gallery: [
      "https://images.unsplash.com/photo-1580910051074-3fce28a3d01c",
      "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d"
    ],
    category: "Mens Wear",
    subCategory: "Shirts",
    size: ["M", "L", "XL"],
    stock: 60
  }

];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error inserting sample products:", error);
    process.exit(1);
  }
};

importData();
