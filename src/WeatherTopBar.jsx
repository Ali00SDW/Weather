import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaLocationArrow } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

export default function TopBar({
  city,
  setCity,
  weather,
  error,
  loading,
  locationLoading,
  handleLocation,
  handleSearch,

}) {
  return (
    <Box
      sx={{
        my: 2,
        padding: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        color: "#b0c4de",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            mb: 2,
            fontSize: { xs: "45px", md: "60px" },
          }}
        >
          Today Weather
        </Typography>

      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

        <Typography sx={{ fontSize: { xs: "30px", md: "45px" } }}>
          {weather ? `${weather.name} - ${weather.sys.country}` : ""}
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {loading && <Typography>Loading...</Typography>}
        {locationLoading && <Typography>Loading...</Typography>}

        <IconButton
          sx={{ padding: 2, border: "2px solid #b0c4de" }}
          onClick={handleLocation}
          disabled={locationLoading}
        >
          <FaLocationArrow size={20} color="#b0c4de" />
        </IconButton>

      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

        <TextField
          label="Choose a City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "#b0c4de",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px solid #b0c4de",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  sx={{
                    color: "#b0c4de",
                    transition: "0.2s",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <IoSearchSharp />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        
      </Box>
    </Box>
  );
}
