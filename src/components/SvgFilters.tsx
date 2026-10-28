import React, { useEffect, useState } from 'react';

export const SvgFilters: React.FC = () => {
  const [grainDataUrl, setGrainDataUrl] = useState<string>('');

  // Generate a tiny 96x96 tileable monochrome noise PNG once on mount (zero per-frame CPU filter cost)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 96;
      canvas.height = 96;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const imgData = ctx.createImageData(96, 96);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.floor(Math.random() * 255);
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      setGrainDataUrl(canvas.toDataURL('image/png'));
    } catch {
      // ignore if canvas blocked
    }
  }, []);

  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed h-0 w-0 overflow-hidden"
        focusable="false"
      >
        <defs>
          {/* Duotone ocean grading filter: maps shadows to --ink (#020E1A), midtones to --mid (#0A6E8A) / --shallow (#12A8BE), highlights to --rim (#7CF4F0) / --foam (#F4FEFF) */}
          <filter
            id="mosasaurus-duotone"
            colorInterpolationFilters="sRGB"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
          >
            {/* Increase contrast (1.15) */}
            <feComponentTransfer in="SourceGraphic" result="contrasted">
              <feFuncR type="linear" slope="1.15" intercept="-0.05" />
              <feFuncG type="linear" slope="1.15" intercept="-0.05" />
              <feFuncB type="linear" slope="1.15" intercept="-0.05" />
            </feComponentTransfer>

            {/* Convert to luminance grayscale */}
            <feColorMatrix
              in="contrasted"
              type="matrix"
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     1 0"
              result="lum"
            />

            {/* Map luminance to ocean palette:
                0.00 -> #020E1A (R:0.008, G:0.055, B:0.102)
                0.28 -> #07405F (R:0.027, G:0.251, B:0.373)
                0.58 -> #0A6E8A (R:0.039, G:0.431, B:0.541)
                0.82 -> #36D6DE (R:0.212, G:0.839, B:0.871)
                1.00 -> #7CF4F0 (R:0.486, G:0.957, B:0.941) */}
            <feComponentTransfer in="lum" result="duotone">
              <feFuncR
                type="table"
                tableValues="0.008 0.027 0.039 0.212 0.580"
              />
              <feFuncG
                type="table"
                tableValues="0.055 0.251 0.431 0.839 0.965"
              />
              <feFuncB
                type="table"
                tableValues="0.102 0.373 0.541 0.871 0.955"
              />
            </feComponentTransfer>

            {/* Blend 78% ocean duotone with 22% contrasted natural texture */}
            <feComposite
              in="duotone"
              in2="contrasted"
              operator="arithmetic"
              k1="0"
              k2="0.78"
              k3="0.22"
              k4="0"
              result="blended"
            />

            {/* Preserve original alpha channel strictly */}
            <feComposite in="blended" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Global fine film grain (~4% opacity) using pre-baked 96x96 tile */}
      {grainDataUrl && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.038] mix-blend-overlay"
          style={{
            backgroundImage: `url(${grainDataUrl})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '96px 96px',
          }}
        />
      )}
    </>
  );
};
