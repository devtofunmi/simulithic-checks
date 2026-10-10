import type { ReactNode } from 'react'

const PRODUCTS = [
  { name: 'Aero Runner', price: '$129', gradient: 'from-[#ffd6a5] to-[#ff9f7a]' },
  { name: 'Trail Mid', price: '$149', gradient: 'from-[#cde8ff] to-[#7fb8ff]' },
  { name: 'Daily Knit', price: '$99', gradient: 'from-[#d9f2d0] to-[#8ed18a]' },
  { name: 'Court Low', price: '$119', gradient: 'from-[#eadcff] to-[#b79cff]' },
]

const cta = 'mt-auto rounded-[9px] bg-ink p-[9px] text-center font-semibold text-white'
const box = 'flex items-center gap-[7px] rounded-[9px] border border-line p-2'
const selected = 'border-ink shadow-[0_0_0_1px_var(--color-ink)]'

function AppHeader() {
  return (
    <div className="flex items-center justify-between font-bold tracking-tight">
      acme
      <i className="block size-3.5 rounded bg-line-2" />
    </div>
  )
}

function Radio({ checked = false }: { checked?: boolean }) {
  return (
    <span
      className={`size-[11px] shrink-0 rounded-full ${checked ? 'border-[3.5px] border-ink' : 'border-[1.5px] border-faint'}`}
    />
  )
}

function Title({ children }: { children: ReactNode }) {
  return <div className="text-[13.5px] font-bold tracking-tight">{children}</div>
}

function CookieBanner() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-[2] h-[94px] animate-banner overflow-hidden bg-[#1c1f26] px-3 py-[11px] text-[9.3px] leading-[1.45] text-[#e7e9ee]">
      We use cookies and similar technologies to improve your experience, measure traffic and personalise content. You can
      change your preferences at any time in Settings.
      <div className="mt-2 flex gap-1.5">
        <span className="flex-1 rounded-md bg-[#2c313b] p-1.5 text-center">Settings</span>
        <span className="flex-1 rounded-md bg-white p-1.5 text-center font-semibold text-[#111]">Accept all</span>
      </div>
    </div>
  )
}

interface PhoneScreenProps {
  step: number
  showBanner: boolean
}

export function PhoneScreen({ step, showBanner }: PhoneScreenProps) {
  switch (step) {
    case 0:
      return (
        <>
          <AppHeader />
          <Title>New in</Title>
          <div className="grid grid-cols-2 gap-[7px]">
            {PRODUCTS.map((product, index) => (
              <div key={product.name}>
                <div
                  data-target={index === 0 ? true : undefined}
                  className={`mb-[3px] aspect-square rounded-[9px] bg-linear-135 ${product.gradient}`}
                />
                <b className="block font-semibold">{product.name}</b>
                <span className="text-muted">{product.price}</span>
              </div>
            ))}
          </div>
        </>
      )
    case 1:
      return (
        <>
          <AppHeader />
          <div className="aspect-[1.15] rounded-xl bg-linear-135 from-[#ffd6a5] to-[#ff9f7a]" />
          <Title>Aero Runner</Title>
          <div className="text-muted">$129 · Free returns</div>
          <div className="flex gap-1">
            {['40', '41', '42', '43'].map((size) => (
              <span
                key={size}
                className={`rounded-[5px] border px-1.5 py-0.5 ${size === '42' ? 'border-ink font-semibold' : 'border-line'}`}
              >
                {size}
              </span>
            ))}
          </div>
          <div data-target className={cta}>
            Add to cart
          </div>
        </>
      )
    case 2:
      return (
        <>
          <AppHeader />
          <Title>Cart</Title>
          <div className={box}>
            <div className="size-[30px] rounded-[7px] bg-linear-135 from-[#ffd6a5] to-[#ff9f7a]" />
            <div className="flex-1">
              <b>Aero Runner</b>
              <div className="text-muted">Size 42</div>
            </div>
            <b>$129</b>
          </div>
          <div className="flex justify-between border-b border-line-2 py-[7px]">
            <span className="text-muted">Subtotal</span>
            <b>$129</b>
          </div>
          <div data-target className={cta}>
            Checkout
          </div>
        </>
      )
    case 3:
      return (
        <>
          <AppHeader />
          <Title>Shipping</Title>
          <div className={`${box} ${selected}`}>
            <Radio checked />
            <div>
              <b>Home</b>
              <div className="text-muted">12 Admiralty Way, Lekki</div>
            </div>
          </div>
          <div className={box}>
            <Radio />
            <div>
              <b>Office</b>
              <div className="text-muted">4 Broad St, Lagos Island</div>
            </div>
          </div>
          <div data-target className={cta}>
            Continue to payment
          </div>
        </>
      )
    case 4:
    case 5:
      return (
        <>
          <AppHeader />
          <Title>Payment</Title>
          <div data-target={step === 4 ? true : undefined} className={`${box} ${step === 5 ? selected : ''}`}>
            <Radio checked={step === 5} />
            <span className="h-[13px] w-5 shrink-0 rounded-[3px] bg-linear-135 from-[#1a1f71] to-[#3b48c4]" />
            <div className="flex-1">
              <b>•••• 4242</b>
              <div className="text-muted">Expires 08/28</div>
            </div>
          </div>
          <div className={box}>
            <Radio />
            <div>Add new card</div>
          </div>
          <div className="flex justify-between border-b border-line-2 py-[7px]">
            <span className="text-muted">Total</span>
            <b>$129.00</b>
          </div>
          <div data-target={step === 5 ? true : undefined} className={`${cta} ${showBanner ? 'mb-[58px]' : ''}`}>
            Pay $129
          </div>
          {showBanner && <CookieBanner />}
        </>
      )
    default:
      return (
        <div className="m-auto flex flex-col items-center gap-[7px] text-center">
          <div className="grid size-[42px] animate-pop place-items-center rounded-full bg-good-soft text-lg text-good">✓</div>
          <Title>Order placed</Title>
          <div className="text-muted">#A-20491 · arriving Thu</div>
        </div>
      )
  }
}
