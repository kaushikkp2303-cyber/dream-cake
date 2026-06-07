import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cake as CakeIcon, 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Star, 
  Sparkles, 
  Palette, 
  Coins, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  Menu, 
  CheckCircle, 
  Instagram, 
  Facebook, 
  MessageSquare,
  Gift, 
  Award, 
  Flame,
  BadgeCent
} from "lucide-react";
import { CAKES, PERKS, TESTIMONIALS, GALLERY_ITEMS } from "./data";
import { Cake, CartItem, GalleryItem, Testimonial } from "./types";

export default function App() {
  // Navigation & UI States
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Cart & Order state
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    notes: "",
    address: ""
  });

  // Modal Details
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [customText, setCustomText] = useState("");
  const [isEggless, setIsEggless] = useState(false);

  // Filters
  const [cakeFilter, setCakeFilter] = useState<string>("all");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  // Custom User Reviews Collection
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    location: "",
    quote: "",
    rating: 5
  });
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Gallery Preview Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Simulated Loader Duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sticky Header Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize modal state on selection
  const handleOpenCustomize = (cake: Cake) => {
    setSelectedCake(cake);
    setSelectedSize(cake.sizes[0]);
    setSelectedFlavor(cake.flavors[0]);
    setCustomText("");
    setIsEggless(false);
  };

  // Cart Functions
  const addToCart = () => {
    if (!selectedCake) return;

    const sizeMultiplier = selectedCake.priceMultipliers[selectedSize] || 1.0;
    const itemPrice = selectedCake.price * sizeMultiplier;

    const newItem: CartItem = {
      cake: { ...selectedCake, price: itemPrice }, // update price based on model multiplier
      quantity: 1,
      selectedSize,
      selectedFlavor,
      customMessage: customText,
      isEggless
    };

    // Check if duplicate exists with same configurations
    const existingIndex = cart.findIndex(item => 
      item.cake.id === selectedCake.id && 
      item.selectedSize === selectedSize && 
      item.selectedFlavor === selectedFlavor && 
      item.customMessage === customText && 
      item.isEggless === isEggless
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }

    setSelectedCake(null);
    setCartOpen(true);
  };

  const updateCartItemQty = (index: number, change: number) => {
    const updated = [...cart];
    updated[index].quantity += change;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.cake.price * item.quantity), 0);
  };

  // Submit Final Order Setup
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.email) return;

    const orderId = "DC-" + Math.floor(100000 + Math.random() * 900000);
    setPlacedOrderId(orderId);
    setOrderPlaced(true);
    setCart([]);
  };

  // Contact Form Submit Handling
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", phone: "", message: "" });
    }, 500);
  };

  // Add Custom Testimonial
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.quote) return;

    const newTestimonial: Testimonial = {
      id: "ut_" + Date.now(),
      name: reviewForm.name,
      location: reviewForm.location || "Verified Guest",
      quote: reviewForm.quote,
      rating: reviewForm.rating,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setReviewForm({ name: "", location: "", quote: "", rating: 5 });
    setShowReviewModal(false);
  };

  // Gallery Navigation in lightbox
  const filteredGallery = GALLERY_ITEMS.filter(item => 
    galleryFilter === "all" ? true : item.category === galleryFilter
  );

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredGallery.length - 1 : lightboxIndex - 1);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredGallery.length - 1 ? 0 : lightboxIndex + 1);
  };

  // Filter products
  const filteredCakes = CAKES.filter(cake => 
    cakeFilter === "all" ? true : cake.category === cakeFilter
  );

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-brand-brown bg-brand-cream relative selection:bg-brand-pink selection:text-brand-brown">
      
      {/* 11. Custom Entry Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#FFF8F0] flex flex-col justify-center items-center"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 text-brand-pink flex items-center justify-center filter drop-shadow-md"
              >
                <CakeIcon className="w-16 h-16 text-brand-pink fill-brand-pink/30" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif-header text-4xl text-brand-brown tracking-widest mt-4"
              >
                Dream Cakes
              </motion.h1>
              <div className="w-24 h-1 bg-brand-pink/30 rounded-full overflow-hidden mt-3 max-w-xs">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-1/2 h-full bg-brand-brown rounded-full relative"
                />
              </div>
              <p className="text-xs text-brand-brown/70 font-sans tracking-widest mt-2 uppercase">Crafting sweetness...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Cart Trigger Button */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-3 bg-brand-brown hover:bg-brand-brown-light text-white rounded-full shadow-lg transition-all border border-brand-pink"
            title="Back to Top"
            id="back_to_top_button"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}

        <motion.button
          onClick={() => setCartOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-4 bg-brand-pink hover:bg-brand-pink-dark text-brand-brown rounded-full shadow-xl transition-all border-2 border-white flex items-center justify-center cursor-pointer"
          title="Open Cart"
          id="cart_trigger_bubble"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-brand-brown text-brand-cream text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
            >
              {cart.reduce((t, item) => t + item.quantity, 0)}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* 9. Header / Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isSticky ? "bg-[#FFF8F0] shadow-md py-3 border-b border-brand-pink/20" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 cursor-pointer group"
            id="header_logo_group"
          >
            <div className="p-2 bg-white rounded-full shadow-sm border border-brand-pink/30 group-hover:scale-115 transition-transform">
              <CakeIcon className="w-6 h-6 text-brand-pink" />
            </div>
            <div>
              <span className="font-serif-header text-2xl font-bold text-brand-brown tracking-tight">Dream Cakes</span>
              <span className="text-[9px] block tracking-widest text-[#E08594] font-semibold uppercase leading-none">Artisanal Bakery</span>
            </div>
          </div>

          {/* Desktop Navigation Link Tags */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection("hero")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">Home</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">About</button>
            <button onClick={() => scrollToSection("cakes")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">Our Cakes</button>
            <button onClick={() => scrollToSection("perks")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">Why Us</button>
            <button onClick={() => scrollToSection("testimonials")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">Reviews</button>
            <button onClick={() => scrollToSection("gallery")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">Gallery</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-brand-pink-dark hover:underline transition-all cursor-pointer">Contact</button>
          </nav>

          {/* Order Quick Button Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById("cakes");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-light text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-md"
              id="cta_header_order"
            >
              Order Online
            </button>
          </div>

          {/* Mobile responsive Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-brown hover:text-brand-pink transition-colors cursor-pointer"
            id="mobile_menu_button"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-brand-cream border-b border-brand-pink/30 overflow-hidden"
              id="mobile_nav_panel"
            >
              <div className="px-6 py-5 space-y-4 flex flex-col text-left text-sm font-semibold">
                <button onClick={() => scrollToSection("hero")} className="hover:text-brand-pink py-2 text-left border-b border-brand-brown/10">Home</button>
                <button onClick={() => scrollToSection("about")} className="hover:text-brand-pink py-2 text-left border-b border-brand-brown/10">About Us</button>
                <button onClick={() => scrollToSection("cakes")} className="hover:text-brand-pink py-2 text-left border-b border-brand-brown/10">Signature Cakes</button>
                <button onClick={() => scrollToSection("perks")} className="hover:text-brand-pink py-2 text-left border-b border-brand-brown/10">Why Choose Us</button>
                <button onClick={() => scrollToSection("testimonials")} className="hover:text-brand-pink py-2 text-left border-b border-brand-brown/10">Guest Reviews</button>
                <button onClick={() => scrollToSection("gallery")} className="hover:text-brand-pink py-2 text-left border-b border-brand-brown/10">Photo Gallery</button>
                <button onClick={() => scrollToSection("contact")} className="hover:text-brand-pink py-2 text-left">Contact & Location</button>
                <button 
                  onClick={() => scrollToSection("cakes")}
                  className="w-full py-3 bg-brand-pink hover:bg-brand-pink-dark text-center text-brand-brown uppercase tracking-widest text-xs rounded-lg font-bold"
                >
                  Browse Menu
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with elegant overlay gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=1600" 
            alt="Stunning Cake Banner Backdrop" 
            className="w-full h-full object-cover brightness-40 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-brand-brown/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/30 via-transparent to-brand-brown/50" />
        </div>

        {/* Decorative Falling Pastries or Stars Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-45">
          <div className="absolute top-[15%] left-[10%] animate-pulse"><Sparkles className="text-white w-5 h-5" /></div>
          <div className="absolute top-[40%] right-[15%] animate-bounce duration-1000"><Gift className="text-brand-pink w-6 h-6" /></div>
          <div className="absolute bottom-[25%] left-[25%] animate-pulse"><Star className="text-white w-4 h-4" /></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-pink/20 backdrop-blur-md rounded-full border border-brand-pink/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping" />
            <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold">Award-Winning Bakery Store</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif-header text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-tight"
          >
            Dream Cakes
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl font-light text-brand-cream tracking-wide max-w-2xl mx-auto italic"
          >
            "Making Every Celebration Sweeter"
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-3 text-sm text-brand-cream/80 max-w-lg mx-auto"
          >
            Meticulously customized luxury buttercream bakes, wedding showcases, and organic ingredient treats designed to match your landmark moments.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => scrollToSection("cakes")}
              className="w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-brand-pink-dark text-[#6B4226] font-bold uppercase text-xs tracking-widest rounded-full transition-all shadow-lg hover:shadow-brand-pink/20 cursor-pointer transform hover:-translate-y-0.5"
              id="hero_btn_order_now"
            >
              Order Now
            </button>
            <button 
              onClick={() => scrollToSection("gallery")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold uppercase text-xs tracking-widest rounded-full border border-white/50 hover:border-white transition-all cursor-pointer"
              id="hero_btn_view_cakes"
            >
              View Gallery
            </button>
          </motion.div>
        </div>

        {/* Elegant Bottom Scallop / Waves divider helper */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-cream to-transparent pointer-events-none" />
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-24 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Elegant Column 1: Image Showcase Layout overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600" 
                  alt="Pastry Chef Icing an elegant cake" 
                  className="rounded-2xl shadow-xl w-full h-[450px] object-cover ring-8 ring-brand-cream"
                />
                <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-brand-pink p-3 rounded-2xl shadow-xl border-4 border-[#FFF8F0] hidden sm:block">
                  <div className="w-full h-full border border-[#FFF8F0]/40 rounded-lg flex flex-col justify-center items-center text-center">
                    <span className="font-serif-header text-5xl font-black text-brand-brown mb-0.5">10+</span>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-brown/80 leading-3">Years of Sweetness</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Rich text Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-10 h-[2px] bg-brand-pink" />
                <span className="text-xs uppercase tracking-widest text-[#E08594] font-bold">Our Story</span>
              </div>
              <h2 className="font-serif-header text-4xl md:text-5xl tracking-tight leading-tight font-black" id="about_main_heading">
                Lovingly Handcrafted Cakes for Life’s Most Beautiful Chapters
              </h2>
              <p className="text-brand-brown/80 leading-relaxed text-base" id="about_desc_1">
                Welcome to <strong>Dream Cakes</strong>, where fine art meets beautiful flavor. Our dedicated journey started in a cozy farm kitchen with a simple philosophy: use the pure, organic seasonal produce, blend it with meticulous craftsmanship, and pack every design with absolute joy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink-dark">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Bespoke Wedding Masterpieces</h4>
                    <p className="text-xs text-brand-brown/70 mt-1">Multi-tier custom designs adorned with detailed luxury buttercream floral art.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink-dark">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Vibrant Birthday Celebrations</h4>
                    <p className="text-xs text-brand-brown/70 mt-1">Playful, customized cakes that captivate youngsters and adults alike.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink-dark">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Signature Premium Desserts</h4>
                    <p className="text-xs text-brand-brown/70 mt-1">Artisanal macarons, rich Belgian tarts, and gourmet fruit pastries.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink-dark">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Vegan & Allergen Selections</h4>
                    <p className="text-xs text-brand-brown/70 mt-1">Eggless, flourless, and nut-conscious recipe adaptations that never sacrifice flavor.</p>
                  </div>
                </div>
              </div>
              <p className="text-italic text-sm text-brand-pink-dark font-medium border-l-2 border-brand-pink pl-4">
                "Whether you are planning a grand fairytale wedding or an intimate sunday surprise, we ensure every slice is a wonderful celebration of life."
              </p>
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3.5 bg-brand-brown hover:bg-brand-brown-light text-white font-bold uppercase text-xs tracking-widest rounded-full transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5"
                  id="about_btn_consult"
                >
                  Book a Consult
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Featured Cakes Section */}
      <section id="cakes" className="py-24 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/30 rounded-full text-xs font-bold text-brand-pink-dark uppercase tracking-widest">
              Our Oven Specialties
            </div>
            <h2 className="font-serif-header text-4xl md:text-5xl font-black tracking-tight" id="cakes_main_title">
              Our Signature Fresh Cakes
            </h2>
            <p className="text-brand-brown/80 text-sm">
              Each cake is hand-assembled to order by our artisans. Customize your size, select customized flavor frostings, and specify eggless variations instantly.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-6 isolate">
              {[
                { 
                  label: "All Treats", 
                  value: "all", 
                  imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=80&h=80" 
                },
                { 
                  label: "Signatures", 
                  value: "signature", 
                  imageUrl: "https://images.unsplash.com/photo-1586985289688-ca9cf499368a?auto=format&fit=crop&q=80&w=80&h=80" 
                },
                { 
                  label: "Grand Weddings", 
                  value: "wedding", 
                  imageUrl: "https://images.unsplash.com/photo-1513137927481-996ff3d2861c?auto=format&fit=crop&q=80&w=80&h=80" 
                },
                { 
                  label: "Seasonal Specials", 
                  value: "seasonal", 
                  imageUrl: "https://images.unsplash.com/photo-1464305795204-6f5bdf7af244?auto=format&fit=crop&q=80&w=80&h=80" 
                },
                { 
                  label: "Celebrations", 
                  value: "celebration", 
                  imageUrl: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=80&h=80" 
                }
              ].map(tab => {
                const isActive = cakeFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setCakeFilter(tab.value)}
                    className="relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider group"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {/* Sliding active background indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeCakeFilterIndicator"
                        className="absolute inset-0 bg-brand-pink rounded-full shadow-sm -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    
                    {/* Default border indicator for inactive items */}
                    <span className={`absolute inset-0 rounded-full -z-20 transition-all duration-300 ${
                      isActive ? "" : "bg-white hover:bg-brand-pink/10 border border-brand-pink/15"
                    }`} />

                    {/* Category Image Thumbnail */}
                    <motion.div 
                      className="w-6 h-6 rounded-full overflow-hidden border border-brand-pink/40 shadow-xs flex-shrink-0"
                      animate={isActive ? { scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <img 
                        src={tab.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>

                    <span className={`transition-colors duration-200 ${isActive ? "text-brand-brown font-extrabold" : "text-brand-brown/70 group-hover:text-brand-brown"}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredCakes.map((cake) => (
                <motion.div
                  key={cake.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-brand-pink/20 transition-all flex flex-col justify-between group"
                >
                  {/* Image Wrap */}
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={cake.image} 
                      alt={cake.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {cake.popular && (
                      <span className="absolute top-4 left-4 bg-brand-pink text-[#6B4226] text-[10px] uppercase font-black tracking-widest px-3 py-1 bg-opacity-95 rounded-full shadow-sm border border-white/50 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-white/40" /> Best Seller
                      </span>
                    )}
                    <span className="absolute bottom-4 right-4 bg-[#6B4226] text-brand-cream text-sm font-bold px-3 py-1.5 rounded-lg shadow-md border border-[#8B5A2B]/40">
                      From ₹{cake.price}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-serif-header text-xl font-extrabold group-hover:text-brand-pink-dark transition-colors">{cake.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold">{cake.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-brand-brown/70 line-clamp-3">
                        {cake.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-pink/10 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-brand-brown/40 block">Available Sizes</span>
                        <span className="text-xs font-medium text-brand-brown/80">{cake.sizes.length} Options</span>
                      </div>

                      <button
                        onClick={() => handleOpenCustomize(cake)}
                        className="px-4 py-2 bg-brand-cream hover:bg-brand-pink text-brand-brown text-xs font-bold uppercase tracking-wider rounded-lg border border-brand-pink/40 hover:border-brand-pink transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Customize
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCakes.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-brand-pink/30 space-y-4">
              <CakeIcon className="w-12 h-12 text-brand-pink/50 mx-auto" />
              <p className="text-sm font-medium">No signature recipes found in this category.</p>
              <button onClick={() => setCakeFilter("all")} className="px-4 py-1.5 bg-brand-pink text-xs font-black uppercase tracking-wider rounded-full text-brand-brown">View All Cakes</button>
            </div>
          )}

        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="perks" className="py-24 bg-[#FFF8F0] border-t border-b border-brand-pink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs leading-none uppercase font-bold text-brand-pink-dark tracking-widest block">The Dream Cakes Promise</span>
            <h2 className="font-serif-header text-4xl md:text-5xl font-black tracking-tight" id="perks_main_heading">
              Why Celebration Planners Choose Us
            </h2>
            <p className="text-xs text-brand-brown/70 max-w-xl mx-auto">
              We understand that a cake is not merely a recipe – it’s a centerpiece, a focal point, and an absolute memory maker for your loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PERKS.map((perk, index) => {
              // Map icon manually
              let IconComponent = Sparkles;
              if (perk.iconName === "Palette") IconComponent = Palette;
              if (perk.iconName === "Clock") IconComponent = Clock;
              if (perk.iconName === "Coins") IconComponent = Coins;

              return (
                <div 
                  key={perk.id}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-brand-pink/15 flex flex-col items-center text-center space-y-4 group transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="w-16 h-16 bg-brand-pink/20 text-brand-pink-dark rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-header text-lg font-bold">{perk.title}</h3>
                  <p className="text-xs leading-relaxed text-brand-brown/70">
                    {perk.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="testimonials" className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs leading-none uppercase font-bold text-brand-pink-dark tracking-widest block">Guest Love & Stories</span>
              <h2 className="font-serif-header text-4xl md:text-5xl font-black tracking-tight">
                Sweet Words From Sweet Guests
              </h2>
              <p className="text-xs text-brand-brown/70 max-w-lg">
                Nothing keeps our confectionery team motivated like stories of joyful giggles around birthday tables and romantic glances across wedding slices.
              </p>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-3 bg-brand-pink hover:bg-brand-pink-dark text-brand-brown font-extrabold uppercase text-xs tracking-widest rounded-full transition-all cursor-pointer shadow-md flex items-center gap-2"
              id="btn_add_review"
            >
              <MessageSquare className="w-4 h-4" /> Share Your Story
            </button>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div 
                key={test.id}
                className="bg-white p-8 rounded-2xl border border-brand-pink/20 shadow-sm relative flex flex-col justify-between"
              >
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Copy */}
                <p className="text-sm italic leading-relaxed text-brand-brown/80 mb-6 flex-grow">
                  "{test.quote}"
                </p>

                {/* Profile details */}
                <div className="flex items-center gap-3 pt-4 border-t border-brand-pink/10">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-12 h-12 rounded-full object-cover shadow-inner bg-brand-cream border-2 border-brand-pink/30"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-brand-brown">{test.name}</h4>
                    <span className="text-[10px] tracking-wide text-brand-brown/55">{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Gallery Section */}
      <section id="gallery" className="py-24 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs leading-none uppercase font-bold text-brand-pink-dark tracking-widest block">The Bakery Album</span>
            <h2 className="font-serif-header text-4xl md:text-5xl font-black tracking-tight" id="gallery_main_title">
              Our Visual Cake Album
            </h2>
            <p className="text-xs text-brand-brown/70">
              Scroll through snapshots of custom client requests, birthday bakes, intricate cookie layers, and luxury catering platters directly out of our oven.
            </p>

            {/* Gallery Category Filter */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 pt-6">
              {[
                { label: "All Photos", value: "all" },
                { label: "Birthday bakes", value: "birthday" },
                { label: "Wedding tiers", value: "wedding" },
                { label: "Pastry & Cups", value: "dessert" }
              ].map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setGalleryFilter(cat.value)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg border tracking-wider transition-all cursor-pointer ${
                    galleryFilter === cat.value 
                      ? "bg-brand-brown text-white border-brand-brown" 
                      : "bg-white hover:bg-brand-cream text-brand-brown/70 border-brand-pink/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Album Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxIndex(index)}
                className="relative overflow-hidden group rounded-2xl aspect-[4/3] shadow-sm cursor-pointer border-2 border-white"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#FFF8F0]/80">{item.category}</span>
                  <h4 className="font-serif-header text-base text-white font-extrabold mt-1">{item.title}</h4>
                  <span className="text-xs text-brand-pink/90 mt-2 hover:underline flex items-center gap-1">Click to Zoom +</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Interactive Contact Section */}
      <section id="contact" className="py-24 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Column 1: Contact card layout with map details */}
            <div className="lg:col-span-5 bg-[#6B4226] text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden">
              {/* Background circular highlight to pop branding */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-pink/10 rounded-full" />
              
              <div className="space-y-6 relative z-10">
                <span className="text-xs font-black tracking-widest uppercase text-brand-pink block">Get in Touch</span>
                <h3 className="font-serif-header text-3xl md:text-4xl leading-tight">We'd Love to Bake For You</h3>
                <p className="text-xs text-brand-cream/80 max-w-sm leading-relaxed">
                  Have a specific bespoke idea for a grand party, wedding showcase, or restricted dairy recipe? Leave a message or speak directly with our head bakers.
                </p>

                {/* Contact Coordinates */}
                <div className="space-y-4 pt-4 text-xs font-medium text-brand-cream">
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-brand-pink text-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">Phone Booking & consultation</span>
                      <p className="font-bold text-sm text-white">+1 (555) 793-3829</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-brand-pink text-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">Kitchen Inbox Support</span>
                      <p className="font-bold text-sm text-white">hello@dreamcakesbakery.com</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-brand-pink text-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">Our Flagship Store Location</span>
                      <p className="font-bold text-sm text-white">104 Sweetwater Avenue, Suite B, Brooklyn, NY</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-brand-pink text-shrink-0" />
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase tracking-wider">Baking Operations Hours</span>
                      <p className="font-bold text-sm text-white">Tue - Sun: 8:00 AM - 7:00 PM (Closed Mondays)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Maps preview simulation */}
              <div className="mt-8 border border-white/20 rounded-xl overflow-hidden aspect-video bg-white/5 flex flex-col justify-center items-center text-center p-4 relative">
                <MapPin className="w-8 h-8 text-brand-pink animate-bounce" />
                <span className="font-bold text-xs text-white tracking-wider mt-2">Flagship Kitchen - Brooklyn</span>
                <span className="text-[10px] text-brand-cream/70 mt-1">Convenient in-store pick-up from our flagship kitchen</span>
              </div>
            </div>

            {/* Column 2: HTML Forms submit panel */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-brand-pink/20 flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {contactSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-brand-pink/20 text-[#6B4226] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-brand-pink-dark" />
                    </div>
                    <h3 className="font-serif-header text-2xl font-bold text-brand-brown">Message Delivered Safely!</h3>
                    <p className="text-xs text-brand-brown/70 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Dream Cakes. Our wedding concierge or head chef will review your request and get back inside your inbox within 12 business hours.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="px-5 py-2 bg-brand-cream hover:bg-brand-pink text-[#6B4226] text-xs font-black uppercase tracking-wider rounded-lg border border-brand-pink/30"
                    >
                      Send Another Question
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <h4 className="font-serif-header text-2xl font-extrabold text-brand-brown" id="contact_form_title">
                      Send a Baking Inquiry
                    </h4>
                    <p className="text-xs text-brand-brown/70 pb-2 border-b border-brand-pink/10">
                      Standard questions, pricing estimates, customization requests, or dietary consultation inquiries.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-brand-brown/70 block">Your Name <span className="text-brand-pink-dark">*</span></label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="What should we call you?"
                          className="w-full px-4 py-3 bg-brand-cream/40 focus:bg-white text-xs border border-brand-pink/20 focus:border-brand-pink-dark rounded-xl outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-brand-brown/70 block">Email Address <span className="text-brand-pink-dark">*</span></label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="e.g. name@domain.com"
                          className="w-full px-4 py-3 bg-brand-cream/40 focus:bg-white text-xs border border-brand-pink/20 focus:border-brand-pink-dark rounded-xl outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-brand-brown/70 block font-bold">Contact Phone Number</label>
                      <input 
                        type="tel" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="e.g. +1 (123) 456-7890"
                        className="w-full px-4 py-3 bg-brand-cream/40 focus:bg-white text-xs border border-brand-pink/20 font-sans focus:border-brand-pink-dark rounded-xl outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-brand-brown/70 block font-bold">Message Details <span className="text-brand-pink-dark">*</span></label>
                      <textarea 
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Describe your cake concept, preferred size, dietary specs, and targeted event date..."
                        className="w-full px-4 py-3 bg-brand-cream/40 focus:bg-white text-xs border border-brand-pink/20 focus:border-brand-pink-dark rounded-xl outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-brand-pink hover:bg-brand-pink-dark text-brand-brown font-black uppercase text-xs tracking-widest rounded-xl shadow-md transition-all cursor-pointer hover:shadow-brand-pink/30 flex items-center justify-center gap-2"
                      id="contact_form_submit"
                    >
                      <CakeIcon className="w-4 h-4" /> Send Baking Message
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      {/* 9. Footer Section */}
      <footer className="bg-[#6B4226] text-brand-cream font-sans border-t-2 border-brand-pink/20">
        
        {/* Newsletter Signup Banner */}
        <div className="bg-[#4E2E19] py-10 border-b border-brand-pink/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left space-y-1">
              <h4 className="font-serif-header text-xl font-bold text-white tracking-tight">Stay Sweetly Updated</h4>
              <p className="text-xs text-brand-cream/70">Join our newsletter and receive monthly secret dessert recipe emails + 10% off your next booking!</p>
            </div>
            
            <div className="w-full md:w-auto flex-shrink-0">
              {newsletterSubscribed ? (
                <div className="bg-brand-pink/20 border border-brand-pink/30 text-brand-pink px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-bold">
                  <CheckCircle className="w-4 h-4" /> You're on the Sweets list! Code: CHOC10
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubscribed(true);
                  }}
                  className="flex w-full max-w-sm overflow-hidden"
                >
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white/10 placeholder-brand-cream/50 border border-white/20 focus:border-brand-pink outline-none text-xs rounded-l-xl text-white font-sans"
                  />
                  <button 
                    type="submit"
                    className="bg-brand-pink text-brand-brown font-bold text-xs uppercase px-5 py-3 rounded-r-xl cursor-pointer hover:bg-brand-pink-dark transition-colors flex-shrink-0"
                    id="newsletter_submit_button"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Major links columns */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-full">
                <CakeIcon className="w-5 h-5 text-[#6B4226]" />
              </div>
              <span className="font-serif-header text-xl font-black text-white tracking-widest leading-none">Dream Cakes</span>
            </div>
            <p className="text-xs text-brand-cream/75 leading-relaxed">
              Award-winning custom patisserie in Brooklyn, baking memories since 2016. Every celebration deserves a gorgeous, delicious centerpiece slice.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-brand-pink text-brand-cream hover:text-[#6B4226] rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-brand-pink text-brand-cream hover:text-[#6B4226] rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation column links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-black text-brand-pink tracking-widest">Our Store</h4>
            <div className="flex flex-col gap-2.5 text-xs text-brand-cream/75 font-medium">
              <button onClick={() => scrollToSection("hero")} className="text-left hover:text-brand-pink transition-colors">Back to Top</button>
              <button onClick={() => scrollToSection("about")} className="text-left hover:text-brand-pink transition-colors">Our Baking Legacy</button>
              <button onClick={() => scrollToSection("cakes")} className="text-left hover:text-brand-pink transition-colors">Pastry & Cake Menu</button>
              <button onClick={() => scrollToSection("testimonials")} className="text-left hover:text-brand-pink transition-colors">Client Testimonials</button>
              <button onClick={() => scrollToSection("gallery")} className="text-left hover:text-brand-pink transition-colors">Visual Photo Grid</button>
            </div>
          </div>

          {/* Col 3: Support / Services helper */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-black text-brand-pink tracking-widest">Custom Orders</h4>
            <div className="flex flex-col gap-2.5 text-xs text-brand-cream/75 font-medium">
              <button onClick={() => scrollToSection("contact")} className="text-left hover:text-brand-pink transition-colors">Wedding Cake Consultation</button>
              <button onClick={() => scrollToSection("contact")} className="text-left hover:text-brand-pink transition-colors">Corporation Party Catering</button>
              <button onClick={() => scrollToSection("about")} className="text-left hover:text-brand-pink transition-colors">Dietary Recipe Options</button>
              <button onClick={() => {
                setCartOpen(true);
              }} className="text-left hover:text-brand-pink transition-colors">Interactive Order Drawer</button>
            </div>
          </div>

          {/* Col 4: Contact links summary */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-black text-brand-pink tracking-widest">Baking HQ</h4>
            <ul className="space-y-3 text-xs text-brand-cream/75">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-brand-pink text-shrink-0" />
                <span>104 Sweetwater Avenue, Brooklyn, NY</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-brand-pink text-shrink-0" />
                <span>+1 (555) 793-3829</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-brand-pink text-shrink-0" />
                <span>orders@dreamcakesbakery.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Border copy bottom */}
        <div className="border-t border-white/5 py-6">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-cream/55">
            <p>© {new Date().getFullYear()} Dream Cakes Bakery. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Made with love for celebrations</span>
              <span className="w-1 h-1 bg-brand-pink rounded-full" />
              <span>Privacy policy and cookie declarations</span>
            </div>
          </div>
        </div>

      </footer>

      {/* ---------- INTERACTIVE CUSTOMIZATION MODAL DISPLAY ---------- */}
      <AnimatePresence>
        {selectedCake && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop slide */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCake(null)}
              className="absolute inset-0 bg-brand-brown/70 backdrop-blur-sm"
              id="cust_modal_backdrop"
            />
            
            {/* Content card */}
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 grid grid-cols-1 md:grid-cols-12 shadow-2xl border border-brand-pink/20"
              id="cust_modal_panel"
            >
              <button 
                onClick={() => setSelectedCake(null)}
                className="absolute top-4 right-4 p-2 bg-brand-cream hover:bg-brand-pink text-brand-brown rounded-full z-20 cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Col 1: Photo presentation */}
              <div className="md:col-span-5 relative h-56 md:h-full min-h-[250px] bg-brand-cream">
                <img 
                  src={selectedCake.image} 
                  alt={selectedCake.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-brown/85 backdrop-blur-md text-white p-4 rounded-xl border border-white/20">
                  <h4 className="text-white text-xs font-black uppercase tracking-widest text-[#FFB6C1]">Baker's Note</h4>
                  <p className="text-[11px] leading-relaxed text-brand-cream mt-1 italic">
                    "Recommended sizes are calculated for generous wedding or birthday slices."
                  </p>
                </div>
              </div>

              {/* Col 2: Customization Inputs */}
              <div className="md:col-span-7 p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-serif-header text-2xl font-extrabold">{selectedCake.name}</h3>
                  <p className="text-xs text-brand-brown/65 mt-1 leading-relaxed">
                    {selectedCake.description}
                  </p>
                </div>

                {/* Sizes chip grid */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-brown/60 block">1. Select Cake Size (Servings Factor)</label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedCake.sizes.map((size) => {
                      const sizeMultiplier = selectedCake.priceMultipliers[size] || 1.0;
                      const calculatedPrice = (selectedCake.price * sizeMultiplier).toFixed(0);
                      const isSelected = selectedSize === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`w-full p-3 text-left rounded-xl text-xs font-semibold border transition-all flex justify-between items-center cursor-pointer ${
                            isSelected 
                              ? "bg-brand-pink border-brand-pink-dark text-brand-brown" 
                              : "bg-white hover:bg-brand-cream border-brand-pink/20"
                          }`}
                        >
                          <span>{size}</span>
                          <span className={`${isSelected ? "font-bold text-[#6B4226]" : "text-brand-brown/75"}`}>
                            ₹{calculatedPrice}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Flavor frosting selection dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-brand-brown/60 block">2. Preferred Flavor Frosting Layer</label>
                  <select
                    value={selectedFlavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                    className="w-full p-3 bg-brand-cream/55 text-xs font-medium border border-brand-pink/20 outline-none rounded-xl"
                  >
                    {selectedCake.flavors.map((flavor) => (
                      <option key={flavor} value={flavor}>{flavor}</option>
                    ))}
                  </select>
                </div>

                {/* Eggless toggle and Custom message */}
                <div className="grid grid-cols-1 gap-4 pt-1">
                  
                  {/* Eggless select box */}
                  <div className="flex items-center gap-3 p-3 bg-brand-cream/35 border border-brand-pink/15 rounded-xl">
                    <input 
                      type="checkbox" 
                      id="eggless_checkbox"
                      checked={isEggless}
                      onChange={(e) => setIsEggless(e.target.checked)}
                      className="w-4 h-4 accent-brand-pink"
                    />
                    <label htmlFor="eggless_checkbox" className="text-xs font-semibold select-none cursor-pointer flex-grow">
                      Request Eggless Adaptation <span className="text-[10px] text-[#E08594] font-normal italic">(Free of Charge)</span>
                    </label>
                  </div>

                  {/* Message write tag */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-brand-brown/60 block">3. Board Carving Custom Text (Optional)</label>
                    <input 
                      type="text" 
                      maxLength={30}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. 'Happy 30th Birthday Grandma!' (Max 30 chars)"
                      className="w-full px-4 py-3 bg-brand-cream/20 font-sans border border-brand-pink/25 focus:border-brand-pink rounded-xl text-xs outline-none"
                    />
                  </div>

                </div>

                {/* Submit addToCart button */}
                <div className="pt-4 border-t border-brand-pink/10 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase text-brand-brown/40 font-bold block">Estimated Price</span>
                    <span className="font-serif-header text-2xl font-black text-brand-brown">
                      ₹{(selectedCake.price * (selectedCake.priceMultipliers[selectedSize] || 1.0)).toFixed(0)}
                    </span>
                  </div>

                  <button
                    onClick={addToCart}
                    className="px-6 py-4 bg-brand-pink hover:bg-brand-pink-dark text-brand-brown font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Order
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------- INTERACTIVE CART OVERLAY DRAWER ---------- */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setCartOpen(false);
                setCheckoutStep(false);
                setOrderPlaced(false);
              }}
              className="absolute inset-0 bg-brand-brown/65 backdrop-blur-xs"
              id="cart_drawer_backdrop"
            />

            {/* Slider panel content */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#FFF8F0] shadow-2xl flex flex-col justify-between"
                id="cart_drawer_panel"
              >
                
                {/* Header title */}
                <div className="p-6 border-b border-brand-pink/20 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-brand-pink-dark" />
                    <h3 className="font-serif-header text-xl font-extrabold">Your Cookie Cart</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutStep(false);
                      setOrderPlaced(false);
                    }}
                    className="p-1.5 hover:bg-brand-pink/20 text-brand-brown rounded-full cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Center Content Body */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                  
                  {orderPlaced ? (
                    /* SUCCESS SCREEN */
                    <motion.div 
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="text-center py-10 space-y-5"
                    >
                      <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto text-brand-pink-dark">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <div>
                        <h4 className="font-serif-header text-2xl font-bold">Thank You!</h4>
                        <p className="text-xs text-brand-brown/70 mt-1 uppercase tracking-widest font-bold">Your Order Is Slated</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-brand-pink/20 text-left space-y-3 shadow-inner">
                        <div className="flex justify-between items-center text-xs pb-2 border-b border-brand-pink/10">
                          <span className="font-semibold text-brand-brown/50">Receipt Number:</span>
                          <span className="font-bold text-brand-brown">{placedOrderId}</span>
                        </div>
                        <div className="space-y-1.5 text-xs font-sans">
                          <span className="text-[10px] uppercase text-brand-brown/40 font-bold block font-sans">Contact Guest Name</span>
                          <p className="font-bold">{checkoutForm.name}</p>
                          <p className="text-brand-brown/75">{checkoutForm.email}</p>
                          <p className="text-brand-brown/75">{checkoutForm.phone}</p>
                        </div>
                        <div className="space-y-1.5 text-xs pt-1">
                          <span className="text-[10px] uppercase text-brand-brown/40 font-bold block">Preferred Completion Date</span>
                          <p className="font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-pink-dark" /> {checkoutForm.pickupDate}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] leading-relaxed text-brand-brown/65">
                        We have sent a full confirmation copy containing pickup hours and chef details to your email address: <strong className="text-brand-brown">{checkoutForm.email}</strong>. Please check your inbox.
                      </p>

                      <button
                        onClick={() => {
                          setCartOpen(false);
                          setOrderPlaced(false);
                          setCheckoutStep(false);
                        }}
                        className="w-full py-3.5 bg-brand-brown hover:bg-brand-brown-light text-white font-bold uppercase text-xs tracking-widest rounded-xl transition-all"
                      >
                        Back to Bakery Shop
                      </button>
                    </motion.div>
                  ) : checkoutStep ? (
                    /* CHECKOUT DETAILS FORM */
                    <form onSubmit={handlePlaceOrder} className="space-y-5">
                      <div className="flex items-center gap-1 text-xs font-bold text-brand-pink-dark" onClick={() => setCheckoutStep(false)}>
                        <button type="button" className="hover:underline cursor-pointer">← Modify Cart Items</button>
                      </div>

                      <h4 className="font-serif-header text-xl font-bold">Finish Your Booking</h4>
                      <p className="text-xs text-brand-brown/60">Fill in critical details to secure your freshly customized cake slot.</p>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-brand-brown/75 block">Guest Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          placeholder="What is your full name?"
                          className="w-full px-4 py-3 bg-white text-xs border border-brand-pink/20 rounded-xl outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-brand-brown/75 block">Email ID *</label>
                        <input 
                          type="email" 
                          required
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                          placeholder="e.g. yourname@domain.com"
                          className="w-full px-4 py-3 bg-white text-xs border border-brand-pink/20 rounded-xl outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-brand-brown/75 block">Telephone *</label>
                        <input 
                          type="tel" 
                          required
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          placeholder="e.g. +1 (123) 456-7890"
                          className="w-full px-4 py-3 bg-white text-xs border border-brand-pink/20 font-sans rounded-xl outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-brand-brown/75 block">Target Completion/Pickup Date *</label>
                        <input 
                          type="date" 
                          required
                          value={checkoutForm.pickupDate}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, pickupDate: e.target.value })}
                          className="w-full px-4 py-3 bg-white text-xs border border-brand-pink/20 rounded-xl outline-none"
                        />
                      </div>

                      {/* In-Store Pick-up Notice Box */}
                      <div className="p-3 bg-brand-cream/50 rounded-xl border border-brand-pink/20 space-y-1">
                        <span className="text-[10px] uppercase font-extrabold text-[#6B4226] block flex items-center gap-1">
                          🏪 Flagship Store Pick-up Only
                        </span>
                        <p className="text-[10px] text-brand-brown/75 leading-relaxed font-sans">
                          All delicate luxury cakes require direct handover to ensure their structure remains pristine. Please collect your order from our flagship kitchen in Brooklyn.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-brand-brown/75 block font-bold">Baker Notes & Allergies</label>
                        <input 
                          type="text" 
                          value={checkoutForm.notes}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                          placeholder="e.g. 'Nut allergy precaution'"
                          className="w-full px-4 py-3 bg-white text-xs border border-brand-pink/20 rounded-xl outline-none"
                        />
                      </div>

                      <div className="pt-4 border-t border-brand-pink/10">
                        <div className="flex justify-between items-center text-sm font-extrabold pb-4 text-brand-brown">
                          <span>Total Payment Due</span>
                          <span>₹{getCartTotal().toFixed(0)}</span>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 bg-brand-pink hover:bg-brand-pink-dark text-brand-brown font-black uppercase text-xs tracking-widest rounded-xl shadow-md cursor-pointer"
                        >
                          Place Order (₹{getCartTotal().toFixed(0)})
                        </button>
                      </div>

                    </form>
                  ) : (
                    /* STANDARD BASKET LIST */
                    <div className="space-y-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-16 space-y-4">
                          <CakeIcon className="w-12 h-12 text-[#FFB6C1] mx-auto animate-pulse" />
                          <p className="text-xs font-semibold text-brand-brown/60">Your cart is currently empty of freshly baked sweets.</p>
                          <button
                            onClick={() => setCartOpen(false)}
                            className="px-5 py-2.5 bg-brand-pink text-brand-brown text-xs font-black uppercase tracking-widest rounded-full"
                          >
                            Browse Cakes Menu
                          </button>
                        </div>
                      ) : (
                        cart.map((item, idx) => (
                          <div 
                            key={idx}
                            className="bg-white p-4 rounded-xl border border-brand-pink/10 shadow-sm flex gap-3 relative"
                          >
                            <img 
                              src={item.cake.image} 
                              alt={item.cake.name} 
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-grow space-y-1">
                              <h5 className="font-serif-header text-sm font-extrabold leading-tight">{item.cake.name}</h5>
                              <p className="text-[10px] text-brand-brown/70 leading-none">Size: {item.selectedSize}</p>
                              <p className="text-[10px] text-brand-brown/70 leading-none">Flavor: {item.selectedFlavor}</p>
                              {item.customMessage && (
                                <p className="text-[10px] text-brand-pink-dark leading-none">Message: "{item.customMessage}"</p>
                              )}
                              {item.isEggless && (
                                <span className="inline-block px-1.5 py-0.5 bg-green-50 text-[9px] font-bold text-green-700 leading-none border border-green-200 rounded mt-1">Eggless</span>
                              )}

                              {/* Price and controls */}
                              <div className="flex justify-between items-center pt-2">
                                <span className="text-xs font-extrabold text-brand-brown">
                                  ₹{(item.cake.price * item.quantity).toFixed(0)}
                                </span>
                                
                                <div className="flex items-center gap-2 border border-brand-pink/20 rounded-lg p-0.5 bg-brand-cream/35">
                                  <button 
                                    onClick={() => updateCartItemQty(idx, -1)}
                                    className="p-1 hover:bg-brand-pink text-brand-brown rounded"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateCartItemQty(idx, 1)}
                                    className="p-1 hover:bg-brand-pink text-brand-brown rounded"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Delete specific */}
                            <button
                              onClick={() => {
                                const copy = [...cart];
                                copy.splice(idx, 1);
                                setCart(copy);
                              }}
                              className="absolute top-2 right-2 p-1 hover:bg-red-50 text-red-500 rounded-full"
                              title="Remove item"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom Total Block standard basket */}
                {!orderPlaced && !checkoutStep && cart.length > 0 && (
                  <div className="p-6 border-t border-brand-pink/20 bg-white">
                    <div className="flex justify-between items-center text-sm font-extrabold pb-4 text-[#6B4226]">
                      <span>Total Payment Estimate</span>
                      <span>₹{getCartTotal().toFixed(0)}</span>
                    </div>

                    <button
                      onClick={() => setCheckoutStep(true)}
                      className="w-full py-4 bg-[#6B4226] hover:bg-[#8B5A2B] text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      Process Checkout <ChevronRight />
                    </button>
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* ---------- ADD TESTIMONIAL REVIEW MODAL ---------- */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="absolute inset-0 bg-brand-brown/70 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl border border-brand-pink/20"
            >
              <button 
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 p-2 bg-brand-cream hover:bg-brand-pink rounded-full cursor-pointer text-brand-brown"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleAddReview} className="space-y-4">
                <h3 className="font-serif-header text-2xl font-extrabold text-brand-brown">Share Your Sweets Story</h3>
                <p className="text-xs text-brand-brown/65 pb-2 border-b border-brand-pink/10">We love hearing the highlights of our cakes at your landmarks!</p>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-brown/70 block">Your Name <span className="text-brand-pink-dark">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Mrs. Sarah Stone"
                    className="w-full px-4 py-2.5 bg-brand-cream/30 focus:bg-white text-xs border border-brand-pink/20 rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-brown/70 block">Location / City</label>
                  <input 
                    type="text" 
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="e.g. Brooklyn, NY"
                    className="w-full px-4 py-2.5 bg-brand-cream/30 focus:bg-white text-xs border border-brand-pink/20 rounded-xl outline-none"
                  />
                </div>

                {/* Rating selection stars */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-brown/70 block">Star Rating</label>
                  <div className="flex gap-1.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 hover:scale-115 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${reviewForm.rating >= star ? 'fill-current' : 'text-amber-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-brand-brown/70 block">Your Celebration Review (Comment) <span className="text-brand-pink-dark">*</span></label>
                  <textarea 
                    rows={4}
                    required
                    maxLength={200}
                    value={reviewForm.quote}
                    onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                    placeholder="What did your guests think of your cake design, layers flavor, and hand-crafted packaging details?"
                    className="w-full px-4 py-2.5 bg-brand-cream/30 focus:bg-white text-xs border border-brand-pink/20 rounded-xl outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-brown hover:bg-brand-brown-light text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-md transition-colors"
                >
                  Publish Story Card
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------- GALLERY PREVIEW LIGHTBOX ---------- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setLightboxIndex(null)}
            />

            {/* Slider window */}
            <div className="relative z-15 w-full max-w-4xl max-h-[85vh] flex flex-col justify-center items-center">
              
              {/* Image Frame */}
              <motion.img 
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                src={filteredGallery[lightboxIndex].image} 
                alt={filteredGallery[lightboxIndex].title} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg border-2 border-white/20 select-none shadow-2xl"
              />

              {/* Title descriptor overlay text */}
              <div className="text-center text-white mt-4 space-y-1 bg-black/50 p-4 rounded-xl backdrop-blur-md max-w-lg border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-brand-pink font-bold block">{filteredGallery[lightboxIndex].category}</span>
                <h4 className="font-serif-header text-lg font-bold">{filteredGallery[lightboxIndex].title}</h4>
              </div>

              {/* Close Button top corner */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full cursor-pointer"
                title="Exit Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next navigation arrow controllers */}
              {filteredGallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 md:-left-16 p-3 bg-white/10 hover:bg-white/20 hover:scale-110 text-white rounded-full cursor-pointer transition-all"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 md:-right-16 p-3 bg-white/10 hover:bg-white/20 hover:scale-110 text-white rounded-full cursor-pointer transition-all"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Small indicator components
function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>;
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>;
}
