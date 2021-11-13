/* eslint-disable react/no-children-prop */
import React, { FormEvent, useMemo, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { BsPerson } from 'react-icons/bs'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md' //MdOutlineEmail
import { useMutation } from 'react-query'

import { FormItem, Layout, SocialButtons } from '@components'

type SendMailVariables = {
  to: string
  from: string
  subject: string
  text: string
}

const initialState = {
  email: '',
  fullname: '',
  subject: '',
  message: '',
}

const initialErrors = {
  email: false,
  fullname: false,
  message: false,
}

const Contact = (): JSX.Element => {
  const { t } = useTranslation()
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState(initialErrors)

  const {
    mutate: sendForm,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<any, null, SendMailVariables>(
    formData => {
      return axios.post('https://samenvvvv.com/email', formData)
    },
    {
      onError: () => {
        setForm(initialState)
      },
      onSuccess: () => {
        setForm(initialState)
      },
    },
  )

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.currentTarget.id]: e.currentTarget.value })

  const handleValidation = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setErrors({
      ...errors,
      [e.currentTarget.id]: e.currentTarget.value.length <= 0,
    })

    console.error('errors', errors)
  }

  const isValid = useMemo(
    () => Object.values(errors).every(val => val === false),
    [errors],
  )

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    sendForm({
      to: 'talipaltas@gmail.com',
      from: 'no-reply@samenvvvv.com',
      subject: `Form from ${form.fullname} (${form.email})`,
      text: form.message,
    })
  }

  return (
    <Layout>
      <Flex justify="center" bg="#9DC4FB">
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>{t('contact')}</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    {t('contact_fill')}
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="#FF611A" size="20px" />}
                      >
                        +31-6 85221308
                      </Button>
                      <Button
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#FF611A" size="20px" />}
                      >
                        info@samenvvv.nl
                      </Button>
                      <Button
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="#FF611A" size="20px" />}
                      >
                        Rotterdam, Netherland
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <SocialButtons />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormItem
                        id="fullname"
                        label={t('contact_message_name')}
                        leftElement={<BsPerson color="gray.800" />}
                        error={errors.fullname}
                        errorText="Required"
                        onChange={handleChange}
                        onBlur={handleValidation}
                      />
                      <FormItem
                        id="email"
                        type="email"
                        label="Email"
                        errorText="Required"
                        leftElement={<MdEmail color="gray.200" />}
                        error={errors.email}
                        onChange={handleChange}
                        onBlur={handleValidation}
                      />
                      <FormItem
                        isTextarea
                        id="message"
                        label="Message"
                        error={errors.message}
                        errorText="Required"
                        onChange={handleChange}
                        onBlur={handleValidation}
                      />

                      <Button
                        variant="solid"
                        colorScheme="primary"
                        type="submit"
                        onClick={event => handleSubmit(event)}
                        isDisabled={!isValid}
                        isLoading={isLoading}
                        isFullWidth
                      >
                        {isLoading
                          ? t`contact_field.message_sending`
                          : t`contact_message_send`}
                      </Button>

                      {isSuccess && (
                        <Alert status="success">
                          <AlertIcon />
                          <AlertDescription>
                            {t('contact_field.message_delivered')}
                          </AlertDescription>
                        </Alert>
                      )}
                      {isError && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertDescription>
                            {t('contact_field.something_wrong')}
                          </AlertDescription>
                        </Alert>
                      )}
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}
export default Contact
export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
