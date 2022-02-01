import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import "./Signup.css";

import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });
      // window.location.assign("/profile/");
      
      Auth.login(data.addUser.token, data.addUser);
      // window.location.assign('/profile/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="signup__main">
      <div className="signup__card">
        <h4 className="signup__card-header">Sign Up to Play!</h4>
        <div className="signup__card-body">
          <form onSubmit={handleFormSubmit} className="signup__form">
            <label htmlFor="username" className="signup__form-input-label">
              Username:
            </label>
            <input
              className="signup__form-input"
              placeholder="Enter Username"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
            <label htmlFor="email" className="signup__form-input-label">
              Email:
            </label>
            <input
              className="signup__form-input"
              placeholder="Enter Email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="signup__form-input-label">
              Password:
            </label>
            <input
              className="signup__form-input"
              placeholder="Enter Password"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="signup__button" type="submit">
              Sign Up
            </button>
          </form>

          {error && <div>Signup failed</div>}
        </div>
      </div>
    </main>
  );
};

export default Signup;
