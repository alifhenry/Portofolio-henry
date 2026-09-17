import { useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Projects from './dashboard/Projects';
import Certificates from './dashboard/Certificates';
import { FolderGit2, Award, LogOut, ShieldCheck, Menu, X } from 'lucide-react';

// PERBAIKAN: Menggunakan Absolute Path (/dashboard/...) untuk mencegah bug URL bertumpuk
const NAV_ITEMS = [
  { to: '/dashboard/projects', label: 'Proyek', icon: FolderGit2 },
  { to: '/dashboard/certificates', label: 'Sertifikat', icon: Award },
];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6 gap-8 bg-zinc-50 border-r-2 border-zinc-200">
      
      {/* Logo & Header */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center shadow-md">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">Admin</h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Portal</p>
        </div>
      </div>

      {/* Navigasi Utama */}
      <nav className="flex flex-col gap-2 flex-1 min-h-0 mt-4">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest px-2 mb-2 shrink-0">Menu Utama</p>
        
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          // Pengecekan menu aktif
          const active = location.pathname.includes(to.split('/').pop());
          
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-bold shrink-0 ${
                active
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'text-zinc-400'}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Tombol Logout (Brutalist Red) */}
      <button
        onClick={handleLogout}
        className="shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 font-bold bg-red-50 hover:bg-red-600 hover:text-white border border-red-100 hover:border-red-600 transition-all duration-200 text-sm shadow-sm"
      >
        <LogOut className="w-5 h-5 shrink-0" />
        Keluar Sistem
      </button>
    </div>
  );

  return (
    <div className="flex bg-white text-zinc-900" style={{ height: '100dvh' }}>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside
        className="hidden lg:flex w-72 shrink-0 flex-col"
        style={{ height: '100dvh', position: 'sticky', top: 0 }}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col transition-transform duration-300 lg:hidden shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Tombol Close di Mobile */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute top-6 right-6 p-2 bg-zinc-200 rounded-full text-zinc-600 hover:bg-zinc-300 hover:text-zinc-900 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
        
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        
        {/* Latar Belakang Dotted Grid agar konsisten dengan web */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>

        {/* Mobile Topbar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b-2 border-zinc-200 bg-white/80 backdrop-blur-md shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-zinc-900" />
            <span className="text-base font-black uppercase tracking-tight text-zinc-900">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl border-2 border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Main Route Rendering */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10">
          <Routes>
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="certificates" element={<Certificates />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}