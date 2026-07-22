export enum EServerRoute {
  // PROTOCOL = "http",
  PROTOCOL = "https",
  // DOMAIN = "127.0.0.1:15000",
  // DOMAIN = "192.168.1.109:8080",
  DOMAIN = "api.shonan.ir",
  HOST = `${PROTOCOL}://${DOMAIN}`,
  // app
  VIDEO = "/video",
  VIDEO_LAST = "/video/last",
  // menu
  MENU = "",
  MENU_SEARCH = "/search",
  MENU_CATEGORY = "/category",
  MENU_PRODUCT = "/product",
  MENU_ECONOMIC_PACKAGE = "/economic-package",
  MENU_CONTENT_ECONOMIC_PACKAGE = "/content-economic-package",
  //service
  SERVICE_MENU_SNAP_FOOD = "/menu-snap",
  SERVICE_MENU_TAPSI_FOOD = "/menu-tapsi",
  // order
  ORDER_TABLE = "/table",
  ORDER_STATUS_TABLE = "/status-table",
  ORDER_ORDER_TABLE = "/order-table",
  ORDER_ORDER = "/order",
  ORDER_ORDER_MONTHLY = "/order/monthly",
  ORDER_ORDER_PAY_STATUS = "/order/pay-status",
  ORDER_ORDER_ITEM = "/order-item",
  // blog
  BLOG = "/blog",
  // auth
  AUTH_LOGIN_PASSWORD = "/login/password",
  AUTH_LOGIN_OTP = "/login/otp",
  AUTH_REFRESH_TOKEN = "/refresh-token",
  AUTH_UPDATE_PASSWORD = "/password",
  // user
  USER_ACCOUNT = "/account",
  USER_USER = "/user",
  USER_DASHBOARD_CAPABILITY = "/dashboard-capability",
  USER_DASHBOARD_CAPABILITY_USER = "/dashboard-capability-user",
  USER_ROLE = "/role",
  USER_ACCESS = "/access",
  // file
  FILE_IMAGE = "/image",
  // pricing
  PRICING_UNIT = "/unit",
  PRICING_PRODUCT = "/product",
  PRICING_UNIT_PRODUCT = "/unit-product",
  PRICING_DETAIL_PRODUCT_UNIT = "/detail-product-unit",
  PRICING_COST = "/cost",
}
