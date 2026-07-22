import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { InputContainer, Label } from "@/Components/Element/Input";
import { Option, Select } from "@/Components/Element/Select";
import { AccountContext } from "@/Contexts/Account.Context";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadMenuProduct() {
  const setting = useContext(AccountContext);

  const [getList, setGetList] = useState(true);
  const [menu, setMenu] = useState<Array<ReadMenuDetailViewModel>>([]);
  const [stateCategory, setStateCategory] = useState("همه");

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

  const onChangeSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateCategory(e.target.value);
  };

  const onClickEditProduct = (Id: string) => {
    setGetList(true);
    setting?.productMenu.setState(Id);
    setting?.dashboard.setState(EDashboard.CREATE_MENU_PRODUCT);
  };

  const onClickDeleteProduct = async (Id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Menu.DeleteMenuProduct({
      AccessToken: access_token,
      Id,
    });

    setGetList(true);
    setting?.productMenu.setState("");
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>محصولات</H>
      </Box>
      <div className="flex flex-col gap-4">
        <Box variant="primary">
          <div className="flex flex-col gap-4">
            <InputContainer>
              <Label htmlFor="category">دسته بندی</Label>
              <Select
                name="category"
                title="category"
                id="category"
                onChange={(e) => onChangeSelectCategory(e)}
                grow
                value={stateCategory}
              >
                <Option value="همه">همه</Option>
                {menu.map((val, i) => (
                  <Option value={val.Id} key={i}>
                    {val.Name}
                  </Option>
                ))}
              </Select>
            </InputContainer>
          </div>
        </Box>
        {menu
          .filter((val) => val.Id === stateCategory || "همه" === stateCategory)
          .map((val, i) =>
            val.Products.map((product, index) => (
              <Box variant="secondary" key={`${product.Name}-${i}-${index}`}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex gap-4 flex-col">
                    <div className="flex gap-4">
                      {setting?.profile.Access.includes(
                        EDashboardCapability.DELETE_MENU_PRODUCT,
                      ) && (
                        <Button
                          variant="error"
                          title="delete"
                          type="button"
                          StartIcon={RiDeleteBin5Line}
                          onClick={() => onClickDeleteProduct(product.Id)}
                        />
                      )}
                      {setting?.profile.Access.includes(
                        EDashboardCapability.UPDATE_MENU_PRODUCT,
                      ) && (
                        <Button
                          variant="warning"
                          title="update"
                          type="button"
                          StartIcon={FaRegEdit}
                          onClick={() => onClickEditProduct(product.Id)}
                        />
                      )}
                    </div>
                    <div>
                      <img
                        src={`${EServerRoute.HOST}${product.SrcImage}`}
                        alt={product.Name}
                        className="w-24 h-24 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 grow">
                    <div className="flex justify-between items-center">
                      <span>نام محصول</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>{product.Name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>مدت انتظار</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {digitsEnToFa(addCommas(product.Waiting))} دقیقه
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>موجود</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>{product.IsShowMenu ? "است" : "نیست"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>لینک اسنپ</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>{!!product.SnapId ? "است" : "نیست"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>لینک تپسی</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>{!!product.TapsiId ? "است" : "نیست"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>قیمت</span>
                      <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                      <span>
                        {digitsEnToFa(addCommas(product.Price))} تومان
                      </span>
                    </div>
                  </div>
                </div>
              </Box>
            )),
          )}
      </div>
    </>
  );
}
