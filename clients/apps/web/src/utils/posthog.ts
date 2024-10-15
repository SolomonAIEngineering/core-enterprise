import { Properties, posthog } from 'posthog-js'

// https://posthog.com/product-engineers/5-ways-to-improve-analytics-data#suggested-naming-guide

// PostHog Events Naming Convention
//
// ${Category}:${Noun}:${Verb}
//
type Category =
  | 'articles'
  | 'benefits'
  | 'subscriptions'
  | 'user'
  | 'organizations'

type Noun = string

// Verbs in past tense
type Verb =
  | 'click'
  | 'submit'
  | 'create'
  | 'view'
  | 'add'
  | 'invite'
  | 'update'
  | 'delete'
  | 'remove'
  | 'start'
  | 'end'
  | 'cancel'
  | 'fail'
  | 'generate'
  | 'send'
  | 'archive'
  | 'done'


export type EventName = `${Category}:${Noun}:${Verb}`

export const captureEvent = (event: EventName, properties?: Properties) => {
  posthog.capture(event, properties)
}
