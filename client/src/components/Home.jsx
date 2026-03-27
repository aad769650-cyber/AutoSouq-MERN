import React from 'react'
import AutoSouqHero from './HeroSection'
import InfiniteScroller from './Scroll'
import CarListings from './Listings'
import WhyChoose from './WhyChoose'
import FAQ from './FAQS'
import Footer from './Footer'

const Home = () => {
  return (
  
  <>
  <AutoSouqHero></AutoSouqHero>
  {/* <InfiniteScroller></InfiniteScroller> */}
  <CarListings></CarListings>
  <WhyChoose></WhyChoose>
  <FAQ></FAQ>
  <Footer></Footer>
  </>
  )
}

export default Home