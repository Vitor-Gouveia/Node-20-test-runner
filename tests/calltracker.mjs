/// based on https://www.youtube.com/watch?v=Xyx_5F6IDqY

import { describe, it } from "node:test"
import { strict as assert, CallTracker } from 'node:assert';

const tracker = new CallTracker();

const sum = (num1, num2) => num1 + num2

describe("[sum]", () => {
  it("should call sum with correct arguments", () => {
    const sumSpy = tracker.calls(sum)
    const numbers = [1, 2]

    const result = sumSpy(...numbers)

    assert.equal(result, numbers.reduce((acc, curr) => acc + curr, 0))

    const [{ arguments: args }] = tracker.getCalls(sumSpy)

    assert.deepStrictEqual(args, numbers)
  })
})