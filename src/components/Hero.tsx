import { Suspense, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from 'react-three-fiber'
import { Parallax } from 'react-scroll-parallax'
import { Heading, Flex, Box } from '@chakra-ui/core'

function Cube(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Hero: React.FC = () => {
  return (
    <>
      <Box h="100vh" />
      <Box h="50vh" w="100%" justify="center" direction="column" align="center">
        <Parallax x={[50, -50]}>
          <Heading textTransform="uppercase" fontSize="7xl">
            Festival
          </Heading>
        </Parallax>
        <Box w="100%" h="2rem" />
        <Parallax x={[-50, 50]}>
          <Heading textTransform="uppercase" fontSize="7xl">
            Artimañas
          </Heading>
        </Parallax>
        <Box w="100%" h="2rem" />
        <Parallax x={[75, -75]}>
          <Heading textTransform="uppercase" fontSize="7xl">
            2020
          </Heading>
        </Parallax>
      </Box>
      <Canvas style={{ width: '100%', height: '100vh' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube position={[-1.2, 0, 0]} />
        <Cube position={[1.2, 0, 0]} />
      </Canvas>
    </>
  )
}

export default Hero
