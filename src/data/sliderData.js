// src/data/sliderData.js

// Local hero images (placeholders). Replace these with your PNGs or external Pinterest links as needed.
const sliderData = [
  {
    image: '/assets/images/hero05.png',
    caption: "Welcome Back Collection",
    subcaption: "New arrivals — curated for you",
    link: "/products",
    fit: 'contain',
    position: 'center'
  },
  {
    image: '/assets/images/hero06.png',
    caption: "New Arrival",
    subcaption: "Autumn & Winter collection",
    link: "/products",
    fit: 'contain',
    position: 'center'
  },
  {
    image: '/assets/images/hero07.png',
    caption: "Young Day",
    subcaption: "Limited time offers",
    link: "/products",
    fit: 'contain',
    position: 'center'
  }
  ,
  // Mobile-only Pinterest slides (show only on small screens)
  {
    image: "https://in.pinterest.com/pin/23784704277034395/",
    caption: "",
    subcaption: "",
    link: "https://in.pinterest.com/pin/23784704277034395/",
    fit: 'contain',
    position: 'center',
    mobileOnly: true
  },
  {
    image: "https://in.pinterest.com/pin/50384089576000054/",
    caption: "",
    subcaption: "",
    link: "https://in.pinterest.com/pin/50384089576000054/",
    fit: 'contain',
    position: 'center',
    mobileOnly: true
  },
  {
    image: "https://in.pinterest.com/pin/10344274143658909/",
    caption: "",
    subcaption: "",
    link: "https://in.pinterest.com/pin/10344274143658909/",
    fit: 'contain',
    position: 'center',
    mobileOnly: true
  }
];

export default sliderData;
