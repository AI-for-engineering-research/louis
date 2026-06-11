import { useMemo } from 'react'
import { Billboard, Text } from '@react-three/drei'
import { AXIS, BOX, lerp, ticks } from './scene'

// Subdivisions of the grid faces.
const NX = 6 // along longitude
const NZ = 4 // along latitude
const NY = 3 // along pressure

const SLATE = '#475569'
const LABEL = '#1e293b'

/**
 * The NWP grid: a wireframe bounding box with faint gridlines on the floor and
 * two back walls, plus labelled lon / lat / pressure axes. Reads as a scientific
 * 3D plot while staying visually quiet behind the contrail.
 */
export default function NwpGrid() {
  const { w, h, d } = BOX
  const x0 = -w / 2
  const x1 = w / 2
  const z0 = -d / 2
  const z1 = d / 2
  const y0 = 0
  const y1 = h

  // Strong lines: the 12 edges of the bounding box.
  const edges = useMemo(() => {
    const p: number[] = []
    const c: [number, number, number][] = [
      [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], // floor
      [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], // ceiling
    ]
    const seg = (a: number, b: number) => p.push(...c[a], ...c[b])
    // floor, ceiling, verticals
    seg(0, 1); seg(1, 2); seg(2, 3); seg(3, 0)
    seg(4, 5); seg(5, 6); seg(6, 7); seg(7, 4)
    seg(0, 4); seg(1, 5); seg(2, 6); seg(3, 7)
    return new Float32Array(p)
  }, [x0, x1, y0, y1, z0, z1])

  // Faint lines: gridlines on the floor (y=0) and the two far walls (z=z0, x=x0).
  const grid = useMemo(() => {
    const p: number[] = []
    // floor: lines of constant lon, then constant lat
    ticks(NX).forEach((t) => { const x = lerp(x0, x1, t); p.push(x, y0, z0, x, y0, z1) })
    ticks(NZ).forEach((t) => { const z = lerp(z0, z1, t); p.push(x0, y0, z, x1, y0, z) })
    // back wall (z = z0): verticals + horizontals
    ticks(NX).forEach((t) => { const x = lerp(x0, x1, t); p.push(x, y0, z0, x, y1, z0) })
    ticks(NY).forEach((t) => { const y = lerp(y0, y1, t); p.push(x0, y, z0, x1, y, z0) })
    // side wall (x = x0): verticals + horizontals
    ticks(NZ).forEach((t) => { const z = lerp(z0, z1, t); p.push(x0, y0, z, x0, y1, z) })
    ticks(NY).forEach((t) => { const y = lerp(y0, y1, t); p.push(x0, y, z0, x0, y, z1) })
    return new Float32Array(p)
  }, [x0, x1, y0, y1, z0, z1])

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[grid, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={SLATE} transparent opacity={0.18} />
      </lineSegments>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={SLATE} transparent opacity={0.55} />
      </lineSegments>

      {/* Tick labels — longitude along the front-floor edge */}
      {ticks(NX).map((t) => (
        <AxisLabel
          key={`lon-${t}`}
          position={[lerp(x0, x1, t), y0 - 0.18, z1 + 0.12]}
          text={`${Math.round(lerp(AXIS.lon.min, AXIS.lon.max, t))}`}
          size={0.2}
        />
      ))}
      {/* latitude along the right-floor edge */}
      {ticks(NZ).map((t) => (
        <AxisLabel
          key={`lat-${t}`}
          position={[x1 + 0.18, y0 - 0.18, lerp(z0, z1, t)]}
          text={`${Math.round(lerp(AXIS.lat.min, AXIS.lat.max, t))}`}
          size={0.2}
        />
      ))}
      {/* pressure along the back-left vertical edge */}
      {ticks(NY).map((t) => (
        <AxisLabel
          key={`pres-${t}`}
          position={[x0 - 0.2, lerp(y0, y1, t), z0 - 0.05]}
          text={`${Math.round(lerp(AXIS.pres.bottom, AXIS.pres.top, t))}`}
          size={0.2}
        />
      ))}

      {/* Axis titles */}
      <AxisLabel position={[0, y0 - 0.55, z1 + 0.45]} text={`${AXIS.lon.label} (${AXIS.lon.unit})`} size={0.28} color={LABEL} bold />
      <AxisLabel position={[x1 + 0.7, y0 - 0.55, 0]} text={`${AXIS.lat.label} (${AXIS.lat.unit})`} size={0.28} color={LABEL} bold />
      <AxisLabel position={[x0 - 0.85, y1 * 0.5, z0 - 0.05]} text={`pressure (hPa)`} size={0.28} color={LABEL} bold />
    </group>
  )
}

function AxisLabel({
  position,
  text,
  size,
  color = '#334155',
  bold = false,
}: {
  position: [number, number, number]
  text: string
  size: number
  color?: string
  bold?: boolean
}) {
  return (
    <Billboard position={position}>
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        fontWeight={bold ? 700 : 400}
        outlineWidth={bold ? 0.006 : 0}
        outlineColor="#ffffff"
      >
        {text}
      </Text>
    </Billboard>
  )
}
