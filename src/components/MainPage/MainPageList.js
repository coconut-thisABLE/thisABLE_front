import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaceList } from "../../services/user.service";
import PlaceInfo from "../MapPage/PlaceInfo";
import PaginationView from "./PaginationView";
import "./MainPage.css";

function MainPageList() {
  const [places, setPlaces] = useState("");
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const list = await getPlaceList(page);
    setPlaces(list);
  }, [page]);

  const renderPlaces =
    places &&
    places.results.map((place) => {
      return (
        <div className="PlaceListContainer" key={place.location_code}>
          {PlaceInfo(place)}
        </div>
      );
    });

  const handleCallback = (changedPage) => {
    console.log("넘어온 페이지네이션 페이지", changedPage);
    setPage(changedPage);
  };

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <div className="mapViewBtn">View Map</div>
      </Link>
      {renderPlaces}
      <PaginationView page={places} handleCallback={handleCallback} />
    </div>
  );
}

export default MainPageList;
