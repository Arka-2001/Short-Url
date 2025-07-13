const {getuser}=require("../service/auth");

 async function restricttologgedinusernoly(req, res, next) {
  const userUid = req.cookies?.uid;
//   console.log(userUid);
//   if (!userUid) return res.redirect("/login");
//   const user = getUser(userUid);

//   if (!user) return res.redirect("/login");

//   req.user = user;
  next();
}


module.exports={
    restricttologgedinusernoly,
}