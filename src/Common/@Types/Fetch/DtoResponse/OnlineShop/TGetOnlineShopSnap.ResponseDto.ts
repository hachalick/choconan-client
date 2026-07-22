type TGetOnlineShopSnapResponseDto = {
  allProduct: Array<{
    id: number;
    title: string;
    price: number;
  }>;
  match: Array<{
    id: number;
    title: string;
    price: number;
    selfPrice: number;
    selfTitle: string;
  }>;
  notMatch: Array<{
    id: number;
    title: string;
    price: number;
    selfPrice: number;
  }>;
};
