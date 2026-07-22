"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadUnitPricingListViewModel } from "@/Common/Connection/Api/ViewModels/Pricing.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function ReadUnitPricing() {
  const setting = useContext(AccountContext);

  const [unitPricing, setUnitPricing] = useState<
    Array<ReadUnitPricingListViewModel>
  >([]);
  const [getList, setGetList] = useState(true);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        const access_token = sessionStorage.getItem("access_token") || "";
        const res = await FetchApi.Pricing.ReadUnitPricingList({
          AccessToken: access_token,
        });

        setUnitPricing(res);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  const onClickDeleteUnitPricing = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";

    Swal.fire({
      title: "حذف واحد اندازه گیری",
      text: "با حذف واحد اندازه گیری تمام فرمول هایی که در آن این واحد استفاده شده حذف میشود آیا مطمئن هستید ؟",
      icon: "warning",
      confirmButtonText: "آره حذف بشن",
      showDenyButton: true,
      denyButtonText: "نه",
    }).then(async (val) => {
      if (val.isConfirmed) {
        await FetchApi.Pricing.DeleteUnitPricing({
          AccessToken: access_token,
          Id: id,
        });
        setGetList(true);
        setting?.unitPricing.setState("");
      }
    });
  };

  const onClickEditUnitPricing = (Id: string) => {
    const filter = unitPricing.find((val) => val.Id === Id);
    setGetList(true);
    setting?.unitPricing.setState(filter?.Id || "");
    setting?.dashboard.setState(EDashboard.CREATE_UNIT_PRICING);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>لیست واحدی های اندازه گیری</H>
      </Box>
      <div className="flex flex-col gap-4">
        {unitPricing.map((val, i) => (
          <Box variant="secondary" key={i}>
            <div className="flex flex-wrap gap-4">
              <div className="my-auto flex gap-4">
                {setting?.profile.Access.includes(
                  EDashboardCapability.DELETE_UNIT_PRICING,
                ) && (
                  <Button
                    variant="error"
                    title="delete"
                    type="button"
                    StartIcon={RiDeleteBin5Line}
                    onClick={() => onClickDeleteUnitPricing(val.Id)}
                  />
                )}
                {setting?.profile.Access.includes(
                  EDashboardCapability.UPDATE_UNIT_PRICING,
                ) && (
                  <Button
                    variant="warning"
                    title="update"
                    type="button"
                    StartIcon={FaRegEdit}
                    onClick={() => onClickEditUnitPricing(val.Id)}
                  />
                )}
              </div>
              <div className="flex items-center gap-4 my-auto">
                <span>{val.Name}</span>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
