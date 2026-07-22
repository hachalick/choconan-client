import { EInnerRoute } from "@/Common/Enums/InnerRout";
import Layout from "@/Components/Layout/Layout";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import React from "react";

export default function News() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.NEWS, name: "اخبار" },
        ]}
      />
    </Layout>
  );
}
