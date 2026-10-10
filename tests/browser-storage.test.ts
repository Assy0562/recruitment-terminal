import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { readStorage, writeStorage, parseSelectedTags } from "../src/lib/browser-storage.ts";

afterEach(() => { Reflect.deleteProperty(globalThis, "window"); });

for (const kind of ["localStorage", "sessionStorage"] as const) {
  test(`${kind}: round trip and removal`, () => {
    const entries = new Map<string, string>();
    Object.defineProperty(globalThis, "window", { configurable: true, value: {
      [kind]: { getItem: (key: string) => entries.get(key) ?? null,
        setItem: (key: string, value: string) => entries.set(key, value),
        removeItem: (key: string) => entries.delete(key) }
    }});
    writeStorage(kind, "state", "light");
    assert.equal(readStorage(kind, "state"), "light");
    writeStorage(kind, "state", null);
    assert.equal(readStorage(kind, "state"), null);
  });
  test(`${kind}: blocked access does not throw`, () => {
    Object.defineProperty(globalThis, "window", { configurable: true, value: {
      get [kind]() { throw new DOMException("Blocked", "SecurityError"); }
    }});
    assert.equal(readStorage(kind, "state"), null);
    assert.doesNotThrow(() => writeStorage(kind, "state", "dark"));
    assert.doesNotThrow(() => writeStorage(kind, "state", null));
  });
  test(`${kind}: quota exceeded does not throw`, () => {
    Object.defineProperty(globalThis, "window", { configurable: true, value: {
      [kind]: { setItem() { throw new DOMException("Full", "QuotaExceededError"); } }
    }});
    assert.doesNotThrow(() => writeStorage(kind, "state", "dark"));
  });
}
test("missing window is safe during server rendering", () => {
  assert.equal(readStorage("sessionStorage", "state"), null);
  assert.doesNotThrow(() => writeStorage("localStorage", "state", "dark"));
});
const tags = new Set(["A", "B", "C"]);
test("invalid JSON and non-array values are ignored", () => {
  for (const value of [null, "{", "null", "{}", '"A"']) {
    assert.deepEqual(parseSelectedTags(value, tags, 2), []);
  }
});
test("valid unique tags retain order before applying the limit", () => {
  assert.deepEqual(parseSelectedTags('["A", "A", false, "unknown", "B", "C"]', tags, 2), ["A", "B"]);
});
