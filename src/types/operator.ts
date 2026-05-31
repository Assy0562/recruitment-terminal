export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

export type Operator = {
  id: string;
  name: string;
  rarity: Rarity;
  profession: string;
  position: "近距離" | "遠距離";
  tags: string[];
  imageUrl: string;
  artUrl: string;
  classIconUrl: string;
  classNameEn: string;
  branchIconUrl: string;
  branchNameEn: string;
  trait: string;
  talents: OperatorDetailItem[];
  skills: OperatorDetailItem[];
};

export type TagCategory = {
  category: string;
  tags: string[];
};

export type OperatorDetailItem = {
  name: string;
  description: string;
  iconUrl?: string;
};
