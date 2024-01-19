import React from "react";
import { Typography, Paper } from "@mui/material";
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

  // Function to set weather image based on weather description
  const setWeatherImage = (weatherDescription) => {
    switch (weatherDescription) {
      case "Clear":
        return "/images/clear.png";
      case "Rain":
        return "/images/rain.png";
      case "Snow":
        return "/images/snow.png";
      case "Clouds":
        return "/images/cloud.png";
      case "Haze":
        return "/images/mist.png"; //
      default:
        return "";
    }
  };

  return (
    <Paper
      elevation={3}
      className="hourly-forecast-container"
      style={{ padding: 16 }}
    >
      <Typography variant="h6">Hourly Forecast</Typography>
      {hourlyData && hourlyData.length > 0 && (
        <div className="hourly-forecast-info">
          {hourlyData.slice(0, 5).map((hour, index) => (
            <div key={index} className="hourly-item">
              <Typography variant="body1">{formatTime(hour.dt)}</Typography>
              <Typography variant="body1">{hour.temp}°C</Typography>
              <img
                src={setWeatherImage(hour.weather[0].main)}
                alt={hour.weather[0].main}
              />
              <Typography variant="body1">
                {hour.weather[0].description}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default HourlyForecast;
