import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useFindHashtagInTrends, useTrendsData } from '@lib'

import { TrendList } from '../TrendList'

interface TrendListProps {
  hashtags: [string | undefined, string | undefined]
}

export const TrendListTabs = ({ hashtags }: TrendListProps): JSX.Element => {
  const { t } = useTranslation()
  const hashtagInTrends = useFindHashtagInTrends(hashtags[0])
  const hashtagExtraInTrends = useFindHashtagInTrends(hashtags[1])

  const { data: trends, isLoading } = useTrendsData()

  return (
    <VStack w="full" align="stretch">
      <Text color="gray.500" fontSize="sm">{t`post-share.trends-label`}</Text>

      <Box
        maxH={200}
        overflowY="auto"
        rounded="lg"
        borderColor="gray.500"
        borderWidth={1}
        bg="white"
      >
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList>
            <Tab py={2} fontWeight="bold">
              World
            </Tab>
            <Tab py={2} fontWeight="bold">
              TR
            </Tab>
            <Tab py={2} fontWeight="bold">
              NL
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.en}
                hashtagInTrends={hashtagInTrends?.en}
                hashtagExtraInTrends={hashtagExtraInTrends?.en}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.tr}
                hashtagInTrends={hashtagInTrends?.tr}
                hashtagExtraInTrends={hashtagExtraInTrends?.tr}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.nl}
                hashtagInTrends={hashtagInTrends?.nl}
                hashtagExtraInTrends={hashtagExtraInTrends?.nl}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  )
}
