const express = require('express');
const path=require("path");
const urlroute = require('./routes/url')
const url = require('./models/url')
const { connecttomongodb } = require('./connect')
const staticrouter=require("./routes/staticrouter");
const  userroute=require("./routes/user");
const app = express()
const PORT = 8001
const cookieparser=require("cookie-parser");
const {restricttologgedinusernoly}=require("./middlewares/auth");

connecttomongodb('mongodb://localhost:27017/short-url')
  .then(() => console.log('Mongodb connected..')) 
  .catch(err => console.error('MongoDB connection failed:', err))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());



app.use("/user",userroute);
app.use('/url',restricttologgedinusernoly, urlroute);
 
app.use("/",staticrouter);

app.get("/test",async (req,res)=>{
   const allusers=await url.find({});
   return res.end(`
    <htmL>
    <head>
    <body>
    <ol>
    ${allusers.map(url=>`<li>${url.shortId} - ${url.redirecturl} - ${url.visithistory.length}</li>`).join('')}
    </ol>
    </body>
    </head>
    </html>
    `) 
})

// app.get("/test1", async (req,res)=>{
//   const allurls=await url.find({});
//   return res.render("home",{
//     urls:allurls,
//   });
// })


app.get('/url/:shortid', async (req, res) => {
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
