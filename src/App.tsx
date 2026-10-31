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
import { DiveHud, type DiveToastState } from './components/DiveHud';
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
import { MENU_CHAPTERS } from './data/mosasaurusData';
import {
  calculateDepthMeters,
  findActiveChapterIndex,
  resolveKeyboardDiveAction,
  type DiveActionType,
} from './utils/oceanMath';
import { useScrollAnimations } from './utils/useScrollAnimations';

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
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [diveToast, setDiveToast] = useState<DiveToastState | null>(null);

  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const activeChapterRef = useRef<number>(0);
  const toastTimerRef = useRef<number | null>(null);
  const programmaticJumpUntilRef = useRef<number>(0);

  // Initialize GSAP ScrollTrigger section & element animations
  useScrollAnimations(isLoaded);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const wakeLenisLoop = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (rafIdRef.current !== null) return;

    let idleFrames = 0;
    const tick = (time: number) => {
      const inst = lenisRef.current;
      if (!inst) {
        rafIdRef.current = null;
        return;
      }
      inst.raf(time);
      if (inst.isScrolling) {
        idleFrames = 0;
        rafIdRef.current = window.requestAnimationFrame(tick);
      } else if (idleFrames < 10) {
        idleFrames += 1;
        rafIdRef.current = window.requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
      }
    };
    rafIdRef.current = window.requestAnimationFrame(tick);
  }, []);

  const jumpToChapter = useCallback(
    (targetIdx: number, action: DiveActionType) => {
      const clampedIdx = Math.max(
        0,
        Math.min(MENU_CHAPTERS.length - 1, targetIdx)
      );
      const chapter = MENU_CHAPTERS[clampedIdx];
      if (!chapter) return;

      programmaticJumpUntilRef.current = Date.now() + 1250;
      activeChapterRef.current = clampedIdx;
      setActiveChapterIndex(clampedIdx);

      // Trigger sonar telemetry notification toast
      setDiveToast({
        chapterNumber: chapter.number,
        chapterLabel: chapter.label,
        chapterDepth: chapter.depth,
        action,
        timestamp: Date.now(),
      });
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setDiveToast(null);
      }, 2600);

      const destination =
        clampedIdx === 0
          ? document.documentElement
          : document.querySelector<HTMLElement>(chapter.href);

      if (lenisRef.current && destination) {
        wakeLenisLoop();
        lenisRef.current.scrollTo(clampedIdx === 0 ? 0 : destination, {
          offset: clampedIdx === 0 ? 0 : -16,
          duration: 1.15,
        });
      } else if (destination) {
        if (clampedIdx === 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    [wakeLenisLoop]
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const getSectionOffsets = (): number[] =>
      MENU_CHAPTERS.map((ch, idx) => {
        if (idx === 0) return 0;
        const el = document.querySelector<HTMLElement>(ch.href);
        if (!el) return idx * window.innerHeight;
        const rect = el.getBoundingClientRect();
        return rect.top + (window.scrollY || document.documentElement.scrollTop);
      });

    const updateScrollMetrics = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setScrollProgress(progress);
      setIsScrolledPastHero(scrollTop > 24);

      if (Date.now() >= programmaticJumpUntilRef.current) {
        const offsets = getSectionOffsets();
        const currentChapter = findActiveChapterIndex(
          scrollTop,
          offsets,
          window.innerHeight
        );
        activeChapterRef.current = currentChapter;
        setActiveChapterIndex(currentChapter);
      }
    };

    let lenis: Lenis | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', () => {
        updateScrollMetrics();
        ScrollTrigger.update();
      });

      window.addEventListener('wheel', wakeLenisLoop, { passive: true });
      window.addEventListener('touchstart', wakeLenisLoop, { passive: true });
      window.addEventListener('touchmove', wakeLenisLoop, { passive: true });
    }

    // Intercept anchor clicks (#overview, #contact, etc.) for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const chapterIdx = MENU_CHAPTERS.findIndex((c) => c.href === hash);
      const destination = document.querySelector<HTMLElement>(hash);
      if (!destination) return;
      e.preventDefault();
      if (chapterIdx !== -1) {
        jumpToChapter(
          chapterIdx,
          chapterIdx > activeChapterRef.current
            ? 'dive-deeper'
            : 'ascend-shallower'
        );
      } else if (lenisRef.current) {
        wakeLenisLoop();
        lenisRef.current.scrollTo(destination, {
          offset: -24,
          duration: 1.25,
        });
      } else {
        destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics, { passive: true });
    document.addEventListener('click', handleAnchorClick);
    updateScrollMetrics();

    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
      window.removeEventListener('wheel', wakeLenisLoop);
      window.removeEventListener('touchstart', wakeLenisLoop);
      window.removeEventListener('touchmove', wakeLenisLoop);
      document.removeEventListener('click', handleAnchorClick);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [jumpToChapter, wakeLenisLoop]);

  // Global Keyboard Navigation (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space, Shift+Space, Home, End)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isLoaded || menuOpen) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl) {
        const tag = activeEl.tagName.toLowerCase();
        if (
          tag === 'input' ||
          tag === 'textarea' ||
          tag === 'select' ||
          activeEl.isContentEditable
        ) {
          return;
        }
        // Preserve standard Space/Enter activation when user explicitly tabbed onto a button or link
        if (
          (e.key === ' ' || e.key === 'Spacebar') &&
          (tag === 'button' || tag === 'a' || activeEl.getAttribute('role') === 'button')
        ) {
          return;
        }
      }

      const resolution = resolveKeyboardDiveAction(
        e.key,
        e.shiftKey,
        activeChapterRef.current,
        MENU_CHAPTERS.length
      );
      if (!resolution) return;

      e.preventDefault();
      jumpToChapter(resolution.targetIndex, resolution.action);
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isLoaded, menuOpen, jumpToChapter]);

  const handleBackToSurface = () => {
    jumpToChapter(0, 'resurface');
  };

  const depthMeters = calculateDepthMeters(scrollProgress, 200);

  return (
    <div className="relative min-h-screen bg-[#020E1A] text-[#F4FEFF]">
      {/* Top Ocean-Depth Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[2px] bg-[#F4FEFF]/10"
      >
        <div
          data-testid="scroll-progress-bar"
          className="h-full origin-left bg-gradient-to-r from-[#36D6DE] via-[#7CF4F0] to-[#12A8BE] shadow-[0_0_12px_rgba(124,244,240,0.85)] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Global SVG Duotone, Caustics & Film Grain Filters */}
      <SvgFilters />

      {/* Desktop Bubble Cursor */}
      <CustomCursor />

      {/* Minimal Water-Line Page Loader */}
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Unified Top Navigation (transparent in Hero, floating rounded deep-ocean bar on scroll) */}
      <Nav
        onOpenMenu={() => setMenuOpen(true)}
        isScrolledPastHero={isScrolledPastHero}
      />

      {/* Full-Screen Deep-Navy Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Vertical Ocean Depth Gauge (0 m -> 200 m) with interactive chapter ticks */}
      <DepthGauge
        depthMeters={depthMeters}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={jumpToChapter}
      />

      {/* Deep-Dive Keyboard Navigation HUD & Sonar Telemetry Toast */}
      <DiveHud
        activeChapterIndex={activeChapterIndex}
        diveToast={diveToast}
        onJumpToChapter={jumpToChapter}
      />

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
