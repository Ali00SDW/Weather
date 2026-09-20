import WeatherMap from "./WeatherMap";
import {
  Container,
  Box,
  Typography,
  TextField,
  Card,
  IconButton,
  Divider,
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
  const formattedDate = new Intl.DateTimeFormat("EG", {
    weekday: "long", // اسم اليوم (الثلاثاء، السبت، إلخ)
    day: "numeric", // رقم اليوم (26)
    month: "long", // اسم الشهر (أكتوبر)
    year: "numeric", // السنة (2024)
  }).format(today);

  // ======================================================
  // مصفوفة الايام التالية
  // ======================================================
  const days = [
    {
      day: "Friday",
      icon: <WiFog size={50} />,
      state: "Foggy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Saturday",
      icon: <WiRain size={50} />,
      state: "Rainy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Sunday",
      icon: <WiDaySunny size={50} />,
      state: "Sunny",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Monday",
      icon: <WiCloud size={50} />,
      state: "Cloudy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Tuesday",
      icon: <WiThunderstorm size={50} />,
      state: "Stormy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Wednesday",
      icon: <WiSnow size={50} />,
      state: "Snowing",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Thursday",
      icon: <WiCloudy size={50} />,
      state: "Cloudy",
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
  ];

  // ======================================================
  // مصفوفة معلومات طقس اليوم
  // ======================================================
  const moreInfo = [
    {
      label: "humidity: ",
      value: "65%",
      icon: <WiHumidity size={28} />,
    },
    {
      label: "Wind Speed: ",
      value: "15 km/h",
      icon: <WiWindy size={28} />,
    },
    {
      label: "UV: ",
      value: "5 (Medium)",
      icon: <WiDaySunny size={28} />,
    },
    {
      label: "Possible Rain: ",
      value: "50%",
      icon: <WiRain size={28} />,
    },
  ];
  return (
    <Container>
      {/* ============================= */}
      {/* search bar Box */}
      {/* ============================= */}

      <Container
        sx={{
          my: 2,
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4">Today Weather</Typography>
          <Typography>{formattedDate}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">Syria</Typography>

          <IconButton sx={{ padding: 2, border: "1px solid" }}>
            <FaLocationArrow size={20} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <TextField label="Choose a City" />
          <IconButton sx={{ border: "1px solid", borderRadius: "3px" }}>
            <IoSearchSharp size={37} />
          </IconButton>
        </Box>
      </Container>

      {/* ============================= */}
      {/* current weather */}
      {/* ============================= */}

      <Container
        sx={{
          padding: 1,
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 2,
        }}
      >
        {/* ======= current details */}
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
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {moreInfo.map((moreInfo, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  bottom: -10,
                }}
              >
                {moreInfo.icon}
                {moreInfo.label}
                {moreInfo.value}
              </Box>
            ))}
          </Box>
        </Box>
        {/* ======= Weather Now Icon */}
        <WiDayCloudy size={300} />
      </Container>

      {/* ============================= */}
      {/* long term Box */}
      {/* ============================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            my: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            background: "rgba(255, 255, 255, 0.16)",
            borderRadius: 2
          }}
        >
          <Typography variant="h6">7-Days weather forecast</Typography>
          <Divider/>
          {days.map((days, index) => {
            return (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  background: "rgba(255, 255, 255, 0.16)",
                }}
              >
                <Typography>{days.day}</Typography>
                <Typography>{days.icon}</Typography>
                <Typography>{days.state}</Typography>
                <Typography>
                  {days.maxDegree}
                  {` / `}
                  {days.minDegree}
                </Typography>
              </Card>
            );
          })}
        </Box>
        <Box sx={{ background: "rgba(255, 255, 255, 0.16)", borderRadius: 2 }}>
          <WeatherMap />
        </Box>
      </Box>
    </Container>
  );
}
