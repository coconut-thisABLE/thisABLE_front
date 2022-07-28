import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContext,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { getPlaceDetailCharger } from "../../services/user.service";
import "./DetailPage.css";

function CustomToggle({ children, eventKey, callback }) {
  const [message, setMessage] = useState("▶");
  const { activeEventKey } = useContext(AccordionContext);
  const isCurrentEventKey = activeEventKey === eventKey;

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setMessage((prev) => (prev === "▶" ? "▼" : "▶"))
  );
  return (
    <button type="button" onClick={decoratedOnClick} className="customToggle">
      {message}
      {children}
    </button>
  );
}

function ToggleView({ detail }) {
  const [charger, setCharger] = useState([]);
  let { id } = useParams();

  useEffect(async () => {
    const chargerInfo = await getPlaceDetailCharger(id);
    setCharger(chargerInfo.data);
  }, [id]);

  return (
    <Accordion defaultActiveKey={["0"]}>
      {detail.isChargerExists && (
        <Card>
          <CustomToggle eventKey="1">View wheelchair charger details</CustomToggle>
          <Accordion.Collapse eventKey="1">
            <div className="toggle">
              <div>
                <div>Emplacement</div>
                <div>{charger.instllcdesc}</div>
              </div>
              <div>
                <div>Air injection function</div>
                <div>{charger.airinjectoryn}</div>
              </div>
              <div>
                <div>Mobile phone charging</div>
                <div>{charger.moblphonchrstnyn}</div>
              </div>
              <div>
                <div>Number of simultaneous use</div>
                <div>{charger.smtmuseco}</div>
              </div>
              <div>
                <div>Weekday operating hours</div>
                <div>
                  {charger.weekdayoperopenhhmm} ~ {charger.weekdayopercolsehhmm}
                </div>
              </div>
              <div>
                <div>Saturday Hours of Operation</div>
                <div>
                  {charger.satoperoperopenhhmm} ~ {charger.satoperclosehhmm}
                </div>
              </div>
              <div>
                <div>Holiday Hours of Operation</div>
                <div>
                  {charger.holidayoperopenhhmm} ~ {charger.holidaycloseopenhhmm}
                </div>
              </div>
              <div>
                <div>Facility name</div>
                <div>{charger.fcltynm}</div>
              </div>
              <div>
                <div>Management organization name</div>
                <div>{charger.institutionnm}</div>
              </div>
              <div>
                <div>Management organization number</div>
                <div>{charger.institutionphonenumber}</div>
              </div>
              <div>
                <div>Data base date</div>
                <div>{charger.referencedate}</div>
              </div>
            </div>
          </Accordion.Collapse>
        </Card>
      )}
    </Accordion>
  );
}

export default ToggleView;
