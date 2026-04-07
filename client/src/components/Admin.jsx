import { useState, useEffect } from "react";
import { FetchCars, FetchSignupUser } from "../api/api";
import { NavLink } from "react-router-dom";

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt(price) {
  const n = parseFloat(price);
  if (isNaN(n)) return price;
  if (n >= 1_000_000) return `₨${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₨${(n / 1_000).toFixed(0)}K`;
  return `₨${n}`;
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-sky-600",
];

function avatarColor(i) {
  return AVATAR_COLORS[i % AVATAR_COLORS.length];
}

// ─── Brand distribution helper ───────────────────────────────────────────────

function calcBrands(cars) {
  const map = {};
  cars.forEach((c) => {
    const brand = Array.isArray(c.brand) ? c.brand[0] : c.brand;
    if (!brand) return;
    map[brand] = (map[brand] || 0) + 1;
  });
  const total = cars.length || 1;
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }));
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  Available: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  Sold: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
  Reserved: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
};

function StatusBadge({ status }) {
  const label = status || "Unknown";
  const cls = STATUS_STYLES[label] || "bg-blue-500/10 text-blue-400 ring-blue-500/20";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide ring-1 ${cls}`}>
      {label}
    </span>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-white/5 ${className}`} />;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent, icon, loading }) {
  const accents = {
    blue: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400",
    green: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400",
    amber: "from-amber-500/10 to-transparent border-amber-500/20 text-amber-400",
    rose: "from-rose-500/10 to-transparent border-rose-500/20 text-rose-400",
  };
  const ring = accents[accent] || accents.blue;

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${ring}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</p>
        <span className="text-lg opacity-60">{icon}</span>
      </div>
      {loading ? (
        <Skeleton className="h-8 w-24 mb-2" />
      ) : (
        <p className="text-3xl font-bold tracking-tight text-white font-mono">{value}</p>
      )}
      <p className="mt-1 text-xs text-zinc-500">{sub}</p>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "overview", label: "Overview", icon: "▦" },
  { id: "cars", label: "Car Listings", icon: "🚘" },
  { id: "users", label: "Users", icon: "👥" },
];

