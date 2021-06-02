import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

/* eslint-disable arrow-body-style */
const RegisterScreen = {
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById("name").value,
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
        <form action="" id="register-form">
        <ul class="form-items">
          <li>
            <h1>Create Account</h1>
          </li>
          <li>
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter Your Name" name="name" />
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
            <label for="repassword">Confirm Password</label>
            <input type="password" name="repassword" placeholder="Enter Your Password Again" id="repassword" />
          </li>
          <li>
            <button type="submit" class="primary">Register</button>
          </li>
          <li>
            <div>
              Already have a account?
               <a href="/#/signin">Signin</a>
            </div>
          </li>
        </ul>
        </form>
        </div>
        `;
  },
};
export default RegisterScreen;
