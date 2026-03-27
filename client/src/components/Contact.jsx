import { useState, useRef } from "react";
import { Login, Signup } from "../api/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const EyeIcon = ({ show }) => show ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Contact() {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
const [fileData,setFileData]=useState(null)
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });




const navigate=useNavigate()










  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoto = (file) => {
    if (!file || !file.type.startsWith("image/")) return;


    console.log(file);
    setFileData(file)
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handlePhoto(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = mode === "login"
      ? { email: form.email, password: form.password }
      : { fullName: form.fullName, email: form.email, phone: form.phone, password: form.password, photo: fileData || "none" };
    console.log(`\n🚗 AutoSouq — ${mode === "login" ? "Login" : "Sign Up"} Submitted`);
    console.table(payload);

if (mode=="login") {
  console.log("login",payload);
  
    const formData=new FormData();


formData.append("password",payload.password)
formData.append("email",payload.email)



  Login(formData).then((res)=>{
  console.log("login form",res);

    setForm({ password: "", email: ""});

    if (res.status==200) {
      toast.success("Sign up Successfully")
    }
  navigate("/")
}).catch((err)=>{
  if (err.response) {
    console.log(err.response.status); // 404
    console.log(err.response.data);   // backend message

          toast.error("failed! Try again")

  } else {
    console.log(err.message);
              toast.error("failed! Try again")

  }    
  
})
}else{
  const formData=new FormData();
  console.log("signup",payload);


formData.append("fullName",payload.fullName)
formData.append("email",payload.email)
formData.append("password",payload.password)
formData.append("img",payload.photo)
formData.append("phone",payload.phone)

Signup(formData).then((res)=>{
  console.log("contact form",res);

    setForm({ fullName: "", email: "", phone: "", password: "" });
setFileData(null);
setPhotoPreview(null)
    if (res.status==200) {
      toast.success("Sign up Successfully")
    }
  navigate("/")
}).catch((err)=>{
  if (err.response) {
    console.log(err.response.status); // 404
    console.log(err.response.data);   // backend message

          toast.error("failed! Try again")

  } else {
    console.log(err.message);
              toast.error("failed! Try again")

  }    
  
})

}


    // setTimeout(() => { setLoading(false);  }, 1200);
  };

  const handleOAuth = (provider) => console.log(`🔐 OAuth triggered: ${provider}`);

  const switchMode = (m) => {
    setMode(m);
    setForm({ fullName: "", email: "", phone: "", password: "" });
    setPhotoPreview(null);
    setPhotoName(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-[#c8a84b] opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 rounded-full bg-[#c8a84b] opacity-[0.05] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-[#1a1a2e] opacity-40 blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c8a84b" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#c8a84b] to-[#8b6914] flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(200,168,75,0.3)]">
            <CarIcon />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.08em" }}>
            AUTO<span className="text-[#c8a84b]">SOUQ</span>
          </h1>
          <p className="text-[#6b6b7e] text-xs tracking-[0.3em] uppercase mt-1">Premium Car Marketplace</p>
        </div>

        {/* Card */}
        <div className="relative bg-[#111118] border border-[#1e1e2e] rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#c8a84b] to-transparent" />

          <div className="p-8">
            {/* Tab switcher */}
            <div className="flex bg-[#0a0a0f] rounded-2xl p-1 mb-8 border border-[#1e1e2e]">
              {["login", "signup"].map((m) => (
                <button key={m} onClick={() => switchMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                    mode === m
                      ? "bg-linear-to-r from-[#c8a84b] to-[#a8882b] text-black shadow-[0_4px_20px_rgba(200,168,75,0.3)]"
                      : "text-[#4a4a5e] hover:text-[#8a8a9e]"
                  }`}>
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Success flash */}
            {submitted && (
              <div className="mb-6 py-3 px-4 bg-[#0d1f0d] border border-[#1a4d1a] rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">
                  {mode === "login" ? "Welcome back! Redirecting…" : "Account created! Welcome to AutoSouq!"}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── Sign Up only fields ── */}
              {mode === "signup" && (
                <>
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-[#6b6b7e] text-xs uppercase tracking-widest mb-2 font-semibold">
                      Profile Photo
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden
                        ${dragOver
                          ? "border-[#c8a84b] bg-[#c8a84b]/5 scale-[1.01]"
                          : photoPreview
                            ? "border-[#c8a84b]/40"
                            : "border-[#2a2a3a] hover:border-[#c8a84b]/50"}
                        ${photoPreview ? "h-40" : "h-28"}`}
                    >
                      {photoPreview ? (
                        <>
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          {/* hover overlay */}
                          <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            <span className="text-white text-xs font-semibold tracking-wide">Change Photo</span>
                          </div>
                          {/* badge */}
                          <div className="absolute top-2.5 right-2.5 bg-[#c8a84b] text-black text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest shadow-md">
                            ✓ UPLOADED
                          </div>
                          {/* filename pill */}
                          <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#c8a84b" strokeWidth="2" className="w-3 h-3 shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />
                            </svg>
                            <span className="text-white/80 text-[11px] truncate">{photoName}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-2 px-4">
                          <div className="w-10 h-10 rounded-full bg-[#1e1e2e] flex items-center justify-center text-[#c8a84b]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-[#6b6b7e] text-xs">
                              <span className="text-[#c8a84b] font-semibold">Click to upload</span> or drag & drop
                            </p>
                            <p className="text-[#3a3a4e] text-[11px] mt-0.5">PNG, JPG, WEBP · up to 5MB</p>
                          </div>
                        </div>
                      )}
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                        onChange={(e) => handlePhoto(e.target.files[0])} 
                        
                        
                        name="ProfileImg"
                        />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-[#6b6b7e] text-xs uppercase tracking-widest mb-2 font-semibold">Full Name</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} required
                      placeholder="John Al-Rashid"
                      className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-[#2e2e3e] text-sm focus:outline-none focus:border-[#c8a84b] focus:shadow-[0_0_0_3px_rgba(200,168,75,0.1)] transition-all" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[#6b6b7e] text-xs uppercase tracking-widest mb-2 font-semibold">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-[#2e2e3e] text-sm focus:outline-none focus:border-[#c8a84b] focus:shadow-[0_0_0_3px_rgba(200,168,75,0.1)] transition-all" />
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-[#6b6b7e] text-xs uppercase tracking-widest mb-2 font-semibold">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="you@example.com"
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-[#2e2e3e] text-sm focus:outline-none focus:border-[#c8a84b] focus:shadow-[0_0_0_3px_rgba(200,168,75,0.1)] transition-all" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#6b6b7e] text-xs uppercase tracking-widest mb-2 font-semibold">Password</label>
                <div className="relative">
                  <input name="password" type={showPass ? "text" : "password"} value={form.password}
                    onChange={handleChange} required placeholder="••••••••"
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 pr-12 text-white placeholder-[#2e2e3e] text-sm focus:outline-none focus:border-[#c8a84b] focus:shadow-[0_0_0_3px_rgba(200,168,75,0.1)] transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a4a5e] hover:text-[#c8a84b] transition-colors">
                    <EyeIcon show={showPass} />
                  </button>
                </div>
              </div>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" className="text-[#c8a84b] text-xs hover:underline">Forgot password?</button>
                </div>
              )}

              {/* Submit */}
              <button type="submit" 
                className="w-full py-3.5 rounded-xl font-bold tracking-widest uppercase text-sm bg-gradient-to-r from-[#c8a84b] to-[#a8882b] text-black hover:from-[#d4b456] hover:to-[#b89231] transition-all shadow-[0_4px_24px_rgba(200,168,75,0.35)] hover:shadow-[0_4px_32px_rgba(200,168,75,0.5)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
            
               {mode === "login" ? "Start Your Journey" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#1e1e2e]" />
              <span className="text-[#3a3a4e] text-xs uppercase tracking-widest">or continue with</span>
              <div className="flex-1 h-px bg-[#1e1e2e]" />
            </div>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleOAuth("Google")}
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#8a8a9e] hover:border-[#3a3a4e] hover:text-white hover:bg-[#141420] transition-all text-sm font-medium">
                <GoogleIcon /><span>Google</span>
              </button>
              <button onClick={() => handleOAuth("GitHub")}
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-[#8a8a9e] hover:border-[#3a3a4e] hover:text-white hover:bg-[#141420] transition-all text-sm font-medium">
                <GithubIcon /><span>GitHub</span>
              </button>
            </div>

            {mode === "signup" && (
              <p className="text-center text-[#3a3a4e] text-xs mt-6 leading-relaxed">
                By signing up, you agree to our{" "}
                <button className="text-[#c8a84b] hover:underline">Terms of Service</button>{" "}
                and <button className="text-[#c8a84b] hover:underline">Privacy Policy</button>
              </p>
            )}
            {mode === "login" && (
              <p className="text-center text-[#3a3a4e] text-xs mt-6">
                Don't have an account?{" "}
                <button onClick={() => switchMode("signup")} className="text-[#c8a84b] hover:underline font-semibold">Sign Up Free</button>
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-[#2e2e3e] text-xs mt-6">© 2026 AutoSouq. All rights reserved.</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #0a0a0f inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>
    </div>
  );
}