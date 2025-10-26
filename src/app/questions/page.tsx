import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import React from "react";

export default function Question() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/questions", name: "پرسش و پاسخ" },
        ]}
      />
    </Layout>
  );
}
