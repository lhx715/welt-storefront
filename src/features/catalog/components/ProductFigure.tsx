import { useId, type ReactNode } from 'react'
import type { FigureSpec } from '../types'

/**
 * The catalogue has no photography, and mismatched stock photos would be worse
 * than none. Instead each piece is drawn as a flat-lay technical figure: seven
 * silhouettes, parameterised per product, tinted with the actual dye colour of
 * the selected colourway and given a woven twill overlay plus fabric grain.
 *
 * The side effect that matters: switching colourway on a card is an instant
 * repaint, not an image load.
 */

interface Silhouette {
  body: string
  details?: ReactNode
}

const SEAM = 'rgba(0,0,0,0.26)'
const SEAM_LIGHT = 'rgba(255,255,255,0.4)'
const BUTTON = 'rgba(0,0,0,0.38)'

function topBody(figure: FigureSpec, boxy: boolean): string {
  const long = figure.sleeve === 'long'
  if (boxy) {
    return long
      ? 'M 162 96 C 172 118, 228 118, 238 96 L 292 110 L 330 300 L 294 314 L 272 194 L 282 412 L 118 412 L 128 194 L 106 314 L 70 300 L 108 110 Z'
      : 'M 162 96 C 172 118, 228 118, 238 96 L 292 110 L 340 190 L 302 220 L 276 186 L 282 412 L 118 412 L 124 186 L 98 220 L 60 190 L 108 110 Z'
  }
  return long
    ? 'M 168 92 C 176 112, 224 112, 232 92 L 286 106 L 326 296 L 292 310 L 270 190 L 274 404 L 126 404 L 130 190 L 108 310 L 74 296 L 114 106 Z'
    : 'M 168 92 C 176 112, 224 112, 232 92 L 286 106 L 336 186 L 300 216 L 272 182 L 272 404 L 128 404 L 128 182 L 100 216 L 64 186 L 114 106 Z'
}

