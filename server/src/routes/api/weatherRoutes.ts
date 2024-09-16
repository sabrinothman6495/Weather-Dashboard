import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const city = req.body.city;

  // TODO: GET weather data from city name
  const weather = await WeatherService.getWeather(city);
  // TODO: save city to search history
  await HistoryService.addCity(city);

  res.json(weather);
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id;
  await HistoryService.removeCity(id);
  res.json({ message: 'City removed from search history' });
});

export default router;