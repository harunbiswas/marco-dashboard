import { NavLink } from "react-router-dom";
import "../styles/Login/login.scss";

const Login = () => {
  return (
    <div className="loginPage">
      {/* logo */}
      <div className="logo">
        <NavLink to="/">
          <img src="./images/login-logo.svg" alt="logo" />
        </NavLink>
      </div>

      {/* Overlay One */}
      <div className="overlay_one">
        <img src="./images/login-overlay-1.png" alt="" />
      </div>

      {/* Overlay One */}
      <div className="overlay_two">
        <img src="./images/login-overlay-2.png" alt="" />
      </div>

      {/* Overlay One */}
      <div className="overlay_three">
        <img src="./images/login-overlay-3.png" alt="" />
      </div>

      {/* Form */}
      <div className="login_form">
        {/* Login Box */}
        <div className="form_box">
          {/* heading */}
          <div className="heading">
            <h1 className="jakarta">Welcome</h1>
          </div>

          {/* form */}
          <form>
            {/* email */}
            <div className="box">
              <label htmlFor="mail" className="jakarta">
                Email
              </label>
              <input
                type="email"
                id="mail"
                placeholder="Connie"
                className="jakarta"
              />
            </div>

            {/* password */}
            <div className="box">
              <label htmlFor="password" className="jakarta">
                Password
              </label>
              <input type="password" placeholder="Murray" className="jakarta" />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "35px",
              }}
            >
              <NavLink to="/">
                <button className="jakarta">Login</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
