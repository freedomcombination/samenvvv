import { HStack, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

type SocialLinkType = {
  label: string
  icon: IconType
  link: Record<string, string>
}
const SOCIAL_LINKS: SocialLinkType[] = [
  {
    label: 'Twitter',
    icon: FaTwitter,
    link: {
      en: 'https://twitter.com/samenvvvEN',
      tr: 'https://twitter.com/samenvvvTR',
      nl: 'https://twitter.com/samenvvv',
    },
  },
  {
    label: 'Facebook',
    icon: FaFacebook,
    link: {
      en: 'https://www.facebook.com/samenverbinding',
      tr: 'https://www.facebook.com/samenverbinding',
      nl: 'https://www.facebook.com/samenverbinding',
    },
  },
  {
    label: 'Instagram',
    icon: FaInstagram,
    link: {
      en: 'ttps://www.instagram.com/samenvvv',
      tr: 'ttps://www.instagram.com/samenvvv',
      nl: 'ttps://www.instagram.com/samenvvv',
    },
  },
  {
    label: 'Youtube',
    icon: FaYoutube,
    link: {
      en: 'https://www.youtube.com/channel/UC6SOtlov-UehhnwXuTq50yA',
      tr: 'https://www.youtube.com/channel/UC6SOtlov-UehhnwXuTq50yA',
      nl: 'https://www.youtube.com/channel/UC6SOtlov-UehhnwXuTq50yA',
    },
  },
  {
    label: 'WhatsApp',
    icon: FaWhatsapp,
    link: {
      en: 'https://api.whatsapp.com/send?phone=31685221308',
      tr: 'https://api.whatsapp.com/send?phone=31685221308',
      nl: 'https://api.whatsapp.com/send?phone=31685221308',
    },
  },
]

export const SocialButtons = (): JSX.Element => {
  const { locale } = useRouter()
  return (
    <HStack align="start">
      {SOCIAL_LINKS.map((item, i) => (
        <IconButton
          aria-label={item.label}
          as="a"
          size="sm"
          target="_blank"
          key={i}
          icon={<item.icon />}
          href={item.link[locale as StrapiLocale]}
          variant="outline"
          colorScheme="primary"
        />
      ))}
    </HStack>
  )
}
