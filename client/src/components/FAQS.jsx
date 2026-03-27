import { useState, useMemo } from "react";

const faqs = [
  {
    cat: "Buying",
    q: "How do I know a listing is genuine?",
    a: "Every listing on AutoSouq goes through a 160-point inspection by certified mechanics. You'll see a full inspection report, verified photos, and a history check on every vehicle page.",
  },
  {
    cat: "Buying",
    q: "Can I test drive a car before buying?",
    a: "Yes. Once you find a car you're interested in, you can book a free test drive directly from the listing page. Our advisor will coordinate a time that works for you.",
  },
  {
    cat: "Buying",
    q: "What does the 7-day return policy cover?",
    a: "If the car is materially different from what was described — undisclosed damage, mechanical faults, or incorrect specs — we'll arrange a full refund or replacement within 7 days of delivery.",
  },

  {
    cat: "Selling",
    q: "How long does it take to sell?",
    a: "Most verified listings sell within 7–14 days. Premium and hot-listed cars average 3–5 days. Our AI pricing tool ensures your car is priced competitively from day one.",
  },
  {
    cat: "Selling",
    q: "Are there any fees for selling?",
    a: "Listing is completely free. AutoSouq charges a small success fee only when your car sells — no upfront costs, no hidden charges.",
  },
  {
    cat: "Selling",
    q: "Do I need to bring the car in for inspection?",
    a: "No. Our mobile inspection team comes to your location at a time of your choosing, anywhere in the UAE. For other GCC countries, drop-off centres are available.",
  },
  {
    cat: "Financing",
    q: "What financing options are available?",
    a: "We partner with leading GCC banks to offer competitive auto loans. You can apply directly on the car listing page and receive a pre-approval decision within minutes.",
  },
  {
    cat: "Financing",
    q: "Is 0% down payment really possible?",
    a: "Yes, for eligible buyers. Qualification depends on your credit profile and the bank's terms. Our financing tool shows all available plans instantly when you apply.",
  },
  {
    cat: "Financing",
    q: "Does applying for financing affect my credit score?",
    a: "Our initial pre-approval check is a soft inquiry and does not affect your credit score. A hard inquiry only occurs when you proceed to finalize a loan.",
  },
  {
    cat: "Account",
    q: "How do I create an account?",
    a: "Tap 'Sign Up' in the top right corner. You can register with your email or phone number. Identity verification is required to buy or sell — it only takes 2 minutes.",
  },
  {
    cat: "Account",
    q: "Is my personal data secure?",
    a: "AutoSouq uses bank-grade encryption for all personal data. We never sell your information to third parties. Read our full privacy policy for details.",
  },
  {
    cat: "Account",
    q: "How do I contact my car advisor?",
    a: "Once you've saved a listing or started a purchase, a dedicated advisor is automatically assigned to your account. You can reach them via live chat, WhatsApp, or phone.",
  },
];

const categories = ["All", ...new Set(faqs.map((f) => f.cat))];

function PlusIcon({ open }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      style={{ transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
    >
      <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border-b border-zinc-900 ${isOpen ? "border-zinc-800" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 px-1 text-left group"
      >
        <span
          className={`text-sm font-medium leading-snug transition-colors duration-150 ${
            isOpen ? "text-yellow-400" : "text-zinc-400 group-hover:text-yellow-400"
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen
              ? "border-yellow-500 bg-yellow-400/10"
              : "border-zinc-800 group-hover:border-zinc-600"
          }`}
        >
          <PlusIcon open={isOpen} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <p className="text-[13px] text-zinc-500 leading-relaxed pb-5 px-1">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activecat, setActivecat] = useState("All");
  const [openIdx, setOpenIdx] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return faqs.filter(
      (f) =>
        (activecat === "All" || f.cat === activecat) &&
        (f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    );
  }, [activecat, search]);

  const handleCatChange = (cat) => {
    setActivecat(cat);
    setOpenIdx(null);
  };

  const handleToggle = (i) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-[#0a0a0a] py-20 px-6">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="w-10 h-px bg-yellow-500 opacity-40" />
        <span className="text-[11px] tracking-[0.22em] text-yellow-400 uppercase font-medium">FAQ</span>
        <div className="w-10 h-px bg-yellow-500 opacity-40" />
      </div>

      {/* Heading */}
      <h2 className="text-center text-4xl font-semibold text-zinc-100 leading-tight tracking-tight mb-3">
        Got <span className="text-yellow-400">Questions?</span>
        <br />
        We've Got Answers.
      </h2>
      <p className="text-center text-[14px] text-zinc-500 max-w-md mx-auto leading-relaxed mb-10">
        Everything you need to know about buying, selling, and financing on AutoSouq.
      </p>

      {/* Search */}
      <div className="relative max-w-sm mx-auto mb-8">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40"
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="#d4af37" strokeWidth="1.2" />
          <path d="M10 10L13.5 13.5" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search a question…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setOpenIdx(null); }}
          className="w-full bg-zinc-900 border border-zinc-800 focus:border-yellow-500 text-zinc-300 placeholder-zinc-600 text-[13px] py-3 pl-9 pr-4 rounded-xl outline-none transition-colors duration-150"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCatChange(cat)}
            className={`px-5 py-2 rounded-full text-xs font-medium border transition-all duration-150 ${
              activecat === cat
                ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-yellow-500 hover:text-yellow-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="max-w-2xl mx-auto border-t border-zinc-900">
        {filtered.length > 0 ? (
          filtered.map((faq, i) => (
            <FaqItem
              key={`${faq.cat}-${i}`}
              faq={faq}
              isOpen={openIdx === i}
              onToggle={() => handleToggle(i)}
            />
          ))
        ) : (
          <p className="text-center text-zinc-600 text-[13px] py-12">
            No questions found. Try a different search term.
          </p>
        )}
      </div>

      {/* Still have questions */}
      <div className="text-center mt-14 pt-10 border-t border-zinc-900">
        <p className="text-sm font-semibold text-zinc-300 mb-1">Still have questions?</p>
        <p className="text-[13px] text-zinc-600 mb-5">Our team is available 7 days a week, in Arabic and English.</p>
        <button className="border border-yellow-500 text-yellow-400 hover:bg-yellow-400 hover:text-black text-[12px] font-semibold tracking-widest uppercase px-7 py-3 rounded-xl transition-all duration-150">
          Contact Support
        </button>
      </div>
    </section>
  );
}