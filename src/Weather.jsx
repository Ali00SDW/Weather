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
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchWeatherByLocation = async (latitude, longitude) => {
    // الطقس الحالي
    try {
      setInitialLoading(true);
      console.log("Loading started");
      setError("");
      setForecast(null);
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
    } catch (error) {
      console.log(error);
      setError("Un able to connect to weather servicee");
    } finally {
      setInitialLoading(false);
    }
  };

  // ======================================================
  //  تحديد الموقع
  // ======================================================
  const getUserLocation = (onSuccess, onError) => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  useEffect(() => {
    getUserLocation(
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

  function handleLocation() {
    setLocationLoading(true);
    getUserLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
        setLocationLoading(false);
      },
      (error) => {
        console.log(error);
        setError("Location permission is required");
        setLocationLoading(false);
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
    const searchCity = city.trim();
    try {
      setLoading(true);
      setError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);

      const data = await response.json();

      if (!response.ok) {
        setWeather(null);
        setError("City not found");
        return;
      }

      fetchWeatherByLocation(data.coord.lat, data.coord.lon);
    } catch (error) {
      console.log(error);
      setError("Unable to connect to weather service");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // ======================================================
  // اليوم والتاريخ
  // ======================================================
  const formattedDate = forecast?.timezone
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: forecast.timezone,
      }).format(currentTime)
    : "";
  // ======================================================
  // الوقت الحالي
  // ======================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentTime = () => {
    if (!forecast?.timezone) {
      return currentTime;
    }

    return new Date(
      currentTime.toLocaleString("en-US", {
        timeZone: forecast.timezone,
      }),
    );
  };

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
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          color: "#b0c4de",
          gap: 2,
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "18px" },
                fontWeight: "bold",
                mt: 0.5,
              }}
            >
              {getCurrentTime().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "18px" },
                fontWeight: "bold",
                mt: 0.5,
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">
            {weather ? `${weather.name} - ${weather.sys.country}` : ""}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {loading && <Typography>Loading...</Typography>}
          {locationLoading && <Typography>Loading...</Typography>}

          <IconButton
            sx={{ padding: 2, border: "2px solid #b0c4de" }}
            onClick={handleLocation}
            disabled={locationLoading}
          >
            <FaLocationArrow size={20} color="#b0c4de" />
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
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    <IoSearchSharp />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </Box>
      </Box>

      {/* ============================= */}
      {/* current weather */}
      {/* ============================= */}
      <Box
        sx={{
          padding: { xs: 2, md: 5 },
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
          {initialLoading ? (
            <Typography variant="h5">Loading weather...</Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  fontSize: "50px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: "60px", md: "96px" } }}
                >
                  {weather ? `${Math.round(weather.main.temp)}°` : "--"}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "22px", md: "30px" } }}
                >
                  {weather ? weather.weather[0].description : "--"}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "15px", md: "20px" } }}
              >
                Max: {weather ? `${Math.round(weather.main.temp_max)}°` : "--"}{" "}
                | Min:{" "}
                {weather ? `${Math.round(weather.main.temp_min)}°` : "--"}
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "15px", md: "20px" } }}
              >
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
                      fontSize: { xs: "13px", md: "16px" },
                    }}
                  >
                    {item.icon}
                    {item.label}
                    {item.value}
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& svg": {
              width: { xs: "180px", md: "300px" },
              height: "auto",
            },
          }}
        >
          {getWeatherIcon()}
        </Box>
      </Box>

      {/* ============================= */}
      {/* Section: 7-Days & Hourly Forecast side-by-side */}
      {/* ============================= */}
      <Box
        sx={{
          my: 3,
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {/* Hourly weather forecast */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
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
                  gap: { xs: 1, md: 2 },
                  fontSize: { xs: "13px", md: "16px" },
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

        {/* 7-Days weather forecast */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
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
                gap: { xs: 1, md: 2 },
                fontSize: { xs: "13px", md: "16px" },
              }}
            >
              {formatForecastDay(item.date, index)}
              {getWeatherState(item.weatherCode)}
              Max: {Math.round(item.max)}° Min: {Math.round(item.min)}°
            </Box>
          ))}
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
