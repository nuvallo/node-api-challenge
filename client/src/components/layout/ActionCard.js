import React from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

const ActionCard = ({ action }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>{action.notes}</CardTitle>
          <CardText>
            Some quick ActionCard text to build on the card title and make up
            the bulk of the card's content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActionCard;
