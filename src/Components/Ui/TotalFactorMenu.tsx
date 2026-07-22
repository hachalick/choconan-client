import React from "react";
import {
  addCommas,
  digitsEnToFa,
  numberToWords,
} from "@persian-tools/persian-tools";
import { RxCross2 } from "react-icons/rx";
import Box from "../Element/Box";

interface ITotalOrderPresent {
  Count: number;
  Price: number;
  Name: string;
}

export default function TotalFactorMenu({
  listOrder,
}: {
  listOrder: ITotalOrderPresent[];
}) {
  let totalCoste = 0;

  listOrder.forEach((item) => {
    totalCoste += item.Count * item.Price;
  });

  return (
    <Box variant="guest">
      <div className="border-[#3a2e3c] border-b pb-3">
        <h3 className="mb-2 text-lg">فاکتور خرید :</h3>
        {listOrder.length ? (
          listOrder.map((item, i) => (
            <div className="flex items-center flex-wrap" key={i}>
              <h4>{item.Name}</h4>
              <span className="border-dotted border-b-4 border-b-fuchsia-950 h-px grow mx-4"></span>
              <span className="flex items-center">
                {digitsEnToFa(addCommas(item.Price))}
                <RxCross2 />
                {digitsEnToFa(item.Count)}
              </span>
            </div>
          ))
        ) : (
          <div>سبد خرید خالی است</div>
        )}
      </div>
      <div>
        <h3 className="mb-2 mt-4">جمع کل مبلغ ( تومان ) :</h3>
        <div className="flex items-center flex-wrap">
          <h3>به عدد</h3>
          <span className="border-dotted border-b-4 border-[#3a2e3c8a] h-px grow mx-4"></span>
          <span>{digitsEnToFa(addCommas(totalCoste))}</span>
        </div>
        <div className="flex items-center flex-wrap">
          <h3>به حروف</h3>
          <span className="border-dotted border-b-4 border-[#3a2e3c8a] h-px grow mx-4"></span>
          <span>{numberToWords(totalCoste).toString()}</span>
        </div>
      </div>
    </Box>
  );
}
