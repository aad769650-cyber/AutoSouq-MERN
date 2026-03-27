import { useState, useRef, useCallback, useEffect } from "react";
import { SellCar } from "../api/api";

// ─── Toast Hook ──────────────────────────────────────────────
function useToast() {
  const [list, setList] = useState([]);
  const add = useCallback((ok, title, msg = "") => {
    const id = Date.now() + Math.random();
    setList((p) => [...p, { id, ok, title, msg }]);
    setTimeout(() => setList((p) => p.filter((x) => x.id !== id)), 3600);
  }, []);
  return { list, add };
}

function Toasts({ list }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end pointer-events-none">
      {list.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl border bg-[#1a1a1f] text-sm font-medium min-w-[260px] max-w-xs pointer-events-auto
            ${t.ok ? "border-[#C9A84C]" : "border-red-500"}`}
          style={{ animation: "slideIn .28s ease" }}
        >
          <span className="mt-0.5 text-base">{t.ok ? "✦" : "✗"}</span>
          <div>
            <div className={`font-semibold ${t.ok ? "text-[#C9A84C]" : "text-red-400"}`}>{t.title}</div>
            {t.msg && <div className="text-[#6B6960] text-xs mt-0.5">{t.msg}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Reusable UI ─────────────────────────────────────────────
function Pills({ opts, val, onChange, err }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onChange(o)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap cursor-pointer
              ${val === o
                ? "border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.12)]"
                : "border-white/10 text-[#6B6960] bg-[#18181D] hover:border-[#C9A84C]/40"}`}
          >
            {o}
          </button>
        ))}
      </div>
      {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
    </div>
  );
}

function FeatCheck({ label, checked, onToggle }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onToggle}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] border text-sm font-medium text-left transition-all cursor-pointer
        ${checked
          ? "border-[#C9A84C] text-[#F0EEE8] bg-[rgba(201,168,76,0.1)]"
          : "border-white/10 text-[#6B6960] bg-[#18181D] hover:border-[#C9A84C]/30"}`}
    >
      <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all
        ${checked ? "bg-[#C9A84C] border-[#C9A84C]" : "border-white/20"}`}>
        {checked && <span className="text-black text-[9px] font-black">✓</span>}
      </span>
      {label}
    </button>
  );
}

