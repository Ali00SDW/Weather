import {
  Container,
  Box,
  Typography,
  TextField,
  Card,
  IconButton,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
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

import { useState } from "react";
export default function Weather() {
  const [location, setLocation] = useState(false);

  function handleLocationClick() {}
  // الحصول على تاريخ اليوم الحالي
  const today = new Date();

  // تنسيق التاريخ باللغة العربية
  const formattedDate = new Intl.DateTimeFormat("EG", {
    weekday: "long", // اسم اليوم (الثلاثاء، السبت، إلخ)
    day: "numeric", // رقم اليوم (26)
    month: "long", // اسم الشهر (أكتوبر)
    year: "numeric", // السنة (2024)
  }).format(today);

  const days = [
    {
      day: "Friday",
      icon: <WiFog size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Saturday",
      icon: <WiRain size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Sunday",
      icon: <WiDaySunny size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Monday",
      icon: <WiCloud size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Tuesday",
      icon: <WiThunderstorm size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Wednesday",
      icon: <WiSnow size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
    {
      day: "Thursday",
      icon: <WiCloudy size={50} />,
      maxDegree: `22\u00b0`,
      minDegree: `10\u00b0`,
    },
  ];

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

      <Box
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
            <FaLocationArrow size={20} onClick={handleLocationClick} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <TextField label="Choose a City" />
          <IconButton sx={{border: "1px solid", borderRadius: "3px"}}>
            <IoSearchSharp size={37} />
          </IconButton>
        </Box>
      </Box>

      {/* ============================= */}
      {/* current weather */}
      {/* ============================= */}

      <Box
        sx={{
          my: 2,
          padding: 1,
          backgroundColor: "",
          display: "flex",
          justifyContent: "space-evenly",
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
            <Typography variant="h3">{`29\u00b0`}</Typography>
            <Typography variant="h5">Partly Cloud</Typography>
          </Box>
          <Typography>{`Max: 32\u00b0 | Min: 21\u00b0`}</Typography>
          <Typography>{`Feels Like: 30\u00b0`}</Typography>
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
        <WiDayCloudy size={250} />
      </Box>

      {/* ============================= */}
      {/* long term Box */}
      {/* ============================= */}

      <Box
        sx={{
          my: 2,
          padding: 2,
          backgroundColor: "",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {days.map((days, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: "150px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography>{days.day}</Typography>
              <Typography>{days.icon}</Typography>
              <Typography>
                {days.maxDegree}
                {` / `}
                {days.minDegree}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
