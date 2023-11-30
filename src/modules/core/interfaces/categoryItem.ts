interface LangNameTypes {
  en: string;
  ru: string;
}

interface File {
  id: string;
  size: number;
  extension: string;
  mimeType: string;
  fullName: string;
  originalName: string;
  url: string;
}
interface Picture {
  id: string;
  width: number;
  height: number;
  size: number;
  extension: string;
  fullName: string;
  originalName: string;
  url: string;
}

export interface CategoryItem {
  cost: string;
  desc: LangNameTypes;
  downloads: number;
  file: File;
  filepath: string;
  generationKey?: string;
  id: string;
  isNew: boolean;
  isRewarded: boolean;
  isRewardedEng: boolean;
  likes: number;
  name: LangNameTypes;
  picture: Picture;
  priority: number;
  tags: string;
  version: string;
  videoUrl: LangNameTypes;
}
