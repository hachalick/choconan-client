import Dashboard from "@/Components/Layout/Dashboard";
import Layout from "@/Components/Layout/Layout";
import React from "react";

export default function FindPanel({
  variant,
  children,
}: {
  variant: "dashboard" | "website";
  children: React.ReactNode;
}) {
  return (
    <Layout variant="dashboard">
      <Dashboard />
    </Layout>
  );
}
