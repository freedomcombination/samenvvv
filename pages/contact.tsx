/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsPerson } from 'react-icons/bs'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md' //MdOutlineEmail

import { Container, Layout, SocialButtons } from '@components'

const Contact = (): JSX.Element => {
  const { t } = useTranslation()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  //   Form validation
  // const [error, setErrors] = useState({})

  //   Setting button text
  const [buttonText, setButtonText] = useState('Send')

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false)

  const handleValidation = () => {
    /*
    const tempErrors = {}
    const isValid = true
    
    if (fullname.length <= 0) {
      tempErrors['fullname'] = true
      isValid = false
    }
    if (email.length <= 0) {
      tempErrors['email'] = true
      isValid = false
    }
    if (subject.length <= 0) {
      tempErrors['subject'] = true
      isValid = false
    }
    if (message.length <= 0) {
      tempErrors['message'] = true
      isValid = false
    }

    setErrors({ ...tempErrors })
    console.log('errors', errors)
    return isValid*/
  }

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    handleValidation()
    if (true) {
      setButtonText('Sending')
      const res = await fetch('/api/sendgrid', {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          message: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { error } = await res.json()
      if (error) {
        // console.log(error)
        setShowSuccessMessage(false)
        setShowFailureMessage(true)
        setButtonText('Send')

        // Reset form fields
        setFullname('')
        setEmail('')
        setMessage('')
        return
      }
      setShowSuccessMessage(true)
      setShowFailureMessage(false)
      setButtonText('Send')
      // Reset form fields
      setFullname('')
      setEmail('')
      setMessage('')
      // setErrors('')
    }
    //console.log(fullname, email, subject, message)
  }
  return (
    <Layout>
      <Container
        bg="#9DC4FB"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
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
                          size="md"
                          height="48px"
                          width="190px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          leftIcon={<MdPhone color="#FF611A" size="20px" />}
                        >
                          +31-6 85221308
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          leftIcon={<MdEmail color="#FF611A" size="20px" />}
                        >
                          info@samenvvv.nl
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="240px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: '2px solid #1C6FEB' }}
                          leftIcon={
                            <MdLocationOn color="#FF611A" size="20px" />
                          }
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
                        <FormControl id="name">
                          <FormLabel>{t('contact_message_name')}</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BsPerson color="gray.800" />}
                            />
                            <Input
                              type="text"
                              size="md"
                              isRequired
                              onChange={e => {
                                setFullname(e.target.value)
                              }}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Mail</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdEmail color="gray.200" />}
                            />
                            <Input
                              type="email"
                              size="md"
                              isRequired
                              onChange={e => {
                                setEmail(e.target.value)
                              }}
                            />{' '}
                          </InputGroup>
                          <FormHelperText>
                            We will never share your email.
                          </FormHelperText>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>{t('contact_message')}</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: 'gray.300',
                            }}
                            placeholder="message"
                            isRequired
                            onChange={e => {
                              setMessage(e.target.value)
                            }}
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            variant="solid"
                            bg="#FF611A"
                            color="white"
                            _hover={{}}
                            type="submit"
                            onClick={event => handleSubmit(event)}
                          >
                            {t('contact_message_send')}
                            {buttonText}
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="text-cyan-500 ml-2"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Button>

                          <div className="text-left">
                            {showSuccessMessage && (
                              <p className="text-green-500 font-semibold text-sm my-2">
                                Thankyou! Your Message has been delivered.
                              </p>
                            )}
                            {showFailureMessage && (
                              <p className="text-red-500">
                                Oops! Something went wrong, please try again.
                              </p>
                            )}
                          </div>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}
export default Contact
