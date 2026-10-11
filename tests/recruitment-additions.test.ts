import assert from "node:assert/strict";
import { test } from "node:test";
import operators from "../src/data/operators.json" with { type: "json" };
import englishNames from "../src/data/operatorEnglishNames.json" with { type: "json" };
import ranges from "../src/data/operatorRanges.json" with { type: "json" };
import { getTagCombinationCandidates } from "../src/lib/recruit.ts";
import type { Operator } from "../src/types/operator.ts";

const additions = [
  { id: "char_426_billro", name: "カーネリアン", tags: ["遠距離", "術師", "範囲攻撃", "防御", "上級エリート"], query: ["上級エリート", "防御", "術師"] },
  { id: "char_478_kirara", name: "キララ", tags: ["近距離", "特殊", "火力", "生存", "エリート"], query: ["特殊", "生存"] },
  { id: "char_469_indigo", name: "インディゴ", tags: ["遠距離", "術師", "火力", "牽制"], query: ["術師", "牽制"] }
];
for (const addition of additions) {
  test(`${addition.name}: verified tags produce a searchable candidate and complete detail data`, () => {
    const op = operators.find(op => op.id === addition.id);
    assert.ok(op);
    assert.equal(op.name, addition.name);
    assert.deepEqual([...op.tags].sort(), [...addition.tags].sort());
    const candidates = getTagCombinationCandidates(operators as Operator[], addition.query);
    const full = candidates.find(candidate => candidate.tags.length === addition.query.length);
    assert.ok(full?.operators.some(candidate => candidate.id === addition.id));
    assert.ok(englishNames[addition.id as keyof typeof englishNames]);
    const range = ranges[addition.id as keyof typeof ranges];
    assert.ok(range);
    assert.ok(range.cells.every(([x, y]) => x >= 0 && x < range.columns && y >= 0 && y < range.rows));
    assert.ok(op.talents.length > 0 && op.skills.length > 0);
    for (const item of [...op.talents, ...op.skills]) {
      assert.ok(item.name && item.description);
      assert.doesNotMatch(item.description, /[{}]|<[^>]+>/);
    }
  });
}
test("Carnelian requires Top Operator even when other tags match", () => {
  const candidates = getTagCombinationCandidates(operators as Operator[], ["術師", "防御"]);
  assert.ok(candidates.every(candidate => candidate.operators.every(op => op.id !== "char_426_billro")));
});
