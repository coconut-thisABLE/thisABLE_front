import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Icon, Avatar } from "antd";
import Chatbot from "./Chatbot";

function ChatbotModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div onClick={() => setModalShow(true)} className="chatbotModal">
        <Icon type="robot" className="robotBtn" />
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>thisABLE Chatbot</Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Chatbot />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChatbotModal;
