import { useState, useEffect } from "react";
import { CarDetail, SendMail } from "../api/api";
import { useParams } from "react-router-dom";
import { Mail } from "lucide-react";
import {toast} from "sonner"
/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const Ico = ({ d, size = 18, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"
    className={cls}>
    <path d={d} />
  </svg>
);
const P = {
  heart:    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  share:    "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 4.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 11.1a16 16 0 0 0 6 6l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z",
  whatsapp: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  check:    "M20 6L9 17l-5-5",
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  chevL:    "M15 18l-6-6 6-6",
  chevR:    "M9 18l6-6-6-6",
  close:    "M18 6L6 18M6 6l12 12",
  expand:   "M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7",
  car:      "M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l4 4h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm12 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z",
  fuel:     "M3 3h8v4H3zM11 7h2l2 2v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7",
  speedom:  "M12 2a10 10 0 0 1 7.38 16.73M12 2a10 10 0 0 0-7.38 16.73M12 12l3-3",
  gear:     "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 17a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  road:     "M3 17l3-10h12l3 10H3zm3-4h12",
  email:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 7 8-7",
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  tag:      "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  history:  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  info:     "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-14v4m0 4h.01",
};

/* ─────────────────────────────────────────────
   LOADING SKELETON
───────────────────────────────────────────── */
const Pulse = ({ cls }) => (
  <div className={`animate-pulse rounded-xl bg-zinc-800/60 ${cls}`} />
);
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#080810] px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Pulse cls="h-[440px] w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Pulse cls="h-10 w-2/3" />
            <Pulse cls="h-5 w-1/3" />
            <Pulse cls="h-32 w-full" />
            <div className="grid grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => <Pulse key={i} cls="h-16" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Pulse cls="h-72 w-full" />
            <Pulse cls="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GALLERY
───────────────────────────────────────────── */
function Gallery({ images = [] }) {
  const [idx, setIdx] = useState(0);
  const [lb, setLb] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!images.length) return (
    <div className="w-full aspect-video bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-700">
      <Ico d={P.car} size={64} />
    </div>
  );

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <>
      <div className="relative w-full rounded-2xl overflow-hidden group bg-zinc-900" style={{ aspectRatio: "16/9" }}>
        <img src={images[idx]} alt="car" className="w-full h-full object-cover transition-all duration-700 ease-out" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        {/* Gold accent */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#e8b86d] to-transparent opacity-80" />

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#e8b86d] hover:text-black">
              <Ico d={P.chevL} size={16} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#e8b86d] hover:text-black">
              <Ico d={P.chevR} size={16} />
            </button>
          </>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => setLiked(v => !v)} className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${liked ? "bg-[#e8b86d] text-black" : "bg-black/50 text-white hover:bg-[#e8b86d] hover:text-black"}`}>
            <Ico d={P.heart} size={15} />
          </button>
          <button className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#e8b86d] hover:text-black transition-all">
            <Ico d={P.share} size={15} />
          </button>
          <button onClick={() => setLb(true)} className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#e8b86d] hover:text-black transition-all">
            <Ico d={P.expand} size={15} />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full font-mono">
          {idx + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {images.map((img, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === idx ? "border-[#e8b86d] scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lb && (
        <div className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-4" onClick={() => setLb(false)}>
          <button onClick={() => setLb(false)} className="absolute top-5 right-5 text-white/60 hover:text-white">
            <Ico d={P.close} size={28} />
          </button>
          <img src={images[idx]} alt="" className="max-w-full max-h-[85vh] rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
          {images.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#e8b86d] hover:text-black text-white flex items-center justify-center transition-all">
                <Ico d={P.chevL} />
              </button>
              <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#e8b86d] hover:text-black text-white flex items-center justify-center transition-all">
                <Ico d={P.chevR} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   SPEC TILE
───────────────────────────────────────────── */
function SpecTile({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1.5 bg-[#0e0e1a] border border-zinc-800/80 rounded-2xl px-4 py-3.5 hover:border-[#e8b86d]/40 hover:bg-[#13131f] transition-all duration-200">
      <div className="flex items-center gap-1.5">
        <Ico d={icon} size={13} cls="text-[#e8b86d]/80" />
        <span className="text-zinc-500 text-[10px] tracking-widest uppercase font-semibold">{label}</span>
      </div>
      <span className="text-white text-sm font-semibold">{value || "—"}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BADGE
───────────────────────────────────────────── */
function Badge({ label, gold = false, green = false }) {
  if (!label) return null;
  const cls = gold
    ? "bg-[#e8b86d] text-black"
    : green
    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
    : "border border-zinc-700 text-zinc-400 bg-zinc-800/40";
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   DETAIL ROW
───────────────────────────────────────────── */
function Row({ label, value }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-zinc-800/40 text-sm last:border-0">
      <span className="text-zinc-500 shrink-0 mr-4">{label}</span>
      <span className="text-zinc-200 font-medium text-right">{String(value)}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FINANCE CALCULATOR
───────────────────────────────────────────── */
function Finance({ price }) {
  const [dp, setDp] = useState(20);
  const [mo, setMo] = useState(48);
  const numeric = parseFloat(price) || 0;
  const monthly = Math.round((numeric * (1 - dp / 100)) / mo);
  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-400">Down Payment</span>
          <span className="text-[#e8b86d] font-semibold">{dp}% — {Math.round(numeric * dp / 100).toLocaleString()} PKR</span>
        </div>
        <input type="range" min={5} max={50} step={5} value={dp} onChange={e => setDp(+e.target.value)} className="w-full accent-[#e8b86d]" />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-400">Loan Term</span>
          <span className="text-[#e8b86d] font-semibold">{mo} months</span>
        </div>
        <input type="range" min={12} max={84} step={12} value={mo} onChange={e => setMo(+e.target.value)} className="w-full accent-[#e8b86d]" />
      </div>
      <div className="bg-[#0a0a14] rounded-2xl p-5 text-center border border-zinc-800">
        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Est. Monthly Payment</p>
        <p className="text-4xl font-bold text-[#e8b86d]">
          {monthly.toLocaleString()}
          <span className="text-base text-zinc-400 ml-2">PKR</span>
        </p>
        <p className="text-zinc-600 text-xs mt-2">*Estimate only. Subject to bank approval.</p>
      </div>
      <button className="w-full bg-[#e8b86d] hover:bg-[#d4a55a] text-black font-semibold py-3 rounded-xl transition text-sm">
        Apply for Financing
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Details() {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("overview");
const {id}=useParams()
  /* ── API Call ── */
  useEffect(() => {
    setLoading(true);
    setError(null);
    CarDetail(id)
      .then(res => { 
        console.log(res.data.msg);
        
        
        setCar(res?.data?.msg[0]); setLoading(false); })
      .catch(err => { setError(err?.message || "Failed to load."); setLoading(false); });
  }, [id]);

  if (loading) return <PageSkeleton />;
  if (error) return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <Ico d={P.car} size={60} cls="text-zinc-700" />
      <p className="text-red-400 text-lg">{error}</p>
      <button onClick={() => window.location.reload()} className="text-sm text-[#e8b86d] border border-[#e8b86d]/30 px-5 py-2 rounded-xl hover:bg-[#e8b86d]/10 transition">
        Retry
      </button>
    </div>
  );
  if (!car) return null;

  /* ── Derived ── */
  const title = car.carTitle || `${Array.isArray(car.brand) ? car.brand[0] : car.brand || ""} ${car.model || ""}`.trim();
  const brandDisplay = Array.isArray(car.brand) ? car.brand.join(" · ") : car.brand || "";
  const priceNum = parseFloat(car.price) || 0;
  const hasFeat = Array.isArray(car.features) && car.features.length > 0;
  const tabs = ["overview", "specs", ...(hasFeat ? ["features"] : []), "finance"];
  const postedDate = car.created_at ? new Date(car.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;

  return (
    <div className="min-h-screen bg-[#080810] text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Cormorant+Garamond:wght@600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        .fu  { animation: fadeUp .45s ease both; }
        .fu1 { animation-delay:.06s }
        .fu2 { animation-delay:.13s }
        .fu3 { animation-delay:.20s }
        .fu4 { animation-delay:.27s }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 bg-[#080810]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold">
            Auto<span className="text-[#e8b86d]">Souq</span>
          </span>
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Ico d={P.location} size={13} cls="text-[#e8b86d]" />
            <span>{[car.city, car.country].filter(Boolean).join(", ") || "UAE"}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ──── LEFT / MAIN ──── */}
          <div className="lg:col-span-2 space-y-7">

            {/* Gallery */}
            <div className="fu"><Gallery images={car.images || []} /></div>

            {/* Title */}
            <div className="fu fu1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge label={car.condition_status} gold />
                {car.bodyType && <Badge label={car.bodyType} />}
                {car.year && <Badge label={String(car.year)} />}
                {car.negotiable === "Yes" && <Badge label="✓ Negotiable" green />}
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl sm:text-4xl font-bold leading-tight">
                {title}
              </h1>
              {brandDisplay && <p className="text-zinc-400 mt-1 text-base">{brandDisplay}</p>}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                {(car.address || car.city) && (
                  <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
                    <Ico d={P.location} size={13} cls="text-[#e8b86d]" />
                    {[car.address, car.city, car.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {postedDate && <span className="text-zinc-600 text-xs">Posted {postedDate}</span>}
              </div>
            </div>

            {/* Quick spec tiles */}
            <div className="fu fu2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SpecTile icon={P.calendar} label="Year"         value={car.year} />
              <SpecTile icon={P.road}     label="Mileage"      value={car.mileage ? `${Number(car.mileage).toLocaleString()} km` : null} />
              <SpecTile icon={P.fuel}     label="Fuel"         value={car.fuelType} />
              <SpecTile icon={P.gear}     label="Transmission" value={car.transmission} />
              <SpecTile icon={P.speedom}  label="Engine"       value={car.engineCapacity ? `${car.engineCapacity} cc` : null} />
              <SpecTile icon={P.car}      label="Body Type"    value={car.bodyType} />
            </div>

            {/* Tabs */}
            <div className="fu fu3">
              <div className="border-b border-zinc-800/60 flex gap-1" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
                {tabs.map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`capitalize shrink-0 px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${tab === t ? "border-[#e8b86d] text-[#e8b86d]" : "border-transparent text-zinc-500 hover:text-white"}`}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-6 min-h-40">
                {/* OVERVIEW */}
                {tab === "overview" && (
                  <div className="space-y-5">
                    {car.description && (
                      <p className="text-zinc-300 leading-relaxed text-[15px]">{car.description}</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                      <div>
                        <Row label="Condition"        value={car.condition_status} />
                        <Row label="Colour"           value={car.color} />
                        <Row label="Body Type"        value={car.bodyType} />
                        <Row label="Year"             value={car.year} />
                        <Row label="Mileage"          value={car.mileage ? `${Number(car.mileage).toLocaleString()} km` : null} />
                      </div>
                      <div>
                        <Row label="Fuel Type"        value={car.fuelType} />
                        <Row label="Transmission"     value={car.transmission} />
                        <Row label="Engine"           value={car.engineCapacity ? `${car.engineCapacity} cc` : null} />
                        <Row label="Accident History" value={car.accidentHistory} />
                        <Row label="Service History"  value={car.serviceHistory} />
                      </div>
                    </div>
                  </div>
                )}

                {/* SPECS */}
                {tab === "specs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      ["Brand",            brandDisplay],
                      ["Model",            car.model],
                      ["Year",             car.year],
                      ["Body Type",        car.bodyType],
                      ["Colour",           car.color],
                      ["Transmission",     car.transmission],
                      ["Fuel Type",        car.fuelType],
                      ["Engine",           car.engineCapacity ? `${car.engineCapacity} cc` : null],
                      ["Mileage",          car.mileage ? `${Number(car.mileage).toLocaleString()} km` : null],
                      ["Accident History", car.accidentHistory],
                      ["Service History",  car.serviceHistory],
                      ["Condition",        car.condition_status],
                    ].filter(([, v]) => v != null && v !== "").map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center bg-[#0e0e1a] border border-zinc-800/60 rounded-xl px-4 py-3 text-sm hover:border-[#e8b86d]/30 transition-all">
                        <span className="text-zinc-500">{k}</span>
                        <span className="text-white font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* FEATURES */}
                {tab === "features" && (
                  <div>
                    {hasFeat ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {car.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-3 py-2.5 px-4 bg-[#0e0e1a] border border-zinc-800/60 rounded-xl text-sm hover:border-[#e8b86d]/30 transition-all">
                            <span className="w-5 h-5 rounded-full bg-[#e8b86d]/10 flex items-center justify-center shrink-0">
                              <Ico d={P.check} size={11} cls="text-[#e8b86d]" />
                            </span>
                            <span className="text-zinc-200">{f}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-600 text-sm">No features listed.</p>
                    )}
                  </div>
                )}

                {/* FINANCE */}
                {tab === "finance" && (
                  <div className="bg-[#0e0e1a] border border-zinc-800 rounded-2xl p-6">
                    <Finance price={car.price} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ──── RIGHT SIDEBAR ──── */}
          <div className="fu fu4 space-y-5">
            <div className="bg-[#0e0e1a] border border-zinc-800 rounded-2xl p-6 space-y-5 lg:sticky lg:top-20">

              {/* Price */}
              <div>
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-1">Listed Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{priceNum.toLocaleString()}</span>
                  <span className="text-[#e8b86d] font-semibold text-lg">PKR</span>
                </div>
                {car.negotiable === "Yes" && (
                  <span className="text-xs text-emerald-400 mt-1 block">✓ Open to negotiation</span>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

              {/* CTAs */}
              <div className="space-y-2.5">
             
                  <a 

onClick={()=>{
  toast.info("Mail is sent to seller,We Contact to you soon")

SendMail().then((res)=>{console.log("response",res);
}).catch((err)=>{
  console.log("err",err);
  
})

}}
                    className="w-full cursor-pointer bg-[#e8b86d] hover:bg-[#d4a55a] text-black font-semibold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2">
                    <Mail></Mail> Mail Seller
                  </a>
              
              
                <button onClick={() => setTab("finance")}
                  className="w-full border border-zinc-700 hover:border-[#e8b86d]/50 text-zinc-300 font-medium py-3 rounded-xl transition text-sm hover:bg-zinc-800/40">
                  Calculate Finance
                </button>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

              {/* Seller */}
              <div>
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-3">Seller Details</p>
                <div className="space-y-2.5">
                  {car.sellerName && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <span className="w-8 h-8 rounded-full bg-[#e8b86d]/10 border border-[#e8b86d]/20 flex items-center justify-center shrink-0">
                        <Ico d={P.user} size={14} cls="text-[#e8b86d]" />
                      </span>
                      <span className="text-zinc-200 font-medium">{car.sellerName}</span>
                    </div>
                  )}
                  {car.phone && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                        <Ico d={P.phone} size={14} cls="text-zinc-400" />
                      </span>
                      <span className="text-zinc-300 font-mono text-sm">{car.phone}</span>
                    </div>
                  )}
                  {car.email && (
                    <div className="flex items-center gap-2.5 text-sm overflow-hidden">
                      <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                        <Ico d={P.email} size={14} cls="text-zinc-400" />
                      </span>
                      <span className="text-zinc-400 text-xs truncate">{car.email}</span>
                    </div>
                  )}
                  {(car.address || car.city) && (
                    <div className="flex items-start gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Ico d={P.location} size={14} cls="text-zinc-400" />
                      </span>
                      <span className="text-zinc-400 text-xs leading-relaxed pt-1.5">
                        {[car.address, car.city, car.country].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

              {/* Trust */}
              <div className="space-y-1.5">
                {["Verified Listing", "Accident History Disclosed", "Report This Ad"].map(g => (
                  <div key={g} className="flex items-center gap-2 text-xs text-zinc-500">
                    <Ico d={P.shield} size={12} cls="text-[#e8b86d]/60 shrink-0" />
                    {g}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Meta footer */}
        <div className="flex flex-wrap gap-4 mt-10 pt-5 border-t border-zinc-800/40 text-xs text-zinc-600">
          <span>Listing ID: <span className="text-zinc-500 font-mono">#{car.id}</span></span>
          {postedDate && <span>Posted: <span className="text-zinc-500">{postedDate}</span></span>}
          {car.contactMethod && <span>Contact via: <span className="text-zinc-500">{car.contactMethod}</span></span>}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/40 py-8 mt-8 text-center text-zinc-600 text-sm">
        <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-bold text-white/80">
          Auto<span className="text-[#e8b86d]">Souq</span>
        </span>
        <span className="mx-3">·</span>
        © {new Date().getFullYear()} AutoSouq. All rights reserved.
      </footer>
    </div>
  );
}