import React from "react";
import { Outlet } from "react-router-dom";
import ChatbotModal from "../Chatbot/ChatbotModal";
import MapPage from "../MapPage/MapPage";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="MainPage">
      <MapPage />
      <div className="MainPageList">
        <Outlet />
      </div>
      <ChatbotModal />
    </div>
  );
}

export default MainPage;
