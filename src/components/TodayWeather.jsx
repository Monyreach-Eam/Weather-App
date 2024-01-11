import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import HourlyForecast from "./HourlyForecast";
import AirCondition from "./AirCondition";
import WeeklyForecast from "./WeeklyForecast";

const TodayWeather = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [airConditionData, setAirConditionData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const apiKey = "83add739fcef4f20e6273582957d429d";
          const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;

          const weatherResponse = await axios.get(weatherApiUrl);
          setWeatherData(weatherResponse.data);

          const lat = weatherResponse.data.coord.lat;
          const lon = weatherResponse.data.coord.lon;
          const hourlyApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`;

          const hourlyResponse = await axios.get(hourlyApiUrl);
          const formattedHourlyData = hourlyResponse.data.hourly
            .slice(0, 5)
            .map((hour) => {
              return {
                ...hour,
                temp: Math.round(hour.temp),
              };
            });

          setHourlyData(formattedHourlyData);

          setAirConditionData({
            quality: "Good",
            pm25: 10,
            pm10: 20,
          });

          const weeklyApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=metric`;

          const weeklyResponse = await axios.get(weeklyApiUrl);
          const formattedWeeklyData = weeklyResponse.data.list.map((day) => {
            return {
              day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              }),
              temp: Math.round(day.temp.day),
              weather: day.weather[0].description,
            };
          });

          setWeeklyData(formattedWeeklyData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setWeatherData(null);
        setHourlyData(null);
        setAirConditionData(null);
        setWeeklyData(null);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="today-weather">
      <SearchBar setSearchQuery={setSearchQuery} />
      {weatherData && (
        <div className="weather-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
      {airConditionData && <AirCondition airConditionData={airConditionData} />}
      {weeklyData && <WeeklyForecast weeklyData={weeklyData} />}
    </div>
  );
};

export default TodayWeather;
