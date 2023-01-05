export const homeStatic = require("../../assets/img/home.png");
export const searchStatic = require("../../assets/img/sea.png");
export const settingsStatic = require("../../assets/img/set.png");
export const profileStatic = require("../../assets/img/user.png");
export const Home = require("../../assets/img/home.gif");
export const Search = require("../../assets/img/sea.gif");
export const Setting = require("../../assets/img/set.gif");
export const Profile = require("../../assets/img/user.gif");
export const Icons = [
  {
    key: "Home",
    static: homeStatic,
    navigate: "Home",
    size: "30",
    source: Home,
  },
  {
    key: "Search",
    static: searchStatic,
    navigate: "Search",
    size: "30",
    source: Search,
  },
  {
    key: "Settings",
    static: settingsStatic,
    navigate: "Settings",
    size: "30",
    source: Setting,
  },
  {
    key: "Profile",
    static: profileStatic,
    navigate: "Profile",
    size: "30",
    source: Profile,
  },
];
