import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Form from "@/Components/Ui/Form";
import { H } from "@/Components/Ui/H";
import { Input, InputContainer, Label } from "@/Components/Ui/Input";
import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

export default function Password() {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.old_password.length < 4 || password.new_password.length < 4) {
      Swal.fire({
        title: "رمز تغییر نکرد",
        text: "رمز عبور کمتر از 4 کارکتر است",
        icon: "warning",
        confirmButtonText: "تلاش مجدد",
      });
    } else {
      const access_token = sessionStorage.getItem("access_token") || "";
      try {
        const res = await FetchApi.Auth.fetchUpdatePassword({
          access_token,
          new_password: password.new_password,
          old_password: password.old_password,
        });
        if (res.update) {
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
            id="last_password"
            value={password.old_password}
            placeholder="رمز عبور فعلی"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setPassword((val) => ({ ...val, old_password: e.target.value }))
            }
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="new_password">رمز عبور جدید:</Label>
          <Input
            title="رمز عبور جدید"
            type="password"
            id="new_password"
            value={password.new_password}
            placeholder="رمز عبور جدید"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onChange={(e) =>
              setPassword((val) => ({ ...val, new_password: e.target.value }))
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
