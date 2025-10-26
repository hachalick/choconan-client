import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Form from "@/Components/Ui/Form";
import { H } from "@/Components/Ui/H";
import { Input, InputContainer, Label } from "@/Components/Ui/Input";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

export default function Profile() {
  const setting = useContext(AccountContext);
  const [profile, setProfile] = useState<TProfile>(
    setting?.profile || {
      name: "",
      family: "",
      profile: "",
      access: [],
      role: [],
    }
  );

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      if (access_token) {
        const res = await FetchApi.User.fetchUpdateProfile({
          access_token,
          family: profile.family,
          name: profile.name,
        });
        if (res.update) {
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
            value={profile.name}
            placeholder="نام"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setProfile((val) => ({ ...val, name: e.target.value }))
            }
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="family">نام خانوادگی:</Label>
          <Input
            title="family"
            type="text"
            id="family"
            value={profile.family}
            placeholder="نام خانوادگی"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setProfile((val) => ({ ...val, family: e.target.value }))
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
