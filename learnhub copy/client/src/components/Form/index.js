import React, { useState } from "react";
import Button from "../Button";
import "./form.css";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { storeData } from "../../utilities/localstore";
import { useAuth } from "../../context/AuthContext";

export default function Form() {
  const { pathname } = useLocation();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const { setAuthData, setToken } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await axios.post(
        `http://localhost:3310/user${
          pathname === "/login" ? pathname : "/register"
        }`,
        {
          fullname,
          email,
          password,
        }
      );

      const response = await request.data;
      storeData("token", response?.token);
      storeData("authData", response?.user);
      setAuthData(response?.user);
      setToken(response?.token);

      setLoading(false);
      setData(response);
      console.log("Response ", response);
    } catch (e) {
      setLoading(false);
      setError(e);
      console.log("Axios error ", e);
    }
  }

  console.log({ loading, data, error });

  // console.log({ location });

  return (
    <form className="form" onSubmit={onSubmit}>
      {data && <Navigate to="/explore/all" replxace={true} />}
      {pathname !== "/login" ? (
        <div className="form__input__wrapper">
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="form__input"
            placeholder="Fullname"
            required
          />
        </div>
      ) : null}

      <div className="form__input__wrapper">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="form__input"
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div className="form__input__wrapper">
        <input
          className="form__input"
          placeholder="Password"
          type="password"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <p>Password must be at least 8 characters long</p> */}
      </div>
      <Button
        buttonType="submit"
        title={loading ? "Loading..." : "Start Learning Today"}
        type="btn-purple"
      />
    </form>
  );
}
