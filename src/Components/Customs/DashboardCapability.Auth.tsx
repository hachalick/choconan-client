"use client";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext } from "react";

export default function DashboardCapabilityAuth({
  variant,
  children,
}: {
  variant: EDashboardCapability[];
  children: React.ReactNode;
}) {
  let flag = false;
  const setting = useContext(AccountContext);

  if (!setting) return;

  for (const item of variant) {
    flag = flag && setting?.profile.Access.includes(item);
    if (flag) break;
  }

  if (flag) return <>{children}</>;
  else return <></>;
}
