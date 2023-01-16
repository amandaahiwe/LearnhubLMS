import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import Button from "../Button";
import "./sidebar.css";

export default function Siderbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function navigateCategory() {}

  return (
    <div className="sidebar">
      {categories.map(({ name, id }) => {
        if (pathname === `/explore/${name}`) {
          return (
            <div
              onClick={() => navigate(`/explore/${name}`)}
              className="sidebar__item"
              key={id}
            >
              <Button title={name} type="btn-purple" />
            </div>
          );
        }

        return (
          <div
            onClick={() => navigate(`/explore/${name}`)}
            className="sidebar__item"
            key={id}
          >
            <Button title={name} type="btn-transparent" />
          </div>
        );
      })}
    </div>
  );
}
