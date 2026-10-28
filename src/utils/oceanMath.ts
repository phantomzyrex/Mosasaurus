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

export type DiveActionType =
  | 'dive-deeper'
  | 'ascend-shallower'
  | 'resurface'
  | 'abyss-floor';

export interface KeyboardDiveResolution {
  targetIndex: number;
  action: DiveActionType;
}

/**
 * Determines the active chapter index [0..sectionOffsets.length-1] for a given scrollTop.
 */
export function findActiveChapterIndex(
  scrollTop: number,
  sectionOffsets: number[],
  viewportHeight = 900
): number {
  if (!sectionOffsets.length) return 0;
  const probeY = Math.max(0, scrollTop) + viewportHeight * 0.32;
  let activeIdx = 0;
  for (let i = 0; i < sectionOffsets.length; i++) {
    if (probeY >= sectionOffsets[i]) {
      activeIdx = i;
    } else {
      break;
    }
  }
  return activeIdx;
}

/**
 * Resolves a global keyboard event key into a target chapter index and dive action.
 * Returns null if the key is not a navigation key or no movement is needed.
 */
export function resolveKeyboardDiveAction(
  key: string,
  shiftKey: boolean,
  currentIndex: number,
  totalChapters: number
): KeyboardDiveResolution | null {
  if (totalChapters <= 0) return null;
  const safeCurrent = Math.max(0, Math.min(totalChapters - 1, currentIndex));

  if (key === 'ArrowDown' || key === 'ArrowRight' || key === 'PageDown') {
    const nextIdx = Math.min(totalChapters - 1, safeCurrent + 1);
    return {
      targetIndex: nextIdx,
      action: 'dive-deeper',
    };
  }

  if (key === 'ArrowUp' || key === 'ArrowLeft' || key === 'PageUp') {
    const prevIdx = Math.max(0, safeCurrent - 1);
    return {
      targetIndex: prevIdx,
      action: 'ascend-shallower',
    };
  }

  if (key === ' ' || key === 'Spacebar') {
    if (shiftKey) {
      const prevIdx = Math.max(0, safeCurrent - 1);
      return {
        targetIndex: prevIdx,
        action: 'ascend-shallower',
      };
    }
    // Spacebar simulates a progressive deep-dive exploration; at the abyssal floor it resurfaces to 0 m
    if (safeCurrent >= totalChapters - 1) {
      return {
        targetIndex: 0,
        action: 'resurface',
      };
    }
    return {
      targetIndex: safeCurrent + 1,
      action: 'dive-deeper',
    };
  }

  if (key === 'Home') {
    return {
      targetIndex: 0,
      action: 'resurface',
    };
  }

  if (key === 'End') {
    return {
      targetIndex: totalChapters - 1,
      action: 'abyss-floor',
    };
  }

  return null;
}

