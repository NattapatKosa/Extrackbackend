const User = require("../models/userModel");

const authSession = async (req, res, next) => {
  console.log(req.session)
  if (!req.session.user_id)
    return res.status(401).send("You don't have permission to access");
  req.user = await User.findOne({ user_id: req.session.user_id });
  console.log(res.user)
  console.log(req.session.user_id)
  
  // to check the user ว่าใช่อันที่เราเลือกรึป่าว
  if (!req.user)
    return res.status(401).send("You don't have permission to access");
  next();
};

module.exports = authSession;
