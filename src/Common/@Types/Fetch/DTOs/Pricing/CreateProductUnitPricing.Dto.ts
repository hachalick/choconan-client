type TCreateProductUnitPricingDto = {
  access_token: string;
  unit_id: string;
  product_pricing_id: string;
  product_menu_id: string | null;
  ratio: number;
  profit: number;
};
