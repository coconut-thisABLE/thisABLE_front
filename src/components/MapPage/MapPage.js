import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { getPlaceList } from "../../services/user.service";
import PlaceInfo from "./PlaceInfo";
import "./MapPage.css";
import slopeImg from "../../assets/images/slope.svg";
import chargerImg from "../../assets/images/charger.svg";
import toiletImg from "../../assets/images/toilet.svg";
import elevatorImg from "../../assets/images/elevator.svg";
import ModalView from "../MainPage/ModalView";
import cafe from "../../assets/images/cafe.svg";
import business from "../../assets/images/business.svg";
import culture from "../../assets/images/culture.svg";
import hotel from "../../assets/images/hotel.svg";
import mall from "../../assets/images/mall.svg";
import myself from "../../assets/images/myself.svg";
import restaurant from "../../assets/images/restaurant.svg";
import subway from "../../assets/images/subway.svg";

function MapPage() {
  const [lat, setLat] = useState(37.544127);
  const [lng, setLng] = useState(126.9667812);
  const [places, setPlaces] = useState("");

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    // console.log("Locating...");
    navigator.geolocation.watchPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        // console.log("lat:", lat, "lng:", lng);
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  }
  const mapStyle = {
    height: "94vh",
    width: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [category, setCategory] = useState("");

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(async () => {
    const list = await getPlaceList("all");
    setPlaces(list.results);
  }, []);

  const selectMarker = (location_type) => {
    let place_icon = "";
    if (location_type == "cafe") {
      place_icon = cafe;
    } else if (location_type == "restaurant") {
      place_icon = restaurant;
    } else if (location_type == "accommodation") {
      place_icon = hotel;
    } else if (location_type == "shoppingmall") {
      place_icon = mall;
    } else if (location_type == "subway") {
      place_icon = subway;
    } else if (location_type == "administrative") {
      place_icon = business;
    } else if (location_type == "cultural") {
      place_icon = culture;
    }
    return place_icon;
  };

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={18}
        center={{ lat: +lat, lng: +lng }}
        onClick={() => setActiveMarker(null)}
      >
        <div className="btnCont">
          <div className="filterBtnCont">
            <div onClick={() => setCategory("icon1")}>
              <img
                width={20}
                style={{ marginRight: "0.5rem" }}
                src={toiletImg}
              ></img>
              Disabled Toilet
            </div>
            <div onClick={() => setCategory("icon2")}>
              <img
                width={20}
                style={{ marginRight: "0.5rem" }}
                src={chargerImg}
              ></img>
              Wheelchair Charger
            </div>
            <div onClick={() => setCategory("icon3")}>
              <img
                width={20}
                style={{ marginRight: "0.5rem" }}
                src={elevatorImg}
              ></img>
              Elevator
            </div>
            <div onClick={() => setCategory("icon4")}>
              <img
                width={20}
                style={{ marginRight: "0.5rem" }}
                src={slopeImg}
              ></img>
              Slope
            </div>
            <div onClick={() => setCategory("")}>View All</div>
          </div>
          <Link to="/list" style={{ textDecoration: "none", color: "black" }}>
            <div className="listViewBtn">View List</div>
          </Link>
        </div>
        {renderMarker}
        <Marker position={{ lat: +lat, lng: +lng }} icon={myself} />;
      </GoogleMap>
    );
  };

  const renderMarker =
    places &&
    places
      .filter((info) => {
        if (category == "icon1") {
          return info.isToiletExists;
        } else if (category == "icon2") {
          return info.isChargerExists;
        } else if (category == "icon3") {
          return info.isElevatorExists;
        } else if (category == "icon4") {
          return info.isSlopeExists;
        } else {
          return true;
        }
      })
      .map((place) => (
        <Marker
          position={{ lat: place.latitude, lng: place.longitude }}
          onClick={() => handleActiveMarker(place._id)}
          icon={selectMarker(place.locationType)}
        >
          {activeMarker === place._id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <>
                <ModalView info={place} />
                <div className="mapModalPc">{PlaceInfo(place)}</div>
              </>
            </InfoWindow>
          ) : null}
        </Marker>
      ));

  return isLoaded ? renderMap() : <CircularProgress />;
}

export default MapPage;
