import React from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Header from "../../components/Header";
import "./home.css";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="max-width">
        <main className="hero">
          <div className="col-2">
            <div className="hero__paragraph">
              <p>Explore your creativity with thousands of hands‑on classes.</p>
            </div>
            <Form />
          </div>
        </main>
      </div>
    </div>
  );
}
