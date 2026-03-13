const Assessment = require("../models/Assessment");

// submit assessment
exports.submitAssessment = async (req, res) => {

  try {

    const { userId, answers } = req.body;

    // calculate score
    const score = answers.reduce((a, b) => a + b, 0);

    let moodLevel;

    if (score <= 10) moodLevel = "Good";
    else if (score <= 20) moodLevel = "Moderate Stress";
    else moodLevel = "High Stress";

    const newAssessment = new Assessment({
      userId,
      answers,
      score,
      moodLevel
    });

    await newAssessment.save();

    res.json({
      message: "Assessment submitted",
      score,
      moodLevel
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// get history
exports.getHistory = async (req, res) => {

  try {

    const assessments = await Assessment.find({
      userId: req.params.userId
    });

    res.json(assessments);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};