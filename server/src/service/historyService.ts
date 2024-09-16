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
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    // Import the fs module
    const fs = require('fs');
    // Use the fs.readFileSync method to read the searchHistory.json file
    const data = fs.readFileSync('searchHistory.json');
    // Return the parsed JSON data
    return JSON.parse(data);
  }

  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    // Import the fs module
    const fs = require('fs');
    // Use the fs.writeFileSync method to write the cities array to the searchHistory.json file
    fs.writeFileSync('searchHistory.json', JSON.stringify(cities));
  
  }
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    // Call the read method
    const cities = await this.read();
    // Return the cities array
    return cities;
  }
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    // Call the read method
    const cities = await this.read();
    // Create a new City object with the name and id properties
    const newCity = new City(city, cities.length.toString());
    // Push the new City object to the cities array
    cities.push(newCity);
    // Call the write method with the updated cities array
    await this.write(cities);
  }
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {  
    // Call the read method
    const cities = await this.read();
    // Filter the cities array to remove the city with the matching id
    const newCities = cities.filter((city: City) => city.id !== id);
    // Call the write method with the updated cities array
    await this.write(newCities);
  }
  // async removeCity(id: string) {}
}

export default new HistoryService();
