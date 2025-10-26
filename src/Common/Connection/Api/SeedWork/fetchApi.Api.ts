import { ApiAuth } from "../Auth.Api";
import { ApiBlog } from "../Blog.Api";
import { ApiFile } from "../File.Api";
import { ApiMenu } from "../Menu.Api";
import { ApiOnlineShop } from "../OnlineShop.Api";
import { ApiOrder } from "../Order.Api";
import { ApiUser } from "../User.Api";
import { ApiVideo } from "../Video.Api";

export class FetchApi {
  static Auth = ApiAuth;
  static Blog = ApiBlog;
  static File = ApiFile;
  static Menu = ApiMenu;
  static OnlineShop = ApiOnlineShop;
  static Order = ApiOrder;
  static User = ApiUser;
  static Video = ApiVideo;
}
