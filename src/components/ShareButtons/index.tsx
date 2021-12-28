import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share'
import { FaFacebook, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

import { makeTwitterContent } from '@utils'

interface ShareButtonsProps {
  title: string
  url: string
  quote?: string
}

export const ShareButtons = (
  props: ShareButtonsProps & ButtonGroupProps,
): JSX.Element => {
  const { title, url, quote, size = 'sm' } = props
  const twitterContent = makeTwitterContent(quote as string, title)

  return (
    <ButtonGroup variant="outline" size={size} {...props}>
      {props.children}
      <FacebookShareButton title={title} quote={twitterContent} url={url}>
        <IconButton
          as="span"
          isRound
          aria-label="share on faceobok"
          _hover={{ color: 'primary.400' }}
          icon={<FaFacebook />}
        />
      </FacebookShareButton>
      <TwitterShareButton title={twitterContent} url={url}>
        <IconButton
          as="span"
          isRound
          _hover={{ color: 'primary.400' }}
          aria-label="share on twitter"
          icon={<FaTwitter />}
        />
      </TwitterShareButton>
      <WhatsappShareButton title={twitterContent} url={url}>
        <IconButton
          as="span"
          isRound
          _hover={{ color: 'primary.400' }}
          aria-label="share on whatsapp"
          icon={<FaWhatsapp />}
        />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={twitterContent}>
        <IconButton
          as="span"
          isRound
          _hover={{ color: 'primary.400' }}
          aria-label="share on telegram"
          icon={<FaTelegram />}
        />
      </TelegramShareButton>
    </ButtonGroup>
  )
}
