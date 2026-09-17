import React, { useEffect, useState } from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supabase } from "../supabase"; // PENTING: Import Supabase

const AboutPage = () => {
  const { t } = useTranslation();
  
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCertificates: 0,
    YearExperience: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Hitung Pengalaman
      const startDate = new Date("2021-11-06");
      const today = new Date();
      const experience = today.getFullYear() - startDate.getFullYear() -
        (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

      // 2. Cek LocalStorage dulu untuk kecepatan
      const localProj = JSON.parse(localStorage.getItem("projects") || "[]").length;
      const localCert = JSON.parse(localStorage.getItem("certificates") || "[]").length;
      
      setStats({
        totalProjects: localProj,
        totalCertificates: localCert,
        YearExperience: experience
      });

      // 3. Tarik data ASLI dari Supabase secara langsung agar tidak pernah 0
      try {
        const { count: projCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
        const { count: certCount } = await supabase.from('certificates').select('*', { count: 'exact', head: true });

        if (projCount !== null || certCount !== null) {
          setStats({
            totalProjects: projCount || localProj,
            totalCertificates: certCount || localCert,
            YearExperience: experience
          });
        }
      } catch (error) {
        console.error("Gagal menarik statistik mandiri:", error);
      }
    };

    fetchStats();
  }, []);

  const { totalProjects, totalCertificates, YearExperience } = stats;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] } }),
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-24 px-6 sm:px-12 relative overflow-hidden flex flex-col justify-center" id="About">
      <div className="max-w-4xl mx-auto w-full">
        
        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUpVariants} className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-zinc-300"></div>
            <span className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">About Me</span>
            <div className="h-[1px] w-12 bg-zinc-300"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900">
            {t('about.title')}
          </h2>
        </motion.div>

        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUpVariants} className="flex flex-col items-center text-center space-y-12">
          
          <div className="space-y-6">
            <h3 className="text-2xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
              Muhammad Henry Alifianto
            </h3>
            <div className="space-y-6 text-zinc-600 leading-relaxed font-light text-lg md:text-xl max-w-3xl mx-auto">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
            </div>
          </div>

          <div className="py-4">
            <p className="text-zinc-500 italic font-medium text-lg md:text-xl border-l-4 border-zinc-900 pl-6 text-left max-w-2xl mx-auto">
              "Leveraging AI as a professional tool, not a replacement."
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-zinc-200 w-full max-w-3xl">
            <div className="space-y-2">
              <h4 className="text-5xl md:text-7xl font-bold text-zinc-900">{totalProjects}</h4>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-medium">Projects</p>
            </div>
            <div className="space-y-2 border-l border-r border-zinc-200 px-4">
              <h4 className="text-5xl md:text-7xl font-bold text-zinc-900">{totalCertificates}</h4>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-medium">Certificates</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl md:text-7xl font-bold text-zinc-900">{YearExperience}+</h4>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-medium">Years Exp.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full justify-center">
            <a href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo" target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto px-10 py-4 bg-zinc-900 text-white rounded-xl font-semibold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 hover:bg-zinc-800">
                <FileText className="w-5 h-5" /> Download CV
              </button>
            </a>
            <a href="#Portofolio">
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-medium transition-transform hover:bg-zinc-50 hover:border-zinc-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                <ArrowUpRight className="w-5 h-5" /> {t('home.btnProjects')}
              </button>
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;