import { describe, it } from "node:test"
import { strict as assert } from 'node:assert';

import { math, tracker, sum, nums, getArraySum, log } from "./utils.mjs"

describe("[SPY]", () => {
  describe("[CallTracker() API]", () => {
    it("should spy on function arguments", () => {
      const sumSpy = tracker.calls(sum)
  
      const result = sumSpy(...nums);
  
      assert.equal(result, getArraySum(nums))
  
      const [{ arguments: args }] = tracker.getCalls(sumSpy)

      log("sumSpy", "called with arguments ", args)
  
      assert.deepStrictEqual(args, nums)
    })
  
    it("should spy on object method arguments", () => {
      const sumSpy = tracker.calls(math.sum)
  
      const result = sumSpy(...nums);
  
      assert.equal(result, getArraySum(nums))
  
      const [{ arguments: args }] = tracker.getCalls(sumSpy)

      log("sumSpy", "called with arguments ", args)
  
      assert.deepStrictEqual(args, nums)
    })
  })
})

process.on('exit', () => {
  tracker.verify();
});