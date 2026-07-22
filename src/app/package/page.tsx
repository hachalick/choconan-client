export const dynamic = "force-dynamic";
export const revalidate = 0;

import { EInnerRoute } from "@/Common/Enums/InnerRout";
import Layout from "@/Components/Layout/Layout";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import React from "react";

export default function About() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.PACKAGE, name: "پکیج" },
        ]}
      />
      <div>
        <h2 className="font-bold mb-2">پک های اقتصادی</h2>
        {/* <HorizontalScrollEconomicPackage /> */}
      </div>
    </Layout>
  );
}
