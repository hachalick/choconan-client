"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Details from "@/Components/Ui/Details";
import { H } from "@/Components/Ui/H";
import Summary from "@/Components/Ui/Summary";
import { AccountContext } from "@/Contexts/Account.Context";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function ReadProductPricing() {
  const setting = useContext(AccountContext);

  const [productUnitPricing, setProductUnitPricing] =
    useState<TGetAllProductPricingResponseDto>({
      cost: { average_cost: 0, sum_cost: 0, list: [] },
      day_to_work: 1,
      product_in_menu: {
        average_count_sell: 0,
        sum_balance: 0,
        sum_count_sell: 0,
        list: [],
      },
      product_in_pricing: { list: [] },
    });
  const [getList, setGetList] = useState(true);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        const access_token = sessionStorage.getItem("access_token") || "";
        const allProduct = await FetchApi.Pricing.fetchGetAllProductPricing({
          access_token,
        });
        setProductUnitPricing(allProduct);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  const onClickDeleteProductUnit = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";

    // Swal.fire({
    //   title: "حذف واحد اندازه گیری",
    //   text: "با حذف واحد اندازه گیری تمام فرمول هایی که در آن این واحد استفاده شده حذف میشود آیا مطمئن هستید ؟",
    //   icon: "warning",
    //   confirmButtonText: "آره حذف بشن",
    //   showDenyButton: true,
    //   denyButtonText: "نه",
    // }).then(async (val) => {
    //   if (val.isConfirmed) {
    //     await FetchApi.Pricing.fetchDeleteUnitPricing({
    //       access_token,
    //       unit_id: id,
    //     });
    //     setGetList(true);
    //     setting?.unitPricing.setState("");
    //   }
    // });
  };

  const onClickEditProductUnit = (id: string) => {
    setGetList(true);
    setting?.productPricing.setState(id || "");
    setting?.dashboard.setState(EDashboard.CREATE_PRODUCT_PRICING);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>گزارش قیمت گذاری</H>
      </Box>
      <Box variant="secondary">
        <H size={4}>
          این گزارش از روی{" "}
          {digitsEnToFa(addCommas(productUnitPricing.day_to_work))} روز گذشته
          بدست آمده است
        </H>
      </Box>
      <Details>
        <Summary variant="primary">
          لیست هزینه های ثابت (ماهانه ={" "}
          {digitsEnToFa(addCommas(productUnitPricing.cost.sum_cost))} تومان ,
          روزانه ={" "}
          {digitsEnToFa(
            addCommas(Math.round(productUnitPricing.cost.average_cost))
          )}{" "}
          تومان)
        </Summary>
        <div className="flex flex-col gap-4">
          {productUnitPricing.cost.list.map((val, i) => (
            <Box variant="secondary" key={i}>
              <div className="flex flex-wrap gap-4">
                <div className="my-auto flex gap-4">
                  {setting?.profile.access.includes(
                    EDashboardCapability.DELETE_COST_PRICING
                  ) && (
                    <Button
                      variant="error"
                      title="delete"
                      type="button"
                      StartIcon={RiDeleteBin5Line}
                      // onClick={() => onClickDeleteProductUnit(val.cost_pricing_id)}
                    />
                  )}
                  {setting?.profile.access.includes(
                    EDashboardCapability.UPDATE_COST_PRICING
                  ) && (
                    <Button
                      variant="warning"
                      title="update"
                      type="button"
                      StartIcon={FaRegEdit}
                      // onClick={() => onClickEditProductUnit(val.cost_pricing_id)}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center grow">
                  <span>{val.name}</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(addCommas(val.price))} تومان</span>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Details>
      <Details>
        <Summary variant="primary">لیست محصولات متصل به منو</Summary>{" "}
        <div className="flex flex-col gap-4">
          {productUnitPricing.product_in_menu.list.map((val, i) => (
            <Box variant="secondary" key={i}>
              <div className="flex flex-wrap gap-4">
                <div className="my-auto flex gap-4">
                  {setting?.profile.access.includes(
                    EDashboardCapability.DELETE_COST_PRICING
                  ) && (
                    <Button
                      variant="error"
                      title="delete"
                      type="button"
                      StartIcon={RiDeleteBin5Line}
                      // onClick={() => onClickDeleteProductUnit(val.)}
                    />
                  )}
                  {setting?.profile.access.includes(
                    EDashboardCapability.UPDATE_COST_PRICING
                  ) && (
                    <Button
                      variant="warning"
                      title="update"
                      type="button"
                      StartIcon={FaRegEdit}
                      // onClick={() => onClickEditProductUnit(val.cost_pricing_id)}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center grow">
                  {/* <span>{val.name}</span> */}
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  {/* <span>{digitsEnToFa(addCommas(val.price))} تومان</span> */}
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Details>
      <Details>
        <Summary variant="primary">لیست محصولات فرآیند تولید</Summary>{" "}
        <div className="flex flex-col gap-4">
          {productUnitPricing.product_in_pricing.list.map((val, i) => (
            <Box variant="secondary" key={i}>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 p-2">
                  {setting?.profile.access.includes(
                    EDashboardCapability.DELETE_COST_PRICING
                  ) && (
                    <Button
                      variant="error"
                      title="delete"
                      type="button"
                      StartIcon={RiDeleteBin5Line}
                      onClick={() => onClickDeleteProductUnit(val.product_id)}
                    />
                  )}
                  {setting?.profile.access.includes(
                    EDashboardCapability.UPDATE_COST_PRICING
                  ) && (
                    <Button
                      variant="warning"
                      title="update"
                      type="button"
                      StartIcon={FaRegEdit}
                      onClick={() => onClickEditProductUnit(val.product_id)}
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span>{val.name}</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {digitsEnToFa(addCommas(val.buy))} تومان خریداری شده
                    </span>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-4">
                    <div>شرح قیمت ها نسبت به مقیاس ها</div>
                    <ul className="list-disc flex flex-col gap-2">
                      {val.product_unit.map((value_item, i_detail) => (
                        <li
                          key={i_detail}
                          className="flex-wrap justify-between items-center"
                        >
                          <Box variant="guest" wFull>
                            <Details>
                              <Summary variant="primary">
                                قیمت محاسبه شده به ازای{" "}
                                <b>
                                  <u>
                                    {digitsEnToFa(addCommas(value_item.ratio))}{" "}
                                    {value_item.unit_name}
                                  </u>
                                </b>{" "}
                                بوده که روی این مقیاس{" "}
                                <b>
                                  <u>
                                    {digitsEnToFa(addCommas(value_item.profit))}{" "}
                                    تومان سود
                                  </u>
                                </b>{" "}
                                لحاظ شده و{" "}
                                <b>
                                  <u>
                                    مجموع هزینه تولید{" "}
                                    {digitsEnToFa(
                                      addCommas(value_item.sum_detail)
                                    )}{" "}
                                    تومان
                                  </u>
                                </b>{" "}
                                بوده در نتیجه{" "}
                                <b>
                                  <u>
                                    قیمت نهایی{" "}
                                    {digitsEnToFa(
                                      addCommas(
                                        value_item.total_price_for_ratio
                                      )
                                    )}{" "}
                                    تومان
                                  </u>
                                </b>{" "}
                                و به{" "}
                                <b>
                                  <u>
                                    قیمت واحد{" "}
                                    {digitsEnToFa(
                                      addCommas(value_item.price_by_unit)
                                    )}{" "}
                                    تومان
                                  </u>
                                </b>{" "}
                                میباشد
                              </Summary>
                              <Box variant="secondary">
                                {value_item.detail.map((value_detail, i) => (
                                  <div
                                    key={value_detail.name + i}
                                    className="flex justify-between items-center"
                                  >
                                    <span>
                                      {value_detail.name}{" "}
                                      {digitsEnToFa(
                                        addCommas(value_detail.amount)
                                      )}{" "}
                                      {value_detail.unit} مصرف شده
                                    </span>
                                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                                    <span>
                                      {digitsEnToFa(
                                        addCommas(
                                          value_detail.total_price_by_unit
                                        )
                                      )}{" "}
                                      تومان
                                    </span>
                                  </div>
                                ))}
                              </Box>
                            </Details>
                          </Box>
                        </li>
                      ))}
                    </ul>
                    <hr />
                  </div>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Details>
    </>
  );
}
