import { create } from 'zustand';
import { Meme } from '@src/modules/meme/domain/interfaces/Meme';
import Config from 'react-native-config';
import axios from 'axios';

const API_URL_MAPS = Config.API_URL + 'meme';

type State = {
  meme: Meme[];
  linkMemeId: string;
  loadMemes: () => void;
  postMeme: (meme: Meme) => void;
  setLinkMemeId: (id: string) => void;
  removeLinkMemeId: () => void;
  putLike: (itemId: string) => void;
  deleteLike: (itemId: string) => void;
};

const useMemeStore = create<State>((set, get) => ({
  meme: [],
  linkMemeId: '',

  loadMemes: async () => {
    try {
      const meme = await axios.get(API_URL_MAPS);
      set({ meme: meme.data });
    } catch (error) {
      console.warn('error getMemes', error);
    }
  },

  postMeme: async (meme: Meme) => {
    const state = get();
    try {
      await axios.post(API_URL_MAPS, meme);
      state.loadMemes();
    } catch (e) {
      console.warn('error postMeme', e);
    }
  },

  setLinkMemeId: (id: string) => {
    set({ linkMemeId: id });
  },

  removeLinkMemeId: () => {
    set({ linkMemeId: '' });
  },

  putLike: async (itemId: string) => {
    const state = get();
    try {
      const API_URL_LIKE = Config.API_URL + 'meme/like/' + itemId;
      await axios.put(API_URL_LIKE);
      state.loadMemes();
    } catch (error) {
      console.warn('error in meme putLike', error);
    }
  },

  deleteLike: async (itemId: string) => {
    const state = get();
    try {
      const API_URL_LIKE = Config.API_URL + 'meme/unlike/' + itemId;
      await axios.put(API_URL_LIKE);
      state.loadMemes();
    } catch (error) {
      console.warn('error in meme deleteLike', error);
    }
  },
}));

export default useMemeStore;
