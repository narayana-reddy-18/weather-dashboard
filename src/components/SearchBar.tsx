import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { searchCities } from '../api/weatherAPI';
import { CityData } from '../types/weather';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../features/favoritesSlice';
import { RootState } from '../app/store';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.cities);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        try {
          const cities = await searchCities(query);
          setResults(cities);
        } catch (error) {
          console.error('Search failed:', error);
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleAddCity = (city: CityData) => {
    dispatch(addFavorite(city));
    setQuery('');
    setResults([]);
  };

  const isFavorite = (cityId: string) => {
    return favorites.some(fav => fav.id === cityId);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {(results.length > 0 || isSearching) && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : (
            results.map((city) => (
              <div
                key={city.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <div className="font-medium text-gray-900">{city.name}</div>
                  <div className="text-sm text-gray-500">{city.country}</div>
                </div>
                {!isFavorite(city.id) ? (
                  <button
                    onClick={() => handleAddCity(city)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                ) : (
                  <span className="text-sm text-gray-400 px-3">Added</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
