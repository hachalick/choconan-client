export enum ERoute {
  // PROTOCOL = "http",
  PROTOCOL = "https",
  // DOMAIN = "127.0.0.1:8080",
  // DOMAIN = "192.168.1.109:8080",
  DOMAIN = "api.choconan.ir",
  HOST = `${PROTOCOL}://${DOMAIN}`,
  // app
  VIDEO      = "/video",
  LAST_VIDEO = "/last-video",
  // menu
  MENU                     = "/menu",
  SEARCH                   = "/search",
  CATEGORY_MENU            = "/category-menu",
  PRODUCT_MENU             = "/product-menu",
  ECONOMIC_PACKAGE         = "/economic-package",
  CONTENT_ECONOMIC_PACKAGE = "/content-economic-package",
  //service
  MENU_SNAP_FOOD      = "/menu-snap",
  MENU_TAPSI_FOOD     = "/menu-tapsi",
  // order
  TABLE               = "/table",
  STATUS_TABLE        = "/status-table",
  ACCEPT_STATUS_TABLE = "/accept-status-table",
  ORDER_TABLES        = "/order-table",
  ORDER               = "/order",
  ORDER_PAY_STATUS    = "/order/pay-status",
  ORDER_ITEM          = "/order-item",
  ORDER_MONTHLY       = "/order/monthly",
  // blog
  BLOG = "/blog",
  // auth
  LOGIN_PASSWORD  = "/login-password",
  LOGIN_OTP       = "/login-otp",
  REFRESH_TOKEN   = "/refresh-token",
  UPDATE_PASSWORD = "/update-password",
  // user
  ACCOUNT                      = "/account",
  USER                         = "/user",
  DASHBOARD_CAPABILITY_USER    = "/dashboard-capability",
  ROLE                         = "/role",
  ACCESS                       = "/access",
  // file
  IMAGE        = "/image",
  IMAGE_PRODUCT = "/image-product",
  // pricing
  UNIT                = "/unit",
  PRODUCT             = "/product",
  UNIT_PRODUCT        = "/unit-product",
  DETAIL_PRODUCT_UNIT = "/detail-product-unit",
  COST                = "/cost",
}
