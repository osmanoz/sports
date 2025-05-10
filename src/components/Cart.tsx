import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store';
import { removeFromCart } from '../store/bet/betSlice';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../services/firebase';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.bet.cart);
  const totalStake = cartItems.reduce((sum, bet) => sum + (bet.selectedOutcome?.price || 0), 0);

  const handleRemoveBet = (betId: string) => {
    dispatch(removeFromCart(betId));
    logEvent(analytics, 'remove_from_cart', {
      bet_id: betId,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center py-4"
          >
            Your bet slip is empty
          </motion.p>
        ) : (
          <>
            {cartItems.map((bet) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="border-b border-gray-200 py-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{bet.sport_title}</h3>
                    <p className="text-sm text-gray-600">

                    </p>
                    <p className="text-sm text-gray-600">Stake:{bet.home_team} - {bet.away_team} ({bet.selectedOutcome?.name} - {bet.selectedOutcome?.price})</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBet(bet.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <span className="material-icons">close</span>
                  </button>
                </div>
              </motion.div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total Stake:</span>
                <span className="font-bold">${totalStake.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart; 