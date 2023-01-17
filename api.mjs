import express from "express"

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
  const users = fetcher.fetchUsers();

  return response.status(200).json(users)
})

// const port = 3333

// app.listen(port, () => console.log(`listening on ${port}`))