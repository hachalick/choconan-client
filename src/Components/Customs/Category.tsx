import { allCategory } from "@/Common/Constants/Category.Constant";
import { ERoute } from "@/Common/Enums/Routs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Box from "../Ui/Box";
import { H } from "../Ui/H";

function Category() {
  return (
    <div className="mt-5">
      <H size={2}>چیا داریم ؟!</H>
      <ul className="gap-6 flex flex-wrap py-4 justify-center">
        {allCategory.map((category, i) => (
          <li key={i} className="basis-32 rounded-2xl md:grow-0 grow">
            <Link href={`/menu/${category.category}`} title={category.category}>
              <Box variant="primary">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={ERoute.HOST + category.icon}
                    width={60}
                    height={60}
                    alt={category.category}
                    priority
                  />
                  <h3 dir="ltr" className="mt-2">
                    {category.category}
                  </h3>
                </div>
              </Box>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
