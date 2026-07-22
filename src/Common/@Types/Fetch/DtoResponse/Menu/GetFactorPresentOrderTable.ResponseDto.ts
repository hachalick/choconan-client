type TGetFactorPresentOrderTableResponseDto = {
  present_order_table_id: string;
  table: number;
  busy: boolean;
  accept: boolean;
  factorPresentOrderTable: TGetFactorPresentOrderResponseDto[];
};
