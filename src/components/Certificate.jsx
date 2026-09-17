import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, FileText, ExternalLink } from "lucide-react";

const Certificate = ({ ImgSertif }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fileUrl = ImgSertif || "";
  const isPdf = fileUrl.toLowerCase().includes(".pdf");

  // ==========================================
  // FUNGSI PINTAR: Mengekstrak Nama Asli File
  // ==========================================
  const getFormattedName = (url) => {
    if (!url) return "Sertifikat";
    try {
      const decodedUrl = decodeURIComponent(url);
      const lastSegment = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1);
      
      // Membuang prefix "cert-TIMESTAMP-" dari dashboard admin
      let cleanName = lastSegment.replace(/^cert-\d+-/, '');
      
      // Membuang ekstensi file (.pdf, .jpg, .png)
      cleanName = cleanName.replace(/\.[^/.]+$/, "");
      
      // Mengubah tanda strip atau underscore menjadi spasi
      cleanName = cleanName.replace(/[-_]/g, " ");
      
      return cleanName.trim() || "Sertifikat";
    } catch (error) {
      return "Sertifikat";
    }
  };

  const certificateTitle = getFormattedName(fileUrl);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <>
      {/* KARTU SERTIFIKAT GRID */}
      <motion.div
        whileHover={{ y: -5 }}
        onClick={() => setIsOpen(true)}
        className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-white border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        {isPdf ? (
          // TAMPILAN PDF: Menampilkan judul yang otomatis diekstrak
          <div className="flex flex-col items-center justify-center p-6 text-center w-full h-full bg-zinc-50">
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <FileText className="w-6 h-6 text-white" />
            </div>
            {/* Teks statis diubah menjadi Judul Dinamis */}
            <h3 className="font-bold text-zinc-900 text-base mb-1 line-clamp-2 capitalize leading-tight">
              {certificateTitle}
            </h3>
            <p className="text-zinc-400 text-xs font-medium mt-1 uppercase tracking-wider">Format Dokumen</p>
          </div>
        ) : (
          // TAMPILAN GAMBAR BIASA
          <img
            src={fileUrl}
            alt={certificateTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        {/* OVERLAY TOMBOL LIHAT DETAIL SAAT DI-HOVER */}
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white px-6 py-2.5 rounded-full font-bold text-zinc-900 text-sm shadow-lg flex items-center gap-2">
            <Award className="w-4 h-4" /> Lihat Detail
          </div>
        </div>
      </motion.div>

      {/* POP-UP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-zinc-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200 bg-white">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-zinc-100 rounded-lg shrink-0">
                    {isPdf ? <FileText className="w-5 h-5 text-zinc-900" /> : <Award className="w-5 h-5 text-zinc-900" />}
                  </div>
                  {/* Judul Modal juga diperbarui sesuai nama file */}
                  <h3 className="font-bold text-zinc-900 text-lg truncate capitalize">
                    {certificateTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors flex items-center gap-2 px-4 font-medium text-sm"
                  >
                    <span className="hidden sm:block">Buka Tab Baru</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-zinc-200/50 p-4 sm:p-8 overflow-y-auto flex justify-center items-center">
                {isPdf ? (
                  <iframe 
                    src={`${fileUrl}#toolbar=0`} 
                    className="w-full h-[60vh] sm:h-[70vh] rounded-xl shadow-md bg-white border border-zinc-200"
                    title="PDF Viewer"
                  />
                ) : (
                  <img
                    src={fileUrl}
                    alt="Certificate Full"
                    className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg border border-zinc-200 bg-white"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificate;