import { useState, useEffect } from "react";
import { FetchNewCars } from "../api/api";

const conditionColors = {
  "Used – Like New":    { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  "Used – Good":        { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
  "Used – Fair":        { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  "Used – Needs Work":  { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
};

const fuelIcons = { Petrol: "⛽", Diesel: "🛢️", Hybrid: "⚡", Electric: "🔋", Unknown: "❓" };

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(parseFloat(price) || 0);
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function initials(name) {
  return (name || "?").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/* ── Skeleton card ─────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ height: 200, background: "#f3f4f6", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ padding: "16px 18px 20px" }}>
        {[70, 110, 55].map((w, i) => (
          <div key={i} style={{ height: 13, borderRadius: 6, background: "#f3f4f6", width: `${w}%`, marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
        ))}
      </div>
    </div>
  );
}

/* ── Car card ──────────────────────────────────────────────────────────── */
function CarCard({ car, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const cond      = conditionColors[car.condition_status] || conditionColors["Used – Fair"];
  const brandName = Array.isArray(car.brand) ? car.brand[0] : (car.brand || "Unknown");

  return (
    <div
      onClick={() => onClick(car)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.10)" : "none",
      }}
    >
      {/* Hero image */}
      <div style={{ position: "relative", height: 200, background: "#f3f4f6", flexShrink: 0 }}>
        {!imgError && car.images?.[0] ? (
          <img
            src={car.images[0]}
            alt={car.carTitle}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, background: "#f1f5f9" }}>
            🚗
          </div>
        )}

        {/* Condition badge */}
        <div style={{ position: "absolute", top: 10, left: 10, background: cond.bg, color: cond.text, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: cond.dot }} />
          {car.condition_status}
        </div>

        {car.negotiable === "Yes" && (
          <div style={{ position: "absolute", top: 10, right: 10, background: "#ede9fe", color: "#5b21b6", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
            Negotiable
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div style={{ minWidth: 0, paddingRight: 8 }}>
            <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {brandName} · {car.year}
            </p>
            <h3 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 700, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {car.model}
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#1d4ed8", whiteSpace: "nowrap", flexShrink: 0 }}>
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Spec chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, margin: "10px 0" }}>
          {[
            { icon: "📍", label: `${car.city || "—"}, ${car.country || "—"}` },
            { icon: "⚙️", label: car.transmission || "—" },
            { icon: fuelIcons[car.fuelType] || "⛽", label: car.fuelType || "—" },
            { icon: "🛞", label: `${(car.mileage || 0).toLocaleString()} km` },
            { icon: "🚙", label: car.bodyType || "—" },
          ].map((chip, i) => (
            <span key={i} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "3px 8px", fontSize: 12, color: "#374151", display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 11 }}>{chip.icon}</span> {chip.label}
            </span>
          ))}
        </div>

        {/* Seller row */}
        <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {initials(car.sellerName)}
            </div>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{car.sellerName || "Unknown"}</span>
          </div>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{timeAgo(car.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Detail modal ──────────────────────────────────────────────────────── */
function Modal({ car, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const cond      = conditionColors[car.condition_status] || conditionColors["Used – Fair"];
  const brandName = Array.isArray(car.brand) ? car.brand[0] : (car.brand || "Unknown");

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const specs = [
    ["Year",             car.year],
    ["Body Type",        car.bodyType],
    ["Transmission",     car.transmission],
    ["Fuel Type",        car.fuelType],
    ["Engine",           car.engineCapacity ? `${car.engineCapacity}L` : "—"],
    ["Mileage",          `${(car.mileage || 0).toLocaleString()} km`],
    ["Color",            car.color],
    ["Accident History", car.accidentHistory],
    ["Negotiable",       car.negotiable],
    ["Contact via",      car.contactMethod],
    ["Service History",  car.serviceHistory],
  ];

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 760, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>

        {/* Hero */}
        <div style={{ position: "relative", height: 280, background: "#f3f4f6", flexShrink: 0 }}>
          {car.images?.[imgIdx] ? (
            <img
              src={car.images[imgIdx]}
              alt=""
              onError={(e) => (e.target.style.display = "none")}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px 20px 0 0" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🚗</div>
          )}

          {/* Image dots */}
          {(car.images?.length || 0) > 1 && (
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {car.images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 20 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "width 0.2s", padding: 0 }} />
              ))}
            </div>
          )}

          {/* Close */}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "none", color: "#fff", fontSize: 20, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 32px" }}>
          {/* Title */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>{brandName} · {car.year}</p>
              <h2 style={{ margin: "4px 0 8px", fontSize: 26, fontWeight: 800, color: "#111827" }}>{car.model}</h2>
              <span style={{ background: cond.bg, color: cond.text, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{car.condition_status}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 30, fontWeight: 900, color: "#1d4ed8" }}>{formatPrice(car.price)}</p>
              {car.negotiable === "Yes" && (
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#7c3aed", fontWeight: 600 }}>✓ Price negotiable</p>
              )}
            </div>
          </div>

          {/* Specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 10, marginBottom: 20 }}>
            {specs.map(([k, v]) => (
              <div key={k} style={{ background: "#f9fafb", borderRadius: 10, padding: "10px 14px" }}>
                <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</p>
                <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 700, color: "#111827" }}>{v || "—"}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          {car.features && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#374151" }}>Features</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {car.features.split(",").map((f) => (
                  <span key={f} style={{ background: "#eff6ff", color: "#1d4ed8", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 500 }}>
                    {f.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {car.description && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, color: "#374151" }}>Description</p>
              <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{car.description}</p>
            </div>
          )}

          {/* Seller */}
          <div style={{ background: "#f8fafc", borderRadius: 14, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                {initials(car.sellerName)}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: "#111827", fontSize: 15 }}>{car.sellerName || "Unknown"}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{car.city}, {car.country}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={`tel:${car.phone}`} style={{ background: "#1d4ed8", color: "#fff", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                📞 Call
              </a>
              <a href={`mailto:${car.email}`} style={{ background: "#f3f4f6", color: "#374151", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                ✉️ Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────────────────── */
export default function NewCars() {
  const [cars,    setCars]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [selected,         setSelected]         = useState(null);
  const [search,           setSearch]           = useState("");
  const [sortBy,           setSortBy]           = useState("newest");
  const [filterCondition,  setFilterCondition]  = useState("All");
  const [filterBody,       setFilterBody]       = useState("All");

  useEffect(() => {
    FetchNewCars()
      .then((res) => {
        setCars(res.data.msg || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load listings.");
        setLoading(false);
      });
  }, []);

  const conditions = ["All", ...new Set(cars.map((c) => c.condition_status).filter(Boolean))];
  const bodies     = ["All", ...new Set(cars.map((c) => c.bodyType).filter(Boolean))];

  const filtered = cars
    .filter((c) => {
      const brand = Array.isArray(c.brand) ? c.brand[0] : (c.brand || "");
      const q     = search.toLowerCase();
      return (
        (!search ||
          (c.model   || "").toLowerCase().includes(q) ||
          (brand     || "").toLowerCase().includes(q) ||
          (c.city    || "").toLowerCase().includes(q) ||
          (c.country || "").toLowerCase().includes(q)) &&
        (filterCondition === "All" || c.condition_status === filterCondition) &&
        (filterBody      === "All" || c.bodyType          === filterBody)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest")     return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "price-asc")  return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
      if (sortBy === "price-desc") return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
      if (sortBy === "mileage")    return (a.mileage || 0) - (b.mileage || 0);
      return 0;
    });

  const totalValue = cars.reduce((s, c) => s + (parseFloat(c.price) || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* ── Header ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, flexWrap: "wrap", gap: 12 }}>
       <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-bold">
            Auto<span className="text-[#e8b86d]">Souq</span>
          </span>
          {!loading && !error && (
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#6b7280" }}>
              <span><strong style={{ color: "#111827" }}>{cars.length}</strong> listings</span>
              <span><strong style={{ color: "#111827" }}>{formatPrice(totalValue)}</strong> total value</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── Error ── */}
        {error && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 14, padding: "18px 22px", color: "#991b1b", fontWeight: 600, marginBottom: 24 }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Stats ── */}
        {!loading && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Total Listings", value: cars.length,                                                    icon: "📋" },
              { label: "Like New",       value: cars.filter((c) => c.condition_status === "Used – Like New").length, icon: "✨" },
              { label: "Negotiable",     value: cars.filter((c) => c.negotiable === "Yes").length,              icon: "🤝" },
              { label: "No Accidents",   value: cars.filter((c) => c.accidentHistory === "No").length,          icon: "🛡️" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#111827" }}>{s.value}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ── */}
        {!loading && !error && (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "14px 18px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search model, brand, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: "1 1 200px", padding: "9px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", color: "#111827", background: "#f9fafb" }}
            />
            <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, background: "#f9fafb", color: "#374151", cursor: "pointer" }}>
              {conditions.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={filterBody} onChange={(e) => setFilterBody(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, background: "#f9fafb", color: "#374151", cursor: "pointer" }}>
              {bodies.map((b) => <option key={b}>{b}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, background: "#f9fafb", color: "#374151", cursor: "pointer" }}>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="mileage">Lowest Mileage</option>
            </select>
            <span style={{ fontSize: 13, color: "#6b7280", marginLeft: "auto" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}>
            <p style={{ fontSize: 48, margin: "0 0 12px" }}>🔍</p>
            <p style={{ fontSize: 16, fontWeight: 600 }}>No listings match your search</p>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      {/* ── Detail modal ── */}
      {selected && <Modal car={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}