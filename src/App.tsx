/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnatomyHotspots } from './components/AnatomyHotspots';
import { CustomCursor } from './components/CustomCursor';
import { DepthGauge } from './components/DepthGauge';
import { Diet } from './components/Diet';
import { Extinction } from './components/Extinction';
import { FastFacts } from './components/FastFacts';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { Loader } from './components/Loader';
import { Map } from './components/Map';
import { MenuOverlay } from './components/MenuOverlay';
import { MythReality } from './components/MythReality';
import { Nav } from './components/Nav';
import { Overview } from './components/Overview';
import { SizeCompare } from './components/SizeCompare';
import { SvgFilters } from './components/SvgFilters';
import { Taxonomy } from './components/Taxonomy';
import { Timeline } from './components/Timeline';
import { calculateDepthMeters } from './utils/oceanMath';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const updateScrollMetrics = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setScrollProgress(progress);
      setIsScrolledPastHero(scrollTop > window.innerHeight * 0.85);
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics, { passive: true });
    updateScrollMetrics();

    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleBackToSurface = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const depthMeters = calculateDepthMeters(scrollProgress, 200);

  return (
    <div className="relative min-h-screen bg-[#020E1A] text-[#F4FEFF]">
      {/* Global SVG Duotone, Caustics & Film Grain Filters */}
      <SvgFilters />

      {/* Desktop Bubble Cursor */}
      <CustomCursor />

      {/* Minimal Water-Line Page Loader */}
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Sticky Top Navigation when descended below the Hero frame */}
      {isScrolledPastHero && (
        <Nav onOpenMenu={() => setMenuOpen(true)} isScrolledPastHero={true} />
      )}

      {/* Full-Screen Deep-Navy Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Vertical Ocean Depth Gauge (0 m -> 200 m) */}
      <DepthGauge depthMeters={depthMeters} />

      {/* Main Content */}
      <main>
        {/* 01 HERO */}
        <Hero
          onOpenMenu={() => setMenuOpen(true)}
          isLoaded={isLoaded}
          scrollProgress={scrollProgress}
        />

        {/* 02 OVERVIEW */}
        <Overview />

        {/* 03 DISCOVERY AND HISTORY */}
        <Timeline />

        {/* 04 ANATOMY */}
        <AnatomyHotspots />

        {/* 05 SIZE COMPARISON */}
        <SizeCompare />

        {/* 06 DIET AND HUNTING */}
        <Diet />

        {/* 07 HABITAT AND DISTRIBUTION */}
        <Map />

        {/* 08 CLASSIFICATION AND SPECIES */}
        <Taxonomy />

        {/* 09 EVOLUTION AND EXTINCTION */}
        <Extinction />

        {/* 10 MYTH VS REALITY */}
        <MythReality />

        {/* 11 GALLERY */}
        <Gallery />

        {/* 12 FAST FACTS AND SOURCES */}
        <FastFacts />
      </main>

      {/* 13 CONTACT AND FOOTER */}
      <Footer onBackToSurface={handleBackToSurface} />
    </div>
  );
}
