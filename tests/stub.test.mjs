import { describe, it, mock } from "node:test"
import { strict as assert } from 'node:assert';

import { math, tracker, nums, getArraySum, log } from "./utils.mjs"

const myOtherSum = (a, b) => math.sum(a, b)

describe("[STUB]", () => {
  describe("[Mock API]", () => {
    it("should stub function", () => {
      const mockSum = mock.fn(math.sum, (...args) => {
        log("sum", "called with arguments ", args)()

        assert.deepStrictEqual(args, nums)

        return getArraySum(args)
      })

      const result = mockSum(...nums)

      assert.equal(result, getArraySum(nums))
    })

    it("should stub object method", () => {
      mock.method(math, "sum", (...args) => {
        log("sum", "called with arguments ", args)()

        assert.deepStrictEqual(args, nums)

        return getArraySum(args)
      })

      const result = math.sum(...nums)

      assert.equal(result, getArraySum(nums))
    })
    
    it("should stub function called by another function and verify arguments", () => {
      mock.method(math, "sum", (...args) => {
        log("sum", "called with arguments ", args)()
        assert.deepStrictEqual(args, nums)

        return getArraySum(args)
      })

      const myOtherSumSpy = tracker.calls(myOtherSum)
      
      const result = myOtherSumSpy(...nums)

      const [{ arguments: myOtherSumArgs }] = tracker.getCalls(myOtherSumSpy)

      log("myOtherSum", "called with arguments ", myOtherSumArgs)()

      assert.equal(result, getArraySum(nums))
    })
  })
})