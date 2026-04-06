import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// --- Toast Component ---
function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium backdrop-blur-md transition-all duration-500 border
            ${t.type === "error"
              ? "bg-red-950/90 border-red-500/40 text-red-200"
              : "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
            }`}
          style={{ animation: "slideIn 0.35s cubic-bezier(.22,1,.36,1)" }}
        >
          <span className={`text-lg ${t.type === "error" ? "text-red-400" : "text-emerald-400"}`}>
            {t.type === "error" ? "✕" : "✓"}
          </span>
          <span>{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="ml-2 opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

// --- Particle Background ---
function ParticleBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.4 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,179,237,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// --- Credentials ---
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@123";

// --- Main Component ---
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [shake, setShake] = useState(false);
const navigate=useNavigate()
  const addToast = (message, type = "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) { addToast("Email address is required."); return; }
    if (!password) { addToast("Password is required."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      addToast("Invalid email or password. Please try again.");
      return;
    }
    setLoading(false);
    addToast("Welcome back, Administrator!", "success");
    localStorage.setItem("isAuthenticate",true)
navigate("/admin")  };

  if (loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060c18] relative overflow-hidden">
        <ParticleBG />
        <Toast toasts={toasts} removeToast={removeToast} />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_60px_#38bdf8aa] mb-2">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Access Granted</h1>
          <p className="text-blue-300 text-lg">You're now inside the admin panel.</p>
          <button
            onClick={() => { setLoggedIn(false); setEmail(""); setPassword(""); }}
            className="mt-4 px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060c18] relative overflow-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .title-font { font-family: 'Syne', sans-serif; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px) scale(.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-10px); }
          40%      { transform: translateX(10px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.13s; }
        .fade-up-3 { animation-delay: 0.21s; }
        .fade-up-4 { animation-delay: 0.29s; }
        .fade-up-5 { animation-delay: 0.37s; }
        .shake { animation: shake 0.55s ease both; }
        .loader { animation: spin 0.75s linear infinite; }
        .glow-ring { box-shadow: 0 0 0 1px rgba(56,189,248,0.18), 0 0 40px 0 rgba(56,189,248,0.07); }
        .input-focus { box-shadow: 0 0 0 2px rgba(56,189,248,0.35); }
        .btn-glow:hover { box-shadow: 0 0 36px 0 rgba(56,189,248,0.32); }
        .hex-bg {
          background-image: radial-gradient(circle at 20% 50%, rgba(14,165,233,0.08) 0%, transparent 55%),
                            radial-gradient(circle at 80% 20%, rgba(99,102,241,0.07) 0%, transparent 50%),
                            radial-gradient(circle at 50% 90%, rgba(20,184,166,0.06) 0%, transparent 50%);
        }
      `}</style>

      <ParticleBG />
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Card */}
      <div className={`relative z-10 w-full max-w-md mx-4 ${shake ? "shake" : ""}`}>
        {/* Glowing border wrapper */}
        <div className="p-px rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(99,102,241,0.15) 50%, rgba(56,189,248,0.1) 100%)" }}>
          <div className="rounded-3xl hex-bg glow-ring overflow-hidden" style={{ background: "linear-gradient(160deg, #0b1628 0%, #080f1e 100%)" }}>

            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #38bdf8, #818cf8, #38bdf8, transparent)" }} />

            <div className="px-10 py-10">
              {/* Logo / Brand */}
              <div className="flex flex-col items-center mb-10 fade-up fade-up-1">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)", boxShadow: "0 0 32px rgba(56,189,248,0.4)" }}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  {/* Orbiting dot */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#080f1e]" style={{ boxShadow: "0 0 8px #38bdf8" }} />
                </div>
                <h1 className="title-font text-2xl font-bold text-white tracking-tight leading-none">NEXUS ADMIN</h1>
                <p className="text-slate-500 text-sm mt-2 tracking-widest uppercase font-light">Control Center</p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8 fade-up fade-up-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700/60" />
                <span className="text-slate-600 text-xs tracking-widest uppercase">Sign In</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-700/60" />
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-5" autoComplete="off">
                {/* Email */}
                <div className="fade-up fade-up-3">
                  <label className="block text-xs font-medium text-slate-400 mb-2 tracking-widest uppercase">Email Address</label>
                  <div className={`relative rounded-xl transition-all duration-200 ${focusEmail ? "input-focus" : ""}`}
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${focusEmail ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.07)"}` }}>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusEmail(true)}
                      onBlur={() => setFocusEmail(false)}
                      placeholder="admin@example.com"
                      className="w-full bg-transparent text-white text-sm pl-11 pr-4 py-3.5 outline-none placeholder-slate-600 rounded-xl"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="fade-up fade-up-4">
                  <label className="block text-xs font-medium text-slate-400 mb-2 tracking-widest uppercase">Password</label>
                  <div className={`relative rounded-xl transition-all duration-200 ${focusPass ? "input-focus" : ""}`}
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${focusPass ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.07)"}` }}>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </span>
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusPass(true)}
                      onBlur={() => setFocusPass(false)}
                      placeholder="••••••••••"
                      className="w-full bg-transparent text-white text-sm pl-11 pr-11 py-3.5 outline-none placeholder-slate-600 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPass ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button type="button" className="text-xs text-cyan-500/70 hover:text-cyan-400 transition-colors">Forgot password?</button>
                  </div>
                </div>

                {/* Submit */}
                <div className="fade-up fade-up-5 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow w-full py-3.5 rounded-xl font-semibold text-sm text-white tracking-wide transition-all duration-300 relative overflow-hidden disabled:opacity-70"
                    style={{ background: loading ? "rgba(14,165,233,0.5)" : "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)" }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="loader w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                        Authenticating…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Access Panel
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Hint */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] text-center fade-up fade-up-5">
                <p className="text-slate-600 text-xs">
                  Demo credentials:&nbsp;
                  <span className="text-slate-400 font-mono">admin@example.com</span>
                  &nbsp;/&nbsp;
                  <span className="text-slate-400 font-mono">Admin@123</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom label */}
        <p className="text-center text-slate-700 text-xs mt-5 tracking-widest uppercase fade-up fade-up-5">
          Secured · Encrypted · Monitored
        </p>
      </div>
    </div>
  );
}