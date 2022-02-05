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

export const PostMaker = () => {
  const { isPostModalOpen, currentPost } = useAppSelector(
    state => state.postShare,
  )
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
            <MentionAndTrends />
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
          <MentionAndTrends />
        </Box>
        <PostContainer />
        <Box>
          <TweetWidget
            title={t`post-share.latest-tweets-label`}
            tweets={currentPost!.hashtag?.tweets}
          />
        </Box>
      </Grid>
    </>
  )
}
