//const { shortId } = require("shortid");
const url= require("../models/url");
const shortid = require("shortid");

async function generateshorturl(req, res) {
    const shortId = shortid(8);
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    await url.create({
        shortId: shortId,
        redirecturl: body.url,
        visithistory: [],
    });

    return res.json({ id: shortId });
}

async function handlegeranalytics(req,res){
    const shortid=req.params.shortid;
    const result=await url.findOne({shortId:shortid});
    return res.json(
        {
        totalclicks:result.visithistory.length,
        analytics:result.visithistory,
    }
)
}

module.exports = {
    generateshorturl,
    handlegeranalytics,
};
