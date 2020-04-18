import React, { useState, Fragment } from "react";
import axios from "axios";
import ActionCard from "./ActionCard";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

const ProjectCard = ({ project }) => {
  const [actions, setActions] = useState([]);

  const deleteRequest = (projectID) => {
    axios
      .delete(`http://localhost:5000/api/projects/${projectID}`)
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

  // const actionsHandler = (e) => {
  //   const project_id = project.id;
  //   console.log(project_id);
  //   e.preventDefault();

  //   axios
  //     .get(`http://localhost:5000/api/projects/${project_id}/actions`)
  //     .then((res) => {
  //       console.log("Actions", res.data);
  //       setActions(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //     });

  //   return (
  //     <Fragment>
  //       {actions.map((action) => {
  //         return <ActionCard action={action} key={action.id} />;
  //       })}
  //     </Fragment>
  //   );
  // };

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
