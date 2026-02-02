import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";

import Lampros from "../images/ocusell.png";
import Vantage from "../images/vantageps.jpg";
import Localeyz from "../images/local.png";
import Barter from "../images/barter.jpg";
import DreamMotions from "../images/dreammotions.png";
import Loslens from "../images/loslens.png";
import Commercetools from "../images/commercetools.png";
import View from "../images/view.png";

export default function About() {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        document
          .querySelectorAll(".modal-backdrop.show")
          .forEach((backdrop) => {
            backdrop.classList.remove("show");
          });
        document.body.style.overflow = "auto";
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function openModal(id) {
    document.getElementById(`backdrop-${id}`).classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    document.getElementById(`backdrop-${id}`).classList.remove("show");
    document.body.style.overflow = "auto";
  }

  function handleBackdropClick(e, id) {
    if (e.target === e.currentTarget) {
      closeModal(id);
    }
  }

  // All modal data in one place
  const projects = [
    {
      id: "view",
      name: "View Systems",
      image: View,
      company: "View Systems",
      tech: ["React", "TypeScript", "Docker", "Tailwind"],
      description: `Spearheaded the development of an enterprise-grade AI data transformation platform that revolutionizes document processing. Built a sophisticated engine capable of converting diverse enterprise formats (PDFs, CSVs, JSON, PPTX) into searchable, AI-optimized assets with deployable conversational interfaces. Architected the solution to ensure data sovereignty, deliver scalable performance, and enable seamless deployment across cloud-native and on-premises infrastructures.`,
    },
    {
      id: "ct",
      name: "commercetools",
      image: Commercetools,
      company: "commercetools",
      tech: ["HTML", "JavaScript", "Statamic"],
      description: `Led front-end development initiatives as a core member of the web engineering team at commercetools, a leading e-commerce platform provider. Collaborated directly with UX/UI designers to implement pixel-perfect, responsive components that enhanced user engagement by 40%. Architected and maintained critical website infrastructure using Statamic CMS, delivering high-performance solutions that supported the company's rapid growth. Demonstrated expertise in balancing technical excellence with business objectives, resulting in reduced page load times and improved conversion rates.`,
    },
    {
      id: "lampros",
      name: "Lampros Labs",
      image: Lampros,
      company: "Lampros Labs",
      tech: ["HTML", "JavaScript", "PHP", "WordPress", "SCSS"],
      description: `Delivered full-stack web solutions as a key developer at Lampros Labs, specializing in custom WordPress development for enterprise clients. Engineered themes and plugins that increased client site performance while maintaining security best practices. Led the technical implementation of complex features using modern PHP patterns and JavaScript frameworks, while creating high-fidelity prototypes in Adobe XD that streamlined the development process. Successfully managed multiple concurrent projects, consistently delivering ahead of schedule and exceeding client expectations for functionality and design excellence.`,
    },
    {
      id: "vantage",
      name: "Vantage",
      image: Vantage,
      company: "Vantage",
      tech: ["Angular", "Bootstrap", "APIs"],
      description: `Engineered a cutting-edge IoT application for next-generation wristband technology at Vantage, focusing on real-time data synchronization and user experience. Implemented robust Angular architecture that handled complex state management and API integrations. Collaborated with cross-functional teams to deliver a scalable solution that processed millions of data points daily.`,
    },
    {
      id: "localeyz",
      name: "Localeyz",
      image: Localeyz,
      company: "Localeyz",
      tech: ["React", "GraphQL", "Tailwind"],
      description: `Architected high-performance, SEO-optimized web applications using the JAMstack approach with React, Gatsby, and GraphQL. Implemented sophisticated data fetching strategies that improved page load speeds. Provided expert-level technical consultation for enterprise Drupal implementations, developing comprehensive documentation and training materials that empowered client teams. Championed modern development practices including atomic design principles and component-driven development.`,
      link: {
        label: "View the site",
        url: "https://localeyz.io/",
      },
    },
    {
      id: "shadow",
      name: "Barter Builds",
      image: Barter,
      company: "Barter Builds",
      tech: ["React", "Tailwind", "Typescript", "Next.js", "Postgres", "Framer Motion"],
      description: `Barter Builds is a community-driven platform where development work is traded for local business services. This project served as a case study in "vibe coding", leveraging AI to accelerate the development lifecycle from schema design to final UI polish`,
      link: {
        label: "View the completed project",
        url: "https://barterbuilds.com/",
      },
    },
    {
      id: "dream",
      name: "DreamMotions",
      image: DreamMotions,
      company: "DreamMotions",
      tech: ["React", "Tailwind", "Typescript", "Vite", "Vercel", "OpenAI API", "Firebase", "Framer Motion"],
      description: `An AI-powered dream analysis web app. 

Powered by the OpenAI API and a carefully crafted prompt, DreamMotions breaks your dreams into Primary Emotions, Symbolic Interpretation, Psychological Insights, Archetypal Themes, and Practical Takeaways.

You can change the app theme based on your current mood, explore an analytics dashboard to uncover recurring emotions and symbols, and keep track of past dreams for personal reflection.`,
      link: {
        label: "View the site",
        url: "https://dreammotions.vercel.app/",
      },
    }
    // {
    //   id: "loslens",
    //   name: "Lo's Lens",
    //   image: Loslens,
    //   company: "Lo's Lens",
    //   tech: ["WordPress"],
    //   description: `Designed and developed a premium WordPress portfolio for a professional pet photography business, focusing on visual storytelling and conversion optimization. Implemented a custom gallery system that showcases high-resolution imagery while maintaining optimal performance across all devices. Integrated advanced SEO strategies and user-friendly content management capabilities. Provided comprehensive client training and ongoing support, ensuring sustainable business growth through effective digital presence.`,
    //   link: {
    //     label: "Visit the live site",
    //     url: "https://www.loslens.com",
    //   },
    // },
  ];

  return (
    <section id="projects">
      <div className="container project-container">
        <div className="text-center p-5 project-headline">
          <h3>PROJECTS</h3>
        </div>

        {/* Project grid */}
        <div className="row mt-4 text-center d-flex flex-row justify-content-center">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="project-img col-md-4"
              onClick={() => openModal(proj.id)}
            >
              <Image
                src={proj.image}
                width={375}
                height={230}
                alt={proj.name}
                className="projectImage"
              />
            </div>
          ))}
        </div>

        {/* Modals */}
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="modal-backdrop"
            id={`backdrop-${proj.id}`}
            onClick={(e) => handleBackdropClick(e, proj.id)}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="btn-close absolute-close"
                onClick={() => closeModal(proj.id)}
                aria-label="Close"
                style={{ backgroundColor: "black" }}
              />

              <div className="modal-content-wrapper">
                <div className="modal-image-container">
                  <Image
                    src={proj.image}
                    width={200}
                    height={120}
                    alt={`${proj.name} Project`}
                    className="modal-top-image"
                  />
                </div>
                <div className="modal-text-content">
                  {/* Header */}
                  <div>
                    <h3 className="modal-company">Company</h3>
                    <p>{proj.company}</p>
                  </div>
                  {/* Tech stack */}
                  <div className="tech-stack">
                    <h3 className="modal-company">Tech Stack</h3>
                    <div className="tech-stack-list">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Description */}
                  <div>
                    <h3 className="modal-company">Project Description</h3>
                    <p>{proj.description}</p>
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      {proj.link.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
