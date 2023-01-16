import React from "react";
import CourseContent from "../../components/CourseContent";
import Header from "../../components/Header";
import Siderbar from "../../components/Sidebar";
import "./explore.css";

export default function Explore() {
  return (
    <div>
      <Header />
      <div className="max-width">
        <main className="explore-main">
          <Siderbar />
          <CourseContent />
        </main>
      </div>
    </div>
  );
}
