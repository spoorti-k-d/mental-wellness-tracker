const express = require("express");
const router = express.Router();

const {
  submitAssessment,
  getHistory
} = require("../controllers/assessmentController");

router.post("/submit", submitAssessment);
router.get("/history/:userId", getHistory);

module.exports = router;