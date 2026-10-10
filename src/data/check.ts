import type { CellKey, Device, Flow, Person, Step } from '../types'

export const DEVICES: Device[] = ['desktop', 'mobile']

export const FAIL_STEP = 5
export const LAST_STEP = 6

export const REGRESSION: { flow: number; device: Device; key: CellKey } = {
  flow: 4,
  device: 'mobile',
  key: '4:mobile',
}

export const CHECK = {
  repo: 'acme/web-app',
  pr: 248,
  prTitle: 'Add cookie consent + new checkout',
  sessions: 72,
  cost: '$2.04',
  duration: '4m 12s',
  failOn: 'high',
  commit: 'a3f9c21',
  commitMessage: 'add cookie consent banner',
}

export const FLOWS: Flow[] = [
  {
    name: 'Sign up with email',
    cells: {
      desktop: { pr: '3/3', prod: '3/3', verdict: 'same' },
      mobile: { pr: '3/3', prod: '3/3', verdict: 'same' },
    },
  },
  {
    name: 'Log in',
    cells: {
      desktop: { pr: '3/3', prod: '3/3', verdict: 'same' },
      mobile: { pr: '3/3', prod: '3/3', verdict: 'same' },
    },
  },
  {
    name: 'Search products',
    cells: {
      desktop: { pr: '3/3', prod: '3/3', verdict: 'same' },
      mobile: { pr: '3/3', prod: '2/3', verdict: 'improved' },
    },
  },
  {
    name: 'Add to cart',
    cells: {
      desktop: { pr: '3/3', prod: '3/3', verdict: 'same' },
      mobile: { pr: '3/3', prod: '3/3', verdict: 'same' },
    },
  },
  {
    name: 'Checkout with saved card',
    cells: {
      desktop: { pr: '3/3', prod: '3/3', verdict: 'same' },
      mobile: { pr: '0/3', prod: '3/3', verdict: 'regression' },
    },
  },
  {
    name: 'Reset password',
    cells: {
      desktop: { pr: '3/3', prod: '3/3', verdict: 'same' },
      mobile: { pr: '3/3', prod: '3/3', verdict: 'finding' },
    },
  },
]

export const PEOPLE: Person[] = [
  {
    name: 'Returning buyer',
    device: 'iPhone 15 · Safari',
    color: '#2d9ffe',
    prodTime: '41s',
    fixTime: '39s',
    reason:
      'The Pay button is behind a cookie banner, and the banner’s buttons are cut off, so I can’t close it. Tapping Pay just hits the banner.',
  },
  {
    name: 'First visit from Instagram',
    device: 'Pixel 8 · Chrome',
    color: '#8b5cf6',
    prodTime: '44s',
    fixTime: '45s',
    reason: 'A cookie notice fills the bottom of the screen and there’s no way to dismiss it. I tried Pay three times. Stuck.',
  },
  {
    name: 'Budget Android shopper',
    device: 'Android 14 · 5.5″ · Chrome',
    color: '#0ea5a4',
    prodTime: '58s',
    fixTime: '55s',
    reason: 'I can see the top edge of Pay, but tapping it does nothing. The banner text runs off the bottom with no buttons.',
  },
]

export const STEPS: Step[] = [
  { label: 'Open /products', short: 'Products', duration: '3s', time: 0, thought: 'Looking for the running shoes I bought last time.' },
  { label: 'Open “Aero Runner”, pick 42, add to cart', short: 'Product', duration: '8s', time: 7, thought: 'Size 42 like before. Adding it.' },
  { label: 'Open cart', short: 'Cart', duration: '3s', time: 22, thought: 'One pair, $129. Fine.' },
  { label: 'Continue to checkout', short: 'Shipping', duration: '6s', time: 30, thought: 'My address is already filled in.' },
  { label: 'Select saved card •••• 4242', short: 'Card', duration: '5s', time: 38, thought: 'I’ll use my saved card.' },
  { label: 'Tap “Pay $129”', short: 'Pay', duration: '6s', time: 44, thought: 'Paying.' },
  { label: 'See order confirmation', short: 'Done', duration: '4s', time: 52, thought: 'Order placed. Done.' },
]

export const FIX_PROMPT = `In src/components/CookieBanner.tsx the banner has a fixed height (h-[94px]) with overflow-hidden. Under 400px wide the copy wraps to four lines, so the Accept and Settings buttons are clipped and the banner can't be dismissed. It's position: fixed at the bottom, so it covers the Pay button on /checkout/payment.

1. Replace h-[94px] overflow-hidden with h-auto max-h-[50dvh] so the buttons always show.
2. In src/app/checkout/layout.tsx, add bottom padding equal to the banner's height while it's visible, so Pay is never underneath it.
3. Check at 375×667 and 390×844 that you can tap Pay with the banner open.`
