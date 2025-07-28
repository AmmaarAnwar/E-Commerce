const products = [
  {
    id: 1,
    title:
      "Steam Iron - Professional Grade Steam Iron with Advanced Steam Technology",
    brand: "SteamPro",
    price: 299.99,
    currency: "$",
    discount: 15,
    deliveryCost: "Free",
    deliveryDate: "by Tomorrow",
    seller: "SteamPro Official Store",
    overallRating: 4.2,
    totalReviews: 1247,
    image: "/src/assets/Home/cards/cardpic1.png",
    rating: { rate: 4.2, count: 1247 },
    images: [
      "/src/assets/Home/cards/cardpic1.png",
      "/src/assets/Home/cards/cardpic2.png",
      "/src/assets/Home/cards/cardpic3.png",
      "/src/assets/Home/cards/cardpic4.png",
      "/src/assets/Home/cards/cardpic5.png",
    ],
    features: [
      "Advanced steam technology for superior wrinkle removal",
      "Temperature control with 5 different settings",
      "Steam boost function for stubborn wrinkles",
      "Anti-drip system prevents water leakage",
      "Self-cleaning function for easy maintenance",
      "Ergonomic design for comfortable handling",
      "Auto shut-off feature for safety",
      "Large water tank for extended use",
    ],
    reviews: [
      {
        user: "Sarah Johnson",
        rating: 5,
        title: "Excellent steam iron!",
        date: "December 15, 2024",
        comment:
          "This steam iron is absolutely fantastic! The steam output is powerful and consistent. It removes wrinkles like magic. The temperature control is precise and the auto shut-off feature gives me peace of mind. Highly recommend!",
      },
      {
        user: "Mike Chen",
        rating: 4,
        title: "Great value for money",
        date: "December 10, 2024",
        comment:
          "Very good steam iron for the price. The steam boost function works well on thick fabrics. The only minor issue is that the water tank could be a bit larger, but overall very satisfied with the purchase.",
      },
      {
        user: "Emily Rodriguez",
        rating: 5,
        title: "Perfect for professional use",
        date: "December 8, 2024",
        comment:
          "I use this iron daily for my tailoring business. It's reliable, heats up quickly, and produces excellent steam. The self-cleaning function is a lifesaver. This is my second SteamPro iron and I'm very happy with it.",
      },
      {
        user: "David Thompson",
        rating: 4,
        title: "Good quality iron",
        date: "December 5, 2024",
        comment:
          "Solid steam iron with good features. The anti-drip system works well and the ergonomic handle is comfortable to use. Would definitely recommend to others looking for a reliable iron.",
      },
    ],
  },
  {
    id: 2,
    title: "Premium Wireless Bluetooth Headphones with Noise Cancellation",
    brand: "AudioTech",
    price: 199.99,
    currency: "$",
    discount: 20,
    deliveryCost: "Free",
    deliveryDate: "by Tomorrow",
    seller: "AudioTech Electronics",
    overallRating: 4.5,
    totalReviews: 892,
    image: "/src/assets/Home/cards/cardpic6.png",
    rating: { rate: 4.5, count: 892 },
    images: [
      "/src/assets/Home/cards/cardpic6.png",
      "/src/assets/Home/cards/cardpic7.png",
      "/src/assets/Home/cards/cardpic8.png",
      "/src/assets/Home/cards/cardpic9.png",
      "/src/assets/Home/cards/cardpic10.png",
    ],
    features: [
      "Active noise cancellation technology",
      "40-hour battery life with quick charge",
      "Premium audio drivers for crystal clear sound",
      "Comfortable over-ear design with memory foam",
      "Bluetooth 5.0 with multipoint connection",
      "Built-in microphone for calls",
      "Foldable design for easy storage",
      "Touch controls for easy operation",
    ],
    reviews: [
      {
        user: "Alex Wilson",
        rating: 5,
        title: "Amazing sound quality!",
        date: "December 12, 2024",
        comment:
          "These headphones are incredible! The noise cancellation is top-notch and the sound quality is exceptional. Battery life is impressive and the comfort level is perfect for long listening sessions.",
      },
      {
        user: "Lisa Park",
        rating: 4,
        title: "Great headphones with minor issues",
        date: "December 9, 2024",
        comment:
          "Excellent sound quality and noise cancellation. The battery life is as advertised. The only downside is that the touch controls can be a bit sensitive sometimes, but overall very satisfied.",
      },
    ],
  },
  {
    id: 3,
    title: "Smart Fitness Watch with Heart Rate Monitor",
    brand: "FitTech",
    price: 149.99,
    currency: "$",
    discount: 10,
    deliveryCost: "Free",
    deliveryDate: "by Tomorrow",
    seller: "FitTech Wearables",
    overallRating: 4.3,
    totalReviews: 567,
    image: "/src/assets/Home/cards/cardpic11.png",
    rating: { rate: 4.3, count: 567 },
    images: [
      "/src/assets/Home/cards/cardpic11.png",
      "/src/assets/Home/cards/cardpic12.png",
      "/src/assets/Home/cards/cardpic13.png",
      "/src/assets/Home/cards/cardpic14.png",
      "/src/assets/Home/cards/cardpic15.png",
    ],
    features: [
      "24/7 heart rate monitoring",
      "GPS tracking for outdoor activities",
      "Water resistant up to 50m",
      "7-day battery life",
      "Sleep tracking and analysis",
      "Smart notifications from phone",
      "Multiple sport modes",
      "Compatible with iOS and Android",
    ],
    reviews: [
      {
        user: "James Miller",
        rating: 5,
        title: "Perfect fitness companion",
        date: "December 11, 2024",
        comment:
          "This watch has transformed my fitness routine. The heart rate monitoring is accurate and the GPS tracking works perfectly for my runs. Battery life is excellent and the app is user-friendly.",
      },
      {
        user: "Rachel Green",
        rating: 4,
        title: "Good fitness tracker",
        date: "December 7, 2024",
        comment:
          "Great fitness watch with all the essential features. The heart rate monitor is reliable and the sleep tracking provides useful insights. Would recommend for anyone serious about fitness tracking.",
      },
    ],
  },
];

export const getProductById = (id) => {
  return products.find((product) => product.id === id) || null;
};

export const getAllProducts = () => {
  return products;
};
