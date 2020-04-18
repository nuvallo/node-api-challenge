const express = require("express");
const actionDB = require("../data/helpers/actionModel");
const router = express.Router();

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

router.get("/:id", validateActionId(), (req, res) => {
  const { id } = req.params;
  actionDB
    .get(id)
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({
        errorMessage: "Error retrieving action",
      });
    });
});

router.post("/", (req, res) => {
  actionDB.insert(req.body).then((action) => {
    res
      .status(200)
      .json(action)
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ errorMessage: "Error adding post" });
      });
  });
});

router.put("/:id", validateAction(), (req, res) => {
  actionDB
    .update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ errorMessage: "Failed to edit" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Error removing action" });
    });
});

function validateActionId() {
  return (req, res, next) => {
    const { id } = req.params;
    if (id) {
      next();
    } else {
      res.status(400).json({ errorMessage: "Action not found" });
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
