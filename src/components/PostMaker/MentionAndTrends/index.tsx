import { MentionList } from './Mention/MentionList'
import { TrendListTabs } from './Trends/TrendListTabs'

export const MentionAndTrends = ({ post }: { post: IHashtagPost }) => {
  return (
    <>
      <MentionList />
      <TrendListTabs post={post} />
    </>
  )
}
