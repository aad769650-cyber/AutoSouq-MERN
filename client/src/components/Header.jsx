import { useState, useEffect } from "react";
import { NavLink, replace, useNavigate } from "react-router-dom";
import { X, Menu, ChevronRight, Phone, Search } from "lucide-react";
import { toast } from "sonner";
import { checkAuth } from "../api/api";

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "New Cars", to: "/new-cars" },
  { name: "Used Cars", to: "/used-cars" },

  { name: "Contact US", to: "/contact-us" },
];

const CarLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M5 22L8 14L12 9H24L28 14L31 22" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="22" width="30" height="7" rx="2.5" stroke="#D4A017" strokeWidth="1.8"/>
    <circle cx="11" cy="29" r="3" fill="#0F0F0F" stroke="#D4A017" strokeWidth="1.8"/>
    <circle cx="25" cy="29" r="3" fill="#0F0F0F" stroke="#D4A017" strokeWidth="1.8"/>
    <path d="M13 14H23L21 10" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 22H33" stroke="#D4A017" strokeWidth="1.2" strokeOpacity="0.4"/>
  </svg>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate=useNavigate()
  
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const drawerLinkClass = ({ isActive }) =>
    `flex items-center justify-between w-full px-7 py-4 text-sm font-semibold tracking-widest uppercase border-b border-white/5 transition-all duration-300
     ${isActive ? "text-[#D4A017] bg-[#D4A017]/8 pl-9" : "text-white/60 hover:text-[#D4A017] hover:bg-white/5 hover:pl-9"}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@300;400;500;600&display=swap');
        .as-root { font-family: 'Barlow', sans-serif; }
        .as-logo { font-family: 'Rajdhani', sans-serif; }

        /* Hero demo background */

        .hero-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 15% 25%, rgba(212,160,23,0.06) 0%, transparent 30%),
            radial-gradient(circle at 85% 70%, rgba(99,60,180,0.07) 0%, transparent 30%);
          pointer-events: none;
        }
        /* Subtle grid texture */
        .hero-bg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Header scroll state */
        .header-scrolled {
          background: rgba(11,11,22,0.92) !important;
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(212,160,23,0.12) !important;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(212,160,23,0.08);
        }
        .header-top {
          background: linear-gradient(135deg, #0d0d1a 0%, #111827 50%, #0f172a 100%);
          border-bottom: 1px solid rgba(212,160,23,0.08);
        }

        /* Nav link underline animation */
        .nav-lnk { position: relative; }
        .nav-lnk::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #D4A017, #F5C842);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-lnk:hover::after { width: 100%; }
        .nav-lnk-active::after { width: 100% !important; }

        /* CTA button shape */
        .cta-btn { clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%); }

        /* Drawer animations */
        @keyframes drawerIn  { from { transform: translateX(105%); } to { transform: translateX(0); } }
        @keyframes drawerOut { from { transform: translateX(0); }    to { transform: translateX(105%); } }
        .drawer-in  { animation: drawerIn  0.42s cubic-bezier(0.4,0,0.2,1) forwards; }
        .drawer-out { animation: drawerOut 0.36s cubic-bezier(0.4,0,0.2,1) forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }

        /* Drawer background */
        .drawer-bg {
          background: linear-gradient(160deg, #0e0e1c 0%, #111827 50%, #0d0f1e 100%);
          border-left: 1px solid rgba(212,160,23,0.1);
        }

        /* Floating orbs on hero */
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(20px,-30px) scale(1.05);} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-15px,25px) scale(0.95);} }
        .orb1 { animation: float1 12s ease-in-out infinite; }
        .orb2 { animation: float2 15s ease-in-out infinite; }
        .orb3 { animation: float1 18s ease-in-out infinite reverse; }
      `}</style>

      {/* ══════════════════════════════
          HERO DEMO BACKGROUND
      ══════════════════════════════ */}
      {/* <div className="hero-bg"> */}
        {/* Floating ambient orbs
        <div className="orb1 absolute top-32 left-[10%] w-72 h-72 rounded-full bg-[#D4A017]/5 blur-3xl pointer-events-none" />
        <div className="orb2 absolute top-20 right-[15%] w-96 h-96 rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />
        <div className="orb3 absolute bottom-20 left-[40%] w-64 h-64 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" /> */}

        {/* ═══════════════════════════
            HEADER
        ═══════════════════════════ */}
        <header className={` as-root sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "header-scrolled" : "header-top"}`}>

          {/* Micro top bar */}
          <div className={`hidden lg:flex items-center justify-between px-10 py-1.5 transition-all duration-400 overflow-hidden ${scrolled ? "h-0 opacity-0 py-0" : "h-auto opacity-100"}`}>
            <div className="flex items-center gap-2 text-[0.67rem] text-white/35 tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]/70 animate-pulse" />
              The Gulf&apos;s Premier Automotive Marketplace
            </div>
            <div className="flex items-center gap-1.5 text-[0.67rem] text-white/35 tracking-wider">
              <Phone size={10} className="text-[#D4A017]/50"  />
              <span>+971 800 AUTO</span>
            </div>
          </div>

          {/* Main bar */}
          <div className="flex items-center justify-between px-6 lg:px-10 h-16 ">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
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

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-lnk as-root text-[0.74rem] font-semibold tracking-[0.13em] uppercase pb-0.5 transition-colors duration-300
                     ${isActive ? "text-[#D4A017] nav-lnk-active" : "text-white/60 hover:text-white"}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="p-2 text-white/40 hover:text-[#D4A017] transition-colors duration-300">
                <Search size={17} />
              </button>
              <div className="w-px h-5 bg-white/10" />
              <NavLink
                to="/sell-car"
                className="cta-btn as-logo bg-linear-to-r from-[#C8960F] via-[#D4A017] to-[#F0C840] text-[#0a0a0a] text-[0.75rem] font-700 tracking-[0.13em] uppercase px-6 py-2.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 inline-block"
              

                    onClick={() => {
                
              checkAuth().then((res)=>{
                console.log(res,"ok");
                  if(res.status==401){
                 navigate("/contact-us",{replace:true})
               }
                
              }).catch((err)=>{
                console.log(err,"err");
                
              })           
            }
              
          }
              
              >
                Sell Your Car
              </NavLink>
            </div>

            {/* Mobile icons */}
            <div className="flex lg:hidden items-center gap-2">
              <button className="p-2 text-white/40 hover:text-[#D4A017] transition-colors">
                <Search size={18} />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-[#D4A017]/15 text-white hover:text-[#D4A017] transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Gold shimmer line */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-[#D4A017]/35 to-transparent" />
        </header>

        {/* ═══════════════════════════
            HERO CONTENT (demo)
        ═══════════════════════════ */}
 
      {/* </div> */}

      {/* ═══════════════════════════
          OVERLAY
      ═══════════════════════════ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md fade-in lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ═══════════════════════════
          MOBILE DRAWER
      ═══════════════════════════ */}
      <div className={`drawer-bg fixed top-0 right-0 h-full w-[min(85vw,320px)] z-60 lg:hidden flex flex-col ${isOpen ? "drawer-in" : "pointer-events-none opacity-0"}`}>

        {/* Drawer ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A017]/6 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-24 left-0 w-36 h-36 bg-indigo-700/8 blur-2xl rounded-full pointer-events-none" />

        {/* Drawer header */}
        <div className="relative flex items-center justify-between px-7 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <CarLogo />
            <div>
              <p className="as-logo text-xl font-700 tracking-wide text-white">AUTO<span className="text-[#D4A017]">SOUQ</span></p>
              <p className="text-[0.48rem] tracking-[0.3em] text-white/22 uppercase">Drive Your Dream</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-[#D4A017]/15 text-white/40 hover:text-[#D4A017] transition-all duration-300"
          >
            <X size={17} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto pt-2">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={drawerLinkClass}
              style={{ transitionDelay: `${i * 35}ms` }}
            >
              <span>{link.name}</span>
              <ChevronRight size={13} className="opacity-25" />
            </NavLink>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="relative p-6 border-t border-white/5">
          <NavLink
            to="/sell-car"
            onClick={
              () => {
                
                setIsOpen(false)
              checkAuth().then((res)=>{
                console.log(res.status,"ok");

               if(res.status==401){
                 navigate("/contact-us",{replace:true})
               }
                
              }).catch((err)=>{
                console.log(err,"err");
                
              })  
            
            }
          
            
            
            }
            className="cta-btn as-logo block w-full text-center bg-linear-to-r from-[#C8960F] via-[#D4A017] to-[#F0C840] text-[#0a0a0a] text-[0.76rem] font-700 tracking-[0.14em] uppercase py-3.5 transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,160,23,0.4)]"
          >
            Sell Your Car
          </NavLink>
          <div className="flex items-center justify-center gap-2 mt-4 text-[0.63rem] text-white/22 tracking-widest uppercase">
            <Phone size={9} />
            <span>+971 800 AUTO</span>
          </div>
        </div>
      </div>
    </>
  );
}