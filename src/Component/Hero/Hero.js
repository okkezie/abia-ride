import React from "react";
import Header from "../Header/Header";
import Image from "next/image";
import Iphone from "@/assets/images/iphone.png";
import Google from "@/assets/svgs/google.svg";
import Apple from "@/assets/svgs/apple.svg";
import Message from "@/assets/svgs/message.svg";

const Hero = ({scroller, navId}) => {
  return (
    <section className="relative h-full md:lg-[80vh] lg:h-[100vh] w-full bg-cover bg-no-repeat bg-[url(/images/hero-bg.jpg)]" id={navId}>
    <div className="absolute inset-0 bg-[#E9FFFA] opacity-90"></div>
  
    <div className="pt-[90px] lg:pt-[130px]">
      <Header />
  
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 pb-[50px] relative z-20 lg:px-0">
        <div className="w-[90%] lg:w-[35%] text-center lg:text-left lg:ml-8">
          <h1 className="text-2xl lg:text-4xl font-bold w-full lg:w-[400px]">
            Your Smooth Ride, Just a Tap Away
          </h1>
          <p className="text-gray-600 text-[14px] py-3">
            Experience hassle-free transportation with Abia Ride. Reliable
            rides, anytime, anywhere.
          </p>
  
          <div className="flex items-center justify-center lg:items-start gap-4 lg:gap-3 mt-4 lg:w-[350px]">
          <button className="flex gap-1 items-center text-[12px] md:text-[14px] py-1 bg-[#252B42] text-white px-3 rounded-lg w-[180px]">
              <Image
                src={Google}
                alt="Google"
                width={19}
                height={19}
              />
            
                Download on the Google Store
              
            </button>
  
            <button className="flex gap-1 items-center text-[12px] md:text-[14px] py-1 bg-[#252B42] text-white px-3 rounded-lg w-[180px]">
              <Image
                src={Apple}
                alt="Apple"
                width={19}
                height={19}
              />
            
                Download on the App Store
              
            </button>
          </div>
        </div>
  
        <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
          <Image src={Message} alt="Message" className="hidden lg:block relative left-[110px] bottom-[80px]"/>
          <Image
            src={Iphone}
            alt="Iphone"
            className="w-[150px] h-[200px]  md:w-[400px] md:h-[450px]"
          />
        </div>
      </div>
      <div className='text-white flex flex-col items-center justify-center animate-bounce'>
          <button className='rounded-full border border-white p-3' onClick={scroller}>
              <svg 
                  className="w-6 h-6 text-violet-500" 
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
  </section>
  
  );
};

export default Hero;
