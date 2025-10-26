import HorizontalScrollEconomicPackage from "@/Components/Customs/HorizontalScrollEconomicPackage";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import React from "react";

function About() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/package", name: "پکیج" },
        ]}
      />
      <div>
        <h2 className="font-bold mb-2">پک های اقتصادی</h2>
        <HorizontalScrollEconomicPackage />
      </div>
    </Layout>
  );
}

export default About;
