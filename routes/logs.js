const express = require("express");
const router = express.Router();

const Logs = require("../model/Logs");
router.post("/update", (req, res) => {
  Logs.findOneAndUpdate(
    { exam_code: req.body.exam_code, student_email: req.body.student_email },
    req.body,
    { upsert: true },
    function (err, doc) {
      if (err) {
        return res.status(400).json("Error Occoured");
      }
      return res.status(200).json("Success");
    }
  );
});

router.get("/logByEmail", (req, res) => {
  const req_exam_id = req.query.exam_id;
  const email = req.query.email;

  Logs.findOne({
    exam_code: req_exam_id,
    student_email: email,
  }).then((log) => {
    if (!log) {
      return res.status(400).json("Student Taking exam for the first time");
    }
    return res.status(200).json(log);
  });
});
router.post("/allData", (req, res) => {
  Logs.find({ exam_code: req.body.exam_code }).then((Logs) => {
    if (!Logs) {
      console.log("Logs " + Logs);
      return res.status(400).json("Student Taking exam for the first time");
    }
    return res.status(200).json(Logs);
  });
});
module.exports = router;
