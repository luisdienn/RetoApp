/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ./images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('./images', true)
// const imagePath = (name) => images(name, true)
import ReactOnRails from 'react-on-rails';

import Login from "../components/Login/pages/Login";
import Dashboard from "../components/Dashboard/pages/Dashboard";
import Matches from "../components/Matches/pages/Matches";
import WorldCup from "../components/WorldCup/pages/WorldCup";
import Profile from "../components/Profile/pages/Profile";
import Friendships from "../components/Friendships/pages/Friendships";
import FriendshipProfile from "../components/Friendships/pages/FriendshipProfile";
import NewPassword from "../components/Password/NewPassword";
import EditPassword from "../components/Password/EditPassword";
import Confirmation from "../components/Confirmation/Confirmation";
import Unlock from "../components/Unlock/Unlock";
import AdminDashboard from "../components/Admin/pages/AdminDashboard";
import AdminTable from "../components/Admin/pages/AdminTable";
import AdminBadges from "../components/Admin/pages/AdminBadges";
import Badges from "../components/Badges/pages/Badges";






// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Login,
  Dashboard,
  Matches,
  WorldCup,
  Profile,
  Friendships,
  FriendshipProfile,
  NewPassword,
  EditPassword,
  Confirmation,
  Unlock,
  AdminDashboard,
  AdminTable,
  AdminBadges,
  Badges,


  
});
