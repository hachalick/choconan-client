import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import {
  ReadDashboardCapabilityListViewModel,
  ReadUserDetailViewModel,
} from "@/Common/Connection/Api/ViewModels/User.Service.ViewModel";
import { CTranslateWorld } from "@/Common/Constants/TranslateWorld.Constant";
import { EDashboard } from "@/Common/Enums/Dashboard";
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
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateUser() {
  const setting = useContext(AccountContext);

  const baseDefaultUser: ReadUserDetailViewModel = useMemo(
    () => ({
      Id: "",
      Name: "",
      Family: "",
      NationalCode: "",
      Phone: "",
      Profile: "",
      Access: [],
      Role: [],
    }),
    [],
  );

  const [defaultUser, setDefaultUser] = useState(baseDefaultUser);
  const [dashboardCapability, setDashboardCapability] = useState<
    Array<ReadDashboardCapabilityListViewModel>
  >([]);

  //#region use effect

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";

      if (setting?.userAccess.state) {
        const res = await FetchApi.User.ReadUserDetail({
          AccessToken: access_token,
          Id: setting.userAccess.state,
        });

        setDefaultUser(res);
      }

      const data = await FetchApi.User.ReadDashboardCapabilityList({
        AccessToken: access_token,
      });

      setDashboardCapability(data);
    };

    fetchData();
  }, []);

  const [cloudUser, setSaveChangeUser] = useChangeTimer(async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const res = await FetchApi.User.UpdateUser({
      AccessToken: access_token,
      Id: defaultUser.Id,
      Name: defaultUser.Name,
      Family: defaultUser.Family,
      NationalCode: defaultUser.NationalCode,
      Phone: defaultUser.Phone,
      Profile: defaultUser.Profile,
    });

    return res.Update;
  }, [defaultUser]);

  //#endregion

  //#region on change

  const onChangeUser = (e: any) => {
    setDefaultUser((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (defaultUser.Id) {
      setSaveChangeUser(true);
    }
  };

  const onChangeDashboardCapability = async (
    e: any,
    DashboardCapabilityId: string,
  ) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const isAddToUser = giveValueInput(e);

    if (isAddToUser) {
      setDefaultUser((val) => {
        const exist = val.Access.find((access) => access === e.target.name);

        if (!exist) {
          val.Access.push(e.target.name);
        }

        return { ...val };
      });

      if (defaultUser.Id) {
        await FetchApi.User.CreateDashboardCapabilityUser({
          AccessToken: access_token,
          DashboardCapabilityId: DashboardCapabilityId,
          UserId: defaultUser.Id,
        });
      }
    } else {
      setDefaultUser((val) => {
        val.Access = val.Access.filter((access) => access !== e.target.name);

        return { ...val };
      });

      if (defaultUser.Id) {
        await FetchApi.User.DeleteDashboardCapabilityUser({
          AccessToken: access_token,
          DashboardCapabilityId: DashboardCapabilityId,
          UserId: defaultUser.Id,
        });
      }
    }
  };

  //#endregion

  //#region on click

  const onClickCreateUser = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const res = await FetchApi.User.CreateUser({
      AccessToken: access_token,
      Name: defaultUser.Name,
      Family: defaultUser.Family,
      NationalCode: defaultUser.NationalCode,
      Phone: defaultUser.Phone,
      Password: "",
    });

    setDefaultUser(baseDefaultUser);
    setting?.userAccess.setState("");
    setting?.dashboard.setState(EDashboard.READ_USER);
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
            id="Name"
            name="Name"
            onChange={(e) => onChangeUser(e)}
            value={defaultUser.Name}
          />
        </InputContainer>
        <InputContainer column>
          <Label>نام خانوادگی</Label>
          <Input
            title="نام خانوادگی"
            type="text"
            id="Family"
            name="Family"
            onChange={(e) => onChangeUser(e)}
            value={defaultUser.Family}
          />
        </InputContainer>
        <InputContainer column>
          <Label>موبایل</Label>
          <Input
            title="موبایل"
            type="text"
            id="Phone"
            name="Phone"
            onChange={(e) => onChangeUser(e)}
            value={defaultUser.Phone}
            endText={defaultUser.NationalCode}
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
                      title={`دسترسی ${
                        CTranslateWorld[
                          val.DashboardCapability as keyof typeof CTranslateWorld
                        ]
                      }`}
                      type="checkbox"
                      id={val.Id}
                      name={val.DashboardCapability}
                      onChange={(e) => onChangeDashboardCapability(e, val.Id)}
                      checked={defaultUser.Access.includes(
                        val.DashboardCapability,
                      )}
                    />
                    <Label>
                      {
                        CTranslateWorld[
                          val.DashboardCapability as keyof typeof CTranslateWorld
                        ]
                      }{" "}
                      {val.DashboardCapability}
                    </Label>
                  </InputContainer>
                ))}
              </div>
            </Box>
          </div>
        </Details>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultUser.Id === "" ? (
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
