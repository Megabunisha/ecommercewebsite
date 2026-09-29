export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'audio', name: 'Premium Audio', icon: 'Headphones' },
  { id: 'wearables', name: 'Smart Wearables', icon: 'Watch' },
  { id: 'computing', name: 'Computing & Gear', icon: 'Laptop' },
  { id: 'smarthome', name: 'Smart Home', icon: 'Home' },
  { id: 'accessories', name: 'Accessories', icon: 'Zap' },
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'AeroPulse Pro ANC Wireless Headphones',
    category: 'audio',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 428,
    stock: 18,
    badge: 'Bestseller',
    badgeType: 'primary',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: 'Studio-Grade Active Noise Cancellation with Spatial Acoustics',
    description: 'Immerse yourself in pure audiophile acoustic precision. The AeroPulse Pro combines custom titanium dynamic drivers with next-generation adaptive noise cancelling to mute distractions and elevate your listening experience.',
    features: [
      'Up to 45 hours battery life with fast charge (10 mins = 5 hrs)',
      'Custom tuned 40mm titanium diaphragm drivers',
      'Hybrid Active Noise Cancellation with Transparency Mode',
      'Ultra-plush memory foam earcups with sweat-resistant protein leather',
      'Multipoint Bluetooth 5.3 connection for seamless device switching'
    ],
    specs: {
      'Driver Size': '40mm Titanium Dynamic',
      'Battery Life': '45 Hours (ANC ON)',
      'Connectivity': 'Bluetooth 5.3 / 3.5mm Aux / USB-C Lossless',
      'Weight': '245g',
      'Warranty': '2 Years Comprehensive'
    }
  },
  {
    id: 'prod-2',
    name: 'Titan Chrono Ultra Titanium Smartwatch',
    category: 'wearables',
    price: 389,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 312,
    stock: 24,
    badge: 'Popular',
    badgeType: 'emerald',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: 'Aerospace-Grade Titanium with Dual-Frequency Precision GPS',
    description: 'Engineered for athletes and explorers who demand uncompromised durability. Featuring an always-on 1.4-inch Sapphire Crystal AMOLED screen, continuous biometric diagnostics, and 100m water resistance.',
    features: [
      'Grade 5 Titanium bezel with scratch-proof Sapphire crystal glass',
      'Dual-frequency GPS with offline topographical route maps',
      'Advanced ECG, SpO2 blood oxygen, and deep sleep sleep stage monitoring',
      '10 ATM water resistance (100 meters dive proof)',
      'Up to 14 days standard battery life on a single wireless charge'
    ],
    specs: {
      'Display': '1.43" AMOLED 466x466 (1000 nits)',
      'Case Material': 'Grade 5 Titanium & Ceramic',
      'Battery': '500mAh (Up to 14 Days)',
      'Water Rating': '10 ATM (100m)',
      'Compatibility': 'iOS & Android'
    }
  },
  {
    id: 'prod-3',
    name: 'Lumix Ergonomic Mechanical Keyboard',
    category: 'computing',
    price: 179,
    originalPrice: 219,
    rating: 4.9,
    reviewCount: 185,
    stock: 12,
    badge: 'Top Rated',
    badgeType: 'primary',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: 'Gasket-Mounted Acoustic Wonder with Hot-Swappable Switches',
    description: 'Designed for coders, writers, and gamers who crave tactile perfection. The Lumix Pro features gasket-mounted dampening pads, factory lubricated switches, and custom RGB underglow.',
    features: [
      '75% compact layout with CNC machined anodized aluminum knob',
      'Hot-swappable 5-pin PCB compatible with Cherry, Gateron & Kailh',
      'Multi-layer sound absorbing silicone and poron foam',
      'Tri-mode connectivity: 2.4GHz wireless, Bluetooth 5.1, and Type-C',
      'Double-shot PBT keycaps resistant to oil and shining'
    ],
    specs: {
      'Layout': '75% (82 Keys + Media Knob)',
      'Switches': 'Pre-lubed Linear Cream Switches',
      'Battery': '4000mAh Rechargeable',
      'Backlight': 'Per-key South-Facing RGB',
      'Weight': '980g'
    }
  },
  {
    id: 'prod-4',
    name: 'Apex Precision Wireless Studio Mouse',
    category: 'computing',
    price: 99,
    originalPrice: 129,
    rating: 4.7,
    reviewCount: 142,
    stock: 35,
    badge: 'Sale',
    badgeType: 'rose',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: 'Ultralight Ergonomics with 26,000 DPI Optical Sensor',
    description: 'Sculpted for maximum hand support throughout long work days. Features silent magnetic clickers and ultra-smooth PTFE skates that glide effortlessly across any surface.',
    features: [
      'Ergonomic thumb cradle with customizable gesture button',
      'MagSpeed electromagnetic scroll wheel with hyper-fast spin',
      'Zero-delay 2.4GHz connection plus 3-device Bluetooth pairing',
      'Rapid USB-C charging (1 minute gives 3 hours of productivity)'
    ],
    specs: {
      'DPI Range': '200 to 26,000 DPI',
      'Battery Life': 'Up to 70 days per charge',
      'Buttons': '7 Programmable',
      'Weight': '62g'
    }
  },
  {
    id: 'prod-5',
    name: 'Aura Ambient Smart Light Bar System',
    category: 'smarthome',
    price: 139,
    originalPrice: 169,
    rating: 4.8,
    reviewCount: 219,
    stock: 15,
    badge: 'Trending',
    badgeType: 'amber',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: 'Immersive Real-Time Screen Sync & Rhythm Lighting',
    description: 'Transform your desk or entertainment hub with synchronized dynamic color washes. Responds in real-time to your screen gameplay, movies, and music rhythm.',
    features: [
      '16.8 million color gradient palette with dynamic lighting scenes',
      'HDMI 2.1 zero-latency sync box compatible with 4K 120Hz',
      'Voice control with Apple HomeKit, Google Home & Alexa',
      'Custom app control with customizable hue presets'
    ],
    specs: {
      'Color Temperature': '2000K - 6500K RGBIC',
      'Luminance': '1200 Lumens Total',
      'Sync Tech': 'Optical & HDMI 2.1 Passthrough',
      'Power Source': '12V DC Adapter'
    }
  },
  {
    id: 'prod-6',
    name: 'PulseFlow MagSafe 3-in-1 Charging Dock',
    category: 'accessories',
    price: 89,
    originalPrice: 109,
    rating: 4.7,
    reviewCount: 98,
    stock: 40,
    badge: 'Popular',
    badgeType: 'emerald',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: '15W Fast Wireless Power for Phone, Watch, and Earbuds',
    description: 'Declutter your nightstand and workstation with this solid aerospace aluminum stand. Fast charges 3 devices simultaneously while keeping your iPhone in standby mode.',
    features: [
      'Official Qi2 / MagSafe certified 15W magnetic rapid charging',
      'Weighted sandblasted metal base prevents sliding',
      'Floating angle adjustment for hands-free video calls'
    ],
    specs: {
      'Input': 'USB-C 30W PD',
      'Output': '15W Phone + 5W Watch + 5W Buds',
      'Material': 'Anodized Aluminum & Silicone'
    }
  },
  {
    id: 'prod-7',
    name: 'Sonosfera Portable Hi-Res Bluetooth Speaker',
    category: 'audio',
    price: 159,
    originalPrice: 189,
    rating: 4.6,
    reviewCount: 164,
    stock: 22,
    badge: 'Waterproof',
    badgeType: 'primary',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: '360° Omnidirectional Room-Filling Audio with IP67 Weatherproofing',
    description: 'Rugged elegance meets heart-thumping low-end acoustics. Built for pool parties, trail hikes, and cozy apartment listening.',
    features: [
      'Dual passive radiators for deep punchy bass resonance',
      'True wireless stereo link: connect two units together',
      'IP67 waterproof and dustproof submersible design',
      '20-hour non-stop continuous playback'
    ],
    specs: {
      'Output Power': '35W RMS',
      'Frequency Response': '50Hz - 20kHz',
      'Waterproof': 'IP67 Submersible',
      'Battery': '5200mAh Powerbank Output'
    }
  },
  {
    id: 'prod-8',
    name: 'Oasis 4K Ultrawide Curved Productivity Monitor',
    category: 'computing',
    price: 649,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 88,
    stock: 8,
    badge: 'Flagship',
    badgeType: 'primary',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    ],
    tagline: '34-inch 1500R Curved IPS with 99% DCI-P3 Color Accuracy',
    description: 'Expand your creative horizon. Replace messy dual monitor setups with an immersive single curved canvas that charges your laptop over USB-C 90W power delivery.',
    features: [
      'WQHD (3440 x 1440) resolution at buttery 144Hz refresh rate',
      'Built-in KVM switch allows 2 PCs to share 1 keyboard & mouse',
      'USB-C 90W single-cable video, data, and laptop fast charge',
      'HDR 400 certified with factory color calibration sheet'
    ],
    specs: {
      'Panel Size': '34-inch 21:9 Curved 1500R',
      'Resolution': '3440 x 1440 (WQHD)',
      'Refresh Rate': '144Hz (1ms MPRT)',
      'Ports': 'USB-C (90W), 2x HDMI 2.1, DisplayPort 1.4, USB Hub'
    }
  }
];

export const PROMO_CODES = {
  'WELCOME20': { discountPercent: 20, description: '20% off your entire order' },
  'REACTPRO': { discountPercent: 15, description: '15% student special discount' },
  'FREESHIP': { discountPercent: 0, freeShipping: true, description: 'Complimentary Free Express Shipping' }
};
