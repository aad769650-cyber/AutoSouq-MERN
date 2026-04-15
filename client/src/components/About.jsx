import { useState, useEffect, useRef } from "react";

const stats = [
  { value: "12K+", label: "Cars Listed" },
  { value: "8", label: "Years of Trust" },
  { value: "95%", label: "Satisfied Buyers" },
  { value: "50+", label: "Cities Covered" },
];

const team = [
  {
    name: "Khalid Al-Rashid",
    role: "Founder & CEO",
    initials: "KR",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    bio: "15 years in automotive retail. Built AutoSouq to bring transparency to every deal.",
  },
  {
    name: "Sara Mansoor",
    role: "Head of Operations",
    initials: "SM",
    color: "from-slate-600 to-slate-800",
    bg: "bg-slate-50",
    bio: "Former logistics lead at a top regional fleet company. Ensures every listing is verified.",
  },
  {
    name: "Omar Zafar",
    role: "Chief Technology Officer",
    initials: "OZ",
    color: "from-amber-400 to-yellow-600",
    bg: "bg-yellow-50",
    bio: "Built platforms serving millions. Passionate about using tech to simplify car buying.",
  },
  {
    name: "Layla Nour",
    role: "Customer Experience Lead",
    initials: "LN",
    color: "from-slate-500 to-gray-700",
    bg: "bg-gray-50",
    bio: "Dedicated to making every buyer's journey smooth, informed, and stress-free.",
  },
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Verified Listings",
    desc: "Every vehicle on AutoSouq goes through a rigorous inspection process before it ever reaches your screen.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Fair Pricing",
    desc: "Market-referenced valuations ensure buyers never overpay and sellers always get what their car deserves.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "People First",
    desc: "Real experts, real support. Our team guides you through every step from browsing to driving.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Data Driven",
    desc: "Smart tools and real-time market data help you make confident decisions backed by facts, not guesswork.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  const num = parseInt(target.replace(/\D/g, ""));

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(num / 60);
    const id = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [visible, num]);

  return (
    <span ref={ref}>
      {count}{target.includes("+") ? "+" : target.includes("%") ? "%" : ""}
    </span>
  );
}

function StatCard({ value, label, index }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s cubic-bezier(.4,0,.2,1) ${index * 0.12}s`,
      }}
    >
      <div className="text-4xl md:text-5xl font-black text-amber-500 mb-1 tracking-tight">
        <AnimatedCounter target={value} />
      </div>
      <div className="text-sm uppercase tracking-widest text-slate-400 font-medium">{label}</div>
    </div>
  );
}

function ValueCard({ icon, title, desc, index }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.65s cubic-bezier(.4,0,.2,1) ${index * 0.1}s`,
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function TeamCard({ member, index }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.7s cubic-bezier(.4,0,.2,1) ${index * 0.12}s`,
      }}
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md`}>
        {member.initials}
      </div>
      <div className="text-base font-bold text-slate-800">{member.name}</div>
      <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-3">{member.role}</div>
      <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
    </div>
  );
}

export default function AboutUs() {
  const [heroRef, heroVisible] = useInView(0.05);
  const [missionRef, missionVisible] = useInView();

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[90vh] flex items-center noise">
        {/* Decorative amber glow */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-amber-500 opacity-[0.07] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-400 opacity-[0.05] blur-3xl pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <div
            ref={heroRef}
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.9s cubic-bezier(.4,0,.2,1)",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Our Story</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Driving the
              <br />
              <span className="text-amber-400">Future</span> of
              <br />
              Car Buying.
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10">
              AutoSouq was built on a simple belief — buying and selling a car should be
              simple, transparent, and trustworthy. No games. No guesswork.
            </p>

            <a
              href="#values"
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 text-sm uppercase tracking-wider"
            >
              Discover AutoSouq
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Right — hero card */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) rotate(0deg)" : "translateY(30px) rotate(2deg)",
              transition: "all 1s cubic-bezier(.4,0,.2,1) 0.2s",
            }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl translate-x-3 translate-y-3 opacity-20" />
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 space-y-5">
                {/* mini car card mockup */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-display font-bold text-lg">AutoSouq</span>
                  <span className="text-amber-400 text-xs font-semibold bg-amber-400/10 px-3 py-1 rounded-full">Since 2016</span>
                </div>
                {[
                  { label: "2023 Toyota Land Cruiser", price: "AED 289,000", badge: "Verified", color: "text-emerald-400" },
                  { label: "2022 BMW 5 Series 520i", price: "AED 178,500", badge: "New Listing", color: "text-amber-400" },
                  { label: "2021 Mercedes GLE 300d", price: "AED 215,000", badge: "Hot Deal", color: "text-red-400" },
                ].map((car, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-900/60 rounded-xl px-4 py-3 border border-slate-700/50">
                    <div>
                      <div className="text-slate-200 text-sm font-medium">{car.label}</div>
                      <div className="text-amber-400 font-bold text-sm mt-0.5">{car.price}</div>
                    </div>
                    <span className={`text-xs font-semibold ${car.color} border border-current/20 rounded-full px-2.5 py-0.5`}>{car.badge}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex -space-x-2">
                    {["KR","SM","OZ"].map((i,k) => (
                      <div key={k} className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-slate-800 flex items-center justify-center text-white text-[9px] font-bold">{i}</div>
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs">+250 experts nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => <StatCard key={i} {...s} index={i} />)}
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto p-3 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div
            ref={missionRef}
            style={{
              opacity: missionVisible ? 1 : 0,
              transform: missionVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
            }}
          >
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              Transparency at
              <br />every turn.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              We started AutoSouq after experiencing firsthand how exhausting and opaque the used car market could be. Hidden fees, uncertain histories, inflated prices — it didn't have to be this way.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We built a platform where every car comes with a full inspection report, a fair market valuation, and a dedicated specialist ready to answer your questions. Because when you make a big decision, you deserve the full picture.
            </p>
          </div>

          {/* Right — decorative blocks */}
          <div
            style={{
              opacity: missionVisible ? 1 : 0,
              transform: missionVisible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.8s cubic-bezier(.4,0,.2,1) 0.15s",
            }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-2xl p-6 col-span-2 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="">
                  <div className="text-white font-bold text-sm">Nationwide Coverage</div>
                  <div className="text-slate-400 text-sm mt-0.5">Serving buyers & sellers across 50+ cities with local expertise.</div>
                </div>
              </div>
              <div className="bg-amber-500 rounded-2xl p-6">
                <div className="text-3xl font-black text-white mb-1 font-display">100%</div>
                <div className="text-amber-100 text-sm">Inspection Backed</div>
              </div>
              <div className="bg-slate-100 rounded-2xl p-6">
                <div className="text-3xl font-black text-slate-800 mb-1 font-display">24h</div>
                <div className="text-slate-500 text-sm">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section id="values" className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => <ValueCard key={i} {...v} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">The People Behind It</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900">Meet the Team</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto text-base">
              A passionate group of automotive enthusiasts, tech experts, and customer champions united by one goal.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m, i) => <TeamCard key={i} member={m} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-24">
        <div className="absolute inset-0 opacity-[0.04] noise" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-amber-500 blur-3xl opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ready to find your <span className="text-amber-400">perfect car?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Thousands of verified listings. Expert guidance. Your dream car is closer than you think.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 text-sm uppercase tracking-wider">
              Browse Cars
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-amber-400 font-semibold px-8 py-4 rounded-full transition-all duration-200 text-sm uppercase tracking-wider">
              List Your Car
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}