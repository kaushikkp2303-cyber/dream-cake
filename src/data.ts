import { Cake, Testimonial, Perk, GalleryItem } from "./types";

export const CAKES: Cake[] = [
  {
    id: "chocolate_truffle",
    name: "Chocolate Truffle Cake",
    description: "Layers of moist, rich chocolate sponge smothered with smooth dark chocolate ganache, topped with handmade chocolate shards and physical gold leaf details.",
    price: 749,
    category: "signature",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    popular: true,
    flavors: ["Classic Dark Ganache", "Belgium Milk Chocolate", "Salted Caramel Infused"],
    sizes: ["1/2 Kg (Serves 4-6)", "1 Kg (Serves 8-12)", "2 Kg (Serves 16-20)"],
    priceMultipliers: {
      "1/2 Kg (Serves 4-6)": 1.0,
      "1 Kg (Serves 8-12)": 1.8,
      "2 Kg (Serves 16-20)": 3.4
    }
  },
  {
    id: "red_velvet",
    name: "Red Velvet Cake",
    description: "Whisper-soft cocoa cake beautifully contrasted with layers of velvety vanilla bean cream cheese frosting and sweet crimson velvet crumbs.",
    price: 849,
    category: "signature",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    popular: true,
    flavors: ["Standard Vanilla Frosting", "Premium Strawberry Frosting", "Lemon Twist Mascarpone"],
    sizes: ["1/2 Kg (Serves 4-6)", "1 Kg (Serves 8-12)", "2 Kg (Serves 16-20)"],
    priceMultipliers: {
      "1/2 Kg (Serves 4-6)": 1.0,
      "1 Kg (Serves 8-12)": 1.8,
      "2 Kg (Serves 16-20)": 3.4
    }
  },
  {
    id: "black_forest",
    name: "Black Forest Cake",
    description: "Traditional German masterpiece baked with premium cherry liqueur, fresh whipped cream, sweet dark cherries, and bittersweet chocolate shavings.",
    price: 649,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    popular: false,
    flavors: ["Kirsch-infused Whipped Cream", "Eggless Dark Cherry Creme", "Double Espress Chocolate Base"],
    sizes: ["1/2 Kg (Serves 4-6)", "1 Kg (Serves 8-12)", "2 Kg (Serves 16-20)"],
    priceMultipliers: {
      "1/2 Kg (Serves 4-6)": 1.0,
      "1 Kg (Serves 8-12)": 1.8,
      "2 Kg (Serves 16-20)": 3.4
    }
  },
  {
    id: "strawberry_delight",
    name: "Strawberry Delight Cake",
    description: "Light-as-air golden sponge filled with hand-picked organic strawberries and sweet sweet mascarpone cream, finished with delicate rose-pink glazing.",
    price: 699,
    category: "seasonal",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bdf7af244?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    popular: true,
    flavors: ["Fresh Strawberry Custard", "White Chocolate Raspberry Cream", "Peach Vanilla Mousse"],
    sizes: ["1/2 Kg (Serves 4-6)", "1 Kg (Serves 8-12)", "2 Kg (Serves 16-20)"],
    priceMultipliers: {
      "1/2 Kg (Serves 4-6)": 1.0,
      "1 Kg (Serves 8-12)": 1.8,
      "2 Kg (Serves 16-20)": 3.4
    }
  },
  {
    id: "wedding_special",
    name: "Wedding Special Cake",
    description: "An outstanding multi-tiered center-piece cake, meticulously wrapped in elegant vanilla bean buttercream and loaded with beautiful edible pearl designs.",
    price: 4999,
    category: "wedding",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    popular: true,
    flavors: ["White Chocolate and Raspberry Lily", "Vanilla Lavender Dream", "Rich Almond Amaretto"],
    sizes: ["3 Kg (30 Servings)", "5 Kg (50 Servings)", "10 Kg (100 Servings)"],
    priceMultipliers: {
      "3 Kg (30 Servings)": 1.0,
      "5 Kg (50 Servings)": 1.6,
      "10 Kg (100 Servings)": 3.0
    }
  },
  {
    id: "rainbow_celebration",
    name: "Rainbow Celebration Cake",
    description: "Six colorful confetti and vanilla layered sponge tiers frosted inside out with fluffy vanilla icing and fun multi-colored edible sprinkles.",
    price: 999,
    category: "celebration",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    popular: false,
    flavors: ["Vanilla Buttercream Frosting", "Sweet Whipped Marshmallow Cream", "Creamy Bubblegum Swirl"],
    sizes: ["1/2 Kg (Serves 4-6)", "1 Kg (Serves 8-12)", "2 Kg (Serves 16-20)"],
    priceMultipliers: {
      "1/2 Kg (Serves 4-6)": 1.0,
      "1 Kg (Serves 8-12)": 1.8,
      "2 Kg (Serves 16-20)": 3.4
    }
  }
];

export const PERKS: Perk[] = [
  {
    id: "fresh_ingredients",
    title: "Fresh Ingredients",
    description: "Crafted daily with premium organic flour, free-range local eggs, and fresh artisanal pasture butter.",
    iconName: "Sparkles"
  },
  {
    id: "custom_designs",
    title: "Custom Designs",
    description: "Meticulously craft your dream concept with our dedicated cake designers for any personal landmark events.",
    iconName: "Palette"
  },
  {
    id: "easy_pickup",
    title: "Secure Packaging & Pick-up",
    description: "Convenient store pick-up with sturdy, transport-safe packaging so your fragile cake stays intact and pristine on your way home.",
    iconName: "Clock"
  },
  {
    id: "affordable_prices",
    title: "Affordable Prices",
    description: "Luxury taste, meticulous detail, and grand presentation without the bloated traditional price tag.",
    iconName: "Coins"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    location: "New York, USA",
    quote: "The Wedding Special Cake exceeded all our expectation! Unbelievably soft layers and the buttercream detailing matched my dress decor beautifully. Simply masterclass.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t2",
    name: "Michael Chen",
    location: "Brooklyn",
    quote: "We ordered the Rainbow Celebration for our daughter 's 7th birthday. It was an absolute smash-hit! Not too sweet, which is rare for rainbow cakes. Gorgeous presentation.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t3",
    name: "Elena Rostova",
    location: "Manhattan",
    quote: "The deep richness of the dark cocoa in their Chocolate Truffle is divine. A pure indulgent treat for anyone who appreciates real Belgian chocolate quality. Fast, premium box packaging too!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Grand Triple-Tier Wedding Floral",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1513137927481-996ff3d2861c?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "g2",
    title: "Chic Pastel Birthday Cupcakes",
    category: "birthday",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "g3",
    title: "Luxury Vanilla Macaron Topped Drip Cake",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "g4",
    title: "Classic White Buttercream & Rose Petals",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "g5",
    title: "Indulgent Chocolate Fudge & Berry Plating",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=500"
  },
  {
    id: "g6",
    title: "Perfect Chocolate Drip Celebration Sponge",
    category: "birthday",
    image: "https://images.unsplash.com/photo-1558961317-19df7ba5226c?auto=format&fit=crop&q=80&w=500"
  }
];
