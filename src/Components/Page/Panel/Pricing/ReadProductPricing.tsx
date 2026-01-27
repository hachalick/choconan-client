"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Details from "@/Components/Ui/Details";
import Form from "@/Components/Ui/Form";
import { H } from "@/Components/Ui/H";
import {
  giveValueInput,
  Input,
  InputContainer,
  Label,
} from "@/Components/Ui/Input";
import Summary from "@/Components/Ui/Summary";
import { AccountContext } from "@/Contexts/Account.Context";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaRegCreditCard, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function ReadProductPricing() {
  const setting = useContext(AccountContext);
  const [floatNumber, setFloatNumber] = useState(3);
  const [floatNumberPrice, setFloatNumberPrice] = useState(0);
  const [floatFloor, setFloatFloor] = useState(1);
  const [floatFloorPrice, setFloatFloorPrice] = useState(5);

  const [productUnitPricing, setProductUnitPricing] =
    useState<TGetAllProductPricingResponseDto>({
      cost: { average_cost: 0, sum_cost: 0, item_cost: 0, list: [] },
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
  const [sortListMenuByBalance, setSortListMenuByBalance] = useState<number>(2);

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

    Swal.fire({
      title: "حذف محصول",
      text: "با حذف محصول تمام فرمول هایی که در آن این محصول استفاده شده حذف میشود آیا مطمئن هستید ؟",
      icon: "warning",
      confirmButtonText: "آره حذف بشن",
      showDenyButton: true,
      denyButtonText: "نه",
    }).then(async (val) => {
      if (val.isConfirmed) {
        await FetchApi.Pricing.fetchDeleteProductPricing({
          access_token,
          product_pricing_id: id,
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

  const onClickSyncPriceWithMenu = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    for (const product of productUnitPricing.product_in_menu.list) {
      console.log(product.product_category_id_in_menu, product.name_in_menu)
      const productMenu = await FetchApi.Menu.fetchProductMenu({
        category_name: product.product_category_id_in_menu,
        product_id: product.product_number_id_in_menu,
      });
      console.log(productMenu)

      const res =  await FetchApi.Menu.fetchUpdateProductMenu({
        access_token,
        available: productMenu.available,
        description: productMenu.description,
        id: productMenu.id,
        meta_description: productMenu.meta_description,
        meta_title: productMenu.meta_title,
        name: productMenu.name,
        price: calculateNumber(
          product.price_in_pricing,
          floatNumberPrice,
          floatFloorPrice,
          false
        ) as number,
        product_id: productMenu.product_id,
        snap: productMenu.snap,
        src: productMenu.src,
        tapsi: productMenu.tapsi,
        waiting: productMenu.waiting,
      });
    }


    // location.reload();
  };

  const calculateNumber = (
    number: number,
    floatNumber: number,
    floatFloor: number,
    toPersian: boolean = true
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
          {calculateNumber(productUnitPricing.day_to_work, 1, floatFloor)} روز
          گذشته بدست آمده است
        </H>
      </Box>
      <Details>
        <Summary variant="primary">
          لیست هزینه های ثابت (ماهانه ={" "}
          {calculateNumber(
            productUnitPricing.cost.sum_cost,
            floatNumber,
            floatFloor
          )}{" "}
          تومان , روزانه ={" "}
          {calculateNumber(
            productUnitPricing.cost.average_cost,
            floatNumber,
            floatFloor
          )}{" "}
          تومان, یک آیتم ={" "}
          {calculateNumber(
            productUnitPricing.cost.item_cost,
            floatNumber,
            floatFloor
          )}
          )
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
                  <span>
                    {calculateNumber(val.price, floatNumber, floatFloor)} تومان
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
              addCommas(productUnitPricing.product_in_menu.list.length)
            )}{" "}
            نتیجه , فروش کل ={" "}
            {calculateNumber(
              productUnitPricing.product_in_menu.sum_count_sell,
              floatNumber,
              floatFloor
            )}{" "}
            , میانگین فروش ={" "}
            {calculateNumber(
              productUnitPricing.product_in_menu.average_count_sell,
              floatNumber,
              floatFloor
            )}{" "}
            , تراز کل =
            <span dir="ltr">
              {calculateNumber(
                productUnitPricing.product_in_menu.sum_balance,
                floatNumber,
                floatFloor
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
                StartIcon={RiDeleteBin5Line}
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
                StartIcon={FaRegEdit}
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
                StartIcon={FaRegCreditCard}
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
          {productUnitPricing.product_in_menu.list
            .sort((a, b) => {
              if (sortListMenuByBalance === 1) {
                return b.balance - a.balance;
              } else if (sortListMenuByBalance === 2) {
                return a.balance - b.balance;
              } else {
                return 0;
              }
            })
            .map((val, i) => (
              <Box
                variant={
                  val.balance < 0
                    ? "error"
                    : val.balance > 0
                    ? "success"
                    : "warning"
                }
                key={i}
              >
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
                        onClick={() =>
                          onClickDeleteProductUnit(val.product_id_in_pricing)
                        }
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
                        onClick={() =>
                          onClickEditProductUnit(val.product_id_in_pricing)
                        }
                      />
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center grow">
                      <span>نام محصول در منو</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>{val.name_in_menu}</span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>قیمت محصول در منو</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {calculateNumber(
                          val.price_in_menu,
                          floatNumberPrice,
                          floatFloorPrice
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>نام محصول در قیمت گذاری</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>{val.name_in_pricing}</span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>سود محصول در قیمت گذاری</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {calculateNumber(
                          val.profit_pricing,
                          floatNumber,
                          floatFloor
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>قیمت اولیه محصول در قیمت گذاری</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span dir="ltr">
                        {calculateNumber(
                          val.sum_detail_pricing,
                          floatNumber,
                          floatFloor
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>قیمت محصول در قیمت گذاری</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {calculateNumber(
                          val.price_in_pricing,
                          floatNumber,
                          floatFloor
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>گرد شده قیمت</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span dir="ltr">
                        {calculateNumber(
                          val.price_in_pricing,
                          floatNumberPrice,
                          floatFloorPrice
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>مجموع فروش محصول</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {calculateNumber(
                          val.count_sell,
                          floatNumber,
                          floatFloor
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>میانگین فروش محصول</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {calculateNumber(
                          val.average_count_sell,
                          floatNumber,
                          floatFloor
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center grow">
                      <span>تراز محصول</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span dir="ltr">
                        {calculateNumber(val.balance, floatNumber, floatFloor)}
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
            addCommas(productUnitPricing.product_in_pricing.list.length)
          )}{" "}
          نتیجه)
        </Summary>
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
                      {calculateNumber(val.buy, floatNumber, floatFloor)} تومان
                      خریداری شده
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
                            <Details open={value_item.detail.length > 0}>
                              <Summary variant="primary">
                                <div className="inline">
                                  قیمت محاسبه شده به ازای{" "}
                                  <b className="inline">
                                    <u className="inline">
                                      {calculateNumber(
                                        value_item.ratio,
                                        floatNumber,
                                        floatFloor
                                      )}{" "}
                                      {value_item.unit_name}
                                    </u>
                                  </b>{" "}
                                  بوده که روی این مقیاس{" "}
                                  <b>
                                    <u>
                                      {calculateNumber(
                                        value_item.profit,
                                        floatNumberPrice,
                                        floatFloor
                                      )}{" "}
                                      تومان سود
                                    </u>
                                  </b>{" "}
                                  لحاظ شده و{" "}
                                  <b>
                                    <u>
                                      مجموع هزینه تولید{" "}
                                      {calculateNumber(
                                        value_item.sum_detail,
                                        floatNumberPrice,
                                        floatFloor
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  بوده در نتیجه{" "}
                                  <b>
                                    <u>
                                      قیمت نهایی{" "}
                                      {calculateNumber(
                                        value_item.total_price_for_ratio,
                                        floatNumberPrice,
                                        floatFloor
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  و به{" "}
                                  <b>
                                    <u>
                                      قیمت واحد بدون سود{" "}
                                      {calculateNumber(
                                        value_item.price_by_unit,
                                        floatNumberPrice,
                                        floatFloor
                                      )}{" "}
                                      تومان
                                    </u>
                                  </b>{" "}
                                  میباشد
                                </div>
                              </Summary>
                              <Box variant="secondary">
                                {value_item.detail.map((value_detail, i) => (
                                  <div
                                    key={value_detail.name + i}
                                    className="flex justify-between items-center"
                                  >
                                    <span>
                                      {value_detail.name}{" "}
                                      {calculateNumber(
                                        value_detail.amount,
                                        floatNumber,
                                        floatFloor
                                      )}{" "}
                                      {value_detail.unit} مصرف شده
                                    </span>
                                    <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                                    <span>
                                      {calculateNumber(
                                        value_detail.total_price_by_unit,
                                        floatNumberPrice,
                                        floatFloor
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
