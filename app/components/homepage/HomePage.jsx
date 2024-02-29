'use client'
import HomePageFooter from './HomePageFooter'
import HomePageHeader from './HomePageHeader'
import HeroSection from './HeroSection'
import WPMSPromoSection from './WPMSPromoSection'
import GetStartedSection from './GetStartedSection'

const HomeComponent = () => {
  return (
    <>
      <HomePageHeader />
      <main className="text-center leading-loose">
        <HeroSection />
        <WPMSPromoSection />
        {/* <DakiybuildsPromoSection /> */}
        <GetStartedSection />
      </main>
      <HomePageFooter />
    </>
  )
}

export default HomeComponent
