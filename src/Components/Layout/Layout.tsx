import React from "react";
import Header from "./Header";
import MenuMobile from "./MenuMobile";
import Footer from "./Footer";

export default function Layout({
  variant,
  children,
}: {
  variant: "dashboard" | "website";
  children: React.ReactNode;
}) {
  if (variant === "website") {
    return <Website>{children}</Website>;
  } else if (variant === "dashboard") {
    return <Dashboard>{children}</Dashboard>;
  } else {
    return <div>{children}</div>;
  }
}

function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-2 bg-primary-12 text-primary-84 font-iranyekan">
      <div className="bg-[url(/assets/image/background/bg-coffee.jpg)] bg-no-repeat bg-center bg-fixed fixed right-0 left-0 top-0 bottom-0 opacity-[10%]"></div>
      <div className="min-h-dvh relative">
        <div className="py-3 min-h-dvh">
          {children}
        </div>
      </div>
    </main>
  );
}

function Website({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-2 bg-primary-4 text-primary-84 bg-[url(/assets/image/background/bg-love.png)] font-croissant text-croissant">
      <Header />
      <div className="min-h-dvh relative px-4">
        <div className="max-w-lg md:max-w-6xl mx-auto py-3 min-h-dvh gap-4 flex flex-col">
          {children}
        </div>
        <Footer />
      </div>
      <MenuMobile />
    </main>
  );
}
