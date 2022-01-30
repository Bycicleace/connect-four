import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import "./Login.css";

import Auth from "../../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      window.location.assign("/Profile/");

      Auth.login(data.login.token, data.login.user);
      console.log(data.login.token, data.login.user);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="login__main">
        <div className="login__card">
          <h4 className="login__card-header">Login to Play!</h4>
          <div className="login__card-body">
            <form onSubmit={handleFormSubmit} className="login__form">
              <label htmlFor="email" className="login__form-input-label">
                Email:
              </label>
              <input
                className="login__form-input"
                placeholder="Enter Email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <label htmlFor="password" className="login__form-input-label">
                Password:
              </label>
              <input
                className="login__form-input"
                placeholder="Enter Password"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="login__button" type="submit">
                Login
              </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
    </main>
  );
};

export default Login;
