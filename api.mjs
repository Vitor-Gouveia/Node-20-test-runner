import express from "express"

const app = express()

app.use(express.json())

const data = [
  {
    id: "1",
    name: "vitor"
  }
]

app.get("/", async (_, response) => {
  const users = await new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })

  return response.status(200).json(users)
})

const port = 3333

app.listen(port, () => console.log(`listening on ${port}`))