import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import EventList from './components/EventList';
import Cart from './components/Cart';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App; 