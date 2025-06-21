const express = require('express')
const urlroute = require('./routes/url')
const url = require('./models/url')
const { connecttomongodb } = require('./connect')

const app = express()
const PORT = 8001

connecttomongodb('mongodb://localhost:27017/short-url')
  .then(() => console.log('Mongodb connected..'))
  .catch(err => console.error('MongoDB connection failed:', err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/url', urlroute);

app.get('/:shortid', async (req, res) => {
  const shortid = req.params.shortid

  const entry = await url.findOneAndUpdate(
    { shortId: shortid },
    {
      $push: {
        visithistory: {
          timestamp: Date.now()
        }
      }
    },
    { new: true }
  )

  if (!entry) {
    return res.status(404).send('Short URL not found')
  }

  res.redirect(entry.redirecturl)
})

app.listen(PORT, () => console.log(`Server started at ${PORT}`))
