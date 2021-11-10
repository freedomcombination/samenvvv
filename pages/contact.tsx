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
import sgMail from '@sendgrid/mail'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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
  const [errors, setErrors] = useState<any>({})

  //   Setting button text
  const button_text = t('contact_message_send')
  const [buttonText, setButtonText] = useState(button_text)

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false)

  const handleValidation = () => {
    const tempErrors: any = {}
    let isValid = true

    if (fullname.length <= 0) {
      tempErrors['fullname'] = true
      isValid = false
    }
    if (email.length <= 0) {
      tempErrors['email'] = true
      isValid = false
    }
    if (message.length <= 0) {
      tempErrors['message'] = true
      isValid = false
    }

    setErrors({ ...tempErrors })
    return isValid
  }

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const validation = handleValidation()
    //console.log('validation:  ', validation)
    if (validation) {
      const message_sending = t('contact_field.message_sending')
      setButtonText(message_sending)
      //const sengridApiKey = process.env.SENDGRID_API_KEY
      // sgMail.setApiKey(sengridApiKey)
      const msg = {
        to: 'info@samenvvv.nl', // Change to your recipient
        from: 'test@example.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: message,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          //  console.log('Email sent')
        })
        .catch((error: any) => {
          console.error(error)
        })
      /*
module.exports = function(ctx, cb) {    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
 var sendgrid = require(‘sendgrid’)(‘[YOUR_SENDGRID_API]’);
 var email = new sendgrid.Email({
   to: ‘info@samenvvv.nl’,
   from: ctx.data.from,
   subject: ‘[YOUR_DESIRED_SUBJECT]’,
   html: “Name: “ + ctx.data.name + “<br/><br/>Message: “ + ctx.data.message
 });
  sendgrid.send(email, function(err, json) {
   if (err) { 
     cb(err) 
   } else { 
     cb(null, “Your message has been submitted!”)
   }
  });
}


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
      console.log('response error: ', error)
    
      if (false) {
        //  console.log('response error: ', error)
        setShowSuccessMessage(false)
        setShowFailureMessage(true)
        setButtonText('Send')

        // Reset form fields
        setFullname('')
        setEmail('')
        setMessage('')
        return
      }
        */
      setShowSuccessMessage(true)
      setShowFailureMessage(false)
      setFullname('')
      setEmail('')
      setMessage('')
      setErrors('')
      setButtonText(button_text)
      // Reset form fields
    }
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
                              name="fullname"
                              value={fullname}
                              size="md"
                              isRequired
                              onChange={e => {
                                setFullname(e.target.value)
                              }}
                            />{' '}
                            {errors?.fullname && (
                              <p className="text-red-500">
                                {t('contact_field.fullname_empty')}
                              </p>
                            )}
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
                              name="email"
                              value={email}
                              size="md"
                              isRequired
                              onChange={e => {
                                setEmail(e.target.value)
                              }}
                            />{' '}
                            {errors?.email && (
                              <p className="text-red-500">
                                {t('contact_field.email_empty')}
                              </p>
                            )}
                          </InputGroup>
                          <FormHelperText>
                            {t('contact_field.email_share')}
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
                            name="message"
                            value={message}
                            onChange={e => {
                              setMessage(e.target.value)
                            }}
                          />
                          {errors?.message && (
                            <p className="text-red-500">
                              {t('contact_field.message_empty')}
                            </p>
                          )}
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
                            {buttonText}
                          </Button>

                          <div className="text-left">
                            {showSuccessMessage && (
                              <p className="text-green-500 font-semibold text-sm my-2">
                                {t('contact_field.message_delivered')}
                              </p>
                            )}
                            {showFailureMessage && (
                              <p className="text-red-500">
                                {t('contact_field.something_wrong')}
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

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
