import { Billboard, Edges, Text } from '@react-three/drei'
import { ISSR, rangeBox } from './scene'

/**
 * The ice-supersaturated region — a translucent humid slab the aircraft flies
 * through. In later phases the contrail persists and spreads inside it and
 * fades in the dry air outside.
 */
export default function IssrSlab() {
  const { center, size } = rangeBox(ISSR)

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

      <Billboard position={[center[0], ISSR.y[1] + 0.32, center[2]]}>
        <Text
          fontSize={0.24}
          color="#1d5b8f"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.006}
          outlineColor="#ffffff"
        >
          ice-supersaturated region (RHi {'>'} 100%)
        </Text>
      </Billboard>
    </group>
  )
}
