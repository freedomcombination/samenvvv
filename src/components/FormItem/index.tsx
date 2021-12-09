import { ReactNode } from 'react'

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
import { UseFormRegister } from 'react-hook-form'

interface FormItemProps {
  isTextarea?: boolean
  leftElement?: ReactNode
  label?: string
  type?: string
  id: string
  helperText?: string
  errors?: {
    [x: string]: any
  }
  register: UseFormRegister<any>
}

export const FormItem = (props: FormItemProps): JSX.Element => {
  const {
    id,
    type,
    isTextarea,
    leftElement,
    label,
    helperText,
    errors,
    register,
  } = props

  const Tag = isTextarea ? Textarea : Input

  return (
    <FormControl isInvalid={errors?.[id]}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <InputGroup>
        {leftElement && (
          <InputLeftElement pointerEvents="none">
            {leftElement}
          </InputLeftElement>
        )}
        <Tag id={id} type={type} placeholder={label} {...register(id)} />
      </InputGroup>
      <FormErrorMessage>{errors?.[id]?.message}</FormErrorMessage>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
