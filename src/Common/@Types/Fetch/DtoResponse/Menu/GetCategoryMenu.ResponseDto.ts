type TGetCategoryMenuResponseDto = {
  category_product_id: string;
  category: string;
  icon: string;
  products: Array<TGetProductMenuResponseDto>;
};
