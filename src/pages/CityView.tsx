import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchWeatherData, fetchForecastData, fetchHourlyData } from '../features/weatherSlice';
import { ArrowLeft, Wind, Droplets, Gauge, CloudRain } from 'lucide-react';
import ChartContainer from '../components/ChartContainer';

export default function CityView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const weather = useSelector((state: RootState) => state.weather.currentWeather[id || '']);
  const forecast = useSelector((state: RootState) => state.weather.forecasts[id || '']);
  const hourly = useSelector((state: RootState) => state.weather.hourlyForecasts[id || '']);
  const unit = useSelector((state: RootState) => state.settings.unit);

  const city = favorites.find((c) => c.id === id);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeatherData({ cityId: city.id, lat: city.lat, lon: city.lon, unit }));
      dispatch(fetchForecastData({ cityId: city.id, lat: city.lat, lon: city.lon, unit }));
      dispatch(fetchHourlyData({ cityId: city.id, lat: city.lat, lon: city.lon, unit }));
    }
  }, [dispatch, city, unit, id]);

  if (!city) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">City not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!weather || !forecast || !hourly) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{weather.city}</h1>
              <p className="text-blue-100">{weather.country}</p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              className="w-24 h-24"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-5xl font-bold">{weather.temp}°</div>
              <div className="text-blue-100 capitalize mt-1">{weather.description}</div>
              <div className="text-blue-200 text-sm mt-1">
                Feels like {weather.feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="w-5 h-5" />
                <span>Wind: {weather.windSpeed} {unit === 'celsius' ? 'm/s' : 'mph'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-5 h-5" />
                <span>Humidity: {weather.humidity}%</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className="w-5 h-5" />
                <span>Pressure: {weather.pressure} hPa</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudRain className="w-5 h-5" />
                <span>H: {weather.tempMax}° L: {weather.tempMin}°</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hourly Forecast</h2>
          <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
            <div className="flex space-x-6 min-w-max">
              {hourly.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-[80px]">
                  <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                    alt={hour.description}
                    className="w-12 h-12 mb-2"
                  />
                  <div className="text-lg font-semibold text-gray-900">
                    {hour.temp}°
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{hour.pop}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7-Day Forecast</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-24 font-medium text-gray-900">{day.date}</div>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    className="w-10 h-10"
                  />
                  <div className="flex-1 capitalize text-gray-600">{day.description}</div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CloudRain className="w-4 h-4" />
                    <span>{day.pop}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">H: {day.tempMax}°</span>
                    <span className="text-gray-400">L: {day.tempMin}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartContainer
            type="line"
            data={forecast}
            dataKey="temp"
            xKey="date"
            title="Temperature Trend"
            yAxisLabel={`Temp (°${unit === 'celsius' ? 'C' : 'F'})`}
            color="#3b82f6"
          />
          <ChartContainer
            type="bar"
            data={forecast}
            dataKey="pop"
            xKey="date"
            title="Precipitation Probability"
            yAxisLabel="Probability (%)"
            color="#10b981"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer
            type="area"
            data={forecast}
            dataKey="windSpeed"
            xKey="date"
            title="Wind Speed"
            yAxisLabel={`Speed (${unit === 'celsius' ? 'm/s' : 'mph'})`}
            color="#f59e0b"
          />
          <ChartContainer
            type="line"
            data={forecast}
            dataKey="humidity"
            xKey="date"
            title="Humidity Levels"
            yAxisLabel="Humidity (%)"
            color="#8b5cf6"
          />
        </div>
      </div>
    </div>
  );
}
