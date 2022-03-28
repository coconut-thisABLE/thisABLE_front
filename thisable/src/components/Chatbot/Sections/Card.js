import React from "react";
import { Card, Icon } from "antd";

const { Meta } = Card;

function CardComponent(props) {
  const cardwidth = props.cardInfo.fields.cardWidth.stringValue;
  return (
    <Card
      style={{ width: "300px" }}
      cover={
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={props.cardInfo.fields.link.stringValue}
        >
          <img
            alt={props.cardInfo.fields.description.stringValue}
            src={props.cardInfo.fields.image.stringValue}
            style={{ width: cardwidth, height: "150px", objectFit: "cover" }}
          />
        </a>
      }
    >
      <Meta
        title={props.cardInfo.fields.stack.stringValue}
        description={props.cardInfo.fields.description.stringValue}
      />
    </Card>
  );
}

export default CardComponent;
