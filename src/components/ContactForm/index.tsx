import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { TFunction, useTranslation } from 'react-i18next'
import { BsPerson } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md' //MdOutlineEmail
import { useMutation } from 'react-query'
import * as yup from 'yup'

import { FormItem } from '@components'

type SendMailVariables = {
  to: string
  from: string
  subject: string
  text: string
}

type FormDataType = {
  fullname: string
  email: string
  message: string
}

const schema = (t: TFunction<'translation'>) =>
  yup.object({
    fullname: yup.string().required(t`contact.form.fullname-required`),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`contact.form.email-required`),
    message: yup.string().required(t`contact.form.message-required`),
  })

export const ContactForm = (): JSX.Element => {
  const { t } = useTranslation()

  const {
    mutate: sendForm,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<any, null, SendMailVariables>(
    formData => {
      return axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/email`, formData)
    },
    {
      onError: () => {
        reset()
      },
      onSuccess: () => {
        reset()
      },
    },
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const onSubmit = (data: FormDataType) => {
    sendForm({
      to: process.env.NEXT_PUBLIC_EMAIL_BASE as string,
      from: process.env.NEXT_PUBLIC_EMAIL_FROM as string,
      subject: `Form from ${data.fullname} (${data.email})`,
      text: data.message,
    })
  }

  return (
    <VStack spacing={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        id="fullname"
        label={t('contact.form.fullname-label')}
        leftElement={<BsPerson color="gray.800" />}
        errors={errors}
        register={register}
      />
      <FormItem
        id="email"
        type="email"
        label="Email"
        leftElement={<MdEmail color="gray.200" />}
        helperText={t`contact.form.email-helper`}
        errors={errors}
        register={register}
      />
      <FormItem
        isTextarea
        id="message"
        label={t('contact.form.message-label')}
        errors={errors}
        register={register}
      />

      <Button
        variant="solid"
        colorScheme="primary"
        type="submit"
        isDisabled={!isValid}
        isLoading={isLoading}
        isFullWidth
      >
        {t`contact.form.button`}
      </Button>

      {isSuccess && (
        <Alert status="success">
          <AlertIcon />
          <AlertDescription>
            {t('contact.form.message-delivered')}
          </AlertDescription>
        </Alert>
      )}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{t('contact.form.failed')}</AlertDescription>
        </Alert>
      )}
    </VStack>
  )
}
