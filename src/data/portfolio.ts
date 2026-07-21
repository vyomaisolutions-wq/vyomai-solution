export interface Project {
  slug: string;
  category: "ai" | "web" | "marketing";
  categoryLabel: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  client: string;
  timeline: string;
  impact: string;
  colorScheme: "sky" | "cyan" | "purple" | "emerald" | "amber" | "slate";
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const portfolioProjects: Project[] = [
  {
    slug: "autonomous-legal-document-ai-bot",
    category: "ai",
    categoryLabel: "AI & Automation",
    title: "Autonomous Legal Document AI Bot",
    subtitle: "LLM-driven document parser & RAG vector search engine built for international corporate law firms.",
    desc: "AI agent that parses 500+ page contracts, extracts risk clauses, and answers complex legal queries in real-time.",
    image: "/images/gallery_team_meeting.png",
    client: "Global Legal Advisory Firm",
    timeline: "4 Weeks (Sprint)",
    impact: "92% speedup in contract review",
    colorScheme: "sky",
    overview: "Our client, a premier international legal practice, spent hundreds of billable hours manually reviewing multi-hundred page M&A contracts, compliance disclosures, and vendor agreements. They required an enterprise-grade AI solution that could analyze documents instantly without compromising data privacy.",
    challenge: "Traditional OCR and keyword searches failed to understand context, legalese, or cross-referencing clauses across multiple contracts. Furthermore, strict client confidentiality mandated a secure vector architecture with zero public model training.",
    solution: "We engineered a private Retrieval-Augmented Generation (RAG) system powered by OpenAI GPT-4o, LangChain, Pinecone vector stores, and Next.js. The agent chunks documents intelligently, extracts risk parameters, generates structured summaries, and provides pinpoint citations back to exact paragraph lines.",
    techStack: ["OpenAI GPT-4o", "LangChain", "Pinecone Vector DB", "Next.js 14", "TypeScript", "FastAPI"],
    results: [
      "Reduced average contract review time from 6 hours to under 15 minutes",
      "99.2% precision score on clause extraction and anomaly identification",
      "Processed over 12,000 corporate documents within the first 60 days of deployment",
      "100% data privacy compliance with zero external data retention"
    ],
    testimonial: {
      quote: "VyomAi Solutions delivered an AI agent that completely transformed how our associates review contracts. It's fast, incredibly accurate, and easy to use.",
      author: "Vikram Malhotra",
      role: "Managing Partner, Global Legal Advisory"
    }
  },
  {
    slug: "luxury-cosmetics-skincare-branding",
    category: "marketing",
    categoryLabel: "Creative & Marketing",
    title: "Luxury Cosmetics & Skincare Branding",
    subtitle: "Digital growth strategy, luxury package design, and performance social ad campaigns.",
    desc: "Complete visual identity, custom e-commerce web design, and high-ROI ad funnels for a luxury skincare brand.",
    image: "/images/gallery_skincare_bottle.png",
    client: "Aura Beauty Care",
    timeline: "6 Weeks",
    impact: "+320% Revenue growth in 6 months",
    colorScheme: "purple",
    overview: "Aura Beauty Care launched a premium organic skincare line requiring a high-end luxury brand identity, high-converting digital storefront, and targeted customer acquisition strategy across tier-1 global markets.",
    challenge: "Standing out in a hyper-competitive cosmetics market required elevating perceived brand value while maintaining a low customer acquisition cost (CAC) through digital channels.",
    solution: "We crafted an ultra-luxurious visual brand identity, developed a Next.js e-commerce storefront with glassmorphism UI micro-interactions, and deployed hyper-targeted Meta/Google PPC ad campaigns backed by conversion funnel optimization.",
    techStack: ["Next.js 14", "Framer Motion", "Tailwind CSS", "Shopify Buy API", "Google PPC", "Meta Ads"],
    results: [
      "Achieved 3.2x return on ad spend (ROAS) within the first 90 days",
      "+320% year-over-year revenue increase",
      "Boosted e-commerce conversion rate from 1.2% to 4.1%",
      "45,000+ active monthly subscribers"
    ],
    testimonial: {
      quote: "The branding and Next.js web application engineered by VyomAi exceeded all expectations. Our online sales skyrocketed immediately after launch.",
      author: "Sophia Lauren",
      role: "Creative Director, Aura Beauty Care"
    }
  },
  {
    slug: "nail-cosmetics-product-launch",
    category: "marketing",
    categoryLabel: "Creative & Marketing",
    title: "Nail Cosmetics Product Launch",
    subtitle: "Creative product photography, interactive web showcase, and viral social media campaign.",
    desc: "Interactive shade-matching web gallery and automated influencer campaign generating massive pre-orders.",
    image: "/images/gallery_nail_polish.png",
    client: "Velvet Polish Co.",
    timeline: "3 Weeks",
    impact: "15,000+ Pre-orders generated",
    colorScheme: "cyan",
    overview: "Velvet Polish Co. introduced a revolutionary vegan, non-toxic nail lacquer line and needed an interactive product launch campaign to engage Gen-Z and millennial beauty enthusiasts.",
    challenge: "Standard static product pages failed to convey texture, luster, and real-life skin-tone compatibility.",
    solution: "We built an interactive shade-matching WebGL canvas app with React and Framer Motion, paired with an automated influencer outreach bot that distributed early sample kits to 200+ beauty creators.",
    techStack: ["React", "Framer Motion", "Tailwind CSS", "Influencer Automation API", "Instagram Graph API"],
    results: [
      "15,000+ pre-orders placed within 72 hours of launch",
      "2.4M viral views across TikTok and Instagram Reels",
      "88% engagement rate on the interactive shade-picker tool"
    ]
  },
  {
    slug: "sports-equipment-gear-platform",
    category: "web",
    categoryLabel: "Web & Apps",
    title: "Sports Equipment & Gear Platform",
    subtitle: "High-performance React application with custom 3D gear configuration engine.",
    desc: "Blazing fast e-commerce platform with real-time 3D racket customizer and multi-warehouse sync.",
    image: "/images/gallery_tennis_racket.png",
    client: "Apex Athletics",
    timeline: "5 Weeks",
    impact: "2.8x Average order value increase",
    colorScheme: "sky",
    overview: "Apex Athletics manufactures custom professional tennis rackets and athletic equipment. They needed a web platform where athletes could design customized gear specs in real time.",
    challenge: "Legacy e-commerce scripts were slow, lacked mobile responsiveness, and could not handle complex customization attributes like string tension, grip sizing, and weight distribution.",
    solution: "We engineered a Next.js App Router platform featuring a real-time interactive 3D racket configurator, instant pricing updates, Stripe multi-currency checkout, and automated warehouse ERP integration.",
    techStack: ["Next.js App Router", "TypeScript", "Three.js", "Tailwind CSS", "Stripe API", "PostgreSQL"],
    results: [
      "2.8x increase in average order value (AOV)",
      "Sub-second page load times across all mobile and desktop devices",
      "99.9% uptime during peak holiday tournament sales"
    ],
    testimonial: {
      quote: "The custom racket builder built by VyomAi has become our primary competitive advantage. Players love the interactive 3D builder!",
      author: "David Miller",
      role: "Founder, Apex Athletics"
    }
  },
  {
    slug: "sports-apparel-lifestyle-campaign",
    category: "marketing",
    categoryLabel: "Creative & Marketing",
    title: "Sports Apparel & Lifestyle Campaign",
    subtitle: "Dynamic digital ad campaign, athlete sponsorships, and social engagement strategy.",
    desc: "Global lifestyle branding campaign showcasing high-performance activewear across digital media.",
    image: "/images/gallery_yellow_sports.png",
    client: "Pulse Sportswear",
    timeline: "4 Weeks",
    impact: "4.5M Social impressions",
    colorScheme: "amber",
    overview: "Pulse Sportswear needed a high-impact global digital campaign to launch their spring activewear line across North America, Europe, and Asia-Pacific markets.",
    challenge: "Unifying campaign messaging across diverse global regions while driving immediate e-commerce traffic.",
    solution: "We produced dynamic video ad creatives, built programmatic localized landing pages in Next.js, and executed automated retargeting funnels.",
    techStack: ["Next.js", "Framer Motion", "Meta Ads API", "Google Analytics 4", "Klaviyo Automation"],
    results: [
      "4.5 Million aggregate social media impressions",
      "180% surge in online store sessions",
      "3.8x ROI on ad spend"
    ]
  },
  {
    slug: "multi-channel-social-automation-bot",
    category: "web",
    categoryLabel: "AI & Automation",
    title: "Multi-Channel Social Automation Bot",
    subtitle: "Enterprise social media publishing bot with AI caption generation & analytics.",
    desc: "Autonomous content scheduling bot that generates AI captions, schedules posts, and aggregates inbox leads.",
    image: "/images/gallery_social_icons.png",
    client: "OmniGrowth Media",
    timeline: "3 Weeks",
    impact: "10x Publishing efficiency",
    colorScheme: "emerald",
    overview: "OmniGrowth Media manages social presence for over 50 corporate brands. Manual content scheduling and lead responses were overwhelming their operations team.",
    challenge: "Managing separate credentials and publishing flows across LinkedIn, Twitter/X, Instagram, and Facebook led to errors and delayed client reporting.",
    solution: "We built an autonomous social management engine with Next.js, Node.js microservices, OpenAI Vision API for hashtag suggestions, and automated unified lead inboxing.",
    techStack: ["Next.js", "Node.js", "OpenAI Vision API", "PostgreSQL", "Redis Queue", "OAuth 2.0"],
    results: [
      "10x increase in weekly publishing output per team member",
      "75% reduction in lead response latency",
      "Automated monthly performance PDF reports delivered directly to clients"
    ]
  }
];
