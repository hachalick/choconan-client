import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { AccountContext } from "@/Contexts/Account.Context";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadRole() {
  const setting = useContext(AccountContext);

  const [listRole, setListRole] = useState<TAllRoleAccessId>([]);
  const [fetchAgain, setFetchAgain] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const res = await FetchApi.User.fetchGetRole({ access_token });
      setListRole(res);
      setFetchAgain(false);
    };
    if (fetchAgain) fetchData();
  }, [fetchAgain]);

  const onClickDeleteRole = async (role_id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.User.fetchDeleteRole({ access_token, role_id });
    setFetchAgain(true);
  };
  
  const onClickEditRole = (roleId: string) => {
    setting?.roleAccess.setState(roleId);
    setting?.dashboard.setState(EDashboard.CREATE_ROLE);
    setFetchAgain(true);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>
          لیست نقش های یافت شده ( {digitsEnToFa(listRole.length)} نتیجه )
        </H>
      </Box>
      <div className="flex flex-col gap-4">
        {listRole.map((val) => (
          <Box variant="secondary" key={val.role_id}>
            <div className="flex flex-wrap gap-4">
              <div className="my-auto flex gap-4">
                <Button
                  variant="error"
                  title="delete"
                  type="button"
                  StartIcon={RiDeleteBin5Line}
                  onClick={() => onClickDeleteRole(val.role_id)}
                />
                <Button
                  variant="warning"
                  title="delete"
                  type="button"
                  StartIcon={FaRegEdit}
                  onClick={() => onClickEditRole(val.role_id)}
                />
              </div>
              <div className="flex items-center gap-4 my-auto">
                <span>{val.role_name}</span>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
