import axios from 'axios';
import { BetEvent } from '../types/bet';
import { League } from 'types/league';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: process.env.REACT_APP_ODDS_API_KEY
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLeague = async (): Promise<League[]> => {
  try {
    const response = await api.get(`/sports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getSports = async (league: string = 'soccer_turkey_super_league'): Promise<BetEvent[]> => {
  try {
    const params: any = {
      regions: 'eu',
      markets: 'h2h',
      dateFormat: 'iso',
      oddsFormat: 'decimal',
      includeLinks: false,
      includeSids: false,
      includeBetLimits: false
    };

    const response = await api.get(`/sports/${league}/odds`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export default api; 