import { StepType } from '@reactour/tour'
import { TFunction } from 'react-i18next'

export const getSteps = (
  t: TFunction<'translation', undefined>,
): StepType[] => [
  {
    selector: '[data-tour="step-post-content"]',
    content: t`steps.step-post-content`,
  },
  {
    selector: '[data-tour="step-post-text"]',
    content: t`steps.step-post-text`,
  },
  {
    selector: '[data-tour="step-post-mentions"]',
    content: t`steps.step-post-mentions`,
  },
  {
    selector: '[data-tour="step-mention-list"]',
    content: t`steps.step-mention-list`,
  },
  {
    selector: '[data-tour="step-search"]',
    content: t`steps.step-search`,
  },
  {
    selector: '[data-tour="step-trends"]',
    content: t`steps.step-trends`,
  },
  {
    selector: '[data-tour="step-character-limit"]',
    content: t`steps.step-character-limit`,
  },
  {
    selector: '[data-tour="step-share-button"]',
    content: t`steps.step-share-button`,
  },
  {
    selector: '[data-tour="step-next-button"]',
    content: t`steps.step-next-button`,
  },
]
export const getStepsMob = (
  t: TFunction<'translation', undefined>,
): StepType[] => [
  {
    selector: '[data-tour-mob="step-post-content"]',
    content: t`steps.step-post-content`,
  },
  {
    selector: '[data-tour-mob="step-post-text"]',
    content: t`steps.step-post-text`,
  },
  {
    selector: '[data-tour-mob="step-post-mentions"]',
    content: t`steps.step-post-mentions`,
  },
  {
    selector: '[data-tour-mob="step-mention-list"]',
    content: t`steps.step-mention-list`,
  },
  {
    selector: '[data-tour-mob="step-search"]',
    content: t`steps.step-search`,
  },
  {
    selector: '[data-tour-mob="step-trends"]',
    content: t`steps.step-trends`,
  },
  {
    selector: '[data-tour-mob="step-character-limit"]',
    content: t`steps.step-character-limit`,
  },
  {
    selector: '[data-tour-mob="step-share-button"]',
    content: t`steps.step-share-button`,
  },
]
