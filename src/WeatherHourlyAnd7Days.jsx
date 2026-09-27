import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  WiRain,
} from "react-icons/wi";

export default function HourlyAnd7Days({displayedHourlyData, getWeatherState, dailyForecast, formatForecastDay}) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "row",
        gap: { xs: 0.5, sm: 1.25, md: 2 },
        width: "100%",
        alignItems: "stretch",
      }}
    >
      {/* Hourly weather forecast */}
      <Box
        sx={{
          width: { xs: "50%", md: "50%" },
          minWidth: 0,
          p: { xs: 0.5, md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.5, md: 1.5 },
          background: "#b0c4de",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          sx={{
            mb: { xs: 0.5, md: 3 },
            fontSize: { xs: "12px", sm: "17px", md: "24px" },
            whiteSpace: "nowrap",
          }}
        >
          Hourly Forecast Today
        </Typography>

        <Divider />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: { xs: 0.5, md: 2 },
            pt: { xs: 0.25, md: 1 },
          }}
        >
          {displayedHourlyData.map((item) => (
            <Box
              key={item.time}
              sx={{
                minWidth: 0,
                minHeight: { xs: "112px", sm: "145px", md: "180px" },

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.18)",

                p: { xs: 0.5, md: 1.5 },
                borderRadius: 2,
                gap: { xs: 0.5, md: 1.5 },

                fontSize: { xs: "10px", md: "16px" },

                transition: "0.2s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "9px", sm: "12px", md: "16px" },
                  whiteSpace: "nowrap",
                }}
              >
                {new Date(item.time).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })}
              </Typography>

              {/* Weather icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  "& svg": {
                    width: { xs: "26px", sm: "34px", md: "48px" },
                    height: { xs: "26px", sm: "34px", md: "48px" },
                  },
                }}
              >
                {getWeatherState(item.weatherCode)}
              </Box>

              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "17px", sm: "21px", md: "30px" },
                  lineHeight: 1.2,
                }}
              >
                {Math.round(item.temp)}°C
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.2,
                }}
              >
                <WiRain size={13} />

                <Typography
                  sx={{
                    fontSize: { xs: "7px", sm: "10px", md: "13px" },
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.rainProbability}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 7-Days weather forecast */}
      <Box
        sx={{
          width: { xs: "50%", md: "50%" },
          minWidth: 0,
          p: { xs: 0.5, md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.5, md: 1.5 },
          background: "#b0c4de",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          sx={{
            mb: { xs: 0.5, md: 3 },
            fontSize: { xs: "12px", sm: "17px", md: "24px" },
            whiteSpace: "nowrap",
          }}
        >
          7-Day Forecast
        </Typography>

        <Divider />

        {/* Daily forecast cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: { xs: 0.5, md: 2 },
            pt: { xs: 0.25, md: 1 },
          }}
        >
          {dailyForecast.map((item, index) => (
            <Box
              key={item.date}
              sx={{
                minWidth: 0,
                minHeight: { xs: "112px", sm: "145px", md: "180px" },

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                gap: { xs: 0.5, md: 1.5 },
                p: { xs: 0.5, md: 1.5 },

                fontSize: { xs: "10px", md: "16px" },

                borderRadius: 2,

                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.18)",

                transition: "0.2s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "9px", sm: "12px", md: "17px" },
                  whiteSpace: "nowrap",
                }}
              >
                {formatForecastDay(item.date, index)}
              </Typography>

              {/* Weather icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  "& svg": {
                    width: { xs: "26px", sm: "34px", md: "48px" },
                    height: { xs: "26px", sm: "34px", md: "48px" },
                  },
                }}
              >
                {getWeatherState(item.weatherCode)}
              </Box>

              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "17px", sm: "21px", md: "32px" },
                  lineHeight: 1.2,
                }}
              >
                {Math.round(item.temp)}°C
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "6.5px", sm: "9px", md: "15px" },
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Max: {Math.round(item.max)}°C &nbsp; Min: {Math.round(item.min)}
                °C
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
