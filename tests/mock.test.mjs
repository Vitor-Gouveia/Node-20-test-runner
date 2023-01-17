import { describe, it } from "node:test"
import { strict as assert } from 'node:assert';

import { tracker, sum } from "./utils.mjs"

describe("[MOCK]", () => {
  it("should expect function to be called once", () => {
    const sumSpy = tracker.calls(sum, 1)

    const prevResult = sumSpy(1, 1)

    const result = sumSpy(1, prevResult)

    assert.equal(result, 3)

    assert.throws(() => tracker.verify(), {
      code: 'ERR_ASSERTION',
    })
  })
})