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
test("overview excludes six stars without Top Operator", () => {
  const result = getOperatorCandidates(getTagCombinationCandidates(operators as Operator[], ["火力", "近距離"]));
  assert.ok(result.length > 0);
  assert.ok(result.every(entry => entry.operator.rarity < 6));

});
test("empty candidate list has no operators", () => {
  assert.deepEqual(getOperatorCandidates([]), []);
});

test("overview groups by profession before rarity, using the tag panel order", () => {
  const order = ["先鋒", "前衛", "重装", "狙撃", "術師", "医療", "補助", "特殊"];
  const result = getOperatorCandidates(getTagCombinationCandidates(operators as Operator[], ["近距離", "遠距離", "上級エリート"]));
  assert.deepEqual([...new Set(result.map(entry => entry.operator.profession))], order);
  for (let i = 1; i < result.length; i++) {
    const previous = result[i - 1].operator;
    const current = result[i].operator;
    if (previous.profession === current.profession) {
      assert.ok(previous.rarity >= current.rarity);
      if (previous.rarity === current.rarity) assert.ok(previous.name.localeCompare(current.name, "ja") <= 0);
    }
  }
});