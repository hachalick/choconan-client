"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadProductPricingListViewModel } from "@/Common/Connection/Api/ViewModels/Pricing.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import Details from "@/Components/Element/Details";
import Form from "@/Components/Element/Form";
import { H } from "@/Components/Element/H";
import {
  giveValueInput,
  Input,
  InputContainer,
  Label,
} from "@/Components/Element/Input";
import Summary from "@/Components/Element/Summary";
import { AccountContext } from "@/Contexts/Account.Context";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  FaRegCreditCard,
  FaRegEdit,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function ReadProductPricing() {
  const setting = useContext(AccountContext);
  const [floatNumber, setFloatNumber] = useState(3);
  const [floatNumberPrice, setFloatNumberPrice] = useState(0);
  const [floatFloor, setFloatFloor] = useState(1);
  const [floatFloorPrice, setFloatFloorPrice] = useState(5);

  const [productUnitPricing, setProductUnitPricing] =
    useState<ReadProductPricingListViewModel>({
      DayToWork: 0,
      Cost: { AverageCost: 0, ItemCost: 0, SumCost: 0, List: [] },
      ProductInMenu: {
        AverageCountSell: 0,
        SumBalance: 0,
        SumCountSell: 0,
        List: [],
      },
      ProductInPricing: {
        List: [],
      },
    });
  const [getList, setGetList] = useState(true);
  const [sortListMenuByBalance, setSortListMenuByBalance] = useState<number>(2);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        const access_token = sessionStorage.getItem("access_token") || "";
        const res = await FetchApi.Pricing.ReadProductPricingList({
          AccessToken: access_token,
        });

        setProductUnitPricing(res);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  const onClickDeleteProductUnit = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";

    Swal.fire({
      title: "حذف محصول",
      text: "با حذف محصول تمام فرمول هایی که در آن این محصول استفاده شده حذف میشود آیا مطمئن هستید ؟",
      icon: "warning",
      confirmButtonText: "آره حذف بشن",
      showDenyButton: true,
      denyButtonText: "نه",
    }).then(async (val) => {
      if (val.isConfirmed) {
        await FetchApi.Pricing.DeleteProductPricing({
          AccessToken: access_token,
          Id: id,
        });
        setGetList(true);
        setting?.unitPricing.setState("");
      }
    });
  };

  const onClickEditProductUnit = (id: string) => {
    setGetList(true);
    setting?.productPricing.setState(id || "");
    setting?.dashboard.setState(EDashboard.CREATE_PRODUCT_PRICING);
  };

  const onClickEditCost = (id: string) => {
    setGetList(true);
    setting?.costPricing.setState(id || "");
    setting?.dashboard.setState(EDashboard.CREATE_COST_PRICING);
  };

  const onClickSyncPriceWithMenu = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    for (const product of productUnitPricing.ProductInMenu.List) {
      const productMenu = await FetchApi.Menu.ReadMenuProductDetail({
        Id: product.ProductIdInMenu,
      });

      const res = await FetchApi.Menu.UpdateMenuProduct({
        AccessToken: access_token,
        Id: productMenu.Id,
        IsShowMenu: productMenu.IsShowMenu,
        Description: productMenu.Description,
        MetaTitle: productMenu.MetaTitle,
        MetaDescription: productMenu.MetaDescription,
        Name: productMenu.Name,
        Price: calculateNumber(
          product.PriceInPricing,
          floatNumberPrice,
          floatFloorPrice,
          false,
        ) as number,
        CategoryId: productMenu.CategoryId,
        SnapId: productMenu.SnapId,
        SrcImage: productMenu.SrcImage,
        TapsiId: productMenu.TapsiId,
        Waiting: productMenu.Waiting,
      });
    }

    // location.reload();
  };

  const onClickDeleteCost = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Pricing.DeleteCostProductPricing({
      AccessToken: access_token,
      Id: id,
    });

    setGetList(true);
  };

  const calculateNumber = (
    number: number,
    floatNumber: number,
    floatFloor: number,
    toPersian: boolean = true,
  ) => {
    number = Math.floor(number * 10 ** floatNumber);
    const mines = number % floatFloor;
    number = number - mines;
    number += mines === 0 ? 0 : floatFloor;
    number = number / 10 ** floatNumber;
    return toPersian ? digitsEnToFa(addCommas(number)) : number;
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>گزارش قیمت گذاری</H>
      </Box>
      <Form variant="primary" col>
        <InputContainer column>
          <Label>تعداد اعشار قیمت</Label>
          <Input
            title="تعداد اعشار قیمت"
            type="number"
            id="float_number_price"
            name="float_number_price"
            onChange={(e) => setFloatNumberPrice(giveValueInput(e) as number)}
            value={floatNumberPrice}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label>گرد روی عدد قیمت</Label>
          <Input
            title="گرد روی عدد قیمت"
            type="number"
            id="float_floor_price"
            name="float_floor_price"
            onChange={(e) => setFloatFloorPrice(giveValueInput(e) as number)}
            value={floatFloorPrice}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label>تعداد اعشار</Label>
          <Input
            title="تعداد اعشار"
            type="number"
            id="float_number"
            name="float_number"
            onChange={(e) => setFloatNumber(giveValueInput(e) as number)}
            value={floatNumber}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label>گرد روی عدد</Label>
          <Input
            title="گرد روی عدد"
            type="number"
            id="float_floor"
            name="float_floor"
            onChange={(e) => setFloatFloor(giveValueInput(e) as number)}
            value={floatFloor}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
      </Form>
      <Box variant="secondary">
        <H size={4}>
          این گزارش از روی{" "}
          {calculateNumber(productUnitPricing.DayToWork, 1, floatFloor)} روز
          گذشته بدست آمده است
        </H>
      </Box>
      <Details>
        <Summary variant="primary">
          لیست هزینه های ثابت (ماهانه ={" "}
          {calculateNumber(
            productUnitPricing.Cost.SumCost,
            floatNumber,
            floatFloor,
          )}{" "}
          تومان , روزانه ={" "}
          {calculateNumber(
            productUnitPricing.Cost.AverageCost,
            floatNumber,
            floatFloor,
          )}{" "}
          تومان, یک آیتم ={" "}
          {calculateNumber(
            productUnitPricing.Cost.ItemCost,
            floatNumber,
            floatFloor,
          )}
          )
        </Summary>
        <div className="flex flex-col gap-4">
          {productUnitPricing.Cost.List.map((val, i) => (
            <Box variant="secondary" key={i}>
              <div className="flex flex-wrap gap-4">
                <div className="my-auto flex gap-4">
                  {setting?.profile.Access.includes(
                    EDashboardCapability.DELETE_COST_PRICING,
                  ) && (
                    <Button
                      variant="error"
                      title="delete"
                      type="button"
                      StartIcon={RiDeleteBin5Line}
                      onClick={() => onClickDeleteCost(val.Id)}
                    />
                  )}
                  {setting?.profile.Access.includes(
                    EDashboardCapability.UPDATE_COST_PRICING,
                  ) && (
                    <Button
                      variant="warning"
                      title="update"
                      type="button"
                      StartIcon={FaRegEdit}
                      onClick={() => onClickEditCost(val.Id)}
                    />
                  )}
                </div>
                <div className="flex justify-between items-center grow">
                  <span>{val.Name}</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>
                    {calculateNumber(val.Price, floatNumber, floatFloor)} تومان
                  </span>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Details>
      <Details>
        <Summary variant="primary">
          <div className="flex flex-wrap gap-4 ">
            لیست محصولات متصل به منو (
            {digitsEnToFa(
              addCommas(productUnitPricing.ProductInMenu.List.length),
            )}{" "}
            نتیجه , فروش کل ={" "}
            {calculateNumber(
              productUnitPricing.ProductInMenu.SumCountSell,
              floatNumber,
              floatFloor,
            )}{" "}
            , میانگین فروش ={" "}
            {calculateNumber(
              productUnitPricing.ProductInMenu.AverageCountSell,
              floatNumber,
              floatFloor,
            )}{" "}
            , تراز کل =
            <span dir="ltr">
              {calculateNumber(
                productUnitPricing.ProductInMenu.SumBalance,
                floatNumber,
                floatFloor,
              )}
            </span>
            )
          </div>
        </Summary>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {sortListMenuByBalance === 1 ? (
              <Button
                variant="secondary"
                title="update"
                type="button"
                StartIcon={FaSortDown}
                onClick={() => {
                  setSortListMenuByBalance(2);
                }}
              >
                مرتب سازی
              </Button>
            ) : sortListMenuByBalance === 2 ? (
              <Button
                variant="secondary"
                title="update"
                type="button"
                StartIcon={FaSort}
                onClick={() => {
                  setSortListMenuByBalance(3);
                }}
              >
                مرتب سازی
              </Button>
            ) : (
              <Button
                variant="secondary"
                title="update"
                type="button"
                StartIcon={FaSortUp}
                onClick={() => {
                  setSortListMenuByBalance(1);
                }}
              >
                مرتب سازی
              </Button>
            )}
            <Button
              variant="secondary"
              title="update"
              type="button"
              StartIcon={FaRegEdit}
              onClick={() => onClickSyncPriceWithMenu()}
            >
              همگام سازی قیمت با منو
            </Button>
          </div>
          {productUnitPricing.ProductInMenu.List.sort((a, b) => {
            if (sortListMenuByBalance === 1) {
              return b.Balance - a.Balance;
            } else if (sortListMenuByBalance === 2) {
              return a.Balance - b.Balance;
            } else {
              return 0;
            }
          }).map((val, i) => (
            <Box
              variant={
                val.Balance < 0
                  ? "error"
                  : val.Balance > 0
                    ? "success"
                    : "warning"
              }
              key={i}
            >
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 p-2">
                  {setting?.profile.Access.includes(
                    EDashboardCapability.DELETE_COST_PRICING,
                  ) && (
                    <Button
                      variant="error"
                      title="delete"
                      type="button"
                      StartIcon={RiDeleteBin5Line}
                      onClick={() =>
                        onClickDeleteProductUnit(val.ProductIdInPricing)
                      }
                    />
                  )}
                  {setting?.profile.Access.includes(
                    EDashboardCapability.UPDATE_COST_PRICING,
                  ) && (
                    <Button
                      variant="warning"
                      title="update"
                      type="button"
                      StartIcon={FaRegEdit}
                      onClick={() =>
                        onClickEditProductUnit(val.ProductIdInPricing)
                      }
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex justify-between items-center grow">
                    <span>نام محصول در منو</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>{val.NameInMenu}</span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>قیمت محصول در منو</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {calculateNumber(
                        val.PriceInMenu,
                        floatNumberPrice,
                        floatFloorPrice,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>نام محصول در قیمت گذاری</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>{val.NameInPricing}</span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>سود محصول در قیمت گذاری</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {calculateNumber(
                        val.ProfitPricing,
                        floatNumber,
                        floatFloor,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>قیمت اولیه محصول در قیمت گذاری</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span dir="ltr">
                      {calculateNumber(
                        val.SumDetailPricing,
                        floatNumber,
                        floatFloor,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>قیمت محصول در قیمت گذاری</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {calculateNumber(
                        val.PriceInPricing,
                        floatNumber,
                        floatFloor,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>گرد شده قیمت</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span dir="ltr">
                      {calculateNumber(
                        val.PriceInPricing,
                        floatNumberPrice,
                        floatFloorPrice,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>مجموع فروش محصول</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {calculateNumber(val.CountSell, floatNumber, floatFloor)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>میانگین فروش محصول</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {calculateNumber(
                        val.AverageCountSell,
                        floatNumber,
                        floatFloor,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center grow">
                    <span>تراز محصول</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span dir="ltr">
                      {calculateNumber(val.Balance, floatNumber, floatFloor)}
                    </span>
                  </div>
                </div>
              </div>
            </Box>
          ))}
        </div>
      </Details>
      <Details>
        <Summary variant="primary">
          لیست محصولات فرآیند تولید (
          {digitsEnToFa(
            addCommas(productUnitPricing.ProductInPricing.List.length),
          )}{" "}
          نتیجه)
        </Summary>
        <div className="flex flex-col gap-4">
          {productUnitPricing.ProductInPricing.List.map((val, i) => (
            <Box variant="secondary" key={i}>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 p-2">
                  {setting?.profile.Access.includes(
                    EDashboardCapability.DELETE_COST_PRICING,
                  ) && (
                    <Button
                      variant="error"
                      title="delete"
                      type="button"
                      StartIcon={RiDeleteBin5Line}
                      onClick={() => onClickDeleteProductUnit(val.Id)}
                    />
                  )}
                  {setting?.profile.Access.includes(
                    EDashboardCapability.UPDATE_COST_PRICING,
                  ) && (
                    <Button
                      variant="warning"
                      title="update"
                      type="button"
                      StartIcon={FaRegEdit}
                      onClick={() => onClickEditProductUnit(val.Id)}
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span>{val.Name}</span>
                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                    <span>
                      {calculateNumber(val.BuyPrice, floatNumber, floatFloor)}{" "}
                      تومان خریداری شده
                    </span>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-4">
                    <div>شرح قیمت ها نسبت به مقیاس ها</div>
                    <ul className="list-disc flex flex-col gap-2">
                      {val.ProductUnit.map((value_item, i_detail) => (
                        <li
                          key={i_detail}
                          className="flex-wrap justify-between items-center"
                        >
                          <Box variant="guest" wFull>
                            <Details open={value_item.Detail.length > 0}>
                              <Summary variant="primary">
                                <div className="inline">
                                  قیمت محاسبه شده به ازای{" "}
                                  <b className="inline">
                                    <u className="inline">
                                      {calculateNumber(
                                        value_item.Ratio,
                                        floatNumber,
                                        floatFloor,
                                      )}{" "}
                                      {value_item.UnitName}
                                    </u>
                                  </b>{" "}
                                  بوده که روی این مقیاس{" "}
                                  <b>
                                    <u>
                                      {calculateNumber(
                                        value_item.Profit,
                                        floatNumberPrice,
                                        floatFloor,
                                      )}{" "}
                                      تومان سود
                                    </u>
                                  </b>{" "}
                                  لحاظ شده و{" "}
                                  <b>
                                    <u>
                                      مجموع هزینه تولید{" "}
                                      {calculateNumber(
                                        value_item.SumDetail,
                                        floatNumberPrice,
                                        floatFloor,
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  بوده در نتیجه{" "}
                                  <b>
                                    <u>
                                      قیمت نهایی{" "}
                                      {calculateNumber(
                                        value_item.TotalPriceForRatio,
                                        floatNumberPrice,
                                        floatFloor,
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  و به{" "}
                                  <b>
                                    <u>
                                      قیمت واحد بدون سود{" "}
                                      {calculateNumber(
                                        value_item.PriceByUnit,
                                        floatNumberPrice,
                                        floatFloor,
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  و به{" "}
                                  <b>
                                    <u>
                                      قیمت واحد با سود{" "}
                                      {calculateNumber(
                                        value_item.PriceByTotalPrice,
                                        floatNumberPrice,
                                        floatFloor,
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  میباشد
                                </div>
                              </Summary>
                              <Box variant="secondary">
                                {value_item.Detail.map((value_detail, i) => (
                                  <div
                                    key={value_detail.UnitName + i}
                                    className="flex justify-between items-center"
                                  >
                                    <span>
                                      {calculateNumber(
                                        value_detail.Amount,
                                        floatNumber,
                                        floatFloor,
                                      )}{" "}
                                      {value_detail.UnitName}{" "}
                                      {value_detail.ProductName} مصرف شده
                                    </span>
                                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                                    <span>
                                      {calculateNumber(
                                        value_detail.TotalPriceByUnit,
                                        floatNumberPrice,
                                        floatFloor,
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
