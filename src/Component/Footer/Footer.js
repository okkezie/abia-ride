import Image from "next/image";
import React from "react";
import Facebook from "@/assets/svgs/facebook.svg";
import Instagram from "@/assets/svgs/instagram.svg";
import Twitter from "@/assets/svgs/twitter.svg";
import { CompanyInfo } from "@/data/companyInfoFooter";
import { Feature } from "@/data/featureFooter";

const Footer = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-5 justify-around pl-[20px] pt-[50px] lg:pt-[150px] pb-[50px]">
        <div className="">
          <p className="font-bold text-[18px]">Abia Ride</p>
          <p className="py-2 md:py-4 text-gray-600 text-[12px] md:text-[14px]">
            The ride hailing service for the people.
          </p>

          <div className="flex gap-2 cursor-pointer">
            <Image src={Facebook} alt="Facebook" width={20} height={20} />
            <Image src={Instagram} alt="Instagram" width={20} height={20} />
            <Image src={Twitter} alt="Twitter" width={20} height={20} />
          </div>
        </div>

        <div>
          <ul>
            <li className="font-bold text-[18px]">
              Company Info
            </li>
            {CompanyInfo.map((links, index) => (
              <li key={index} className="py-2 cursor-pointer text-[12px] md:text-[14px]">
                {links.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            <li className="font-bold text-[18px]">Feature</li>
            {Feature.map((links, index) => (
              <li key={index} className="py-2 cursor-pointer text-[12px] md:text-[14px]">
                {links.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="flex justify-center items-center bg-[#E9FFFA] text-[12px] p-5">
        Made With Love By Abia Ride All Right Reserved{" "}
      </span>
    </section>
  );
};

export default Footer;
