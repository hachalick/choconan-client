import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import React from "react";

function Blog() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/blogs", name: "مقالات" },
        ]}
      />
    </Layout>
  );
}

export default Blog;
