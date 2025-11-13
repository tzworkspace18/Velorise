import img100 from "../assets/images/100.png";
import img200 from "../assets/images/200.png";
import img300 from "../assets/images/300.png";
import img400 from "../assets/images/400.png";
import img500 from "../assets/images/500.png";

const products = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    category: "men",
    color: "blue",
    rating: 4.3,
    price: 50,
    discountPrice: 40,
    discountPercent: 20,
    description:
      "High-quality cotton casual shirt for men. Soft fabric with a clean modern fit — perfect for daily wear.",
    isBestseller: true,
    images: [img100],
    link: "/product/1",
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    category: "women",
    color: "pink",
    rating: 4.8,
    price: 80,
    discountPrice: 65,
    discountPercent: 19,
    description:
      "Elegant lightweight summer dress for women, designed for all-day comfort and graceful style.",
    images: [img200],
    link: "/product/2",
  },
  {
    id: 3,
    name: "Kids Sneakers",
    category: "kids",
    color: "red",
    rating: 3.9,
    price: 60,
    discountPrice: 50,
    discountPercent: 16,
    description:
      "Durable and stylish sneakers for kids — great for school, sports, and playtime.",
    images: [img300],
    link: "/product/3",
  },
  {
    id: 4,
    name: "Men's Slim Fit Jeans",
    category: "men",
    color: "black",
    rating: 4.6,
    price: 90,
    discountPrice: 72,
    discountPercent: 20,
    description:
      "Classic slim-fit jeans crafted from premium stretch denim for maximum comfort and durability.",
    images: [img400],
    link: "/product/4",
  },
  {
    id: 5,
    name: "Women's Leather Handbag",
    category: "women",
    color: "brown",
    rating: 4.9,
    price: 120,
    discountPrice: 95,
    discountPercent: 21,
    description:
      "Elegant faux-leather handbag with spacious design — perfect for daily or formal use.",
    isBestseller: true,
    images: [img500],
    link: "/product/5",
  },
  {
    id: 6,
    name: "Men's Graphic T-shirt",
    category: "men",
    color: "white",
    rating: 4.1,
    price: 45,
    discountPrice: 36,
    discountPercent: 20,
    description:
      "Trendy printed t-shirt made with breathable cotton fabric and bold graphics.",
    images: [img100],
    link: "/product/6",
  },
  {
    id: 7,
    name: "Women's Denim Jacket",
    category: "women",
    color: "blue",
    rating: 4.4,
    price: 95,
    discountPrice: 80,
    discountPercent: 16,
    description:
      "Classic blue denim jacket for women — stylish, versatile, and comfortable for all seasons.",
    images: [img400],
    link: "/product/7",
  },
  {
    id: 8,
    name: "Men's Hooded Sweatshirt",
    category: "men",
    color: "green",
    rating: 4.7,
    price: 70,
    discountPrice: 58,
    discountPercent: 17,
    description:
      "Cozy hooded sweatshirt made from premium fleece fabric, perfect for casual or gym wear.",
    images: [img500],
    link: "/product/8",
  },
  {
    id: 9,
    name: "Kids Printed T-shirt",
    category: "kids",
    color: "yellow",
    rating: 3.8,
    price: 35,
    discountPrice: 28,
    discountPercent: 20,
    description:
      "Soft cotton printed T-shirt for kids with fun and colorful designs for daily wear.",
    images: [img200],
    link: "/product/9",
  },
  {
    id: 10,
    name: "Men's Formal Trousers",
    category: "men",
    color: "gray",
    rating: 4.5,
    price: 85,
    discountPrice: 70,
    discountPercent: 18,
    description:
      "Premium formal trousers for men with modern fit — perfect for office and events.",
    images: [img300],
    link: "/product/10",
  },
];

export default products;
