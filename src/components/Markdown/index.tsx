/* eslint-disable react/display-name */
import { chakra, ChakraProps } from '@chakra-ui/react'
import * as ChakraComponents from '@chakra-ui/react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Navigate } from '@components'

const MarkdownComponents = {
  h1: (props: ChakraProps) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: (props: ChakraProps) => <chakra.h2 apply="mdx.h2" {...props} />,
  h3: (props: ChakraProps) => <chakra.h3 as="h3" apply="mdx.h3" {...props} />,
  h4: (props: ChakraProps) => <chakra.h4 as="h4" apply="mdx.h4" {...props} />,
  hr: (props: ChakraProps) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props: ChakraProps) => (
    <chakra.span fontWeight="medium" {...props} />
  ),
  a: (props: any) => (
    <Navigate {...props}>
      <chakra.a apply="mdx.a">{props.children}</chakra.a>
    </Navigate>
  ),
  p: (props: ChakraProps) => <chakra.p apply="mdx.p" {...props} />,
  ul: (props: ChakraProps) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: (props: ChakraProps) => <chakra.ol apply="mdx.ul" {...props} />,
  li: (props: ChakraProps) => <chakra.li pb="4px" {...props} />,
  blockquote: (props: ChakraProps) => (
    <chakra.blockquote apply="mdx.blockquote" {...props} />
  ),
}

interface MarkdownProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Markdown = ({ source }: MarkdownProps): JSX.Element => (
  <MDXRemote
    {...source}
    components={{ ...MarkdownComponents, ...ChakraComponents }}
  />
)

export default Markdown
