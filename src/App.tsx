import { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from './components/Button';
import { useInViewAnimation } from './hooks/useInViewAnimation';

const serif = { fontFamily: "'PP Mondwest', serif" };

const marqueeImages = [
  '/banner-1.jpg',
  '/banner-2.jpeg',
  '/banner-3.jpeg',
  '/banner-4.png',
];

// --- Sections ---

const tickerItems = [
  'WEB3 INFRASTRUCTURE', 'GAMING', 'DEFI', 'NFT ECOSYSTEMS',
  'DIGITAL PROPERTY RIGHTS', 'METAVERSE', 'AI + WEB3',
  'FUND I AUM: $100M', '155+ INVESTMENTS',
];

function TickerBar() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="fixed top-0 left-0 right-0 z-[101] h-9 flex items-center overflow-hidden border-b border-white/[0.06]"
      style={{ background: 'linear-gradient(180deg, #051A24 0%, #0D212C 100%)' }}
    >
      <div className="flex animate-ticker hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-7 whitespace-nowrap text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-white/50 hover:text-white transition-colors">
            <span className="w-[5px] h-[5px] rounded-full bg-[#1a8fc4] shrink-0" style={{ boxShadow: '0 0 6px rgba(26,143,196,0.6)' }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed left-0 right-0 z-[100] transition-all duration-500"
        style={{
          top: scrolled ? 0 : 'calc(2.25rem + 20px)',
          background: scrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(1.5rem)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(5,26,36,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex items-center" style={{ height: scrolled ? '4.5rem' : '7rem', transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
          <a href="https://animoca.ventures/" className="mr-auto">
            <img src="/av-logo2-ai.png" alt="Animoca Ventures" className="transition-all duration-500" style={{ height: scrolled ? '3rem' : '5.25rem' }} />
          </a>
          <nav className="hidden md:flex gap-10 mr-8">
            {['Home', 'Portfolio', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? 'https://animoca.ventures/' : `https://animoca.ventures/${item.toLowerCase().replace(' ', '-')}/`}
                className={`text-[0.8125rem] transition-all uppercase tracking-[0.08em] font-medium relative py-1 after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-[#1a8fc4] after:rounded-sm after:transition-all hover:after:w-full ${scrolled ? 'text-[#051A24]/55 hover:text-[#051A24]' : 'text-white/70 hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex gap-2.5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="https://animoca.ventures/contact/"
              className="inline-flex justify-center items-center h-11 px-6 rounded-[2rem] text-[0.75rem] font-semibold tracking-[0.05em] uppercase text-white bg-[#1a8fc4] hover:bg-[#1578a8] transition-colors"
            >
              Submit Deck
            </a>
          </div>
          <button
            className="flex md:hidden flex-col gap-1 w-7 p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className={`block h-[2px] rounded-sm w-full ${scrolled ? 'bg-[#1a8fc4]' : 'bg-white'}`} />
            <span className={`block h-[2px] rounded-sm w-[60%] ml-auto ${scrolled ? 'bg-[#1a8fc4]' : 'bg-white'}`} />
            <span className={`block h-[2px] rounded-sm w-full ${scrolled ? 'bg-[#1a8fc4]' : 'bg-white'}`} />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col p-5">
          <div className="flex justify-between items-center mb-12">
            <a href="https://animoca.ventures/">
              <img src="/av-logo2-ai.png" alt="Animoca Ventures" className="h-6" />
            </a>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 text-[#051A24]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#051A24]"><path d="M6.881 5.82l5.126 5.126 5.126-5.126a.75.75 0 0 1 1.061 1.061l-5.126 5.127 5.126 5.126a.75.75 0 0 1-1.061 1.061l-5.127-5.126-5.127 5.126a.75.75 0 0 1-1.061-1.061l5.126-5.126L5.82 6.88A.75.75 0 0 1 6.881 5.82z"/></svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {['Home', 'Portfolio', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Home' ? 'https://animoca.ventures/' : `https://animoca.ventures/${item.toLowerCase()}/`}
                className="text-xl text-[#051A24]"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <a href="https://animoca.ventures/contact/" className="inline-flex justify-center items-center h-11 px-6 rounded-[2rem] text-sm font-semibold text-white bg-[#1a8fc4]">
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-40 md:pt-0 pb-12 md:pb-20">
      {/* Video background */}
      <video
        src="https://stream.mux.com/3gErUdcrPfibrZ00ysHSLAupEL01PeX4PpAwgcGpGvbAM.m3u8"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle orbs */}
      <div className="absolute top-32 right-[calc(50%-28rem)] w-[40rem] h-[40rem] bg-[#1a8fc4]/[0.08] rounded-full blur-[8rem] pointer-events-none" />
      <div className="absolute top-56 left-[calc(50%-50rem)] w-[35rem] h-[35rem] bg-[#1a8fc4]/[0.08] rounded-full blur-[8rem] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 w-full relative z-10">
        <div className="max-w-[50rem] mx-auto text-center translate-y-[70px]">
          <div className="text-xl font-semibold text-[#4db8e0] mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0s' }}>
            The Web3 Builders' VC
          </div>
          <h1
            className="text-[2.5rem] md:text-[4.5rem] lg:text-[6rem] font-extrabold leading-none tracking-[-0.04em] mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="text-white">
              WE ARE THE WEB3 BUILDERS' VC.
            </span>
          </h1>
          <p className="max-w-[34rem] mx-auto text-[1.0625rem] text-[#E0EBF0] leading-[1.7] mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            We are the venture investment arm of Animoca Brands. We live on the cutting edge of Web3, and find, fund and support builders that will be the giants of tomorrow's Internet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <a
              href="https://animoca.ventures/contact/"
              className="inline-flex justify-center items-center h-11 px-6 rounded-xl text-sm font-medium text-white bg-[#1a8fc4] hover:bg-[#1578a8] transition-colors"
            >
              Reach Out to Us
            </a>
            
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const allImages = [...marqueeImages, ...marqueeImages];
  return (
    <section className="-mt-[50px] relative z-10 mb-8 md:mb-12 overflow-hidden">
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {allImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

// --- Animated Counter Hook ---
function useCounter(target: number, duration = 2000, trigger = false) {
  const [value, setValue] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    if (!trigger || counted.current) return;
    counted.current = true;
    const start = performance.now();
    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [trigger, target, duration]);

  return value;
}

// --- Stats Section ---
function StatsSection() {
  const { ref, isInView } = useInViewAnimation();
  const fund = useCounter(100, 2000, isInView);
  const investments = useCounter(155, 2000, isInView);
  const countries = useCounter(26, 2000, isInView);

  return (
    <section className="py-12 md:py-16 px-6" ref={ref} id="stats">
      <div className="max-w-[1200px] mx-auto">
        {isInView && (
          <>
            <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="inline-flex items-center h-8 px-3.5 rounded-lg bg-[#1a8fc4]/[0.08] border border-[#1a8fc4]/[0.12] text-sm font-medium text-[#1a8fc4]">
                By the Numbers
              </span>
              <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tight text-[#051A24] mt-4 leading-tight">
                <span className="text-[#1a8fc4]">Animoca Ventures</span> In <span style={serif}>Numbers</span>
              </h2>
              <p className="text-[#273C46]/70 text-[17px] max-w-xl mx-auto mt-4 leading-relaxed">
                We invest in Web3 companies typically from the early stage, and continue to support them through their stages of growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Large cards */}
              <div
                className="flex-1 basis-full md:basis-[calc(50%-0.5rem)] min-h-[19rem] p-8 md:p-9 flex flex-col rounded-[1.25rem] border border-[#1a8fc4]/[0.1] bg-white/60 backdrop-blur-xl animate-fade-in-up group relative overflow-hidden"
                style={{ animationDelay: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 40px rgba(26,143,196,0.04) inset' }}
              >
                <div className="shimmer-overlay" />
                {/* Animated SVG - Stacked layers */}
                <svg className="absolute top-4 right-4 w-20 h-20 animate-float-slow opacity-[0.12]" viewBox="0 0 80 80" fill="none">
                  <path d="M40 10L10 25l30 15 30-15L40 10z" stroke="#1a8fc4" strokeWidth="1.5" className="animate-dash" />
                  <path d="M10 35l30 15 30-15" stroke="#1a8fc4" strokeWidth="1.5" opacity="0.6" />
                  <path d="M10 45l30 15 30-15" stroke="#1a8fc4" strokeWidth="1.5" opacity="0.3" />
                </svg>
                {/* Glow orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#1a8fc4]/[0.06] blur-2xl animate-pulse-soft" />
                <div className="text-[4rem] font-extrabold tracking-tight leading-none text-[#051A24] mb-auto">
                  ${fund}M
                </div>
                <div className="text-lg font-semibold tracking-tight text-[#051A24] mt-3">Fund I AUM</div>
                <div className="text-base text-[#273C46]/60 leading-relaxed mt-2.5 max-w-[22rem]">
                  A dedicated fund focused on backing the next generation of Web3 infrastructure and applications.
                </div>
              </div>

              <div
                className="flex-1 basis-full md:basis-[calc(50%-0.5rem)] min-h-[19rem] p-8 md:p-9 flex flex-col rounded-[1.25rem] border border-[#1a8fc4]/[0.1] bg-white/60 backdrop-blur-xl animate-fade-in-up group relative overflow-hidden"
                style={{ animationDelay: '0.3s', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 40px rgba(26,143,196,0.04) inset' }}
              >
                <div className="shimmer-overlay" />
                {/* Animated SVG - Network nodes */}
                <svg className="absolute top-4 right-4 w-20 h-20 animate-float-medium opacity-[0.12]" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="20" r="4" fill="#1a8fc4" className="animate-pulse-soft" />
                  <circle cx="20" cy="50" r="3" fill="#1a8fc4" className="animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
                  <circle cx="60" cy="50" r="3" fill="#1a8fc4" className="animate-pulse-soft" style={{ animationDelay: '1s' }} />
                  <circle cx="40" cy="65" r="2.5" fill="#1a8fc4" className="animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
                  <line x1="40" y1="20" x2="20" y2="50" stroke="#1a8fc4" strokeWidth="1" className="animate-dash" />
                  <line x1="40" y1="20" x2="60" y2="50" stroke="#1a8fc4" strokeWidth="1" className="animate-dash" />
                  <line x1="20" y1="50" x2="60" y2="50" stroke="#1a8fc4" strokeWidth="1" />
                  <line x1="40" y1="65" x2="20" y2="50" stroke="#1a8fc4" strokeWidth="1" />
                  <line x1="40" y1="65" x2="60" y2="50" stroke="#1a8fc4" strokeWidth="1" />
                </svg>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#1a8fc4]/[0.06] blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="text-[4rem] font-extrabold tracking-tight leading-none text-[#051A24] mb-auto">
                  {investments}+
                </div>
                <div className="text-lg font-semibold tracking-tight text-[#051A24] mt-3">Number of Investments</div>
                <div className="text-base text-[#273C46]/60 leading-relaxed mt-2.5 max-w-[22rem]">
                  A diverse and growing portfolio spanning DeFi, gaming, infrastructure, social, and more. As of September 2024.
                </div>
              </div>

              {/* Small cards */}
              <div
                className="flex-1 basis-full sm:basis-[calc(33.333%-0.75rem)] min-h-[14rem] p-8 md:p-9 flex flex-col justify-end rounded-[1.25rem] border border-[#1a8fc4]/[0.1] bg-white/60 backdrop-blur-xl animate-fade-in-up group relative overflow-hidden"
                style={{ animationDelay: '0.4s', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 40px rgba(26,143,196,0.04) inset' }}
              >
                <div className="shimmer-overlay" />
                {/* Animated SVG - Globe */}
                <svg className="absolute top-4 right-4 w-16 h-16 animate-float-slow opacity-[0.12]" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="22" stroke="#1a8fc4" strokeWidth="1.5" />
                  <ellipse cx="32" cy="32" rx="10" ry="22" stroke="#1a8fc4" strokeWidth="1" className="animate-dash" />
                  <line x1="10" y1="32" x2="54" y2="32" stroke="#1a8fc4" strokeWidth="1" />
                  <path d="M14 20h36M14 44h36" stroke="#1a8fc4" strokeWidth="0.8" opacity="0.5" />
                </svg>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#1a8fc4]/[0.05] blur-xl animate-pulse-soft" />
                <div className="text-[3rem] font-extrabold tracking-tight leading-none text-[#051A24]">
                  {countries}
                </div>
                <div className="text-base text-[#273C46]/60 mt-2 leading-snug">Countries Invested In</div>
              </div>

              <div
                className="flex-1 basis-full sm:basis-[calc(33.333%-0.75rem)] min-h-[14rem] p-8 md:p-9 flex flex-col justify-end rounded-[1.25rem] border border-[#1a8fc4]/[0.1] bg-white/60 backdrop-blur-xl animate-fade-in-up group relative overflow-hidden"
                style={{ animationDelay: '0.5s', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 40px rgba(26,143,196,0.04) inset' }}
              >
                <div className="shimmer-overlay" />
                {/* Animated SVG - Chain/blocks */}
                <svg className="absolute top-4 right-4 w-16 h-16 animate-float-medium opacity-[0.12]" viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="24" width="16" height="16" rx="3" stroke="#1a8fc4" strokeWidth="1.5" className="animate-pulse-soft" />
                  <rect x="40" y="24" width="16" height="16" rx="3" stroke="#1a8fc4" strokeWidth="1.5" className="animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
                  <line x1="24" y1="32" x2="40" y2="32" stroke="#1a8fc4" strokeWidth="1.5" className="animate-dash" />
                  <rect x="24" y="8" width="16" height="16" rx="3" stroke="#1a8fc4" strokeWidth="1" opacity="0.5" />
                  <line x1="32" y1="24" x2="32" y2="24" stroke="#1a8fc4" strokeWidth="1" />
                  <rect x="24" y="40" width="16" height="16" rx="3" stroke="#1a8fc4" strokeWidth="1" opacity="0.5" />
                </svg>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#1a8fc4]/[0.05] blur-xl animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
                <div className="text-[3rem] font-extrabold tracking-tight leading-none text-[#051A24]">
                  Web3
                </div>
                <div className="text-base text-[#273C46]/60 mt-2 leading-snug">Focused Exclusively on the Decentralized Internet</div>
              </div>

              <div
                className="flex-1 basis-full sm:basis-[calc(33.333%-0.75rem)] min-h-[14rem] p-8 md:p-9 flex flex-col justify-end rounded-[1.25rem] border border-[#1a8fc4]/[0.1] bg-white/60 backdrop-blur-xl animate-fade-in-up group relative overflow-hidden"
                style={{ animationDelay: '0.6s', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 40px rgba(26,143,196,0.04) inset' }}
              >
                <div className="shimmer-overlay" />
                {/* Animated SVG - Growth arrow */}
                <svg className="absolute top-4 right-4 w-16 h-16 animate-float-slow opacity-[0.12]" viewBox="0 0 64 64" fill="none">
                  <path d="M8 52L24 36L36 44L56 16" stroke="#1a8fc4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-dash" />
                  <path d="M44 16H56V28" stroke="#1a8fc4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="24" cy="36" r="3" fill="#1a8fc4" className="animate-pulse-soft" />
                  <circle cx="36" cy="44" r="3" fill="#1a8fc4" className="animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
                  <circle cx="56" cy="16" r="3" fill="#1a8fc4" className="animate-pulse-soft" style={{ animationDelay: '0.6s' }} />
                </svg>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#1a8fc4]/[0.05] blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                <div className="text-[3rem] font-extrabold tracking-tight leading-none text-[#1a8fc4]">
                  Early
                </div>
                <div className="text-base text-[#273C46]/60 mt-2 leading-snug">Stage Investments with Long-Term Support</div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// --- Global Portfolio Map ---
const cities: [number, number, string, number][] = [
  [22.32, 114.17, 'Hong Kong', 28], [1.35, 103.82, 'Singapore', 18],
  [37.57, 126.98, 'Seoul', 12], [35.68, 139.69, 'Tokyo', 10],
  [40.71, -74.01, 'New York', 14], [37.77, -122.42, 'San Francisco', 11],
  [51.51, -0.13, 'London', 9], [48.86, 2.35, 'Paris', 5],
  [52.52, 13.41, 'Berlin', 4], [-33.87, 151.21, 'Sydney', 3],
  [25.20, 55.27, 'Dubai', 6], [13.76, 100.50, 'Bangkok', 4],
  [14.60, 120.98, 'Manila', 3], [39.90, 116.40, 'Beijing', 5],
  [31.23, 121.47, 'Shanghai', 4], [-23.55, -46.63, 'Sao Paulo', 2],
  [43.65, -79.38, 'Toronto', 3], [55.76, 37.62, 'Moscow', 1],
  [28.61, 77.23, 'New Delhi', 3], [41.90, 12.50, 'Rome', 1],
  [47.37, 8.54, 'Zurich', 2], [34.05, -118.24, 'Los Angeles', 3],
  [25.03, 121.57, 'Taipei', 4], [3.14, 101.69, 'Kuala Lumpur', 2],
  [35.17, 136.91, 'Nagoya', 1], [21.03, 105.85, 'Hanoi', 2],
];

const mapConnections = [
  [0,1],[0,3],[0,5],[0,2],[1,3],[1,7],[4,7],[4,5],[5,4],[7,8],
  [0,10],[1,10],[10,7],[2,3],[0,13],[0,14],[4,16],[11,1],[12,1],
  [0,22],[1,23],[3,24],[11,25]
];

const continents = [
  [[72,-168],[72,-60],[50,-55],[45,-65],[30,-80],[25,-80],[15,-85],[10,-75],[7,-77],[18,-88],[20,-105],[32,-117],[48,-125],[55,-130],[60,-145],[72,-168]],
  [[12,-70],[10,-62],[-5,-35],[-15,-40],[-23,-43],[-35,-57],[-55,-68],[-55,-75],[-40,-73],[-18,-70],[-5,-80],[5,-77],[12,-70]],
  [[70,30],[72,40],[60,30],[55,28],[50,40],[45,30],[40,28],[35,25],[37,15],[43,5],[44,-8],[48,-5],[50,2],[53,5],[55,12],[57,10],[65,14],[70,30]],
  [[37,10],[32,32],[30,33],[22,36],[12,44],[0,42],[-10,40],[-25,35],[-35,20],[-35,18],[-20,12],[-5,12],[5,-5],[10,-15],[15,-17],[20,-17],[30,0],[35,-2],[37,10]],
  [[70,30],[70,180],[65,170],[55,163],[50,140],[45,145],[35,140],[30,120],[22,114],[20,110],[10,105],[1,104],[-8,115],[-8,140],[5,120],[20,122],[30,130],[40,130],[50,90],[55,70],[45,50],[40,45],[32,36],[35,45],[50,50],[55,60],[65,60],[70,50],[70,30]],
  [[-12,130],[-15,140],[-20,148],[-28,153],[-35,150],[-38,145],[-35,137],[-32,133],[-25,113],[-20,115],[-13,125],[-12,130]],
];

function GlobalPortfolioSection() {
  const { ref, isInView } = useInViewAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const timeRef = useRef(0);
  const animFrameRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !wrap || !tooltip) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ttName = tooltip.querySelector('.tt-name') as HTMLElement;
    const ttCount = tooltip.querySelector('.tt-count') as HTMLElement;
    const BLUE = { r: 26, g: 143, b: 196 }; // matches #1a8fc4

    let w = 0, h = 0;

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(lat: number, lng: number): [number, number] {
      const x = (lng + 180) / 360 * w;
      const latRad = lat * Math.PI / 180;
      const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      const y = (h / 2) - (w * mercN / (2 * Math.PI)) * 0.72;
      return [x, y];
    }

    function drawArc(x1: number, y1: number, x2: number, y2: number, alpha: number, progress: number) {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.15;
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      const steps = 30;
      const limit = Math.floor(steps * progress);
      for (let i = 1; i <= limit; i++) {
        const t = i / steps;
        const px = (1-t)*(1-t)*x1 + 2*(1-t)*t*mx + t*t*x2;
        const py = (1-t)*(1-t)*y1 + 2*(1-t)*t*my + t*t*y2;
        ctx!.lineTo(px, py);
      }
      ctx!.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha * 0.35})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      if (progress > 0 && progress < 1) {
        const t = progress;
        const dx = (1-t)*(1-t)*x1 + 2*(1-t)*t*mx + t*t*x2;
        const dy = (1-t)*(1-t)*y1 + 2*(1-t)*t*my + t*t*y2;
        ctx!.beginPath();
        ctx!.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha * 0.9})`;
        ctx!.fill();
      }
    }

    function draw() {
      timeRef.current += 0.005;
      const time = timeRef.current;
      ctx!.clearRect(0, 0, w, h);

      // Grid
      ctx!.strokeStyle = 'rgba(13,27,42,0.04)';
      ctx!.lineWidth = 0.5;
      for (let lat = -60; lat <= 80; lat += 20) {
        const [, y] = project(lat, 0);
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(w, y); ctx!.stroke();
      }
      for (let lng = -180; lng <= 180; lng += 30) {
        const [x] = project(0, lng);
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, h); ctx!.stroke();
      }

      // Continents
      ctx!.strokeStyle = 'rgba(26,143,196,0.2)';
      ctx!.fillStyle = 'rgba(26,143,196,0.06)';
      ctx!.lineWidth = 1;
      for (const cont of continents) {
        ctx!.beginPath();
        for (let i = 0; i < cont.length; i++) {
          const [x, y] = project(cont[i][0], cont[i][1]);
          if (i === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.closePath(); ctx!.fill(); ctx!.stroke();
      }

      // Arcs
      for (let i = 0; i < mapConnections.length; i++) {
        const [a, b] = mapConnections[i];
        const [x1, y1] = project(cities[a][0], cities[a][1]);
        const [x2, y2] = project(cities[b][0], cities[b][1]);
        const progress = ((time * 0.8 + i * 0.13) % 1);
        drawArc(x1, y1, x2, y2, 0.6, progress);
      }

      // Cities
      let hoveredCity: { name: string; count: number; cx: number; cy: number } | null = null;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < cities.length; i++) {
        const c = cities[i];
        const [cx, cy] = project(c[0], c[1]);
        const pulse = Math.sin(time * 3 + i * 0.7) * 0.3 + 0.7;
        const size = 2.5 + (c[3] / 28) * 4;
        const dist = Math.hypot(mx - cx, my - cy);
        const isHovered = dist < size + 8;
        if (isHovered) hoveredCity = { name: c[2], count: c[3], cx, cy };

        // Glow
        const glowSize = size * (isHovered ? 5 : 3.5) * pulse;
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
        grad.addColorStop(0, `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${isHovered ? 0.2 : 0.08})`);
        grad.addColorStop(1, 'transparent');
        ctx!.fillStyle = grad;
        ctx!.fillRect(cx - glowSize, cy - glowSize, glowSize * 2, glowSize * 2);

        // Ping
        const pingPhase = (time * 1.5 + i * 0.5) % 1;
        const pingR = size + pingPhase * 15;
        const pingAlpha = (1 - pingPhase) * 0.3;
        ctx!.beginPath();
        ctx!.arc(cx, cy, pingR, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${pingAlpha})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();

        // Core
        ctx!.beginPath();
        ctx!.arc(cx, cy, isHovered ? size * 1.4 : size, 0, Math.PI * 2);
        ctx!.fillStyle = isHovered
          ? 'rgba(26,143,196,1)'
          : `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${0.6 + pulse * 0.4})`;
        ctx!.fill();

        // Center
        ctx!.beginPath();
        ctx!.arc(cx, cy, size * 0.4, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(26,143,196,0.95)';
        ctx!.fill();

        // Label
        ctx!.font = `${isHovered ? 600 : 400} ${isHovered ? '0.6875rem' : '0.5625rem'} 'PP Neue Montreal', -apple-system, sans-serif`;
        ctx!.fillStyle = isHovered ? 'rgba(13,27,42,0.9)' : 'rgba(13,27,42,0.5)';
        ctx!.textAlign = 'left';
        ctx!.textBaseline = 'middle';
        ctx!.fillText(c[2], cx + size + 5, cy);
      }

      // Tooltip
      if (hoveredCity) {
        ttName.textContent = hoveredCity.name;
        ttCount.textContent = hoveredCity.count + ' investments';
        tooltip!.style.opacity = '1';
        const tx = hoveredCity.cx + 16;
        const ty = hoveredCity.cy - 40;
        tooltip!.style.left = Math.min(tx, w - 150) + 'px';
        tooltip!.style.top = Math.max(ty, 8) + 'px';
      } else {
        tooltip!.style.opacity = '0';
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrap!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

    wrap.addEventListener('mousemove', handleMouseMove, { passive: true });
    wrap.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    resize();
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      wrap.removeEventListener('mousemove', handleMouseMove);
      wrap.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [isInView]);

  return (
    <section className="py-12 md:py-16 px-6" ref={ref} id="portfolio">
      <div className="max-w-[1200px] mx-auto">
        {isInView && (
          <>
            <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="inline-flex items-center h-8 px-3.5 rounded-lg bg-[#1a8fc4]/[0.08] border border-[#1a8fc4]/[0.12] text-sm font-medium text-[#1a8fc4]">
                Worldwide Reach
              </span>
              <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tight text-[#051A24] mt-4 leading-tight">
                <span className="text-[#1a8fc4]">Global</span> <span style={serif}>Portfolio</span>
              </h2>
              <p className="text-[#273C46]/70 text-[17px] max-w-xl mx-auto mt-4 leading-relaxed">
                Our investments span every major Web3 ecosystem across the globe, from North America to Asia-Pacific and beyond.
              </p>
            </div>
            <div
              className="rounded-[1.25rem] border border-[#051A24]/[0.06] bg-white/60 backdrop-blur-xl overflow-hidden animate-fade-in-up"
              style={{ animationDelay: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 0 40px rgba(5,26,36,0.03) inset' }}
            >
              <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: '2.8 / 1' }}>
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div
                  ref={tooltipRef}
                  className="absolute pointer-events-none rounded-[0.625rem] px-4 py-2.5 text-xs text-[#051A24] z-10 whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(0.75rem)',
                    border: '1px solid rgba(26,143,196,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    boxShadow: '0 0 1.5rem rgba(26,143,196,0.15)',
                  }}
                >
                  <div className="tt-name font-semibold text-[0.8125rem] mb-0.5" />
                  <div className="tt-count text-[#1a8fc4] text-[0.6875rem]" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function PartnerCtaSection() {
  const { ref, isInView } = useInViewAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number; img: string }[]>([]);
  const trailId = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const img = marqueeImages[trailId.current % marqueeImages.length];
    const id = trailId.current++;
    setTrails(prev => [...prev.slice(-5), { id, x, y, img }]);
    setTimeout(() => setTrails(prev => prev.filter(t => t.id !== id)), 800);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const src = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => { video.play(); });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => { video.play(); });
    }
  }, []);

  return (
    <section className="relative overflow-hidden" ref={ref} id="contact">
      {/* HLS Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 py-12 md:py-16 px-6">
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center -translate-y-[50px]"
          onMouseMove={handleMouseMove}
        >
          {trails.map(t => (
            <img
              key={t.id}
              src={t.img}
              alt=""
              className="absolute w-24 h-24 object-cover rounded-xl pointer-events-none opacity-60"
              style={{
                left: t.x - 48,
                top: t.y - 48,
                animation: 'fadeInUp 0.4s ease-out forwards',
              }}
            />
          ))}
          {isInView && (
            <>
              <h2 className="text-[32px] md:text-[48px] font-medium text-white mb-4 animate-fade-in-up relative z-10" style={{ animationDelay: '0.1s' }}>
                Ready to build the{' '}
                <span style={serif}>next wave</span>?
              </h2>
              <p className="text-[#E0EBF0] text-base md:text-lg mb-8 max-w-lg mx-auto animate-fade-in-up relative z-10" style={{ animationDelay: '0.2s' }}>
                Let's talk about your vision. One partnership at a time — yours could be next.
              </p>
              <div className="animate-fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
                <Button variant="secondary" href="mailto:hello@vvortex.studio">
                  Reach out to us <ArrowUpRight size={14} className="inline ml-1" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { ref, isInView } = useInViewAnimation();
  const [email, setEmail] = useState('');

  return (
    <footer className="py-10 md:py-12 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {isInView && (
          <>
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {/* Brand */}
              <div className="lg:col-span-1">
                <a href="https://animoca.ventures/">
                  <img src="/av-logo2-ai.png" alt="Animoca Ventures" className="h-8 mb-4" />
                </a>
                <p className="text-sm text-[#273C46] leading-relaxed">
                  We are the venture investment arm of Animoca Brands. We find, fund and support Web3 builders that will be the giants of tomorrow's Internet.
                </p>
              </div>

              {/* Company links */}
              <div>
                <h4 className="text-sm font-semibold text-[#051A24] mb-4">Company</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="https://animoca.ventures/" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">Home</a>
                  <a href="https://animoca.ventures/portfolio/" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">Portfolio</a>
                  <a href="https://animoca.ventures/about-us/" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">About Us</a>
                  <a href="https://animoca.ventures/contact/" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">Contact</a>
                </div>
              </div>

              {/* Resources links */}
              <div>
                <h4 className="text-sm font-semibold text-[#051A24] mb-4">Resources</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="#" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">News</a>
                  <a href="#" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">Blog & Articles</a>
                  <a href="#" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">Case Studies</a>
                  <a href="#" className="text-sm text-[#273C46] hover:text-[#051A24] transition-colors">Media Kit</a>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-sm font-semibold text-[#051A24] mb-4">Stay Updated</h4>
                <p className="text-sm text-[#273C46] leading-relaxed mb-4">
                  Get the latest Web3 investment insights and portfolio updates straight to your email.
                </p>
                <div className="flex items-center gap-0 border border-[#E0EBF0] rounded-xl overflow-hidden bg-white">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm text-[#051A24] placeholder-[#273C46]/50 bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Subscribe"
                    className="px-3 py-2.5 text-[#051A24] hover:text-[#0D212C] transition-colors"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-[#E0EBF0] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xs text-[#273C46]">&copy; 2025 Animoca Ventures. All Rights Reserved.</p>
              <div className="flex items-center gap-4 text-xs text-[#273C46]">
                <a href="#" className="hover:text-[#051A24] transition-colors">Terms & Conditions</a>
                <span className="w-px h-3 bg-[#E0EBF0]" />
                <a href="#" className="hover:text-[#051A24] transition-colors">Privacy Policy</a>
              </div>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}

function FixedBottomNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 border border-[#E0EBF0]"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
      >
        <img src="/av-logo2-ai.png" alt="V Vortex" className="h-6 pl-2" />
        <Button variant="primary" href="#contact">
          Reach out to us
        </Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <TickerBar />
      <Header />
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <GlobalPortfolioSection />
      <PartnerCtaSection />
      <Footer />
      <FixedBottomNav />
    </div>
  );
}

export default App;
