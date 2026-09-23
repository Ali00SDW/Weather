import WeatherMap from "./WeatherMap";
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiCloudy,
  WiDayCloudy,
  WiHumidity,
  WiWindy,
} from "react-icons/wi";
import { FaLocationArrow } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);

  const fetchWeatherByLocation = async (latitude, longitude) => {
    // الطقس الحالي
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      setError("Unable to get weather");
      return;
    }

    setWeather(weatherData);

    // توقعات الأيام والساعات
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&timezone=auto`;

    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      setError("Unable to get forecast");
      return;
    }

    const forecastData = await forecastResponse.json();

    setForecast(forecastData);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        console.log(error);
        setError("Location permission is required");
      },
    );
  }, []);

  // ======================================================
  // زر تحديد الموقع
  // ======================================================

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        console.log(error);
        setError("Location permission is required");
      },
    );
  }

  // ======================================================
  // زر البحث عن مدينة ومفتاح API
  // ======================================================

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = async () => {
    if (!city.trim()) {
      return;
    }
    setError("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      setWeather(null);
      setError("City not found");
      return;
    }

    setWeather(data);
    fetchWeatherByLocation(data.coord.lat, data.coord.lon);
  };
  // ======================================================
  // اليوم والتاريخ
  // ======================================================
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  // ======================================================
  // دالة تُرجِع الأيقونة والنص مدمجين بناءً على state
  // ======================================================

  const getWeatherState = (code) => {
    if (code === 0) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WiDaySunny size={35} />
          <span>Sunny</span>
        </Box>
      );
    }

    if (code >= 1 && code <= 3) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WiCloudy size={35} />
          <span>Cloudy</span>
        </Box>
      );
    }

    if (code >= 45 && code <= 48) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WiFog size={35} />
          <span>Foggy</span>
        </Box>
      );
    }

    if (code >= 51 && code <= 67) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WiRain size={35} />
          <span>Rainy</span>
        </Box>
      );
    }

    if (code >= 71 && code <= 86) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WiSnow size={35} />
          <span>Snowing</span>
        </Box>
      );
    }

    if (code >= 95 && code <= 99) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WiThunderstorm size={35} />
          <span>Stormy</span>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WiCloud size={35} />
        <span>Cloudy</span>
      </Box>
    );
  };
  // =======================================================
  // ايام طقس 7ايام
  // =======================================================
  const formatForecastDay = (date, index) => {
    if (index === 0) {
      return "Today";
    }

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  // ======================================================
  // طقس الساعات
  // ======================================================

  const hourlyData = forecast
    ? forecast.hourly.time.map((time, index) => ({
        time: time,
        temp: forecast.hourly.temperature_2m[index],
        weatherCode: forecast.hourly.weather_code[index],
      }))
    : [];

  const now = new Date();

  const displayedHourlyData = hourlyData
    .filter((item) => new Date(item.time) >= now)
    .filter((_, index) => index % 3 === 0)
    .slice(0, 7);

  // ======================================================
  // ايقونة طقس اليوم
  // ======================================================

  const getWeatherIcon = () => {
    if (!weather) {
      return null;
    }
    switch (weather.weather[0].main) {
      case "Clear":
        return <WiDaySunny size={300} />;

      case "Clouds":
        return <WiDayCloudy size={300} />;

      case "Rain":
        return <WiRain size={300} />;

      default:
        return <WiDayCloudy size={300} />;
    }
  };

  // ======================================================
  // مصفوفة الايام التالية
  // ======================================================

  const dailyForecast = forecast
    ? forecast.daily.time.map((date, index) => ({
        date: date,
        max: forecast.daily.temperature_2m_max[index],
        min: forecast.daily.temperature_2m_min[index],
        weatherCode: forecast.daily.weather_code[index],
      }))
    : [];

  // ======================================================
  // مصفوفة معلومات طقس اليوم
  // ======================================================
  const moreInfo = [
    {
      label: "Humidity: ",
      value: weather ? `${weather.main.humidity}%` : "--",
      icon: <WiHumidity size={28} />,
    },
    {
      label: "Wind Speed: ",
      value: weather ? `${Math.round(weather.wind.speed * 3.6)} km/h` : "--",
      icon: <WiWindy size={28} />,
    },
  ];

  return (
    <Container>
      {/* ============================= */}
      {/* search bar Box */}
      {/* ============================= */}
      <Box
        sx={{
          my: 2,
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          color: "#b0c4de",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
            }}
          >
            Today Weather
          </Typography>
          <Typography>{formattedDate}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">
            {weather ? `${weather.name} - ${weather.sys.country}` : ""}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}

          <IconButton sx={{ padding: 2, border: "2px solid #b0c4de" }}>
            <FaLocationArrow
              size={20}
              color="#b0c4de"
              onClick={handleLocation}
            />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <TextField
            label="Choose a City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "#b0c4de",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid #b0c4de",
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    sx={{
                      color: "#b0c4de",
                      transition: "0.2s",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    <IoSearchSharp onClick={handleSearch} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* ============================= */}
      {/* current weather */}
      {/* ============================= */}
      <Box
        sx={{
          padding: 5,
          background: "#b0c4de",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "baseline", fontSize: "50px" }}
          >
            <Typography variant="h1">
              {weather ? `${Math.round(weather.main.temp)}°` : "--"}
            </Typography>
            <Typography variant="h3">
              {weather ? weather.weather[0].description : "--"}
            </Typography>
          </Box>
          <Typography variant="h6">
            Max: {weather ? `${Math.round(weather.main.temp_max)}°` : "--"} |
            Min: {weather ? `${Math.round(weather.main.temp_min)}°` : "--"}
          </Typography>
          <Typography variant="h6">
            Feels Like:{" "}
            {weather ? `${Math.round(weather.main.feels_like)}°` : "--"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {moreInfo.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  bottom: -10,
                }}
              >
                {item.icon}
                {item.label}
                {item.value}
              </Box>
            ))}
          </Box>
        </Box>
        {getWeatherIcon()}
      </Box>

      {/* ============================= */}
      {/* Section: 7-Days & Hourly Forecast side-by-side */}
      {/* ============================= */}
      <Box
        sx={{
          my: 3,
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {/* 7-Days weather forecast */}
        <Box
          sx={{
            width: "50%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            background: "#b0c4de",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            7-Days weather forecast
          </Typography>
          <Divider />
          {dailyForecast.map((item, index) => (
            <Box
              key={item.date}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                boxShadow: "0px 0px 5px 0.1px #000000",
                p: 1,
                borderRadius: 1,
              }}
            >
              {formatForecastDay(item.date, index)}
              {getWeatherState(item.weatherCode)}
              Max: {Math.round(item.max)}° Min: {Math.round(item.min)}°
            </Box>
          ))}
        </Box>

        {/* Hourly weather forecast */}
        <Box
          sx={{
            width: "50%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            background: "#b0c4de",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Hourly Forecast Today
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              height: "100%",
              justifyContent: "space-around",
            }}
          >
            {displayedHourlyData.map((item) => (
              <Box
                key={item.time}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  boxShadow: "0px 0px 5px 0.1px #000000",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ width: "60px" }}>
                  {new Date(item.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </Typography>
                {getWeatherState(item.weatherCode)}
                {Math.round(item.temp)}°
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ============================= */}
      {/* Section: Weather Map (underneath) */}
      {/* ============================= */}
      <Box sx={{ my: 3, width: "100%" }}>
        <WeatherMap />
      </Box>
    </Container>
  );
}
