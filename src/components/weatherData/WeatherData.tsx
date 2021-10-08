import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { LocationData } from "../../utils";
import "./weatherData.css";

export function WeatherData(props: WeatherDataProps) {
  const {
    data: weatherData = [],
    locationDetails: {
      latitude = 0,
      longitude = 0,
    } = {},
    cityName = ""
  } = props;
  const today: string | undefined = moment().format('MMMM d, YYYY');
  const todaysForecast = weatherData[0];
  return (
    <div className="weatherData">
      <h4>{
        cityName !== ""? `${cityName}`: `Latitude(${latitude}), Longitude(${longitude})` 
      }</h4>
      <div className="todaysDate">{today}</div>
      <Row className="todaysForecastRow">
        <Col >
          <span className="todaysForecastTemperature">{todaysForecast?.main?.temp} </span>C
        </Col>
        <Col>
          <div>Visibility: <span className="">{todaysForecast?.visibility} </span></div>
          <div>Humidity: <span className="">{todaysForecast?.main?.humidity} </span></div>
          <div>Wind: <span className="">{todaysForecast?.wind?.speed} </span></div>
          <div>Polin count: <span className="">{todaysForecast?.pop} </span></div>
        </Col>

      </Row>

      <div>{weatherData.map(
        data => (
          <Row>
            <Col>Date: {data.dt}</Col>
            <Col>Temperature {data.main.temp}</Col>
            <Col>Feels like {data.main.feels_like}</Col>
            <Col>Pressure {data.main.pressure}</Col>
            <Col>Humidity {data.main.humidity}</Col>
          </Row>
        )
      )}</div>
    </div>
    
  );

}

//Types
interface WeatherDataProps {
  data: any[];
  locationDetails?: LocationData;
  cityName?: string;
}
