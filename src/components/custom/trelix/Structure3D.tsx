// Structure3D.tsx

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

interface Props {
  width: number
  depth: number
  height: number
}

function Tower({ x, z, height }: any) {
  return (
    <mesh position={[x, height / 2, z]}>
      <boxGeometry args={[0.2, height, 0.2]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default function Structure3D({
  width,
  depth,
  height,
}: Props) {
  const halfW = width / 2
  const halfD = depth / 2

  return (
    <Canvas style={{ height: "500px" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />

      {/* Torres */}
      <Tower x={-halfW} z={-halfD} height={height} />
      <Tower x={halfW} z={-halfD} height={height} />
      <Tower x={-halfW} z={halfD} height={height} />
      <Tower x={halfW} z={halfD} height={height} />

      {/* Grid superior */}
      <mesh position={[0, height, 0]}>
        <boxGeometry args={[width, 0.2, depth]} />
        <meshStandardMaterial wireframe />
      </mesh>

      <OrbitControls />
    </Canvas>
  )
}