export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "all" | "signature" | "celebration" | "wedding" | "seasonal";
  image: string;
  rating: number;
  popular: boolean;
  flavors: string[];
  sizes: string[]; // e.g. ["6 inch", "8 inch", "10 inch"]
  priceMultipliers: { [key: string]: number }; // size to price factor
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface Perk {
  id: string;
  title: string;
  description: string;
  iconName: string; // references lucide icon
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "birthday" | "wedding" | "cookies" | "dessert";
  image: string;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  selectedSize: string;
  selectedFlavor: string;
  customMessage: string;
  isEggless: boolean;
}
