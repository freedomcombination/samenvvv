import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react'

interface FormItemProps {
  isTextarea?: boolean
  leftElement?: ReactNode
  label?: string
  type?: string
  id: string
  error?: boolean
  helperText?: string
  errorText?: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const FormItem = (props: FormItemProps): JSX.Element => {
  const {
    leftElement,
    isTextarea,
    error,
    type,
    helperText,
    errorText,
    label,
    id,
    onChange,
    onBlur,
  } = props

  const FormTag = isTextarea ? Textarea : Input
  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <InputGroup>
        {leftElement && (
          <InputLeftElement pointerEvents="none">
            {leftElement}
          </InputLeftElement>
        )}
        <FormTag id={id} type={type} onChange={onChange} onBlur={onBlur} />
      </InputGroup>
      <FormErrorMessage>{errorText}</FormErrorMessage>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
