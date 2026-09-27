import { Box, Typography } from "@mui/material";

export default function CurrentWeather({
  moreInfo,
  getWeatherIcon,
  initialLoading,
  weather,
  getCurrentTime,
  formattedDate,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#b0c4de",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "10px"
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "8px", md: "18px" },
            fontWeight: "bold",
          }}
        >
          Date: {formattedDate}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "8px", md: "18px" },
            fontWeight: "bold",
          }}
        >
          Time:{" "}
          {getCurrentTime().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: { xs: 2, md: 1 },
          mx: {md: "25px"},
          display: "flex",
          justifyContent: "space-between",
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
                  sx={{ fontSize: { xs: "20px", md: "30px" }, textAlign: "center" }}
                >
                  {weather ? weather.weather[0].description : "--"}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "10px", md: "20px" } }}
              >
                Max: {weather ? `${Math.round(weather.main.temp_max)}°` : "--"}{" "}
                | Min:{" "}
                {weather ? `${Math.round(weather.main.temp_min)}°` : "--"}
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "10px", md: "20px" } }}
              >
                Feels Like:{" "}
                {weather ? `${Math.round(weather.main.feels_like)}°` : "--"}
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            left: {xs: "10px"},
            "& svg": {
              width: { xs: "150px", md: "300px" },
              height: "auto",
            },
          }}
        >
          {getWeatherIcon()}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: {xs: "7px", md: "15px"},
          position: "relative",
          bottom: { xs: "5px", md: "25px" },
          left: { xs: "5px", md: "25px" },
        }}
      >
        {moreInfo.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "13px", md: "16px" },
            }}
          >
            {item.icon}
            {item.label}
            {item.value}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
