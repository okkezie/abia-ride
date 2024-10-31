"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svgs/Logo.svg";
import Hamburger from "@/assets/svgs/hamburger.svg";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const links = [
    { id: 1, link: "Home" },
    { id: 2, link: "About" },
    { id: 3, link: "Contact" },
    { id: 4, link: "Blog" },
  ];

  return (
    <section className="fixed top-0 z-[100] w-full bg-white shadow-md">
  <div className="flex items-center justify-between px-[30px] lg:px-[100px] py-4">
    <Link href="/">
      <Image src={Logo} alt="logo" width={100} height={100} />
    </Link>

    <div className="hidden lg:flex items-center gap-10">
      {links.map(({ id, link }) => (
        <Link key={id} href={`/${link}`}>
          <p className="text-gray-800 hover:text-black cursor-pointer font-medium">
            {link}
          </p>
        </Link>
      ))}
    </div>

    <div className="hidden lg:flex">
      <button className="bg-[#23856D] rounded-full text-white px-4 py-2 hover:bg-[#1d6e57]">
        Join the waitlist
      </button>
    </div>

    <div className="lg:hidden flex items-center">
      <button onClick={() => setNavOpen(!navOpen)}>
        <Image src={Hamburger} alt="Menu" width={24} height={24} />
      </button>
    </div>

    {navOpen && (
      <div className="lg:hidden flex flex-col items-center bg-white gap-6 w-full h-screen absolute top-16 left-0">
        {links.map(({ id, link }) => (
          <p key={id} className="py-2">
            <Link href={`/${link}`} passHref onClick={() => setNavOpen(false)}>
              {link}
            </Link>
          </p>
        ))}
        <div>
          <button className="bg-[#23856D] rounded-full text-white px-4 py-2 hover:bg-[#1d6e57]">
            Join the waitlist
          </button>
        </div>
      </div>
    )}
  </div>
</section>

  );
};

export default Header;
