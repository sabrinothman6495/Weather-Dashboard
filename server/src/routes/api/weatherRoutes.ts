import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

const weatherService = WeatherService;
const historyService = HistoryService;


 

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    // Get weather data from city name
    const weatherData = await weatherService.getWeatherForCity(req.body.cityName);
    res.json(weatherData);

    // Save city to search history
    await historyService.addCity(req.body.cityName);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// TODO: GET search history
router.get('/history', async (_: Request, res: Response) => {
  try {
    const history = await historyService.getCities();
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    await historyService.removeCity(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
