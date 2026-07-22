type TGetAllProductPricingResponseDto = {
  day_to_work: number;
  cost: {
    sum_cost: number;
    average_cost: number;
    item_cost: number;
    list: Array<{
      cost_pricing_id: string;
      name: string;
      price: number;
    }>;
  };
  product_in_menu: {
    sum_count_sell: number;
    average_count_sell: number;
    sum_balance: number;
    list: Array<{
      product_id_in_menu: string;
      product_category_id_in_menu: string;
      product_number_id_in_menu: string;
      name_in_menu: string;
      price_in_menu: number;
      product_id_in_pricing: string;
      name_in_pricing: string;
      sum_detail_pricing: number;
      profit_pricing: number;
      price_in_pricing: number;
      product_unit_id: number;
      unit_pricing: string;
      ratio_pricing: number;
      count_sell: number;
      average_count_sell: number;
      balance: number;
    }>;
  };
  product_in_pricing: {
    list: Array<{
      product_id: string;
      name: string;
      buy: number;
      product_unit: Array<{
        product_menu_id: string;
        price_in_menu: string | null;
        product_unit_id: string;
        unit_name: string;
        unit_id: string;
        ratio: number;
        profit: number;
        sum_detail: number;
        price_by_unit: number;
        total_price_for_ratio: number;
        count_sell: number;
        detail: Array<{
          product_unit_detail_id: string;
          name: string;
          unit: string;
          amount: number;
          buy: number;
          ratio: number;
          price_by_unit: number;
          total_price_by_unit: number;
          parent_product_unit_id: string;
          child_product_unit_id: string;
        }>;
      }>;
    }>;
  };
};
