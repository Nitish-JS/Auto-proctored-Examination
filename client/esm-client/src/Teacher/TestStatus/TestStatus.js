import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import StudentStatus from "./StudentStatus";
import LogsTable from "./LogsTable";

function TestStatus(props) {
  console.log(props.selectedTest);
  const style = { background: "#0092ff", padding: "8px 0" };
  const students = props.selectedTest.submitBy;
  const className = props.selectedTest.className;
  const testName = props.selectedTest.testName;
  const TestId = props.selectedTest._id;
  console.log("selectedTest : " + props.selectedTest._id);
  return (
    <>
      <div className="container student__status">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {students.length > 0 &&
            students.map((student, index) => (
              <StudentStatus
                className={className}
                testName={testName}
                student={student}
                key={index}
                TestId={TestId}
              />
            ))}
        </Row>
        <LogsTable TestId={TestId} />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedAssignedTestData,
  };
};

export default connect(mapStateToProps, null)(TestStatus);
