import React from "react";
import "./style/WeeklyForecast.css";

const WeeklyForecast = ({ weeklyData }) => {
  return (
    <div className="weekly-forecast-container">
      <h3>Weekly Forecast</h3>
      {weeklyData && weeklyData.length > 0 && (
        <div className="weekly-forecast-info">
          {weeklyData.map((day, index) => (
            <div key={index} className="daily-item">
              <p>{day.day}</p>
              <p>Temperature: {day.temp}°C</p>
              <p>Weather: {day.weather}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyForecast;
