import { create } from 'zustand';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { getRandomElements } from '@src/modules/daily-selection/domain/helpers/getRandomElements';

type State = {
  dailySelectionMods: CategoryItem[];
  isDailySelectionLoading: boolean;
  getDailySelection: (mods: CategoryItem[]) => void;
};

const useDailySelectionStore = create<State>(set => ({
  dailySelectionMods: [],
  isDailySelectionLoading: false,

  getDailySelection: mods => {
    set({ isDailySelectionLoading: true });
    const selectionMods = getRandomElements(mods, 10);
    set({ dailySelectionMods: selectionMods, isDailySelectionLoading: false });
  },
}));

export default useDailySelectionStore;
