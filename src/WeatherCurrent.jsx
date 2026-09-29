import { Box, Typography } from "@mui/material";

export default function CurrentWeather({
  moreInfo,
  getWeatherIcon,
  initialLoading,
  weather,
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
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          boxSizing: "border-box",

          fontSize: {
            xs: "16px",
            md: "24px",
          },

          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: "1px",

          py: { xs: 1, md: 1.5 },

          background: "rgba(255, 255, 255, 0.18)",

          borderRadius: "8px 8px 0 0",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",

          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        Current Weather
      </Typography>
      <Box
        sx={{
          padding: { xs: 2, md: 1 },
          mx: { md: "25px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 1, md: 3 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: { xs: 1, md: 2 },
          }}
        >
          {initialLoading ? (
            <Typography variant="h5">Loading weather...</Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  gap: { xs: 0.5, md: 1 },
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
                  sx={{
                    fontSize: { xs: "20px", md: "30px" },
                    textAlign: "center",
                  }}
                >
                  {weather ? weather.weather[0].description : "--"}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "10px", md: "20px" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Max: {weather ? `${Math.round(weather.main.temp_max)}°` : "--"}{" "}
                | Min:{" "}
                {weather ? `${Math.round(weather.main.temp_min)}°` : "--"}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "10px", md: "20px" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Feels Like:{" "}
                {weather ? `${Math.round(weather.main.feels_like)}°` : "--"}
              </Typography>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, md: 2 },
              mt: { xs: 1, md: 2 },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {moreInfo.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: { xs: 1, md: 1.5 },
                  py: { xs: 0.5, md: 1 },
                  borderRadius: 2,
                  background: "rgba(255, 255, 255, 0.25)",
                  fontSize: { xs: "10px", md: "16px" },
                }}
              >
                {item.icon}
                {item.label}
                {item.value}
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            order: { xs: -1, md: 0 },
            "& svg": {
              width: { xs: "130px", md: "250px" },
              height: "auto",
            },
          }}
        >
          {getWeatherIcon()}
        </Box>
      </Box>
    </Box>
  );
}
