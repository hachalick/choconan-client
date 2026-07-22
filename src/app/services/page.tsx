import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import React from "react";

export default function Services() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/services", name: "خدمات" },
        ]}
      />
    </Layout>
  );
}
