import { CustomCursor, Grain, IntroCurtain } from '@/components/site/ambient'
import { Branches } from '@/components/site/branches'
import { CartProvider } from '@/components/site/cart-context'
import { Categories } from '@/components/site/categories'
import { ContactCta, Footer, WhatsappFloat } from '@/components/site/contact-footer'
import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { CategoryMarquee, Stats } from '@/components/site/marquee-stats'
import { Promotions } from '@/components/site/promotions'
import { Instagram, OnlineStore } from '@/components/site/store-social'
import { Brands, WhyRopelato } from '@/components/site/why-brands'

export default function Page() {
  return (
    <CartProvider>
      <IntroCurtain />
      <Header />
      <main>
        <Hero />
        <CategoryMarquee />
        <Stats />
        <Categories />
        <Promotions />
        <WhyRopelato />
        <Brands />
        <Branches />
        <OnlineStore />
        <Instagram />
        <ContactCta />
      </main>
      <Footer />
      <WhatsappFloat />
      <Grain />
      <CustomCursor />
    </CartProvider>
  )
}