function silhouette(figure: FigureSpec): Silhouette {
  switch (figure.archetype) {
    case 'tee': {
      const boxy = figure.wide === true
      const long = figure.sleeve === 'long'
      return {
        body: topBody(figure, boxy),
        details: (
          <>
            {/* Ribbed collar, drawn as a second curve inside the neckline. */}
            <path
              d={
                boxy
                  ? 'M 170 106 C 178 126, 222 126, 230 106'
                  : 'M 174 102 C 180 120, 220 120, 226 102'
              }
              fill="none"
              stroke={SEAM}
              strokeWidth="2"
            />
            {long ? (
              <>
                <path d="M 292 300 L 326 288" fill="none" stroke={SEAM} strokeWidth="1.5" />
                <path d="M 108 300 L 74 288" fill="none" stroke={SEAM} strokeWidth="1.5" />
              </>
            ) : (
              <>
                <path d="M 300 212 L 334 182" fill="none" stroke={SEAM} strokeWidth="1.5" />
                <path d="M 100 212 L 66 182" fill="none" stroke={SEAM} strokeWidth="1.5" />
              </>
            )}
            <path
              d={boxy ? 'M 120 398 L 280 398' : 'M 130 391 L 270 391'}
              fill="none"
              stroke={SEAM_LIGHT}
              strokeWidth="1.5"
            />
            {figure.pocket === true && (
              <>
                <rect
                  x={boxy ? 150 : 142}
                  y="150"
                  width="44"
                  height="52"
                  fill="none"
                  stroke={SEAM}
                  strokeWidth="1.5"
                />
                <path
                  d={boxy ? 'M 150 162 L 194 162' : 'M 142 162 L 186 162'}
                  fill="none"
                  stroke={SEAM}
                  strokeWidth="1.5"
                />
              </>
            )}
          </>
        ),
      }
    }

    case 'shirt': {
      const long = figure.sleeve !== 'short'
      return {
        body: topBody(figure, true),
        details: (
          <>
            {/* Collar: two points meeting at the top of the placket. */}
            <path d="M 162 96 L 200 134 L 176 99 Z" fill="rgba(0,0,0,0.14)" />
            <path d="M 238 96 L 200 134 L 224 99 Z" fill="rgba(0,0,0,0.14)" />
            <path d="M 200 134 L 200 412" fill="none" stroke={SEAM} strokeWidth="1.5" />
            <path d="M 208 134 L 208 412" fill="none" stroke={SEAM_LIGHT} strokeWidth="1" />
            {[168, 224, 280, 336].map((y) => (
              <circle key={y} cx="200" cy={y} r="3.4" fill={BUTTON} />
            ))}
            {figure.pocket === true && (
              <>
                <rect
                  x="228"
                  y="164"
                  width="42"
                  height="50"
                  fill="none"
                  stroke={SEAM}
                  strokeWidth="1.5"
                />
                <path d="M 228 178 L 270 178" fill="none" stroke={SEAM} strokeWidth="1.5" />
              </>
            )}
            {long ? (
              <>
                <path d="M 294 304 L 330 292" fill="none" stroke={SEAM} strokeWidth="1.5" />
                <path d="M 106 304 L 70 292" fill="none" stroke={SEAM} strokeWidth="1.5" />
              </>
            ) : (
              <>
                <path d="M 302 216 L 338 188" fill="none" stroke={SEAM} strokeWidth="1.5" />
                <path d="M 98 216 L 62 188" fill="none" stroke={SEAM} strokeWidth="1.5" />
              </>
            )}
            <path d="M 120 398 L 280 398" fill="none" stroke={SEAM_LIGHT} strokeWidth="1.5" />
          </>
        ),
      }
    }

    case 'trouser': {
      const wide = figure.wide === true
      return {
        body: wide
          ? 'M 128 84 L 272 84 L 288 144 L 286 452 L 222 452 L 202 210 L 178 452 L 114 452 L 112 144 Z'
          : 'M 132 84 L 268 84 L 280 140 L 268 452 L 214 452 L 202 208 L 190 452 L 132 452 L 120 140 Z',
        details: (
          <>
            <path d="M 129 110 L 271 110" fill="none" stroke={SEAM} strokeWidth="1.5" />
            <path d="M 202 110 L 206 152" fill="none" stroke={SEAM} strokeWidth="1.5" />
            {wide ? (
              <path d="M 152 452 L 156 118" fill="none" stroke={SEAM_LIGHT} strokeWidth="1.5" />
            ) : (
              <>
                <path d="M 168 452 L 172 124" fill="none" stroke={SEAM_LIGHT} strokeWidth="1.5" />
                <path d="M 238 452 L 234 124" fill="none" stroke={SEAM_LIGHT} strokeWidth="1.5" />
              </>
            )}
            {[148, 200, 252].map((x) => (
              <rect key={x} x={x} y="86" width="7" height="24" fill="rgba(0,0,0,0.1)" />
            ))}
          </>
        ),
      }
    }

    case 'boot': {
      const tall = figure.tall === true
      const top = tall ? 76 : 108
      return {
        body: `M 138 ${top} L 224 ${top} L 228 292 C 258 302, 306 316, 322 342 C 334 362, 328 384, 306 384 L 138 384 Z`,
        details: (
          <>
            <rect x="126" y="366" width="202" height="26" rx="9" fill="rgba(0,0,0,0.32)" />
            <rect x="266" y="386" width="60" height="16" rx="4" fill="rgba(0,0,0,0.42)" />
            {figure.lace !== false && (
              <>
                {[0, 1, 2].map((index) => (
                  <path
                    key={index}
                    d={`M 168 ${top + 34 + index * 26} L 200 ${top + 42 + index * 26}`}
                    fill="none"
                    stroke={SEAM}
                    strokeWidth="2.5"
                  />
                ))}
                <path
                  d={`M 166 ${top + 24} L 166 ${top + 92}`}
                  fill="none"
                  stroke={SEAM}
                  strokeWidth="1.5"
                />
              </>
            )}
            {tall && (
              <rect
                x="196"
                y={top - 10}
                width="28"
                height="14"
                rx="3"
                fill="rgba(255,255,255,0.28)"
              />
            )}
            <path d="M 138 344 L 320 344" fill="none" stroke={SEAM_LIGHT} strokeWidth="1.5" />
          </>
        ),
      }
    }

    case 'sneaker':
      return {
        body: 'M 96 306 C 96 278, 122 268, 154 262 L 246 244 C 276 240, 302 256, 316 282 C 326 302, 328 320, 324 334 L 100 334 C 94 326, 96 316, 96 306 Z',
        details: (
          <>
            <rect x="90" y="326" width="240" height="32" rx="15" fill="rgba(0,0,0,0.3)" />
            <path
              d="M 128 268 C 150 290, 158 314, 156 334"
              fill="none"
              stroke={SEAM}
              strokeWidth="1.5"
            />
            <path
              d="M 296 262 C 288 282, 284 310, 286 332"
              fill="none"
              stroke={SEAM}
              strokeWidth="1.5"
            />
            {[0, 1, 2, 3].map((index) => (
              <path
                key={index}
                d={`M ${168 + index * 20} ${268 + index * 4} L ${196 + index * 20} ${256 + index * 4}`}
                fill="none"
                stroke={SEAM}
                strokeWidth="2.5"
              />
            ))}
            {[0, 1, 2].map((index) => (
              <circle
                key={index}
                cx={196 + index * 26}
                cy={276 + index * 4}
                r="2.6"
                fill={BUTTON}
              />
            ))}
          </>
        ),
      }

    case 'tote':
      return {
        body: 'M 118 196 L 282 196 L 300 424 L 100 424 Z',
        details: (
          <>
            <path
              d="M 152 196 C 152 116, 248 116, 248 196"
              fill="none"
              stroke="rgba(0,0,0,0.24)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 152 196 C 152 116, 248 116, 248 196"
              fill="none"
              stroke={SEAM}
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.25"
            />
            <path d="M 118 214 L 282 214" fill="none" stroke={SEAM} strokeWidth="1.5" />
            <path d="M 108 404 L 292 404" fill="none" stroke={SEAM_LIGHT} strokeWidth="1.5" />
          </>
        ),
      }

    case 'duffel':
      return {
        body: 'M 124 200 L 276 200 C 322 200, 344 232, 344 286 C 344 340, 322 372, 276 372 L 124 372 C 78 372, 56 340, 56 286 C 56 232, 78 200, 124 200 Z',
        details: (
          <>
            <path
              d="M 156 200 C 156 152, 244 152, 244 200"
              fill="none"
              stroke="rgba(0,0,0,0.24)"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path d="M 76 250 L 324 250" fill="none" stroke="rgba(0,0,0,0.34)" strokeWidth="2.5" />
            <circle cx="330" cy="250" r="6" fill="rgba(0,0,0,0.34)" />
            <path
              d="M 92 220 C 80 244, 80 330, 92 354"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
            />
            <path
              d="M 308 220 C 320 244, 320 330, 308 354"
              fill="none"
              stroke={SEAM_LIGHT}
              strokeWidth="2"
            />
          </>
        ),
      }
  }
}

