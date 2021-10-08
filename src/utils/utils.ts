import { appId } from "../config";

export function getUrlForLatAndLong(
  lat: number = 0,
  long: number = 0,
  unit: string = "metric"
) {
  const urlForCurrentLocationWeatherData: string = `https://api.openweathermap.org/data/2.5/forecast?units=${unit}&lat=${lat}&lon=${long}&APPID=${appId}`;
  return urlForCurrentLocationWeatherData;
}

export function getUrlForCity(city: string = "", unit: string = "metric") {
  const urlForCityWeatherData: string = `https://api.openweathermap.org/data/2.5/forecast?units=${unit}&APPID=${appId}&q=${city}`;
  return urlForCityWeatherData;
}

//Types
export interface LocationData {
  latitude?: number;
  longitude?: number;
}
