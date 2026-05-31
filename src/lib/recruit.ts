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
      if (b.minRarity !== a.minRarity) {
        return b.minRarity - a.minRarity;
      }

      if (b.tags.length !== a.tags.length) {
        return b.tags.length - a.tags.length;
      }

      return a.operators.length - b.operators.length;
    });
}

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
