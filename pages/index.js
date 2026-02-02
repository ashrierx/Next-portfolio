
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import View from '../images/view.png';
import commercetools from '../images/commercetools.png';
import LamprosLabs from '../images/ocusell.png';
import VantageIoTPlatform from '../images/vantageps.jpg';
import Shadow from '../images/barterbuilds.png';
import Dreammotions from '../images/Dreammotions.png';

function CursorBars() {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const rotate = useSpring(
            useTransform(mouseX, [-150, 150], [-6, 6]),
            {
              stiffness: 120,
              damping: 20,
              mass: 1 + i * 0.15,
            }
          );

          const y = useSpring(
            useTransform(mouseY, [-150, 150], [-6, 6]),
            {
              stiffness: 120,
              damping: 20,
              mass: 1 + i * 0.15,
            }
          );

          return (
            <motion.div
              key={i}
              style={{ rotate, y }}
              className="w-1 h-12 bg-cyan-400/80 rounded-full origin-bottom"
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen relative overflow-x-hidden">
      {/* Spotlight cursor effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10 mx-4 pt-20 mb-4">
        {/* Neon blue border outline - starts above nav, ends after footer */}
        <div className="absolute inset-0 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_40px_rgba(34,211,238,0.3)] rounded-lg pointer-events-none" />
        
        <div className="relative">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to control background color transition
  // Transition happens when scrolling past 20% of the page
  // Dark blue at top (scrollYProgress = 0), light when scrolling (scrollYProgress > 0.2)
  const lightBgProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1], { clamp: true });
  
  // Calculate the "swish" effect - a sliding transition from left
  const swishClipPath = useTransform(lightBgProgress, (value) => {
    // Ease out cubic for smooth swish
    const eased = 1 - Math.pow(1 - value, 3);
    const x = (1 - eased) * -100;
    return `inset(0 ${x}% 0 0)`;
  });
  
  // Dark opacity: starts at 1 (visible at top) and goes to 0 (hidden when scrolling)
  const darkOpacity = useTransform(lightBgProgress, [0, 1], [1, 0], { clamp: true });
  // Text color: starts light (for dark bg) and goes dark (for light bg) when scrolling
  const textColor = useTransform(lightBgProgress, [0, 0.5, 1], ['rgb(241, 245, 249)', 'rgb(241, 245, 249)', 'rgb(15, 23, 42)'], { clamp: true });
  const linkColor = useTransform(lightBgProgress, [0, 0.5, 1], ['rgb(148, 163, 184)', 'rgb(148, 163, 184)', 'rgb(51, 65, 85)'], { clamp: true });
  const mobileBgColor = useTransform(lightBgProgress, [0, 0.5, 1], ['rgba(30, 58, 138, 0.95)', 'rgba(30, 58, 138, 0.95)', 'rgba(255, 255, 255, 0.95)'], { clamp: true });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 overflow-visible"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-4 relative">
        {/* Dark blue background layer - visible at top */}
        <motion.div
          className="absolute inset-0 bg-blue-900/95 backdrop-blur-md border-b border-blue-800/50 rounded-t-lg"
          style={{ opacity: darkOpacity }}
        />
        
        {/* Light background layer with swish effect - appears when scrolling */}
        <motion.div
          className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-slate-200 rounded-t-lg"
          style={{ clipPath: swishClipPath }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <motion.div
            className="text-2xl font-bold tracking-tight relative z-10"
            whileHover={{ scale: 1.05 }}
            style={{ color: textColor }}
          >
            AJ
          </motion.div>
          
          {/* Social icons under logo */}
          <div className="flex gap-3 relative z-10">
            {[
              { icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              ), href: 'https://github.com/ashrierx' },
              { icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              ), href: 'https://www.linkedin.com/in/ashley-m-judah/' },
              { icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ), href: 'https://drive.proton.me/urls/V87WXC8JHM#a4YsNngqQQM9' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: linkColor }}
                whileHover={{ color: 'rgb(34, 211, 238)' }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center relative z-10">
          {['About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ color: linkColor }}
            >
              <span className="text-cyan-400 text-xs mr-1">0{i + 1}.</span>
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          className="md:hidden relative z-10 flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: textColor }}
        >
          <motion.span
            className="w-6 h-0.5 bg-current origin-center"
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-current"
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-current origin-center"
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden relative backdrop-blur-md border-b border-slate-800/50 rounded-b-lg"
          initial={false}
          animate={{
            maxHeight: isMobileMenuOpen ? 300 : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ 
            backgroundColor: mobileBgColor,
            zIndex: 50,
            overflow: 'hidden',
          }}
        >
          <div className="px-6 py-4 space-y-4">
            {['About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-base font-medium py-2 transition-colors relative z-10"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1 }}
                style={{ color: linkColor }}
              >
                <span className="text-cyan-400 text-xs mr-2">0{i + 1}.</span>
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-100 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Ashley Judah.
          </motion.h1>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-400 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            I build things for the web.
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Software engineer specializing in building exceptional digital experiences. 
            I focus on creating accessible, secure, and 
            user-friendly web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="pt-8"
          >
            <motion.a
              href="#projects"
              className="inline-block px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded font-mono text-sm hover:bg-cyan-400/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check out my work
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={containerRef}>
      <div className="max-w-5xl mx-auto py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-600 mb-12 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl md:text-2xl">01.</span>
            About Me
            <span className="h-px bg-slate-700 flex-1 ml-4 hidden md:block" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            className="md:col-span-2 space-y-6 text-slate-500 leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p>
            I specialize in frontend and full-stack web development, with experience building scalable React applications, admin portals, and API-driven dashboards. I have a proven track record of shipping weekly production features, improving performance and developer workflows, and reducing operational friction by up to 25%.
            </p>
            <p>
              Currently pursuing a Bachelor of Science in Computer Science while delivering 
              exceptional results across multiple concurrent projects. I thrive in fast-paced 
              environments with a proactive approach and positive team spirit.
            </p>
            <p>
              When I'm not coding, you'll find me trail running in the high country, mountain biking, snowboarding, or camping under the stars.
            </p>

            <div className="pt-4">
              <p className="text-slate-500 mb-4">Here are some technologies I've been working with:</p>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Node.js', 'Docker', 'AWS'].map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <span className="text-cyan-400">▹</span>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative z-10 rounded overflow-hidden border-2 border-cyan-400/20 group-hover:border-cyan-400 transition-colors">
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
  <CursorBars />
</div>
            </div>
            <div className="absolute inset-0 bg-cyan-400/20 rounded translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform h-[300px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const experiences = [
    {
      company: 'View Systems',
      role: 'Software Engineer',
      period: 'Sep 2024 - Aug 2025',
      description: 'Engineering, Front End Development',
      bullets: [
        'Spearheaded development of an enterprise-grade AI data transformation platform',
        'Built sophisticated engine converting diverse formats (PDFs, CSVs, JSON, PPTX) into searchable, AI-optimized assets',
        'Architected solution ensuring data sovereignty and scalable performance',
        'Enabled seamless deployment across cloud-native and on-premises infrastructures'
      ]
    },
    {
      company: 'commercetools',
      role: 'Web Developer',
      period: 'Sep 2023 - Aug 2024',
      description: 'Systems, Web Development',
      bullets: [
        'Led front-end development as core member of web engineering team',
        'Collaborated with UX/UI designers to implement pixel-perfect, responsive components',
        'Enhanced user engagement by 40% through optimized component architecture',
        'Architected critical website infrastructure using Statamic CMS'
      ]
    },
    {
      company: 'Lampros Labs',
      role: 'Frontend Developer',
      period: 'Aug 2022 - Sep 2023',
      description: 'User Experience, Web Development',
      bullets: [
        'Delivered full-stack web solutions specializing in custom WordPress development',
        'Engineered themes and plugins increasing site performance by 30%',
        'Led technical implementation using modern PHP patterns and JavaScript frameworks',
        'Created high-fidelity prototypes in Adobe XD streamlining development process'
      ]
    },
    {
      company: 'EdX',
      role: 'Teaching Assistant',
      period: 'Aug 2021 - Oct 2023',
      description: 'Full Stack Web Development Curriculum',
      bullets: [
        'Mentored students in full-stack web development curriculum',
        'Provided code reviews and debugging assistance',
        'Led weekly office hours and technical workshops',
        'Supported 50+ students through bootcamp completion'
      ]
    },
    {
      company: 'First Turn Media',
      role: 'Junior Web Developer',
      period: 'Dec 2020 - May 2022',
      description: 'Custom React site',
      bullets: [
        'Developed custom React applications for client websites',
        'Implemented responsive designs and interactive features',
        'Collaborated with design team to ensure pixel-perfect implementations',
        'Maintained and updated existing client projects'
      ]
    },
    {
      company: 'CodeWizards',
      role: 'Instructor',
      period: 'Aug 2019 - Dec 2020',
      description: 'Instructional Staff',
      bullets: [
        'Taught coding fundamentals to students ages 8-18',
        'Developed curriculum for beginner to advanced courses',
        'Organized and ran coding camps and workshops',
        'Fostered passion for technology in young learners'
      ]
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="bg-slate-900/90 py-28 px-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-12 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl md:text-2xl">02.</span>
            Where I've Worked
            <span className="h-px flex-1 ml-4 hidden md:block bg-slate-100/40" />
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Company tabs */}
          <div className="flex md:flex-col gap-0 overflow-x-auto md:overflow-visible border-b-2 md:border-b-0 md:border-l-2 border-slate-700">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 text-left font-mono text-sm whitespace-nowrap transition-all relative ${
                  activeTab === i
                    ? 'text-cyan-400 bg-slate-800/50'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/30'
                }`}
              >
                {exp.company}
                {activeTab === i && (
                  <motion.div
                    className="absolute left-0 md:left-auto md:right-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-0.5 h-0.5 md:h-full bg-cyan-400"
                    layoutId="activeTab"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Experience details */}
          <div className="flex-1 min-h-[400px]">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: activeTab === i ? 1 : 0, x: activeTab === i ? 0 : 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={activeTab === i ? 'block' : 'hidden'}
              >
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {exp.role}
                  <span className="text-cyan-400"> @ {exp.company}</span>
                </h3>
                <p className="font-mono text-sm text-slate-400 mb-6">{exp.period}</p>
                
                <ul className="space-y-4">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-slate-400">
                      <span className="text-cyan-400 mt-1">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const projects = [
    {
      title: 'View Systems',
      description: 'Spearheaded development of an enterprise-grade AI data transformation platform that revolutionizes document processing. Built sophisticated engine converting diverse formats into searchable, AI-optimized assets with deployable conversational interfaces.',
      tech: ['React', 'TypeScript', 'Docker', 'Tailwind'],
      image: View,
      link: '#'
    },
    {
      title: 'commercetools',
      description: 'Led front-end development as core member of web engineering team. Collaborated with UX/UI designers to implement pixel-perfect, responsive components enhancing user engagement by 40%. Architected critical infrastructure using Statamic CMS.',
      tech: ['JavaScript', 'Statamic', 'HTML', 'CSS'],
      image: commercetools,
      link: 'https://commercetools.com/'
    },
    {
      title: 'Lampros Labs',
      description: 'Delivered full-stack web solutions specializing in custom WordPress development for enterprise clients. Engineered themes and plugins increasing site performance while maintaining security best practices.',
      tech: ['WordPress', 'PHP', 'JavaScript', 'SCSS'],
      image: LamprosLabs,
      link: 'https://www.ocusell.ai/'
    },
    {
      title: 'Vantage IoT Platform',
      description: 'Engineered cutting-edge IoT application for next-generation wristband technology. Implemented robust Angular architecture handling complex state management and API integrations processing millions of data points daily.',
      tech: ['Angular', 'Bootstrap', 'APIs'],
      image: VantageIoTPlatform,
      link: '#'
    },
    {
      title: 'Localeyz',
      description: 'Architected high-performance, SEO-optimized web applications using JAMstack with React, Gatsby, and GraphQL. Championed modern development practices including atomic design and component-driven development.',
      tech: ['React', 'Gatsby', 'GraphQL', 'Tailwind'],
      image: '/_next/static/media/local.c8a7e759.png',
      link: 'https://www.localeyz.io/'
    },
    {
      title: 'Shadow Buddy',
      description: 'Conceptualized and developed innovative personal project showcasing end-to-end product development. Created comprehensive UI/UX designs focusing on accessibility and user-centered design principles.',
      tech: ['React', 'Adobe XD', 'Tailwind'],
      image: Shadow,
      link: 'https://xd.adobe.com/view/b9fe1da9-45f2-4499-a76d-b056ab49cf18-ecad/'
    },
    {
      title: 'DreamMotions',
      description: '',
      tech: ['React'],
      image: Dreammotions,
      link: 'https://dreammotions.vercel.app/'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: parallaxY,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1578554700872-ef0e27c46d37?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-slate-900/70" />
      </motion.div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-12 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl md:text-2xl">03.</span>
            Some Things I've Built
            <span className="h-px bg-slate-400 flex-1 ml-4 hidden md:block" />
          </h2>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className="grid md:grid-cols-12 gap-6 items-center">
        {/* Content - Left side on desktop */}
        <div className="md:col-span-7 relative z-10">
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-lg shadow-xl">
            <p className="text-cyan-400 font-mono text-sm mb-2">Featured Project</p>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-slate-400 leading-relaxed mb-6">
                {project.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              {project.link !== '#' && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 font-mono text-sm"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Visit Site</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Image - Right side on desktop, top on mobile */}
        <motion.div 
          className="md:col-span-5 order-first md:order-last"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: (index * 0.1) + 0.2, ease: "easeOut" }}
        >
          <motion.div 
            className="relative rounded-lg overflow-hidden group-hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative bg-slate-800 rounded-lg overflow-hidden">
              <motion.img
                src={typeof project.image === 'string' ? project.image : project.image.src || project.image}
                alt={project.title}
                className="w-full h-auto object-contain rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-cyan-400/10 group-hover:bg-transparent transition-colors rounded-lg pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={containerRef} className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="text-cyan-400 font-mono text-xl md:text-2xl">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-600">
              Get In Touch
            </h2>
            <span className="h-px w-20 md:w-32 bg-slate-400 hidden md:block" />
          </motion.div>
          <motion.p 
            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            I'm currently looking for new opportunities. Whether you have a question or 
            just want to say hi, my inbox is always open. I look forward to chatting!
          </motion.p>
          
          <motion.a
            href="mailto:ashley@example.com"
            className="inline-block px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded font-mono text-sm hover:bg-cyan-400/10 transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-6 md:hidden">
          {[
            { icon: 'GitHub', href: 'https://github.com/AshleyHart12' },
            { icon: 'LinkedIn', href: 'https://www.linkedin.com/in/ashley-m-hart/' },
            { icon: 'Resume', href: 'https://docs.google.com/document/d/1WFSjgsH9kyKmPK_GQXvxYw8akqwelAJS' }
          ].map((link) => (
            <a
              key={link.icon}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-slate-500 font-mono text-sm">
          Built with Next.js and TailwindCSS
        </p>
      </div>
    </footer>
  );
}

// import {useState, useEffect} from 'react';
// import Head from 'next/head'
// // import Footer from '@components/Footer'
// // import Image from 'next/image'
// import Contact from '../components/contact'
// import Experience from '../components/experience'
// import Projects from '../components/projects'
// import Navbar from '@components/Navbar'
// import About from '../components/About'
// import Typewriter from 'typewriter-effect';

// export default function Home() {
//   // const [pageTitle, setPageTitle] = useState('Ashley Hart Portfolio')
//   // useEffect(() => {
//   //   document.title = pageTitle;
//   // }, [pageTitle])
//   return (
//     <div className="container-fluid">
//       <Head>
//         <title>Ashley Judah</title>
//       </Head>
//         <Navbar />
//         <div className="firstImg">
//           <div className='caption'>
//           <Typewriter
//                     onInit={(typewriter) => {
//                     typewriter.typeString('ASHLEY JUDAH')
//                         .pauseFor(2500)
//                         .start();
//                     }}
//                 />
//             {/* <span className='border'>ASHLEY HART</span> */}
//           </div>
//         </div>
//         <About id="about" title="About" />
//         {/* <div className='secondImg'></div> */}
//         <Experience  />
//         {/* <div className='thirdImg'></div> */}
//         <Projects />
//         {/* <div className='fourthImg'></div> */}
//         <Contact  />
//         {/* <div className='fourthImg'></div> */}
//         {/* <Footer /> */}
//     </div>
//   )
// }
