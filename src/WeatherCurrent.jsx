import {
  Box,
  Typography,
} from "@mui/material";

export default function CurrentWeather({moreInfo, getWeatherIcon, initialLoading, weather}) {
  return (
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
              Max: {weather ? `${Math.round(weather.main.temp_max)}°` : "--"} |
              Min: {weather ? `${Math.round(weather.main.temp_min)}°` : "--"}
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
            width: { xs: "150px", md: "300px" },
            height: "auto",
          },
        }}
      >
        {getWeatherIcon()}
      </Box>
    </Box>
  );
}
