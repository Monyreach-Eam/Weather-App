import React from "react";
import { Typography, Paper } from "@mui/material";
import "./style/AirCondition.css";

const AirCondition = ({ airConditionData }) => {
  return (
    <Paper
      elevation={3}
      className="air-condition-container"
      style={{ padding: 16 }}
    >
      <Typography variant="h6">Air Condition</Typography>
      {airConditionData && (
        <div className="air-condition-info">
          <Typography variant="body1">
            Quality: {airConditionData.quality}
          </Typography>
          <Typography variant="body1">
            PM2.5: {airConditionData.pm25}
          </Typography>
        </div>
      )}
    </Paper>
  );
};

export default AirCondition;
