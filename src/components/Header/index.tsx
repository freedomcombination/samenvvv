import { Box, Flex, Button, Text } from '@chakra-ui/react'

import { Container, HeaderNav, HeaderTop } from '@components'

export const Header = (): JSX.Element => {
   return (
    <Flex
      pos="relative"
      bgSize="cover"
      height="100vh"
      direction="column"
      bg={'white'}
      marginTop="-100"
      justify="center"
      align="center"
    >
      <Box
        as="video"
        top={0}
        left={0}
        width="100%"
        objectFit="cover"
        autoPlay
        loop
        position="absolute"
      >
        <source
          src="/images/Alley_hero_aug_2020-transcode.webm"
          type="video/webm"
        />
      </Box>
      <Text
        position="relative"
        textAlign="center"
        fontSize="6xl"
        textColor="black"
        as="em"
      >
        Elemi gitti Lezzeti kaldi,
        <p>Her dogan gun bir umuttur bize.</p>
      </Text>
      <Button size="lg" marginTop="400px" border="2px" borderColor="green.500">
        Faaliyetlerimiz
      </Button>
    </Flex>
  )
}
