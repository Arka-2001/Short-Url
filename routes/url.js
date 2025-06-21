

const { generateshorturl, handlegeranalytics } = require('../controllers/url')
const express = require('express')
const router = express.Router()

router.post('/', generateshorturl)

router.get('/analytics/:shortid', handlegeranalytics)
module.exports = router
