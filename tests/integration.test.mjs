import supertest from "supertest"
import { describe, it, mock } from "node:test"
import { strict as assert } from 'node:assert';

import { math, tracker, nums, sum, getArraySum, log } from "./utils.mjs"

import { app, fetcher } from "../api.mjs"

/// https://nodejs.org/dist/latest-v19.x/docs/api/test.html
/// TAP (Test Anything Protocol)
const users = [
  {
    id: "test_case",
    name: "this is the mock from node.js altering values"
  }
]

describe("[API]", () => {
  it("[/] Should return users", (done) => {
    mock.method(fetcher, "fetchUsers", () => users)
  
    supertest(app)
      .get("/")
      .expect(200)
      .end((error, response) => {
        if(error) {
          return done();
        }
  
        assert.deepStrictEqual(response.body, users)  
  
        return done();
      })
  })

  it("[/] Mock users functionality once", (done) => {
    const mockFetchUsers = mock.method(fetcher, "fetchUsers", () => [
      ...users,
      {
        id: "1",
        name: "this should not be in the api body response"
      }
    ], {
      times: 1
    })

    mockFetchUsers();
  
    supertest(app)
      .get("/")
      .expect(200)
      .end((error, response) => {
        if(error) {
          return done();
        }
  
        assert.notEqual(response.body, users)  
  
        return done();
      })
  })
})