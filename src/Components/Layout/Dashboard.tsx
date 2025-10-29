"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ERoute } from "@/Common/Enums/Routs";
import { Button } from "@/Components/Ui/Button";
import Box from "../Ui/Box";
import { AccountContext } from "@/Contexts/Account.Context";
import { H } from "../Ui/H";
import { IconType } from "react-icons";
import {
  MdArrowDropDown,
  MdArrowLeft,
  MdOutlineAccountCircle,
  MdOutlinePassword,
  MdOutlineRestaurantMenu,
  MdWifiTethering,
  MdWifiTetheringOff,
} from "react-icons/md";
import { FiBox, FiDatabase } from "react-icons/fi";
import { LuImage, LuImagePlus, LuImages } from "react-icons/lu";
import {
  TbCategory,
  TbCategoryPlus,
  TbHexagonPlus,
  TbHexagons,
  TbLocation,
  TbLocationPlus,
  TbLocationSearch,
  TbShoppingBag,
  TbShoppingBagEdit,
  TbShoppingBagPlus,
  TbShoppingBagSearch,
} from "react-icons/tb";
import {
  BsBoxArrowInDown,
  BsBoxArrowInUp,
  BsBoxes,
  BsBoxSeam,
  BsShop,
} from "react-icons/bs";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { PiCoins } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Profile from "../Page/Panel/Account/Profile";
import Default from "../Page/Panel/Index/Default";
import Password from "../Page/Panel/Account/Password";
import CreateImage from "../Page/Panel/Picture/CreateImage";
import ReadImage from "../Page/Panel/Picture/ReadImage";
import CreateMenuCategory from "../Page/Panel/Menu/CreateMenuCategory";
import ReadMenuCategory from "../Page/Panel/Menu/ReadMenuCategory";
import ReadFactor from "../Page/Panel/Order/ReadFactor";
import CreateMenuProduct from "../Page/Panel/Menu/CreateMenuProduct";
import ReadMenuProduct from "../Page/Panel/Menu/ReadMenuProduct";
import CreateFactor from "../Page/Panel/Order/CreateFactor";
import CreateOrderLocation from "../Page/Panel/Location/CreateOrderLocation";
import ReadOrderLocation from "../Page/Panel/Location/ReadOrderLocation";
import CreateAccountingExit from "../Page/Panel/Accounting/CreateAccountingExit";
import CreateAccountingEnter from "../Page/Panel/Accounting/CreateAccountingEnter";
import ReadAccountingEnter from "../Page/Panel/Accounting/ReadAccountingEnter";
import ReadAccountingExit from "../Page/Panel/Accounting/ReadAccountingExit";
import CreateWarehouseEnter from "../Page/Panel/Warehouse/CreateWarehouseEnter";
import CreateWarehouseExit from "../Page/Panel/Warehouse/CreateWarehouseExit";
import ReadWarehouseEnter from "../Page/Panel/Warehouse/ReadWarehouseEnter";
import ReadWarehouseExit from "../Page/Panel/Warehouse/ReadWarehouseExit";
import CreateEconomicPackage from "../Page/Panel/EconomicPackage/CreateEconomicPackage";
import ReadEconomicPage from "../Page/Panel/EconomicPackage/ReadEconomicPage";
import CreateBlog from "../Page/Panel/Blog/CreateBlog";
import ReadBlog from "../Page/Panel/Blog/ReadBlog";
import CreateOrder from "../Page/Panel/Order/CreateOrder";
import ReadOrder from "../Page/Panel/Order/ReadOrder";
import OnlineSnap from "../Page/Panel/OnlineShop/OnlineSnap";
import OnlineTapsi from "../Page/Panel/OnlineShop/OnlineTapsi";
import { RiHome6Line, RiShutDownLine } from "react-icons/ri";
import Link from "next/link";
import { BiSupport } from "react-icons/bi";
import ReadRole from "../Page/Panel/Support/ReadRole";
import ReadUser from "../Page/Panel/Support/ReadUser";
import CreateUser from "../Page/Panel/Support/CreateUser";
import CreateRole from "../Page/Panel/Support/CreateRole";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

type TMenu = {
  title: string;
  state?: EDashboard;
  isActive?: boolean;
  Icon?: IconType;
  isOpen: boolean;
  li?: TMenu[];
};

