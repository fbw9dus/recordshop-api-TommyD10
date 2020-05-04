const express = require("express");
const router = express.Router();
const User = require("../models/User")
const auth= require("../middleware/authenticator")

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord
} = require("../controllers/recordsController");

router
  .route("/")
  .get(getRecords)
  .post(auth, addRecord);
  

router
  .route("/:id")
  .get(getRecord)
  .delete(auth, deleteRecord)
  .put(auth, updateRecord);

module.exports = router;