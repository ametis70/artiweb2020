import { Box, Heading } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { Canvas, useFrame } from 'react-three-fiber'
import { Mesh } from 'three'

function Cube(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<Mesh>(null)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Hero: React.FC = () => {
  return (
    <Box w="100%" overflow="hidden">
      <Box h="100vh" />
      <Box h="50vh" w="100%" justify="center" direction="column" align="center">
        <Parallax x={[50, -50]}>
          <Heading
            textWrap="none"
            textTransform="uppercase"
            fontSize={['5xl', '5xl', '8xl']}
            whiteSpace="nowrap"
            lineHeight="1"
          >
            Festival
          </Heading>
        </Parallax>
        <Parallax x={[-50, 50]}>
          <Heading
            textTransform="uppercase"
            fontSize={['5xl', '5xl', '8xl']}
            whiteSpace="nowrap"
            lineHeight="1"
          >
            Artimañas
          </Heading>
        </Parallax>
        <Parallax x={[75, -75]}>
          <Heading
            textTransform="uppercase"
            fontSize={['5xl', '5xl', '8xl']}
            whiteSpace="nowrap"
            lineHeight="1"
          >
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
    </Box>
  )
}

export default Hero
