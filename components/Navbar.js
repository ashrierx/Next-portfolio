import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';

const SCROLL_THRESHOLD = 80;

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollingUp = scrollY < lastScrollY.current;

      if (scrollY <= SCROLL_THRESHOLD) {
        setIsCompact(false);
      } else if (scrollingUp) {
        setIsCompact(false);
      } else {
        setIsCompact(true);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="navbar navbar-scroll-wrapper"
      initial={false}
      animate={{
        paddingTop: isCompact ? 6 : 15,
        paddingBottom: isCompact ? 6 : 15,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 35,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.848)',
        boxShadow: '0px 5px 10px rgba(188, 181, 192, 0.676)',
      }}
    >
      <Navbar expand="lg" expanded={expanded} style={{ padding: 0 }} className="bg-transparent">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <a href="#about" onClick={() => setExpanded(false)} className="button type2">About</a>
              <a href="#experience" spy={true} smooth={true} duration={300} onClick={() => setExpanded(false)} className="button type2">Experience</a>
              <a href="#projects" spy={true} smooth={true} duration={300} onClick={() => setExpanded(false)} className="button type2">Projects</a>
              <a href="#contact" spy={true} smooth={true} duration={300} onClick={() => setExpanded(false)} className="button type2">Contact</a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation;


