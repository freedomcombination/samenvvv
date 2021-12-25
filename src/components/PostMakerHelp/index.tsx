import { TFunction } from 'react-i18next'

export const steps = (t: TFunction<'translation', undefined>): any => [
  {
    selector: '[data-tour="step-1"]',
    content: <p>{t`steps.step1`}</p>,
  },
  {
    selector: '[data-tour="step-2"]',
    content: <p>{t`steps.step2`}</p>,
  },
  {
    selector: '[data-tour="step-3"]',
    content: <p>{t`steps.step3`}</p>,
  },
  {
    selector: '[data-tour="step-4"]',
    content: <p>{t`steps.step4`}</p>,
  },
  {
    selector: '[data-tour="step-5"]',
    content: <p>{t`steps.step5`}</p>,
  },
  {
    selector: '[data-tour="step-6"]',
    content: <p>{t`steps.step6`}</p>,
  },
  {
    selector: '[data-tour="step-7"]',
    content: <p>{t`steps.step7`}</p>,
  },
  {
    selector: '[data-tour="step-8"]',
    content: <p>{t`steps.step8`}</p>,
  },
  {
    selector: '[data-tour="step-9"]',
    content: <p>{t`steps.step9`}</p>,
  },
]
