import {
  Container,
  Box,
  Typography,
  TextField,
  Card,
  Grid,
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

export default function Weather() {
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
      humidity: "65%",
      wind: "15 km/h",
      feelsLike: `18\u00b0`,
      uv: "5 (medium)",
    },
  ];
  return (
    <Container>
      {/* search bar */}
      <Box sx={{ my: 2, padding: 2, backgroundColor: "grey" }}>
        <Typography>ReactWeather</Typography>
        <TextField fullWidth label="search a city"></TextField>
      </Box>
      {/* current weather */}
      <Box
        sx={{
          my: 2,
          padding: 2,
          backgroundColor: "grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {/* current */}
        <Card>
          <Grid
            container
            rowSpacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Grid size={10}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Today
              </Typography>
            </Grid>

            <Grid size={5}>
              <WiDayCloudy size={120} />
              <Typography sx={{ position: "relative", top: -25 }}>
                partly cloudy
              </Typography>
              <Typography></Typography>
            </Grid>

            <Grid size={5}>
              <Typography variant="h3">{`20\u00b0`}</Typography>
            </Grid>
          </Grid>
        </Card>
        {/* City */}
        <Card sx={{ position: "relative", top: -70 }}>
          <Typography variant="h5">city</Typography>
        </Card>
        {/* current details */}
        <Card>
          {moreInfo.map((moreInfo, index) => {
            return (
              <Grid
                container
                rowSpacing={3}
                key={index}
              >
                <Grid size={5}><WiHumidity/> Humidity: {moreInfo.humidity}</Grid>
                <Grid size={5}><WiWindy/> Wind: {moreInfo.wind}</Grid>
                <Grid size={5}><WiThermometer/> Feels Like: {moreInfo.feelsLike}</Grid>
                <Grid size={5}><WiDaySunny/> UV: {moreInfo.uv}</Grid>
              </Grid>
            );
          })}
        </Card>
      </Box>
      {/* long term */}
      <Box
        sx={{
          my: 2,
          padding: 2,
          backgroundColor: "grey",
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
