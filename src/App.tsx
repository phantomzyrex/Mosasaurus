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
import {
  MENU_CHAPTERS,
  MOSASAURUS_ROAR_AUDIO_PATH,
} from './data/mosasaurusData';
import {
  calculateDepthMeters,
  resolveKeyboardDiveTarget,
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
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [diveToast, setDiveToast] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const roarAudioRef = useRef<HTMLAudioElement | null>(null);
  const shakeTimeoutRef = useRef<number | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const hasAutoRoaredRef = useRef(false);
  const activeChapterIdxRef = useRef(0);

  // Initialize GSAP ScrollTrigger section & element animations
  useScrollAnimations(isLoaded);

  // Trigger 2-second screen shake + Mosasaurus roar sound effect
  const triggerRoarAndShake = useCallback(
    async (playAudio = true): Promise<boolean> => {
      if (shakeTimeoutRef.current !== null) {
        window.clearTimeout(shakeTimeoutRef.current);
      }
      setIsShaking(false);
      // Force reflow on next frame so repeated triggers restart the 2s CSS animation cleanly
      window.requestAnimationFrame(() => {
        setIsShaking(true);
      });
      shakeTimeoutRef.current = window.setTimeout(() => {
        setIsShaking(false);
        shakeTimeoutRef.current = null;
      }, 2000);

      if (!playAudio || !roarAudioRef.current) return true;
      try {
        roarAudioRef.current.currentTime = 0;
        roarAudioRef.current.volume = 0.85;
        await roarAudioRef.current.play();
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Automatically play Mosasaurus roar + 2-second screen shake when the page opens
  useEffect(() => {
    if (!isLoaded || hasAutoRoaredRef.current) return;
    hasAutoRoaredRef.current = true;

    let unlockCleanup: (() => void) | null = null;

    const runInitialRoar = async () => {
      const audioPlayed = await triggerRoarAndShake(true);
      if (!audioPlayed) {
        // Browser blocked unmuted autoplay before gesture: unlock roar + 2s shake on first interaction
        const handleFirstGesture = () => {
          void triggerRoarAndShake(true);
          if (unlockCleanup) unlockCleanup();
        };
        window.addEventListener('pointerdown', handleFirstGesture, {
          once: true,
          passive: true,
        });
        window.addEventListener('keydown', handleFirstGesture, {
          once: true,
          passive: true,
        });
        window.addEventListener('touchstart', handleFirstGesture, {
          once: true,
          passive: true,
        });
        unlockCleanup = () => {
          window.removeEventListener('pointerdown', handleFirstGesture);
          window.removeEventListener('keydown', handleFirstGesture);
          window.removeEventListener('touchstart', handleFirstGesture);
        };
      }
    };

    void runInitialRoar();

    return () => {
      if (unlockCleanup) unlockCleanup();
    };
  }, [isLoaded, triggerRoarAndShake]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const detectActiveChapter = () => {
      const probeY = window.innerHeight * 0.35;
      let bestIdx = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      MENU_CHAPTERS.forEach((chapter, idx) => {
        const el = document.querySelector<HTMLElement>(chapter.href);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Prefer the chapter whose top is at or just above probeY, or closest overall
        if (rect.top <= probeY && rect.bottom >= 100) {
          bestIdx = idx;
          bestDistance = 0;
        } else if (bestDistance > 0) {
          const dist = Math.abs(rect.top - probeY);
          if (dist < bestDistance) {
            bestDistance = dist;
            bestIdx = idx;
          }
        }
      });

      activeChapterIdxRef.current = bestIdx;
      setActiveChapterIdx(bestIdx);
    };

    const updateScrollMetrics = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      setScrollProgress(progress);
      setIsScrolledPastHero(scrollTop > window.innerHeight * 0.85);
      detectActiveChapter();
    };

    let lenis: Lenis | null = null;
    let idleFrames = 0;

    const runLenisLoop = (time: number) => {
      if (!lenis) return;
      lenis.raf(time);
      if (lenis.isScrolling) {
        idleFrames = 0;
        rafIdRef.current = window.requestAnimationFrame(runLenisLoop);
      } else if (idleFrames < 10) {
        idleFrames += 1;
        rafIdRef.current = window.requestAnimationFrame(runLenisLoop);
      } else {
        rafIdRef.current = null;
      }
    };

    const wakeLenis = () => {
      if (!lenis) return;
      idleFrames = 0;
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(runLenisLoop);
      }
    };

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

      window.addEventListener('wheel', wakeLenis, { passive: true });
      window.addEventListener('touchstart', wakeLenis, { passive: true });
      window.addEventListener('touchmove', wakeLenis, { passive: true });
      window.addEventListener('keydown', wakeLenis, { passive: true });
    }

    // Smoothly scroll to a specific chapter index [0..12]
    const scrollToChapterIndex = (targetIdx: number, directionLabel?: string) => {
      const chapter = MENU_CHAPTERS[targetIdx];
      if (!chapter) return;
      const destination = document.querySelector<HTMLElement>(chapter.href);
      if (!destination) return;

      activeChapterIdxRef.current = targetIdx;
      setActiveChapterIdx(targetIdx);

      if (directionLabel) {
        setDiveToast(
          `${directionLabel} · CH ${chapter.number} · ${chapter.label.toUpperCase()} (${chapter.depth})`
        );
        if (toastTimeoutRef.current !== null) {
          window.clearTimeout(toastTimeoutRef.current);
        }
        toastTimeoutRef.current = window.setTimeout(() => {
          setDiveToast(null);
          toastTimeoutRef.current = null;
        }, 2200);
      }

      if (lenisRef.current) {
        wakeLenis();
        lenisRef.current.scrollTo(destination, {
          offset: targetIdx === 0 ? 0 : -24,
          duration: 1.15,
        });
      } else {
        destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Global Keyboard Navigation (Arrow keys, Space / Shift+Space, PageDown/PageUp, Home/End)
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.altKey || e.metaKey) return;
      if (document.querySelector('[role="dialog"]')) return;

      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
        // Allow Space/Enter to activate focused buttons or links normally
        if (
          (e.key === ' ' || e.key === 'Spacebar') &&
          (tag === 'BUTTON' || tag === 'A')
        ) {
          return;
        }
      }

      const currentIdx = activeChapterIdxRef.current;
      const nextIdx = resolveKeyboardDiveTarget(
        currentIdx,
        MENU_CHAPTERS.length,
        e.key,
        e.shiftKey
      );

      if (nextIdx === null) return;
      e.preventDefault();

      const directionLabel =
        nextIdx > currentIdx
          ? 'DESCENDING'
          : nextIdx < currentIdx
            ? 'ASCENDING'
            : nextIdx === 0
              ? 'SURFACE HORIZON'
              : 'ABYSSAL FLOOR';

      scrollToChapterIndex(nextIdx, directionLabel);
    };

    // Intercept anchor clicks (#overview, #contact, etc.) for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const destination = document.querySelector<HTMLElement>(hash);
      if (!destination) return;
      e.preventDefault();
      if (lenisRef.current) {
        wakeLenis();
        lenisRef.current.scrollTo(destination, {
          offset: hash === '#hero' ? 0 : -24,
          duration: 1.25,
        });
      } else {
        destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics, { passive: true });
    window.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('click', handleAnchorClick);
    updateScrollMetrics();

    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
      window.removeEventListener('wheel', wakeLenis);
      window.removeEventListener('touchstart', wakeLenis);
      window.removeEventListener('touchmove', wakeLenis);
      window.removeEventListener('keydown', wakeLenis);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('click', handleAnchorClick);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleBackToSurface = () => {
    activeChapterIdxRef.current = 0;
    setActiveChapterIdx(0);
    if (lenisRef.current) {
      if (rafIdRef.current === null) {
        const tick = (t: number) => {
          if (!lenisRef.current) return;
          lenisRef.current.raf(t);
          if (lenisRef.current.isScrolling) {
            rafIdRef.current = window.requestAnimationFrame(tick);
          } else {
            rafIdRef.current = null;
          }
        };
        rafIdRef.current = window.requestAnimationFrame(tick);
      }
      lenisRef.current.scrollTo(0, { duration: 1.35 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const depthMeters = calculateDepthMeters(scrollProgress, 200);
  const activeChapter = MENU_CHAPTERS[activeChapterIdx] ?? MENU_CHAPTERS[0];

  return (
    <div className="relative min-h-screen bg-[#020E1A] text-[#F4FEFF]">
      {/* Preloaded Mosasaurus Roar Audio Element */}
      <audio
        ref={roarAudioRef}
        src={MOSASAURUS_ROAR_AUDIO_PATH}
        preload="auto"
        data-testid="mosasaurus-roar-audio"
      />

      {/* Acoustic Shockwave Ring Overlay during 2-second Roar Tremor */}
      {isShaking && (
        <div
          aria-hidden="true"
          data-testid="roar-shockwave-overlay"
          className="pointer-events-none fixed inset-0 z-[65] overflow-hidden"
        >
          <div className="animate-roar-ring absolute top-1/2 left-1/2 h-[42vw] w-[42vw] rounded-full border-2 border-[#7CF4F0]/50 shadow-[0_0_90px_rgba(124,244,240,0.45)]" />
        </div>
      )}

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

      {/* Sticky Top Navigation when descended below the Hero frame */}
      {isScrolledPastHero && (
        <Nav onOpenMenu={() => setMenuOpen(true)} isScrolledPastHero={true} />
      )}

      {/* Full-Screen Deep-Navy Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Vertical Ocean Depth Gauge (0 m -> 200 m) */}
      <DepthGauge depthMeters={depthMeters} />

      {/* Bottom-Left Deep-Dive Keyboard Navigation HUD & Acoustic Roar Trigger */}
      <div
        data-testid="deep-dive-hud"
        className="fixed bottom-4 left-4 z-40 hidden items-center gap-3 md:flex"
      >
        {/* Acoustic Roar + 2s Tremor Replay Button */}
        <button
          type="button"
          onClick={() => void triggerRoarAndShake(true)}
          data-testid="roar-trigger-btn"
          title="Play Mosasaurus acoustic roar & 2-second abyssal tremor"
          className={`group inline-flex items-center gap-2 border px-3 py-1.5 font-mono-tabular text-[10px] tracking-[0.18em] uppercase backdrop-blur-md transition-all duration-300 ${
            isShaking
              ? 'border-[#7CF4F0] bg-[#07405F]/90 text-[#7CF4F0] shadow-[0_0_20px_rgba(124,244,240,0.45)]'
              : 'border-[#F4FEFF]/15 bg-[#020E1A]/80 text-[#F4FEFF]/75 hover:border-[#7CF4F0]/60 hover:text-[#7CF4F0]'
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full bg-[#7CF4F0] ${
              isShaking ? 'animate-ping' : 'opacity-75 group-hover:opacity-100'
            }`}
          />
          <span>{isShaking ? 'SEISMIC ROAR ACTIVE' : 'ROAR SOUND'}</span>
        </button>

        {/* Keyboard Deep-Dive Status Indicator */}
        <div
          data-testid="keyboard-dive-status"
          className="flex items-center gap-2.5 border border-[#F4FEFF]/12 bg-[#020E1A]/75 px-3 py-1.5 font-mono-tabular text-[10px] tracking-[0.16em] text-[#F4FEFF]/65 uppercase backdrop-blur-md"
        >
          <span className="text-[#7CF4F0]">↑↓ / SPACE</span>
          <span aria-hidden="true" className="text-[#F4FEFF]/25">
            ·
          </span>
          <span data-testid="active-chapter-indicator" className="text-[#F4FEFF]/85">
            {diveToast ?? `CH ${activeChapter.number} · ${activeChapter.depth}`}
          </span>
        </div>
      </div>

      {/* Main Content Wrapper with 2-second Roar Screen Shake */}
      <div
        data-testid="shake-viewport"
        className={isShaking ? 'animate-roar-shake' : ''}
      >
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
    </div>
  );
}

