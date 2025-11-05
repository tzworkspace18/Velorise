// src/data/sliderData.js

// ✅ Import your local banner image(s)
import img500 from "../assets/images/500.png";
import img200 from "../assets/images/200.png";
import img100 from "../assets/images/100.png";

const sliderData = [
  {
    image: img500,
    caption: "New Arrivals",
    subcaption: "Shop the latest styles from our new collection",
    link: "/products",
  },
  {
    image:
      img200,
    caption: "Summer Sale",
    subcaption: "Up to 50% off selected items",
    link: "/products",
  },
  {
    image:
        img100,
    caption: "Best Sellers",
    subcaption: "Discover our most-loved fashion picks",
    link: "/products",
  },
];

export default sliderData;
