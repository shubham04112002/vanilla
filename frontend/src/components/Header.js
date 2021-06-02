import { getUserInfo } from "../localStorage";

/* eslint-disable arrow-body-style */
const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return `
      <div class="brand">
      <a href="/#/">FlipZon</a>
    </div>
    <div>
    ${
      name
        ? `<a href="/#/profile">${name}</a>`
        : `    <a href="/#/signin">SignIn</a>`
    }
      <a href="/#/cart">Cart</a>
      ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ""}
    </div>
      `;
  },
  after_render: () => {},
};
export default Header;
