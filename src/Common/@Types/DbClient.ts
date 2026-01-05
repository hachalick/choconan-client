type TOrder = {
  id_product_menu: number;
  category: string;
  count: number;
};

type TID<T> = T & { id: number };

type TOrderPresent = Omit<TGetProductMenuResponseDto, "id"> & TOrder

type TOrdersPresent = Array<TOrderPresent>;
