import React, { useEffect, useState } from "react";
import { Col } from "antd";
import "./StudentStatus.css";
import axios from "axios";
// import LogsTable from "../../result/LogsTable";
export default function StudentStatus(props) {
  const student = props.student;
  const className = props.className;
  const testName = props.testName;
  const [data, setData] = useState({});
  const email = localStorage.getItem("email");
  const TestId = props.TestId;
  console.log(TestId);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "/logs/LogByEmail?exam_id=" + TestId + "&email=" + "test@gmail.com"
        );
        setData(res.data);
        console.log(res.data);
        // console.log(res);
        // var curr_logs = [];
        // var obj = new Object();
        // obj.s_no = 1;
        // obj.student_name = res.data.student_name;
        // obj.student_email = res.data.student_email;
        // obj.tab_change_count = res.data.tab_change_count;
        // obj.key_press_count = res.data.key_press_count;
        // obj.face_not_visible = res.data.face_not_visible;
        // obj.multiple_faces_found = res.data.multiple_faces_found;
        // obj.mobile_found = res.data.mobile_found;
        // obj.prohibited_object_found = res.data.prohibited_object_found;
        // curr_logs = [...curr_logs, obj];
        // console.log(res.data.mobile_found);
      } catch {}
    };
    getProduct();
  }, [email, TestId]);
  console.log("Data : " + data.student_email);
  return (
    <>
      <Col
        className="gutter-row gutter-col-adder"
        sm={24}
        xs={24}
        md={6}
        lg={6}
      >
        <div className="student__status__wrapper">
          <div className="status__header">
            <p className="status__header__heading">
              {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
            </p>
          </div>
          <div className="student__status__body">
            <div className="status__test">
              Test Name: <span className="status__testname"> {testName}</span>
            </div>
            <div className="status__test__total">
              Total Marks:{" "}
              <span className="status__testname">{student.totalMarks}</span>
            </div>
            <div className="status__test__obtained">
              Obtained Marks:{" "}
              <span className="status__testname">{student.correct}</span>
            </div>
            <div className="status__test__correct">
              Correct Answers:{" "}
              <span className="status__testname success-wihtoutFont">
                {student.correct}
              </span>
            </div>
            <div className="status__test__wrong">
              Wrong Answers:{" "}
              <span className="status__testname danger">{student.wrong}</span>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}
