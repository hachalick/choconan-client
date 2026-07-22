import { ApiAuth } from "../Auth.Api";
import { ApiFile } from "../File.Api";
import { ApiMenu } from "../Menu.Api";
import { ApiOnlineShop } from "../OnlineShop.Api";
import { ApiOrder } from "../Order.Api";
import { ApiPricing } from "../Pricing.Api";
import { ApiUser } from "../User.Api";
import { ApiVideo } from "../App.Api";

export class FetchApi {
  static Auth = ApiAuth;
  static File = ApiFile;
  static Menu = ApiMenu;
  static OnlineShop = ApiOnlineShop;
  static Order = ApiOrder;
  static User = ApiUser;
  static Video = ApiVideo;
  static Pricing = ApiPricing;
}