interface ProductFigureProps {
  figure: FigureSpec
  color: string
  className?: string
}

export function ProductFigure({ figure, color, className }: ProductFigureProps) {
  // Ids must be unique per instance: a grid renders dozens of these.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const grain = `grain-${uid}`
  const twill = `twill-${uid}`
  const shade = `shade-${uid}`
  const { body, details } = silhouette(figure)

  return (
    <svg
      viewBox="0 0 400 500"
      role="presentation"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id={grain} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            seed="11"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" result="grey" />
          <feComponentTransfer in="grey" result="speckle">
            <feFuncA type="linear" slope="0.42" />
          </feComponentTransfer>
          <feComposite in="speckle" in2="SourceGraphic" operator="in" />
        </filter>

        <pattern
          id={twill}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(38)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="#000" strokeOpacity="0.075" strokeWidth="2" />
        </pattern>

        <linearGradient id={shade} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Dyed ground: the colourway bled into undyed cloth. */}
      <rect width="400" height="500" fill="var(--color-cloth-deep)" />
      <rect width="400" height="500" fill={color} opacity="0.16" />

      <g>
        <path d={body} fill={color} />
        <path d={body} fill={`url(#${twill})`} />
        <path d={body} fill="#000" filter={`url(#${grain})`} opacity="0.16" />
        <path d={body} fill={`url(#${shade})`} />
        <path d={body} fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.25" />
        {details}
      </g>
    </svg>
  )
}
