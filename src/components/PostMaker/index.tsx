import { memo } from 'react'

import {
  Box,
  Button,
  DrawerCloseButton,
  Grid,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { useTour } from '@reactour/tour'
import { useTranslation } from 'next-i18next'
import { FaQuestionCircle } from 'react-icons/fa'

import { togglePostModal, useAppDispatch, useAppSelector } from '@store'

import { MentionAndTrends } from './MentionAndTrends'
import { PostContainer } from './PostContainer'
import { TweetWidget } from './TweetWidget'

export const PostMaker = memo<{ post: IHashtagPost }>(function PostMaker({
  post,
}) {
  const { isPostModalOpen } = useAppSelector(state => state.postShare)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { setIsOpen } = useTour()

  return (
    <>
      <Button
        display={{ base: 'none', lg: 'flex' }}
        zIndex="sticky"
        pos="fixed"
        right={4}
        bottom={4}
        colorScheme="primary"
        leftIcon={<FaQuestionCircle />}
        onClick={() => setIsOpen(true)}
      >
        {t`post-share.help`}
      </Button>
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        zIndex="sticky"
        pos="fixed"
        size="lg"
        right={2}
        bottom={2}
        rounded="full"
        colorScheme="primary"
        aria-label="help"
        shadow="primary"
        icon={<FaQuestionCircle />}
        onClick={() => setIsOpen(true)}
      />
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
})
