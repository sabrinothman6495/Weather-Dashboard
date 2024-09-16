// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  constructor() {}
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return JSON.parse(require('fs').readFileSync('searchHistory.json', 'utf8'));
  }
   
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return require('fs').writeFileSync('searchHistory.json', JSON.stringify(cities));
  }
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
 
  async getCities() {
    const cities = await this.read();
    return cities;
  }
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.read();
    const newCity = new City(city, cities.length.toString());
    cities.push(newCity);
    await this.write(cities);
  }
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    const newCities = cities.filter((city: City) => city.id !== id);
    await this.write(newCities);
  }
}

  // async removeCity(id: string) {}


export default new HistoryService();
