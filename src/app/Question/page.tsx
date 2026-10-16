import { EInnerRoute } from "@/Common/Enums/InnerRout";
import Layout from "@/Components/Layout/Layout";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import React from "react";

export default function Question() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.QUESTION, name: "پرسش و پاسخ" },
        ]}
      />
    </Layout>
  );
}
