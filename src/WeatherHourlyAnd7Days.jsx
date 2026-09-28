import { Box, Typography, Divider, Button } from "@mui/material";
import { WiRain } from "react-icons/wi";

export default function HourlyAnd7Days({
  displayedHourlyData,
  getHourlyWeatherState,
  getDailyWeatherState,
  dailyForecast,
  formatForecastDay,
  showAllHours,
  setShowAllHours,
}) {
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
          height: "fit-content",
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
              xs: "repeat(3, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 0.5, md: 2 },
            pt: { xs: 0.25, md: 1 },
          }}
        >
          {displayedHourlyData.slice(0, showAllHours ? 24 : 15).map((item) => (
            <Box
              key={item.time}
              sx={{
                minWidth: 0,
                minHeight: { xs: "90px", sm: "105px", md: "150px" },

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.18)",

                p: { xs: 0.3, md: 1 },
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
                  fontSize: { xs: "8px", sm: "10px", md: "14px" },
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
                    width: { xs: "22px", sm: "26px", md: "40px" },
                    height: { xs: "18px", sm: "26px", md: "40px" },
                  },
                }}
              >
                {getHourlyWeatherState(item.weatherCode)}
              </Box>

              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "12px", sm: "17px", md: "24px" },
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
        <Button sx={{
          color: "black",
          backgroundColor: "rgba(0, 0, 0, 0.29)"
        }} onClick={() => setShowAllHours(!showAllHours)}>
          {showAllHours ? "Less" : "more"}
        </Button>
      </Box>

      {/* 7-Days weather forecast */}
      <Box
        sx={{
          width: { xs: "50%", md: "50%" },
          minWidth: 0,
          height: "fit-content",
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

        {/* Tomorrow - Large Card */}
        {dailyForecast[1] && (
          <Box
            sx={{
              minWidth: 0,
              minHeight: { xs: "155px", sm: "180px", md: "240px" },

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              gap: { xs: 0.75, md: 1.5 },
              p: { xs: 1, md: 2 },

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
                fontSize: { xs: "13px", sm: "16px", md: "22px" },
              }}
            >
              Tomorrow
            </Typography>

            {/* Weather icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                "& svg": {
                  width: { xs: "40px", sm: "48px", md: "70px" },
                  height: { xs: "40px", sm: "48px", md: "70px" },
                },
              }}
            >
              {getDailyWeatherState(dailyForecast[1].weatherCode)}
            </Box>

            {/* Temperature */}
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: "25px", sm: "30px", md: "40px" },
                lineHeight: 1.2,
              }}
            >
              {Math.round(dailyForecast[1].temp)}°C
            </Typography>

            {/* Max / Min */}
            <Typography
              sx={{
                fontSize: { xs: "8px", sm: "11px", md: "15px" },
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Max: {Math.round(dailyForecast[1].max)}°C &nbsp; Min:{" "}
              {Math.round(dailyForecast[1].min)}°C
            </Typography>
          </Box>
        )}

        {/* Remaining days */}
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
          {dailyForecast.slice(2, 8).map((item, index) => (
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
                {formatForecastDay(item.date, index + 2)}
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
                {getDailyWeatherState(item.weatherCode)}
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
