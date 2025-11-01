import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchWeatherData } from '../features/weatherSlice';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.cities);
  const weatherData = useSelector((state: RootState) => state.weather.currentWeather);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const unit = useSelector((state: RootState) => state.settings.unit);

  useEffect(() => {
    favorites.forEach((city) => {
      dispatch(
        fetchWeatherData({
          cityId: city.id,
          lat: city.lat,
          lon: city.lon,
          unit,
        })
      );
    });
  }, [dispatch, favorites, unit]);

  useEffect(() => {
    const interval = setInterval(() => {
      favorites.forEach((city) => {
        dispatch(
          fetchWeatherData({
            cityId: city.id,
            lat: city.lat,
            lon: city.lon,
            unit,
          })
        );
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, favorites, unit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Weather Dashboard</h2>
          <p className="text-gray-600">Track weather conditions for your favorite cities</p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorite cities yet</h3>
              <p className="text-gray-600 mb-6">Search and add cities to track their weather</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((city) => (
              <WeatherCard
                key={city.id}
                cityId={city.id}
                cityName={city.name}
                weather={weatherData[city.id]}
                loading={loading[city.id]}
                error={error[city.id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
