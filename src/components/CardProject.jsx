import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    // Kontainer Utama: Putih, border tipis, efek melayang (lift) dan bayangan lembut saat di-hover
    <div className="group relative w-full flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1">
      
      {/* Bagian Atas: Gambar Proyek */}
      <div className="relative aspect-video overflow-hidden bg-zinc-100">
        <img
          src={Img}
          alt={Title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Lapisan tipis transparan yang sedikit menggelap saat di-hover (Efek Premium) */}
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/5 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Bagian Bawah: Konten Teks & Tombol */}
      <div className="flex flex-col flex-grow p-6">
        
        {/* Judul: Hitam pekat, tebal, tanpa gradasi */}
        <h3 className="text-xl font-bold text-zinc-900 mb-2 line-clamp-1">
          {Title}
        </h3>
        
        {/* Deskripsi: Abu-abu kalem */}
        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
          {Description}
        </p>

        {/* Pemisah (Garis Tipis) dan Tombol Aksi */}
        <div className="pt-4 mt-auto border-t border-zinc-100 flex items-center justify-between">
          
          {/* Tombol Live Demo: Teks link biasa dengan ikon */}
          {ProjectLink ? (
            <a
              href={ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemo}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Live Demo
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-zinc-300 text-sm font-medium">
              Demo N/A
            </span>
          )}

          {/* Tombol Details: Bentuk kapsul (Pill) hitam pekat */}
          {id ? (
            <Link
              to={`/project/${toSlug(Title)}`}
              onClick={handleDetails}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium transition-all active:scale-95"
            >
              Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="text-zinc-400 text-sm">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProject;