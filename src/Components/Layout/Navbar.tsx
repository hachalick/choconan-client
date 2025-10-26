import Image from "next/image";
import Link from "next/link";
import React from "react";
import SliderMenu from "../Customs/SliderMenu";
import BtnBackHistory from "../Customs/BtnBackHistory";
import BtnForwardHistory from "../Customs/BtnForwardkHistory";
import BtnUpToPage from "../Customs/BtnUpToPage";

function Navbar() {
  return (
    <div className="">
      {/* <Link href="/" className="mr-2 absolute left-[calc(50%-40px)]">
        <Image
          src="/h-logo.svg"
          alt="choconan Logo"
          width={40}
          height={40}
          priority
          className="w-24 backdrop-blur-lg px-4 py-1 bg-cooooooooooooooooooloooooooooo/60 rounded-full shadow-primary-sm"
        />
      </Link> */}
      <SliderMenu />
      {/* <BtnForwardHistory />
      <BtnUpToPage />
      <BtnBackHistory /> */}
    </div>
  );
}

export default Navbar;
