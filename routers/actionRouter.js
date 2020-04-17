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
        message: "Error retrieving actions",
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  actionDB
    .get(id)
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({
        message: "Error retrieving action",
      });
    });
});

module.exports = router;
