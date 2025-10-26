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
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateRole() {
  const setting = useContext(AccountContext);

  const baseDefaultRole: TRoleAccessId = useMemo(
    () => ({ role_id: "", role_name: "" }),
    []
  );

  const [defaultRole, setDefaultRole] = useState(baseDefaultRole);
  const [cloudRole, setCloudRole] = useState(true);
  const [saveChangeRole, setSaveChangeRole] = useState(false);
  const [timerRole, setTimerRole] = useState<NodeJS.Timeout>();

  //#region useeffect

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      if (setting?.roleAccess.state) {
        const { role_id, role_name } = await FetchApi.User.fetchGetRoleById({
          role_id: setting.roleAccess.state,
          access_token,
        });
        setDefaultRole({ role_id, role_name });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timerRole);
    setSaveChangeRole(false);
    saveChangeRole && setCloudRole(false);
    return setTimerRole(
      setTimeout(async () => {
        if (saveChangeRole) {
          const { update } = await FetchApi.User.fetchUpdateRole({
            access_token,
            role_id: defaultRole.role_id,
            role_name: defaultRole.role_name,
          });
          setSaveChangeRole(update);
          setCloudRole(update);
        }
      }, 1000)
    );
  }, [defaultRole]);

  //#endregion

  //#region on change

  const onChangeRole = (e: any) => {
    setDefaultRole((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (defaultRole.role_id !== "") {
      setSaveChangeRole(true);
    }
  };

  //#endregion

  //#region on click

  const onClickCreateRole = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const { create } = await FetchApi.User.fetchCreateRole({
      access_token,
      role_name: defaultRole.role_name,
    });

    if (create) {
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
            id="role_name"
            name="role_name"
            onChange={(e) => onChangeRole(e)}
            value={defaultRole.role_name}
          />
        </InputContainer>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultRole.role_id === "" ? (
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
          ) : (
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
          )}
        </div>
      </Form>
    </>
  );
}
