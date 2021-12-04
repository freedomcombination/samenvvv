import React from 'react'

import { Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Container, Layout } from '@components' //Markdown

const OverOns = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Container>
        <Stack spacing={6}>
          <Heading>{t('about-us.who-we-are.title')}</Heading>
          {
            //<Markdown source={t('about-us.who-we-are.title')} />
          }
          <Text fontSize="xl">{t('about-us.who-we-are.description')}</Text>
          <Heading>{t('about-us.our-vision.title')}</Heading>
          <Text fontSize="xl">{t('about-us.our-vision.description')}</Text>
          <Heading>{t('about-us.our-mission.title')}</Heading>
          <Text fontSize="xl">{t('about-us.our-mission.description')}</Text>
          <Heading>{t('about-us.our-aim.title')}</Heading>
          <Text fontSize="xl">{t('about-us.our-aim.description')}</Text>
        </Stack>
      </Container>
    </Layout>
  )
}

export default OverOns
export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
/*
"about-us": {
    "who-we-are": {
      "title": "Biz kimiz?",
      "description": [
        "Hukukun üstünlüğünü, demokrasi ve insan haklarını destekleyen, Hollanda’da yaşayan değişik meslek sahibi gönüllüler tarafından kurulmuştur. Ekibimiz ağırlıklı olarak Türkiye’yi siyasi nedenlerle terk eden kişilerden oluşur."
      ]
    },
    "our-vision": {
      "title": "Vizyonumuz:",
      "description": [
        "İnsan hakları ihlalleri kamuoyuna paylaşıldıkça ihlaller azalacak veya sona erecektir."
      ]
    },
    "our-mission": {
      "title": "Misyonumuz:",
      "description": [
        "Türkiye’de meydana gelen ve Türk devletinin diğer ülkelerde yaptığı insan hakları ihlallerini, bundan dolayı oluşan mağduriyetler konusundaki doğru bilgiyi kamuoyuyla paylaşmak."
      ]
    },
    "our-aim": {
      "title": "Amacımız:",
      "description": [
        "Wees de stem voor vrijheid (WSVV) Türkiye’de meydana gelen ve Türk devletinin diğer ülkelerde yaptığı insan hakları ihlallerini, bundan dolayı oluşan mağduriyetler konusundaki doğru bilgiyi kamuoyuyla paylaşmak."
      ]
    }
  },

*/
