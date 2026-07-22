import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import Form from "@/Components/Element/Form";
import { H } from "@/Components/Element/H";
import { Input, InputContainer, Label } from "@/Components/Element/Input";
import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

export default function Password() {
  const [password, setPassword] = useState({
    Password: "",
  });

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      const res = await FetchApi.Auth.UpdatePasswordUser({
        AccessToken: access_token,
        Password: password.Password,
      });

      if (res.Update) {
        Swal.fire({
          title: "رمز تغییر کرد",
          text: "رمز عبور با موفقیت تغییر کرد",
          icon: "success",
          confirmButtonText: "تلاش مجدد",
        });
        setTimeout(() => {
          sessionStorage.clear();
          localStorage.clear();
          location.reload();
        }, 1500);
      } else {
        Swal.fire({
          title: "رمز تغییر نکرد",
          text: "مشکلی در تغییر رمز بوجود آمد",
          icon: "warning",
          confirmButtonText: "تلاش مجدد",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "رمز تغییر نکرد",
        text: error?.message || "مشکلی در تغییر رمز بوجود آمد",
        icon: "warning",
        confirmButtonText: "تلاش مجدد",
      });
    }
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>تغییر رمز</H>
      </Box>
      <Form variant="primary" onSubmit={(e) => updatePassword(e)}>
        <InputContainer column>
          <Label>رمز عبور فعلی:</Label>
          <Input
            title="رمز عبور فعلی"
            type="password"
            id="Password"
            value={password.Password}
            placeholder="رمز عبور فعلی"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setPassword((val) => ({ ...val, Password: e.target.value }))
            }
          />
        </InputContainer>
        <div className="flex justify-end">
          <Button
            type="submit"
            title="بروزرسانی رمز"
            variant="success"
            StartIcon={GrUpdate}
          >
            بروزرسانی رمز
          </Button>
        </div>
      </Form>
    </>
  );
}
