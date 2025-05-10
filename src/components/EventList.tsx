import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { getSports } from '../services/api';
import { setEvents, setLoading, setError, addToCart, removeFromCart } from '../store/bet/betSlice';
import { BetEvent, Outcome } from '../types/bet';
import SearchBar from './SearchBar';

const EventList: React.FC = () => {
  const dispatch = useDispatch();
  const { events, loading, error, cart } = useSelector((state: RootState) => state.bet);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getSports();
        dispatch(setEvents(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'An error occurred'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchEvents();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  const handleClickBet = (outcome: Outcome, event: BetEvent) => {
    const existingBet = cart.find(bet => bet.id === event.id);

    if (existingBet) {
      dispatch(removeFromCart(event.id));
    }

    dispatch(addToCart({
      ...event,
      selectedOutcome: outcome
    }));
  };

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event: BetEvent) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-semibold mb-2">{event.sport_title}</h3>
            <p className="text-gray-600 mb-2">{event.sport_title}</p>
            <p className="text-sm text-gray-500 mb-4">{new Date(event.commence_time).toLocaleDateString()}</p>
            <div className="grid grid-cols-3 gap-2">
              {event.bookmakers[0].markets[0].outcomes.map((outcome) => {
                const isSelected = cart.some(bet =>
                  bet.id === event.id && bet.selectedOutcome?.name === outcome.name
                );
                return (
                  <div className="text-center" key={outcome.name}>
                    <button
                      className={`w-full ${isSelected
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                        } text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}
                      onClick={() => handleClickBet(outcome, event)}
                    >
                      <p className="text-sm font-medium">{outcome.name}</p>
                      <p className="text-lg font-bold">{outcome.price}</p>
                    </button>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventList; 