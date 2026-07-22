import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadRoleDetailViewModel } from "@/Common/Connection/Api/ViewModels/User.Service.ViewModel";
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

export default function CreateRole() {
  const setting = useContext(AccountContext);

  const baseDefaultRole: ReadRoleDetailViewModel = useMemo(
    () => new ReadRoleDetailViewModel(),
    [],
  );

  const [defaultRole, setDefaultRole] = useState(baseDefaultRole);

  //#region useeffect

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";

      if (setting?.roleAccess.state) {
        const res = await FetchApi.User.ReadRoleDetail({
          AccessToken: access_token,
          Id: setting?.roleAccess.state,
        });

        setDefaultRole(res);
      }
    };
    fetchData();
  }, []);

  const [cloudRole, setSaveChangeRole] = useChangeTimer(async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const res = await FetchApi.User.UpdateRole({
      AccessToken: access_token,
      Id: defaultRole.Id,
      Name: defaultRole.Name,
    });

    return res.Update;
  }, [defaultRole]);

  //#endregion

  //#region on change

  const onChangeRole = (e: any) => {
    setDefaultRole((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultRole.Id) {
      setSaveChangeRole(true);
    }
  };

  //#endregion

  //#region on click

  const onClickCreateRole = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const res = await FetchApi.User.CreateRole({
      AccessToken: access_token,
      Name: defaultRole.Name,
    });

    if (res) {
      setDefaultRole(baseDefaultRole);
      setting?.dashboard.setState(EDashboard.READ_ROLE);
      setting?.roleAccess.setState("");
    }
  };

  const onClickCancelRole = () => {
    setDefaultRole(baseDefaultRole);
    setting?.roleAccess.setState("");
    setting?.dashboard.setState(EDashboard.READ_ROLE);
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>نقش کاربر</H>
      </Box>
      <Form
        variant="secondary"
        onSubmit={(e) => {
          e.preventDefault();
          onClickCreateRole();
        }}
      >
        <InputContainer column>
          <Label>نام نقش</Label>
          <Input
            title="نام نقش"
            type="text"
            id="Name"
            name="Name"
            onChange={(e) => onChangeRole(e)}
            value={defaultRole.Name}
          />
        </InputContainer>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultRole.Id ? (
            <>
              <Button
                title=""
                variant="error"
                StartIcon={IoMdCloseCircleOutline}
                onClick={() => onClickCancelRole()}
              >
                بستن نقش کاربر
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudRole}
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
                onClick={() => onClickCreateRole()}
              >
                ایجاد نقش کاربر
              </Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}
