import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase"; 
import { Code, Award, Boxes, ChevronDown, ChevronUp, Clock } from "lucide-react"; // <-- Clock ditambahkan
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import CardProject from "../components/CardProject";
import Certificate from "../components/Certificate";
import TechStackIcon from "../components/TechStackIcon";

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function Portfolio() {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: false }),
        supabase.from("certificates").select("*").order('id', { ascending: false }), 
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      setCertificates(certificateData);

      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      window.dispatchEvent(new Event("portfolioDataUpdated"));

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');
    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    fetchData();
  }, [fetchData]);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }
    }),
  };

  const tabs = [
    { id: "projects", label: t('portfolio.tabs.projects'), icon: Code },
    { id: "certificates", label: t('portfolio.tabs.certificates'), icon: Award },
    { id: "techstack", label: t('portfolio.tabs.techstack'), icon: Boxes },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-24 px-6 sm:px-12 relative overflow-hidden" id="Portofolio">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-4">{t('portfolio.title')}</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-base md:text-lg font-light">{t('portfolio.subtitle')}</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUpVariants} className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-zinc-100 p-1.5 rounded-full shadow-inner overflow-x-auto max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTabIndicator" className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full">
            {activeTab === "projects" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedProjects.map((project, index) => (
                    // PERBAIKAN: Menambahkan div relative pembungkus
                    <motion.div key={project.id || index} custom={index % initialItems} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpVariants} className="relative group">
                      
                      {/* FITUR BARU: Badge "On Progress" */}
                      {project.Status === "On Progress" && (
                        <div className="absolute top-4 right-4 z-20 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 pointer-events-none transition-transform group-hover:scale-105">
                          <Clock className="w-3 h-3" /> On Progress
                        </div>
                      )}

                      <CardProject Img={project.Img} Title={project.Title} Description={project.Description} Link={project.Link} id={project.id} />
                    </motion.div>
                  ))}
                </div>
                {projects.length > initialItems && (
                  <div className="flex justify-center mt-10">
                    <button onClick={() => setShowAllProjects(!showAllProjects)} className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full font-medium transition-colors">
                      {showAllProjects ? <>{t('portfolio.btnLess')} <ChevronUp className="w-4 h-4" /></> : <>{t('portfolio.btnMore')} <ChevronDown className="w-4 h-4" /></>}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedCertificates.map((certificate, index) => (
                    <motion.div key={certificate.id || index} custom={index % initialItems} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpVariants}>
                      <Certificate ImgSertif={certificate.Img} />
                    </motion.div>
                  ))}
                </div>
                {certificates.length > initialItems && (
                  <div className="flex justify-center mt-10">
                    <button onClick={() => setShowAllCertificates(!showAllCertificates)} className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full font-medium transition-colors">
                      {showAllCertificates ? <>{t('portfolio.btnLess')} <ChevronUp className="w-4 h-4" /></> : <>{t('portfolio.btnMore')} <ChevronDown className="w-4 h-4" /></>}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "techstack" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {techStacks.map((stack, index) => (
                  <motion.div key={index} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpVariants}>
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}