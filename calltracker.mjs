import { describe, it } from "node:test"
import { strict as assert, CallTracker } from 'node:assert';

const tracker = new CallTracker();

const sum = (num1, num2) => num1 + num2

describe("[sum]", () => {
  it("should call sum with correct arguments", () => {
    const sumSpy = tracker.calls(sum)
    const numbers = [1, 2]

    sumSpy(...numbers)

    const [{ arguments: args }] = tracker.getCalls(sumSpy)

    assert.deepStrictEqual(args, numbers)
  })
})