function F({ lbl, req, err, children, col }) {
  return (
    <div style={col ? { gridColumn: col } : {}}>
      {lbl && (
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-[#6B6960] mb-1.5">
          {lbl}{req && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
    </div>
  );
}

const ic = (err) =>
  `w-full bg-[#18181D] border rounded-[10px] text-[#F0EEE8] px-4 py-3 text-sm outline-none transition-all
  placeholder:text-[#6B6960] focus:border-[#C9A84C] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]
  ${err ? "border-red-500" : "border-white/10"}`;

// ─── Constants ───────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Car Info",  icon: "🚗" },
  { id: 2, label: "Pricing",   icon: "💰" },
  { id: 3, label: "Condition", icon: "🔧" },
  { id: 4, label: "Location",  icon: "📍" },
  { id: 5, label: "Details",   icon: "📝" },
  { id: 6, label: "Images",    icon: "📸" },
  { id: 7, label: "Seller",    icon: "👤" },
];

const FEATURES   = ["Air Conditioning","Sunroof","Navigation System","Parking Sensors","Backup Camera","Bluetooth","Heated Seats","Keyless Entry"];
const BODY_TYPES = ["SUV","Sedan","Hatchback","Coupe","Pickup","Van","Convertible","Wagon"];
const FUEL_TYPES = ["Petrol","Diesel","Electric","Hybrid"];
const COUNTRIES  = ["UAE","Saudi Arabia","Qatar","Kuwait","Bahrain","Oman","Pakistan","Egypt","Jordan","Turkey"];
const YEARS      = Array.from({ length: 36 }, (_, i) => 2025 - i);

const INIT = {
  carTitle: "", brand: "", model: "", year: "", mileage: "",
  fuelType: "", transmission: "", bodyType: "", color: "", engineCapacity: "",
  price: "", negotiable: "",
  condition: "", accidentHistory: "", serviceHistory: "",
  country: "", city: "", address: "",
  description: "", features: [],
  images: [],
  sellerName: "", phone: "", email: "", contactMethod: "",
};

// ─── Validation ──────────────────────────────────────────────
function validate(form, step) {
  const e = {};
  if (step === 1) {
    if (!form.carTitle.trim())  e.carTitle = "Required";
    if (!form.brand.trim())     e.brand = "Required";
    if (!form.model.trim())     e.model = "Required";
    if (!form.year)             e.year = "Select year";
    if (!form.mileage)          e.mileage = "Required";
    if (!form.fuelType)         e.fuelType = "Select fuel type";
    if (!form.transmission)     e.transmission = "Select transmission";
    if (!form.bodyType)         e.bodyType = "Select body type";
    if (!form.color.trim())     e.color = "Required";
  }
  if (step === 2) {
    if (!form.price || isNaN(form.price)) e.price = "Enter valid price";
    if (!form.negotiable) e.negotiable = "Select option";
  }
  if (step === 3) {
    if (!form.condition)       e.condition = "Select condition";
    if (!form.accidentHistory) e.accidentHistory = "Select option";
    if (!form.serviceHistory)  e.serviceHistory = "Select option";
  }
  if (step === 4) {
    if (!form.country)      e.country = "Select country";
    if (!form.city.trim())  e.city = "Required";
  }
  if (step === 5) {
    if (form.description.trim().length < 30) e.description = "Minimum 30 characters";
  }
  if (step === 6) {
    if (form.images.length < 3) e.images = "Upload at least 3 images";
  }
  if (step === 7) {
    if (!form.sellerName.trim())   e.sellerName = "Required";
    if (!form.phone.trim())        e.phone = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.contactMethod)       e.contactMethod = "Select option";
  }
  return e;
}

// ─── Step Components ─────────────────────────────────────────
// IMPORTANT: These are stable named components defined at module level.
// This prevents React from re-mounting them on every render, which is
// what caused the "loses focus after one character" bug.

function Step1({ form, setField, errors }) {
  return (
    <div className="grid gap-4">
      <F lbl="Car Title" req err={errors.carTitle}>
        <input type="text" className={ic(errors.carTitle)}
          placeholder="e.g. Toyota Camry 2022 – Excellent Condition"
          value={form.carTitle} onChange={(e) => setField("carTitle", e.target.value)} />
      </F>

      <div className="grid grid-cols-2 gap-4">
        <F lbl="Brand / Make" req err={errors.brand}>
          <input type="text" className={ic(errors.brand)}
            placeholder="Toyota, BMW, Honda…"
            value={form.brand} onChange={(e) => setField("brand", e.target.value)} />
        </F>
        <F lbl="Model" req err={errors.model}>
          <input type="text" className={ic(errors.model)}
            placeholder="Camry, 3 Series, Civic…"
            value={form.model} onChange={(e) => setField("model", e.target.value)} />
        </F>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <F lbl="Year" req err={errors.year}>
          <select className={ic(errors.year)} value={form.year}
            onChange={(e) => setField("year", e.target.value)}>
            <option value="">Select</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </F>
        <F lbl="Mileage (km)" req err={errors.mileage}>
          <input type="number" className={ic(errors.mileage)}
            placeholder="45000" min="0"
            value={form.mileage} onChange={(e) => setField("mileage", e.target.value)} />
        </F>
        <F lbl="Engine Capacity">
          <input type="text" className={ic(false)}
            placeholder="2.0L, 3.5L…"
            value={form.engineCapacity} onChange={(e) => setField("engineCapacity", e.target.value)} />
        </F>
      </div>

      <F lbl="Fuel Type" req>
        <Pills opts={FUEL_TYPES} val={form.fuelType}
          onChange={(v) => setField("fuelType", v)} err={errors.fuelType} />
      </F>

      <F lbl="Transmission" req>
        <Pills opts={["Manual", "Automatic"]} val={form.transmission}
          onChange={(v) => setField("transmission", v)} err={errors.transmission} />
      </F>

      <F lbl="Body Type" req>
        <Pills opts={BODY_TYPES} val={form.bodyType}
          onChange={(v) => setField("bodyType", v)} err={errors.bodyType} />
      </F>

      <div className="grid grid-cols-2 gap-4">
        <F lbl="Color" req err={errors.color}>
          <input type="text" className={ic(errors.color)}
            placeholder="Pearl White, Midnight Black…"
            value={form.color} onChange={(e) => setField("color", e.target.value)} />
        </F>
      </div>
    </div>
  );
}

function Step2({ form, setField, errors }) {
  return (
    <div className="grid gap-5">
      <F lbl="Asking Price (AED)" req err={errors.price}>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C] font-bold text-sm pointer-events-none">
            AED
          </span>
          <input type="number" className={`${ic(errors.price)} pl-14`}
            placeholder="85000" min="0"
            value={form.price} onChange={(e) => setField("price", e.target.value)} />
        </div>
      </F>

      <F lbl="Is Price Negotiable?" req>
        <Pills opts={["Yes", "No"]} val={form.negotiable}
          onChange={(v) => setField("negotiable", v)} err={errors.negotiable} />
      </F>

      {form.price && !isNaN(form.price) && (
        <div className="bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.18)] rounded-xl p-4">
          <div className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-widest mb-1.5">
            💡 Market Insight
          </div>
          <p className="text-[#6B6960] text-sm leading-relaxed">
            Similar vehicles are listed between AED{" "}
            {Math.round(parseInt(form.price) * 0.9).toLocaleString()} – AED{" "}
            {Math.round(parseInt(form.price) * 1.1).toLocaleString()}.
            Competitive pricing attracts 3× more buyers.
          </p>
        </div>
      )}
    </div>
  );
}

function Step3({ form, setField, errors }) {
  return (
    <div className="grid gap-5">
      <F lbl="Car Condition" req>
        <Pills opts={["New", "Used – Like New", "Used – Good", "Used – Fair"]}
          val={form.condition} onChange={(v) => setField("condition", v)} err={errors.condition} />
      </F>
      <F lbl="Accident History" req>
        <p className="text-[#6B6960] text-xs mb-2">Has this vehicle been in any accidents?</p>
        <Pills opts={["Yes", "No"]} val={form.accidentHistory}
          onChange={(v) => setField("accidentHistory", v)} err={errors.accidentHistory} />
      </F>
      <F lbl="Service History" req>
        <p className="text-[#6B6960] text-xs mb-2">Is full service history available?</p>
        <Pills opts={["Yes", "No"]} val={form.serviceHistory}
          onChange={(v) => setField("serviceHistory", v)} err={errors.serviceHistory} />
      </F>
    </div>
  );
}

function Step4({ form, setField, errors }) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <F lbl="Country" req err={errors.country}>
          <select className={ic(errors.country)} value={form.country}
            onChange={(e) => setField("country", e.target.value)}>
            <option value="">Select Country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </F>
        <F lbl="City" req err={errors.city}>
          <input type="text" className={ic(errors.city)}
            placeholder="Dubai, Riyadh, Lahore…"
            value={form.city} onChange={(e) => setField("city", e.target.value)} />
        </F>
      </div>
      <F lbl="Area / Address">
        <input type="text" className={ic(false)}
          placeholder="e.g. Al Quoz, DHA Phase 5…"
          value={form.address} onChange={(e) => setField("address", e.target.value)} />
      </F>
    </div>
  );
}

