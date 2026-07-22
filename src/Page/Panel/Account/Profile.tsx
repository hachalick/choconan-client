import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadAccountDetailViewModel } from "@/Common/Connection/Api/ViewModels/User.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import Form from "@/Components/Element/Form";
import { H } from "@/Components/Element/H";
import { Input, InputContainer, Label } from "@/Components/Element/Input";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

export default function Profile() {
  const setting = useContext(AccountContext);
  const [profile, setProfile] = useState<ReadAccountDetailViewModel>(
    setting?.profile || new ReadAccountDetailViewModel(),
  );

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      if (access_token) {
        const res = await FetchApi.User.UpdateUserProfile({
          AccessToken: access_token,
          Family: profile.Family,
          Name: profile.Name,
          Token: access_token,
        });

        if (res.Update) {
          Swal.fire({
            title: "اطلاعات تغییر کرد",
            text: "اطلاعات کاربری شما با موفقیت تغییر کرد",
            icon: "success",
            confirmButtonText: "گرفتم",
            timer: 1500,
          });
          location.reload();
        } else {
          Swal.fire({
            title: "رمز تغییر نکرد",
            text: "مشکلی در تغییر رمز بوجود آمد",
            icon: "warning",
            confirmButtonText: "تلاش مجدد",
            timer: 3000,
          });
        }
      }
    } catch (error: any) {
      Swal.fire({
        title: "رمز تغییر نکرد",
        text: error?.message || "مشکلی در تغییر رمز بوجود آمد",
        icon: "warning",
        confirmButtonText: "تلاش مجدد",
        timer: 3000,
      });
    }
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>اطلاعات حساب</H>
      </Box>
      <Form variant="primary" onSubmit={(e) => updateProfile(e)}>
        <InputContainer column>
          <Label htmlFor="name">نام:</Label>
          <Input
            title="name"
            type="text"
            id="name"
            value={profile.Name}
            placeholder="نام"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setProfile((val) => ({ ...val, Name: e.target.value }))
            }
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="family">نام خانوادگی:</Label>
          <Input
            title="family"
            type="text"
            id="family"
            value={profile.Family}
            placeholder="نام خانوادگی"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setProfile((val) => ({ ...val, Family: e.target.value }))
            }
          />
        </InputContainer>
        <div className="flex justify-end">
          <Button
            title="بروزرسانی اطلاعات"
            variant="success"
            type="submit"
            StartIcon={GrUpdate}
          >
            بروزرسانی اطلاعات
          </Button>
        </div>
      </Form>
    </>
  );
}
