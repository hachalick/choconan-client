"use client";

import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Form from "@/Components/Ui/Form";
import { Input, InputContainer, Label } from "@/Components/Ui/Input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function LoginPanel() {
  const [stepForm, setStepForm] = useState(1);
  const [nationalCode, setNationalCode] = useState("98");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const onChangePhone = (e: any) => {
    if (e.target.value.length < 11) {
      setPhone(e.target.value);
    }
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onChangeOtp = (e: any) => {
    setOtp(e.target.value);
  };

  const onSubmitFromPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nationalCode.length > 3 || phone.length !== 10 || password.length < 4) {
    } else {
      try {
        const res = await FetchApi.Auth.fetchLoginPassword({
          national_code: nationalCode,
          password,
          phone,
        });
        if (res.login === true) {
          setStepForm(2);
          // res.refresh_token && localStorage.setItem("refresh_token", res.refresh_token);
          // res.access_token && sessionStorage.setItem("access_token", res.access_token);
          // Swal.fire({
          //   title: "ورود با موفقیت انجام شد",
          //   text: "در حال ورود به سایت",
          //   icon: "success",
          //   confirmButtonText: "باشه",
          // });
          // setTimeout(() => {
          //   location.reload();
          // }, 1500);
        } else {
          Swal.fire({
            title: "ورود نکردید!",
            text: "رمز عبور صحیح نیست",
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          });
          // setTimeout(() => {
          //   location.reload();
          // }, 1500);
        }
      } catch (error) {
        Swal.fire({
          title: "ورود نکردید!",
          text: "اطلاعات کاربر ثبت نام نشده است",
          icon: "error",
          confirmButtonText: "گرفتم",
        });
      }
    }
  };

  const onSubmitFromOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length >= 4) {
      try {
        const res = await FetchApi.Auth.fetchLoginOtp({
          national_code: nationalCode,
          phone,
          otp,
        });
        if (res.login === true) {
          localStorage.setItem("refresh_token", res.refresh_token);
          sessionStorage.setItem("access_token", res.access_token);
          Swal.fire({
            title: "ورود با موفقیت انجام شد",
            text: "در حال ورود به سایت",
            icon: "success",
            confirmButtonText: "باشه",
          });
          setTimeout(() => {
            location.reload();
          }, 1500);
        } else {
          Swal.fire({
            title: "ورود نکردید!",
            text: "رمز عبور صحیح نیست",
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          });
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } catch (error) {
        Swal.fire({
          title: "ورود نکردید!",
          text: "کد یکبار مصرف تایید نشد",
          icon: "error",
          confirmButtonText: "گرفتم",
        });
      }
    }
  };

  if (stepForm === 1) {
    return (
      <div className="min-h-[95dvh] flex justify-center items-center">
        <Box variant="guest">
          <div className="flex flex-col w-fit justify-center items-center gap-4">
            <div className="my-2">
              <Link href="/">
                <img
                  width={50}
                  height={50}
                  src="/assets/image/logo/s-logo.svg"
                  alt="logo"
                  className="w-20"
                />
              </Link>
            </div>
            <Form variant="primary" onSubmit={(e) => onSubmitFromPassword(e)}>
              <InputContainer column>
                <Label htmlFor="phone">شماره همراه:</Label>
                <Input
                  title="رمز ورود"
                  type="number"
                  id="phone"
                  value={phone}
                  placeholder="9##  - ###  - ####"
                  maxLength={10}
                  minLength={10}
                  autoFocus
                  autoComplete="off"
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onChange={(e) => onChangePhone(e)}
                  dir="ltr"
                  endText="+98"
                />
              </InputContainer>
              <InputContainer column>
                <Label htmlFor="password">رمز ورود:</Label>
                <Input
                  title="ارسال کد"
                  type="password"
                  id="password"
                  placeholder="# # # # # # # # # # # # # #"
                  minLength={4}
                  value={password}
                  autoComplete="off"
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onChange={(e) => onChangePassword(e)}
                  dir="ltr"
                />
              </InputContainer>
              <br />
              <Button type="submit" title="ارسال کد" variant="success" wFull>
                ارسال کد
              </Button>
            </Form>
          </div>
        </Box>
      </div>
    );
  } else if (stepForm === 2) {
    return (
      <div className="min-h-[95dvh] flex justify-center items-center">
        <Box variant="guest">
          <div className="flex flex-col w-fit justify-center items-center gap-4">
            <div className="my-2">
              <img
                width={50}
                height={50}
                src="/assets/image/logo/s-logo.svg"
                alt="logo"
                className="w-20"
              />
            </div>
            <Form onSubmit={(e) => onSubmitFromOtp(e)} variant="primary">
              <InputContainer column>
                <Label htmlFor="phone">شماره همراه:</Label>
                <Input
                  endText="+98"
                  type="number"
                  id="phone"
                  value={phone}
                  placeholder="9##  - ###  - ####"
                  maxLength={10}
                  minLength={10}
                  autoFocus
                  autoComplete="off"
                  readOnly={true}
                  title="شماره همراه"
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onChange={(e) => onChangePhone(e)}
                  dir="ltr"
                />
              </InputContainer>
              <InputContainer column>
                <Label htmlFor="otp">کد یکبار مصرف:</Label>
                <Input
                  type="number"
                  id="otp"
                  value={otp}
                  placeholder="# # # # # # # # # # # # # # # # #"
                  minLength={4}
                  autoComplete="off"
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onChange={(e) => onChangeOtp(e)}
                  title="کد یکبار مصرف"
                  dir="ltr"
                />
              </InputContainer>
              <br />
              <Button type="submit" title="ورود" variant="success" wFull>
                ورود
              </Button>
              <Button
                type="button"
                onClick={() => setStepForm(1)}
                title="تصحیح شماره همراه"
                variant="warning"
                wFull
              >
                تصحیح شماره همراه
              </Button>
            </Form>
          </div>
        </Box>
      </div>
    );
  }
}

export default LoginPanel;
