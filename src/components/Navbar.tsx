import { Settings, Cloud } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toggleUnit } from '../features/settingsSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.settings.unit);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Cloud className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Weather Analytics</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleUnit())}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">
                {unit === 'celsius' ? '°C' : '°F'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
