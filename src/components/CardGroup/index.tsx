import { SimpleGrid } from '@chakra-ui/react'

import { AnimatedBox, Card } from '@components'

interface CardGroupProps {
  items: ISubpage[] | IApplication[] | IHashtagPost[]
  isSimple?: boolean
  isSocial?: boolean
  hasLink?: boolean
}

export const CardGroup = ({
  items,
  isSocial,
  isSimple,
  hasLink,
}: CardGroupProps): JSX.Element => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
      {items.map((item, i) => (
        <AnimatedBox key={i} delay={i} directing="to-down" hasHover>
          <Card
            item={item}
            isSimple={isSimple}
            isSocial={isSocial}
            hasLink={hasLink}
          />
        </AnimatedBox>
      ))}
    </SimpleGrid>
  )
}
