const mongoose = require('mongoose')

const urlschema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true
    },
    redirecturl: {
      type: String,
      required: true
    },
    visithistory: [
      {
        timestamp: {
          type: Date
        }
      }
    ]
  },
  { timestamps: true }
)

const URL = mongoose.model('url', urlschema)
module.exports = URL
