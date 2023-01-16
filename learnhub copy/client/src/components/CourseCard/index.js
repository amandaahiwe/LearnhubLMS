import React from "react";
import { useNavigate } from "react-router-dom";
import "./coursecard.css";

export default function CourseCard(props) {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      className="coursecard"
      onClick={() => navigate(`/classes/${data?._id}`)}
    >
      <div className="coursecard__thumbnail">
        <img src={data?.courseImage[0]} alt="courses" />
      </div>
      <div className="coursecard__content">
        <h2>{data?.title}</h2>
        <div className="coursecard__footer">
          <p className="coursecard__author">{data?.postedBy}</p>
        </div>
      </div>
    </div>
  );
}
