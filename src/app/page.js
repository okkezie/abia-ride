'use client'
import Contact from "@/Component/Contact/Contact";
import DownloadRider from "@/Component/DownloadRider/DownloadRider";
import Footer from "@/Component/Footer/Footer";
import Hero from "@/Component/Hero/Hero";
import ReadyToRide from "@/Component/ReadyToRide/ReadyToRide";
import RideOption from "@/Component/RideOption/RideOption";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const divId = "div-id"
  const navId = "nav-id"

  const scrollToDiv = () => {
    document
        .getElementById(divId)
        .scrollIntoView({behavior: 'smooth'})
  }

  const scrollToTop = () => {
      document
        .getElementById(navId)
        .scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
      window.onscroll = () => {
          if(window.scrollY) {
              setShowScrollToTop(true)
          } else {
              setShowScrollToTop(false)
          }
      }
  }, [])

  return (
    <div className="relative">
     <Hero scroller={scrollToDiv} navId={navId} />
     <RideOption id={divId}/>
     <ReadyToRide />
     <DownloadRider />
     <Contact />
     <Footer />
     <div className={
            clsx(
                'fixed right-10 bottom-10 text-[#5F13FF] z-50',
                'transition-opacity ease-in-out duration-700',
                {'opacity-100': showScrollToTop, 'opacity-0': !showScrollToTop}
            )}
        >
            <button className='rounded-full border border-[#5F13FF] p-3' onClick={scrollToTop}>
                <svg 
                    className="w-6 h-6 text-violet-500 rotate-180" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </button>
        </div>
    </div>
  )
}
