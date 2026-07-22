import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-[90dvh] text-2xl flex items-center justify-center">
      <Image
        src="/assets/image/icon/loading.png"
        width={20}
        height={20}
        alt="loading img"
        className="mx-2 w-8 animate-spin"
      />
      در حال لود سایت . . .
    </div>
  );
}
