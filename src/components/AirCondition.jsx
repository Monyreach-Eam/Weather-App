import React from "react";
import "./style/AirCondition.css";

const AirCondition = ({ airConditionData }) => {
  return (
    <div className="air-condition-container">
      <h3>Air Condition</h3>
      {airConditionData && (
        <div className="air-condition-info">
          <p>Quality: {airConditionData.quality}</p>
          <p>PM2.5: {airConditionData.pm25}</p>
        </div>
      )}
    </div>
  );
};

export default AirCondition;
