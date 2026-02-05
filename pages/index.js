
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import View from '../images/view.png';
import commercetools from '../images/ct.png';
import LamprosLabs from '../images/lampros.png';
import VantageIoTPlatform from '../images/Vantage.png';
import Shadow from '../images/barterbuilds.png';
import Dreammotions from '../images/dreammotions.png';
import Localeyz from '../images/localeyzmain.png'
import Macbook from '../images/macbook.png';
import Headshot from '../images/Headshot.jpg';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      /> */}

      <div className="relative z-10 mx-4 pt-20 mb-4">
        {/* Neon blue border outline - starts above nav, ends after footer */}
        <div className="absolute inset-0 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_40px_rgba(34,211,238,0.3)] rounded-lg pointer-events-none" />

        <div className="relative">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          {/* <ContactSection /> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // 0 when at top, 1 as soon as user scrolls ~80px
  const scrolled = useTransform(scrollY, [0, 600, 800], [0, 0, 1]);

  // Smooth the scroll value
  const scrolledSpring = useSpring(scrolled, {
    stiffness: 100,
    damping: 30,
  });

  const navScale = useTransform(scrolledSpring, [0, 1], [1, 0.98]);
  const navPadding = useTransform(scrolledSpring, [0, 1], ['1rem', '0.75rem']);

  // Dark layer fades OUT when scrolling
  const darkOpacity = useTransform(scrolledSpring, [0, 1], [1, 0]);

  // Light layer fades IN when scrolling
  const lightOpacity = useTransform(scrolledSpring, [0, 1], [0, 1]);

  // Swish animation for the light background
  const swishClipPath = useTransform(scrolledSpring, (value) => {
    const eased = 1 - Math.pow(1 - value, 3);
    const x = (1 - eased) * -100;
    return `inset(0 ${x}% 0 0)`;
  });

  // Logo/AJ text color: light when dark bg, dark when light bg
  const logoColor = useTransform(
    scrolledSpring,
    [0, 1],
    ['rgb(241, 245, 249)', 'rgb(15, 23, 42)']
  );

  // Link text color: slate-400 when dark bg, slate-700 when light bg
  const linkColor = useTransform(
    scrolledSpring,
    [0, 1],
    ['rgb(148, 163, 184)', 'rgb(51, 65, 85)']
  );

  // Mobile menu background
  const mobileBgColor = useTransform(
    scrolledSpring,
    [0, 1],
    ['rgba(15, 23, 42, 0.95)', 'rgba(255, 255, 255, 0.95)']
  );

  // Mobile menu border
  const mobileBorderColor = useTransform(
    scrolledSpring,
    [0, 1],
    ['rgba(148, 163, 184, 0.1)', 'rgba(226, 232, 240, 1)']
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 overflow-visible mx-[2px]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-6 relative">
        {/* Dark background (default at top) - Dark Blue/Slate */}
        <motion.div
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"
          style={{ opacity: darkOpacity }}
        />

        {/* Light background (revealed on scroll) - White */}
        <motion.div
          className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-slate-200 rounded-t-lg"
          style={{
            clipPath: swishClipPath,
            opacity: lightOpacity,
          }}
        />

        <motion.div
          className="relative max-w-7xl mx-auto px-6 flex justify-between items-center"
          style={{
            paddingTop: navPadding,
            paddingBottom: navPadding,
            scale: navScale
          }}
        >
          <div className="flex flex-col gap-3">
            <motion.div
              className="text-2xl font-bold tracking-tight relative z-10"
              whileHover={{ scale: 1.05 }}
              style={{ color: logoColor }}
            >
              AJ
            </motion.div>

            {/* Social icons under logo */}
            <div className="flex gap-3 relative z-10">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ), href: 'https://github.com/ashrierx'
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ), href: 'https://www.linkedin.com/in/ashley-m-judah/'
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ), href: 'https://drive.proton.me/urls/V87WXC8JHM#a4YsNngqQQM9'
                }
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
          >
            <motion.span
              className="w-6 h-0.5 origin-center"
              style={{ backgroundColor: logoColor }}
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5"
              style={{ backgroundColor: logoColor }}
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 origin-center"
              style={{ backgroundColor: logoColor }}
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden relative backdrop-blur-md rounded-b-lg overflow-hidden"
          initial={false}
          animate={{
            maxHeight: isMobileMenuOpen ? 300 : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            backgroundColor: mobileBgColor,
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: mobileBorderColor,
            zIndex: 50,
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
            Software Engineer.
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            I specialize in building exceptional digital experiences.
            I focus on creating performant, secure, and
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
    <section id="about" ref={containerRef} className="mx-[2px]">
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
            className="md:col-span-2 space-y-6 text-slate-500 leading-relaxed text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p>
              I specialize in frontend and full-stack web development, with experience building scalable React applications, admin portals, and API-driven dashboards. I have a proven track record of shipping weekly production features, improving performance and developer workflows, and reducing operational friction.
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
              <div className="aspect-square bg-slate-800 relative">
                {/* <InteractiveCharacter /> */}
                <img
                  src={typeof Headshot === 'string' ? Headshot : (Headshot.src || Headshot)}
                  alt="artist profile sketch"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-auto object-cover mix-blend-luminosity opacity-80"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-cyan-400/20 rounded translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform h-[440px]" />
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
        'Delivered weekly production feature releases for a React-based dashboard, improving user experience and expanding API-driven functionality',
        'Architected and implemented an internal bug-tracking system with role-based access, increasing workflow transparency and improving team productivity by 20%',
        'Developed and launched an admin and authorization portal using TanStack Query and token-based authentication, cutting user onboarding time by up to 50% while strengthening access security',
      ]
    },
    {
      company: 'commercetools',
      role: 'Web Developer - contract',
      period: 'Sep 2023 - Aug 2024',
      description: 'Systems, Web Development',
      bullets: [
        'Directed website rebrand, converting legacy code to modern CSS variables, increasing maintainability and cutting update cycles by up to 25%',
        'Served on-call rotation with international team to diagnose and resolve site failures, collaborating with overseas security firm to ensure uptime and security',
        'Partnered with SEO specialists to implement optimization strategies that improved site discoverability and search engine rankings',
      ]
    },
    {
      company: 'Lampros Labs',
      role: 'Frontend Developer - contract',
      period: 'Aug 2022 - Sep 2023',
      description: 'User Experience, Web Development',
      bullets: [
        'Collaborated with a cross-functional team to design, develop, and deploy custom WordPress sites, utilizing themes and plugins to meet client needs',
        'Led feature development through detailed mockups and wireframes, accelerating prototyping and shortening deployment time by 20%',
        'Managed and optimized Google Ads campaigns across various media sizes, increasing client reach and engagement',
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
      company: 'Localeyz',
      role: 'Junior Web Developer',
      period: 'Dec 2020 - May 2022',
      description: 'Custom React site',
      bullets: [
        'Created training videos and documentation for clients, teaching them how to build and customize Drupal components via our internal patofrm',
        'Assisted in integrating multilingual support into client websites, implementing language translation features and ensuring global accessibility',
        'Led a redesign and implementation of the company website using React and GraphQL, improving performance, user experience, and maintainability',
      ]
    },
    {
      company: 'CodeWizards',
      role: 'Instructor',
      period: 'Aug 2019 - Dec 2020',
      description: 'Instructional Staff',
      bullets: [
        'Taught coding fundamentals to students ages 8-18',
        'Led CodeWizards capstone project for 15 students, guiding development of a live website for a local nonprofit',
        'Delivered engaging curriculum in Python, JavaScript, and Scratch, improving student outcomes and participation rates across multiple grade levels',
      ]
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="bg-slate-900/90 py-28 px-6 relative mx-[2px]">
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
                className={`px-6 py-3 text-left font-mono text-sm whitespace-nowrap transition-all relative ${activeTab === i
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
      description: 'Spearheaded development of an enterprise-grade AI data transformation platform that revolutionizes document processing. Developed and launched an admin and authorization portal using TanStack Query and token-based authentication.',
      tech: ['React', 'TypeScript', 'Docker', 'Tailwind', 'Tanstack Query'],
      image: View,
      // link: '#'
    },
    {
      title: 'commercetools',
      description: 'Led front-end development as core member of web engineering team. Collaborated with UX/UI designers to implement pixel-perfect, responsive components enhancing user engagement. Architected critical infrastructure using Statamic CMS.',
      tech: ['JavaScript', 'Statamic', 'HTML', 'CSS'],
      image: commercetools,
      link: 'https://commercetools.com/'
    },
    {
      title: 'Lampros Labs',
      description: 'Delivered full-stack web solutions specializing in custom WordPress development for enterprise clients. Engineered themes and plugins increasing site performance while maintaining security best practices.',
      tech: ['WordPress', 'PHP', 'JavaScript', 'SCSS'],
      image: LamprosLabs,
      link: 'https://lamproslabs.com/'
    },
    {
      title: 'Vantage Kiosk Platform',
      description: 'Engineered cutting-edge IoT application for next-generation wristband technology. Implemented robust Angular architecture handling complex state management and API integrations processing millions of data points daily.',
      tech: ['Angular', 'Bootstrap', 'APIs'],
      image: VantageIoTPlatform,
      link: 'https://www.vantage.sh/about'
    },
    {
      title: 'Localeyz',
      description: 'Architected high-performance, SEO-optimized web applications using JAMstack with React, Gatsby, and GraphQL. Championed modern development practices including atomic design and component-driven development.',
      tech: ['React', 'Gatsby', 'GraphQL', 'Tailwind'],
      image: Localeyz,
      link: 'https://www.localeyz.io/'
    },
    {
      title: 'Barter Builds',
      description: 'Barter Builds is a community-driven platform where development work is traded for local business services. This project served as a case study in "vibe coding", leveraging AI to accelerate the development lifecycle from schema design to final UI polish.',
      tech: ['React', 'Tailwind', 'Typescript', 'Next.js', 'PostgreSQL'],
      image: Shadow,
      link: 'https://barterbuilds.com/'
    },
    {
      title: 'DreamMotions',
      description: 'An AI-powered dream analysis web app. Powered by the OpenAI API and a carefully crafted prompt, DreamMotions breaks your dreams into Primary Emotions, Symbolic Interpretation, Psychological Insights, Archetypal Themes, and Practical Takeaways.Change the app theme based on your current mood, explore an analytics dashboard to uncover recurring emotions and symbols, and keep track of past dreams for personal reflection.',
      tech: ['React', 'Typescript', 'Firebase', 'OpenAI API', 'Vite', 'Vercel'],
      image: Dreammotions,
      link: 'https://dreammotions.vercel.app/'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 mx-[2px] relative overflow-hidden">
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

        <div className="space-y-16">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="
        group
        grid grid-cols-1 md:grid-cols-4
        overflow-hidden
        rounded-xl
        border border-cyan-400/20
        bg-slate-900/60
        backdrop-blur
      "
    >
      {/* IMAGE — 1/4 */}
      <div className="relative md:col-span-1 order-1 md:order-2 bg-slate-800 flex items-center justify-center p-4">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative w-full max-w-[220px]"
        >
          {/* Project image inside laptop */}
          <div className="absolute top-[7%] left-[11%] w-[78%] h-[78%] overflow-hidden rounded-sm z-10">
            <img
              src={typeof project.image === 'string' ? project.image : project.image.src || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Macbook frame */}
          <img
            src={typeof Macbook === 'string' ? Macbook : Macbook.src || Macbook}
            alt="MacBook mockup"
            className="relative z-20 w-full"
          />

          {/* Glow */}
          <div className="absolute inset-0 bg-cyan-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>

      {/* TEXT — 3/4 */}
      <div className="md:col-span-3 order-2 md:order-1 p-8 bg-slate-900 text-slate-200">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-100 mb-4">
              {project.title}
            </h3>

            <p className="text-slate-400 leading-relaxed mb-6">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-3 text-sm font-mono">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {project.link && (
            <div className="pt-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Project →
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="" ref={containerRef} className="py-32 px-6 mx-[2px]">
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

function InteractiveFooter() {
  const footerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const lineCount = 40;

  // 1. Updated Data with URLs
  const footerLinks = [
    { name: 'GitHub', url: 'https://github.com/ashrierx' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ashley-m-judah/' },
    { name: 'Email', url: 'mailto:ajudah2@pm.me' },
    { name: 'Resume', url: 'https://drive.proton.me/urls/V87WXC8JHM#a4YsNngqQQM9' }
  ];

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mt-8 mx-[2px] bg-slate-900 pt-20 pb-12 overflow-hidden border-b-2 border-cyan-400 rounded-lg"
      id="contact"
    >
      {/* Top Content: Links */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-cyan-400 font-mono text-xl md:text-2xl">04.</span>
            Let's Talk
            <span className="h-px bg-slate-700 flex-1 ml-4 hidden md:block" />
          </h2>


        <div className="flex justify-center gap-8 mb-20">
          {footerLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url} // 2. Applied the URL here
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-cyan-400 hover:text-white transition-colors"
              whileHover={{ y: -5 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>

      {/* 3. The Magnetic Lines: Positioned between Links and Copyright */}
      <div className="relative w-full h-12 flex items-end justify-around px-4 pointer-events-none mb-10">
        {[...Array(lineCount)].map((_, i) => {
          const archHeight = Math.sin((i / (lineCount - 1)) * Math.PI) * 40;
          return (
            <MagneticLine
              key={i}
              index={i}
              mousePos={mousePos}
              isHovered={isHovered}
              baseHeight={15 + archHeight}
              footerRef={footerRef}
              totalLines={lineCount}
            />
          );
        })}
      </div>

      {/* Bottom Content: Copyright */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="pt-8 border-t border-slate-800 text-slate-500 text-xs font-mono uppercase tracking-widest">
          Designed & Built by Ashley Judah © 2026
        </div>
      </div>
    </footer>
  );
}

function MagneticLine({ mousePos, isHovered, baseHeight, index, totalLines, footerRef }) {
  // Use springs for that "weighted" physics feel
  const springConfig = { stiffness: 150, damping: 15 };
  const height = useSpring(baseHeight, springConfig);
  const rotate = useSpring(0, springConfig);

  useEffect(() => {
    if (!isHovered || !footerRef.current) {
      height.set(baseHeight);
      rotate.set(0);
      return;
    }

    const rect = footerRef.current.getBoundingClientRect();
    const lineX = (index / (totalLines - 1)) * rect.width;

    // Distance calculation
    const dist = Math.abs(mousePos.x - lineX);
    const proximity = Math.max(0, 150 - dist) / 150; // Influence radius of 150px

    // Apply physics: Tallest when cursor is over it, leaning toward cursor
    height.set(baseHeight + (proximity * 80));
    rotate.set((mousePos.x - lineX) * 0.2 * proximity);

  }, [mousePos, isHovered]);

  return (
    <motion.div
      style={{
        height,
        rotate,
        originY: "100%",
        backgroundColor: `hsl(197, 75%, 52%)`,
        boxShadow: isHovered ? `0 0 15px hsl(${190 + (index * 2)}, 80%, 50%, 0.5)` : 'none'
      }}
      className="w-1 md:w-1.5 rounded-full transition-shadow duration-300"
    />
  );
}

function Footer() {
  return (
    <InteractiveFooter />
    // <footer className="py-12 px-6 text-center">
    //   <div className="flex flex-col items-center gap-6">
    //     <div className="flex gap-6 md:hidden">
    //       {[
    //         { icon: 'GitHub', href: 'https://github.com/AshleyHart12' },
    //         { icon: 'LinkedIn', href: 'https://www.linkedin.com/in/ashley-m-hart/' },
    //         { icon: 'Resume', href: 'https://docs.google.com/document/d/1WFSjgsH9kyKmPK_GQXvxYw8akqwelAJS' }
    //       ].map((link) => (
    //         <a
    //           key={link.icon}
    //           href={link.href}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
    //         >
    //           {link.icon}
    //         </a>
    //       ))}
    //     </div>
    //     <p className="text-slate-500 font-mono text-sm">
    //       Built with Next.js and TailwindCSS
    //     </p>
    //   </div>
    // </footer>
  );
}
