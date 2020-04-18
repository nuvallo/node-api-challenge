const express = require("express");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

// Get actions
router.get("/", (req, res) => {
  actionDB
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({
        errorMessage: "Error retrieving actions",
      });
    });
});

// Get a specific action
router.get("/:id", validateActionId(), (req, res) => {
  const { id } = req.params;
  actionDB
    .get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({
        errorMessage: "Error retrieving action",
      });
    });
});

// Create a new action
router.post("/", validateAction(), (req, res) => {
  actionDB
    .insert(req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Error creating action" });
    });
});

// Update specific action
router.put("/:id", validateActionId(), validateAction(), (req, res) => {
  const { id } = req.params;
  actionDB
    .update(id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Failed to edit action" });
    });
});

// Delete specific action
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionDB
    .remove(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Error removing action" });
    });
});

// Custom Middleware
function validateActionId() {
  return (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ errorMessage: "Action not found" });
    } else {
      next();
    }
  };
}

function validateAction() {
  return (req, res, next) => {
    const { description, notes } = req.body;
    if (!description || !notes) {
      res
        .status(400)
        .json({ errorMessage: "Description and notes are Required" });
    }
    next();
  };
}

module.exports = router;
