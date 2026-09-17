import React, { useState } from "react";
import { Mail, MessageSquare, Send, ArrowUpRight, Github, Linkedin, Instagram, MessageCircle, X } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-henry-alifianto/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/alifhenry", icon: Github },
  { name: "Instagram", url: "https://www.instagram.com/henryyal_?igsh=MWR1bjl3aGN1bngzMw==", icon: Instagram },
  { 
    name: "TikTok", 
    url: "https://www.tiktok.com/@henryal1", 
    icon: () => (
      <svg width="20px" height="20px" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M25.195102,6.75428571 C24.7946939,6.47510204 24.4148571,6.1675102 24.0587755,5.83346939 C22.8210612,4.66016327 22.0062857,3.11020408 21.7420408,1.42530612 C21.6622041,0.954367347 21.6220408,0.47755102 21.6220408,0 L15.7444898,0 L15.7444898,22.6408163 C15.7444898,27.5069388 13.5404082,28.5183673 10.804898,28.5183673 C10.0829388,28.5262041 9.36783673,28.3758367 8.71028571,28.0773061 C8.0524898,27.7792653 7.46791837,27.3406531 6.99820408,26.7920816 C6.5282449,26.2437551 6.18440816,25.5989388 5.99044898,24.9034286 C5.7964898,24.2079184 5.75755102,23.4781224 5.87583673,22.7657143 C5.99461224,22.053551 6.26767347,21.3756735 6.67640816,20.7800816 C7.08489796,20.1847347 7.61902041,19.6861224 8.24106122,19.3195102 C8.86334694,18.952898 9.55787755,18.7266122 10.276898,18.6573061 C10.9959184,18.588 11.7208163,18.6773878 12.4016327,18.9183673 L12.4016327,12.9328163 C5.40489796,11.8236735 0,17.4783673 0,23.5760816 C0.00465306122,26.4426122 1.14514286,29.1898776 3.17191837,31.216898 C5.19869388,33.2434286 7.94595918,34.3839184 10.8124898,34.3885714 C16.7730612,34.3885714 21.6220408,30.7444898 21.6220408,23.5760816 L21.6220408,11.3924082 C23.8995918,12.9795918 26.6204082,13.7142857 29.524898,13.7632653 L29.524898,8.26040816 C27.9658776,8.18914286 26.4617143,7.66604082 25.195102,6.75428571" />
      </svg>
    )
  }
];

const ContactPage = () => {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formSubmitUrl = 'https://formsubmit.co/henryalif149@gmail.com';
      const submitData = new FormData();
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'Pesan Baru dari Floating Chat Widget');
      submitData.append('_captcha', 'false'); 
      submitData.append('_template', 'table'); 

      await axios.post(formSubmitUrl, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
     
      Swal.fire({
        title: t('contact.alert.successTitle'),
        text: t('contact.alert.successDesc'),
        icon: 'success',
        confirmButtonColor: '#18181b',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({ email: "", message: "" });
      setIsChatOpen(false); 
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: t('contact.alert.successTitle'),
          text: t('contact.alert.successDesc'),
          icon: 'success',
          confirmButtonColor: '#18181b',
          timer: 2000,
        });
        setFormData({ email: "", message: "" });
        setIsChatOpen(false);
      } else {
        Swal.fire({ 
          title: t('contact.alert.failTitle'), 
          text: t('contact.alert.failDesc'), 
          icon: 'error', 
          confirmButtonColor: '#18181b' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white relative" id="Contact">
      
      {/* BAGIAN 1: CTA MINIMALIS (Diperbaiki Ukuran Teks untuk HP) */}
      <div className="py-24 md:py-32 px-6 sm:px-12 flex flex-col items-center justify-center relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mb-6 uppercase leading-tight sm:leading-none">
            {t('contact.cta.title')}
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-base sm:text-lg font-medium mb-10">
            {t('contact.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href="mailto:henryalif149@gmail.com" className="w-full sm:w-auto px-8 py-4 border-2 border-zinc-900 text-zinc-900 rounded-full font-bold uppercase tracking-wider hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> {t('contact.cta.emailBtn')}
            </a>
            <button onClick={() => setIsChatOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <MessageSquare className="w-5 h-5" /> {t('contact.cta.messageBtn')}
            </button>
          </div>
        </motion.div>
      </div>

      {/* BAGIAN 2: FLOATING CHAT WIDGET (Z-Index diperkecil agar di bawah menu mobile) */}
      <div className="fixed bottom-6 right-6 z-[40] flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4 w-[calc(100vw-3rem)] sm:w-[350px] bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-zinc-900 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-bold text-sm tracking-wide uppercase">{t('contact.chat.title')}</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.chat.emailLabel')}</label>
                  <input
                    type="email" name="email" placeholder={t('contact.chat.emailPlaceholder')}
                    value={formData.email} onChange={handleChange} disabled={isSubmitting} required
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{t('contact.chat.messageLabel')}</label>
                  <textarea
                    name="message" placeholder={t('contact.chat.messagePlaceholder')}
                    value={formData.message} onChange={handleChange} disabled={isSubmitting} required
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm h-24 resize-none focus:outline-none focus:border-zinc-900 transition-colors"
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-zinc-900 text-white py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isSubmitting ? t('contact.chat.sending') : t('contact.chat.sendBtn')} <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tombol Melayang & Notifikasi */}
        <div className="relative">
          {!isChatOpen && (
            <div className="absolute -top-12 right-0 bg-zinc-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap shadow-lg animate-bounce font-medium">
              {t('contact.chat.tooltip')}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-900 rotate-45"></div>
            </div>
          )}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
          >
            {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* BAGIAN 3: FOOTER MARQUEE */}
      <div className="w-full bg-[#09090b] text-white pt-16 pb-8 overflow-hidden relative z-10">
        <div className="relative flex whitespace-nowrap overflow-hidden py-10 select-none">
          <div className="animate-marquee flex items-center">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-6xl md:text-8xl font-black tracking-tighter uppercase mx-4 text-white">{t('contact.footer.connect')}</span>
                <span className="text-6xl md:text-8xl font-black tracking-tighter uppercase mx-4 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>{t('contact.footer.available')}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="absolute top-10 animate-marquee2 flex items-center">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i + 4}>
                <span className="text-6xl md:text-8xl font-black tracking-tighter uppercase mx-4 text-white">{t('contact.footer.connect')}</span>
                <span className="text-6xl md:text-8xl font-black tracking-tighter uppercase mx-4 text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>{t('contact.footer.available')}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12 mb-8">
          <div className="h-[1px] w-full bg-white/10 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-400 text-sm font-medium">
            © {new Date().getFullYear()} Henry. {t('contact.footer.rights')}
          </div>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-all duration-300" title={social.name}>
                <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </a>
            ))}
            <a href="#Home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="ml-4 flex items-center gap-2 text-sm font-semibold text-white hover:text-zinc-300 transition-colors">
              {t('contact.footer.backToTop')} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <style>{`
          .animate-marquee { animation: marquee 25s linear infinite; }
          .animate-marquee2 { animation: marquee2 25s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
          @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
        `}</style>
        
      </div>
    </div>
  );
};

export default ContactPage;