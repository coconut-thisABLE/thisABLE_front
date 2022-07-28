import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import {
  getReview,
  getReviewAverage,
  postReview,
  postReviewRecommend,
  postReviewDiscourage,
} from "../../services/user.service";
import thumbsUp from "../../assets/images/thumbs_up.svg";
import thumbsDown from "../../assets/images/thumbs_down.svg";

function ReviewPage({ locationId }) {
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewNum, setReviewNum] = useState(0);
  const [sort, setSort] = useState("recommended");
  const [userType, setUserType] = useState("anonymous");

  const handleRating = (rate) => {
    setRating(rate / 20);
  };

  useEffect(async () => {
    const reviewList = await getReview(locationId, sort);
    const averageNum = await getReviewAverage(locationId);
    setReviews(reviewList);
    setReviewNum(averageNum.count);
  }, [locationId, sort, reviews]);

  const [inputValue, setInputValue] = useState("");

  const renderReviews =
    reviews &&
    reviews.response.map((review) => {
      var good = review.good;
      var bad = review.bad;

      return (
        <div className="review">
          <div className="reviewtop">
            <div className="reviewtopleft">
              <Rating ratingValue={review.star * 20} readonly size={25} />
              <div className="reviewuser">{review.userType}</div>
            </div>
            <div className="reviewdate">
              {review.createdAt.substring(0, 10)}
            </div>
          </div>
          <div className="reviewcontent">{review.detail}</div>
          <div className="helpbuttoncontainer">
            <button className="helpbutton">
              <div
                className="buttondisplay"
                onClick={() => {
                  postReviewRecommend(review._id);
                }}
              >
                <img
                  src={thumbsUp}
                  style={{
                    width: "1rem",
                    marginRight: "0.4rem",
                    marginTop: "0.3rem",
                    marginBottom: "0.3rem",
                  }}
                ></img>
                Helpful
              </div>
              <div className="helpbuttonnum">{review.good}</div>
            </button>
            <button className="helpbutton">
              <div
                className="buttondisplay"
                onClick={() => postReviewDiscourage(review._id)}
              >
                <img
                  src={thumbsDown}
                  style={{
                    width: "1rem",
                    marginRight: "0.4rem",
                    marginTop: "0.3rem",
                    marginBottom: "0.3rem",
                  }}
                ></img>
                Not Helpful
              </div>
              <div className="helpbuttonnum">{bad}</div>
            </button>
          </div>
        </div>
      );
    });

  return (
    <div>
      <div className="reviewcontainer">
        <div className="reviewinputtop">
          <div className="reviewtitle">Review</div>
          <Rating onClick={handleRating} ratingValue={rating} />
        </div>
        <div className="userinfo">
          <input
            type="radio"
            name="radio-group"
            value="disabled"
            onClick={() => setUserType("disabled")}
          />
          <label>Disabled User</label>
          <input
            type="radio"
            name="radio-group"
            value="abled"
            onClick={() => setUserType("abled")}
          />
          <label>Non-disabled User</label>
          <input
            type="radio"
            name="radio-group"
            value="anonymous"
            defaultChecked
            onClick={() => setUserType("anonymous")}
          />
          <label>Anonymous</label>
        </div>
        <textarea
          className="reviewinput"
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="The reviews wil be registered anonymously."
          value={inputValue}
        />
        <button
          className="reviewinputbutton"
          onClick={() => {
            postReview(userType, locationId, inputValue, rating);
            setInputValue("");
            setRating(0);
            setSort("createdAt");
          }}
        >
          Register
        </button>
      </div>
      <div className="reviewlist">
        <div className="reviewlisttitle">
          <div className="reviewlistnum">{reviewNum} reviews</div>
          <div className="reviewlistsort">
            <div
              onClick={() => setSort("recommended")}
              style={
                sort == "recommended"
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              Recommendation order
            </div>
            <div>&nbsp;|</div>
            <div
              onClick={() => setSort("createdAt")}
              style={
                sort == "createdAt"
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              Last written order
            </div>
          </div>
        </div>
        {renderReviews}
      </div>
    </div>
  );
}

export default ReviewPage;
