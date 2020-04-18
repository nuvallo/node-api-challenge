import React from "react";
import ProjectCard from "../layout/ProjectCard";

const Homepage = ({ projects }) => {
  return (
    <div className="home-container">
      <div className="card-container">
        {projects.map((project) => {
          return <ProjectCard project={project} key={project.id} />;
        })}
      </div>
    </div>
  );
};

export default Homepage;
