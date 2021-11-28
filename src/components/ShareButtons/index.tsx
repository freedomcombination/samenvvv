import { ButtonGroup, IconButton } from '@chakra-ui/react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'

interface ShareButtonsProps {
  title: string
  url: string
  quote?: string
  hashtag?: string
}

export const ShareButtons = (props: ShareButtonsProps): JSX.Element => {
  return (
    <ButtonGroup variant="outline" size="sm">
      <FacebookShareButton {...props}>
        <IconButton
          isRound
          aria-label="share on faceobok"
          fontSize="lg"
          _hover={{ color: 'primary.400' }}
          icon={<FaFacebook />}
        />
      </FacebookShareButton>
      <TwitterShareButton {...props}>
        <IconButton
          isRound
          fontSize="lg"
          _hover={{ color: 'primary.400' }}
          aria-label="share on twitter"
          icon={<FaTwitter />}
        />
      </TwitterShareButton>
      <WhatsappShareButton {...props}>
        <IconButton
          isRound
          fontSize="lg"
          _hover={{ color: 'primary.400' }}
          aria-label="share on whatsapp"
          icon={<FaWhatsapp />}
        />
      </WhatsappShareButton>
    </ButtonGroup>
  )
}
