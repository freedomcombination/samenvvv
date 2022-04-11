import { SimpleGrid } from '@chakra-ui/react'

import { AnimatedBox, Card } from '@components'
import { RouteKeys } from '@config'

interface CardGroupProps {
  items: Hashtag[] | Post[]
  isSimple?: boolean
  isSocial?: boolean
  hasLink?: boolean
  type: RouteKeys
}

export const CardGroup = ({
  items,
  isSocial,
  isSimple,
  hasLink,
  type,
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
            type={type}
          />
        </AnimatedBox>
      ))}
    </SimpleGrid>
  )
}
