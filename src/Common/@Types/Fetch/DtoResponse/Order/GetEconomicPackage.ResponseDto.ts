type TGetEconomicPackageResponseDto = {
  src: string;
  title: string;
  start_hours: string;
  end_hours: string;
  start_day: string;
  end_day: string;
  price: number;
  is_active: boolean;
  economic_package_id: string;
  contentEconomicPackage: Array<TGetContentEconomicPackageResponseDto>;
};
