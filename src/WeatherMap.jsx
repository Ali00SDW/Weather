import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography, Paper } from "@mui/material";

const API_KEY = import.meta.env.VITE_OPENWEATHER_MAP_API_KEY;

const WeatherMap = ({ lat = 35.0, lon = 40.0, zoom = 6 }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        background: "#b0c4de",
      }}
    >
      <Typography
        variant="h4"
        sx={{ my: 2, textAlign: "center", color: "black" }}
      >
        Weather Map
      </Typography>

      <Box
        sx={{
          height: { xs: "350px", md: "500px" },
          width: "100%",
          boxShadow: "0px 0px 5px 0.1px #000000",
        }}
      >
        <MapContainer
          center={[lat, lon]}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          {/* خريطة الأساس من OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* قائمة التحكم بليارات الطقس */}
          <LayersControl position="topright">
            <LayersControl.Overlay checked name="السحب (Clouds)">
              <TileLayer
                url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="الأمطار (Rain)">
              <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="درجات الحرارة (Temp)">
              <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="الرياح (Wind)">
              <TileLayer
                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </Box>
    </Paper>
  );
};

export default WeatherMap;
