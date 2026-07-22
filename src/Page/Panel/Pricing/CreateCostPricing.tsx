import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadCostProductPricingDetailViewModel } from "@/Common/Connection/Api/ViewModels/Pricing.Service.ViewModel";
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
import { AccountContext } from "@/Contexts/Account.Context";
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateCostPricing() {
  const setting = useContext(AccountContext);

  const baseDefaultCostPricing: ReadCostProductPricingDetailViewModel = useMemo(
    () => ({
      Id: "",
      Name: "",
      Price: 0,
    }),
    [],
  );

  const [defaultCostPricing, setDefaultCostPricing] = useState(
    baseDefaultCostPricing,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (setting?.costPricing.state) {
        const access_token = sessionStorage.getItem("access_token") || "";
        const res = await FetchApi.Pricing.ReadCostProductPricingDetail({
          AccessToken: access_token,
          Id: setting.costPricing.state,
        });

        setDefaultCostPricing(res);
      }
    };
    fetchData();
  }, []);

  const [cloudCostPricing, setSaveChangeCostPricing] =
    useChangeTimer(async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const res = await FetchApi.Pricing.UpdateCostProductPricing({
        AccessToken: access_token,
        Id: defaultCostPricing.Id,
        Name: defaultCostPricing.Name,
        Price: defaultCostPricing.Price,
      });

      return res.Update;
    }, [defaultCostPricing]);

  const onChangeCostPricing = (e: any) => {
    setDefaultCostPricing((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultCostPricing.Id) {
      setSaveChangeCostPricing(true);
    }
  };

  const onClickCreateCostPricing = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Pricing.CreateCostProductPricing({
      AccessToken: access_token,
      Name: defaultCostPricing.Name,
      Price: defaultCostPricing.Price,
    });

    setDefaultCostPricing(baseDefaultCostPricing);
    setting?.costPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  const onClickCancelCostPricing = () => {
    setDefaultCostPricing(baseDefaultCostPricing);
    setting?.costPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_PRODUCT_PRICING);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>اطلاعات حساب</H>
      </Box>
      <Form variant="primary">
        <InputContainer column>
          <Label htmlFor="Name">نام:</Label>
          <Input
            title="Name"
            id="Name"
            name="Name"
            type="text"
            value={defaultCostPricing.Name}
            placeholder="نام"
            onChange={(e) => onChangeCostPricing(e)}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="Price">قیمت:</Label>
          <Input
            title="Price"
            id="Price"
            name="Price"
            type="number"
            value={defaultCostPricing.Price}
            placeholder="قیمت"
            onChange={(e) => onChangeCostPricing(e)}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultCostPricing.Id ? (
            <>
              <Button
                title=""
                variant="error"
                StartIcon={IoMdCloseCircleOutline}
                onClick={() => onClickCancelCostPricing()}
              >
                بستن هزینه های ثابت
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudCostPricing}
                loadingChild={"در حال بروزرسانی اطلاعات"}
                disabled
              >
                اطلاع بروز است
              </Button>
            </>
          ) : (
            <>
              <Button
                title=""
                variant="success"
                StartIcon={IoIosAddCircleOutline}
                onClick={() => onClickCreateCostPricing()}
              >
                ایجاد هزینه های ثابت
              </Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}
