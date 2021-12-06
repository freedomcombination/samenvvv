import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { formatNumber } from '@utils'

interface MentionListItemProps {
  user_data: ITweetUserData
  onAddItem: (value: ITweetUserData) => void
}

export const MentionListItem = ({
  user_data,
  onAddItem,
}: MentionListItemProps): JSX.Element => {
  const { t } = useTranslation()

  if (!user_data) return <></>

  return (
    <Tooltip
      overflow="hidden"
      placement="right"
      hasArrow
      bg="white"
      color="black"
      minW={200}
      rounded="lg"
      py={2}
      textAlign="center"
      openDelay={500}
      label={
        <VStack w="full">
          <Avatar
            name={user_data.screen_name}
            size="lg"
            src={user_data?.profile_image_url_https}
            shadow="base"
          />
          <Box fontWeight="bold">
            <Text fontSize="1.5em">{user_data?.name}</Text>
            <Text color="twitter.400">@{user_data.screen_name}</Text>
          </Box>

          <Text>{user_data.status?.text}</Text>

          <Divider />

          <HStack w="full" justify="space-evenly">
            <Box>
              <Text>Following</Text>
              <Text>{formatNumber(user_data?.friends_count)}</Text>
            </Box>
            <Box>
              <Text>Followers</Text>
              <Text>{formatNumber(user_data?.followers_count)}</Text>
            </Box>
          </HStack>
        </VStack>
      }
    >
      <HStack
        px={4}
        py={2}
        cursor="pointer"
        transition="padding 0.3s"
        _hover={{
          shadow: 'base',
          pl: 6,
        }}
      >
        <HStack flex="1" fontSize="sm">
          <Avatar
            name={user_data.screen_name}
            src={user_data?.profile_image_url_https}
            size="sm"
          />
          <Box>
            <Text isTruncated maxW="120px">
              {user_data?.name ?? user_data.name}
            </Text>
            <Text>@{user_data.screen_name}</Text>
          </Box>
        </HStack>
        <Button
          variant="outline"
          onClick={() => onAddItem(user_data)}
          colorScheme="primary"
          rounded="full"
          size="sm"
        >{t`post-share.add`}</Button>
      </HStack>
    </Tooltip>
  )
}
