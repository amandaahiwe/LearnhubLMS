import React, { useEffect, useState } from "react";
import "./coursecontent.css";
import CourseCard from "../CourseCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getData } from "../../utilities/localstore";

export default function CourseContent() {
  const token = getData("token");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      try {
        const request = await axios.post(
          "http://localhost:3310/course",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const response = await request.data;

        setLoading(false);
        setData(response?.courses || []);
      } catch (e) {
        setLoading(false);
        setError(e);
        console.log("Axios error ", e);
      }
    }

    getCourses();
  }, []);

  // console.log("Data ", data);

  return (
    <div className="coursecontent">
      {loading ? <h2>Loading</h2> : null}
      {data.length >= 1
        ? data.map((item) => {
            return <CourseCard data={item} key={item._id} />;
          })
        : null}
    </div>
  );
}