function Step5({ form, setField, errors }) {
  return (
    <div className="grid gap-5">
      <F lbl="Car Description" req err={errors.description}>
        <textarea
          className={`${ic(errors.description)} min-h-[130px] resize-y`}
          placeholder="Describe your car: key features, recent maintenance, reason for selling, any modifications…"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
        />
        <p className="text-[#6B6960] text-[11px] text-right mt-1">
          {form.description.length} chars (min 30)
        </p>
      </F>

      <F lbl="Additional Features">
        <div className="grid grid-cols-2 gap-2 mt-1">
          {FEATURES.map((f) => (
            <FeatCheck
              key={f}
              label={f}
              checked={form.features.includes(f)}
              onToggle={() => {
                const cur = form.features;
                setField("features", cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]);
              }}
            />
          ))}
        </div>
      </F>
    </div>
  );
}

function Step6({ form, setField, errors }) {
  const fileRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const addFiles = useCallback(
    (files) => {
      const arr = Array.from(files).slice(0, 10 - form.images.length);
      if (!arr.length) return;
const newImgs = arr.map((f) => ({
  file: f,
  url: URL.createObjectURL(f),
  name: f.name
}));      setField("images", [...form.images, ...newImgs]);
    },
    [form.images, setField]
  );

  return (
    <div className="grid gap-4">
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all bg-[#18181D]
          ${drag ? "border-[#C9A84C] bg-[rgba(201,168,76,0.05)]" : "border-white/10 hover:border-[#C9A84C]/50"}`}
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
      >
        <input
          type="file" ref={fileRef} accept="image/*" multiple className="hidden"
          name="images"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />
        <div className="text-4xl mb-3">📷</div>
        <div className="font-bold text-base mb-1">Drag & Drop or Click to Upload</div>
        <div className="text-[#6B6960] text-sm">JPG, PNG, WEBP — max 10 photos</div>
        <div className={`mt-2 text-xs font-semibold ${form.images.length >= 3 ? "text-[#C9A84C]" : "text-[#6B6960]"}`}>
          {form.images.length === 0
            ? "Minimum 3 photos required"
            : `${form.images.length} / 10 uploaded ${form.images.length >= 3 ? "✓" : ""}`}
        </div>
      </div>

      {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}

      {form.images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative rounded-[10px] overflow-hidden aspect-video">
              <img src={img.url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => { e.stopPropagation(); setField("images", form.images.filter((_, j) => j !== i)); }}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white
                  text-sm flex items-center justify-center hover:bg-red-600 transition-colors border-none cursor-pointer"
              >×</button>
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 bg-[#C9A84C] text-black
                  text-[9px] font-black px-2 py-0.5 rounded-full tracking-wide">COVER</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Step7({ form, setField, errors }) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <F lbl="Your Name" req err={errors.sellerName}>
          <input type="text" className={ic(errors.sellerName)}
            placeholder="Full name"
            value={form.sellerName} onChange={(e) => setField("sellerName", e.target.value)} />
        </F>
        <F lbl="Phone Number" req err={errors.phone}>
          <input type="tel" className={ic(errors.phone)}
            placeholder="+971 50 000 0000"
            value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
        </F>
      </div>
      <F lbl="Email Address" req err={errors.email}>
        <input type="email" className={ic(errors.email)}
          placeholder="you@example.com"
          value={form.email} onChange={(e) => setField("email", e.target.value)} />
      </F>
      <F lbl="Preferred Contact Method" req>
        <Pills opts={["Phone", "WhatsApp", "Email"]} val={form.contactMethod}
          onChange={(v) => setField("contactMethod", v)} err={errors.contactMethod} />
      </F>
    </div>
  );
}

// ─── Summary Log ─────────────────────────────────────────────
function SummaryLog({ form }) {
  const [showJson, setShowJson] = useState(false);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [apiError, setApiError] = useState(null);
// const [form,setForm]=useState([])
  useEffect(() => {
    setStatus("loading");
    SellCar(form)
      .then((res) =>{

        console.log("ok",res);

        
         setStatus("success")})
      .catch((err) => { setApiError(err); setStatus("error"); });
  }, []);

  const payload = {
    vehicle: {
      title: form.carTitle, brand: form.brand, model: form.model,
      year: form.year, mileage: form.mileage + " km", fuelType: form.fuelType,
      transmission: form.transmission, bodyType: form.bodyType,
      color: form.color, engine: form.engineCapacity,
    },
    pricing: { price: "AED " + parseInt(form.price).toLocaleString(), negotiable: form.negotiable },
    condition: { condition: form.condition, accidentHistory: form.accidentHistory, serviceHistory: form.serviceHistory },
    location: { country: form.country, city: form.city, address: form.address },
    description: form.description,
    features: form.features,
    images: form?.images?.length + " uploaded",
    seller: { name: form.sellerName, phone: form.phone, email: form.email, contactMethod: form.contactMethod },
    submittedAt: new Date().toISOString(),
  };

  const Section = ({ title, rows }) => (
    <div className="mb-5">
      <div className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-2">{title}</div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: "140px 1fr" }}>
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <div className="text-[#6B6960] text-xs">{k}</div>
            <div className="text-[#F0EEE8] text-xs font-medium break-words">{v || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── LOADING ────────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="bg-[#111114] border border-white/10 rounded-2xl p-8 mb-6 flex flex-col items-center justify-center gap-6 min-h-[220px]">
        <style>{`
          @keyframes autosouq-spin {
            to { transform: rotate(360deg); }
          }
          .as-spinner {
            width: 52px; height: 52px;
            border-radius: 50%;
            border: 2px solid rgba(201,168,76,0.15);
            border-top-color: #C9A84C;
            animation: autosouq-spin 0.9s linear infinite;
          }
          .as-spinner-inner {
            width: 36px; height: 36px;
            border-radius: 50%;
            border: 2px solid transparent;
            border-bottom-color: rgba(201,168,76,0.5);
            animation: autosouq-spin 0.6s linear infinite reverse;
          }
          @keyframes as-pulse-dot {
            0%, 80%, 100% { opacity: 0.2; transform: scale(0.7); }
            40% { opacity: 1; transform: scale(1); }
          }
          .as-dot { width: 6px; height: 6px; border-radius: 50%; background: #C9A84C; display: inline-block; }
          .as-dot:nth-child(1) { animation: as-pulse-dot 1.2s ease-in-out infinite 0s; }
          .as-dot:nth-child(2) { animation: as-pulse-dot 1.2s ease-in-out infinite 0.2s; }
          .as-dot:nth-child(3) { animation: as-pulse-dot 1.2s ease-in-out infinite 0.4s; }
        `}</style>
        <div className="relative flex items-center justify-center">
          <div className="as-spinner absolute" />
          <div className="as-spinner-inner" />
        </div>
        <div className="text-center">
          <p className="text-[#F0EEE8] text-sm font-semibold">Submitting your listing…</p>
          <p className="text-[#6B6960] text-xs mt-1">Publishing to AutoSouq marketplace</p>
        </div>
        <div className="flex gap-2">
          <span className="as-dot" />
          <span className="as-dot" />
          <span className="as-dot" />
        </div>
      </div>
    );
  }

  // ── ERROR ──────────────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div className="bg-[#111114] border border-white/10 rounded-2xl p-8 mb-6 flex flex-col items-center justify-center gap-5 min-h-[220px]">
        <style>{`
          @keyframes as-fade-up {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .as-fade-up { animation: as-fade-up 0.4s cubic-bezier(.16,1,.3,1) both; }
          @keyframes as-x-draw { to { stroke-dashoffset: 0; } }
          .as-x-line {
            stroke-dasharray: 30;
            stroke-dashoffset: 30;
            animation: as-x-draw 0.3s ease forwards;
          }
          .as-x-line2 { animation-delay: 0.15s; }
        `}</style>
        <div className="as-fade-up flex flex-col items-center gap-4 w-full max-w-xs">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg viewBox="0 0 28 28" className="w-6 h-6">
              <line x1="7" y1="7" x2="21" y2="21" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" className="as-x-line" />
              <line x1="21" y1="7" x2="7" y2="21" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" className="as-x-line as-x-line2" />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-[#F0EEE8] text-sm font-bold">Submission Failed</p>
            <p className="text-[#6B6960] text-xs mt-1 leading-relaxed">
              {apiError?.message || "Something went wrong. Please try again."}
            </p>
          </div>

          {/* Error code pill */}
          {apiError?.code && (
            <div className="flex items-center gap-2 bg-red-500/8 border border-red-500/15 rounded-lg px-4 py-2">
              <span className="text-[#6B6960] text-[10px] font-mono uppercase tracking-widest">Status</span>
              <span className="text-red-400 text-[10px] font-mono font-bold">{apiError.code}</span>
            </div>
          )}

          {/* Retry */}
          <button
            type="button"
            onClick={() => {
              setStatus("loading");
              setApiError(null);
              SellCar(form)
                .then(() => setStatus("success"))
                .catch((err) => { setApiError(err); setStatus("error"); });
            }}
            className="mt-1 flex items-center gap-2 bg-[#1a1810] border border-[rgba(201,168,76,0.25)] text-[#C9A84C] text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.5)] transition-all cursor-pointer"
          >
            <span>↻</span> Retry Submission
          </button>
        </div>
      </div>
    );
  }

  // ── SUCCESS ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes as-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .as-fade-up { animation: as-fade-up 0.45s cubic-bezier(.16,1,.3,1) both; }
        @keyframes as-check-circle { to { stroke-dashoffset: 0; } }
        @keyframes as-check-mark   { to { stroke-dashoffset: 0; } }
        .as-check-circle {
          stroke-dasharray: 110; stroke-dashoffset: 110;
          animation: as-check-circle 0.5s ease forwards 0.1s;
        }
        .as-check-mark {
          stroke-dasharray: 36; stroke-dashoffset: 36;
          animation: as-check-mark 0.35s ease forwards 0.55s;
        }
      `}</style>

      <div className="as-fade-up bg-[#111114] border border-white/10 rounded-2xl p-6 mb-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
          {/* Animated check */}
          <svg viewBox="0 0 40 40" className="w-10 h-10 shrink-0">
            <circle cx="20" cy="20" r="17" fill="rgba(201,168,76,0.08)"
              stroke="#C9A84C" strokeWidth="1.5" className="as-check-circle" />
            <polyline points="12,21 18,27 28,14" fill="none"
              stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="as-check-mark" />
          </svg>
          <div>
            <h2 className="text-xl font-bold text-[#F0EEE8]">Listing Submitted</h2>
            <p className="text-[#6B6960] text-xs mt-0.5">Your car is now live on AutoSouq</p>
          </div>
          <span className="ml-auto bg-green-500/15 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
            LIVE
          </span>
        </div>

   



      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function AutoSouqSellCar() {
  const { list, add } = useToast();
  const [step, setStep]   = useState(1);
  const [errors, setErrors] = useState({});
  const [done, setDone]   = useState(false);
  const [form, setForm]   = useState(INIT);









  // Stable single-key updater — never causes component re-mounts
  const setField = useCallback((key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  const goNext = () => {
    const e = validate(form, step);
    if (Object.keys(e).length) {
      setErrors(e);
      add(false, "Missing info", "Fill in all required fields.");
      return;
    }
    setErrors({});
    add(true, `Step ${step} complete`, STEPS[step - 1].label + " saved ✓");
    setStep((s) => s + 1);
  };

  const goBack = () => { setErrors({}); setStep((s) => s - 1); };

  const submit = () => {
    const e = validate(form, 7);
    if (Object.keys(e).length) {
      setErrors(e);
      add(false, "Missing info", "Complete all required fields.");
      return;
    }
    setDone(true);
    add(true, "Car listed!", "Your listing is live on AutoSouq.");
    setTimeout(() => add(true, "Email sent", "Confirmation sent to " + form.email), 1200);
  };

  const StepMap    = { 1: Step1, 2: Step2, 3: Step3, 4: Step4, 5: Step5, 6: Step6, 7: Step7 };
  const ActiveStep = StepMap[step];
  const progress   = (step / 7) * 100;

  const HeaderBar = () => (
    <>
      <header className="sticky top-0 z-40 bg-[rgba(10,10,11,0.92)] backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div>
              <div className="flex flex-col leading-none">
                <span className="as-logo text-[1.6rem] font-700 tracking-[0.04em] text-white">
                  <img src="logo.svg" alt="Main Logo" />
                </span>
                <span className="text-[0.5rem] tracking-[0.32em] text-white/25 uppercase font-light mt-0.5">
                  Drive Your Dream
                </span>
              </div>
            <div className="text-[9px] text-[#6B6960] tracking-[0.2em] -mt-0.5">SELL YOUR CAR</div>
          </div>
        </div>
        <div className="text-sm text-[#6B6960]">
          <span className="text-[#C9A84C] font-bold text-base">{done ? 7 : step}</span> / 7
        </div>
      </header>
      <div className="h-0.5 bg-[#18181D]">
        <div
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E2C47A] rounded-full transition-all duration-500"
          style={{ width: `${done ? 100 : progress}%` }}
        />
      </div>
    </>
  );

  if (done) {


    // console.log("form",form);


const formData=new FormData();


formData.append("carTitle",form.carTitle)
formData.append("carBrand",form.brand);

formData.append("carModel",form.model);
formData.append("year",form.year);
formData.append("milage",form.mileage);
formData.append("carBrand",form.fuelType);

formData.append("transmission",form.transmission);

    
formData.append("bodyType",form.bodyType);

formData.append("color",form.color);
formData.append("engineCapacity",form.engineCapacity);
formData.append("price",form.price);
formData.append("negotiable",form.negotiable);
formData.append("condition",form.condition);
formData.append("accidentHistory",form.accidentHistory);

formData.append("serviceHistory",form.brand);
formData.append("country",form.country);
formData.append("city",form.city);
formData.append("address",form.address);
formData.append("description",form.description);
form.features?.map((curr)=>{
  formData.append("features",curr);
})

form.images?.map((img)=>{
  formData.append("images",img.file);
})

formData.append("sellerName",form.sellerName);
formData.append("phone",form.phone);
formData.append("email",form.email);
formData.append("contactMethod",form.contactMethod);



// console.log(resp,"resp");

// handleSubmit(formData)










    return (
      <div className="min-h-screen bg-[#0A0A0B] text-[#F0EEE8]">
        <style>{`@keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
        <HeaderBar />
        <main className="max-w-2xl mx-auto px-5 py-8 pb-20">
          <SummaryLog form={formData} />
        </main>
        <Toasts list={list} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F0EEE8]">
      <style>{`@keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      <HeaderBar />

      <main className="max-w-2xl mx-auto px-5 py-8 pb-20">
        {/* Step Dots */}
        <div className="flex items-center mb-7">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                  ${step === s.id
                    ? "border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.12)] shadow-[0_0_14px_rgba(201,168,76,0.22)]"
                    : step > s.id
                    ? "border-[#C9A84C] bg-[#C9A84C] text-black"
                    : "border-white/10 text-[#6B6960]"}`}>
                  {step > s.id ? "✓" : s.id}
                </div>
                <span className={`text-[9px] font-semibold tracking-wide whitespace-nowrap hidden sm:block
                  ${step === s.id ? "text-[#C9A84C]" : "text-[#6B6960]"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 mb-4 transition-all ${step > s.id ? "bg-[#C9A84C]" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
            <span className="text-3xl">{STEPS[step - 1].icon}</span>
            <div>
              <h1 className="text-xl font-bold">{STEPS[step - 1].label}</h1>
              <p className="text-[#6B6960] text-xs">Step {step} of 7</p>
            </div>
          </div>
          <ActiveStep form={form} setField={setField} errors={errors} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-3">
          {step > 1 ? (
            <button type="button" onClick={goBack}
              className="border border-white/10 text-[#6B6960] font-medium px-7 py-3 rounded-[10px]
                hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all bg-transparent cursor-pointer text-sm">
              ← Back
            </button>
          ) : <div />}

          {step < 7 ? (
            <button type="button" onClick={goNext}
              className="bg-gradient-to-r from-[#C9A84C] to-[#E2C47A] text-black font-bold
                px-8 py-3 rounded-[10px] hover:opacity-90 active:scale-[0.99] transition-all tracking-wide text-sm cursor-pointer border-none">
              Continue →
            </button>
          ) : (
            <button type="button" onClick={submit}
              className="bg-gradient-to-r from-[#C9A84C] to-[#E2C47A] text-black font-bold
                px-8 py-3.5 rounded-[10px] hover:opacity-90 active:scale-[0.99] transition-all tracking-wide text-[15px] cursor-pointer border-none">
              🚗 Post Car for Sale
            </button>
          )}
        </div>
      </main>

      <Toasts list={list} />
    </div>
  );
}