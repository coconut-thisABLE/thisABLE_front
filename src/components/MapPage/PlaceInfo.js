import React from "react";
import { Link } from "react-router-dom";
import slopeImg from "../../assets/images/slope.svg";
import chargerImg from "../../assets/images/charger.svg";
import toiletImg from "../../assets/images/toilet.svg";
import elevatorImg from "../../assets/images/elevator.svg";
import "./MapPage.css";

const PlaceInfo = (place) => {
  return (
    <Link to={`detail/${place._id}`} style={{ textDecoration: "none" }}>
      <div className="PlaceInfoCont" key={place._id}>
        <div className="placeTopinfo">
          <div className="placeNameType">
            <h5 className="fw-bold text-dark">{place.name}</h5>
            <div className="placeTypeinfo">{place.locationType}</div>
          </div>
          <div className="placeDist">{place.distance}km</div>
        </div>
        <div className="placeAddr">{place.address}</div>
        <div className="placeIcon">
          {place.isToiletExists && <img src={toiletImg}></img>}
          {place.isChargerExists && <img src={chargerImg}></img>}
          {place.isElevatorExists && <img src={elevatorImg}></img>}
          {place.isSlopeExists && <img src={slopeImg}></img>}
        </div>
      </div>
    </Link>
  );
};

export default PlaceInfo;
