import supertest from "supertest"
import test, { describe, it, mock, afterEach } from "node:test"
import { strict as assert } from 'node:assert';

import { app, fetcher } from "../api.mjs"

/// https://nodejs.org/dist/latest-v19.x/docs/api/test.html
/// TAP (Test Anything Protocol)
const users = [
  {
    id: "test_case",
    name: "this is the mock from node.js altering values"
  }
]

test("Testing the app", () => {
  afterEach(() => {
    mock.reset();
  })

  test("[/] Should return users", (done) => {
    const mockFetchUsers = mock.method(fetcher, "fetchUsers")
  
    mockFetchUsers.mock.mockImplementation(() => users)
  
    supertest(app)
      .get("/")
      .expect(200)
      .end((error, response) => {
        if(error) {
          console.log("here")
          return done();
        }
  
        assert.deepEqual(response.body, users)  
  
        done();
      })
  })

  test("should not use mock from previous test", () => {
    assert.notEqual(fetcher.fetchUsers, users)
  })
})