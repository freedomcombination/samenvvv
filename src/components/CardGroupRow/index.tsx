import { SimpleGrid } from '@chakra-ui/react'

import { Card } from '@components'

interface CardGroupRowProps {
  items: ISubpage[]
  isSimple: boolean
}

export const CardGroupRow = ({
  items,
  isSimple,
}: CardGroupRowProps): JSX.Element => {
  return (
    <SimpleGrid row={{ base: 1, md: 2, lg: 4 }} spacing={10}>
      {items.map((item, i) => (
        <Card key={i} item={item} isSimple={isSimple} />
      ))}
    </SimpleGrid>
  )
}
