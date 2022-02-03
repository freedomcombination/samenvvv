import React, { useEffect, useRef, useState } from 'react'

import {
  chakra,
  useBoolean,
  usePrevious,
  useUpdateEffect,
} from '@chakra-ui/react'
import useDebounce from '@rooks/use-debounce'

import { setPostText, useAppDispatch, useAppSelector } from '@store'

export const PostTextarea = () => {
  const [editable, setEditable] = useBoolean(false)
  const { postText } = useAppSelector(state => state.postShare)
  const [editArea, setEditArea] = useState<string>(postText)
  const prevText = usePrevious(editArea)

  const contentRef = useRef<HTMLTextAreaElement | null>(null)

  const dispatch = useAppDispatch()

  const onChangeContent = useDebounce((): void => {
    dispatch(setPostText(editArea))
  }, 800)

  useUpdateEffect(() => {
    if (prevText && prevText !== editArea) {
      onChangeContent()
    }
  }, [editArea, onChangeContent])

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
      rows={6}
      ref={contentRef}
      p={2}
      w="full"
      onBlur={setEditable.toggle}
      onChange={event => {
        setEditArea(event.target.value)
      }}
      value={editArea}
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
      {editArea}
    </chakra.div>
  )
}
