import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Text, Float, MeshDistortMaterial } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"

function Orb({ position, color, text }: { position: [number, number, number]; color: string; text: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const texture = useLoader(TextureLoader, `/placeholder.svg?height=256&width=256`)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial color={color} envMapIntensity={0.4} clearcoat={0.8} clearcoatRoughness={0} metalness={0.2}>
          <primitive attach="map" object={texture} />
        </MeshDistortMaterial>
      </mesh>
      <Text
        position={[position[0], position[1] + 0.7, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Orb position={[-2, 0, 0]} color="#0080FF" text="Descubre" />
      <Orb position={[0, 0, 0]} color="#00B4D8" text="Aprende" />
      <Orb position={[2, 0, 0]} color="#00CFB4" text="Crece" />
      <OrbitControls enableZoom={false} />
    </>
  )
}

export default function WelcomeScene() {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

