const express = require("express");
const projectDB = require("../data/helpers/projectModel");
const router = express.Router();

// Get all projects
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

// Get projects for specific ID
router.get("/:id", validateProjectId(), (req, res) => {
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

// Update specific project
router.put("/:id", validateProjectId(), validateProjectBody(), (req, res) => {
  const { id } = req.params;
  projectDB
    .update(id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Failed to edit" });
    });
});

// Create a new project
router.post("/", validateProjectBody(), (req, res) => {
  projectDB.insert(req.body).then((project) => {
    res
      .status(200)
      .json(project)
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).jon({ message: "Error adding project" });
      });
  });
});

// Delete specific project
router.delete("/:id", validateProjectId(), (req, res) => {
  const { id } = req.params;
  projectDB
    .remove(id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Error removing project" });
    });
});

// Custom Middleware
function validateProjectId() {
  return (req, res, next) => {
    const { id } = req.params;
    if (id) {
      next();
    } else {
      res.status(400).json({ errorMessage: "Project not found" });
    }
  };
}

function validateProjectBody() {
  return (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ errorMessage: "Name and description required" });
    }
    next();
  };
}

module.exports = router;
