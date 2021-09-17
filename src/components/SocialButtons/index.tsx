import { IconButton, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
const SocialButton = ({
  icon: Icon,
  href,
  label,
}: {
  icon: IconType
  label: string
  href: string
}) => {
  return (
    <IconButton
      as="a"
      size="sm"
      aria-label={label}
      icon={<Icon />}
      href={href}
      variant="outline"
      colorScheme="primary"
    />
  )
}
type SocialLinkType = {
  label: string
  icon: IconType
  link: {
    en: string
    tr: string
    nl: string
  }
}
const SOCIAL_LINKS: SocialLinkType[] = [
  {
    label: 'Twitter',
    icon: FaTwitter,
    link: {
      en: 'https://twitter.com/samenvvv',
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
]
export const SocialButtons = (): JSX.Element => {
  const { locale } = useRouter()
  return (
    <HStack align="start">
      {SOCIAL_LINKS.map((item, i) => (
        <SocialButton
          key={i}
          icon={item.icon}
          label={item.label}
          href={item.link[locale]}
        />
      ))}
    </HStack>
  )
}
