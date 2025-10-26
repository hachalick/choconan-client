import Image from "next/image";
import React from "react";

function BannerLove() {
  return (
    <div className="bg-black w-full h-80 relative flex items-center justify-center rounded-2xl">
      <Image
        src={"/assets/image/banner/banner-love.jpg"}
        alt="banner"
        width={6720}
        height={4480}
        className="object-cover h-80 rounded-2xl"
        loading="lazy"
      />
      <h1 className="absolute font-extrabold md:text-5xl text-xl">کافه شوکونان</h1>
    </div>
  );
}

export default BannerLove;
