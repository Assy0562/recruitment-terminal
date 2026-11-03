import assert from "node:assert/strict";
import { test } from "node:test";
import operators from "../src/data/operators.json" with { type: "json" };
import { getOperatorCandidates, getTagCombinationCandidates } from "../src/lib/recruit.ts";
import type { Operator } from "../src/types/operator.ts";

test("overview lists each eligible operator once and retains every matching combination", () => {
  const candidates = getTagCombinationCandidates(operators as Operator[], ["火力", "近距離", "上級エリート"]);
  const snapshot = structuredClone(candidates);
  const result = getOperatorCandidates(candidates);
  const expectedIds = new Set(candidates.flatMap(candidate => candidate.operators.map(op => op.id)));
  assert.equal(result.length, expectedIds.size);
  assert.deepEqual(new Set(result.map(entry => entry.operator.id)), expectedIds);
  for (const entry of result) {
    assert.deepEqual(entry.combinations.map(item => item.id), candidates.filter(item => item.operators.some(op => op.id === entry.operator.id)).map(item => item.id));
    if (entry.operator.rarity === 6) assert.ok(entry.combinations.every(item => item.tags.includes("上級エリート")));
  }
  assert.deepEqual(candidates, snapshot);
});
test("overview excludes six stars without Top Operator and sorts highest rarity first", () => {
  const result = getOperatorCandidates(getTagCombinationCandidates(operators as Operator[], ["火力", "近距離"]));
  assert.ok(result.length > 0);
  assert.ok(result.every(entry => entry.operator.rarity < 6));
  assert.ok(result.every((entry, index) => index === 0 || result[index - 1].operator.rarity >= entry.operator.rarity));
});
test("empty candidate list has no operators", () => {
  assert.deepEqual(getOperatorCandidates([]), []);
});
