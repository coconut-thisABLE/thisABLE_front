import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewPage from "./ReviewPage";
import ToggleView from "./ToggleView";
import { getPlaceDetail, getReviewAverage } from "../../services/user.service";
import slopeImg from "../../assets/images/slope.svg";
import chargerImg from "../../assets/images/charger.svg";
import toiletImg from "../../assets/images/toilet.svg";
import elevatorImg from "../../assets/images/elevator.svg";
import "./DetailPage.css";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";

function DetailPage() {
  const [place, setPlace] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  let { id } = useParams();

  useEffect(async () => {
    const detail = await getPlaceDetail(id);
    const averageNum = await getReviewAverage(id);
    setPlace(detail.response);
    setReviewCount(averageNum);
  }, [id]);

  return (
    <div className="maincontainer">
      <Link
        to={`/`}
        media="screen and (min-width:768px) and (max-width: 1042px)"
        className="backweb"
      >
        ◀ Go Back
      </Link>
      <Link
        to={`/list`}
        media="screen and (min-width:0px) and (max-width: 768px)"
        className="backmobile"
      >
        ◀ Go to List
      </Link>
      <div className="placedetail">
        <div className="placenametype">
          <h5 className="placename">{place.name}</h5>
          <div className="placetype">{place.locationType}</div>
        </div>
        <div className="placeaddress">{place.address}</div>
        {reviewCount && (
          <div className="placerate">
            <Rating ratingValue={reviewCount.average * 20} readonly />(
            {reviewCount.count} reviews)
          </div>
        )}
        <div className="placeiconlist">
          {place.isToiletExists && (
            <div className="placeicon">
              <img src={toiletImg}></img>
              <div className="placeiconname">Disabled Toilet</div>
            </div>
          )}
          {place.isChargerExists && (
            <div className="placeicon">
              <img src={chargerImg}></img>
              <div className="placeiconname">Wheelchair Charger</div>
            </div>
          )}
          {place.isElevatorExists && (
            <div className="placeicon">
              <img src={elevatorImg}></img>
              <div className="placeiconname">Elevator</div>
            </div>
          )}
          {place.isSlopeExists && (
            <div className="placeicon">
              <img src={slopeImg}></img>
              <div className="placeiconname">Slope</div>
            </div>
          )}
        </div>
      </div>

      <div className="togglelist">
        <ToggleView detail={place} />
      </div>

      <ReviewPage locationId={id} />
    </div>
  );
}

export default DetailPage;
