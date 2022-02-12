import React, { ChangeEvent, useEffect, useRef } from 'react'

import { chakra, useBoolean } from '@chakra-ui/react'

import { useAppSelector } from '@store'

export const PostTextarea = () => {
  const [editable, setEditable] = useBoolean(false)
  const { postText } = useAppSelector(state => state.postShare)

  const text = useRef<string>(postText)

  const contentRef = useRef<HTMLTextAreaElement | null>(null)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    text.current = e.target.value
  }

  useEffect(() => {
    text.current = postText
  }, [postText])

  useEffect(() => {
    if (editable) {
      contentRef.current?.focus()
      contentRef.current?.select()
    }
  }, [editable])

  return editable ? (
    <chakra.textarea
      borderColor="gray.500"
      borderWidth={1}
      rounded="lg"
      rows={4}
      ref={contentRef}
      p={2}
      w="full"
      onBlur={setEditable.toggle}
      onChange={handleChange}
      defaultValue={text.current}
    />
  ) : (
    <chakra.div
      data-tour="step-post-text"
      data-tour-mob="step-post-text"
      p={2}
      cursor="text"
      borderWidth={2}
      borderColor="transparent"
      rounded="lg"
      transition="all 0.3s ease-in-out"
      _hover={{ borderColor: 'gray.400', bg: 'white' }}
      whiteSpace="pre-line"
      onClick={setEditable.toggle}
      overflow="auto"
    >
      {postText}
    </chakra.div>
  )
}
