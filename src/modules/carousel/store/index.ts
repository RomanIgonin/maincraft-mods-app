import { create } from 'zustand';
import { CarouselItem } from '@src/modules/carousel/domain/interfaces/CarouselItem';
import Config from 'react-native-config';
import axios from 'axios';

const API_URL_CAROUSEL = Config.API_URL + 'carousel';

type State = {
  carousel: CarouselItem[];
  isCarouselLoading: boolean;
  loadCarousel: () => void;
  postCarouselItem: (carouselItem: CarouselItem) => void;
};

const useCarouselStore = create<State>((set, get) => ({
  carousel: [],
  isCarouselLoading: false,

  loadCarousel: async () => {
    try {
      set({ isCarouselLoading: true });
      const fCarousel = await axios.get(API_URL_CAROUSEL);
      if (fCarousel.data) {
        set({ carousel: fCarousel.data, isCarouselLoading: false });
      } else {
        set({ isCarouselLoading: false });
      }
    } catch (error) {
      console.log('error in loadCarousel', error);
      set({ isCarouselLoading: false });
    }
  },

  postCarouselItem: async (carouselItem: CarouselItem) => {
    const state = get();
    try {
      const res = await axios.post(API_URL_CAROUSEL, carouselItem);
      if (res) {
        state.loadCarousel();
      }
    } catch (error) {
      console.log('error in postCarouselItem', error);
      set({ isCarouselLoading: false });
    }
  },
}));

export default useCarouselStore;
