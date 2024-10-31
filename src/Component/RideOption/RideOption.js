import Image from "next/image";
import React from "react";
import Bg from "@/public/images/Ellipse.png";
import Iphone from "@/public/images/iphone.png";
import { RideSecure, RideWork } from "@/data/rideOption";

const RideOption = () => {
  return (
    <section className="py-3">
      <div className="flex flex-col items-center m-auto w-full py-10 px-4 lg:px-0">
        <h1 className="font-bold text-center text-[25px]">
          How Abia Ride Work
        </h1>
        <p className="text-[12px] text-center text-gray-600 w-[60%] lg:w-[30%]">
          Embrace life's vastness, venture forth, and discover the wonders
          waiting beyond. The world beckons; seize its grand offerings now!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="order-1 lg:order-1 w-[80%] lg:w-[25%]">
          {RideWork.map((item, index) => (
            <div key={index} className="flex flex-col lg:items-end p-3 my-3 md:my-6 border lg:border-none rounded-lg">
              <Image src={item.circle} alt="Circle" width={50} height={50} />
              <p className="font-bold text-[14px] mt-2">
                {item.title}
              </p>
              <span className="text-gray-600 text-[12px] w-full lg:w-[200px] text-right">
                {item.description}
              </span>
            </div>
          ))}
        </div>

        <div className="order-3 lg:order-2 flex justify-center relative py-[100px]">
          <Image src={Bg} alt="Bg" width={350} height={200} />
          <div className="flex items-center justify-center absolute inset-0">
            <Image src={Iphone} alt="Iphone" />
          </div>
        </div>

        <div className="order-2 lg:order-3 w-[80%] lg:w-[30%]">
          {RideSecure.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 my-3 md:my-6 border lg:border-none rounded-lg p-2"
            >
              <Image src={item.circle} alt="Circle" width={50} height={50} />
              <p className="font-bold text-[14px] mt-2">
                {item.title}
              </p>
              <span className="text-gray-600 text-[12px] w-full lg:w-[200px]">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RideOption;