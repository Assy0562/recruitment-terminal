import assert from "node:assert/strict";
import { test } from "node:test";
import { getTagCombinationCandidates } from "../src/lib/recruit.ts";
import type { Operator } from "../src/types/operator.ts";
const operators = [
  { id: "six", rarity: 6, tags: ["上級エリート", "火力", "近距離"] },
  { id: "five", rarity: 5, tags: ["火力", "近距離"] },
  { id: "four", rarity: 4, tags: ["火力"] }
] as Operator[];
test("ordinary tags exclude six-star operators", () => {
  const [candidate] = getTagCombinationCandidates(operators, ["火力"]);
  assert.deepEqual(candidate.operators.map(op => op.id), ["five", "four"]);
  assert.equal(candidate.minRarity, 4);
});
test("six-star eligibility is checked for each subset", () => {
  const candidates = getTagCombinationCandidates(operators, ["上級エリート", "火力"]);
  for (const candidate of candidates) {
    assert.equal(candidate.operators.some(op => op.rarity === 6), candidate.tags.includes("上級エリート"));
  }
});
test("combinations use AND matching and at most three tags", () => {
  const candidates = getTagCombinationCandidates(operators, ["上級エリート", "火力", "近距離", "unknown"]);
  assert.ok(candidates.length > 0);
  for (const candidate of candidates) {
    assert.ok(candidate.tags.length <= 3);
    assert.ok(candidate.operators.every(op => candidate.tags.every(tag => op.tags.includes(tag))));
  }
});
test("empty selection produces no candidates", () => {
  assert.deepEqual(getTagCombinationCandidates(operators, []), []);
});
