const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

const sampleProducts = [
  {
    name: "Oversized Hoodie",
    description: "Soft, premium cotton hoodie with front pockets.",
    price: 1499,
    image: "https://example.com/images/hoodie.jpg",
    category: "Clothing",
    stock: 50,
  },
  {
    name: "Classic Denim Jacket",
    description: "Timeless blue denim jacket with button closure.",
    price: 1999,
    image: "https://example.com/images/jacket.jpg",
    category: "Clothing",
    stock: 30,
  },
  {
    name: "Running Shoes",
    description: "Breathable mesh shoes with foam cushioning.",
    price: 2599,
    image: "https://example.com/images/shoes.jpg",
    category: "Footwear",
    stock: 70,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany(); // Clear previous data
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample data inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }
};

importData();
