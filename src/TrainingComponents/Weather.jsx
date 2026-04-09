import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  Grid,
  IconButton,
  CircularProgress,
  TextField,
  InputAdornment,
  Switch,
} from "@mui/material";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed"; // للضغط الجوي
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiCloudy,
} from "react-icons/wi";
import FeelsIcon from "@mui/icons-material/DeviceThermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [coords, setCoords] = useState(null); // سيتم تحديده تلقائيًا
  const [unit, setUnit] = useState("C"); // تبديل بين C و F

  // جلب إحداثيات المدينة عند البحث
  const searchCity = async (e) => {
    if (e.key === "Enter" && searchInput) {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchInput}`,
      );
      if (res.data.length > 0) {
        const { lat, lon, display_name } = res.data[0];
        setCoords({ lat, lon });
        setCity(display_name.split(",")[0]);
      }
    }
  };
  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      );
      const cityName =
        res.data.address.city ||
        res.data.address.town ||
        res.data.address.village ||
        res.data.address.county ||
        "Unknown location";
      setCity(cityName);
    } catch (error) {
      console.log("Error fetching city:", error);
      setCity("Unknown location");
    }
  };
  const fetchWeather = async () => {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`,
    );
    setWeather(res.data);
  };
  // تحديد الموقع تلقائيًا عند فتح التطبيق
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setCoords({ lat, lon });
          await fetchCityFromCoords(lat, lon); // جلب اسم المدينة
        },
        async (err) => {
          console.log("Geolocation not allowed, using default Paris");
          const lat = 48.8566;
          const lon = 2.3522;
          setCoords({ lat, lon });
          await fetchCityFromCoords(lat, lon);
        },
      );
    } else {
      const lat = 48.8566;
      const lon = 2.3522;
      setCoords({ lat, lon });
      fetchCityFromCoords(lat, lon);
    }
  }, []);
  useEffect(() => {
    if (coords) {
      fetchWeather();
    }
  }, [coords]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    });
  };

  const getIcon = (code, size = 100, color = "white") => {
    if (code === 0) return <WiDaySunny size={size} color="#FFD700" />;
    if (code >= 1 && code <= 3) return <WiCloudy size={size} color="white" />;
    if (code >= 45 && code <= 48) return <WiFog size={size} color="white" />;
    if (code >= 51 && code <= 67) return <WiRain size={size} color="#00BFFF" />;
    if (code >= 71 && code <= 77) return <WiSnow size={size} color="white" />;
    if (code >= 80) return <WiThunderstorm size={size} color="#9370DB" />;
    return <WiCloud size={size} color="white" />;
  };

  const getWeatherDesc = (code) => {
    if (code === 0) return "Sunny";
    if (code <= 3) return "Cloudy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 80) return "Thunderstorm";
    return "Cloudy";
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  if (!weather)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #061727, #020a11)",
        color: "white",
        p: { xs: 2, md: 5 },
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* 1. Header & Search Bar */}
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#4a90e2" }}
      >
        ReactWeather
      </Typography>

      <TextField
        fullWidth
        placeholder="search city..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={searchCity}
        sx={{
          mb: 4,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "10px",
          input: { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton onClick={getLocation}>
              <MyLocationIcon sx={{ color: "gray" }} />
            </IconButton>
          ),
        }}
      />

      {/* 2. Current Weather Card */}
      <Card
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.05)",
          color: "white",
          mb: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Current Weather</Typography>
          <Typography variant="h4" sx={{ mb: 1 }} textAlign="center">
            {city}
            <LocationOnIcon fontSize="15px" />
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography>C</Typography>
            <Switch
              size="small"
              onChange={() => setUnit(unit === "C" ? "F" : "C")}
            />
            <Typography>F</Typography>
          </Box>
        </Box>

        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                {getIcon(weather.current.weather_code, 160)}
                <Typography variant="h5" sx={{ opacity: 0.8 }}>
                  {getWeatherDesc(weather.current.weather_code)}
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{ fontSize: "6rem", fontWeight: 300 }}
              >
                {Math.round(weather.current.temperature_2m)}°
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: { md: "flex-end" },
              }}
            >
              <Box
                sx={{
                  width: "200px",
                  background: "rgba(255,255,255,0.05)",
                  p: 5,
                  borderRadius: "10px",
                  marginLeft: 15,
                }}
              >
                <DetailRow
                  icon={<FeelsIcon fontSize="small" />}
                  label="Feels Like"
                  value={`${Math.round(weather.current.temperature_2m)}°`}
                />

                <DetailRow
                  icon={<WaterDropIcon fontSize="small" />}
                  label="Humidity"
                  value={`${weather.current.relative_humidity_2m}%`}
                />
                <DetailRow
                  icon={<AirIcon fontSize="small" />}
                  label="Wind"
                  value={`${weather.current.wind_speed_10m}kph`}
                />
                <DetailRow
                  icon={<SpeedIcon fontSize="small" />}
                  label="Pressure"
                  value={`${weather.current.surface_pressure}hPa`}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* 3. Extended Forecast */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Extended Forecast
      </Typography>
      <Grid container spacing={2}>
        {weather.daily.time.map((day, i) => (
          <Grid item xs={12} sm={6} md={1.7} key={i}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(255,255,255,0.03)",
                color: "white",
                borderRadius: "15px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                {getDayName(day)}
              </Typography>
              {getIcon(weather.daily.weather_code[i], 50)}
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                {getWeatherDesc(weather.daily.weather_code[i])}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {Math.round(weather.daily.temperature_2m_max[i])}°/
                {Math.round(weather.daily.temperature_2m_min[i])}°
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography textAlign="center" sx={{ mt: 5, opacity: 0.5 }}>
        Developed By Ehsan Azizi
      </Typography>
    </Box>
  );
}

// مكون فرعي لعرض تفاصيل الطقس بشكل مرتب
function DetailRow({ icon, label, value }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1, color: "#4a90e2" }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>
          {label}
        </Typography>
      </Box>
      <Typography sx={{ color: "white" }}>{value}</Typography>
    </Box>
  );
}
