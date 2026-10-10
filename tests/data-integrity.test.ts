import assert from "node:assert/strict";
import { test } from "node:test";
import operators from "../src/data/operators.json" with { type: "json" };
import categories from "../src/data/tags.json" with { type: "json" };

function nonEmptyString(value: unknown, label: string): asserts value is string {
  assert.equal(typeof value, "string", `${label}: must be a string`);
  assert.ok((value as string).trim().length > 0, `${label}: must not be empty`);
}

test("tag categories and selectable tags are nonempty and unique", () => {
  assert.ok(categories.length > 0);
  const names = new Set<string>();
  const tags = new Set<string>();
  for (const category of categories) {
    nonEmptyString(category.category, "category");
    assert.ok(!names.has(category.category), `Duplicate category: ${category.category}`);
    names.add(category.category);
    assert.ok(Array.isArray(category.tags) && category.tags.length > 0, category.category);
    for (const tag of category.tags) {
      nonEmptyString(tag, category.category);
      assert.ok(!tags.has(tag), `Duplicate selectable tag: ${tag}`);
      tags.add(tag);
    }
  }
});

test("operator IDs are nonempty and unique, with names and valid rarities", () => {
  assert.ok(operators.length > 0);
  const ids = new Set<string>();
  for (const op of operators) {
    nonEmptyString(op.id, "operator ID");
    assert.ok(!ids.has(op.id), `Duplicate operator ID: ${op.id}`);
    ids.add(op.id);
    nonEmptyString(op.name, `${op.id}: name`);
    assert.ok(Number.isInteger(op.rarity) && op.rarity >= 1 && op.rarity <= 6, `${op.id}: invalid rarity`);
  }
});

test("operator tags are defined and do not repeat", () => {
  const validTags = new Set(categories.flatMap(category => category.tags));
  for (const op of operators) {
    assert.ok(Array.isArray(op.tags) && op.tags.length > 0, `${op.id}: missing tags`);
    assert.equal(new Set(op.tags).size, op.tags.length, `${op.id}: duplicate tags`);
    for (const tag of op.tags) {
      assert.ok(validTags.has(tag), `${op.id}: unknown tag ${tag}`);
    }
  }
});

test("profession and position agree with the searchable tags", () => {
  const professions = categories.find(category => category.category === "職業")?.tags;
  const positions = categories.find(category => category.category === "配置")?.tags;
  assert.ok(professions, "Missing profession category");
  assert.ok(positions, "Missing position category");
  for (const op of operators) {
    assert.ok(professions.includes(op.profession), `${op.id}: unknown profession`);
    assert.ok(positions.includes(op.position), `${op.id}: unknown position`);
    assert.deepEqual(op.tags.filter(tag => professions.includes(tag)), [op.profession], `${op.id}: profession/tag mismatch`);
    assert.deepEqual(op.tags.filter(tag => positions.includes(tag)), [op.position], `${op.id}: position/tag mismatch`);
  }
});
