import axios from 'axios';
import Config from 'react-native-config';

export const getSeeds = async () => {
  const API_URL_SEEDS = Config.API_URL + 'asset/sorted/seeds';
  const seeds = await axios.get(API_URL_SEEDS);
  return seeds.data;
};
