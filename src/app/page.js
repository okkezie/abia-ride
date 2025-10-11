'use client'
import Contact from "@/Component/Contact/Contact";
import DownloadRider from "@/Component/DownloadRider/DownloadRider";
import Footer from "@/Component/Footer/Footer";
import Hero from "@/Component/Hero/Hero";
import ReadyToRide from "@/Component/ReadyToRide/ReadyToRide";
import RideOption from "@/Component/RideOption/RideOption";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [showNav, setShowNav] = useState(false)
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
     {/* Navigation Header */}
     <nav id={navId} className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16">
           <div className="flex items-center">
             <div className="flex-shrink-0">
               <h1 className="text-xl font-bold text-[#5F13FF]">Abia Ride</h1>
             </div>
           </div>

           <div className="hidden md:block">
             <div className="ml-10 flex items-baseline space-x-4">
               <Link href="/" className="text-gray-900 hover:text-[#5F13FF] px-3 py-2 rounded-md text-sm font-medium">
                 Home
               </Link>
               <Link href="/book" className="text-gray-700 hover:text-[#5F13FF] px-3 py-2 rounded-md text-sm font-medium">
                 Book Ride
               </Link>
               <Link href="/profile" className="text-gray-700 hover:text-[#5F13FF] px-3 py-2 rounded-md text-sm font-medium">
                 Profile
               </Link>
               <button className="bg-[#5F13FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A0FC8] transition-colors">
                 Sign In
               </button>
             </div>
           </div>

           <div className="md:hidden">
             <button
               onClick={() => setShowNav(!showNav)}
               className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#5F13FF]"
             >
               <span className="sr-only">Open main menu</span>
               <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
             </button>
           </div>
         </div>
       </div>

       {/* Mobile menu */}
       {showNav && (
         <div className="md:hidden">
           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
             <Link href="/" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
               Home
             </Link>
             <Link href="/book" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
               Book Ride
             </Link>
             <Link href="/profile" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
               Profile
             </Link>
             <button className="bg-[#5F13FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A0FC8] transition-colors w-full text-left">
               Sign In
             </button>
           </div>
         </div>
       )}
     </nav>

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
