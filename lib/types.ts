export type DailyForecast = {
  /** YYYY-MM-DD */
  date: string;
  /** Representative timestamp (unix seconds) used to pick this day's summary entry */
  dt: number;
  tempMin: number;
  tempMax: number;
  /** Temperature of the representative (near-midday) entry */
  temp: number;
  humidity: number;
  /** Probability of precipitation, 0-100 */
  pop: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
};

export type CityForecast = {
  cityName: string;
  country: string;
  days: DailyForecast[];
};

export type OpenWeatherForecastResponse = {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    pop: number;
  }[];
};
