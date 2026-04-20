import { NavLink } from "react-router-dom";

const features = [
  {
    title: "Verified Listings Only",
    desc: "Every car on AutoSouq is inspected and certified. No fakes, no misleading photos — just honest listings you can trust.",
    tag: "160-point inspection",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L13.5 8H20L14.5 12L16.5 18.5L11 14.5L5.5 18.5L7.5 12L2 8H8.5L11 2Z"
          stroke="#d4af37" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Zero Hidden Fees",
    desc: "Transparent pricing from day one. The price you see is the price you pay — no surprise charges, no middlemen inflating costs.",
    tag: "Price guarantee",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M7.5 11L10 13.5L14.5 9" stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Instant Financing",
    desc: "Get pre-approved in minutes with our partner banks. Flexible installment plans tailored to your budget — apply without leaving the site.",
    tag: "0% down available",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="13" rx="2.5" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M7 5V4M15 5V4" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M3 9H19" stroke="#d4af37" strokeWidth="1.2" />
        <rect x="7" y="12" width="3" height="2.5" rx="0.5" fill="#d4af37" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Buyer Protection",
    desc: "Our escrow system holds your payment until you're fully satisfied. If the car isn't as described, we make it right — guaranteed.",
    tag: "7-day return policy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C11 3 4 6.5 4 12.5C4 16 7 19 11 19C15 19 18 16 18 12.5C18 6.5 11 3 11 3Z"
          stroke="#d4af37" strokeWidth="1.2" />
        <path d="M8.5 12.5L10.5 14.5L13.5 10.5" stroke="#d4af37" strokeWidth="1.3"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI Price Intelligence",
    desc: "Our engine analyses thousands of regional transactions to give you a real-time fair market value — so you never overpay or undersell.",
    tag: "Live market data",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 17L4 14M8 17L8 11M12 17L12 8M16 17L16 5"
          stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="16" cy="5" r="1.5" fill="#d4af37" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Dedicated Car Advisor",
    desc: "Every buyer gets access to a personal car advisor — a real human expert who guides you from first search to final handover.",
    tag: "Arabic & English support",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="8.5" cy="8" r="3.5" stroke="#d4af37" strokeWidth="1.2" />
        <circle cx="15" cy="14" r="3.5" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M11.5 9.5L12.5 11.5" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const stats = [
  { num: "50K+", label: "Verified Listings" },
  { num: "98%", label: "Satisfaction Rate" },
  { num: "12K+", label: "Deals Closed" },
  { num: "6 GCC", label: "Countries Covered" },
];

function FeatureCard({ icon, title, desc, tag }) {
  return (
    <div className="group bg-[#0f0f0f] p-7 transition-colors duration-200 hover:bg-[#131313]">
      <div className="w-12 h-12 rounded-xl border border-zinc-800 flex items-center justify-center mb-4 transition-colors duration-200 group-hover:border-yellow-500">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-[13px] text-zinc-500 leading-relaxed">{desc}</p>
      <span className="inline-block mt-3 text-[11px] text-yellow-400 border border-yellow-900 bg-yellow-950 bg-opacity-40 px-3 py-1 rounded-full tracking-wide">
        {tag}
      </span>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section className="bg-[#0a0a0a] py-20 px-6">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="w-10 h-px bg-yellow-500 opacity-40" />
        <span className="text-[11px] tracking-[0.22em] text-yellow-400 uppercase font-medium">Why AutoSouq</span>
        <div className="w-10 h-px bg-yellow-500 opacity-40" />
      </div>

      {/* Heading */}
      <h2 className="text-center text-4xl font-semibold text-zinc-100 leading-tight tracking-tight mb-3">
        The Smarter Way to{" "}
        <span className="text-yellow-400">Buy &amp; Sell Cars</span>
      </h2>
      <p className="text-center text-[14px] text-zinc-500 max-w-md mx-auto leading-relaxed mb-14">
        AutoSouq is the Gulf's most trusted automotive marketplace — built for buyers who demand quality and sellers who expect results.
      </p>

      {/* Stats Bar */}
      <div className="flex justify-center max-w-2xl mx-auto mb-16 border border-zinc-800 rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 py-5 px-4 text-center ${i < stats.length - 1 ? "border-r border-zinc-800" : ""}`}
          >
            <div className="text-xl font-semibold text-yellow-400 tracking-tight">{s.num}</div>
            <div className="text-[11px] text-zinc-500 mt-1 tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 max-w-5xl mx-auto rounded-2xl overflow-hidden mb-16 border border-zinc-800">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>

      {/* Testimonial */}
      <div className="relative max-w-2xl mx-auto bg-[#0f0f0f] border border-zinc-800 rounded-2xl px-8 py-7 mb-14">
        <span className="absolute top-4 left-7 text-5xl text-yellow-400 opacity-10 font-serif leading-none select-none">"</span>
        <p className="text-[14px] text-zinc-500 italic leading-relaxed pl-2">
          I sold my Land Cruiser in 3 days and bought a verified Range Rover the same week. AutoSouq made the whole process effortless — the inspection report alone saved me from a very expensive mistake.
        </p>
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-zinc-800">
          <div className="w-9 h-9 rounded-full bg-yellow-950 border border-yellow-900 flex items-center justify-center text-yellow-400 text-xs font-semibold">
            KA
          </div>
          <div>
            <div className="text-[13px] text-zinc-300 font-medium">Khalid Al-Rashidi</div>
            <div className="text-[11px] text-zinc-600">Verified AutoSouq Customer · Dubai, UAE</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center flex items-center justify-center gap-3 flex-wrap">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black text-[13px] font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl transition-colors duration-150">
      <NavLink to={"/sell-car"}>Sell Your Car</NavLink>
        </button>

      </div>
    </section>
  );
}