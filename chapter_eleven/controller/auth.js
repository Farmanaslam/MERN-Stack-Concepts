const jwt = require("jsonwebtoken");
const model = require("../model/user");
const bcrypt = require("bcrypt");
const User = model.User;

//new user using jwt token..
exports.signUp = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
  const hash = bcrypt.hashSync(req.body.passward, 10);
  user.token = token;
  user.passward = hash;
  user.save((err, doc) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json({ token });
    }
  });
};

//logging user using jwt token
exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.passward, doc.passward);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      doc.token = token;
      doc.save(() => {
        res.json({ token });
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401).json(error);
  }
};
