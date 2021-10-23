import {
  Container as ChakraContainer,
  ContainerProps,
  FlexProps,
} from '@chakra-ui/react'

export const Container = (props: ContainerProps & FlexProps): JSX.Element => {
  return <ChakraContainer maxW="container.xl" {...props} />
}
