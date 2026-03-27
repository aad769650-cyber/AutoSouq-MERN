const footerLinks = {
  Browse: [
    { label: "New Cars" },
    { label: "Used Cars" },
    { label: "Electric Vehicles", badge: "NEW" },
    { label: "Luxury & Exotic" },
    { label: "SUVs & 4x4" },
    { label: "Trucks & Vans" },
    { label: "Compare Cars" },
  ],
  Services: [
    { label: "Sell Your Car" },
    { label: "Car Valuation" },
    { label: "Finance & Loans" },
    { label: "Insurance", badge: "HOT" },
    { label: "Inspection" },
    { label: "Car History Report" },
    { label: "Dealer Portal" },
  ],
  Company: [
    { label: "About Us" },
    { label: "Careers" },
    { label: "Press & Media" },
    { label: "Blog & News" },
    { label: "Partner with Us" },
    { label: "Help Center" },
    { label: "Contact" },
  ],
};

const trustBadges = [
  {
    label: "SSL Secured",
    sub: "256-bit encryption",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C9 2 3.5 5 3.5 10C3.5 13.3 6 16 9 16C12 16 14.5 13.3 14.5 10C14.5 5 9 2 9 2Z" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M6.5 10L8.5 12L11.5 8" stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Buyer Protection",
    sub: "Escrow payment system",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="5" width="14" height="10" rx="2" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M6 5V4C6 2.9 6.9 2 8 2H10C11.1 2 12 2.9 12 4V5" stroke="#d4af37" strokeWidth="1.2" />
        <circle cx="9" cy="10" r="1.5" fill="#d4af37" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "24/7 Support",
    sub: "Always here to help",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M9 5V9L11.5 11" stroke="#d4af37" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Top Rated 2024",
    sub: "GCC Automotive Awards",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11 7H16L12 10.5L13.5 16L9 12.5L4.5 16L6 10.5L2 7H7L9 2Z" stroke="#d4af37" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Secure Payments",
    sub: "Visa · Mastercard · Apple Pay",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="#d4af37" strokeWidth="1.2" />
        <path d="M2 7H16" stroke="#d4af37" strokeWidth="1.1" />
        <rect x="4.5" y="10" width="3" height="1.5" rx="0.5" fill="#d4af37" opacity="0.5" />
      </svg>
    ),
  },
];

const gccFlags = [
  { code: "🇦🇪", name: "UAE" },
  { code: "🇸🇦", name: "Saudi Arabia" },
  { code: "🇰🇼", name: "Kuwait" },
  { code: "🇶🇦", name: "Qatar" },
  { code: "🇧🇭", name: "Bahrain" },
  { code: "🇴🇲", name: "Oman" },
];

