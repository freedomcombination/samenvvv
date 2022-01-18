import { Tag, TagCloseButton, TagLabel, TagProps, Wrap } from '@chakra-ui/react'

interface TagListProps {
  tags: string[]
  onClickButton: (value: string) => void
  action?: 'add' | 'remove'
}

export const TagList = ({
  tags,
  onClickButton,
  action = 'remove',
  ...rest
}: TagListProps & TagProps): JSX.Element => {
  return (
    <Wrap>
      {tags.map(
        (tag, i) =>
          tag != null && (
            <Tag rounded="full" key={i} variant="outline" {...rest}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton
                {...(action === 'add' && { transform: 'rotate(45deg)' })}
                onClick={() => onClickButton(tag)}
              />
            </Tag>
          ),
      )}
    </Wrap>
  )
}
