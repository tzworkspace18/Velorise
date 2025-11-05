// src/data/products.js
// ✅ Only minimal updates made to fit the new ProductCard design.
import img100 from "../assets/images/100.png";
import img200 from "../assets/images/200.png";
import img300 from "../assets/images/300.png";
import img400 from "../assets/images/400.png";
import img500 from "../assets/images/500.png";

const products = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    rating: 4,
    price: 50,
    discountPrice: 40,
    discountPercent: 20,
    description:
      "High-quality cotton casual shirt for men. Soft fabric with a clean modern fit — perfect for daily wear.",
    badge: "Bestseller",
    isBestseller: true,
    tags: ["Casual", "Cotton", "Popular"],
    images: [img100,],
    link: "/product/1",
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    rating: 5,
    price: 80,
    discountPrice: 65,
    discountPercent: 19,
    description:
      "Elegant lightweight summer dress for women, designed for all-day comfort and graceful style.",
    tags: ["Elegant", "Summer"],
    images: [img200,],
    link: "/product/2",
  },
  {
    id: 3,
    name: "Kids Sneakers",
    rating: 4,
    price: 60,
    discountPrice: 50,
    discountPercent: 16,
    description:
      "Durable and stylish sneakers for kids — great for school, sports, and playtime.",
    tags: ["Kids", "Sport"],
    images: [img300,],
    link: "/product/3",
  },
  {
    id: 4,
    name: "Men's Slim Fit Jeans",
    rating: 4,
    price: 90,
    discountPrice: 72,
    discountPercent: 20,
    description:
      "Classic slim-fit jeans crafted from premium stretch denim for maximum comfort and durability.",
    tags: ["Men", "Denim"],
    images: [img400,],
    link: "/product/4",
  },
  {
    id: 5,
    name: "Women's Leather Handbag",
    rating: 5,
    price: 120,
    discountPrice: 95,
    discountPercent: 21,
    description:
      "Elegant faux-leather handbag with spacious design — perfect for daily or formal use.",
    isBestseller: true,
    tags: ["Accessories", "Leather"],
    images: [img500,],
    link: "/product/5",
  },
  {
    id: 6,
    name: "Men's Graphic T-shirt",
    rating: 4,
    price: 45,
    discountPrice: 36,
    discountPercent: 20,
    description:
      "Trendy printed t-shirt made with breathable cotton fabric and bold graphics.",
    tags: ["Men", "Casual"],
    images: [img100,],
    link: "/product/6",
  },
  {
    id: 7,
    name: "Men's Graphic T-shirt",
    rating: 4,
    price: 45,
    discountPrice: 36,
    discountPercent: 20,
    description:
      "Trendy printed t-shirt made with breathable cotton fabric and bold graphics.",
    tags: ["Men", "Casual"],
    images: [img200,],
    link: "/product/7",
  },
  {
    id: 8,
    name: "Men's Graphic T-shirt",
    rating: 4,
    price: 45,
    discountPrice: 36,
    discountPercent: 20,
    description:
      "Trendy printed t-shirt made with breathable cotton fabric and bold graphics.",
    tags: ["Men", "Casual"],
    images: [img300,],
    link: "/product/8",
  },
];

export default products;
