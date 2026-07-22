type TGetFactorResponseDto = {
  factor_id: string;
  factor_number: number;
  pay_status: boolean;
  customer_mobile: string;
  location: string;
  tax: number;
  create_at: string;
  update_at: string;
  factor_items: Array<TGetFactorItemResponseDto>;
};