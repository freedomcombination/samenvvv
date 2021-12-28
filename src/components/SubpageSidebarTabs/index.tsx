import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { Card } from '@components'
import { useSubpagesQuery } from '@lib'

interface SubpageSidebarTabsProps {
  page: IPage
}

// TODO: Show loading skeletons
export const SubpageSidebarTabs = ({
  page,
}: SubpageSidebarTabsProps): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const locale = router.locale as string
  const type = page.type

  const { data: latestSubpages } = useSubpagesQuery({ locale, type })
  const { data: mostReadedSubpages } = useSubpagesQuery({
    locale,
    type,
    sort: 'views:desc',
  })

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
            {latestSubpages?.slice(0, 5)?.map((subpage, i) => (
              <Card key={i} item={{ ...subpage, page }} shadow="sm" hasLink />
            ))}
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={4}>
            {mostReadedSubpages?.slice(0, 5)?.map((subpage, i) => (
              <Card key={i} item={{ ...subpage, page }} hasLink shadow="sm" />
            ))}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
