import React from "react";
import "./style/HourlyForecast.css";

const HourlyForecast = ({ hourlyData }) => {
  // Function to format time in 12-hour format without minutes
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = ((date.getHours() + 11) % 12) + 1;
    const ampm = hours >= 12 ? "PM" : "AM";

    // Format the time as hh AM/PM
    return `${hours.toString().padStart(2, "")} ${ampm}`;
  };

  return (
    <div className="hourly-forecast-container">
      <h3>Hourly Forecast</h3>
      {hourlyData && hourlyData.length > 0 && (
        <div className="hourly-forecast-info">
          {hourlyData.slice(0, 5).map((hour, index) => (
            <div key={index} className="hourly-item">
              <p>{formatTime(hour.dt)}</p>
              <p>{hour.temp}°C</p>
              <p>{hour.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
