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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateProductPricing() {
  const setting = useContext(AccountContext);

  const baseDefaultAllProductPricing: TGetAllProductPricingResponseDto =
    useMemo(
      () => ({
        cost: { average_cost: 0, sum_cost: 0, list: [] },
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
    product_unit: {
      price_in_menu: string | null;
      product_unit_id: string;
      unit_name: string;
      ratio: number;
      profit: number;
      sum_detail: number;
      price_by_unit: number;
      total_price_for_ratio: number;
      count_sell: number;
      detail: Array<{
        product_unit_detail_id: string;
        name: string;
        unit: string;
        amount: number;
        buy: number;
        ratio: number;
        price_by_unit: number;
        total_price_by_unit: number;
      }>;
    }[];
  } = useMemo(
    () => ({
      buy: 0,
      name: "",
      product_id: setting?.productPricing.state ?? "",
      product_unit: [],
    }),
    []
  );

  const [defaultAllProductPricing, setDefaultAllProductPricing] = useState(
    baseDefaultAllProductPricing
  );

  const [defaultProductPricing, setDefaultProductPricing] = useState<{
    product_id: string;
    name: string;
    buy: number;
    product_unit: {
      price_in_menu: string | null;
      product_unit_id: string;
      unit_name: string;
      ratio: number;
      profit: number;
      sum_detail: number;
      price_by_unit: number;
      total_price_for_ratio: number;
      count_sell: number;
      detail: Array<{
        product_unit_detail_id: string;
        name: string;
        unit: string;
        amount: number;
        buy: number;
        ratio: number;
        price_by_unit: number;
        total_price_by_unit: number;
      }>;
    }[];
  }>(baseDefaultProductPricing);
  const [saveChangeProductPricing, setSaveChangeProductPricing] =
    useState(false);
  const [cloudProductPricing, setCloudProductPricing] = useState(true);
  const [timerProductPricing, setTimerProductPricing] =
    useState<NodeJS.Timeout>();
  const [unitPricing, setUnitPricing] = useState<
    Array<TGetUnitPricingResponseDto>
  >([]);

  //#region use effect

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const allUnit = await FetchApi.Pricing.fetchGetAllUnitPricing({
        access_token,
      });
      setUnitPricing(allUnit);
      if (setting?.productPricing.state) {
        const res = await FetchApi.Pricing.fetchGetAllProductPricing({
          access_token,
        });
        const find = res.product_in_pricing.list.find(
          (c) => c.product_id === defaultProductPricing.product_id
        );
        setDefaultAllProductPricing(res);
        if (find) setDefaultProductPricing(find);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timerProductPricing);
    setSaveChangeProductPricing(false);
    saveChangeProductPricing && setCloudProductPricing(false);
    return setTimerProductPricing(
      setTimeout(async () => {
        if (saveChangeProductPricing) {
          const { update } = await FetchApi.Pricing.fetchUpdateProductPricing({
            access_token,
            product_pricing_id: defaultProductPricing.product_id,
            buy: defaultProductPricing.buy,
            name: defaultProductPricing.name,
          });
          setSaveChangeProductPricing(update);
          setCloudProductPricing(update);
        }
      }, 1000)
    );
  }, [defaultProductPricing]);

  //#endregion

  const onChangeProductPricing = (e: any) => {
    setDefaultProductPricing((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultProductPricing.product_id !== "") {
      setSaveChangeProductPricing(true);
    }
  };

  //#region on click

  const onClickCancelProductPricing = () => {
    setDefaultAllProductPricing(baseDefaultAllProductPricing);
    setDefaultProductPricing(baseDefaultProductPricing);
    setting?.productPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  const onClickCreateProductPricing = async () => {
    // const access_token = sessionStorage.getItem("access_token") || "";
    // await FetchApi.Menu.fetchCreateCategoryMenu({
    //   access_token,
    //   category: defaultCategory.category,
    //   icon: defaultCategory.icon,
    // });
    // setDefaultProductPricing(baseDefaultCategory);
    // setting?.categoryMenu.setState("");
    // setting?.dashboard.setState(EDashboard.READ_MENU_CATEGORY);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>محصول قیمت گذاری</H>
      </Box>
      <Form variant="secondary">
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
          />
        </InputContainer>
      </Form>
      {defaultProductPricing.product_unit.map((item) => (
        <Box variant="guest" key={item.product_unit_id}>
          <div className="flex flex-col gap-4">
            <Box variant="primary">
              <H size={3}>خروجی در مقیاس {item.unit_name}</H>
            </Box>
            <div className="flex flex-col gap-4">
              <Form variant="secondary">
                <InputContainer column>
                  <Label>مقدار خروجی</Label>
                  <Input
                    title="مقدار خروجی"
                    type="text"
                    id="ratio"
                    name="ratio"
                    onChange={(e) => onChangeProductPricing(e)}
                    value={item.ratio}
                  />
                </InputContainer>
                <InputContainer column>
                  <Label>واحد مقیاس</Label>
                  <Select
                    name="unit_pricing"
                    title="واحد مقیاس"
                    defaultValue={
                      unitPricing.find((c) => c.unit_name === item.unit_name)
                        ?.unit_id
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
                  <Label>سود در این مقیاس</Label>
                  <Input
                    title="سود"
                    type="text"
                    id="profit"
                    name="profit"
                    onChange={(e) => onChangeProductPricing(e)}
                    value={item.profit}
                  />
                </InputContainer>
              </Form>
              <Box variant="primary">
                <H size={3}>شرح جزئیات </H>
              </Box>
              {item.detail.map((item3) => (
                <Form variant="secondary" key={item3.product_unit_detail_id}>
                  <InputContainer column>
                    <Label>نام محصول مصرف شده</Label>
                    <Select
                      name="unit_pricing"
                      title="نام محصول مصرف شده"
                      defaultValue={
                        defaultAllProductPricing.product_in_pricing.list.find(
                          (c) => c.name === item3.name
                        )?.product_id
                      }
                    >
                      {defaultAllProductPricing.product_in_pricing.list
                        .filter(
                          (c) => c.product_id !== setting?.productPricing.state
                        )
                        .map((itemProduct) => (
                          <Option
                            value={itemProduct.product_id}
                            key={itemProduct.product_id}
                          >
                            {itemProduct.name}
                          </Option>
                        ))}
                    </Select>
                  </InputContainer>
                  <InputContainer column>
                    <Label>مقدار مصرف شده</Label>
                    <Input
                      title="مقدار مصرف شده"
                      type="text"
                      id="amount"
                      name="amount"
                      onChange={(e) => onChangeProductPricing(e)}
                      value={item3.amount}
                    />
                  </InputContainer>
                  <InputContainer column>
                    <Label>واحد مقیاس</Label>
                    <Select
                      name="unit_pricing"
                      title="واحد مقیاس"
                      defaultValue={
                        unitPricing.find((c) => c.unit_name === item3.unit)
                          ?.unit_id
                      }
                    >
                      {unitPricing.map((itemUnit) => (
                        <Option value={itemUnit.unit_id} key={itemUnit.unit_id}>
                          {itemUnit.unit_name}
                        </Option>
                      ))}
                    </Select>
                  </InputContainer>
                </Form>
              ))}
            </div>
          </div>
        </Box>
      ))}
      <div className="flex justify-end gap-4 flex-wrap">
        {defaultProductPricing.product_id === "" ? (
          <Button
            title="ثبت محصول"
            variant="success"
            StartIcon={IoIosAddCircleOutline}
            // onClick={() => onClickCreateNewFactor()}
          >
            ثبت محصول
          </Button>
        ) : (
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
              loading={!cloudProductPricing}
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
