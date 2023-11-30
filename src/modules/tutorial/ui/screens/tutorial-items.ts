import { TutorialItem } from '@src/modules/tutorial/domain/interfaces/TutorialItem';
import {
  BG_TUTOR_MAPS,
  BG_TUTOR_MODS,
  BG_TUTOR_SEEDS,
  BG_TUTOR_SKINS,
} from '@src/assets/constants/imagePaths';

export const TutorialItems: TutorialItem[] = [
  {
    id: '1',
    imageBg: BG_TUTOR_MODS,
    title: 'How to install the mods',
    videoUrl: 'https://www.youtube.com/',
  },
  {
    id: '2',
    imageBg: BG_TUTOR_MAPS,
    title: 'How to install the maps',
    videoUrl: 'https://www.youtube.com/',
  },
  {
    id: '3',
    imageBg: BG_TUTOR_SKINS,
    title: 'How to install the skins',
    videoUrl: 'https://www.youtube.com/',
  },
  {
    id: '4',
    imageBg: BG_TUTOR_SEEDS,
    title: 'How to install the seeds',
    videoUrl: 'https://www.youtube.com/',
  },
];