function Sidebar({ tab, setTab }) {
  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-white/[0.07] bg-[#0d0d10] px-3 py-5 ">
      {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group mb-2">
              <div className="relative">
              </div>
              <div className="flex flex-col leading-none">
                <span className="as-logo text-[1.6rem] font-700 tracking-[0.04em] text-white">
                  <img src="logo.svg" alt="Main Logo" />
                </span>
                <span className="text-[0.5rem] tracking-[0.32em] text-white/25 uppercase font-light mt-0.5">
                  Drive Your Dream
                </span>
              </div>
            </NavLink>


      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all text-left
              ${tab === item.id
                ? "bg-blue-500/10 text-blue-400"
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/4"
              }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/6">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/4 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            MAR
          </div>
          <div className="overflow-hidden">
            <p className="text-[12px] font-semibold text-zinc-300 truncate">Mahar</p>
            <p className="text-[11px] text-zinc-600">MERN DEV</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ cars, users, loading }) {
  const brands = calcBrands(cars);
  const recent = [...cars].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  const barColors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-violet-500", "bg-zinc-500"];

  return (
    <div className="flex flex-col gap-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Inventory" value={loading ? "—" : cars.length} sub="Active listings" accent="blue" icon="🏎️" loading={loading} />
        <StatCard label="Registered Users" value={loading ? "—" : users.length} sub="All time signups" accent="green" icon="👥" loading={loading} />
        <StatCard label="Est. Revenue" value="₨4.2M" sub="This month" accent="amber" icon="💹" />
        <StatCard label="Avg. Price" value={loading || !cars.length ? "—" : fmt(cars.reduce((s, c) => s + parseFloat(c.price || 0), 0) / cars.length)} sub="Per listing" accent="rose" icon="📊" loading={loading} />
      </div>

      {/* Table + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent listings */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.07] bg-[#111114] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <h3 className="text-[13px] font-semibold text-white">Recent Listings</h3>
            <span className="text-[11px] text-blue-400 cursor-pointer hover:underline">View all →</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 border-b border-white/[0.05]">
                  <th className="text-left px-5 py-3">Model</th>
                  <th className="text-left py-3">City</th>
                  <th className="text-left py-3">Price</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(4).fill(0).map((_, i) => (
                      <tr key={i} className="border-t border-white/4">
                        <td className="px-5 py-3"><Skeleton className="h-4 w-32" /></td>
                        <td className="py-3"><Skeleton className="h-4 w-16" /></td>
                        <td className="py-3"><Skeleton className="h-4 w-16" /></td>
                        <td className="py-3"><Skeleton className="h-4 w-20" /></td>
                      </tr>
                    ))
                  : recent.map((c) => (
                      <tr key={c.id} className="border-t border-white/4 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-3">
                          <p className="font-medium text-zinc-200 text-[13px]">{c.carTitle || c.model}</p>
                          <p className="text-[11px] text-zinc-600">{c.year} · {c.fuelType}</p>
                        </td>
                        <td className="py-3 text-[13px] text-zinc-400">{c.city}</td>
                        <td className="py-3 font-mono text-[13px] text-white">{fmt(c.price)}</td>
                        <td className="py-3"><StatusBadge status={c.condition_status} /></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand distribution */}
        <div className="rounded-xl border border-white/[0.07] bg-[#111114] p-5">
          <h3 className="text-[13px] font-semibold text-white mb-5">Brand Distribution</h3>
          {loading ? (
            <div className="flex flex-col gap-4">
              {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
            </div>
          ) : brands.length === 0 ? (
            <p className="text-zinc-600 text-sm">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {brands.map((b, i) => (
                <div key={b.name}>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="text-zinc-300 font-medium">{b.name}</span>
                    <span className="text-zinc-500 font-mono">{b.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColors[i % barColors.length]}`}
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Cars Tab ─────────────────────────────────────────────────────────────────

function CarsTab({ cars, loading }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = cars.filter((c) => {
    const matchSearch =
      (c.carTitle || c.model || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.city || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.condition_status === filter;
    return matchSearch && matchFilter;
  });

  const FILTERS = ["All", "Available", "Reserved", "Sold"];

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all
                ${filter === f
                  ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/4"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[13px]">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings..."
            className="pl-8 pr-4 py-1.5 bg-white/4 border border-white/8 rounded-lg text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 w-56 transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.07] bg-[#111114] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 border-b border-white/[0.06]">
                <th className="text-left px-5 py-3.5">Car</th>
                <th className="text-left py-3.5">Brand</th>
                <th className="text-left py-3.5">City</th>
                <th className="text-left py-3.5">Price</th>
                <th className="text-left py-3.5">Mileage</th>
                <th className="text-left py-3.5">Fuel</th>
                <th className="text-left py-3.5">Status</th>
                <th className="text-left py-3.5">Listed</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(6).fill(0).map((_, i) => (
                    <tr key={i} className="border-t border-white/4">
                      {Array(8).fill(0).map((__, j) => (
                        <td key={j} className="px-5 py-3"><Skeleton className="h-4 w-full" /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-zinc-600 text-sm">No listings found.</td>
                    </tr>
                  )
                : filtered.map((c) => {
                    const brand = Array.isArray(c.brand) ? c.brand[0] : c.brand;
                    return (
                      <tr key={c.id} className="border-t border-white/4 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            {c.images?.[0] ? (
                              <img
                                src={c.images[0]}
                                alt=""
                                className="w-10 h-8 rounded-md object-cover bg-white/5 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-8 rounded-md bg-white/5 flex items-center justify-center text-lg shrink-0">🚗</div>
                            )}
                            <div>
                              <p className="font-medium text-zinc-200 text-[13px] leading-tight">{c.carTitle || c.model}</p>
                              <p className="text-[11px] text-zinc-600">{c.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-[13px] text-zinc-400">{brand || "—"}</td>
                        <td className="py-3 text-[13px] text-zinc-400">{c.city || "—"}</td>
                        <td className="py-3 font-mono text-[13px] text-white font-semibold">{fmt(c.price)}</td>
                        <td className="py-3 text-[13px] text-zinc-400">{c.mileage ? `${Number(c.mileage).toLocaleString()} km` : "—"}</td>
                        <td className="py-3 text-[13px] text-zinc-400">{c.fuelType || "—"}</td>
                        <td className="py-3"><StatusBadge status={c.condition_status} /></td>
                        <td className="py-3 text-[12px] text-zinc-600">{c.created_at ? timeAgo(c.created_at) : "—"}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

function UsersTab({ users, loading }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    (u.fullname || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[13px]">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="pl-8 pr-4 py-1.5 bg-white/4 border border-white/8 rounded-lg text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 w-56 transition"
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#111114] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 border-b border-white/[0.06]">
                <th className="text-left px-5 py-3.5">User</th>
                <th className="text-left py-3.5">Email</th>
                <th className="text-left py-3.5">Phone</th>
                <th className="text-left py-3.5">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="border-t border-white/4">
                      {Array(4).fill(0).map((__, j) => (
                        <td key={j} className="px-5 py-3"><Skeleton className="h-4 w-full" /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-zinc-600 text-sm">No users found.</td>
                    </tr>
                  )
                : filtered.map((u, i) => (
                    <tr key={u.id} className="border-t border-white/4 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {u.img_url ? (
                            <img src={u.img_url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white/10" />
                          ) : (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor(i)} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                              {initials(u.fullname)}
                            </div>
                          )}
                          <span className="font-medium text-zinc-200 text-[13px]">{u.fullname}</span>
                        </div>
                      </td>
                      <td className="py-3 text-[13px] text-zinc-400">{u.email}</td>
                      <td className="py-3 text-[13px] text-zinc-400 font-mono">{u.phone || "—"}</td>
                      <td className="py-3 text-[12px] text-zinc-600">{u.created_at ? timeAgo(u.created_at) : "—"}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [tab, setTab] = useState("overview");
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    FetchCars()
      .then((res) => setCars(res?.data?.msg || []))
      .catch(console.error)
      .finally(() => setLoadingCars(false));

    FetchSignupUser()
      .then((res) => setUsers(res?.data?.msg || []))
      .catch(console.error)
      .finally(() => setLoadingUsers(false));
  }, []);

  const PAGE_TITLES = {
    overview: { title: "Overview", sub: "Platform summary and analytics" },
    cars: { title: "Car Listings", sub: `${cars.length} total listings` },
    users: { title: "Users", sub: `${users.length} registered accounts` },
  };

  const { title, sub } = PAGE_TITLES[tab];

  return (
    <div
      className="flex h-screen bg-[#0c0c0e] text-white overflow-hidden"
      style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}
    >
      <Sidebar tab={tab} setTab={setTab} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.07] bg-[#0d0d10]">
          <div>
            <h1 className="text-[17px] font-bold tracking-tight text-white leading-tight">{title}</h1>
            <p className="text-[12px] text-zinc-600 mt-0.5">{sub}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification */}
            {/* New listing */}
            <button className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-[13px] font-semibold shadow-lg shadow-blue-900/30">
              <span>+</span> <NavLink to={tab=="users"?"/contact-us":"/sell-car"}>New Listing</NavLink>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {tab === "overview" && <OverviewTab cars={cars} users={users} loading={loadingCars || loadingUsers} />}
          {tab === "cars" && <CarsTab cars={cars} loading={loadingCars} />}
          {tab === "users" && <UsersTab users={users} loading={loadingUsers} />}
        </main>
      </div>
    </div>
  );
}