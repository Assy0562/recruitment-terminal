export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

// operators.jsonの1件分に対応する型。画面側はこの形を前提に表示する。
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

// 素質やスキルのように、名前・説明・任意アイコンを持つ詳細項目。
export type OperatorDetailItem = {
  name: string;
  description: string;
  iconUrl?: string;
};
