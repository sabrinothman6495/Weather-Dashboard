import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  icon: string;
  constructor(city: string, date: string, temperature: number, humidity: number, windSpeed: number, uvIndex: number, icon: string) {
    this.city = city;
    this.date = date;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.uvIndex = uvIndex;
    this.icon = icon;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.WEATHER_API_BASE_URL || '';
    this.apiKey = process.env.WEATHER_API_KEY || '';
    this.cityName = '';
    console.log(this.baseURL);
    console.log(this.apiKey);
  }

  // Define the getWeather method
  async getWeather(city: string) {
    this.cityName = city;
    const url = `${this.baseURL}?q=${this.cityName}&appid=${this.apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }
  }


  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${this.apiKey}&location=${query}`);
    const data = await response.json();
    return data;
  }
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geocode?city=${this.cityName}&key=${this.apiKey}`;
  }
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${this.apiKey}`;
  }
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    return new Weather(
      this.cityName,
      response.list[0].dt_txt, // Adjust this according to the actual response structure
      response.list[0].main.temp,
      response.list[0].main.humidity,
      response.list[0].wind.speed,
      response.list[0].uvi,
      response.list[0].weather[0].icon
    );
  }
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast = [];
    for (let i = 1; i < weatherData.length; i++) {
      forecast.push(
        new Weather(
          currentWeather.city,
          weatherData[i].dt_txt,
          weatherData[i].main.temp,
          weatherData[i].main.humidity,
          weatherData[i].wind.speed,
          weatherData[i].uvi,
          weatherData[i].weather[0].icon
        )
      );
    }
    return forecast;
  }
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(currentWeather, weatherData.daily);
    return { currentWeather, forecast };
  }
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
