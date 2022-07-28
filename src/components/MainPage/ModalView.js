import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DetailPage from "../DetailPage/DetailPage";
import PlaceInfo from "../MapPage/PlaceInfo";

function ModalView({ info }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div onClick={() => setModalShow(true)} className="mapModalMobile">
        {PlaceInfo(info)}
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DetailPage />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalView;
