import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { CTranslateWorld } from "@/Common/Constants/TranslateWorld.Constant";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { AccountContext } from "@/Contexts/Account.Context";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadUser() {
  const setting = useContext(AccountContext);

  const [listUser, setListUser] = useState<TAllUserAccessId>([]);
  const [fetchAgain, setFetchAgain] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const res = await FetchApi.User.fetchGetUser({ access_token });
      setListUser(res);
      setFetchAgain(false);
    };
    if (fetchAgain) fetchData();
  }, [fetchAgain]);

  const onClickDeleteUser = async (user_id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.User.fetchDeleteUser({ access_token, user_id });
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
          <Box variant="secondary" key={value.user_id}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="error"
                  title="delete"
                  type="button"
                  StartIcon={RiDeleteBin5Line}
                  onClick={() => onClickDeleteUser(value.user_id)}
                />
                <Button
                  variant="warning"
                  title="delete"
                  type="button"
                  StartIcon={FaRegEdit}
                  onClick={() => onClickEditUser(value.user_id)}
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span>نام</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.name ? value.name : "ثبت نشده"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>نام خانوادگی</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.family ? value.family : "ثبت نشده"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>شماره همراه</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span dir="ltr">
                    {value.national_code && value.phone
                      ? `+${value.national_code}-${value.phone}`
                      : "ثبت نشده"}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div>نقش های منتسب شده</div>
                  <ul className="list-disc flex flex-col gap-2">
                    {value.role.length === 0 ? (
                      <li className="flex flex-wrap justify-between items-center">
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>{" "}
                        <span>موردی ثبت نشده</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      </li>
                    ) : (
                      value.role.map((val, i) => (
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
                    {value.access.length === 0 ? (
                      <li className="flex flex-wrap justify-between items-center">
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>{" "}
                        <span>موردی ثبت نشده</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      </li>
                    ) : (
                      value.access.map((val, i) => (
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
                            }
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
