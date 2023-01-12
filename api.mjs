import express from "express"
import { setTimeout } from "node:timers/promises"

export const app = express()

app.use(express.json())

export const fetcher = {
  fetchUsers: () => ([
    {
      id: "1",
      name: "vitor"
    }
  ])
}

app.get("/", async (_, response) => {
  await setTimeout(1000)
  // throw new Error("Oh my gad")
  
  const users = fetcher.fetchUsers();

  return response.status(200).json(users)
})

const port = 3333

app.listen(port, () => console.log(`listening on ${port}`))