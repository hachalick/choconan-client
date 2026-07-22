import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadMenuCategory() {
  const setting = useContext(AccountContext);

  const [menu, setMenu] = useState<Array<ReadMenuDetailViewModel>>([]);
  const [getList, setGetList] = useState(true);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        const res = await FetchApi.Menu.ReadMenuDetail({});

        setMenu(res);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  const onClickDeleteCategory = async (Id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Menu.DeleteMenuCategory({
      AccessToken: access_token,
      Id,
    });

    setGetList(true);
    setting?.categoryMenu.setState("");
  };

  const onClickEditCategory = (Id: string) => {
    const filter = menu.find((val) => val.Id === Id);

    setGetList(true);

    setting?.categoryMenu.setState(filter?.Id || "");
    setting?.dashboard.setState(EDashboard.CREATE_MENU_CATEGORY);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>دسته بندی ها</H>
      </Box>
      <div className="flex flex-col gap-4">
        {menu.map((val, i) => (
          <Box variant="secondary" key={i}>
            <div className="flex flex-wrap gap-4">
              <div className="my-auto flex gap-4">
                {setting?.profile.Access.includes(
                  EDashboardCapability.DELETE_MENU_CATEGORY,
                ) && (
                  <Button
                    variant="error"
                    title="delete"
                    type="button"
                    StartIcon={RiDeleteBin5Line}
                    onClick={() => onClickDeleteCategory(val.Id)}
                  />
                )}
                {setting?.profile.Access.includes(
                  EDashboardCapability.UPDATE_MENU_CATEGORY,
                ) && (
                  <Button
                    variant="warning"
                    title="delete"
                    type="button"
                    StartIcon={FaRegEdit}
                    onClick={() => onClickEditCategory(val.Id)}
                  />
                )}
              </div>
              <div className="flex items-center gap-4 my-auto">
                <img
                  src={`${EServerRoute.HOST}${val.Icon}`}
                  alt={val.Name}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
                <span>{val.Name}</span>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
