import { StepType } from '@reactour/tour'
import { TFunction } from 'react-i18next'

export const getSteps = (
  t: TFunction<'translation', undefined>,
): StepType[] => [
  {
    selector: '[data-tour="step-1"]',
    content: t`steps.step1`,
  },
  {
    selector: '[data-tour="step-2"]',
    content: t`steps.step2`,
  },
  {
    selector: '[data-tour="step-3"]',
    content: t`steps.step3`,
  },
  {
    selector: '[data-tour="step-4"]',
    content: t`steps.step4`,
  },
  {
    selector: '[data-tour="step-5"]',
    content: t`steps.step5`,
  },
  {
    selector: '[data-tour="step-6"]',
    content: t`steps.step6`,
  },
  {
    selector: '[data-tour="step-7"]',
    content: t`steps.step7`,
  },
  {
    selector: '[data-tour="step-8"]',
    content: t`steps.step8`,
  },
  {
    selector: '[data-tour="step-9"]',
    content: t`steps.step9`,
  },
]