const socials = [
  {
    name: "Instagram",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="3.5" stroke="#555" strokeWidth="1.2"/><circle cx="8" cy="8" r="2.8" stroke="#555" strokeWidth="1.1"/><circle cx="11.5" cy="4.5" r="0.8" fill="#555"/></svg>,
  },
  {
    name: "X",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 2.5L7 8.5M7 8.5L2.5 13.5H5L8 10M7 8.5L13.5 2.5H11L8 6.5M8 10L13.5 13.5H11L8 10" stroke="#555" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    name: "Facebook",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3H8.5C7.4 3 7 3.6 7 4.5V6H10L9.5 8.5H7V14H4.5V8.5H3V6H4.5V4.5C4.5 2.8 5.6 1.5 7.5 1.5H10V3Z" stroke="#555" strokeWidth="1.1" strokeLinejoin="round"/></svg>,
  },
  {
    name: "YouTube",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="4" width="13" height="9" rx="2.5" stroke="#555" strokeWidth="1.1"/><path d="M6.5 6.5L10.5 8.5L6.5 10.5V6.5Z" stroke="#555" strokeWidth="1" strokeLinejoin="round"/></svg>,
  },
  {
    name: "TikTok",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9 2C9 5 11 6.5 13.5 6.5V9C12 9 10.5 8.5 9 7.5V11.5C9 13.4 7.4 15 5.5 15C3.6 15 2 13.4 2 11.5C2 9.6 3.6 8 5.5 8C5.8 8 6.1 8.05 6.4 8.1V10.5C6.1 10.35 5.8 10.3 5.5 10.3C4.7 10.3 4 11 4 11.5C4 12.3 4.7 13 5.5 13C6.3 13 7 12.3 7 11.5V2H9Z" stroke="#555" strokeWidth="1.1" strokeLinejoin="round"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-zinc-900 font-sans">

      {/* Newsletter Bar */}
      <div className="bg-[#0f0f0f] border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-7 py-8 flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[200px]">
            <p className="text-[15px] font-semibold text-zinc-200 mb-1">Stay ahead of the market</p>
            <p className="text-[12px] text-zinc-600">Get new listings, price drops &amp; expert tips in your inbox.</p>
          </div>
          <div className="flex gap-2 flex-1 min-w-[240px]">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-[#161616] border border-zinc-800 rounded-lg px-4 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-700 outline-none focus:border-yellow-500 transition-colors"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black text-[12px] font-bold px-5 py-2.5 rounded-lg tracking-widest uppercase transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-7 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 13 Q5 7 10 6 Q15 5 17 13" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <circle cx="5.5" cy="14.5" r="2.5" fill="#0a0a0a" />
                <circle cx="14.5" cy="14.5" r="2.5" fill="#0a0a0a" />
              </svg>
            </div>
            <span className="text-[20px] font-bold text-zinc-100 tracking-tight">
              Auto<span className="text-yellow-400">Souq</span>
            </span>
          </div>

          <p className="text-[13px] text-zinc-600 leading-relaxed mb-6 max-w-[260px]">
            The Gulf's most trusted automotive marketplace. Buy, sell and finance cars with complete confidence across 6 GCC countries.
          </p>

          {/* GCC Flags */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-[11px] text-zinc-700 mr-1">Available in</span>
            {gccFlags.map((f) => (
              <span key={f.name} title={f.name} className="text-base leading-none border border-zinc-800 rounded-sm p-0.5">
                {f.code}
              </span>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-2 flex-wrap">
            {socials.map((s) => (
              <button
                key={s.name}
                title={s.name}
                className="w-9 h-9 rounded-lg border border-zinc-800 flex items-center justify-center hover:border-yellow-500 hover:bg-yellow-950 transition-all duration-150"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[11px] font-semibold text-yellow-400 tracking-[0.16em] uppercase mb-5">{heading}</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[13px] text-zinc-600 hover:text-yellow-400 transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-yellow-400 transition-colors flex-shrink-0" />
                    {link.label}
                    {link.badge && (
                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                        link.badge === "NEW"
                          ? "text-yellow-400 border-yellow-900 bg-yellow-950"
                          : "text-red-400 border-red-900 bg-red-950"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="max-w-6xl mx-auto px-7 pb-8 flex flex-wrap gap-3">
        {trustBadges.map((t) => (
          <div key={t.label} className="flex items-center gap-2.5 bg-[#0f0f0f] border border-zinc-900 rounded-xl px-4 py-3">
            <div className="text-yellow-400 flex-shrink-0">{t.icon}</div>
            <div>
              <p className="text-[12px] font-medium text-zinc-500">{t.label}</p>
              <p className="text-[11px] text-zinc-700">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-7">
        <div className="border-t border-zinc-900" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-7 py-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12px] text-zinc-700">
          © 2026 AutoSouq. All rights reserved.{" "}
          <span className="text-zinc-600">Built with care for the GCC.</span>
        </p>
        <div className="flex flex-wrap gap-5">
          {["Privacy Policy", "Terms of Use", "Cookie Settings", "Sitemap"].map((item) => (
            <a key={item} href="#" className="text-[12px] text-zinc-700 hover:text-yellow-400 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}