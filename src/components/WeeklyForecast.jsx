import React from "react";
import { Typography, Paper } from "@mui/material";
import "./style/WeeklyForecast.css";

const WeeklyForecast = ({ weeklyData }) => {
  return (
    <Paper
      elevation={3}
      className="weekly-forecast-container"
      style={{ padding: 16 }}
    >
      <Typography variant="h6">Weekly Forecast</Typography>
      {weeklyData && weeklyData.length > 0 && (
        <div className="weekly-forecast-info">
          {weeklyData.map((day, index) => (
            <div key={index} className="daily-item">
              <Typography variant="body1">{day.day}</Typography>
              <Typography variant="body1">Temperature: {day.temp}°C</Typography>
              <Typography variant="body1">Weather: {day.weather}</Typography>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default WeeklyForecast;
