import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase"; 
import {
  ArrowLeft, ExternalLink, Github, Code2, Star, ChevronRight,
  Layers, Layout, Globe, Package, Cpu, Code, CheckCircle2, Clock
} from "lucide-react"; // <-- Clock ditambahkan
import Swal from "sweetalert2";
import { toSlug } from "../utils/slug";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const TECH_ICONS = {
  React: Globe, Tailwind: Layout, Express: Cpu, Python: Code,
  Javascript: Code, HTML: Code, CSS: Code, default: Package,
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }
  }),
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full hover:border-zinc-300 hover:shadow-sm transition-all cursor-default">
      <Icon className="w-4 h-4 text-zinc-500" />
      <span className="text-sm font-medium text-zinc-700">{tech}</span>
    </div>
  );
};

const FeatureItem = ({ feature }) => (
  <li className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white transition-colors duration-300 border border-transparent hover:border-zinc-100 hover:shadow-sm">
    <CheckCircle2 className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
    <span className="text-base text-zinc-600 leading-relaxed">{feature}</span>
  </li>
);

const ProjectStats = ({ project, t }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center space-x-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm">
        <div className="bg-white p-2.5 rounded-xl border border-zinc-200 shadow-sm">
          <Code2 className="text-zinc-900 w-6 h-6" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-2xl font-bold text-zinc-900 leading-none mb-1">{techStackCount}</div>
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{t('projectDetails.techTitle')}</div>
        </div>
      </div>
      <div className="flex items-center space-x-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm">
        <div className="bg-white p-2.5 rounded-xl border border-zinc-200 shadow-sm">
          <Layers className="text-zinc-900 w-6 h-6" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-2xl font-bold text-zinc-900 leading-none mb-1">{featuresCount}</div>
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{t('projectDetails.featureTitle')}</div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGithubClick = (githubLink) => {
    if (!githubLink || githubLink === "Private") {
      Swal.fire({
        icon: "info",
        title: t('projectDetails.privateTitle'),
        text: t('projectDetails.privateDesc'),
        confirmButtonText: t('projectDetails.understand'),
        confirmButtonColor: "#18181b",
        background: "#ffffff",
        color: "#18181b",
        customClass: { popup: 'rounded-2xl border border-zinc-200 shadow-xl' }
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjectData = async () => {
      setIsLoading(true);
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      let selectedProject = storedProjects.find((p) => toSlug(p.Title) === slug);

      if (!selectedProject) {
        try {
          const { data, error } = await supabase.from("projects").select("*");
          if (data) {
            selectedProject = data.find((p) => toSlug(p.Title) === slug);
          }
        } catch (error) {
          console.error("Gagal mengambil data proyek:", error);
        }
      }

      if (selectedProject) {
        setProject({
          ...selectedProject,
          Features: selectedProject.Features || [],
          TechStack: selectedProject.TechStack || [],
          // EKI DIHAPUS: Github sekarang default kosong jika tidak diisi
          Github: selectedProject.Github || "", 
          Status: selectedProject.Status || "Selesai",
        });
      }
      setIsLoading(false);
    };

    fetchProjectData();
  }, [slug]);

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
          <h2 className="text-lg font-medium text-zinc-500">{t('projectDetails.loading')}</h2>
        </div>
      </div>
    );
  }

  // EKI DIHAPUS: URL Dinamis mengambil asal website Anda sendiri (localhost/domain asli)
  const projectUrl = `${window.location.origin}/project/${toSlug(project.Title)}`;
  const isOngoing = project.Status === "On Progress";

  return (
    <>
      <Helmet>
        <title>{project.Title} — Portfolio</title>
        <meta name="description" content={project.Description?.slice(0, 155)} />
      </Helmet>

      <div className="min-h-screen bg-white text-zinc-900 relative overflow-hidden py-24 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUpVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <button onClick={() => navigate(-1)} className="group inline-flex items-center space-x-2 px-5 py-2.5 bg-white rounded-full border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all text-sm font-medium w-fit">
              <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:-translate-x-1 transition-transform" />
              <span>{t('projectDetails.back')}</span>
            </button>
            <div className="flex items-center space-x-2 text-sm font-medium text-zinc-400">
              <span className="hover:text-zinc-900 cursor-pointer transition-colors" onClick={() => navigate('/')}>{t('projectDetails.portfolio')}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-zinc-900 truncate max-w-[200px] sm:max-w-xs">{project.Title}</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUpVariants} className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1]">{project.Title}</h1>
                
                {/* FITUR BARU: Badge Status On Progress */}
                {isOngoing && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-600 rounded-full font-black uppercase tracking-widest text-xs shadow-sm">
                    <Clock className="w-4 h-4" /> Masih Dalam Tahap Pengembangan
                  </div>
                )}
                
                <p className="text-lg text-zinc-500 leading-relaxed font-light pt-2">{project.Description}</p>
              </div>

              <ProjectStats project={project} t={t} />

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={project.Link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-xl font-semibold transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] shadow-md w-full sm:w-auto">
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
                <a href={project.Github} target="_blank" rel="noopener noreferrer" onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()} className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-semibold transition-all hover:bg-zinc-50 hover:border-zinc-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                  <Github className="w-5 h-5" /> Source Code
                </a>
              </div>

              <div className="pt-8 border-t border-zinc-100">
                <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 mb-6"><Code2 className="w-5 h-5 text-zinc-400" />{t('projectDetails.techTitle')}</h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {project.TechStack.map((tech, index) => <TechBadge key={index} tech={tech} />)}
                  </div>
                ) : <p className="text-zinc-400 italic">{t('projectDetails.noTech')}</p>}
              </div>
            </motion.div>

            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUpVariants} className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] bg-zinc-50 aspect-video group">
                <img src={project.Img} alt={project.Title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
                <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-3 mb-6"><Star className="w-6 h-6 text-zinc-400 fill-zinc-200" />{t('projectDetails.featureTitle')}</h3>
                {project.Features.length > 0 ? (
                  <ul className="space-y-2">
                    {project.Features.map((feature, index) => <FeatureItem key={index} feature={feature} />)}
                  </ul>
                ) : <p className="text-zinc-400 italic">{t('projectDetails.noFeature')}</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;