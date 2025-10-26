import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { CTranslateWorld } from "@/Common/Constants/TranslateWorld.Constant";
import { EDashboard } from "@/Common/Enums/Dashboard";
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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateUser() {
  const setting = useContext(AccountContext);

  const baseDefaultUser: TUserAccessId = useMemo(
    () => ({
      user_id: "",
      profile: "",
      name: "",
      family: "",
      national_code: "98",
      phone: "",
      access: [],
      role: [],
    }),
    []
  );

  const [dashboardCapability, setDashboardCapability] = useState<Array<string>>(
    []
  );
  const [defaultUser, setDefaultUser] = useState(baseDefaultUser);
  const [cloudUser, setCloudUser] = useState(true);
  const [saveChangeUser, setSaveChangeUser] = useState(false);
  const [timerUser, setTimerUser] = useState<NodeJS.Timeout>();

  //#region useeffect

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      if (setting?.userAccess.state) {
        const {
          profile,
          name,
          family,
          national_code,
          phone,
          user_id,
          access,
          role,
        } = await FetchApi.User.fetchGetUserById({
          access_token,
          user_id: setting.userAccess.state,
        });
        setDefaultUser({
          profile,
          name,
          family,
          national_code,
          phone,
          user_id,
          access,
          role,
        });
      }
      const data = await FetchApi.User.fetchGetDashboardCapability({
        access_token,
      });
      setDashboardCapability(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timerUser);
    setSaveChangeUser(false);
    saveChangeUser && setCloudUser(false);
    return setTimerUser(
      setTimeout(async () => {
        if (saveChangeUser) {
          const { update } = await FetchApi.User.fetchUpdateUser({
            access_token,
            user_id: defaultUser.user_id,
            name: defaultUser.name,
            family: defaultUser.family,
            national_code: defaultUser.national_code,
            phone: defaultUser.phone,
          });
          setSaveChangeUser(update);
          setCloudUser(update);
        }
      }, 1000)
    );
  }, [defaultUser]);

  //#endregion

  //#region on change

  const onChangeUser = (e: any) => {
    setDefaultUser((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (defaultUser.user_id !== "") {
      setSaveChangeUser(true);
    }
  };

  const onChangeDashboardCapability = async (
    e: any,
    dashboardCapability: string
  ) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const isAddToUser = giveValueInput(e);

    if (defaultUser.user_id !== "") {
      // setSaveChangeUser(true);
      isAddToUser
        ? await FetchApi.User.fetchAddDashboardCapabilityToUser({
            access_token,
            dashboard_capability: dashboardCapability,
            user_id: defaultUser.user_id,
          }).then(() => {
            setDefaultUser((val) => {
              let access = val.access;
              if (isAddToUser) {
                !access.includes(dashboardCapability) &&
                  access.push(dashboardCapability);
              } else {
                access = access.filter((a) => a !== dashboardCapability);
              }

              return {
                ...val,
                access,
              };
            });
          })
        : await FetchApi.User.fetchRemoveDashboardCapabilityToUser({
            access_token,
            dashboard_capability: dashboardCapability,
            user_id: defaultUser.user_id,
          }).then(() => {
            setDefaultUser((val) => {
              let access = val.access;
              if (isAddToUser) {
                !access.includes(dashboardCapability) &&
                  access.push(dashboardCapability);
              } else {
                access = access.filter((a) => a !== dashboardCapability);
              }

              return {
                ...val,
                access,
              };
            });
          });
    }
  };

  //#endregion

  //#region on click

  const onClickCreateUser = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const { create, user_id } = await FetchApi.User.fetchCreateUser({
      access_token,
      name: defaultUser.name,
      family: defaultUser.family,
      national_code: defaultUser.national_code,
      phone: defaultUser.phone,
    });

    if (create) {
      for (const indexDashboardCapability in defaultUser.access) {
        await FetchApi.User.fetchAddDashboardCapabilityToUser({
          access_token,
          dashboard_capability: defaultUser.access[indexDashboardCapability],
          user_id,
        });
        console.log(defaultUser.access[indexDashboardCapability]);
      }
      setDefaultUser(baseDefaultUser);
      setting?.userAccess.setState("");
      setting?.dashboard.setState(EDashboard.READ_USER);
    }
  };

  const onClickCancelUser = () => {
    setDefaultUser(baseDefaultUser);
    setting?.userAccess.setState("");
    setting?.dashboard.setState(EDashboard.READ_USER);
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>کاربر</H>
      </Box>
      <Form
        variant="secondary"
        onSubmit={(e) => {
          e.preventDefault();
          onClickCreateUser();
        }}
      >
        <InputContainer column>
          <Label>نام</Label>
          <Input
            title="نام"
            type="text"
            id="name"
            name="name"
            onChange={(e) => onChangeUser(e)}
            value={defaultUser.name}
          />
        </InputContainer>
        <InputContainer column>
          <Label>نام خانوادگی</Label>
          <Input
            title="نام خانوادگی"
            type="text"
            id="family"
            name="family"
            onChange={(e) => onChangeUser(e)}
            value={defaultUser.family}
          />
        </InputContainer>
        <InputContainer column>
          <Label>موبایل</Label>
          <Input
            title="موبایل"
            type="text"
            id="phone"
            name="phone"
            onChange={(e) => onChangeUser(e)}
            value={defaultUser.phone}
            endText={defaultUser.national_code}
            dir="ltr"
          />
        </InputContainer>
        <Details>
          <Summary variant="primary">لیست دسترسی ها</Summary>
          <div>
            <Box variant="primary">
              <div className="flex flex-wrap gap-4">
                {dashboardCapability.map((val, i) => (
                  <InputContainer key={i}>
                    <Input
                      title="موبایل"
                      type="checkbox"
                      id={val}
                      name={val}
                      onChange={(e) => onChangeDashboardCapability(e, val)}
                      checked={defaultUser.access.includes(val)}
                    />
                    <Label>
                      {CTranslateWorld[val as keyof typeof CTranslateWorld]}
                    </Label>
                  </InputContainer>
                ))}
              </div>
            </Box>
          </div>
        </Details>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultUser.user_id === "" ? (
            <>
              <Button
                title=""
                variant="success"
                StartIcon={IoIosAddCircleOutline}
                onClick={() => onClickCreateUser()}
              >
                ایجاد کاربر
              </Button>
            </>
          ) : (
            <>
              <Button
                title=""
                variant="error"
                StartIcon={IoMdCloseCircleOutline}
                onClick={() => onClickCancelUser()}
              >
                بستن کاربر
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudUser}
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
