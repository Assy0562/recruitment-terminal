import tagCategories from "../data/tags.json" with { type: "json" };
import type { Operator } from "@/types/operator";

export type RarityGroup = {
  id: string;
  title: string;
  operators: Operator[];
};

export type TagCombinationCandidate = {
  id: string;
  tags: string[];
  operators: Operator[];
  minRarity: Operator["rarity"];
  maxRarity: Operator["rarity"];
  selectedTagCount: number;
};

export function filterOperators(
  operators: Operator[],
  selectedTags: string[]
): Operator[] {
  if (selectedTags.length === 0) {
    return operators;
  }

  return operators.filter((operator) =>
    (operator.rarity !== 6 || selectedTags.includes("上級エリート")) &&
    selectedTags.every((tag) => operator.tags.includes(tag))
  );
}

export function sortOperatorsByRarity(operators: Operator[]): Operator[] {
  return [...operators].sort((a, b) => b.rarity - a.rarity);
}

export function getRarityLabel(rarity: Operator["rarity"]): string {
  return "★".repeat(rarity);
}

export function groupOperatorsByRarity(operators: Operator[]): RarityGroup[] {
  return [
    {
      id: "star-6",
      title: "★6",
      operators: operators.filter((operator) => operator.rarity === 6)
    },
    {
      id: "star-5",
      title: "★5",
      operators: operators.filter((operator) => operator.rarity === 5)
    },
    {
      id: "star-4-under",
      title: "★4 以下",
      operators: operators.filter((operator) => operator.rarity <= 4)
    }
  ].filter((group) => group.operators.length > 0);
}

export function getTagCombinationCandidates(
  operators: Operator[],
  selectedTags: string[]
): TagCombinationCandidate[] {
  if (selectedTags.length === 0) {
    return [];
  }

  // 公開求人では最大3タグの組み合わせを見るため、選択タグから有効な候補を作る。
  const maxTagCount = Math.min(3, selectedTags.length);
  const tagCombinations = createCombinations(selectedTags, maxTagCount);

  return tagCombinations
    .map((tags) => {
      const matchedOperators = sortOperatorsByRarity(
        filterOperators(operators, tags)
      );

      if (matchedOperators.length === 0) {
        return null;
      }

      const rarities = matchedOperators.map((operator) => operator.rarity);

      return {
        id: tags.join("__"),
        tags,
        operators: matchedOperators,
        minRarity: Math.min(...rarities) as Operator["rarity"],
        maxRarity: Math.max(...rarities) as Operator["rarity"],
        selectedTagCount: selectedTags.length
      };
    })
    .filter((candidate): candidate is TagCombinationCandidate => candidate !== null)
    .sort((a, b) => {
      // 高レアが狙える組み合わせを上に出し、求人ツールとしての使いやすさを優先する。
      if (b.minRarity !== a.minRarity) {
        return b.minRarity - a.minRarity;
      }

      if (b.tags.length !== a.tags.length) {
        return b.tags.length - a.tags.length;
      }

      return a.operators.length - b.operators.length;
    });
}

// 選択されたタグから、1個・2個・3個の全組み合わせを再帰的に作る。
function createCombinations(tags: string[], maxTagCount: number): string[][] {
  const combinations: string[][] = [];

  function walk(startIndex: number, currentTags: string[]) {
    if (currentTags.length > 0) {
      combinations.push(currentTags);
    }

    if (currentTags.length === maxTagCount) {
      return;
    }

    for (let index = startIndex; index < tags.length; index += 1) {
      walk(index + 1, [...currentTags, tags[index]]);
    }
  }

  walk(0, []);

  return combinations;
}

export type OperatorCandidate = {
  operator: Operator;
  combinations: TagCombinationCandidate[];
};

// Reuse the eligible combinations so the overview cannot broaden recruitment rules.
const professionOrder = tagCategories.find(category => category.category === "職業")?.tags ?? [];

export function getOperatorCandidates(candidates: TagCombinationCandidate[]): OperatorCandidate[] {
  const byId = new Map<string, OperatorCandidate>();
  for (const candidate of candidates) {
    for (const operator of candidate.operators) {
      const entry = byId.get(operator.id) ?? { operator, combinations: [] };
      if (!entry.combinations.some(item => item.id === candidate.id)) {
        entry.combinations.push(candidate);
      }
      byId.set(operator.id, entry);
    }
  }
  return [...byId.values()].sort((a, b) =>
    (professionOrder.indexOf(a.operator.profession) < 0 ? professionOrder.length : professionOrder.indexOf(a.operator.profession)) -
    (professionOrder.indexOf(b.operator.profession) < 0 ? professionOrder.length : professionOrder.indexOf(b.operator.profession)) ||
    b.operator.rarity - a.operator.rarity || a.operator.name.localeCompare(b.operator.name, "ja")
  );
}
