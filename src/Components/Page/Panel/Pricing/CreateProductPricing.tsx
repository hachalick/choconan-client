import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Form from "@/Components/Ui/Form";
import { H } from "@/Components/Ui/H";
import {
  giveValueInput,
  Input,
  InputContainer,
  Label,
} from "@/Components/Ui/Input";
import { Option, Select } from "@/Components/Ui/Select";
import { AccountContext } from "@/Contexts/Account.Context";
import { useChangeTimer } from "@/Hooks/useChanageTimer.hook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateProductPricing() {
  const setting = useContext(AccountContext);

  //#region use memo

  const baseDefaultAllProductPricing: TGetAllProductPricingResponseDto =
    useMemo(
      () => ({
        cost: { average_cost: 0, sum_cost: 0, item_cost: 0, list: [] },
        day_to_work: 1,
        product_in_menu: {
          average_count_sell: 0,
          sum_balance: 0,
          sum_count_sell: 0,
          list: [],
        },
        product_in_pricing: { list: [] },
      }),
      []
    );

  const baseDefaultProductPricing: {
    product_id: string;
    name: string;
    buy: number;
  } = useMemo(
    () => ({
      buy: 0,
      name: "",
      product_id: setting?.productPricing.state ?? "",
      product_unit: [],
    }),
    []
  );

  const baseDefaultProductUnitPricingId: Omit<
    TUpdateProductUnitPricingDto,
    "access_token"
  > = useMemo(
    () => ({
      product_unit_pricing_id: crypto.randomUUID(),
      profit: 0,
      ratio: 0,
      unit_id: "",
      product_menu_id: "",
    }),
    []
  );

  const [defaultAllProductPricing, setDefaultAllProductPricing] = useState(
    baseDefaultAllProductPricing
  );

  const baseDefaultProductUnitDetailPricingId: Omit<
    TUpdateDetailProductUnitPricingDto,
    "access_token"
  > = useMemo(
    () => ({
      amount: 0,
      detail_product_unit_pricing_id: crypto.randomUUID(),
      product_unit_id: defaultAllProductPricing.product_in_pricing.list
        .filter((c) => c.product_id !== setting?.productPricing.state)
        .map((item) =>
          item.product_unit.map((detail) => ({
            name: item.name,
            product_unit_id: detail.product_unit_id,
            unit_name: detail.unit_name,
          }))
        )
        .flat()[0]?.product_unit_id,
    }),
    []
  );

  //#endregion

  //#region use state

  const [productUnitPricingId, setProductUnitPricingId] = useState<
    Omit<TUpdateProductUnitPricingDto, "access_token">
  >(baseDefaultProductUnitPricingId);

  const [productUnitDetailPricingId, setProductUnitDetailPricingId] = useState<
    Omit<TUpdateDetailProductUnitPricingDto, "access_token">
  >(baseDefaultProductUnitDetailPricingId);

  // const [defaultAllProductPricing, setDefaultAllProductPricing] = useState(
  //   baseDefaultAllProductPricing
  // );

  const [defaultProductPricing, setDefaultProductPricing] = useState<{
    product_id: string;
    name: string;
    buy: number;
  }>(baseDefaultProductPricing);

  const [unitPricing, setUnitPricing] = useState<
    Array<TGetUnitPricingResponseDto>
  >([]);
  const [productMenu, setSetProductMenu] = useState<
    Array<TGetProductMenuResponseDto>
  >([]);
  const [productUnit, setProductUnit] = useState<
    Array<{
      product_unit_id: string;
      product_id: string;
      unit_id: string;
      product_menu_id: string | null;
      ratio: number;
      profit: number;
      detail: Array<{
        detail_product_unit_id: string;
        parent_product_unit_id: string;
        child_product_unit_id: string;
        amount: number;
      }>;
    }>
  >([]);

  //#endregion

  //#region use effect

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const allUnit = await FetchApi.Pricing.fetchGetAllUnitPricing({
        access_token,
      });
      setUnitPricing(allUnit);
      const res = await FetchApi.Pricing.fetchGetAllProductPricing({
        access_token,
      });
      setDefaultAllProductPricing(res);
      const productMenu = await FetchApi.Menu.fetchAllProductMenu();

      setSetProductMenu(
        productMenu.map((product_menu) => product_menu.products).flat()
      );

      if (setting?.productPricing.state) {
        const find = res.product_in_pricing.list.find(
          (c) => c.product_id === defaultProductPricing.product_id
        );
        if (find) {
          setDefaultProductPricing({
            buy: find.buy,
            name: find.name,
            product_id: find.product_id,
          });

          setProductUnit(
            find.product_unit.map((item) => ({
              detail: item.detail.map((item2) => ({
                detail_product_unit_id: item2.product_unit_detail_id,
                parent_product_unit_id: item2.parent_product_unit_id,
                child_product_unit_id: item2.child_product_unit_id,
                amount: item2.amount,
              })),
              product_id: find.product_id,
              product_menu_id: item.product_menu_id,
              product_unit_id: item.product_unit_id,
              profit: item.profit,
              ratio: item.ratio,
              unit_id: item.unit_id,
            }))
          );
        }
      }
    };
    fetchData();
  }, []);

  const [cloudProductPricing, setSaveChangeProductPricing] =
    useChangeTimer(async () => {
      const access_token = sessionStorage.getItem("access_token") || "";

      const { update } = await FetchApi.Pricing.fetchUpdateProductPricing({
        access_token,
        product_pricing_id: defaultProductPricing.product_id,
        buy: defaultProductPricing.buy,
        name: defaultProductPricing.name,
      });

      return update ?? false;
    }, [defaultProductPricing]);

  const [cloudProductUnitPricing, setSaveChangeProductUnitPricing] =
    useChangeTimer(async () => {
      setProductUnitPricingId(baseDefaultProductUnitPricingId);
      if (productUnitPricingId.product_unit_pricing_id) {
        const access_token = sessionStorage.getItem("access_token") || "";

        await FetchApi.Pricing.fetchUpdateProductUnitPricing({
          access_token,
          product_unit_pricing_id: productUnitPricingId.product_unit_pricing_id,
          profit: productUnitPricingId.profit,
          ratio: productUnitPricingId.ratio,
          unit_id: productUnitPricingId.unit_id,
          product_menu_id: productUnitPricingId.product_menu_id,
        });

        return true;
      }

      return false;
    }, [productUnitPricingId]);

  const [cloudProductDetailUnitPricing, setSaveChangeProductDetailUnitPricing] =
    useChangeTimer(async () => {
      setProductUnitDetailPricingId(baseDefaultProductUnitDetailPricingId);
      if (productUnitPricingId.product_unit_pricing_id) {
        const access_token = sessionStorage.getItem("access_token") || "";

        console.log(productUnitDetailPricingId.product_unit_id);

        await FetchApi.Pricing.fetchUpdateDetailProductUnitPricing({
          access_token,
          amount: productUnitDetailPricingId.amount,
          detail_product_unit_pricing_id:
            productUnitDetailPricingId.detail_product_unit_pricing_id,
          product_unit_id: productUnitDetailPricingId.product_unit_id,
        });

        return true;
      }

      return false;
    }, [productUnitDetailPricingId]);

  //#endregion

  //#region on change

  const onChangeProductPricing = (e: any) => {
    setDefaultProductPricing((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultProductPricing.product_id !== "") {
      setSaveChangeProductPricing(true);
    }
  };

  const onChangeProductUnitPricing = (e: any, product_unit_id: string) => {
    setProductUnit((val) =>
      val.map((item) => {
        if (item.product_unit_id === product_unit_id) {
          const itemChanged = { ...item, [e.target.name]: giveValueInput(e) };

          setProductUnitPricingId({
            product_unit_pricing_id: itemChanged.product_unit_id,
            profit: itemChanged.profit,
            ratio: itemChanged.ratio,
            unit_id: itemChanged.unit_id,
            product_menu_id: itemChanged.product_menu_id,
          });

          return itemChanged;
        }

        return item;
      })
    );

    if (defaultProductPricing.product_id !== "") {
      setSaveChangeProductUnitPricing(true);
    }
  };

  const onChangeDetailProductPricing = (
    e: any,
    product_unit_id: string,
    detail_product_unit_id: string
  ) => {
    setProductUnit((val) =>
      val.map((item) => {
        if (item.product_unit_id === product_unit_id) {
          return {
            ...item,
            detail: item.detail.map((detail) => {
              if (detail.detail_product_unit_id === detail_product_unit_id) {
                const detail2 = {
                  ...detail,
                  [e.target.name]: giveValueInput(e),
                };

                setProductUnitDetailPricingId({
                  amount: detail2.amount,
                  detail_product_unit_pricing_id:
                    detail2.detail_product_unit_id,
                  product_unit_id: detail2.child_product_unit_id,
                });

                return detail2;
              }

              return detail;
            }),
          };
        }

        return item;
      })
    );

    if (defaultProductPricing.product_id !== "") {
      setSaveChangeProductDetailUnitPricing(true);
    }
  };

  //#endregion

  //#region on click

  const onClickCreateProductUnitPricing = async () => {
    let product_unit_id = crypto.randomUUID();
    if (defaultProductPricing.product_id) {
      const access_token = sessionStorage.getItem("access_token") || "";

      const res = await FetchApi.Pricing.fetchCreateProductUnitPricing({
        access_token,
        product_menu_id: null,
        product_pricing_id: defaultProductPricing.product_id,
        profit: 0,
        ratio: 1,
        unit_id: unitPricing[0].unit_id,
      });

      product_unit_id = res.product_unit_id;
    }

    setProductUnit((val) => [
      ...val,
      {
        product_id: "",
        product_menu_id: null,
        ratio: 0,
        unit_id: unitPricing[0].unit_id,
        product_unit_id,
        profit: 0,
        detail: [],
      },
    ]);
  };

  const onClickCancelProductPricing = () => {
    setDefaultAllProductPricing(baseDefaultAllProductPricing);
    setDefaultProductPricing(baseDefaultProductPricing);
    setting?.productPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  const onClickCreateProductPricing = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      const resCreateProductPricing =
        await FetchApi.Pricing.fetchCreateProductPricing({
          access_token,
          buy: defaultProductPricing.buy,
          name: defaultProductPricing.name,
        });

      for (const product_unit of productUnit) {
        try {
          const res = await FetchApi.Pricing.fetchCreateProductUnitPricing({
            access_token,
            product_menu_id: product_unit.product_menu_id,
            product_pricing_id: resCreateProductPricing.product_id,
            profit: product_unit.profit,
            ratio: product_unit.ratio,
            unit_id: product_unit.unit_id,
          });
          for (const detail of product_unit.detail) {
            try {
              await FetchApi.Pricing.fetchCreateDetailProductUnitPricing({
                access_token,
                amount: detail.amount,
                parent_product_unit_id: res.product_unit_id,
                child_product_unit_id: detail.child_product_unit_id,
              });
            } catch (error) {}
          }
        } catch (error) {}
      }
    } catch (error) {}

    setDefaultProductPricing(baseDefaultProductPricing);
    setting?.categoryMenu.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  const onClickDeleteProductUnitPricing = async (product_unit_id: string) => {
    if (defaultProductPricing.product_id) {
      const access_token = sessionStorage.getItem("access_token") || "";

      await FetchApi.Pricing.fetchDeleteProductUnitPricing({
        access_token,
        product_unit_pricing_id: product_unit_id,
      });
    }
    setProductUnit((val) =>
      val.filter((c) => c.product_unit_id !== product_unit_id)
    );
  };

  const onClickDeleteDetailProductUnitPricing = async (
    detail_product_unit_id: string
  ) => {
    if (defaultProductPricing.product_id) {
      const access_token = sessionStorage.getItem("access_token") || "";

      await FetchApi.Pricing.fetchDeleteDetailProductUnitPricing({
        access_token,
        detail_product_unit_pricing_id: detail_product_unit_id,
      });
    }

    setProductUnit((value) =>
      value.map((product_unit) => {
        const { detail, ...more } = product_unit;
        return {
          ...more,
          detail: detail.filter(
            (detail_item) =>
              detail_item.detail_product_unit_id !== detail_product_unit_id
          ),
        };
      })
    );
  };

  const onClickCreateDetailProductUnitPricing = async (
    parent_product_unit_id: string
  ) => {
    let detail_product_unit_id = crypto.randomUUID();

    const child_product_unit_id =
      defaultAllProductPricing.product_in_pricing.list
        .filter((c) => c.product_id !== setting?.productPricing.state)
        .map((item) =>
          item.product_unit.map((detail) => ({
            name: item.name,
            product_unit_id: detail.product_unit_id,
            unit_name: detail.unit_name,
          }))
        )
        .flat()[0]?.product_unit_id ?? "";

    if (defaultProductPricing.product_id) {
      const access_token = sessionStorage.getItem("access_token") || "";

      const res = await FetchApi.Pricing.fetchCreateDetailProductUnitPricing({
        access_token,
        amount: 0,
        child_product_unit_id,
        parent_product_unit_id,
      });

      detail_product_unit_id = res.product_unit_detail_id;
    }

    setProductUnit((prev) =>
      prev.map((item) => {
        if (item.product_unit_id === parent_product_unit_id) {
          return {
            ...item,
            detail: [
              ...item.detail,
              {
                amount: 0,
                child_product_unit_id,
                parent_product_unit_id,
                detail_product_unit_id,
              },
            ],
          };
        }
        return item;
      })
    );
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>محصول قیمت گذاری</H>
      </Box>
      <Form variant="secondary" col>
        {defaultProductPricing.product_id ? (
          <InputContainer column>
            <Label>شناسه محصول</Label>
            <Input
              title="شناسه محصول"
              type="text"
              id=".product_id"
              name=".product_id"
              value={defaultProductPricing.product_id}
              disabled
              readOnly
            />
          </InputContainer>
        ) : (
          <></>
        )}
        <InputContainer column>
          <Label>نام محصول</Label>
          <Input
            title="نام محصول"
            type="text"
            id="name"
            name="name"
            onChange={(e) => onChangeProductPricing(e)}
            value={defaultProductPricing.name}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label>قیمت خریداری شده محصول</Label>
          <Input
            title="قیمت خریداری شده محصول"
            type="text"
            id="buy"
            name="buy"
            onChange={(e) => onChangeProductPricing(e)}
            value={defaultProductPricing.buy}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
      </Form>
      {productUnit.map((item, i) => (
        <Box variant="guest" key={item.product_unit_id + i}>
          <div className="flex flex-col gap-4">
            <Box variant="primary">
              <H size={3}>مقیاس</H>
            </Box>
            <div className="flex flex-col gap-4">
              <Form variant="secondary" col>
                <InputContainer column>
                  <Label>خروجی</Label>
                  <Input
                    title="خروجی"
                    type="text"
                    id="ratio"
                    name="ratio"
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.product_unit_id)
                    }
                    value={item.ratio}
                    onFocus={(e) => e.target.select()}
                  />
                </InputContainer>
                <InputContainer column>
                  <Label>واحد</Label>
                  <Select
                    name="unit_id"
                    title="واحد"
                    defaultValue={
                      unitPricing.find((c) => c.unit_id === item.unit_id)
                        ?.unit_id
                    }
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.product_unit_id)
                    }
                  >
                    {unitPricing.map((itemUnit) => (
                      <Option value={itemUnit.unit_id} key={itemUnit.unit_id}>
                        {itemUnit.unit_name}
                      </Option>
                    ))}
                  </Select>
                </InputContainer>
                <InputContainer column>
                  <Label>سود</Label>
                  <Input
                    title="سود"
                    type="text"
                    id="profit"
                    name="profit"
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.product_unit_id)
                    }
                    value={item.profit}
                    onFocus={(e) => e.target.select()}
                  />
                </InputContainer>
                <InputContainer column>
                  <Label>محصول در منو</Label>
                  <Select
                    name="product_menu_id"
                    title="محصول در منو"
                    defaultValue={item.product_menu_id ?? ""}
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.product_unit_id)
                    }
                  >
                    <Option value="">ندارد</Option>
                    {productMenu.map((item) => (
                      <Option value={item.product_id} key={item.product_id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </InputContainer>
                <div className="col-span-full flex justify-end gap-4 flex-wrap">
                  <Button
                    title="حذف کردن مقیاس"
                    variant="error"
                    StartIcon={IoMdCloseCircleOutline}
                    onClick={() =>
                      onClickDeleteProductUnitPricing(item.product_unit_id)
                    }
                  >
                    حذف کردن مقیاس
                  </Button>
                </div>
              </Form>
              <Box variant="primary">
                <H size={3}>شرح جزئیات</H>
              </Box>
              {item.detail.map((item_detail) => (
                <Form
                  variant="secondary"
                  key={item_detail.detail_product_unit_id}
                  col
                >
                  <InputContainer column>
                    <Label>نام محصول مصرف شده</Label>
                    <Select
                      name="child_product_unit_id"
                      title="نام محصول مصرف شده"
                      defaultValue={item_detail.child_product_unit_id}
                      onChange={(e) =>
                        onChangeDetailProductPricing(
                          e,
                          item.product_unit_id,
                          item_detail.detail_product_unit_id
                        )
                      }
                    >
                      {defaultAllProductPricing.product_in_pricing.list
                        .filter(
                          (c) => c.product_id !== setting?.productPricing.state
                        )
                        .map((item) =>
                          item.product_unit.map((detail) => ({
                            name: item.name,
                            product_unit_id: detail.product_unit_id,
                            unit_name: detail.unit_name,
                          }))
                        )
                        .flat()
                        .map((itemProduct) => (
                          <Option
                            value={itemProduct.product_unit_id}
                            key={itemProduct.product_unit_id}
                          >
                            {itemProduct.name} - {itemProduct.unit_name}
                          </Option>
                        ))}
                    </Select>
                  </InputContainer>
                  <InputContainer column>
                    <Label>مقدار مصرف شده</Label>
                    <Input
                      title="مقدار مصرف شده"
                      type="number"
                      id="amount"
                      name="amount"
                      onChange={(e) =>
                        onChangeDetailProductPricing(
                          e,
                          item.product_unit_id,
                          item_detail.detail_product_unit_id
                        )
                      }
                      value={item_detail.amount}
                      onFocus={(e) => e.target.select()}
                    />
                  </InputContainer>
                  <div className="col-span-full flex justify-end gap-4 flex-wrap">
                    <Button
                      title="حذف جزئیات محصول"
                      variant="error"
                      StartIcon={IoMdCloseCircleOutline}
                      onClick={() =>
                        onClickDeleteDetailProductUnitPricing(
                          item_detail.detail_product_unit_id
                        )
                      }
                    >
                      حذف جزئیات محصول
                    </Button>
                  </div>
                </Form>
              ))}
              <div className="flex justify-end gap-4 flex-wrap">
                {productUnit.length <
                defaultAllProductPricing.product_in_pricing.list.length ? (
                  <Button
                    title="اضافه کردن جزئیات"
                    variant="success"
                    StartIcon={IoIosAddCircleOutline}
                    onClick={() =>
                      onClickCreateDetailProductUnitPricing(
                        item.product_unit_id
                      )
                    }
                  >
                    اضافه کردن جزئیات
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Box>
      ))}
      <div className="flex justify-end gap-4 flex-wrap">
        {defaultProductPricing.product_id === "" ? (
          <>
            <Button
              title="اضافه کردن مقیاس"
              variant="success"
              StartIcon={IoIosAddCircleOutline}
              onClick={() => onClickCreateProductUnitPricing()}
            >
              اضافه کردن مقیاس
            </Button>
            <Button
              title="ثبت محصول"
              variant="primary"
              StartIcon={IoIosAddCircleOutline}
              onClick={() => onClickCreateProductPricing()}
            >
              ثبت محصول
            </Button>
          </>
        ) : (
          <>
            <Button
              title="اضافه کردن مقیاس"
              variant="success"
              StartIcon={IoIosAddCircleOutline}
              onClick={() => onClickCreateProductUnitPricing()}
            >
              اضافه کردن مقیاس
            </Button>
            <Button
              title="بستن تغییرات محصول"
              variant="error"
              StartIcon={IoMdCloseCircleOutline}
              onClick={() => onClickCancelProductPricing()}
            >
              بستن محصول
            </Button>
            <Button
              title="تغییرات ثبت شده"
              variant="success"
              StartIcon={GoIssueClosed}
              loading={
                !(
                  cloudProductPricing &&
                  cloudProductUnitPricing &&
                  cloudProductDetailUnitPricing
                )
              }
              loadingChild={"در حال بروزرسانی اطلاعات"}
              disabled
            >
              اطلاع بروز است
            </Button>
          </>
        )}
      </div>
    </>
  );
}
