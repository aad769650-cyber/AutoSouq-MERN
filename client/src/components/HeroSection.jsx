import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const cars = [
  {
    name: "Lamborghini Huracán",
    category: "Super Sport",
    price: "AED 890,000",
    badge: "NEW ARRIVAL",
    gradient: "from-orange-600 via-red-600 to-yellow-500",
    accent: "#F97316",
    img: "/lambo.jpg",
    specs: ["5.2L V10", "640 HP", "0-100 in 2.9s"],
  },
  {
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury",
    price: "AED 1,400,000",
    badge: "FEATURED",
    gradient: "from-slate-700 via-gray-600 to-slate-500",
    accent: "#94A3B8",
    img: "/rollsRoyce.jpg",
    specs: ["6.75L V12", "563 HP", "0-100 in 4.8s"],
  },
  {
    name: "Mercedes G63 AMG",
    category: "Luxury SUV",
    price: "AED 650,000",
    badge: "HOT DEAL",
    gradient: "from-emerald-700 via-teal-600 to-cyan-500",
    accent: "#10B981",
    img: "/g63.jpg",
    specs: ["4.0L V8", "577 HP", "0-100 in 4.5s"],
  },
];

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function AutoSouqHero() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => switchCar((active + 1) % cars.length), 5000);
    return () => clearInterval(timer);
  }, [active]);

  const switchCar = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 400);
  };

  const handleMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - r.left) / r.width - 0.5) * 20,
      y: ((e.clientY - r.top) / r.height - 0.5) * -20,
    });
  };

  const car = cars[active];

  return (
    <div
      className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden relative font-sans"
      onMouseMove={handleMouse}
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap');

        * { box-sizing: border-box; }

        .fade-in { animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .slide-up { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-18px) rotate(2deg); } }

        .pulse-ring { animation: pulseRing 2.5s ease-out infinite; }
        @keyframes pulseRing { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }

        .shimmer { background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 2.5s infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        .noise::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4; mix-blend-mode: overlay;
        }

        .glow-btn { box-shadow: 0 0 30px rgba(249,115,22,0.4), 0 4px 20px rgba(0,0,0,0.5); transition: all 0.3s ease; }
        .glow-btn:hover { box-shadow: 0 0 50px rgba(249,115,22,0.7), 0 8px 30px rgba(0,0,0,0.6); transform: translateY(-2px); }

        .card-3d { transition: transform 0.1s ease; }

        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }

        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px; background: currentColor; transition: width 0.3s ease; }
        .nav-link:hover::after { width: 100%; }

        .ticker { animation: ticker 20s linear infinite; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .bg-grid {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* Dynamic accent glow behind everything */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${car.accent}18 0%, transparent 70%)`
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
      <div className="noise absolute inset-0 pointer-events-none" />

      {/* ── NAV ── */}
     

      {/* Mobile menu */}
    
      {/* ── HERO MAIN ── */}
      <section className="relative z-10 px-6 md:px-12 pt-8 pb-0 flex flex-col lg:flex-row items-center gap-10 min-h-[80vh]">

        {/* LEFT — Text content */}
        <div className="flex-1 max-w-2xl" key={active + "-text"}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6 slide-up"
            style={{ background: car.accent + "25", color: car.accent, border: `1px solid ${car.accent}50`, animationDelay: "0ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: car.accent }} />
            {car.badge}
          </div>

          {/* Category */}
          <p
            className="text-sm font-semibold tracking-[0.3em] uppercase mb-3 slide-up"
            style={{ color: car.accent + "CC", animationDelay: "80ms" }}
          >
            {car.category}
          </p>

          {/* Car Name */}
          <h1
            className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6 slide-up"
            style={{ animationDelay: "160ms" }}
          >
            {car.name.split(" ").map((word, i) => (
              <span key={i} className={i === car.name.split(" ").length - 1 ? "block" : "block"}>
                {i === car.name.split(" ").length - 1
                  ? <span style={{ WebkitTextStroke: `1px ${car.accent}`, color: "transparent" }}>{word}</span>
                  : word}
              </span>
            ))}
          </h1>

          {/* Price */}
          <div className="flex items-end gap-4 mb-8 slide-up" style={{ animationDelay: "240ms" }}>
            <div>
              <p className="text-xs text-white/40 font-medium tracking-wider uppercase mb-1">Starting from</p>
              <p className="text-4xl font-black" style={{ color: car.accent }}>{car.price}</p>
            </div>
            <div className="glass px-3 py-1.5 rounded-lg mb-1">
              <p className="text-xs text-white/50">EMI from</p>
              <p className="text-sm font-bold text-white">AED 8,200/mo</p>
            </div>
          </div>

          {/* Specs */}
          <div className="flex gap-4 mb-10 slide-up flex-wrap" style={{ animationDelay: "320ms" }}>
            {car.specs.map((s, i) => (
              <div key={i} className="glass rounded-xl px-4 py-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: car.accent }} />
                <span className="text-sm font-semibold text-white/80">{s}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 flex-wrap slide-up" style={{ animationDelay: "400ms" }}>
            <button
              className="glow-btn flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base"
              style={{ background: `linear-gradient(135deg, ${car.accent}, ${car.accent}BB)` }}
            >
             <NavLink to={"/contact-us"}> <span>Book Test Drive</span></NavLink>
              <span className="text-xl">→</span>
            </button>
          
          </div>

          {/* Search bar */}
          <div className="mt-10 glass rounded-2xl p-1 flex items-center gap-2 slide-up max-w-lg" style={{ animationDelay: "480ms" }}>
            <div className="flex-1 flex items-center gap-3 px-4">
              <span className="text-white/40 text-lg">🔍</span>
              <input
                className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none w-full py-2"
                placeholder="Search by make, model, year..."
              />
            </div>
            <button
              className="px-5 py-3 rounded-xl text-sm font-bold text-white shrink-0"
              style={{ background: car.accent }}
            >
              Search
            </button>
          </div>
        </div>

        {/* RIGHT — Car display */}
        <div
          className="flex-1 relative flex items-center justify-center card-3d"
          style={{ transform: `perspective(1000px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)` }}
        >
          {/* Circular glow */}
          <div
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-30 transition-all duration-1000"
            style={{ background: `radial-gradient(circle, ${car.accent}, transparent 70%)` }}
          />

          {/* Rings */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border opacity-10" style={{ borderColor: car.accent }} />
          <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border opacity-20" style={{ borderColor: car.accent }} />

          {/* Car Emoji (big display) */}
          <div
            className={`rounded-full text-[10rem] md:text-[14rem] leading-none select-none float transition-opacity duration-400 ${animating ? "opacity-0" : "opacity-100"}`}
            style={{ filter: `drop-shadow(0 0 60px ${car.accent}80)` }}
          >
            <img src={car.img} alt="Car image" className="rounded w-100 h-100 bg-cover"/>
          </div>

          {/* Floating info cards */}
          <div className="absolute top-6 right-0 glass rounded-2xl p-4 fade-in" style={{ animationDelay: "600ms" }}>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Power</p>
            <p className="text-2xl font-black" style={{ color: car.accent }}>{car.specs[1]}</p>
          </div>

          <div className="absolute bottom-6 left-0 glass rounded-2xl p-4 fade-in" style={{ animationDelay: "700ms" }}>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Acceleration</p>
            <p className="text-lg font-black text-white">{car.specs[2]}</p>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-0 right-0 flex items-center gap-2">
            {cars.map((_, i) => (
              <button
                key={i}
                onClick={() => switchCar(i)}
                className="transition-all duration-300"
                style={{
                  width: i === active ? 32 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? car.accent : "rgba(255,255,255,0.2)"
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="relative z-10 px-6 md:px-12 py-10">
        <div className="glass rounded-3xl px-8 py-6 flex flex-wrap gap-6 justify-around">
          {[
            { label: "Cars Listed", value: 12000, suffix: "+" },
            { label: "Happy Buyers", value: 47000, suffix: "+" },
            { label: "Brands", value: 80, suffix: "+" },
            { label: "Cities", value: 7, suffix: "" },
          ].map(({ label, value, suffix }) => (
            <div key={label} className="text-center">
              <p className="text-3xl md:text-4xl font-black" style={{ color: car.accent }}>
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-sm text-white/50 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BRAND TICKER ── */}
      <div className="relative z-10 overflow-hidden py-4 border-y border-white/5">
        <div className="ticker flex gap-12 whitespace-nowrap w-max">
          {["BMW", "Mercedes-Benz", "Ferrari", "Lamborghini", "Porsche", "Aston Martin", "Bentley", "Rolls-Royce", "McLaren", "Audi", "Maserati", "Bugatti",
            "BMW", "Mercedes-Benz", "Ferrari", "Lamborghini", "Porsche", "Aston Martin", "Bentley", "Rolls-Royce", "McLaren", "Audi", "Maserati", "Bugatti"].map((brand, i) => (
            <span key={i} className="text-sm font-semibold text-white/20 hover:text-white/60 transition-colors cursor-pointer tracking-wider uppercase">{brand}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED CARDS ── */}
     
    
    
    
    </div>
  );
}