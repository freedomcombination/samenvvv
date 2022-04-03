import React from 'react'

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { ChakraNextImage } from '@components'
import { getPost } from '@lib'
import { getItemLink } from '@utils'

interface PostProps {
  seo: NextSeoProps
  post: Post
}

const Post = ({ seo, post }: PostProps) => {
  const router = useRouter()

  const back = () => {
    router.push(
      '/hashtag-events/[slug]',
      `/hashtag-events/${post.hashtag.slug}`,
    )
  }
  return (
    <>
      <NextSeo {...seo} />
      <Modal isCentered isOpen={true} onClose={() => null}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <Stack>
              <ChakraNextImage ratio="twitter" image={post.image} />
              <Box p={8}>{post.text}</Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={back}>See other posts</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Post

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.id as string

  const post = await getPost(locale, id)

  if (!post) {
    return { notFound: true }
  }

  const title = post?.text.slice(0, 20)
  const description = post.text
  const adminUrl = process.env.NEXT_PUBLIC_API_URL as string
  const image = post?.image
  const url = getItemLink(post, locale, 'post') as string

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: adminUrl + image?.url,
          secureUrl: adminUrl + image?.url,
          type: image?.mime as string,
          width: image?.width as number,
          height: image?.height as number,
          alt: title,
        },
      ],
    },
  }

  return {
    props: {
      link: url,
      seo,
      post,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
  }
}
