import React, { useEffect, useState } from 'react';
import { supabase } from "../../supabase";
import { Award, Upload, Trash2, ImageIcon, Plus, FileText } from 'lucide-react';

// Komponen Card dengan gaya Light Mode (Batas tegas, tanpa shadow berlebihan)
const Card = ({ children, className = '' }) => (
  <div className={`relative bg-white border border-zinc-200 rounded-2xl shadow-sm ${className}`}>
    {children}
  </div>
);

const SkeletonCard = () => (
  <div className="relative bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden">
    <div className="w-full aspect-[16/11.5] bg-zinc-200/50 animate-pulse" />
  </div>
);

const CertCard = ({ cert, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isPdf = cert.Img?.toLowerCase().includes('.pdf');

  // Ekstrak nama untuk tampilan admin
  const getFormattedName = (url) => {
    if (!url) return "Dokumen";
    try {
      const decodedUrl = decodeURIComponent(url);
      const lastSegment = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1);
      let cleanName = lastSegment.replace(/^cert-\d+-/, '').replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      return cleanName.trim();
    } catch (error) { return "Dokumen"; }
  };

  return (
    <div className="relative group h-full">
      <div className="relative bg-white border border-zinc-200 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-zinc-300">
        
        {isPdf ? (
          <div className="w-full aspect-[16/11.5] flex flex-col items-center justify-center bg-zinc-50 p-4 text-center">
            <FileText className="w-10 h-10 text-zinc-400 mb-2" />
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider line-clamp-1">{getFormattedName(cert.Img)}</span>
            <span className="text-[10px] font-medium text-zinc-500 mt-1">PDF FORMAT</span>
          </div>
        ) : (
          <>
            {!imgLoaded && <div className="w-full aspect-[16/11.5] bg-zinc-100 animate-pulse" />}
            <img
              src={cert.Img}
              alt="Certificate"
              onLoad={() => setImgLoaded(true)}
              className={`w-full aspect-[16/11.5] object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'block' : 'hidden'}`}
            />
          </>
        )}

        {/* Tombol Delete Overlay (Gaya Profesional) */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={() => onDelete(cert.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-bold w-full justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCerts = async () => {
    setLoading(true);
    const { data } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
    setCerts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
      setPreview('pdf');
    } else {
      setPreview(URL.createObjectURL(f));
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = `cert-${Date.now()}-${safeName}`;
    
    try {
      await supabase.storage.from('certificate-images').upload(fileName, file);
      const { data } = supabase.storage.from('certificate-images').getPublicUrl(fileName);
      await supabase.from('certificates').insert({ Img: data.publicUrl });
      
      setFile(null); 
      setPreview(null); 
      fetchCerts();
    } catch (error) {
      alert("Gagal mengunggah sertifikat.");
    } finally {
      setUploading(false);
    }
  };

  const deleteCert = async (id) => {
    if (!confirm('Yakin ingin menghapus dokumen ini?')) return;
    await supabase.from('certificates').delete().eq('id', id);
    fetchCerts();
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-md">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">Sertifikat</h1>
          <p className="text-zinc-500 font-medium text-sm mt-1">
            {loading ? 'Memuat data...' : `Mengelola ${certs.length} dokumen`}
          </p>
        </div>
      </div>

      {/* Upload Card */}
      <Card>
        <div className="p-8 space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-zinc-400" /> Unggah Dokumen Baru
          </h2>

          <label
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            className={`flex flex-col items-center justify-center w-full min-h-[200px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 bg-zinc-50/50 hover:border-zinc-400 hover:bg-zinc-50'
            }`}
          >
            {preview === 'pdf' ? (
              <div className="text-center p-6">
                <FileText className="w-12 h-12 text-zinc-900 mx-auto mb-3" />
                <p className="text-sm text-zinc-900 font-bold uppercase tracking-wider">Dokumen PDF Terpilih</p>
              </div>
            ) : preview ? (
              <img src={preview} alt="preview" className="max-h-48 object-contain rounded-xl p-2 shadow-sm" />
            ) : (
              <div className="text-center space-y-3 p-6">
                <div className="w-14 h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center mx-auto shadow-sm">
                  <ImageIcon className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-900 font-bold">Seret & lepas file ke sini atau klik</p>
                <p className="text-xs text-zinc-500 font-medium">PNG, JPG, WEBP, dan PDF (Max 5MB)</p>
              </div>
            )}
            <input type="file" accept="image/*,application/pdf" onChange={e => handleFile(e.target.files[0])} className="hidden" />
          </label>

          {file && (
            <div className="flex items-center justify-between gap-4 flex-wrap bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              <div className="flex items-center gap-3 overflow-hidden">
                {preview === 'pdf' ? <FileText className="w-5 h-5 text-zinc-500 shrink-0" /> : <ImageIcon className="w-5 h-5 text-zinc-500 shrink-0" />}
                <p className="text-sm text-zinc-700 font-medium truncate">{file.name}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => { setFile(null); setPreview(null); }}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 text-sm font-bold transition-all shadow-sm">
                  Batal
                </button>
                <button onClick={uploadImage} disabled={uploading} 
                  className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-70">
                  {uploading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? 'Mengunggah...' : 'Unggah File'}
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Grid Sertifikat */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : certs.length === 0 ? (
        <Card className="p-16 text-center bg-zinc-50 border-dashed">
          <Award className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500 font-medium">Belum ada dokumen yang diunggah.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {certs.map(cert => (
            <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
          ))}
        </div>
      )}
    </div>
  );
}