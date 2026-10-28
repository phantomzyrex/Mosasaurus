import {
  ANATOMY_HOTSPOTS,
  FOSSIL_LOCATIONS,
  SIZE_SUBJECTS,
  type AnatomyHotspot,
  type FossilLocation,
} from '../data/mosasaurusData';

export type EstimateMode = 'conservative' | 'maximum';

/**
 * Maps normalized scroll progress [0, 1] to ocean depth in meters [0, maxDepth].
 */
export function calculateDepthMeters(scrollProgress: number, maxDepth = 200): number {
  if (!Number.isFinite(scrollProgress)) return 0;
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  return Math.round(clamped * maxDepth);
}

/**
 * Returns the pelagic depth zone label for a given depth in meters.
 */
export function getPelagicZoneLabel(depthMeters: number): string {
  if (depthMeters < 40) return 'EPIPELAGIC SURFACE';
  if (depthMeters < 110) return 'PHOTIC HUNTING ZONE';
  if (depthMeters < 175) return 'LOWER PHOTIC MARGIN';
  return 'MESOPELAGIC BOUNDARY';
}

/**
 * Computes mouse parallax translation in pixels for a given normalized pointer offset [-1, 1].
 * Respects prefers-reduced-motion by returning zero offset.
 */
export function computeParallaxOffset(
  normX: number,
  normY: number,
  amplitude: number,
  reducedMotion: boolean
): { x: number; y: number } {
  if (reducedMotion || !Number.isFinite(normX) || !Number.isFinite(normY)) {
    return { x: 0, y: 0 };
  }
  const clampedX = Math.max(-1, Math.min(1, normX));
  const clampedY = Math.max(-1, Math.min(1, normY));
  return {
    x: Number((clampedX * amplitude).toFixed(2)),
    y: Number((clampedY * amplitude).toFixed(2)),
  };
}

/**
 * Computes scale comparison metrics for either Conservative (11-12 m) or Maximum Disputed (17 m) mode.
 */
export function getScaleComparisonMetrics(mode: EstimateMode) {
  const maxAxisMeters = 18;
  return SIZE_SUBJECTS.map((subject) => {
    const activeMeters =
      mode === 'maximum' ? subject.maximumMeters : subject.conservativeMeters;
    const widthPercent = Number(
      Math.min(100, Math.max(5, (activeMeters / maxAxisMeters) * 100)).toFixed(2)
    );
    const activeLabel =
      mode === 'maximum'
        ? subject.rangeLabelMaximum
        : subject.rangeLabelConservative;

    return {
      ...subject,
      activeMeters,
      widthPercent,
      activeLabel,
      maxAxisMeters,
    };
  });
}

export function getHotspotById(id: string): AnatomyHotspot {
  return ANATOMY_HOTSPOTS.find((h) => h.id === id) ?? ANATOMY_HOTSPOTS[0];
}

export function getFossilLocationById(id: string): FossilLocation {
  return FOSSIL_LOCATIONS.find((loc) => loc.id === id) ?? FOSSIL_LOCATIONS[0];
}

/**
 * Resolves the target section index [0, totalSections - 1] for global keyboard
 * deep-dive navigation (Arrow keys, Space / Shift+Space, PageDown/PageUp, Home/End).
 * Returns null if the key is not a navigation key.
 */
export function resolveKeyboardDiveTarget(
  currentIndex: number,
  totalSections: number,
  key: string,
  shiftKey = false
): number | null {
  if (totalSections <= 0) return null;
  const clampedCurrent = Math.max(0, Math.min(totalSections - 1, currentIndex));

  if (
    key === 'ArrowDown' ||
    key === 'ArrowRight' ||
    key === 'PageDown' ||
    (key === ' ' && !shiftKey) ||
    (key === 'Spacebar' && !shiftKey)
  ) {
    return Math.min(totalSections - 1, clampedCurrent + 1);
  }

  if (
    key === 'ArrowUp' ||
    key === 'ArrowLeft' ||
    key === 'PageUp' ||
    (key === ' ' && shiftKey) ||
    (key === 'Spacebar' && shiftKey)
  ) {
    return Math.max(0, clampedCurrent - 1);
  }

  if (key === 'Home') {
    return 0;
  }

  if (key === 'End') {
    return totalSections - 1;
  }

  return null;
}

