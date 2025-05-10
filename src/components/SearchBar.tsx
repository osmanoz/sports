import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, setLoading, setError, setLeagues } from '../store/bet/betSlice';
import { getLeague, getSports } from '../services/api';
import { RootState } from 'store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { leagues, loading, error } = useSelector((state: RootState) => state.bet);
  const [selectedLeague, setSelectedLeague] = useState('soccer_turkey_super_league');

  const handleSearch = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getSports(selectedLeague);
      dispatch(setEvents(data));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (leagues.length === 0) {
      const fetchLeague = async () => {
        try {
          dispatch(setLoading(true));
          const data = await getLeague();
          dispatch(setLeagues(data));
        } catch (err) {
          dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchLeague();
    }
  }, [dispatch,leagues.length]);

  useEffect(() => {
    if (leagues.length > 0 && !selectedLeague) {
      setSelectedLeague(leagues[0].key);
    }
  }, [leagues, selectedLeague]);

  if (loading && leagues.length === 0) {
    return <div className="text-center py-4">Loading leagues...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="league" className="block text-sm font-medium text-gray-700 mb-1">
            League
          </label>
          <select
            id="league"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={leagues.length === 0}
          >
            {leagues.map((league) => (
              <option key={league.key} value={league.key}>
                {league.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={leagues.length === 0}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 