import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { FaArrowDown } from 'react-icons/fa'

import {
  AnimatedBox,
  ChakraNextImage,
  Hero,
  Layout,
  MotionBox,
} from '@components'

const AnimationPage = (): JSX.Element => {
  return (
    <Layout scrollHeight={100}>
      <Hero
        title="Animations"
        image="https://picsum.photos/seed/picsum/900"
        isFullHeight={false}
      />
      <Container>
        <MotionBox
          animate={{ x: 0, y: 50 }}
          transition={{
            type: 'spring',
            damping: 2,
            stiffness: 50,
            repeat: Infinity,
          }}
        >
          <Box color="primary.400" mx="auto" as={FaArrowDown} boxSize={64} />
        </MotionBox>
        <VStack mt="100vh" mb={4} spacing={8}>
          {/* EXAMPLE 1 */}
          <AnimatedBox directing="to-right" hasHover>
            <HStack
              align="stretch"
              shadow="primary"
              rounded="lg"
              overflow="hidden"
            >
              <VStack align="stretch" p={4}>
                <Heading as="h3" size="lg">
                  Has Hover
                </Heading>
                <Text>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid ipsa hic, magni consequatur nesciunt
                </Text>
              </VStack>

              <ChakraNextImage
                w="full"
                image="https://picsum.photos/seed/picsum/900"
              />
            </HStack>
          </AnimatedBox>

          {/* EXAMPLE 2 */}
          <HStack align="stretch" rounded="lg" overflow="hidden">
            <AnimatedBox directing="to-left" delay={5}>
              <VStack align="stretch" p={4}>
                <Heading as="h3" size="lg">
                  Animate Children with Delay
                </Heading>
                <Text>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid ipsa hic, magni consequatur nesciunt, possimus
                  corrupti veniam laudantium tempore placeat est sed totam!
                  Quasi ea commodi beatae? Nulla, culpa eius.
                </Text>
              </VStack>
            </AnimatedBox>

            <AnimatedBox directing="to-right" delay={7}>
              <ChakraNextImage
                w="full"
                h="full"
                image="https://picsum.photos/seed/picsum/900"
              />
            </AnimatedBox>
          </HStack>
        </VStack>
      </Container>
    </Layout>
  )
}

export default AnimationPage
