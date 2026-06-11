import type { ThreeElements } from '@react-three/fiber'

const BODY = '#eef2f7'
const ACCENT = '#0066cc' // matches the site link colour

/**
 * A small stylized airliner built from primitives, nose pointing +X (the
 * flight direction). Holds up from any orbit angle and needs no external asset.
 */
export default function Airplane(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <group scale={1.25}>
        {/* fuselage — capsule laid along X */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.13, 0.72, 6, 16]} />
          <meshStandardMaterial color={BODY} metalness={0.15} roughness={0.55} />
        </mesh>

        {/* main wings — span across Z */}
        <mesh position={[-0.02, -0.02, 0]}>
          <boxGeometry args={[0.34, 0.035, 1.5]} />
          <meshStandardMaterial color={BODY} metalness={0.1} roughness={0.6} />
        </mesh>

        {/* horizontal stabilizer */}
        <mesh position={[-0.46, 0.0, 0]}>
          <boxGeometry args={[0.18, 0.03, 0.62]} />
          <meshStandardMaterial color={BODY} metalness={0.1} roughness={0.6} />
        </mesh>

        {/* vertical tail fin — accent colour */}
        <mesh position={[-0.46, 0.16, 0]}>
          <boxGeometry args={[0.17, 0.26, 0.04]} />
          <meshStandardMaterial color={ACCENT} metalness={0.1} roughness={0.5} />
        </mesh>

        {/* cockpit hint */}
        <mesh position={[0.34, 0.06, 0]}>
          <sphereGeometry args={[0.1, 16, 12]} />
          <meshStandardMaterial color={ACCENT} metalness={0.2} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
