const express = require('express')
const app = express()
const port = 5000

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const decksRouter = require("./decks/decks.router")
const cardsRouter = require("./cards/cards.router")

app.use("/decks", decksRouter)
app.use("/cards", cardsRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })



app.use(notFound)
app.use(errorHandler)

module.exports = app