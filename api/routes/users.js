var express = require("express");
var axios = require("../axiosFile");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  axios.get("/users.json").then((dbRes) => {
    let usersList = Object.values(dbRes.data);
    res.send(usersList);
  });
});

// Sign up user
router.post("/sign-up", function (req, res, next) {
  let usersList = [];
  let reqObj = req.body;
  axios.get("/users.json").then((dbRes) => {
    usersList = Object.values(dbRes.data);

    //checking for existing user
    let userValid = true;
    for (let index in usersList) {
      if (usersList[index].username.toLower().trim() === reqObj.username.toLower().trim()) { 
        userValid = false;
        res.send("Account with this username already exist.");
        break;
      } else if (usersList[index].email.toLower().trim() === reqObj.email.toLower().trim()) {
        userValid = false;
        res.send("Account with this email already exist.");
        break;
      }
    }
    if(userValid){
      axios
        .post("/users.json", reqObj)
        .then((dbRes) => {
          res.send("SUCCESS");
        })
        .catch((err) => {
          res.send("ERROR");
        });
    }
  });
});

module.exports = router;
