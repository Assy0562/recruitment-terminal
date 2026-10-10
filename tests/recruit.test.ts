import assert from "node:assert/strict";
import { test } from "node:test";
import { getTagCombinationCandidates } from "../src/lib/recruit.ts";
import type { Operator } from "../src/types/operator.ts";
function operator(id: string, rarity: Operator["rarity"], tags: string[]): Operator {
  return {
    id, name: id, rarity, tags, profession: "前衛", position: "近距離",
    imageUrl: "", artUrl: "", classIconUrl: "", classNameEn: "",
    branchIconUrl: "", branchNameEn: "", trait: "", talents: [], skills: []
  };
}

const operators = [
  operator("six", 6, ["上級エリート", "火力", "近距離"]),
  operator("five", 5, ["火力", "近距離"]),
  operator("four", 4, ["火力"])
];

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

test("five selected tags produce every one-to-three-tag combination exactly once", () => {
  const selected = ["A", "B", "C", "D", "E"];
  const candidates = getTagCombinationCandidates([operator("all", 4, selected)], selected);
  const expected = [
    "A", "B", "C", "D", "E",
    "AB", "AC", "AD", "AE", "BC", "BD", "BE", "CD", "CE", "DE",
    "ABC", "ABD", "ABE", "ACD", "ACE", "ADE", "BCD", "BCE", "BDE", "CDE"
  ];
  assert.deepEqual(candidates.map(candidate => candidate.tags.join("")).sort(), expected.sort());
  assert.equal(new Set(candidates.map(candidate => candidate.id)).size, 25);
  assert.ok(candidates.every(candidate => candidate.selectedTagCount === 5));
});

test("minimum rarity takes priority over tag count", () => {
  const candidates = getTagCombinationCandidates([
    operator("high", 5, ["A"]), operator("low", 4, ["B", "C"])
  ], ["A", "B", "C"]);
  assert.deepEqual(candidates.map(candidate => candidate.tags), [["A"], ["B", "C"], ["B"], ["C"]]);
});

test("tag count takes priority over number of operators when minimum rarity ties", () => {
  const candidates = getTagCombinationCandidates([
    operator("one", 4, ["A"]), operator("two", 4, ["B", "C"]),
    operator("three", 4, ["B", "C"])
  ], ["A", "B", "C"]);
  assert.deepEqual(candidates.map(candidate => candidate.tags), [["B", "C"], ["A"], ["B"], ["C"]]);
});

test("fewer operators comes first when rarity and tag count tie", () => {
  const candidates = getTagCombinationCandidates([
    operator("one", 4, ["A"]), operator("two", 4, ["A"]), operator("three", 4, ["B"])
  ], ["A", "B"]);
  assert.deepEqual(candidates.map(candidate => candidate.tags), [["B"], ["A"]]);
});

test("unmatched tags and empty operator data produce no candidates", () => {
  assert.deepEqual(getTagCombinationCandidates(operators, ["unknown"]), []);
  assert.deepEqual(getTagCombinationCandidates([], ["火力"]), []);
});

test("matching operators are sorted by rarity and summaries reflect their range", () => {
  const input = [operator("low", 3, ["A"]), operator("high", 5, ["A"]), operator("middle", 4, ["A"])];
  const selected = ["A"];
  const original = structuredClone({ input, selected });
  const [candidate] = getTagCombinationCandidates(input, selected);
  assert.deepEqual(candidate.operators.map(op => op.id), ["high", "middle", "low"]);
  assert.equal(candidate.minRarity, 3);
  assert.equal(candidate.maxRarity, 5);
  assert.deepEqual({ input, selected }, original);
});
