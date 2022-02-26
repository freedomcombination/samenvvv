import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Card } from '@components'

interface SubpageSidebarTabsProps {
  announcements: AnnouncementEntity[]
  popular: AnnouncementEntity[]
}

// TODO: Show loading skeletons
export const SubpageSidebarTabs = ({
  announcements,
  popular,
}: SubpageSidebarTabsProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Tabs isFitted colorScheme="primary">
      <TabList>
        <Tab textTransform="capitalize">{t`subpage.latest`}</Tab>
        <Tab textTransform="capitalize">{t`subpage.most-readed`}</Tab>
      </TabList>

      <TabPanels
        borderWidth={1}
        borderColor="gray.200"
        h="calc(100vh - 180px)"
        overflow="auto"
        mt={2}
      >
        <TabPanel>
          <VStack spacing={4}>
            {announcements?.map((announcement, i) => (
              <Card key={i} item={announcement} shadow="primary" hasLink />
            ))}
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={4}>
            {popular?.map((announcement, i) => (
              <Card key={i} item={announcement} hasLink shadow="primary" />
            ))}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
