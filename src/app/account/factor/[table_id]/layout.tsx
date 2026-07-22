import { Metadata } from "next";

export const metadata: Metadata = {
  title: "فاکتور شوکونان",
  description:
    "شوکونان یک کافه واقع در سهرودی است که محصولات خود را بصورت بیرون بر یا سرو داخل کافه ارائه میدهد",
};

export default function FactorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
