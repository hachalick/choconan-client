"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadAccountDetailViewModel } from "@/Common/Connection/Api/ViewModels/User.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Layout from "@/Components/Layout/Layout";
import LoginPanel from "@/Page/Panel/Login/Login";
import { AccountContext } from "@/Contexts/Account.Context";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState<boolean | null>(false);
  const [profile, setProfile] = useState<ReadAccountDetailViewModel>(
    () => new ReadAccountDetailViewModel(),
  );
  const [statePageDashboard, setStatePageDashboard] = useState<EDashboard>(
    EDashboard.DEFAULT,
  );
  const [getOrder, setGetOrder] = useState<boolean>(true);
  const [getConnectServerSocketIo, setGetConnectServerSocketIo] =
    useState<boolean>(false);
  const [idFactor, setIdFactor] = useState<string>("");
  const [idCategoryMenu, setIdCategoryMenu] = useState<string>("");
  const [idProductMenu, setIdProductMenu] = useState<string>("");
  const [idUserAccess, setIdUserAccess] = useState<string>("");
  const [idRoleAccess, setIdRoleAccess] = useState<string>("");
  const [idLocation, setIdLocation] = useState<string>("");
  const [idUnitPricing, setIdUnitPricing] = useState<string>("");
  const [idProductUnitPricing, setIdProductUnitPricing] = useState<string>("");
  const [idCostUnitPricing, setIdCostUnitPricing] = useState<string>("");

  useEffect(() => {
    const fetchRoles = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token && access_token) {
        try {
          const profile = await FetchApi.User.ReadAccountDetail({
            Token: access_token,
          });
          setProfile(profile);
          setIsLogin(true);
        } catch (error) {
          try {
            const res = await FetchApi.Auth.CreateRefreshToken({
              RefreshToken: refresh_token,
            });
            if (res.Create) {
              sessionStorage.setItem("access_token", res.AccessToken);
              localStorage.setItem("refresh_token", res.RefreshToken);
              location.reload();
            }
          } catch (error) {
            // console.log(error)
            localStorage.clear();
            sessionStorage.clear();
          }
        }
      } else if (refresh_token) {
        try {
          const res = await FetchApi.Auth.CreateRefreshToken({
            RefreshToken: refresh_token,
          });
          if (res.Create) {
            sessionStorage.setItem("access_token", res.AccessToken);
            localStorage.setItem("refresh_token", res.RefreshToken);
            location.reload();
          }
        } catch (error) {
          localStorage.clear();
          sessionStorage.clear();
        }
      } else {
        setIsLogin(null);
      }
    };

    fetchRoles();

    const dashboard_page = sessionStorage.getItem("dashboard_page");

    if (!dashboard_page) {
      sessionStorage.setItem(
        "dashboard_page",
        JSON.stringify(statePageDashboard),
      );
    } else {
      const pars_dashboard_page = JSON.parse(dashboard_page);

      if (typeof pars_dashboard_page === "number") {
        setStatePageDashboard(pars_dashboard_page);
      } else if (typeof pars_dashboard_page === "string") {
        try {
          const int_pars_dashboard_page = parseInt(pars_dashboard_page);
          setStatePageDashboard(int_pars_dashboard_page);
        } catch (error) {}
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "dashboard_page",
      JSON.stringify(statePageDashboard),
    );
  }, [statePageDashboard]);

  if (isLogin === true) {
    return (
      <AccountContext.Provider
        value={{
          profile,
          costPricing: {
            state: idCostUnitPricing,
            setState: setIdCostUnitPricing,
          },
          dashboard: {
            state: statePageDashboard,
            setState: setStatePageDashboard,
          },
          orders: { state: getOrder, setState: setGetOrder },
          factor: { state: idFactor, setState: setIdFactor },
          categoryMenu: { state: idCategoryMenu, setState: setIdCategoryMenu },
          productMenu: { state: idProductMenu, setState: setIdProductMenu },
          roleAccess: { state: idRoleAccess, setState: setIdRoleAccess },
          userAccess: { state: idUserAccess, setState: setIdUserAccess },
          location: { state: idLocation, setState: setIdLocation },
          connectServerSocketIo: {
            state: getConnectServerSocketIo,
            setState: setGetConnectServerSocketIo,
          },
          unitPricing: {
            state: idUnitPricing,
            setState: setIdUnitPricing,
          },
          productPricing: {
            setState: setIdProductUnitPricing,
            state: idProductUnitPricing,
          },
        }}
      >
        {children}
      </AccountContext.Provider>
    );
  } else if (isLogin === false) {
    return (
      <Layout variant="dashboard">
        <div></div>
      </Layout>
    );
  } else {
    return (
      <Layout variant="dashboard">
        <LoginPanel />
      </Layout>
    );
  }
}
