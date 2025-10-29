"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Layout from "@/Components/Layout/Layout";
import LoginPanel from "@/Components/Page/Panel/Login/Login";
import { AccountContext } from "@/Contexts/Account.Context";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [profile, setProfile] = useState<TProfile>({
    access: [],
    family: "",
    name: "",
    profile: "",
    role: [],
  });
  const [state, setState] = useState<EDashboard>(EDashboard.DEFAULT);
  const [getOrder, setGetOrder] = useState<boolean>(true);
  const [getConnectServerSocketIo, setGetConnectServerSocketIo] =
    useState<boolean>(false);
  const [idFactor, setIdFactor] = useState<string>("");
  const [idCategoryMenu, setIdCategoryMenu] = useState<string>("");
  const [idProductMenu, setIdProductMenu] = useState<string>("");
  const [idUserAccess, setIdUserAccess] = useState<string>("");
  const [idRoleAccess, setIdRoleAccess] = useState<string>("");
  const [idLocation, setIdLocation] = useState<string>("");

  useEffect(() => {
    const fetchRoles = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token && access_token) {
        try {
          const profile = await FetchApi.User.fetchGetAccount({ access_token });
          setProfile(profile);
          setIsLogin(false);
        } catch (error) {
          try {
            const res = await FetchApi.Auth.fetchRefreshToken({
              refresh_token,
            });
            if (res.refresh) {
              sessionStorage.setItem("access_token", res.access_token);
              localStorage.setItem("refresh_token", res.refresh_token);
              location.reload();
            }
          } catch (error) {
            localStorage.clear();
            sessionStorage.clear();
          }
        }
      } else if (refresh_token) {
        try {
          const res = await FetchApi.Auth.fetchRefreshToken({ refresh_token });
          if (res.refresh) {
            sessionStorage.setItem("access_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
            location.reload();
          }
        } catch (error) {
          localStorage.clear();
          sessionStorage.clear();
        }
      }
    };

    fetchRoles();
  }, []);

  if (!isLogin) {
    return (
      <AccountContext.Provider
        value={{
          profile,
          dashboard: { state, setState },
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
        }}
      >
        {children}
      </AccountContext.Provider>
    );
  } else {
    return (
      <Layout variant="dashboard">
        <LoginPanel />
      </Layout>
    );
  }
}
