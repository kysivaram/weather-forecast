import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useFetchWeatherData(url: string) {
  const [fetchUrl, setFetchUrl] = useState<string>(url);
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    async function getWeatherData() {
        
      axios.get(fetchUrl)
      .then(function (response: AxiosResponse<WeatherResponse>) {
        console.log(response.data.list);
        const {
          data: {
            list = []
          }
        } = response;
        setWeatherData(list);
      })
    }
    getWeatherData()
  }, [fetchUrl]);
  return { weatherData, setFetchUrl };
}

export interface WeatherResponse {
  cod?: number; 
  list?: any[]
}
