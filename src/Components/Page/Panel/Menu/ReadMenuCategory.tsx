import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { ERoute } from "@/Common/Enums/Routs";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadMenuCategory() {
  const setting = useContext(AccountContext);

  const [menu, setMenu] = useState<TIdCategoriesMenu>([]);
  const [getList, setGetList] = useState(true);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        const allProduct = await FetchApi.Menu.fetchAllProductMenu();
        setMenu(allProduct);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  const onClickDeleteCategory = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Menu.fetchDeleteCategoryMenu({
      access_token,
      category_id: id,
    });
    setGetList(true);
    setting?.categoryMenu.setState("");
  };

  const onClickEditCategory = (category_product_id: string) => {
    const filter = menu.find(
      (val) => val.category_product_id === category_product_id
    );
    setGetList(true);
    setting?.categoryMenu.setState(filter?.category || "");
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
                {setting?.profile.access.includes(
                  EDashboardCapability.DELETE_MENU_CATEGORY
                ) && (
                  <Button
                    variant="error"
                    title="delete"
                    type="button"
                    StartIcon={RiDeleteBin5Line}
                    onClick={() =>
                      onClickDeleteCategory(val.category_product_id)
                    }
                  />
                )}
                {setting?.profile.access.includes(
                  EDashboardCapability.UPDATE_MENU_CATEGORY
                ) && (
                  <Button
                    variant="warning"
                    title="delete"
                    type="button"
                    StartIcon={FaRegEdit}
                    onClick={() => onClickEditCategory(val.category_product_id)}
                  />
                )}
              </div>
              <div className="flex items-center gap-4 my-auto">
                <img
                  src={`${ERoute.HOST}/${val.icon}`}
                  alt={val.category}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
                <span>{val.category}</span>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
