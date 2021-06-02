import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

/* eslint-disable arrow-body-style */
const SigninScreen = {
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
        <div class="form-container">
        <form action="" id="signin-form">
        <ul class="form-items">
          <li>
            <h1>Sign-In</h1>
          </li>
          <li>
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter Your Email" name="email" />
          </li>
          <li>
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Enter Your Password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">Sign In</button>
          </li>
          <li>
            <div>
              New User?
               <a href="/#/register">Create Your Account</a>
            </div>
          </li>
        </ul>
        </form>
        </div>
        `;
  },
};
export default SigninScreen;
