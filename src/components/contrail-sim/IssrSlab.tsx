import { Billboard, Edges, Text } from '@react-three/drei'
import { ISSR, rangeBox } from './scene'

/**
 * The ice-supersaturated region — a translucent humid slab the aircraft flies
 * through. In later phases the contrail persists and spreads inside it and
 * fades in the dry air outside.
 */
export default function IssrSlab() {
  const { center, size } = rangeBox(ISSR)
  const midY = (ISSR.y[0] + ISSR.y[1]) / 2

  return (
    <group>
      <mesh position={center}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#5fa8e0"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
        <Edges color="#3d86c6" />
      </mesh>

      {/* Short label, set off to the side of the slab rather than over it */}
      <Billboard position={[center[0], midY, ISSR.z[1] + 0.6]}>
        <Text
          fontSize={0.32}
          color="#1d5b8f"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#ffffff"
        >
          ISSR
        </Text>
      </Billboard>
    </group>
  )
}
