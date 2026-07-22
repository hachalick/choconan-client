import { ReadAccountDetailViewModel } from "@/Common/Connection/Api/ViewModels/User.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { createContext } from "react";

export const AccountContext = createContext<
  | {
      profile: ReadAccountDetailViewModel;
      dashboard: {
        state: EDashboard;
        setState: React.Dispatch<React.SetStateAction<EDashboard>>;
      };
      orders: {
        state: boolean;
        setState: React.Dispatch<React.SetStateAction<boolean>>;
      };
      factor: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      categoryMenu: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      productMenu: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      userAccess: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      roleAccess: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      location: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      connectServerSocketIo: {
        state: boolean;
        setState: React.Dispatch<React.SetStateAction<boolean>>;
      };
      unitPricing: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      productPricing: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
      costPricing: {
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      };
    }
  | undefined
>(undefined);
