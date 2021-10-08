import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";
import { WeatherData } from "./components";
import { useFetchWeatherData } from "./hooks";
import { getUrlForLatAndLong, getUrlForCity } from "./utils";

function App() {
  const [locationData, setLocationData] = useState<LocationData>({});
  const [city, setCity] = useState<string>("");
  const [unit, setUnit] = useState<string>("metric");

  const { weatherData, setFetchUrl } = useFetchWeatherData(
    getUrlForLatAndLong(locationData.latitude, locationData.longitude, unit)
  );
  const getCityWeatherDetails = () => {
    setFetchUrl(getUrlForCity(city, unit));
  };
  useEffect(() => {
    async function getCurrentLocationData() {
      const currentLocationData: LocationData = {};
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(function (position) {
          currentLocationData.latitude = position.coords.latitude;
          currentLocationData.longitude = position.coords.longitude;
          setLocationData(currentLocationData);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
      return {};
    }
    getCurrentLocationData();
  }, []);

  if (locationData.latitude && locationData.longitude) {
    return (
      <>
        <h1>Weather forecast</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={getCityWeatherDetails}>
            Search
          </Button>
          Unit Metric
          <input
            type="radio"
            id="unitSelection"
            name="unitSelection"
            aria-label="Metric"
            value={unit}
            onChange={() => setUnit("metric")}
            checked
          />
          Unit Other
          <input
            type="radio"
            id="unitSelection"
            name="unitSelection"
            aria-label="Other"
            value={unit}
            onChange={() => setUnit("")}
          />
        </Form>
        <WeatherData
          data={weatherData}
          locationDetails={locationData}
          cityName={city}
        />
      </>
    );
  }
  return <div>Please enable location</div>;
}

export default App;

//Types
export interface LocationData {
  latitude?: number;
  longitude?: number;
}
