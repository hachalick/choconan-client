import { EInnerRoute } from "@/Common/Enums/InnerRout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import P from "@/Components/Element/P";
import { BsExclamationOctagon } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className="h-[calc(100svh_-_56px)] flex items-center justify-center flex-col font-croissant">
      <Box variant="primary">
        <div className="gap-4 p-2 rounded-2xl relative max-w-lg mx-auto flex flex-col justify-center items-center">
          <BsExclamationOctagon
            size={50}
            className="mb-3 bg-red-200 rounded-full p-1"
            color="#ff4b4a"
          />
          <H size={2}>یافت نشد !!!</H>
          <P size={3}>برای درخواست شما محتوایی یافت نشد.</P>
          <Button
            href={EInnerRoute.HOME}
            title="رفتن به خانه"
            variant="secondary"
          >
            رفتن به خانه
          </Button>
        </div>
      </Box>
    </div>
  );
}
