import { useState } from 'react';
import { supabase } from "../supabase";
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Proses Autentikasi
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { 
      alert("Akses ditolak: " + error.message); 
      setLoading(false); 
      return; 
    }

    // Pengecekan Role
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', data.user.id).single();

    if (profile?.role !== 'admin') {
      alert('Akses ditolak: Anda bukan Administrator.');
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }
    
    // Berhasil Login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-white overflow-hidden">
      
      {/* Background Dotted Grid (Tema Brutalist) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px_32px] opacity-70"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="bg-white border-2 border-zinc-900 rounded-[2rem] p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] transition-all">

          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase">Admin Portal</h1>
            <p className="text-zinc-500 text-sm font-medium">Masuk untuk mengelola portofolio.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Alamat Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type="email"
                  placeholder="admin@henry.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Kata Sandi</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all font-medium placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Login */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full mt-4 bg-zinc-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:bg-zinc-800 hover:-translate-y-1 active:translate-y-0 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk Sekarang
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </motion.div>

    </div>
  );
}