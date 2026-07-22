import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadUnitPricingDetailViewModel } from "@/Common/Connection/Api/ViewModels/Pricing.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import Form from "@/Components/Element/Form";
import { H } from "@/Components/Element/H";
import { giveValueInput, Input, InputContainer, Label } from "@/Components/Element/Input";
import { AccountContext } from "@/Contexts/Account.Context";
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateUnitPricing() {
  const setting = useContext(AccountContext);

  const baseDefaultUnitPricing: ReadUnitPricingDetailViewModel = useMemo(
    () => ({
      Id: "",
      Name: "",
      Price: 0,
    }),
    [],
  );

  const [defaultUnitPricing, setDefaultUnitPricing] = useState(
    baseDefaultUnitPricing,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (setting?.unitPricing.state) {
        const access_token = sessionStorage.getItem("access_token") || "";
        const res = await FetchApi.Pricing.ReadUnitPricingDetail({
          AccessToken: access_token,
          Id: setting.unitPricing.state,
        });

        setDefaultUnitPricing(res);
      }
    };
    fetchData();
  }, []);

  const [cloudUnitPricing, setSaveChangeUnitPricing] =
    useChangeTimer(async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const res = await FetchApi.Pricing.UpdateUnitPricing({
        AccessToken: access_token,
        Id: defaultUnitPricing.Id,
        Name: defaultUnitPricing.Name,
      });

      return res.Update;
    }, [defaultUnitPricing]);

  const onChangeUnitPricing = (e: any) => {
    setDefaultUnitPricing((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultUnitPricing.Id) {
      setSaveChangeUnitPricing(true);
    }
  };

  const onClickCreateUnitPricing = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Pricing.CreateUnitPricing({
      AccessToken: access_token,
      Name: defaultUnitPricing.Name,
    });

    setDefaultUnitPricing(baseDefaultUnitPricing);
    setting?.unitPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_UNIT_PRICING);
  };

  const onClickCancelUnitPricing = () => {
    setDefaultUnitPricing(baseDefaultUnitPricing);
    setting?.unitPricing.setState("");
    setting?.dashboard.setState(EDashboard.READ_UNIT_PRICING);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>واحد اندازه گیری</H>
      </Box>
      <Form variant="primary">
        <InputContainer column>
          <Label htmlFor="Name">نام:</Label>
          <Input
            title="Name"
            id="Name"
            name="Name"
            type="text"
            value={defaultUnitPricing.Name}
            placeholder="نام"
            onChange={(e) => onChangeUnitPricing(e)}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultUnitPricing.Id ? (
            <>
              <Button
                title=""
                variant="error"
                StartIcon={IoMdCloseCircleOutline}
                onClick={() => onClickCancelUnitPricing()}
              >
                بستن واحد اندازه گیری
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudUnitPricing}
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
                onClick={() => onClickCreateUnitPricing()}
              >
                ایجاد واحد اندازه گیری
              </Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}
