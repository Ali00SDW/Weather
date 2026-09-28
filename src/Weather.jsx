import { useState, useEffect } from "react";

import { Container, Box } from "@mui/material";
import {
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiCloudy,
  WiDayCloudy,
  WiHumidity,
  WiWindy,
  WiSprinkle,
} from "react-icons/wi";

import WeatherMap from "./WeatherMap";
import TopBar from "./WeatherTopBar";
import CurrentWeather from "./WeatherCurrent";
import HourlyAnd7Days from "./WeatherHourlyAnd7Days";

export default function Weather() {
  // بيانات البحث والطقس
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  // حالات التحميل
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  // الوقت والتحكم في عرض توقعات الطقس
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAllHours, setShowAllHours] = useState(false);

  // مفتاح OpenWeather API
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // ======================================================
  // جلب بيانات الطقس حسب الموقع
  // ======================================================

  const fetchWeatherByLocation = async (latitude, longitude) => {
    // جلب الطقس الحالي والتوقعات حسب إحداثيات الموقع
    try {
      setInitialLoading(true);
      setError("");
      setForecast(null);
      // إنشاء رابط طلب الطقس الحالي
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        setError("Unable to get weather");
        return;
      }

      setWeather(weatherData);

      // إنشاء رابط توقعات الساعات والأيام من Open-Meteo
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_mean,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,precipitation_probability&timezone=auto&forecast_days=8`;
      const forecastResponse = await fetch(forecastUrl);

      if (!forecastResponse.ok) {
        setError("Unable to get forecast");
        return;
      }

      const forecastData = await forecastResponse.json();

      setForecast(forecastData);
    } catch (error) {
      // التعامل مع أخطاء الاتصال أو الأخطاء غير المتوقعة
      console.log(error);
      setError("Un able to connect to weather servicee");
    } finally {
      // إيقاف التحميل سواء نجح الطلب أو فشل
      setInitialLoading(false);
    }
  };

  // ======================================================
  //  تحديد موقع المستخدم
  // ======================================================

  const getUserLocation = (onSuccess, onError) => {
    // طلب الموقع الحالي من المتصفح
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  // تحديد الموقع تلقائيا عند فتح الصفحة
  useEffect(() => {
    getUserLocation(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        console.log(error);
        setError("Location permission is required");
      },
    );
  }, []);

  // إعادة تحديد موقع المستخدم عند الضغط على زر الموقع
  function handleLocation() {
    setLocationLoading(true);
    getUserLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
        setLocationLoading(false);
      },
      (error) => {
        console.log(error);
        setError("Location permission is required");
        setLocationLoading(false);
      },
    );
  }

  // ======================================================
  // البحث عن مدينة
  // ======================================================

  const handleSearch = async () => {
    // التأكد من أن المستخدم أدخل اسم المدينة
    if (!city.trim()) {
      return;
    }
    const searchCity = city.trim();
    try {
      setLoading(true);
      setError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;

      // إرسال طلب البحث عن المدينة إلى OpenWeather 
      const response = await fetch(url);

      const data = await response.json();

      // التحقق من نجاح البحث
      if (!response.ok) {
        setWeather(null);
        setError("City not found");
        return;
      }

      // استخدام إحداثيات المدينة لجلب الطقس والتوقعات
      fetchWeatherByLocation(data.coord.lat, data.coord.lon);
    } catch (error) {
      console.log(error);
      setError("Unable to connect to weather service");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // الوقت والتاريخ
  // ======================================================
  
  // تنسيق التاريخ حسب المنطقة الزمنية للمدينة
  const formattedDate = forecast?.timezone
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: forecast.timezone,
      }).format(currentTime)
    : "";

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // الحصول على الوقت الحالي حسب المنطقة الزمنية للمدينة
  const getCurrentTime = () => {
    if (!forecast?.timezone) {
      return currentTime;
    }

    return new Date(
      currentTime.toLocaleString("en-US", {
        timeZone: forecast.timezone,
      }),
    );
  };

  // =======================================================
  // حالة الطقس للتوقعات بالساعات
  // =======================================================

  // تحديد حالة الطقس والايقونة حسب رمز Open-Meteo
  const getHourlyWeatherState = (code) => {
    const style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minWidth: 0,
      textAlign: "center",
      lineHeight: 1.1,

      "& > svg": {
        flexShrink: 0,
      },

      "& > span": {
        fontSize: {
          xs: "8px",
          sm: "12px",
          md: "14px",
        },
        lineHeight: 1.1,
        textAlign: "center",
        minWidth: 0,
        overflowWrap: "break-word",
      },
    };

    if (code === 0) {
      return (
        <Box sx={style}>
          <WiDaySunny size={40} />
          <span>Sunny</span>
        </Box>
      );
    }

    if (code === 1) {
      return (
        <Box sx={style}>
          <WiCloudy size={40} />
          <span>Cloudy</span>
        </Box>
      );
    }

    if (code === 2) {
      return (
        <Box sx={style}>
          <WiDayCloudy size={40} />
          <span>Partly Cloudy</span>
        </Box>
      );
    }

    if (code === 3) {
      return (
        <Box sx={style}>
          <WiCloudy size={40} />
          <span>Overcast</span>
        </Box>
      );
    }

    if (code >= 45 && code <= 48) {
      return (
        <Box sx={style}>
          <WiFog size={40} />
          <span>Foggy</span>
        </Box>
      );
    }

    if (code >= 51 && code <= 55) {
      return (
        <Box sx={style}>
          <WiSprinkle size={40} />
          <span>Drizzle</span>
        </Box>
      );
    }

    if (code >= 56 && code <= 57) {
      return (
        <Box sx={style}>
          <WiRain size={40} />
          <span>Freezing Drizzle</span>
        </Box>
      );
    }

    if (code >= 61 && code <= 65) {
      return (
        <Box sx={style}>
          <WiRain size={40} />
          <span>Rainy</span>
        </Box>
      );
    }

    if (code >= 66 && code <= 67) {
      return (
        <Box sx={style}>
          <WiRain size={40} />
          <span>Freezing Rain</span>
        </Box>
      );
    }

    if (code >= 71 && code <= 75) {
      return (
        <Box sx={style}>
          <WiSnow size={40} />
          <span>Snowing</span>
        </Box>
      );
    }

    if (code === 77) {
      return (
        <Box sx={style}>
          <WiSnow size={40} />
          <span>Snow Grains</span>
        </Box>
      );
    }

    if (code >= 80 && code <= 82) {
      return (
        <Box sx={style}>
          <WiRain size={40} />
          <span>Rain Showers</span>
        </Box>
      );
    }

    if (code >= 85 && code <= 86) {
      return (
        <Box sx={style}>
          <WiSnow size={40} />
          <span>Snow Showers</span>
        </Box>
      );
    }

    if (code >= 95 && code <= 99) {
      return (
        <Box sx={style}>
          <WiThunderstorm size={40} />
          <span>Stormy</span>
        </Box>
      );
    }

    return (
      <Box sx={style}>
        <WiCloudy size={40} />
        <span>Cloudy</span>
      </Box>
    );
  };

  // =======================================================
  // حالة الطقس للتوقعات اليومية
  // =======================================================

  // تحديد حالة الطقس والايقونة حسب رمز Open-Meteo
  const getDailyWeatherState = (code) => {
    const style = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 0.5,
      width: "100%",
      minWidth: 0,
      textAlign: "center",
      lineHeight: 1.1,

      "& > svg": {
        flexShrink: 0,
      },

      "& > span": {
        fontSize: {
          xs: "10px",
          sm: "15px",
          md: "18px",
        },
        lineHeight: 1.1,
        textAlign: "center",
        minWidth: 0,
      },
    };

    if (code === 0) {
      return (
        <Box sx={style}>
          <WiDaySunny size={55} />
          <span>Sunny</span>
        </Box>
      );
    }

    if (code === 1) {
      return (
        <Box sx={style}>
          <WiCloudy size={55} />
          <span>Cloudy</span>
        </Box>
      );
    }

    if (code === 2) {
      return (
        <Box sx={style}>
          <WiDayCloudy size={55} />
          <span>Partly Cloudy</span>
        </Box>
      );
    }

    if (code === 3) {
      return (
        <Box sx={style}>
          <WiCloudy size={55} />
          <span>Overcast</span>
        </Box>
      );
    }

    if (code >= 45 && code <= 48) {
      return (
        <Box sx={style}>
          <WiFog size={55} />
          <span>Foggy</span>
        </Box>
      );
    }

    if (code >= 51 && code <= 55) {
      return (
        <Box sx={style}>
          <WiSprinkle size={55} />
          <span>Drizzle</span>
        </Box>
      );
    }

    if (code >= 56 && code <= 57) {
      return (
        <Box sx={style}>
          <WiRain size={55} />
          <span>Freezing Drizzle</span>
        </Box>
      );
    }

    if (code >= 61 && code <= 65) {
      return (
        <Box sx={style}>
          <WiRain size={55} />
          <span>Rainy</span>
        </Box>
      );
    }

    if (code >= 66 && code <= 67) {
      return (
        <Box sx={style}>
          <WiRain size={55} />
          <span>Freezing Rain</span>
        </Box>
      );
    }

    if (code >= 71 && code <= 75) {
      return (
        <Box sx={style}>
          <WiSnow size={55} />
          <span>Snowing</span>
        </Box>
      );
    }

    if (code === 77) {
      return (
        <Box sx={style}>
          <WiSnow size={55} />
          <span>Snow Grains</span>
        </Box>
      );
    }

    if (code >= 80 && code <= 82) {
      return (
        <Box sx={style}>
          <WiRain size={55} />
          <span>Rain Showers</span>
        </Box>
      );
    }

    if (code >= 85 && code <= 86) {
      return (
        <Box sx={style}>
          <WiSnow size={55} />
          <span>Snow Showers</span>
        </Box>
      );
    }

    if (code >= 95 && code <= 99) {
      return (
        <Box sx={style}>
          <WiThunderstorm size={55} />
          <span>Stormy</span>
        </Box>
      );
    }

    return (
      <Box sx={style}>
        <WiCloudy size={55} />
        <span>Cloudy</span>
      </Box>
    );
  };

  // =======================================================
  // تنسيق أيام التوقعات
  // =======================================================

  // عرض "Today" لليوم الحالي واسم اليوم لبقية الايام
  const formatForecastDay = (date, index) => {
    if (index === 0) {
      return "Today";
    }

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  // بيانات التوقعات بالساعات
  const hourlyData = forecast
    ? forecast.hourly.time.map((time, index) => ({
        time: time,
        temp: forecast.hourly.temperature_2m[index],
        weatherCode: forecast.hourly.weather_code[index],
        rainProbability: forecast.hourly.precipitation_probability[index],
      }))
    : [];

  // عرض الساعات القادمة فقط بحد أقصى 24 ساعة
  const now = new Date();

  const displayedHourlyData = hourlyData
    .filter((item) => new Date(item.time) >= now)
    .slice(0, 24);

  // ======================================================
  // أيقونة الطقس الحالي
  // ======================================================

  // اختيار الأيقونة حسب حالة الطقس الحالي
  const getWeatherIcon = () => {
    if (!weather) return null;

    switch (weather.weather[0].main) {
      case "Clear":
        return <WiDaySunny size={300} />;

      case "Clouds":
        return <WiDayCloudy size={300} />;

      case "Rain":
        return <WiRain size={300} />;

      case "Thunderstorm":
        return <WiThunderstorm size={300} />;

      case "Snow":
        return <WiSnow size={300} />;

      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog size={300} />;

      default:
        return <WiDayCloudy size={300} />;
    }
  };

  // ======================================================
  // بيانات التوقعات اليومية
  // ======================================================

  // إنشاء مصفوفة تحتوي على بيانات كل يوم
  const dailyForecast = forecast
    ? forecast.daily.time.map((date, index) => ({
        date: date,
        temp: forecast.daily.temperature_2m_mean[index],
        max: forecast.daily.temperature_2m_max[index],
        min: forecast.daily.temperature_2m_min[index],
        weatherCode: forecast.daily.weather_code[index],
      }))
    : [];

  // ======================================================
  // معلومات إضافية عن الطقس
  // ======================================================

  // عرض الرطوبة وسرعة الرياح
  const moreInfo = [
    {
      label: "Humidity: ",
      value: weather ? `${weather.main.humidity}%` : "--",
      icon: <WiHumidity size={28} />,
    },
    {
      label: "Wind Speed: ",
      value: weather ? `${Math.round(weather.wind.speed * 3.6)} km/h` : "--",
      icon: <WiWindy size={28} />,
    },
  ];

  return (
    <Container>
      {/* ============================= */}
      {/* شريط البحث */}
      {/* ============================= */}
      <TopBar
        city={city}
        setCity={setCity}
        weather={weather}
        error={error}
        loading={loading}
        locationLoading={locationLoading}
        handleLocation={handleLocation}
        handleSearch={handleSearch}
      />
      {/* ============================= */}
      {/* الطقس الحالي */}
      {/* ============================= */}
      <CurrentWeather
        weather={weather}
        moreInfo={moreInfo}
        getWeatherIcon={getWeatherIcon}
        initialLoading={initialLoading}
        getCurrentTime={getCurrentTime}
        formattedDate={formattedDate}
      />
      {/* ============================= */}
      {/* التوقعات اليومية والساعات */}
      {/* ============================= */}
      <HourlyAnd7Days
        displayedHourlyData={displayedHourlyData}
        getHourlyWeatherState={getHourlyWeatherState}
        getDailyWeatherState={getDailyWeatherState}
        dailyForecast={dailyForecast}
        formatForecastDay={formatForecastDay}
        showAllHours={showAllHours}
        setShowAllHours={setShowAllHours}
      />
      {/* ============================= */}
      {/* خريطة الطقس */}
      {/* ============================= */}
      <Box sx={{ my: 3, width: "100%" }}>
        <WeatherMap />
      </Box>
    </Container>
  );
}
