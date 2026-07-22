import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadAccountDetailViewModel, ReadUserListViewModel } from "@/Common/Connection/Api/ViewModels/User.Service.ViewModel";
import { CTranslateWorld } from "@/Common/Constants/TranslateWorld.Constant";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { AccountContext } from "@/Contexts/Account.Context";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadUser() {
  const setting = useContext(AccountContext);

  const [listUser, setListUser] = useState<Array<ReadUserListViewModel>>([]);
  const [fetchAgain, setFetchAgain] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const res = await FetchApi.User.ReadUserList({
        AccessToken: access_token,
      });
      setListUser(res);
      setFetchAgain(false);
    };

    if (fetchAgain) fetchData();
  }, [fetchAgain]);

  const onClickDeleteUser = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.User.DeleteUser({ AccessToken: access_token, Id: id });
    setFetchAgain(true);
  };

  const onClickEditUser = (userId: string) => {
    setting?.userAccess.setState(userId);
    setting?.dashboard.setState(EDashboard.CREATE_USER);
    setFetchAgain(true);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>
          لیست کاربر های یافت شده ( {digitsEnToFa(listUser.length)} نتیجه )
        </H>
      </Box>
      <div className="flex flex-col gap-4">
        {listUser.map((value) => (
          <Box variant="secondary" key={value.Id}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="error"
                  title="delete"
                  type="button"
                  StartIcon={RiDeleteBin5Line}
                  onClick={() => onClickDeleteUser(value.Id)}
                />
                <Button
                  variant="warning"
                  title="delete"
                  type="button"
                  StartIcon={FaRegEdit}
                  onClick={() => onClickEditUser(value.Id)}
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span>نام</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.Name ? value.Name : "ثبت نشده"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>نام خانوادگی</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.Family ? value.Family : "ثبت نشده"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>شماره همراه</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span dir="ltr">
                    {value.NationalCode && value.Phone
                      ? `+${value.NationalCode}-${value.Phone}`
                      : "ثبت نشده"}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div>نقش های منتسب شده</div>
                  <ul className="list-disc flex flex-col gap-2">
                    {value.Role.length === 0 ? (
                      <li className="flex flex-wrap justify-between items-center">
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>{" "}
                        <span>موردی ثبت نشده</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      </li>
                    ) : (
                      value.Role.map((val, i) => (
                        <li
                          key={i}
                          className="flex flex-wrap justify-between items-center"
                        >
                          <span>نام نقش</span>
                          <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                          <span>{val}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <div>دسترسی های منتسب شده</div>
                  <ul className="list-disc flex flex-col gap-2">
                    {value.Access.length === 0 ? (
                      <li className="flex flex-wrap justify-between items-center">
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>{" "}
                        <span>موردی ثبت نشده</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      </li>
                    ) : (
                      value.Access.map((val, i) => (
                        <li
                          key={i}
                          className="flex flex-wrap justify-between items-center"
                        >
                          <span>نام دسترسی</span>
                          <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                          <span>
                            {
                              CTranslateWorld[
                                val as keyof typeof CTranslateWorld
                              ]
                            }{" "}
                            {val}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
