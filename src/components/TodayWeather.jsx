import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Paper } from "@mui/material";
import HourlyForecast from "./HourlyForecast";
import AirCondition from "./AirCondition";
import WeeklyForecast from "./WeeklyForecast";
import SearchBar from "./SearchBar";
import "./style/TodayWeather.css";

const TodayWeather = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [airConditionData, setAirConditionData] = useState({
    quality: "Good",
    pm25: 10,
    pm10: 20,
  });
  const [weeklyData, setWeeklyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherImage, setWeatherImage] = useState("");

  const fetchData = async (query) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!query.trim()) {
        setIsLoading(false);
        return;
      }

      const apiKey = "83add739fcef4f20e6273582957d429d";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

      const response = await axios.get(weatherApiUrl);

      const { lat, lon } = response.data.coord;
      const onecallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}&units=metric`;

      const onecallResponse = await axios.get(onecallApiUrl);

      setWeatherData(response.data);

      const formattedHourlyData = onecallResponse.data.hourly
        .slice(0, 5)
        .map((hour) => ({ ...hour, temp: Math.round(hour.temp) }));

      setHourlyData(formattedHourlyData);

      const formattedWeeklyData = onecallResponse.data.daily.map((day) => ({
        day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        temp: Math.round(day.temp.day),
        weather: day.weather[0].description,
      }));

      setWeeklyData(formattedWeeklyData);

      switch (onecallResponse.data.current.weather[0].main) {
        case "Clear":
          setWeatherImage("clear.png");
          break;
        case "Rain":
          setWeatherImage("rain.png");
          break;
        case "Snow":
          setWeatherImage("snow.png");
          break;
        case "Clouds":
          setWeatherImage("cloud.png");
          break;
        case "Haze":
          setWeatherImage("mist.png");
          break;
        default:
          setWeatherImage("");
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchData(searchQuery);
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  return (
    <div className="today-weather">
      <SearchBar setSearchQuery={setSearchQuery} />
      {isLoading && (
        <Typography className="loading-text">Loading...</Typography>
      )}
      {error && <Typography className="error-text">Error: {error}</Typography>}
      {weatherData && (
        <Paper elevation={3} className="paper-container">
          <Typography variant="h6" className="weather-info">
            {weatherData.name}, {weatherData.sys.country}
          </Typography>
          <Typography className="weather-info">
            Temperature: {weatherData.main.temp}°C
          </Typography>
          <Typography className="weather-info">
            Weather: {weatherData.weather[0].description}
          </Typography>
          {weatherImage && (
            <img
              src={`/images/${weatherImage}`}
              alt="Weather"
              className="weather-image"
            />
          )}
        </Paper>
      )}
      {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
      {airConditionData && <AirCondition airConditionData={airConditionData} />}
      {weeklyData && <WeeklyForecast weeklyData={weeklyData} />}
    </div>
  );
};

export default TodayWeather;
