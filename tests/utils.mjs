import { CallTracker } from "node:assert"

const tracker = new CallTracker();

const sum = (a, b) => a + b

const math = {
  sum
}

const logger = (config) => (fnName, ...args) => {
  config.active
    ? console.log(`[${fnName}()] \t`, ...args)
    : null
}

const log = logger({
  active: false
})
const nums = [1, 2]
const getArraySum = arr => arr.reduce((acc, curr) => curr + acc, 0)

export {
  tracker,
  sum,
  math,
  logger,
  log,
  nums,
  getArraySum,
}