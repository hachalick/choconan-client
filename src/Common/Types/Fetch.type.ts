type TProductMenu = {
  id: number;
  price: number;
  waiting: number;
  available: boolean;
  meta_title: string;
  meta_description: string;
  name: string;
  description: string;
  src: string;
};

type TProductsMenu = TProductMenu[];

type TIdProductMenu = TProductMenu & { product_id: string };

type TIdProductsMenu = TIdProductMenu[];

type TCategoryMenu = {
  category: string;
  icon: string;
  products: TProductsMenu;
};

type TIdCategoryMenu = {
  category_product_id: string;
  category: string;
  icon: string;
  products: TIdProductMenu[];
};

type TIdCategoriesMenu = TIdCategoryMenu[];

type TIdProductSearchMenu = TIdProductMenu & { rank: number; category: string };

type TIdProductsSearchMenu = TIdProductSearchMenu[];

type TIdFactorPresentOrder = {
  factor_present_order_id: string;
  count: number;
  products: TIdProductMenu;
};

type TIdPresentOrderTable = {
  present_order_table_id: string;
  table: number;
  busy: boolean;
  accept: boolean;
  factorPresentOrderTable: TIdFactorPresentOrder[];
};

type TIdPresentOrdersTable = TIdPresentOrderTable[];

type TCreateBlog = { create: boolean; id: string };

type TBlog = {
  publish: boolean;
  meta_title: string;
  short_description: string | null;
  title: string;
  src_banner: string | null;
  blog: string | null;
};

type TBlogs = TBlog[];

type TIdBlog = TBlog & { blog_id: string };

type TIdBlogs = TIdBlog[];

type TGetIdBlog = TIdBlog & { create_at: Date; update_at: Date };

type TGetIdBlogs = TGetIdBlog[];

type TLoginPassword = {
  national_code: string;
  phone: string;
  password: string;
};

type TLoginOtp = {
  national_code: string;
  phone: string;
  otp: string;
};

type TLogin =
  | {
      login: false;
    }
  | {
      login: true;
      access_token: string;
      refresh_token: string;
    };

type TRefresh =
  | {
      refresh: false;
    }
  | {
      refresh: true;
      access_token: string;
      refresh_token: string;
    };

type TProfile = {
  name: string;
  family: string;
  profile: string;
  role: string[];
  access: string[];
};

type TImage = {
  dir: string;
};

type TImages = TImage[];

type TIdImage = TImage & {
  image_id: string;
};

type TIdImages = TIdImage[];

type TEconomicPackage = {
  src: string;
  title: string;
  start_hours: string;
  end_hours: string;
  start_day: string;
  end_day: string;
  price: number;
  is_active: boolean;
};

type TContentEconomicPackage = {
  economic_package_id: string;
  product_id: string;
};

type TGetContentEconomicPackage = {
  content_economic_package_id: string;
  count: number;
  productMenu: TIdProductMenu;
};

type TGetContentEconomicPackages = TGetContentEconomicPackage[];

type TGetEconomicPackage = TEconomicPackage & {
  economic_package_id: string;
  contentEconomicPackage: TGetContentEconomicPackages;
};

type TGetEconomicPackages = TGetEconomicPackage[];

type TGetFactorItem = {
  factor_item_id: string;
  product_name: string;
  product_discount: number;
  product_price: number;
  product_count: number;
};

type TGetFactor = {
  factor_id: string;
  factor_number: number;
  pay_status: boolean;
  customer_mobile: string;
  location: string;
  tax: number;
  create_at: string;
  update_at: string;
  factor_items: Array<TGetFactorItem>;
};

type TGetFactors = Array<TGetFactor>;

type TFactorItem = {
  product_name: string;
  product_discount: number;
  product_price: number;
  product_count: number;
};

type TFactor = {
  factor_number: number;
  pay_status: boolean;
  customer_mobile: string;
  location: string;
  tax: number;
  create_at: Date;
  update_at: Date;
  factor_items: Array<TFactorItem>;
};

type TFactors = Array<TFactor>;

type TRoleAccess = {
  role_name: string;
};

type TAllRoleAccess = Array<TRoleAccess>;

type TRoleAccessId = TRoleAccess & {
  role_id: string;
};

type TAllRoleAccessId = Array<TRoleAccessId>;

type TUserAccess = {
  name: string;
  family: string;
  phone: string;
  national_code: string;
  profile: string;
  role: Array<string>;
  access: Array<string>;
};

type TAllUserAccess = Array<TUserAccess>;

type TUserAccessId = TUserAccess & {
  user_id: string;
};

type TAllUserAccessId = Array<TUserAccessId>;
