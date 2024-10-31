import Image from "next/image";
import React from "react";
import Ride from "@/assets/images/ride.png";
import { ReadyRide } from "@/data/readyToRide";

const ReadyToRide = () => {
  return (
    <section className="py-3">
      <div className="flex flex-col items-center m-auto w-full py-10 px-4 lg:px-0">
        <h1 className="font-bold text-center text-[25px]">Ready to Ride?</h1>
        <p className="text-[12px] text-center text-gray-600 w-[60%] lg:w-[30%]">
          Embrace life's vastness, venture forth, and discover the wonders
          waiting beyond. The world beckons; seize its grand offerings now!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 px-4 lg:px-0">
        <Image src={Ride} alt="Ride" width={500} height={500} />

        <div className="flex flex-col items-center lg:flex-row flex-wrap gap-5 lg:gap-6 w-full lg:w-[30%]">
          {ReadyRide.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-[80%] lg:w-[45%] p-3 border rounded-lg"
            >
              <Image
                src={item.messageBox}
                alt="MessageBox"
                width={50}
                height={50}
              />
              <p className="font-bold text-[14px] mt-2">
                {item.title}
              </p>
              <span className="text-gray-600 text-[12px]">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadyToRide;
