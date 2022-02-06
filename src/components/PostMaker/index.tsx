import {
  Box,
  DrawerCloseButton,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { togglePostModal, useAppDispatch, useAppSelector } from '@store'

import { MentionAndTrends } from './MentionAndTrends'
import { PostContainer } from './PostContainer'
import { TweetWidget } from './TweetWidget'

export const PostMaker = ({ post }: { post: IHashtagPost }) => {
  const { isPostModalOpen } = useAppSelector(state => state.postShare)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <>
      <Modal
        isOpen={isPostModalOpen}
        size="sm"
        onClose={() => dispatch(togglePostModal())}
        closeOnOverlayClick={false}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent py={4} h="100vh" pos="relative">
          <DrawerCloseButton />
          <ModalBody as={Stack} w={{ base: 'full', lg: 300 }}>
            <MentionAndTrends post={post} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Grid
        gap={4}
        gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
        h={{ base: 'auto', lg: 640 }}
        alignItems="stretch"
      >
        <Box display={{ base: 'none', lg: 'block' }} h="inherit">
          <MentionAndTrends post={post} />
        </Box>
        <PostContainer post={post} />
        <Box>
          <TweetWidget
            title={t`post-share.latest-tweets-label`}
            tweets={post.hashtag?.tweets}
          />
        </Box>
      </Grid>
    </>
  )
}
