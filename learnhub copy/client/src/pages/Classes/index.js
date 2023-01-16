import React, { useEffect, useState } from "react";
import "./classes.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { BsHeart } from "react-icons/bs";
import CourseCardSm from "../../components/CourseCardSm";
import { useLocation } from "react-router-dom";
import { getData } from "../../utilities/localstore";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Classes() {
  const { pathname } = useLocation();
  const token = getData("token");

  const { dispatch } = useAuth();

  let courseId = pathname.split("/")[2];

  //   console.log("location", location);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCourses() {
      setLoading(true);
      try {
        const request = await axios.post(
          "http://localhost:3310/course",
          {
            ids: [courseId],
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const response = await request.data;
        console.log(response);
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

  console.log("Data ", data);

  return (
    <div>
      <Header />
      <div className="max-width">
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          data.map((item) => {
            return (
              <div className="classes__main-area" key={item._id}>
                <div className="classes__wrapper">
                  <div className="classes__banner">
                    <img src={item?.courseImage[0] || ""} alt="courses" />
                  </div>
                  <div className="classes__content">
                    <h2>{item?.title}</h2>
                    <p>{item?.description}</p>
                  </div>
                  {/* <div className="courses__recomendation">
                <h2>You might also like</h2>
                <div className="courses__recomendation__content">
                  <CourseCardSm />
                  <CourseCardSm />
                  <CourseCardSm />
                </div>
              </div> */}
                </div>
                <div className="pricing-panel">
                  <iframe
                    height="300"
                    width="100%"
                    src={item?.promotionalVideo}
                    // src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"
                    title={item?.title}
                    // title="YouTube video player"
                    frameborder="0"
                    controls
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    // allowfullscreen
                  >
                    <source src={item?.promotionalVideo} />
                  </iframe>
                  <div className="classes__content__pricing">
                    <h3 className="pricing">${item.price.toFixed(2)}</h3>
                    <div className="pricing__button">
                      <Button
                        event={() =>
                          dispatch({
                            type: "addToCart",
                            payload: { course: item },
                          })
                        }
                        title="Add To Cart"
                        type="btn-purple"
                      />
                      <Button
                        event={() =>
                          dispatch({
                            type: "addToWishlist",
                            payload: { course: item },
                          })
                        }
                        title={<BsHeart size={25} />}
                        type="btn-transparent"
                      />
                    </div>
                    <div className="pricing__cto">
                      <p>Buy Now</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
