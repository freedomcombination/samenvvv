import { SimpleGrid } from '@chakra-ui/react'

import { Card } from '@components'

interface CardGroupProps {
  items: ISubpage[]
  isSimple: boolean
}

export const CardGroup = ({ items, isSimple }: CardGroupProps): JSX.Element => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
      {items.map((item, i) => (
        <Card key={i} item={item} isSimple={isSimple} />
      ))}
    </SimpleGrid>
  )
}
