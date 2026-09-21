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
  WiThermometer,
} from "react-icons/wi";
import { FaLocationArrow } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

export default function Weather() {
  // =======================================================
  // اليوم والتاريخ
  // =======================================================
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
  const renderWeatherState = (state) => {
    const icons = {
      Foggy: <WiFog size={35} />,
      Rainy: <WiRain size={35} />,
      Sunny: <WiDaySunny size={35} />,
      Cloudy: <WiCloudy size={35} />,
      Stormy: <WiThunderstorm size={35} />,
      Snowing: <WiSnow size={35} />,
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icons[state] || <WiCloud size={35} />}
        <span>{state}</span>
      </Box>
    );
  };

  // ======================================================
  // مصفوفة طقس اليوم بالساعات (Hourly Forecast)
  // ======================================================
  const hourlyForecast = [
    { time: "12 PM", temp: `29\u00b0`, state: "Sunny" },
    { time: "03 PM", temp: `31\u00b0`, state: "Cloudy" },
    { time: "06 PM", temp: `27\u00b0`, state: "Rainy" },
    { time: "09 PM", temp: `24\u00b0`, state: "Cloudy" },
    { time: "12 AM", temp: `21\u00b0`, state: "Foggy" },
    { time: "03 AM", temp: `19\u00b0`, state: "Foggy" },
    { time: "06 AM", temp: `20\u00b0`, state: "Sunny" },
  ];

  // ======================================================
  // مصفوفة الايام التالية
  // ======================================================
  const days = [
    {
      day: "Friday",
      state: "Foggy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Saturday",
      state: "Rainy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Sunday",
      state: "Sunny",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Monday",
      state: "Cloudy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Tuesday",
      state: "Stormy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Wednesday",
      state: "Snowing",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Thursday",
      state: "Cloudy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
  ];

  // ======================================================
  // مصفوفة معلومات طقس اليوم
  // ======================================================
  const moreInfo = [
    { label: "humidity: ", value: "65%", icon: <WiHumidity size={28} /> },
    { label: "Wind Speed: ", value: "15 km/h", icon: <WiWindy size={28} /> },
    { label: "UV: ", value: "(5) Medium", icon: <WiDaySunny size={28} /> },
    { label: "Possible Rain: ", value: "50%", icon: <WiRain size={28} /> },
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
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{
              textShadow: "1px 1px 20px #cde0ff",
              mb: 2,
            }}
          >
            Today Weather
          </Typography>
          <Typography>{formattedDate}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">Syria</Typography>
          <IconButton sx={{ padding: 2, border: "2px solid #798296" }}>
            <FaLocationArrow size={20} color="#798296" />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <TextField
            label="Choose a City"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "#798296",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid #798296",
                },
                "&:hover fieldset": {
                  borderColor: "#464b56",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    sx={{
                      color: "#798296",
                      transition: "0.2s",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    <IoSearchSharp />
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
          background: "#464b56",
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
            <Typography variant="h1">{`29\u00b0`}</Typography>
            <Typography variant="h3">Partly Cloud</Typography>
          </Box>
          <Typography variant="h6">{`Max: 32\u00b0 | Min: 21\u00b0`}</Typography>
          <Typography variant="h6">{`Feels Like: 30\u00b0`}</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {moreInfo.map((item, index) => (
              <Box
                key={index}
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
        <WiDayCloudy size={300} />
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
            background: "#464b56",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            7-Days weather forecast
          </Typography>
          <Divider />
          {days.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                background: "#666d7e",
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography sx={{ width: "80px" }}>{item.day}</Typography>
              {renderWeatherState(item.state)}
              <Typography>
                {item.maxDegree} / {item.minDegree}
              </Typography>
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
            background: "#464b56",
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
            {hourlyForecast.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  background: "#666d7e",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ width: "60px" }}>{item.time}</Typography>
                {renderWeatherState(item.state)}
                <Typography>{item.temp}</Typography>
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
