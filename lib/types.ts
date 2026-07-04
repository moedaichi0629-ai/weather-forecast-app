export type HourlyPoint = {
  /** Hour of day, 0-23, in the 3-hour intervals OpenWeatherMap's free forecast API provides */
  hour: number;
  temp: number;
  /** Probability of precipitation, 0-100 */
  pop: number;
};

export type DailyForecast = {
  /** YYYY-MM-DD */
  date: string;
  tempMin: number;
  tempMax: number;
  /** Temperature of the representative (near-midday) entry */
  temp: number;
  humidity: number;
  /** Probability of precipitation, 0-100 */
  pop: number;
  weatherDescription: string;
  weatherIcon: string;
  /** 3-hour interval readings for this day, sorted by hour */
  hourly: HourlyPoint[];
};

export type CityForecast = {
  cityName: string;
  country: string;
  days: DailyForecast[];
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type OpenWeatherForecastResponse = {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    pop: number;
  }[];
};