export default function Dashboard() {
  const setting = useContext(AccountContext);

  useEffect(() => {
    const socket = io(ERoute.HOST);
    const audio = new Audio("/assets/sound/notification-sound.wav");

    const allowAudioPlay = () => {
      audio.play().catch(() => {}); // اجرای بی‌صدا برای گرفتن مجوز
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", allowAudioPlay);
    };
    document.addEventListener("click", allowAudioPlay);

    const handleRefetch = () => {
      if (setting?.profile.access.includes(EDashboardCapability.READ_ORDER)) {
        setting?.orders.setState(true);

        audio.play().catch((err) => console.warn("cannot play sound:", err));

        Swal.fire({
          title: "سفارش جدید ثبت شده!",
          text: "یک سفارش جدید توسط مشتری حضوری ثبت شده",
          icon: "question",
          confirmButtonText: "چی خواست ؟!",
          showDenyButton: true,
          denyButtonText: "ولش کن",
        }).then((val) => {
          if (val.isConfirmed) {
            setting?.dashboard.setState(EDashboard.READ_ORDER);
          }
        });
      }
    };

    socket.on("connect", () => {
      setting?.connectServerSocketIo.setState(true);
    });

    socket.on("disconnect", () => {
      setting?.connectServerSocketIo.setState(false);
    });

    socket.on("order-present", (data: { code: number; message: string }) => {
      if (data.code === 1) handleRefetch();
    });

    window.addEventListener("online", handleRefetch);

    return () => {
      socket.disconnect();
      window.removeEventListener("online", handleRefetch);
      document.removeEventListener("click", allowAudioPlay);
    };
  }, [setting]);

  const menuUl: TMenu[] = [
    {
      title: "پشتیبانی",
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(EDashboardCapability.READ_USER) ||
        setting?.profile.access.includes(EDashboardCapability.CREATE_USER) ||
        setting?.profile.access.includes(EDashboardCapability.READ_ROLE) ||
        setting?.profile.access.includes(EDashboardCapability.CREATE_ROLE),
      Icon: BiSupport,
      isOpen: false,
      li: [
        {
          title: "لیست کاربران",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.READ_USER),
          state: EDashboard.READ_USER,
          isOpen: false,
        },
        {
          title: "ایجاد کاربر",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.CREATE_USER),
          state: EDashboard.CREATE_USER,
          isOpen: false,
        },
        {
          title: "لیست نقش ها",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.READ_ROLE),
          state: EDashboard.READ_ROLE,
          isOpen: false,
        },
        {
          title: "ایجاد نقش",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.CREATE_ROLE),
          state: EDashboard.CREATE_ROLE,
          isOpen: false,
        },
      ],
    },
    {
      title: "تنظیمات",
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.role.includes("پشتیبان"),
      Icon: IoSettingsOutline,
      isOpen: false,
    },
    {
      title: "اطلاعات حساب",
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(EDashboardCapability.EDIT_PROFILE) ||
        setting?.profile.access.includes(EDashboardCapability.EDIT_PASSWORD),
      Icon: MdOutlineAccountCircle,
      isOpen: false,
      li: [
        {
          title: "ویرایش اطلاعات",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.EDIT_PROFILE),
          state: EDashboard.PROFILE,
          isOpen: false,
        },
        {
          title: "تغییر رمز",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.EDIT_PASSWORD
            ),
          Icon: MdOutlinePassword,
          state: EDashboard.PASSWORD,
          isOpen: false,
        },
      ],
    },
    {
      title: "عکس",
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(EDashboardCapability.CREATE_IMAGE) ||
        setting?.profile.access.includes(EDashboardCapability.READ_IMAGE),
      Icon: LuImage,
      isOpen: false,

      li: [
        {
          title: "آپلود عکس",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.CREATE_IMAGE),
          Icon: LuImagePlus,
          state: EDashboard.CREATE_IMAGE,
          isOpen: false,
        },
        {
          title: "مشاهده عکس ها",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.READ_IMAGE),
          Icon: LuImages,
          state: EDashboard.READ_IMAGE,
          isOpen: false,
        },
      ],
    },
    {
      title: "سفارشات",
      Icon: TbShoppingBag,
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(EDashboardCapability.READ_ORDER) ||
        setting?.profile.access.includes(EDashboardCapability.CREATE_FACTOR) ||
        setting?.profile.access.includes(EDashboardCapability.READ_FACTOR),
      isOpen: false,

      li: [
        {
          title: "سفارش مشتریان",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.READ_ORDER),
          Icon: TbShoppingBagEdit,
          state: EDashboard.READ_ORDER,
          isOpen: false,
        },
        {
          title: "ثبت سفارش",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_FACTOR
            ),
          Icon: TbShoppingBagPlus,
          state: EDashboard.CREATE_FACTOR,
          isOpen: false,
        },
        {
          title: "سفارشات اخیر",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.READ_FACTOR),
          state: EDashboard.READ_FACTOR,
          Icon: TbShoppingBagSearch,
          isOpen: false,
        },
      ],
    },
    {
      title: "منو",
      Icon: MdOutlineRestaurantMenu,
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_MENU_CATEGORY
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_MENU_CATEGORY
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_MENU_PRODUCT
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_MENU_PRODUCT
        ),
      isOpen: false,

      li: [
        {
          title: "مشاهده دسته ها",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_MENU_CATEGORY
            ),
          Icon: TbCategory,
          state: EDashboard.READ_MENU_CATEGORY,
          isOpen: false,
        },
        {
          title: "ثبت دسته بندی",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_MENU_CATEGORY
            ),
          Icon: TbCategoryPlus,
          state: EDashboard.CREATE_MENU_CATEGORY,
          isOpen: false,
        },
        {
          title: "مشاهده محصولات",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_MENU_PRODUCT
            ),
          Icon: TbHexagons,
          state: EDashboard.READ_MENU_PRODUCT,
          isOpen: false,
        },
        {
          title: "ثبت محصول",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_MENU_PRODUCT
            ),
          Icon: TbHexagonPlus,
          state: EDashboard.CREATE_MENU_PRODUCT,
          isOpen: false,
        },
      ],
    },
    {
      title: "بلاگ",
      Icon: HiOutlineDocumentText,
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(EDashboardCapability.READ_BLOG) ||
        setting?.profile.access.includes(EDashboardCapability.CREATE_BLOG),
      isOpen: false,

      li: [
        {
          title: "مشاهده بلاگ ها",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.READ_BLOG),
          Icon: HiOutlineDocumentPlus,
          isOpen: false,
        },
        {
          title: "ثبت بلاگ",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(EDashboardCapability.CREATE_BLOG),
          Icon: HiOutlineDocumentDuplicate,
          isOpen: false,
        },
      ],
    },
    {
      title: "محل سفارش گیری",
      Icon: TbLocation,
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_ORDER_LOCATION
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_ORDER_LOCATION
        ),
      isOpen: false,

      li: [
        {
          title: "مشاهده محل ها",
          Icon: TbLocationSearch,
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_ORDER_LOCATION
            ),
          state: EDashboard.READ_ORDER_LOCATION,
          isOpen: false,
        },
        {
          title: "ثبت محل",
          Icon: TbLocationPlus,
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_ORDER_LOCATION
            ),
          state: EDashboard.CREATE_ORDER_LOCATION,
          isOpen: false,
        },
      ],
    },
    {
      title: "حسابداری",
      Icon: PiCoins,
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_ACCOUNTING_ENTER
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_ACCOUNTING_ENTER
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_ACCOUNTING_EXIT
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_ACCOUNTING_EXIT
        ),
      isOpen: false,

      li: [
        {
          title: "ثبت فرم ورود",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_ACCOUNTING_ENTER
            ),
          Icon: BsBoxArrowInDown,
          state: EDashboard.CREATE_ACCOUNTING_ENTER,
          isOpen: false,
        },
        {
          title: "فرم ورود اخیر",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_ACCOUNTING_ENTER
            ),
          Icon: BsBoxArrowInDown,
          state: EDashboard.READ_ACCOUNTING_ENTER,
          isOpen: false,
        },
        {
          title: "ثبت فرم خروج",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_ACCOUNTING_EXIT
            ),
          Icon: BsBoxArrowInUp,
          state: EDashboard.CREATE_ACCOUNTING_EXIT,
          isOpen: false,
        },
        {
          title: "فرم خروج اخیر",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_ACCOUNTING_EXIT
            ),
          Icon: BsBoxArrowInUp,
          state: EDashboard.READ_ACCOUNTING_EXIT,
          isOpen: false,
        },
      ],
    },
    {
      title: "انبارداری",
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_WAREHOUSE_ENTER
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_WAREHOUSE_ENTER
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_WAREHOUSE_EXIT
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_WAREHOUSE_EXIT
        ),
      isOpen: false,

      Icon: FiDatabase,
      li: [
        {
          title: "ثبت فرم ورود",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_WAREHOUSE_ENTER
            ),
          Icon: BsBoxArrowInDown,
          state: EDashboard.CREATE_WAREHOUSE_ENTER,
          isOpen: false,
        },
        {
          title: "فرم ورود اخیر",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_WAREHOUSE_ENTER
            ),
          Icon: BsBoxArrowInDown,
          state: EDashboard.READ_WAREHOUSE_ENTER,
          isOpen: false,
        },
        {
          title: "ثبت فرم خروج",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_WAREHOUSE_EXIT
            ),
          Icon: BsBoxArrowInUp,
          state: EDashboard.CREATE_WAREHOUSE_EXIT,
          isOpen: false,
        },
        {
          title: "فرم خروج اخیر",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_WAREHOUSE_EXIT
            ),
          Icon: BsBoxArrowInUp,
          state: EDashboard.READ_WAREHOUSE_EXIT,
          isOpen: false,
        },
      ],
    },
    {
      title: "آنلاین شاپ",
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_ALL_ONLINE_SHOP
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_SNAP_ONLINE_SHOP
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_TAPSI_ONLINE_SHOP
        ),
      isOpen: false,
      Icon: BsShop,
      li: [
        {
          title: "اسنپ",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_SNAP_ONLINE_SHOP
            ),
          state: EDashboard.READ_SNAP_ONLINE_SHOP,
          isOpen: false,
        },
        {
          title: "تپسی",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_TAPSI_ONLINE_SHOP
            ),
          state: EDashboard.READ_TAPSI_ONLINE_SHOP,
          isOpen: false,
        },
      ],
    },
    {
      title: "پک اقتصادی",
      Icon: BsBoxSeam,
      isActive:
        setting?.profile.role.includes("پشتیبان") ||
        setting?.profile.access.includes(
          EDashboardCapability.CREATE_ECONOMIC_PACKAGE
        ) ||
        setting?.profile.access.includes(
          EDashboardCapability.READ_ECONOMIC_PACKAGE
        ),
      isOpen: false,

      li: [
        {
          title: "ثبت پک",
          state: EDashboard.CREATE_ECONOMIC_PACKAGE,
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.CREATE_ECONOMIC_PACKAGE
            ),
          Icon: FiBox,
          isOpen: false,
        },
        {
          title: "مشاهده پک ها",
          isActive:
            setting?.profile.role.includes("پشتیبان") ||
            setting?.profile.access.includes(
              EDashboardCapability.READ_ECONOMIC_PACKAGE
            ),
          Icon: BsBoxes,
          state: EDashboard.READ_ECONOMIC_PACKAGE,
          isOpen: false,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 gap-x-4 px-2 h-full">
      <audio src="/assets/sound/notification-sound.wav" />

      <aside className="basis-72 shrink-0 grow md:grow-0 md:sticky top-3 h-[40dvh] md:h-[calc(100dvh-2rem)] overflow-auto">
        <Box variant="guest">
          <div className="flex flex-col gap-4">
            <Box variant="primary">
              <div className="flex flex-col gap-2 relative">
                <button
                  title="exit"
                  className="cursor-pointer absolute left-0 p-1 rounded-full text-error-68 bg-error-12"
                  onClick={() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    location.reload();
                  }}
                >
                  <RiShutDownLine />
                </button>
                <button
                  title="exit"
                  className={`cursor-pointer absolute left-0 top-8 p-1 rounded-full ${
                    setting?.connectServerSocketIo.setState
                      ? "text-success-68 bg-success-12"
                      : "text-warning-68 bg-warning-12"
                  }`}
                >
                  {setting?.connectServerSocketIo.setState ? (
                    <MdWifiTethering />
                  ) : (
                    <MdWifiTetheringOff />
                  )}
                </button>
                <Link
                  href="/"
                  title="home"
                  className="cursor-pointer absolute right-0 p-1 rounded-full text-secondary-68 bg-secondary-12"
                >
                  <RiHome6Line />
                </Link>
                <button
                  type="button"
                  title="a"
                  className="w-fit mx-auto"
                  onClick={() =>
                    setting?.dashboard.setState(EDashboard.DEFAULT)
                  }
                >
                  <img
                    src={ERoute.HOST + setting?.profile.profile}
                    alt={setting?.profile.name}
                    width={50}
                    height={50}
                    className="mx-auto rounded-full w-16"
                  />
                </button>
                <span className="text-center gap-4 flex flex-col justify-center items-center">
                  <H size={4}>
                    سلام{" "}
                    {setting?.profile.name || setting?.profile.family ? (
                      <>
                        {setting?.profile.name} {setting?.profile.family}
                      </>
                    ) : (
                      "شوکونانی"
                    )}{" "}
                    عزیز !
                  </H>
                </span>
              </div>
            </Box>
            {setting?.dashboard.setState && (
              <UlMenu
                content={menuUl}
                deep={1}
                setState={setting?.dashboard.setState}
              />
            )}
          </div>
        </Box>
      </aside>
      <article className="grow">
        <Box variant="guest" hFull>
          <div className="flex flex-col gap-4">
            <Container state={setting?.dashboard.state || EDashboard.DEFAULT} />
          </div>
        </Box>
      </article>
    </div>
  );
}

