import { ReactNode } from 'react'

import {
  Link,
  forwardRef,
  ChakraProps,
  ChakraComponent,
} from '@chakra-ui/react'
import NextLink from 'next/link'

interface NavigateProps {
  as?: ChakraComponent<any, any>
  href: string
  children: ReactNode
}

export const Navigate = forwardRef(
  (
    { as: Tag = Link, href, children, ...rest }: NavigateProps & ChakraProps,
    ref,
  ): JSX.Element => {
    if (href) {
      if (href[0] === '/') {
        return (
          <NextLink href={href} passHref>
            <Tag cursor="pointer" {...rest} ref={ref}>
              {children}
            </Tag>
          </NextLink>
        )
      }

      return (
        <Tag cursor="pointer" as={Link} href={href} target="_blank" {...rest}>
          {children}
        </Tag>
      )
    }

    return (
      <Link textColor="none" {...rest}>
        {children}
      </Link>
    )
  },
)
