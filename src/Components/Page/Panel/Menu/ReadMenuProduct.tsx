import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { ERoute } from "@/Common/Enums/Routs";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { InputContainer, Label } from "@/Components/Ui/Input";
import { Option, Select } from "@/Components/Ui/Select";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadMenuProduct() {
  const setting = useContext(AccountContext);

  const [getList, setGetList] = useState(true);
  const [menu, setMenu] = useState<TIdCategoriesMenu>([]);
  const [stateCategory, setStateCategory] = useState("همه");

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

  const onChangeSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateCategory(e.target.value);
  };

  const onClickEditProduct = (product_id: string) => {
    setGetList(true);
    setting?.productMenu.setState(product_id);
    setting?.dashboard.setState(EDashboard.CREATE_MENU_PRODUCT);
  };

  const onClickDeleteProduct = async (product_id: string) => {
    await FetchApi.Menu.fetchDeleteProductMenu({
      access_token: sessionStorage.getItem("access_token") || "",
      product_id,
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
                  <Option value={val.category} key={i}>
                    {val.category}
                  </Option>
                ))}
              </Select>
            </InputContainer>
          </div>
        </Box>
        {menu.map((val, i) =>
          val.products.map((product, index) => {
            if (val.category === stateCategory || stateCategory === "همه") {
              return (
                <Box variant="secondary" key={`${product.name}-${i}-${index}`}>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex gap-4 flex-col">
                      <div className="flex gap-4">
                        {setting?.profile.access.includes(
                          EDashboardCapability.DELETE_MENU_PRODUCT
                        ) && (
                          <Button
                            variant="error"
                            title="delete"
                            type="button"
                            StartIcon={RiDeleteBin5Line}
                            onClick={() =>
                              onClickDeleteProduct(product.product_id)
                            }
                          />
                        )}
                        {setting?.profile.access.includes(
                          EDashboardCapability.UPDATE_MENU_PRODUCT
                        ) && (
                          <Button
                            variant="warning"
                            title="update"
                            type="button"
                            StartIcon={FaRegEdit}
                            onClick={() =>
                              onClickEditProduct(product.product_id)
                            }
                          />
                        )}
                      </div>
                      <div>
                        <img
                          src={`${ERoute.HOST}/${product.src}`}
                          alt={product.name}
                          className="w-24 h-24 object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 grow">
                      <div className="flex justify-between items-center">
                        <span>نام محصول</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>متا تایتل محصول</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.meta_title}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>مدت انتظار</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.waiting} دقیقه</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>موجود</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.available ? "است" : "نیست"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>لینک اسنپ</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{!!product.snap ? "است" : "نیست"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>لینک تپسی</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{!!product.tapsi ? "است" : "نیست"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>قیمت</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.price} هزار تومان</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>توضیحات</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.description}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>متا توضیحات</span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>{product.meta_description}</span>
                      </div>
                    </div>
                  </div>
                </Box>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    </>
  );
}
