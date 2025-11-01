import { Link } from 'react-router-dom';
import { Wind, Droplets, X } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { removeFavorite } from '../features/favoritesSlice';

interface WeatherCardProps {
  cityId: string;
  cityName: string;
  weather?: WeatherData;
  loading?: boolean;
  error?: string | null;
}

export default function WeatherCard({ cityId, cityName, weather, loading, error }: WeatherCardProps) {
  const unit = useSelector((state: RootState) => state.settings.unit);
  const dispatch = useDispatch();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFavorite(cityId));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-red-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{cityName}</h3>
          <button
            onClick={handleRemove}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Link to={`/city/${cityId}`} className="block group">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{weather.city}</h3>
            <p className="text-sm text-gray-500">{weather.country}</p>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              className="w-12 h-12"
            />
            <button
              onClick={handleRemove}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-4xl font-bold text-gray-900">
            {weather.temp}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
          <div className="text-sm text-gray-600 capitalize mt-1">{weather.description}</div>
          <div className="text-sm text-gray-500">
            Feels like {weather.feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Wind className="w-4 h-4" />
            <span>{weather.windSpeed} {unit === 'celsius' ? 'm/s' : 'mph'}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}%</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>H: {weather.tempMax}°</span>
            <span>L: {weather.tempMin}°</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
