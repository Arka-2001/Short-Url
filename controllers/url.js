
const url = require('../models/url')
const shortid = require('shortid')

async function generateshorturl (req, res) {
  const shortId = shortid.generate();
  const body = req.body;


  console.log("Received URL:", req.body.url);
  if (!body.url) {
    return res.status(400).json({ error: 'url is required' })
  }

  await url.create({
    shortId: shortId,
    redirecturl: body.url,
    visithistory: [],
    createdBy:req.user._id,
  })

  const allurls = await url.find({});

  return res.render("home",{
    shortid:shortId,
    urls: allurls, 
  });

  // return res.json({ id: shortId })
}

async function handlegeranalytics (req, res) {
  const shortid = req.params.shortid
  const result = await url.findOne({ shortId: shortid })
  return res.json({
    totalclicks: result.visithistory.length,
    analytics: result.visithistory
  })
}

module.exports = {
  generateshorturl,
  handlegeranalytics
}
