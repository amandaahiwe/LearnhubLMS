import React from "react";
import Button from "../Button";
import "./coursecardsm.css";
import { BsHeart } from "react-icons/bs";

export default function CourseCardSm() {
  return (
    <div className="coursecardsm">
      <div className="coursecardsm__content">
        <div className="coursecardsm__thumbnail">
          <img
            src="https://www.lpcentre.com/storage/images/articles/16579460540.jpeg"
            alt="courses"
          />
        </div>
        <div className="coursecardsm__content__details">
          <h2>Course Title template just to fill up space</h2>
          <p>$300.32</p>
        </div>
      </div>
      <div className="coursecardsm__content__btn">
        <Button title={<BsHeart size={18} />} type="btn-transparent" />
      </div>
    </div>
  );
}
