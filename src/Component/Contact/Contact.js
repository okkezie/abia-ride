import React from "react";

const Contact = () => {
  return (
    <section className="py-7">
      <div className="flex flex-col items-center justify-center gap-2">
        <button className="bg-[#23856D1A] text-[#23856D] rounded-[50px] font-medium text-[12px] py-2 px-4"> Abia Ride is Coming soon</button>
        <span className="text-[16px] lg:text-4xl font-bold w-[80%] lg:w-[40%] text-center">Be the first to know when we launch and get amazing Discounts!</span>
       
        <div className="flex flex-col lg:flex-row justify-center gap-2 pt-6 w-[90%] md:w-[50%]">
          <input type="text" placeholder="Enter Email Address" className="border rounded-[50px] bg-[#F5F5F5] w-full lg:w-[50%] px-3 py-1 outline-none" />
          
          <div className="flex justify-center">
            <button className="bg-[#23856D] rounded-full text-white px-3 py-2 md:py-1 hover:bg-[#1d6e57] text-[12px] w-full">
              Join the waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
