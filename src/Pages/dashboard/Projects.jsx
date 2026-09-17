import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Plus, Trash2, Upload, FolderGit2, X, ImageIcon, ExternalLink, Github, Pencil, Clock } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative bg-white border border-zinc-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 ${className}`}>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text", required = false }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">{label}</label>
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
      className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-all font-medium"
    />
  </div>
);

const SkeletonCard = () => (
  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 flex flex-col gap-4">
    <div className="w-full aspect-[16/9] bg-zinc-200/50 animate-pulse rounded-xl" />
    <div className="h-5 bg-zinc-200/50 animate-pulse rounded-lg w-2/3" />
    <div className="h-4 bg-zinc-200/50 animate-pulse rounded-lg w-full" />
    <div className="h-4 bg-zinc-200/50 animate-pulse rounded-lg w-4/5" />
    <div className="flex gap-2 mt-2">
      <div className="h-6 w-16 bg-zinc-200/50 animate-pulse rounded-full" />
      <div className="h-6 w-12 bg-zinc-200/50 animate-pulse rounded-full" />
    </div>
  </div>
);

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  // Mengecek apakah proyek sedang berjalan
  const isOngoing = project.Status === "On Progress";

  return (
    <Card className="flex flex-col h-full">
      <div className="p-5 flex flex-col h-full relative">
        
        {/* Label On Progress (Jika Aktif) */}
        {isOngoing && (
          <div className="absolute top-8 right-8 z-10 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> On Progress
          </div>
        )}

        {project.Img && (
          <div className="w-full aspect-[16/9] rounded-xl mb-5 border border-zinc-200 overflow-hidden bg-zinc-50 relative">
            {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-zinc-200/50" />}
            <img
              src={project.Img} alt={project.Title} onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        )}

        <h3 className="font-bold text-zinc-900 text-lg mb-2 line-clamp-1">{project.Title}</h3>
        {project.Description && (
          <p className="text-zinc-500 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">{project.Description}</p>
        )}

        {project.TechStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.TechStack.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-bold uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-zinc-100">
          <div className="flex gap-2">
            {project.Link && (
              <a href={project.Link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.Github && (
              <a href={project.Github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(project)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-xs font-bold transition-all shadow-sm">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
            <button onClick={() => onDelete(project.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold transition-all shadow-sm">
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={onClose} />
    <div className="relative z-10 w-full max-w-3xl flex flex-col shadow-2xl" style={{ maxHeight: "calc(100vh - 40px)" }}>
      <div className="bg-white border border-zinc-200 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 bg-zinc-50 shrink-0">
          <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 bg-zinc-200 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  </div>
);

const ProjectForm = ({ initial, onSubmit, onCancel, submitLabel = "Simpan Proyek", uploading }) => {
  const [form, setForm] = useState({
    Title: initial?.Title || "",
    Description: initial?.Description || "",
    TechStack: Array.isArray(initial?.TechStack) ? initial.TechStack.join(", ") : initial?.TechStack || "",
    Features: Array.isArray(initial?.Features) ? initial.Features.join(", ") : initial?.Features || "",
    Link: initial?.Link || "",
    Github: initial?.Github || "",
    Status: initial?.Status || "Selesai", // Menambahkan Status ke dalam State
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.Img || null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form, file); }} className="p-6 sm:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="sm:col-span-2">
          <InputField label="Nama Proyek" value={form.Title} onChange={set("Title")} placeholder="Misal: Website Portofolio Pribadi" required />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Deskripsi Proyek</label>
          <textarea
            value={form.Description} onChange={set("Description")} rows={4}
            placeholder="Jelaskan tujuan proyek, masalah yang diselesaikan, dan fitur utamanya..."
            className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 text-sm outline-none focus:border-zinc-900 focus:bg-white transition-all resize-none font-medium"
          />
        </div>

        {/* --- FITUR BARU: PILIH STATUS PROYEK --- */}
        <div className="sm:col-span-2 space-y-2">
          <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Status Pengerjaan</label>
          <div className="flex gap-4">
            <label className={`flex-1 flex items-center justify-center gap-2 py-3 border-2 rounded-xl cursor-pointer transition-all ${form.Status === "Selesai" ? "border-zinc-900 bg-zinc-900 text-white font-bold" : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 font-medium"}`}>
              <input type="radio" name="Status" value="Selesai" checked={form.Status === "Selesai"} onChange={set("Status")} className="hidden" />
              Selesai
            </label>
            <label className={`flex-1 flex items-center justify-center gap-2 py-3 border-2 rounded-xl cursor-pointer transition-all ${form.Status === "On Progress" ? "border-amber-500 bg-amber-500 text-white font-bold" : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 font-medium"}`}>
              <input type="radio" name="Status" value="On Progress" checked={form.Status === "On Progress"} onChange={set("Status")} className="hidden" />
              <Clock className="w-4 h-4" /> On Progress
            </label>
          </div>
        </div>
        {/* --------------------------------------- */}

        <InputField label="Tech Stack (Pisahkan dg koma)" value={form.TechStack} onChange={set("TechStack")} placeholder="React, Tailwind, Supabase" />
        <InputField label="Fitur Utama (Pisahkan dg koma)" value={form.Features} onChange={set("Features")} placeholder="Auth, Dark mode, API" />
        <InputField label="URL Website (Live)" value={form.Link} onChange={set("Link")} placeholder="https://proyek-anda.com" />
        <InputField label="URL Repository GitHub" value={form.Github} onChange={set("Github")} placeholder="https://github.com/username/repo" />

        <div className="sm:col-span-2 space-y-2">
          <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Gambar Utama (Thumbnail)</label>
          <label className="flex items-center gap-4 w-full bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-xl px-6 py-6 cursor-pointer hover:border-zinc-500 hover:bg-zinc-100 transition-all">
            {preview ? (
              <img src={preview} className="h-20 w-32 object-cover rounded-lg border border-zinc-200 shadow-sm" alt="preview" />
            ) : (
              <div className="w-32 h-20 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                <ImageIcon className="w-8 h-8 text-zinc-400" />
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-zinc-900">{preview ? "Ubah Gambar" : "Klik untuk mengunggah gambar"}</p>
              <p className="text-xs text-zinc-500 mt-1 font-medium">Format PNG, JPG, WEBP didukung.</p>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-zinc-100">
        <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-bold transition-all shadow-sm">Batal</button>
        <button type="submit" disabled={uploading} className="flex items-center gap-2 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-70">
          {uploading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const uploadImage = async (f) => {
    const safeName = f.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const fileName = `proj-${Date.now()}-${safeName}`;
    await supabase.storage.from("project-images").upload(fileName, f);
    const { data } = supabase.storage.from("project-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleCreate = async (form, file) => {
    setUploading(true);
    try {
      let imgUrl = "";
      if (file) imgUrl = await uploadImage(file);
      await supabase.from("projects").insert({
        Title: form.Title,
        Description: form.Description,
        Img: imgUrl,
        TechStack: form.TechStack.split(",").map((s) => s.trim()).filter(Boolean),
        Features: form.Features.split(",").map((s) => s.trim()).filter(Boolean),
        Link: form.Link,
        Github: form.Github,
        Status: form.Status, // Insert Status ke database
      });
      setShowCreate(false);
      fetchProjects();
    } catch (error) { alert("Terjadi kesalahan saat menyimpan proyek."); }
    setUploading(false);
  };

  const handleEdit = async (form, file) => {
    setUploading(true);
    try {
      let imgUrl = editProject.Img || "";
      if (file) imgUrl = await uploadImage(file);
      await supabase.from("projects").update({
        Title: form.Title,
        Description: form.Description,
        Img: imgUrl,
        TechStack: form.TechStack.split(",").map((s) => s.trim()).filter(Boolean),
        Features: form.Features.split(",").map((s) => s.trim()).filter(Boolean),
        Link: form.Link,
        Github: form.Github,
        Status: form.Status, // Update Status ke database
      }).eq("id", editProject.id);
      setEditProject(null);
      fetchProjects();
    } catch (error) { alert("Terjadi kesalahan saat memperbarui proyek."); }
    setUploading(false);
  };

  const deleteProject = async (id) => {
    if (!confirm("Yakin ingin menghapus proyek ini secara permanen?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-md">
            <FolderGit2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">Data Proyek</h1>
            <p className="text-zinc-500 font-medium text-sm mt-1">
              {loading ? "Memuat data..." : `Mengelola total ${projects.length} proyek`}
            </p>
          </div>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-all hover:bg-zinc-800 hover:-translate-y-1 shadow-lg w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Tambah Proyek
        </button>
      </div>

      {showCreate && (
        <Modal title="Tambah Proyek Baru" onClose={() => setShowCreate(false)}>
          <ProjectForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} submitLabel="Buat Proyek" uploading={uploading} />
        </Modal>
      )}
      
      {editProject && (
        <Modal title="Edit Detail Proyek" onClose={() => setEditProject(null)}>
          <ProjectForm initial={editProject} onSubmit={handleEdit} onCancel={() => setEditProject(null)} submitLabel="Simpan Perubahan" uploading={uploading} />
        </Modal>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-16 text-center">
          <FolderGit2 className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500 font-medium text-lg">Belum ada proyek yang ditambahkan.</p>
          <p className="text-zinc-400 text-sm mt-2">Klik tombol "Tambah Proyek" di atas untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={deleteProject} onEdit={setEditProject} />
          ))}
        </div>
      )}
    </div>
  );
}