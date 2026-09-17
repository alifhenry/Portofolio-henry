import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      nav: {
        home: "Beranda",
        about: "Tentang",
        portfolio: "Portofolio",
        contact: "Kontak",
        collab: "Tanya / Kolab"
      },
      home: {
        badge: "Siap Berinovasi",
        title: "Software Engineer",
        subtitle: "Saya seorang",
        words: ["Tech Enthusiast", "Frontend Developer", "Mahasiswa Informatika"],
        // Deskripsi diubah agar menonjolkan efisiensi dan arsitektur
        description: "Memadukan logika sistem yang kuat dan efisiensi AI untuk membangun aplikasi web berkinerja tinggi. Berpengalaman merancang arsitektur database modern dan merancang antarmuka yang elegan.",
        btnProjects: "Lihat Proyek",
        btnContact: "Hubungi Saya"
      },
      about: {
        title: "Tentang Saya.",
        subtitle: "Mengenal lebih dekat siapa saya dan pendekatan saya dalam pengembangan.",
        // Paragraf ini dirombak total menggunakan narasi cerdas Anda
        heading: "Lebih Dari Sekadar Menulis Kode",
        paragraph1: "Meskipun saat ini saya masih menempuh pendidikan sebagai mahasiswa Informatika, saya telah mempraktikkan peran Software Engineer secara nyata. Pengalaman saya mencakup merancang arsitektur database modern menggunakan Supabase/Postgres, membangun aplikasi web yang kompleks, hingga memimpin pelatihan pemrograman Java untuk puluhan peserta.",
        paragraph2: "Dalam pengembangan perangkat lunak, saya memandang Artificial Intelligence (AI) sebagai power tools untuk efisiensi. Pemahaman utama saya terletak pada logika alur bisnis, arsitektur sistem, dan perancangan data. AI membantu saya mengeksekusi sintaksis dengan lebih cepat dan minim error, tetapi penentuan alur, keamanan, serta validasi kodenya tetap penuh di bawah kontrol logika saya. Kemampuan memanfaatkan teknologi modern ini adalah nilai efisiensi yang saya tawarkan untuk menciptakan produk yang cepat dan tepat sasaran."
      },
      portfolio: {
        title: "Karya & Portofolio.",
        subtitle: "Jelajahi perjalanan saya melalui proyek, sertifikasi, dan keahlian teknis.",
        tabs: {
          projects: "Proyek",
          certificates: "Sertifikat",
          techstack: "Teknologi"
        },
        btnMore: "Lihat Lebih Banyak",
        btnLess: "Lihat Lebih Sedikit"
      },
      contact: {
        cta: {
          title: "Mari Berkolaborasi.",
          subtitle: "Punya ide proyek luar biasa atau butuh bantuan teknis? Jangan ragu untuk menyapa melalui email atau pesan langsung!",
          emailBtn: "Email Saya",
          messageBtn: "Kirim Pesan"
        },
        chat: {
          title: "Hubungi Saya",
          emailLabel: "Email Anda",
          emailPlaceholder: "nama@email.com",
          messageLabel: "Pesan",
          messagePlaceholder: "Tulis pesan Anda di sini...",
          sending: "Mengirim...",
          sendBtn: "Kirim Pesan",
          tooltip: "Butuh informasi? Chat di sini!"
        },
        alert: {
          sendingTitle: "Mengirim Pesan...",
          sendingDesc: "Harap tunggu selagi kami mengirim pesan Anda",
          successTitle: "Berhasil!",
          successDesc: "Pesan Anda telah berhasil terkirim!",
          failTitle: "Gagal!",
          failDesc: "Terjadi kesalahan. Silakan coba lagi nanti."
        },
        footer: {
          connect: "Mari Terhubung",
          available: "Tersedia Untuk Bekerja",
          rights: "Hak cipta dilindungi.",
          backToTop: "Kembali ke atas"
        }
      },
      projectDetails: {
        back: "Kembali",
        portfolio: "Portofolio",
        loading: "Memuat Proyek...",
        techTitle: "Teknologi",
        featureTitle: "Fitur Utama",
        noTech: "Belum ada data teknologi.",
        noFeature: "Belum ada rincian fitur.",
        privateTitle: "Source Code Privat",
        privateDesc: "Maaf, source code untuk proyek ini bersifat privat.",
        understand: "Mengerti"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        portfolio: "Portfolio",
        contact: "Contact",
        collab: "Inquiry / Collab"
      },
      home: {
        badge: "Ready to Innovate",
        title: "Software Engineer",
        subtitle: "I am a",
        words: ["Tech Enthusiast", "Frontend Developer", "Informatics Student"],
        description: "Combining strong system logic and AI efficiency to build high-performance web applications. Experienced in designing modern database architectures and crafting elegant interfaces.",
        btnProjects: "View Projects",
        btnContact: "Contact Me"
      },
      about: {
        title: "About Me.",
        subtitle: "Get to know more about who I am and my approach to development.",
        heading: "More Than Just Writing Code",
        paragraph1: "Although I am currently pursuing my degree in Informatics, I have actively practiced the role of a Software Engineer in real-world scenarios. My experience ranges from designing modern database architectures using Supabase/Postgres and building complex web applications, to leading Java programming training sessions for dozens of participants.",
        paragraph2: "In software development, I view Artificial Intelligence (AI) as a power tool for efficiency. My primary focus lies in business logic, system architecture, and data design. AI helps me execute syntax faster with minimal errors, while the logical control, security, and validation remain entirely in my hands. The ability to leverage modern technology is the efficiency value I offer to deliver fast and targeted solutions."
      },
      portfolio: {
        title: "Portfolio Showcase.",
        subtitle: "Explore my journey through projects, certifications, and technical expertise.",
        tabs: {
          projects: "Projects",
          certificates: "Certificates",
          techstack: "Tech Stack"
        },
        btnMore: "See More",
        btnLess: "See Less"
      },
      contact: {
        cta: {
          title: "Let's Collaborate.",
          subtitle: "Have an amazing project idea or need technical help? Don't hesitate to reach out via email or direct message!",
          emailBtn: "Email Me",
          messageBtn: "Send Message"
        },
        chat: {
          title: "Contact Me",
          emailLabel: "Your Email",
          emailPlaceholder: "name@email.com",
          messageLabel: "Message",
          messagePlaceholder: "Write your message here...",
          sending: "Sending...",
          sendBtn: "Send Message",
          tooltip: "Need info? Chat here!"
        },
        alert: {
          sendingTitle: "Sending Message...",
          sendingDesc: "Please wait while we send your message",
          successTitle: "Success!",
          successDesc: "Your message has been successfully sent!",
          failTitle: "Failed!",
          failDesc: "An error occurred. Please try again later."
        },
        footer: {
          connect: "Let's Connect",
          available: "Available For Work",
          rights: "All rights reserved.",
          backToTop: "Back to top"
        }
      },
      projectDetails: {
        back: "Back",
        portfolio: "Portfolio",
        loading: "Loading Project...",
        techTitle: "Technologies",
        featureTitle: "Key Features",
        noTech: "No technologies added.",
        noFeature: "No features detailed.",
        privateTitle: "Private Source Code",
        privateDesc: "Sorry, the source code for this project is private.",
        understand: "Understood"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "id",
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;