import React from "react";
import { useState, useEffect } from "react";
import Detection from "./Object_Detection";
// import { button } from "@mui/material";
import swal from "sweetalert";
import "./ExamPage.css";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

export default function TestPage(props) {
  const TestID = props.TestID;
  console.log(TestID);
  //   console.log("props.location.state : "+props.location.state.student_email)
  const email = localStorage.getItem("email");
  const [exam_id, setExamId] = useState(TestID);
  const [minutes, setMinutes] = useState(parseInt(50));
  const [seconds, setSeconds] = useState(parseInt(50 * 60));
  const [tab_change, setTabChange] = useState(0);
  const [key_press, setKeyPress] = useState(0);
  const [full_screen_exit, setFullScreenExit] = useState(0);
  const [mobile_phone_found, setMobilePhoneFound] = useState(false);
  const [prohibited_object_found, setProhibitedObjectFound] = useState(false);
  const [face_not_visible, setFaceNotVisible] = useState(false);
  const [multiple_faces_visible, setMultipleFacesVisible] = useState(false);
  const [checkedPrevLogs, setCheckedPrevLogs] = useState(false);

  const history = useHistory();

  /**
   * The below 4 functions are helper functions to set state
   * Are passed to the ObjectDetection component to allow it
   * to change state of its parent (This component)
   */
  function update_mobile_phone_found() {
    setMobilePhoneFound(true);
  }
  function update_prohibited_object_found() {
    setProhibitedObjectFound(true);
  }
  function update_face_not_visible() {
    setFaceNotVisible(true);
  }
  function update_multiple_faces_visible() {
    setMultipleFacesVisible(true);
  }
  /**
   * This function sends the current exam logs to the backend
   * to update the database. This function is called every second.
   */
  function sendLogsToServer() {
    axios
      .post("/logs/update", {
        student_email: email,
        exam_code: TestID,
        key_press_count: key_press,
        tab_change_count: tab_change,
        mobile_found: mobile_phone_found,
        face_not_visible: face_not_visible,
        prohibited_object_found: prohibited_object_found,
        multiple_faces_found: multiple_faces_visible,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /**
   * This function is called when test page is opened for the first time
   * It retrieves cheating data from the server if the student had given the exam
   * before and closed the window in between
   */
  function getPreviousLogs() {
    axios
      .get("/logs/logByEmail?exam_id=" + TestID + "&email" + email)
      .then(function (response) {
        console.log(response);
        setKeyPress(parseInt(response.data.key_press_count));
        setTabChange(parseInt(response.data.tab_change_count));
        setMobilePhoneFound(response.data.mobile_found);
        setMultipleFacesVisible(response.data.multiple_faces_found);
        setProhibitedObjectFound(response.data.prohibited_object_found);
        setFaceNotVisible(response.data.face_not_visible);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      // the page is hidden
      setTabChange(tab_change + 1);
      swal("Changed Tab Detected", "Action has been Recorded", "error");
    } else {
      // the page is visible
    }
  }

  /**
   * This function is triggered every time a key is pressed. It the pressed
   * key is Ctrl or Alt it shows an error and updates count
   * @param {Keypress Event} event
   * @returns false if key is Ctrl or Alt else true
   */
  function handleKeyPress(event) {
    if (event.altKey) {
      setKeyPress(key_press + 1);
      swal("Alt Key Press Detected", "Action has been Recorded", "error");
      return false;
    } else if (event.ctrlKey) {
      setKeyPress(key_press + 1);
      swal("Ctrl Key Press Detected", "Action has been Recorded", "error");
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    // Initialising all the event handlers when the page loads
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );
    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
    document.addEventListener("keydown", handleKeyPress, false);

    if (!checkedPrevLogs) {
      getPreviousLogs();
      setCheckedPrevLogs(true);
    }

    // Removing all event handlers when the page exits
    return function cleanup() {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        false
      );
      document.removeEventListener(
        "keydown",
        (event) => handleKeyPress(event),
        false
      );
    };
  });

  /**
   * This useEffect function runs every second. It is used to update
   * the minutes and seconds counter and send cheating data to server
   */
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }

      if (minutes === 1 && seconds === 0) {
        swal("Only 1 Minute Left, Please Submit or attendance wont be marked");
      }

      //   if (seconds <= 0 && minutes <= 0) {
      //     <Redirect to="/thankyou" />;
      //   }
      sendLogsToServer();
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  /**
   * This function is called when the student presses exit exam button
   * since data is shared with the backend every second we just redirect to
   * the dashboard after showing a confirmation message
   */
  function handleSubmit() {
    swal(
      "Thank You for taking the exam. Logs have been shared with your professor"
    );
    history.push("/dashboard");
  }
  return (
    <div style={{ height: "100%" }} className="my_container" id="my_container">
      <div className="detect">
        <Detection
          MobilePhone={update_mobile_phone_found}
          ProhibitedObject={update_prohibited_object_found}
          FaceNotVisible={update_face_not_visible}
          MultipleFacesVisible={update_multiple_faces_visible}
        />
      </div>

      <br />
      

      <div className="instructions">
        <p align="center" style={{ fontSize: "18px" }}>
          To Save Your Attendance :<br /> Kindly Click{" "}
          <strong>Exit Exam</strong> after submitting the exam{" "}
        </p>
      </div>
      <div className="exit">
        <center>
          <button
            style={{ fontSize: "15px" }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSubmit}
          >
            Exit Exam
          </button>
        </center>
      </div>

      {/* <div className="test">
        
      </div> */}
    </div>
  );
}