function Container({ state }: { state: number }) {
  switch (state) {
    case EDashboard.DEFAULT:
      return <Default />;
    case EDashboard.PROFILE:
      return <Profile />;
    case EDashboard.PASSWORD:
      return <Password />;
    case EDashboard.CREATE_IMAGE:
      return <CreateImage />;
    case EDashboard.READ_IMAGE:
      return <ReadImage />;
    case EDashboard.CREATE_MENU_CATEGORY:
      return <CreateMenuCategory />;
    case EDashboard.READ_MENU_CATEGORY:
      return <ReadMenuCategory />;
    case EDashboard.CREATE_MENU_PRODUCT:
      return <CreateMenuProduct />;
    case EDashboard.READ_MENU_PRODUCT:
      return <ReadMenuProduct />;
    case EDashboard.CREATE_ORDER_LOCATION:
      return <CreateOrderLocation />;
    case EDashboard.READ_ORDER_LOCATION:
      return <ReadOrderLocation />;
    case EDashboard.CREATE_ACCOUNTING_ENTER:
      return <CreateAccountingEnter />;
    case EDashboard.READ_ACCOUNTING_ENTER:
      return <ReadAccountingEnter />;
    case EDashboard.CREATE_ACCOUNTING_EXIT:
      return <CreateAccountingExit />;
    case EDashboard.READ_ACCOUNTING_EXIT:
      return <ReadAccountingExit />;
    case EDashboard.CREATE_WAREHOUSE_ENTER:
      return <CreateWarehouseEnter />;
    case EDashboard.READ_WAREHOUSE_ENTER:
      return <ReadWarehouseEnter />;
    case EDashboard.CREATE_WAREHOUSE_EXIT:
      return <CreateWarehouseExit />;
    case EDashboard.READ_WAREHOUSE_EXIT:
      return <ReadWarehouseExit />;
    case EDashboard.CREATE_ECONOMIC_PACKAGE:
      return <CreateEconomicPackage />;
    case EDashboard.READ_ECONOMIC_PACKAGE:
      return <ReadEconomicPage />;
    case EDashboard.CREATE_BLOG:
      return <CreateBlog />;
    case EDashboard.READ_BLOG:
      return <ReadBlog />;
    case EDashboard.CREATE_ORDER:
      return <CreateOrder />;
    case EDashboard.READ_ORDER:
      return <ReadOrder />;
    case EDashboard.CREATE_FACTOR:
      return <CreateFactor />;
    case EDashboard.READ_FACTOR:
      return <ReadFactor />;
    case EDashboard.READ_SNAP_ONLINE_SHOP:
      return <OnlineSnap />;
    case EDashboard.READ_TAPSI_ONLINE_SHOP:
      return <OnlineTapsi />;
    case EDashboard.READ_USER:
      return <ReadUser />;
    case EDashboard.CREATE_USER:
      return <CreateUser />;
    case EDashboard.READ_USER:
      return <ReadUser />;
    case EDashboard.CREATE_USER:
      return <CreateUser />;
    case EDashboard.READ_ROLE:
      return <ReadRole />;
    case EDashboard.CREATE_ROLE:
      return <CreateRole />;
    default:
      break;
  }
}

function UlMenu({
  content,
  deep,
  setState,
}: {
  content: TMenu[];
  deep: number;
  setState: React.Dispatch<React.SetStateAction<EDashboard>>;
}) {
  const [open, setOpen] = React.useState(content.map(() => false));

  const onClickOpen = (index: number) => {
    setOpen((old) => old.map((val, i) => (i === index ? (val = !val) : val)));
  };

  return (
    <ul className="flex flex-col gap-4">
      {content.map((val, i) =>
        val.isActive ? (
          <li
            className={`${deep === 1 ? "" : "pr-8"} flex flex-col gap-4`}
            key={i}
          >
            <Button
              title={val.title}
              variant={deep % 2 === 0 ? "secondary" : "primary"}
              StartIcon={val.Icon}
              EndIcon={
                val.li ? (open[i] ? MdArrowDropDown : MdArrowLeft) : undefined
              }
              wFull
              onClick={() => {
                if (val.state) setState(val.state);
                onClickOpen(i);
              }}
            >
              {val.title}
            </Button>
            {val.li && open[i] ? (
              <UlMenu content={val.li} deep={deep + 1} setState={setState} />
            ) : (
              <></>
            )}
          </li>
        ) : undefined
      )}
    </ul>
  );
}
