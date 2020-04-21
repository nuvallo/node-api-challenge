import React, { Fragment } from "react";
import axios from "axios";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

const ProjectCard = ({ project }) => {
  const deleteRequest = (projectID) => {
    axios
      .delete(`http://localhost:2000/api/projects/${projectID}`)
      .then((res) => {
        console.log("message: Project Deleted ");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteRequest(project.id);
  };

  return (
    <Fragment>
      <Card className="card">
        <CardBody>
          <CardTitle>
            <strong>Project Name: </strong>
            {project.name}
          </CardTitle>

          <CardText>{project.description}</CardText>
          <Button>Edit</Button>
          <Button onClick={deleteHandler}>Delete</Button>
          <Button>View Actions</Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProjectCard;
