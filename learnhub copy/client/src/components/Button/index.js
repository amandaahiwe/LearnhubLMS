import React from "react";
import "./button.css";

export default function Button(props) {
  const { title, type, event, buttonType } = props;
  return (
    <button
      type={buttonType}
      onClick={() => (event ? event() : null)}
      className={`btn ${type}`}
    >
      <p>{title}</p>
    </button>
  );
}
