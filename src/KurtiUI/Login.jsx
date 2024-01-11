import React from "react";
import styled from "styled-components";
import { VscErrorSmall } from "react-icons/vsc";
const Login = ({ setLogIn }) => {
  const [role, setRole] = React.useState("Admin");
  const [storeType, setStoreType] = React.useState("Designer");
  let appToken = "";
  const [userInfo, setInfo] = React.useState({
    email: "bijay@lovoj.com",
    password: "bijay12",
    storeType: "Designer",
    role: "admin",
  });
  const loginPost = async () => {
    try {
      const url = "https://fabricssoftware.com/api/v1/auth/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      };
      const resp = await fetch(url, options);
      const data = await resp.json();
      appToken = data.token;
      localStorage.setItem("app_token", appToken);
      // console.log("^^^^^^^^^ ",data,"             ",userInfo,"     ",appToken);
      return data;
    } catch (error) {
      console.log("%%%%%%%%%%% ", error);
    }
  };
  return (
    <Wrapper>
      <form
        action="#"
        className="my-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await loginPost();
          console.log("%%%%%%%%%%%% ", response);
          if (response && response.success) {
            setLogIn(true);
            localStorage.setItem(
              "user_login",
              JSON.stringify({ user_login: true })
            );
          } else {
            setLogIn(false);
            localStorage.setItem(
              "user_login",
              JSON.stringify({ user_login: false })
            );
            document.getElementById("error_msg").style.opacity = 1;
            const tout = setTimeout(() => {
              document.getElementById("error_msg").style.opacity = 0;
              clearTimeout(tout);
            }, 1500);
          }
        }}
      >
        <h2>Sign In</h2>
        <p>Enter your email and password to sign in!</p>
        <label htmlFor="email">Email*</label>
        <input
          className="form-input"
          id="email"
          type="email"
          name="email"
          autoComplete="off"
          required
          placeholder="Enter your mail"
          onChange={(e) => {
            // console.log(e.target.value);
            setInfo({
              ...userInfo,
              email: e.target.value,
            });
          }}
        />
        <label htmlFor="password">Password*</label>
        <input
          className="form-input"
          id="password"
          type="password"
          name="password"
          autoComplete="off"
          required
          placeholder="Min, 8 characters"
          onChange={(e) => {
            setInfo({
              ...userInfo,
              password: e.target.value,
            });
          }}
        />
        <div className="selector_container">
          <label htmlFor="role">Role*</label>
          <div className="selector_menu">
            <select
              name="role"
              id="role"
              defaultValue={role}
              onChange={(e) => {
                setInfo({
                  ...userInfo,
                  role: e.target.value,
                });
              }}
            >
              <option className="select_options">Admin</option>
            </select>
          </div>
          <label htmlFor="store_type">Store Type</label>
          <div className="selector_menu">
            <select
              name="store_type"
              id="store_type"
              defaultValue={storeType}
              onChange={(e) => {
                console.log(e.target.value);
                setInfo({
                  ...userInfo,
                  storeType: e.target.value,
                });
              }}
            >
              <option className="select_options">Designer</option>
              <option className="select_options">Fabric</option>
            </select>
          </div>
        </div>
        <div className="keep_forget">
          <div className="keep_forget_1">
            <input
              className="keep_checkbox"
              type="checkbox"
              value="lsRememberMe"
              id="rememberMe"
            />
            <label htmlFor="rememberMe">keep me logged in</label>
          </div>
          <h3>Forget Password?</h3>
        </div>
        <input type="submit" value="Sign in" onClick={() => {}} />
        <div className="error_msg" id="error_msg">
          <VscErrorSmall className="error_icon" />
          Login Fail.
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;
const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  .my-form {
    margin-top: 5rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    outline: none;
    h2 {
      font-size: 3.5rem;
      text-align: left;
    }
    p {
      font-size: 1.7rem;
      /* opacity: .5; */
      text-align: left;
      color: #bec5d3;
    }
    label {
      font-size: 1.5rem;
      font-weight: 700;
      text-transform: capitalize;
    }
    .form-input {
      padding: 2rem;
      border-radius: 10px;
      border: none;
      outline: none;
      border: 1px solid #ededef;
      font-size: 1.4rem;
      &::placeholder {
        color: #bec5d3;
      }
    }
    .selector_container {
      text-align: left;
      width: 100%;
      user-select: none;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      .selector_menu {
        width: 100%;
        select {
          width: 100%;
          padding: 1.5rem 2rem;
          font-size: 1.4rem;
          border-radius: 10px;
          border: 1px solid #ededef;
          outline: 0;
          cursor: pointer;
          option {
            line-height: 50px;
            padding: 2rem;
            &:focus,
            &:hover {
            }
          }
        }
      }
    }
    .keep_forget {
      text-transform: capitalize;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: space-between;
      .keep_forget_1 {
        display: flex;
        align-items: center;
        align-content: center;
        cursor: pointer;
        user-select: none;
        input[type="checkbox"] {
          border: 2px solid #000;
          outline: 0;
          width: 2rem;
          height: 2rem;
          background: none;
          /* -webkit-appearance: none; */
        }
        /* input[type=checkbox]:checked {
                    background-color: #000;
                    opacity: 1;
                }
                input[type=checkbox]:before {
                    content: '';
                    position: relative;
                    width: 4px;
                    height: 10px;
                    border: solid #FFF;
                    border-width: 0 2px 2px 0;
                    margin: -1px -1px 0 -1px;
                    transform: rotate(45deg);
                    z-index: 2;
                } */
        label {
          margin-left: 0.5rem;
          font-weight: 200;
          font-size: 1.2rem;
        }
      }
      h3 {
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
      }
    }
    input[type="submit"] {
      padding: 1.5rem 2rem;
      outline: 0;
      border: 0;
      background-color: #422afc;
      border-radius: 1rem;
      color: white;
      font-size: 1.5rem;
      transition: all linear 0.2s;
      margin-top: 2rem;
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        transform: scale(0.9);
      }
    }
    .error_msg {
      font-size: 1.4rem;
      color: #d8000c;
      background-color: #ffbaba;
      display: flex;
      align-items: center;
      transition: all linear 0.2s;
      opacity: 0;
      .error_icon {
        font-size: 4rem;
      }
    }
  }
`;
