const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const router = express.Router();

//Get all projects
router.get("/", (req, res) => {
  projectDB
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({
        message: "Error retrieving Projects",
      });
    });
});

//Get projects for specific ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectDB
    .get(id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({
        message: "Error retrieving project",
      });
    });
});

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ errorMessage: " Name and Description Required" });
  }
  projectDB
    .update(req.params.id, req.body)
    .then((project) => {
      project
        ? res.status(200).json(project)
        : res.status(404).json({ errorMessage: "Error retrieving post" });
    })

    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Failed to edit" });
    });
});

router.post("/", (req, res) => {
  projectDB.insert(req.body).then((project) => {
    res
      .status(200)
      .json(project)
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).jon({ message: "Error adding post" });
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectDB
    .remove(id)
    .then((project) => {
      res.json(project);
    })
    .catch(() => {
      res.status(500).json;
    });
});

module.exports = router;
