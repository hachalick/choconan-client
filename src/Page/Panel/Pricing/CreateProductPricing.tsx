import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import {
  ReadProductPricingListViewModel,
  ReadUnitPricingListViewModel,
} from "@/Common/Connection/Api/ViewModels/Pricing.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import Form from "@/Components/Element/Form";
import { H } from "@/Components/Element/H";
import {
  giveValueInput,
  Input,
  InputContainer,
  Label,
} from "@/Components/Element/Input";
import { Option, Select } from "@/Components/Element/Select";
import { AccountContext } from "@/Contexts/Account.Context";
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";
import { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateProductPricing() {
  //#region use context

  const setting = useContext(AccountContext);

  //#endregion

  //#region use memo

  const baseDefaultAProductPricingList: ReadProductPricingListViewModel =
    useMemo(
      () => ({
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
      }),
      [],
    );

  const baseDefaultProductPricingForm = useMemo(
    () => ({
      Id: "",
      Name: "",
      BuyPrice: 0,
    }),
    [],
  );

  const baseDefaultProductUnitPricingId: {
    ProductUnitId: string;
    ProductMenuId: string | null;
    Profit: number;
    Ratio: number;
    UnitId: string;
  } = useMemo(
    () => ({
      ProductUnitId: "",
      ProductMenuId: "",
      Profit: 0,
      Ratio: 0,
      UnitId: "",
    }),
    [],
  );

  const baseDefaultProductUnitDetailPricingId: {
    Id: string;
    ChildProductUnitId: string;
    Amount: number;
  } = useMemo(
    () => ({
      Id: crypto.randomUUID(),
      Amount: 0,
      ChildProductUnitId:
        baseDefaultAProductPricingList.ProductInPricing.List.filter(
          (c) => c.Id !== setting?.productPricing.state,
        )
          .map((item) =>
            item.ProductUnit.map((detail) => ({
              Name: item.Name,
              ProductUnitId: detail.ProductUnitId,
              UnitName: detail.UnitName,
            })),
          )
          .flat()[0]?.ProductUnitId ?? "",
    }),
    [],
  );

  //#endregion

  //#region use state

  const [defaultProductUnitPricingId, setProductUnitPricingId] = useState(
    baseDefaultProductUnitPricingId,
  );

  const [defaultProductPricingList, setDefaultProductPricingList] = useState(
    baseDefaultAProductPricingList,
  );

  const [defaultProductPricingForm, setDefaultProductPricingForm] = useState(
    baseDefaultProductPricingForm,
  );

  const [defaultProductUnitDetailPricingId, setProductUnitDetailPricingId] =
    useState(baseDefaultProductUnitDetailPricingId);

  const [defaultProductMenuList, setDefaultProductMenuList] = useState<
    Array<{
      Id: string;
      IsShowMenu: boolean;
      Name: string;
      Description: string;
      Price: number;
      Waiting: number;
      SnapId: string;
      TapsiId: string;
      SrcImage: string;
    }>
  >([]);

  const [defaultUnitPricingList, setUnitPricingList] = useState<
    Array<ReadUnitPricingListViewModel>
  >([]);

  const [defaultProductUnitForm, setProductUnitForm] = useState<
    Array<{
      ProductUnitId: string;
      UnitId: string;
      ProductMenuId: string | null;
      Ratio: number;
      Profit: number;
      Detail: Array<{
        Id: string;
        ParentProductUnitId: string;
        ChildProductUnitId: string;
        Amount: number;
      }>;
    }>
  >([]);

  //#endregion

  //#region use effect

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const fetchData = async () => {
      const productPricingList = await FetchApi.Pricing.ReadProductPricingList({
        AccessToken: access_token,
      });
      setDefaultProductPricingList(productPricingList);

      const unitPricingList = await FetchApi.Pricing.ReadUnitPricingList({
        AccessToken: access_token,
      });
      setUnitPricingList(unitPricingList);

      const defaultProductMenuList = (await FetchApi.Menu.ReadMenuDetail({}))
        .map((product_menu) => product_menu.Products)
        .flat();
      setDefaultProductMenuList(defaultProductMenuList);

      if (!setting?.productPricing.state) return;

      const find = productPricingList.ProductInPricing.List.find(
        (c) => c.Id === setting?.productPricing.state,
      );

      if (!find) return;

      setDefaultProductPricingForm({
        Id: find.Id,
        BuyPrice: find.BuyPrice,
        Name: find.Name,
      });

      setProductUnitForm(
        find.ProductUnit.map((item) => ({
          Detail: item.Detail.map((item2) => ({
            Id: item2.Id,
            ParentProductUnitId: item2.ParentProductUnitId,
            ChildProductUnitId: item2.ChildProductUnitId,
            Amount: item2.Amount,
          })),
          Id: find.Id,
          ProductMenuId: item.ProductMenuId,
          ProductUnitId: item.ProductUnitId,
          Profit: item.Profit,
          Ratio: item.Ratio,
          UnitId: item.UnitId,
        })),
      );
    };

    fetchData();
  }, []);

  //#endregion

  //#region use change timer

  const [cloudUpdateProductPricingForm, setSaveChangeUpdateProductPricingForm] =
    useChangeTimer(async () => {
      const access_token = sessionStorage.getItem("access_token") || "";

      const res = await FetchApi.Pricing.UpdateProductPricing({
        AccessToken: access_token,
        Id: defaultProductPricingForm.Id,
        Buy: defaultProductPricingForm.BuyPrice,
        Name: defaultProductPricingForm.Name,
      });

      return res.Update;
    }, [defaultProductPricingForm]);

  const [cloudProductUnitPricingForm, setSaveChangeProductUnitPricingForm] =
    useChangeTimer(async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      if (defaultProductUnitPricingId.ProductUnitId) {
        await FetchApi.Pricing.UpdateProductUnitPricing({
          AccessToken: access_token,
          Id: defaultProductUnitPricingId.ProductUnitId,
          Profit: defaultProductUnitPricingId.Profit,
          Ratio: defaultProductUnitPricingId.Ratio,
          UnitPricingId: defaultProductUnitPricingId.UnitId,
          ProductMenuId: defaultProductUnitPricingId.ProductMenuId,
        });
      }

      setProductUnitPricingId(baseDefaultProductUnitPricingId);
      return true;
    }, [defaultProductUnitPricingId]);

  const [
    cloudProductDetailUnitPricingForm,
    setSaveChangeProductDetailUnitPricingForm,
  ] = useChangeTimer(async () => {
    if (!defaultProductUnitDetailPricingId.ChildProductUnitId) return true;

    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Pricing.UpdateDetailProductPricing({
      AccessToken: access_token,
      Id: defaultProductUnitDetailPricingId.Id,
      ChildProductUnitDetailId:
        defaultProductUnitDetailPricingId.ChildProductUnitId,
      Amount: defaultProductUnitDetailPricingId.Amount,
    });

    setProductUnitDetailPricingId(baseDefaultProductUnitDetailPricingId);
    return true;
  }, [defaultProductUnitDetailPricingId]);

  //#endregion

  //#region on change

  const onChangeProductPricing = (e: any) => {
    setDefaultProductPricingForm((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultProductPricingForm.Id) {
      setSaveChangeUpdateProductPricingForm(true);
    }
  };

  const onChangeProductUnitPricing = (e: any, ProductUnitId: string) => {
    setProductUnitForm((val) =>
      val.map((item, i) => {
        if (item.ProductUnitId === ProductUnitId) {
          const itemChanged = { ...item, [e.target.name]: giveValueInput(e) };

          setProductUnitPricingId({
            ProductUnitId: itemChanged.ProductUnitId,
            ProductMenuId:
              itemChanged.ProductMenuId === ""
                ? null
                : itemChanged.ProductMenuId,
            Profit: itemChanged.Profit,
            Ratio: itemChanged.Ratio,
            UnitId: itemChanged.UnitId,
          });

          return itemChanged;
        } else {
          return item;
        }
      }),
    );

    if (defaultProductPricingForm.Id) {
      setSaveChangeProductUnitPricingForm(true);
    }
  };

  const onChangeDetailProductPricing = (
    e: any,
    product_unit_id: string,
    detail_product_unit_id: string,
  ) => {
    setProductUnitForm((val) =>
      val.map((item) => {
        if (item.ProductUnitId === product_unit_id) {
          return {
            ...item,
            Detail: item.Detail.map((detail) => {
              if (detail.Id === detail_product_unit_id) {
                const detail2 = {
                  ...detail,
                  [e.target.name]: giveValueInput(e),
                };

                setProductUnitDetailPricingId({
                  Id: detail2.Id,
                  ChildProductUnitId: detail2.ChildProductUnitId,
                  Amount: detail2.Amount,
                });

                return detail2;
              }

              return detail;
            }),
          };
        }

        return item;
      }),
    );

    if (defaultProductPricingForm.Id) {
      setSaveChangeProductDetailUnitPricingForm(true);
    }
  };

  //#endregion

  //#region on click

  const onClickCreateProductUnitPricing = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    let ProductUnitId = crypto.randomUUID();

    if (setting?.productPricing.state) {
      const res = await FetchApi.Pricing.CreateProductUnitPricing({
        AccessToken: access_token,
        ProductMenuId: null,
        ProductPricingId: setting?.productPricing.state,
        Profit: 0,
        Ratio: 1,
        UnitPricingId: defaultUnitPricingList[0].Id,
      });

      ProductUnitId = res.Id;
    }

    setProductUnitForm((val) => [
      ...val,
      {
        ProductUnitId,
        ProductMenuId: null,
        UnitId: defaultUnitPricingList[0].Id,
        Ratio: 0,
        Profit: 0,
        Detail: [],
      },
    ]);
  };

  const onClickCreateProductPricing = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const resCreateProductPricing = await FetchApi.Pricing.CreateProductPricing(
      {
        AccessToken: access_token,
        Buy: defaultProductPricingForm.BuyPrice,
        Name: defaultProductPricingForm.Name,
      },
    );
    // console.log({
    //   AccessToken: access_token,
    //   Buy: defaultProductPricingForm.BuyPrice,
    //   Name: defaultProductPricingForm.Name,
    // });

    for (const itemProductUnit of defaultProductUnitForm) {
      const res = await FetchApi.Pricing.CreateProductUnitPricing({
        AccessToken: access_token,
        ProductMenuId: itemProductUnit.ProductMenuId,
        ProductPricingId: resCreateProductPricing.Id,
        Profit: itemProductUnit.Profit,
        Ratio: itemProductUnit.Ratio,
        UnitPricingId: itemProductUnit.UnitId,
      });
      // console.log({
      //   AccessToken: access_token,
      //   ProductMenuId: itemProductUnit.ProductMenuId,
      //   ProductPricingId: "resCreateProductPricing.Id",
      //   Profit: itemProductUnit.Profit,
      //   Ratio: itemProductUnit.Ratio,
      //   UnitPricingId: itemProductUnit.UnitId,
      // });
      for (const itemDetail of itemProductUnit.Detail) {
        await FetchApi.Pricing.CreateDetailProductPricing({
          AccessToken: access_token,
          Amount: itemDetail.Amount,
          ParentProductUnitDetailId: res.Id,
          ChildProductUnitDetailId: itemDetail.ChildProductUnitId,
        });
        // console.log({
        //   AccessToken: access_token,
        //   Amount: itemDetail.Amount,
        //   ParentProductUnitDetailId: "res.Id",
        //   ChildProductUnitDetailId: itemDetail.ChildProductUnitId,
        // });
      }
    }

    setDefaultProductPricingList(baseDefaultAProductPricingList);
    setDefaultProductPricingForm(baseDefaultProductPricingForm);
    setting?.productPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  const onClickDeleteProductUnitPricing = async (ProductUnitId: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    if (setting?.productPricing.state) {
      await FetchApi.Pricing.DeleteProductUnitPricing({
        AccessToken: access_token,
        Id: ProductUnitId,
      });
    }

    setProductUnitForm((val) =>
      val.filter((c) => c.ProductUnitId !== ProductUnitId),
    );
  };

  const onClickCancelProductPricing = () => {
    setDefaultProductPricingList(baseDefaultAProductPricingList);
    setDefaultProductPricingForm(baseDefaultProductPricingForm);
    setting?.productPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  const onClickCreateDetailProductUnitPricing = async (
    ParentProductUnitDetailId: string,
  ) => {
    let Id = crypto.randomUUID();

    const ChildProductUnitDetailId =
      defaultProductPricingList.ProductInPricing.List.filter(
        (c) => c.Id !== setting?.productPricing.state,
      )
        .map((item) =>
          item.ProductUnit.map((detail) => ({
            name: item.Name,
            product_unit_id: detail.ProductUnitId,
            unit_name: detail.UnitName,
          })),
        )
        .flat()[0]?.product_unit_id;

    if (setting?.productPricing.state) {
      const access_token = sessionStorage.getItem("access_token") || "";

      const res = await FetchApi.Pricing.CreateDetailProductPricing({
        AccessToken: access_token,
        Amount: 0,
        ChildProductUnitDetailId,
        ParentProductUnitDetailId,
      });

      Id = res.Id;
    }

    setProductUnitForm((prev) =>
      prev.map((item) => {
        if (item.ProductUnitId === ParentProductUnitDetailId) {
          return {
            ...item,
            Detail: [
              ...item.Detail,
              {
                Id,
                Amount: 0,
                ChildProductUnitId: ChildProductUnitDetailId,
                ParentProductUnitId: ParentProductUnitDetailId,
              },
            ],
          };
        }
        return item;
      }),
    );
  };

  const onClickDeleteDetailProductUnitPricing = async (
    detail_product_unit_id: string,
  ) => {
    if (defaultProductPricingForm.Id) {
      const access_token = sessionStorage.getItem("access_token") || "";

      await FetchApi.Pricing.DeleteDetailProductPricing({
        AccessToken: access_token,
        Id: detail_product_unit_id,
      });
    }

    setProductUnitForm((value) =>
      value.map((product_unit) => {
        const { Detail, ...more } = product_unit;
        return {
          ...more,
          Detail: Detail.filter(
            (detail_item) => detail_item.Id !== detail_product_unit_id,
          ),
        };
      }),
    );
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>محصول قیمت گذاری</H>
      </Box>
      <Form variant="secondary" col>
        <InputContainer column>
          <Label>نام محصول</Label>
          <Input
            title="نام محصول"
            type="text"
            id="Name"
            name="Name"
            onChange={(e) => onChangeProductPricing(e)}
            value={defaultProductPricingForm.Name}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label>قیمت خریداری شده محصول</Label>
          <Input
            title="قیمت خریداری شده محصول"
            type="number"
            id="BuyPrice"
            name="BuyPrice"
            onChange={(e) => onChangeProductPricing(e)}
            value={defaultProductPricingForm.BuyPrice}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
      </Form>
      {defaultProductUnitForm.map((item, i) => (
        <Box variant="guest" key={item.ProductUnitId + i}>
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
                    type="number"
                    id="Ratio"
                    name="Ratio"
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.ProductUnitId)
                    }
                    value={item.Ratio}
                    onFocus={(e) => e.target.select()}
                  />
                </InputContainer>
                <InputContainer column>
                  <Label>واحد</Label>
                  <Select
                    name="UnitId"
                    title="واحد"
                    defaultValue={
                      defaultUnitPricingList.find((c) => c.Id === item.UnitId)
                        ?.Id
                    }
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.ProductUnitId)
                    }
                  >
                    {defaultUnitPricingList.map((itemUnit) => (
                      <Option value={itemUnit.Id} key={itemUnit.Id}>
                        {itemUnit.Name}
                      </Option>
                    ))}
                  </Select>
                </InputContainer>
                <InputContainer column>
                  <Label>سود</Label>
                  <Input
                    title="سود"
                    type="number"
                    id="Profit"
                    name="Profit"
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.ProductUnitId)
                    }
                    value={item.Profit}
                    onFocus={(e) => e.target.select()}
                  />
                </InputContainer>
                <InputContainer column>
                  <Label>محصول در منو</Label>
                  <Select
                    name="ProductMenuId"
                    title="محصول در منو"
                    defaultValue={item.ProductMenuId ?? ""}
                    onChange={(e) =>
                      onChangeProductUnitPricing(e, item.ProductUnitId)
                    }
                  >
                    <Option value="">ندارد</Option>
                    {defaultProductMenuList.map((item) => (
                      <Option value={item.Id} key={item.Id}>
                        {item.Name}
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
                      onClickDeleteProductUnitPricing(item.ProductUnitId)
                    }
                  >
                    حذف کردن مقیاس
                  </Button>
                </div>
              </Form>
              <Box variant="primary">
                <H size={3}>شرح جزئیات</H>
              </Box>
              {item.Detail.map((item_detail) => (
                <Form variant="secondary" key={item_detail.Id} col>
                  <InputContainer column>
                    <Label>نام محصول مصرف شده</Label>
                    <Select
                      name="ChildProductUnitId"
                      title="نام محصول مصرف شده"
                      defaultValue={item_detail.Id}
                      onChange={(e) =>
                        onChangeDetailProductPricing(
                          e,
                          item.ProductUnitId,
                          item_detail.Id,
                        )
                      }
                    >
                      {defaultProductPricingList.ProductInPricing.List.filter(
                        (c) => c.Id !== setting?.productPricing.state,
                      )
                        .map((item) =>
                          item.ProductUnit.map((detail) => ({
                            Name: item.Name,
                            ProductUnitId: detail.ProductUnitId,
                            UnitName: detail.UnitName,
                          })),
                        )
                        .flat()
                        .map((itemProduct) => (
                          <Option
                            value={itemProduct.ProductUnitId}
                            key={itemProduct.ProductUnitId}
                          >
                            {itemProduct.Name} - {itemProduct.UnitName}
                          </Option>
                        ))}
                    </Select>
                  </InputContainer>
                  <InputContainer column>
                    <Label>مقدار مصرف شده</Label>
                    <Input
                      title="مقدار مصرف شده"
                      type="number"
                      id="Amount"
                      name="Amount"
                      onChange={(e) =>
                        onChangeDetailProductPricing(
                          e,
                          item.ProductUnitId,
                          item_detail.Id,
                        )
                      }
                      value={item_detail.Amount}
                      onFocus={(e) => e.target.select()}
                    />
                  </InputContainer>
                  <div className="col-span-full flex justify-end gap-4 flex-wrap">
                    <Button
                      title="حذف جزئیات محصول"
                      variant="error"
                      StartIcon={IoMdCloseCircleOutline}
                      onClick={() =>
                        onClickDeleteDetailProductUnitPricing(item_detail.Id)
                      }
                    >
                      حذف جزئیات محصول
                    </Button>
                  </div>
                </Form>
              ))}
              {item.Detail.length <
              defaultProductPricingList.ProductInPricing.List.length ? (
                <>
                  <div className="flex justify-end gap-4 flex-wrap">
                    <Button
                      title="اضافه کردن جزئیات"
                      variant="success"
                      StartIcon={IoIosAddCircleOutline}
                      onClick={() =>
                        onClickCreateDetailProductUnitPricing(
                          item.ProductUnitId,
                        )
                      }
                    >
                      اضافه کردن جزئیات
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </Box>
      ))}
      <div className="flex justify-end gap-4 flex-wrap">
        <Button
          title="اضافه کردن مقیاس"
          variant="success"
          StartIcon={IoIosAddCircleOutline}
          onClick={() => onClickCreateProductUnitPricing()}
        >
          اضافه کردن مقیاس
        </Button>
        {defaultProductPricingForm.Id ? (
          <>
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
                  (
                    cloudUpdateProductPricingForm &&
                    cloudProductUnitPricingForm &&
                    cloudProductDetailUnitPricingForm
                  )
                  //
                )
              }
              loadingChild={"در حال بروزرسانی اطلاعات"}
              disabled
            >
              اطلاع بروز است
            </Button>
          </>
        ) : (
          <>
            <Button
              title="ثبت محصول"
              variant="primary"
              StartIcon={IoIosAddCircleOutline}
              onClick={() => onClickCreateProductPricing()}
            >
              ثبت محصول
            </Button>
          </>
        )}
      </div>
    </>
  );
}
