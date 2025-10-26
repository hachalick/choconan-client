import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { ERoute } from "@/Common/Enums/Routs";
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
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateMenuCategory() {
  const setting = useContext(AccountContext);

  const baseDefaultCategory: Omit<TIdCategoryMenu, "products"> = useMemo(
    () => ({
      category_product_id: "",
      category: "",
      icon: "/default.jpg",
    }),
    []
  );

  const [defaultCategory, setDefaultCategory] = useState(baseDefaultCategory);
  const [saveChangeCategory, setSaveChangeCategory] = useState(false);
  const [cloudCategory, setCloudCategory] = useState(true);
  const [timerCategory, setTimerCategory] = useState<NodeJS.Timeout>();

  //#region use effect

  useEffect(() => {
    const fetchData = async () => {
      if (setting?.categoryMenu.state) {
        const { category, icon, category_product_id } =
          await FetchApi.Menu.fetchCategoryMenu({
            category: setting.categoryMenu.state,
          });
        setDefaultCategory({ category, category_product_id, icon });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timerCategory);
    setSaveChangeCategory(false);
    saveChangeCategory && setCloudCategory(false);
    return setTimerCategory(
      setTimeout(async () => {
        if (saveChangeCategory) {
          const { update } = await FetchApi.Menu.fetchUpdateCategoryMenu({
            access_token,
            category: defaultCategory.category,
            category_id: defaultCategory.category_product_id,
            icon: defaultCategory.icon,
          });
          setSaveChangeCategory(update);
          setCloudCategory(update);
        }
      }, 1000)
    );
  }, [defaultCategory]);

  //#endregion

  const onChangeCategory = (e: any) => {
    setDefaultCategory((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (defaultCategory.category_product_id !== "") {
      setSaveChangeCategory(true);
    }
  };

  //#region on click

  const onClickCancelCategory = () => {
    setDefaultCategory(baseDefaultCategory);
    setting?.categoryMenu.setState("");
    setting?.dashboard.setState(EDashboard.READ_MENU_CATEGORY);
  };

  const onClickCreateCategory = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Menu.fetchCreateCategoryMenu({
      access_token,
      category: defaultCategory.category,
      icon: defaultCategory.icon,
    });
    setDefaultCategory(baseDefaultCategory);
    setting?.categoryMenu.setState("");
    setting?.dashboard.setState(EDashboard.READ_MENU_CATEGORY);
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>دسته بندی های منو</H>
      </Box>
      <Form variant="secondary">
        <div className="flex justify-center">
          <img
            src={`${ERoute.HOST}/${defaultCategory.icon}`}
            alt={defaultCategory.category}
            className="w-40 h-40 object-contain"
            loading="lazy"
          />
        </div>
        {defaultCategory.category_product_id ? (
          <InputContainer column>
            <Label>شناسه دسته بندی</Label>
            <Input
              title="شناسه دسته بندی"
              type="text"
              id="category_product_id"
              name="category_product_id"
              value={defaultCategory.category_product_id}
              disabled
            />
          </InputContainer>
        ) : (
          <></>
        )}
        <InputContainer column>
          <Label>نام دسته بندی</Label>
          <Input
            title="نام دسته بندی"
            type="text"
            id="category"
            name="category"
            onChange={(e) => onChangeCategory(e)}
            value={defaultCategory.category}
          />
        </InputContainer>
        <InputContainer column>
          <Label>مسیر عکس</Label>
          <Input
            title="مسیر عکس"
            type="text"
            id="icon"
            name="icon"
            onChange={(e) => onChangeCategory(e)}
            value={defaultCategory.icon}
            dir="ltr"
          />
        </InputContainer>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultCategory.category_product_id === "" ? (
            <>
              <Button
                title=""
                variant="success"
                StartIcon={IoIosAddCircleOutline}
                onClick={() => onClickCreateCategory()}
              >
                ایجاد دسته بندی
              </Button>
            </>
          ) : (
            <>
              <Button
                title=""
                variant="error"
                StartIcon={IoMdCloseCircleOutline}
                onClick={() => onClickCancelCategory()}
              >
                بستن دسته بندی
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudCategory}
                loadingChild={"در حال بروزرسانی اطلاعات"}
                disabled
              >
                اطلاع بروز است
              </Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}
